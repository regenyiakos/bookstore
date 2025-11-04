# Authentication System - Quick Reference

## Overview
JWT-based authentication with HttpOnly cookies, dual-token system (access + refresh).

## Quick Start

### 1. Register a User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created + Sets cookies (accessToken, refreshToken)
```

### 2. Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK + Sets cookies (accessToken, refreshToken)
```

### 3. Get Current User (Protected)
```bash
GET /api/v1/auth/me
Cookie: accessToken=xxx

Response: 200 OK + User data
```

### 4. Refresh Access Token
```bash
POST /api/v1/auth/refresh
Cookie: refreshToken=xxx

Response: 200 OK + Sets new accessToken cookie
```

### 5. Logout
```bash
POST /api/v1/auth/logout
Cookie: accessToken=xxx

Response: 200 OK + Clears cookies
```

## Token Lifetimes
- **Access Token**: 15 minutes (short-lived)
- **Refresh Token**: 7 days (long-lived)

## Cookie Settings
```javascript
{
  httpOnly: true,           // Not accessible via JavaScript
  secure: true,             // HTTPS only (in production)
  sameSite: 'strict',       // CSRF protection
  expires: calculated       // Based on token lifetime
}
```

## Validation Rules

### Registration
- **name**: 2-100 characters, required
- **email**: Valid email format, required, unique
- **password**: 8-128 characters, required

### Login
- **email**: Required
- **password**: Required

## Error Codes Cheat Sheet

| Code | Status | When |
|------|--------|------|
| VALIDATION_ERROR | 400 | Invalid input |
| NOT_AUTHENTICATED | 401 | No token |
| TOKEN_EXPIRED | 401 | Token expired |
| INVALID_CREDENTIALS | 401 | Wrong password |
| REFRESH_TOKEN_MISSING | 401 | No refresh token |
| INVALID_TOKEN | 403 | Bad token |
| USER_NOT_FOUND | 404 | User doesn't exist |
| EMAIL_EXISTS | 409 | Email taken |
| DATABASE_ERROR | 500 | DB error |

## Frontend Integration

### Making Authenticated Requests
```javascript
// Always include credentials
fetch('/api/v1/auth/me', {
  credentials: 'include'  // This sends cookies automatically
})
```

### Handling Token Expiration
```javascript
async function fetchWithRefresh(url, options = {}) {
  options.credentials = 'include';

  let response = await fetch(url, options);

  // If access token expired, try refresh
  if (response.status === 401) {
    const data = await response.json();
    if (data.error.code === 'TOKEN_EXPIRED') {
      const refreshResponse = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      });

      if (refreshResponse.ok) {
        // Retry original request
        response = await fetch(url, options);
      } else {
        // Redirect to login
        window.location.href = '/login';
      }
    }
  }

  return response;
}
```

### Login Flow
```javascript
async function login(email, password) {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    // Store user in state management (Redux, Context, etc.)
    return data.data.user;
  } else {
    const error = await response.json();
    throw new Error(error.error.message);
  }
}
```

### Logout Flow
```javascript
async function logout() {
  await fetch('/api/v1/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });

  // Clear local state
  // Redirect to login
}
```

## Protecting Backend Routes

### Using the Middleware
```javascript
const { authenticateToken } = require('../middleware/auth');

// Protected route
router.get('/profile', authenticateToken, (req, res) => {
  // req.user is available here
  // req.user = { id, email, role }
  console.log(req.user.id);
  console.log(req.user.email);
  console.log(req.user.role);
});

// Optional auth route
const { optionalAuth } = require('../middleware/auth');
router.get('/books', optionalAuth, (req, res) => {
  // req.user is available if authenticated, undefined otherwise
  if (req.user) {
    // User is logged in
  } else {
    // User is not logged in
  }
});
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}' \
  -c cookies.txt
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}' \
  -c cookies.txt
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -b cookies.txt
```

### Refresh Token
```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh \
  -b cookies.txt \
  -c cookies_new.txt
```

### Logout
```bash
curl -X POST http://localhost:5000/api/v1/auth/logout \
  -b cookies.txt
```

## Environment Variables

```env
# JWT Secrets (change in production!)
JWT_ACCESS_SECRET=your_access_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Cookie Settings
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false  # true in production

# Bcrypt
BCRYPT_ROUNDS=12
```

## Rate Limiting
- **General API**: 100 requests / 15 minutes
- **Auth Endpoints**: 5 requests / 15 minutes

## File Structure
```
backend/src/
├── controllers/
│   └── authController.js    # HTTP handlers
├── services/
│   └── authService.js        # Business logic
├── middleware/
│   └── auth.js               # authenticateToken, optionalAuth
├── routes/
│   └── auth.js               # Route definitions
├── models/
│   └── User.js               # User model
└── config/
    └── jwt.js                # JWT configuration
```

## Common Issues

### Issue: "Authentication required" on protected routes
**Solution**: Make sure you're including credentials: 'include' in fetch requests

### Issue: "Token expired" immediately after login
**Solution**: Check system time synchronization, JWT_ACCESS_EXPIRATION in .env

### Issue: Cookies not being set
**Solution**:
- Check CORS credentials: true in backend
- Check credentials: 'include' in frontend
- Verify COOKIE_DOMAIN matches your domain

### Issue: "Email already registered" on first registration
**Solution**: Email already exists in database, use different email or check database

### Issue: Rate limit errors
**Solution**: Wait 15 minutes or adjust rate limits in .env

## Security Checklist

- [x] Tokens in HttpOnly cookies (not localStorage)
- [x] Separate access and refresh tokens
- [x] Password hashing with bcrypt
- [x] Input validation on all fields
- [x] SQL injection prevention (Sequelize)
- [x] Rate limiting on auth endpoints
- [x] CORS properly configured
- [x] Secure cookie flag in production
- [x] SameSite cookie for CSRF protection
- [x] Error messages don't leak info

## Need Help?

- Full documentation: `AUTH_IMPLEMENTATION.md`
- Code documentation: See JSDoc comments in source files
- Testing guide: Run tests in `AUTH_IMPLEMENTATION.md` → Testing Results section
