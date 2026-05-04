/**
 * kkv2-api — Cloudflare Worker entry (Hono framework)
 * This is the main middleware chain for the API worker.
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { rateLimiter } from './middleware/rate-limiter';
import { authMiddleware } from './middleware/auth';

const app = new Hono();

// --- Global Middleware ---

// Security headers
app.use('*', secureHeaders());

// CORS — allow React Native app
app.use('*', cors({
  origin: ['*'], // Tighten in production to app user-agent
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

// Request logging
app.use('*', logger());

// Rate limiting (per-user via kkv2-sessions-kv)
app.use('/api/*', rateLimiter({
  perUser: 100,   // 100 req/min per authenticated user
  perIp: 200,     // 200 req/min per IP (unauthenticated)
  windowMs: 60000,
}));

// --- Public routes (no auth) ---
app.get('/health', (c) => c.json({
  status: 'healthy',
  timestamp: new Date().toISOString(),
  worker: 'kkv2-api',
  version: '2.0.0',
  region: c.req.raw.cf?.colo || 'unknown',
}));

// Auth routes
app.route('/api/auth', authRoutes);

// --- Protected routes (JWT required) ---
app.use('/api/*', authMiddleware);

app.route('/api/users', userRoutes);
app.route('/api/practitioners', practitionerRoutes);
app.route('/api/bookings', bookingRoutes);
app.route('/api/payments', paymentRoutes);
app.route('/api/reviews', reviewRoutes);
app.route('/api/messages', messageRoutes);
app.route('/api/search', searchRoutes);

// --- 404 fallback ---
app.notFound((c) => c.json({
  success: false,
  error: { code: 'NOT_FOUND', message: 'Endpoint not found' },
}, 404));

// --- Error handler ---
app.onError((err, c) => {
  console.error('Unhandled error:', err.message);
  return c.json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' },
  }, 500);
});

export default app;
