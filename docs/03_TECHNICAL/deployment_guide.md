# Deployment Guide — Klear Karma v2

## Prerequisites

- Node.js 20+
- Cloudflare account with Workers paid plan ($5/mo)
- PostgreSQL instance (Neon recommended for serverless)
- Razorpay account (test mode for development)
- Expo account (for EAS builds)

## Local Development

### API

```bash
cd api/
cp .env.example .env  # Fill in DB URL, JWT secret, Razorpay keys
npm install
npm run db:migrate     # Run PostgreSQL migrations
npm run dev            # Starts wrangler dev (localhost:8787)
```

### Mobile App

```bash
cd app/
cp .env.example .env  # Fill in API URL
npm install
npx expo start        # Opens Expo Dev Tools
```

## Environment Variables

### API (`api/.env`)

```env
DATABASE_URL=postgresql://user:pass@host:5432/kkv2
JWT_SECRET=<random-64-char-string>
JWT_REFRESH_SECRET=<random-64-char-string>
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
MSG91_AUTH_KEY=xxxxx
RESEND_API_KEY=re_xxxxx
R2_ACCESS_KEY=xxxxx
R2_SECRET_KEY=xxxxx
R2_BUCKET=kkv2-assets-r2
REDIS_URL=redis://default:xxxxx@host:6379
```

### App (`app/.env`)

```env
API_URL=https://kkv2-api.yourname.workers.dev
RAZORPAY_KEY_ID=rzp_test_xxxxx
```

## Cloudflare Deployment

### First-time setup

```bash
cd api/
npx wrangler login
npx wrangler kv:namespace create kkv2-sessions-kv
npx wrangler kv:namespace create kkv2-cache-kv
npx wrangler r2 bucket create kkv2-assets-r2
```

### Deploy

```bash
npx wrangler deploy  # Deploys to kkv2-api worker
```

### Secrets (set via Wrangler)

```bash
npx wrangler secret put DATABASE_URL
npx wrangler secret put JWT_SECRET
npx wrangler secret put RAZORPAY_KEY_SECRET
npx wrangler secret put MSG91_AUTH_KEY
npx wrangler secret put RESEND_API_KEY
```

## Mobile App Deployment

### Development builds

```bash
cd app/
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Production builds

```bash
eas build --profile production --platform all
eas submit --platform ios     # Submit to App Store Connect
eas submit --platform android  # Submit to Google Play Console
```

## Database Migrations

```bash
cd api/
npm run db:migrate        # Apply pending migrations
npm run db:migrate:down   # Rollback last migration
npm run db:seed           # Seed test data (dev only)
```

## CI/CD Pipeline

GitHub Actions handles:
1. **On PR**: Lint + type-check + unit tests
2. **On merge to main**: Deploy API to Cloudflare Workers
3. **On tag (v*)**: Build mobile app via EAS

## Monitoring

- **API errors**: Cloudflare Workers dashboard + Tail Workers
- **Performance**: Cloudflare Analytics Engine (`kkv2-analytics`)
- **Uptime**: Cloudflare Health Checks (free)
- **App crashes**: Expo crash reporting (free tier)
