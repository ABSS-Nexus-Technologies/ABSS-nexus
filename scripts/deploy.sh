#!/bin/bash

echo "🚀 ABSS Nexus Production Deployment"
echo "=================================="

# 1. Verify environment
if [ "$NODE_ENV" != "production" ]; then
  echo "❌ Not in production mode. Set NODE_ENV=production"
  exit 1
fi

# 2. Run tests
echo "📋 Running tests..."
npm test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Aborting deployment."
  exit 1
fi

# 3. Build CSS
echo "🎨 Building CSS..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ CSS build failed. Aborting deployment."
  exit 1
fi

# 4. Generate sitemap
echo "🗺️  Generating sitemap..."
npm run sitemap
if [ $? -ne 0 ]; then
  echo "❌ Sitemap generation failed. Aborting deployment."
  exit 1
fi

# 5. Backup database
echo "💾 Backing up database..."
cp backend/data/db.json backend/data/db.json.backup.$(date +%s)
echo "✓ Backup created"

# 6. Health check
echo "🏥 Health checking server..."
STARTED_LOCAL=0
if ! lsof -i :3000 >/dev/null 2>&1; then
  NODE_ENV=production npm start &
  SERVER_PID=$!
  STARTED_LOCAL=1
  sleep 3
fi

HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health)
if [ "$HEALTH" != "200" ]; then
  echo "❌ Health check failed. Status: $HEALTH"
  if [ "$STARTED_LOCAL" -eq 1 ]; then kill $SERVER_PID 2>/dev/null || true; fi
  exit 1
fi
echo "✓ Health check passed (HTTP $HEALTH)"
if [ "$STARTED_LOCAL" -eq 1 ]; then kill $SERVER_PID 2>/dev/null || true; fi

# 7. Deploy (actual deployment logic here)
echo "📤 Deploying to production..."
# If using Git:
# git add .
# git commit -m "Deploy: $(date)"
# git push origin main

# If using Docker:
# docker build -t abssnexus:latest .
# docker run -d --name abssnexus -p 3000:3000 abssnexus:latest

echo ""
echo "✅ Deployment complete!"
echo "🔗 https://abssnexus.in"
echo ""
echo "Next steps:"
echo "1. Monitor Uptime Robot (all monitors UP?)"
echo "2. Check GA4 real-time dashboard"
echo "3. Review Sentry for errors"
echo "4. Verify email sending"
echo "5. Check performance metrics"
echo ""
