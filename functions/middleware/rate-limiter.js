/**
 * Rate limiter middleware using Cloudflare KV (kkv2-sessions-kv)
 * Sliding window counter per user ID or IP.
 */

export function rateLimiter({ perUser = 100, perIp = 200, windowMs = 60000 }) {
  return async (c, next) => {
    const kv = c.env.KKV2_SESSIONS_KV;
    if (!kv) {
      // KV not bound — skip rate limiting (dev mode)
      return next();
    }

    const user = c.get('user');
    const key = user
      ? `rl:user:${user.id}`
      : `rl:ip:${c.req.header('cf-connecting-ip') || 'unknown'}`;
    const limit = user ? perUser : perIp;

    try {
      const current = parseInt(await kv.get(key) || '0', 10);

      if (current >= limit) {
        return c.json({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: `Too many requests. Limit: ${limit}/min`,
          },
        }, 429);
      }

      // Increment counter with TTL
      await kv.put(key, String(current + 1), {
        expirationTtl: Math.ceil(windowMs / 1000),
      });
    } catch (err) {
      // If KV fails, don't block the request
      console.warn('Rate limiter KV error:', err.message);
    }

    await next();
  };
}
