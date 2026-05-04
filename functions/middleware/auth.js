/**
 * Auth middleware for kkv2-api
 * Validates JWT access tokens from Authorization header.
 */

import { verify } from 'hono/jwt';

export async function authMiddleware(c, next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Missing or invalid token' },
    }, 401);
  }

  const token = authHeader.slice(7);

  try {
    const payload = await verify(token, c.env.JWT_SECRET);

    // Attach user to context
    c.set('user', {
      id: payload.sub,
      email: payload.email,
      role: payload.role, // 'seeker' | 'practitioner' | 'admin'
    });

    await next();
  } catch (err) {
    if (err.name === 'JwtTokenExpired') {
      return c.json({
        success: false,
        error: { code: 'TOKEN_EXPIRED', message: 'Token expired, please refresh' },
      }, 401);
    }
    return c.json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Invalid token' },
    }, 401);
  }
}
