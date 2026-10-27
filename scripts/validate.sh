#!/usr/bin/env bash
set -euo pipefail

node --check src/scripts/script.js
node --check src/scripts/hero-3d.js
node --check src/scripts/firebase-auth.js
node --check src/scripts/auth.js
node --check src/services/firebase-config.js
node --check src/services/admin-api.js
node --check src/config/admin-config.js
node --check 'functions/api/[[path]].js'

bash scripts/check-links.sh
node scripts/check-css-braces.js
node scripts/final-audit.js

# If local server is not running, spawn it for http tests
STARTED_SERVER=0
if ! lsof -i :3000 >/dev/null 2>&1; then
  node backend/server.js >/dev/null 2>&1 &
  SERVER_PID=$!
  STARTED_SERVER=1
  sleep 1.5
fi

cleanup() {
  if [ "$STARTED_SERVER" -eq 1 ] && [ -n "${SERVER_PID:-}" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

node tests/test-security-five-points.js
node tests/test-phase1-security-hardening.js
node tests/test-phase2-security-hardening.js
node tests/test-phase5-auth.js
node tests/test-verification-registry.js
node tests/test-cloudflare-student-auth.js
node tests/test-cloudflare-certificates-and-applications.js
node tests/test-security-admin-auth.js
node tests/test-css-and-notifications.js

echo "Validation passed."

