# ABSS Nexus Production Runbook

## Incident Response

### Site Down (502 Bad Gateway)
1. Check server: `ssh server && systemctl status app`
2. Check logs: `tail -f /var/log/app.log`
3. Restart: `systemctl restart app`
4. Verify: `curl https://abssnexus.in/api/health`

### High CPU Usage
1. Check processes: `top -p $(pgrep node)`
2. Check memory: `free -h`
3. Restart if needed: `systemctl restart app`

### Database Connection Error
1. Check Firestore status
2. Verify credentials in `.env`
3. Check network: `ping firestore.googleapis.com`
4. Restart service: `systemctl restart app`

### Email Not Sending
1. Check Resend API key
2. Check rate limits: 100 emails/day free tier
3. Review email logs in Resend dashboard
4. Test: `npm run test-email`

### Performance Degradation
1. Check Cloudflare cache hit rate
2. Check database query performance
3. Review Sentry for errors
4. Clear cache if needed: Cloudflare dashboard

## Rollback Procedure

If production breaks:
```bash
# 1. Identify last good commit
git log --oneline | head -10

# 2. Rollback
git revert <bad-commit-hash>
npm run build
npm start

# 3. Verify
curl https://abssnexus.in/api/health
```

## Deployment Process

```bash
# 1. Test locally
NODE_ENV=production npm test

# 2. Build
npm run build

# 3. Deploy to staging (if applicable)
# Or directly to production if confident

# 4. Verify
curl https://abssnexus.in
curl https://abssnexus.in/api/health

# 5. Monitor for 1 hour
# Check: uptime, errors, performance, users
```

## Important Contacts

- Founder: Shubham Kumar +91 87579 28673
- Support email: support@abssnexus.in
- Sentry alerts: To abssnexus@gmail.com
- Uptime alerts: To abssnexus@gmail.com
