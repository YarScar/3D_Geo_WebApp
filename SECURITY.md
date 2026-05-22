# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please email security@example.com instead of using the issue tracker.

## Security Best Practices

### For Developers

1. **Never commit `.env` files** - Use `.env.example` instead
2. **Validate all user input** - Use `sanitizeInput()` from `src/config/environment.ts`
3. **Check URLs** - Use `isValidUrl()` before navigation
4. **Use secure headers** - Call `getSecureHeaders()` for API requests
5. **Handle errors gracefully** - Always catch and log errors
6. **Keep dependencies updated** - Run `npm audit` regularly
7. **Use TypeScript strict mode** - No `any` without justification

### For Deployment

1. **Set environment variables securely** - Use your hosting platform's secret manager
2. **Enable HTTPS** - Always use HTTPS in production
3. **Set security headers** - Configure CSP, X-Frame-Options, etc. at the server level
4. **Enable authentication** - Add auth if exposing sensitive data
5. **Monitor for vulnerabilities** - Use `npm audit` in your CI/CD pipeline
6. **Regular security updates** - Keep Node.js and dependencies up to date

### Dependencies with Security Focus

- **cesium**: Regularly audited for geospatial security
- **react**: Escapes content by default
- **zustand**: Minimal surface area
- **@tanstack/react-query**: Handles sensitive data with care

## Security Headers (Configure at Server)

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Third-Party Services

- **Cesium Ion**: Requires API token (secure in .env)
- **CARTO**: Requires API key (secure in .env)
- **Bing Maps**: Optional, secure in .env if used

## Compliance

- No tracking/analytics by default
- No personal data collection
- GDPR-friendly design
- No external dependencies for core functionality

## Security Testing

Run security audit before deployment:

```bash
npm run security-check
npm run lint
npm run type-check
```

## Updates & Notifications

Subscribe to security updates:
- GitHub Watch (releases)
- npm audit advisories
- Dependabot alerts
