# Authentication System - Testing Guide

## Manual Testing Scenarios

### Scenario 1: Successful User Registration

**Test Case**: Register a new user with valid data

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "password": "securePass123"
  }' \
  -c cookies.txt \
  -v
```

**Expected Result**:
- HTTP Status: 201 Created
- Response includes user data (id, name, email, role, created_at)
- No password_hash in response
- Two cookies set: accessToken and refreshToken
- Both cookies are HttpOnly
- accessToken expires in 15 minutes
- refreshToken expires in 7 days

**Verification**:
```bash
# Check cookies file
cat cookies.txt

# Should see:
# #HttpOnly_localhost FALSE / FALSE <timestamp> accessToken <token>
# #HttpOnly_localhost FALSE / FALSE <timestamp> refreshToken <token>
```

---

### Scenario 2: Registration with Existing Email

**Test Case**: Attempt to register with an already used email

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another User",
    "email": "jane.smith@example.com",
    "password": "anotherPass123"
  }'
```

**Expected Result**:
- HTTP Status: 409 Conflict
- Response:
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email is already registered"
  }
}
```

---

### Scenario 3: Registration with Invalid Data

**Test Case**: Submit registration with validation errors

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "not-an-email",
    "password": "short"
  }'
```

**Expected Result**:
- HTTP Status: 400 Bad Request
- Response includes array of validation errors
- Each error has field and message
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "name",
        "message": "Name must be at least 2 characters long"
      },
      {
        "field": "email",
        "message": "Email must be a valid email address"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters long"
      }
    ]
  }
}
```

---

### Scenario 4: Successful Login

**Test Case**: Login with valid credentials

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "securePass123"
  }' \
  -c cookies.txt \
  -v
```

**Expected Result**:
- HTTP Status: 200 OK
- Response includes user data
- Cookies set (accessToken, refreshToken)
- User data matches registered user

---

### Scenario 5: Login with Invalid Credentials

**Test Case**: Login with wrong password

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "wrongPassword"
  }'
```

**Expected Result**:
- HTTP Status: 401 Unauthorized
- Response:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

**Test Case**: Login with non-existent email

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "anyPassword"
  }'
```

**Expected Result**:
- Same as wrong password (don't reveal which field is wrong)
- HTTP Status: 401 Unauthorized

---

### Scenario 6: Access Protected Route

**Test Case**: Get current user with valid token

```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -b cookies.txt
```

**Expected Result**:
- HTTP Status: 200 OK
- Response includes current user data
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "role": "user",
      "created_at": "2025-11-04T10:00:00.000Z"
    }
  }
}
```

---

### Scenario 7: Access Protected Route Without Token

**Test Case**: Attempt to access protected route without authentication

```bash
curl -X GET http://localhost:5000/api/v1/auth/me
```

**Expected Result**:
- HTTP Status: 401 Unauthorized
- Response:
```json
{
  "success": false,
  "error": {
    "code": "NOT_AUTHENTICATED",
    "message": "Authentication required"
  }
}
```

---

### Scenario 8: Refresh Access Token

**Test Case**: Get new access token using refresh token

```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh \
  -b cookies.txt \
  -c cookies_new.txt \
  -v
```

**Expected Result**:
- HTTP Status: 200 OK
- New accessToken cookie set
- Response:
```json
{
  "success": true,
  "message": "Access token refreshed successfully"
}
```

**Verification**:
```bash
# Compare old and new access tokens
diff cookies.txt cookies_new.txt

# Access tokens should be different
# Refresh token should be the same
```

---

### Scenario 9: Refresh Without Token

**Test Case**: Attempt to refresh without refresh token

```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh
```

**Expected Result**:
- HTTP Status: 401 Unauthorized
- Response:
```json
{
  "success": false,
  "error": {
    "code": "REFRESH_TOKEN_MISSING",
    "message": "Refresh token is required"
  }
}
```

---

### Scenario 10: Logout

**Test Case**: Logout and clear cookies

```bash
curl -X POST http://localhost:5000/api/v1/auth/logout \
  -b cookies.txt \
  -c cookies_after_logout.txt \
  -v
```

**Expected Result**:
- HTTP Status: 200 OK
- Response:
```json
{
  "success": true,
  "message": "Logout successful"
}
```
- Cookies cleared (expires set to Thu, 01 Jan 1970)

**Verification**:
```bash
# Try to access protected route with logged out cookies
curl -X GET http://localhost:5000/api/v1/auth/me \
  -b cookies_after_logout.txt

# Should return NOT_AUTHENTICATED error
```

---

### Scenario 11: Rate Limiting

**Test Case**: Trigger rate limiting on auth endpoints

```bash
# Run this script to make 6 rapid requests (limit is 5)
for i in {1..6}; do
  echo "Request $i:"
  curl -X POST http://localhost:5000/api/v1/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"password123"}'
  echo -e "\n---"
done
```

**Expected Result**:
- First 5 requests: Normal response (even if credentials invalid)
- 6th request: Rate limit error
- HTTP Status: 429 Too Many Requests (for request 6)
- Response:
```json
{
  "success": false,
  "error": {
    "code": "TOO_MANY_AUTH_ATTEMPTS",
    "message": "Too many authentication attempts, please try again later"
  }
}
```

---

## Security Testing

### Test 1: SQL Injection Attempts

**Test Case**: Attempt SQL injection in email field

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com; DROP TABLE users;--",
    "password": "password"
  }'
```

**Expected Result**:
- No database modification
- Returns INVALID_CREDENTIALS (email not found)
- SQL injection prevented by Sequelize parameterized queries

---

### Test 2: XSS Attempts

**Test Case**: Attempt XSS in name field

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<script>alert(\"XSS\")</script>",
    "email": "xss.test@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

**Expected Result**:
- User created with sanitized name
- When retrieved, name should be properly escaped
- No script execution

**Verification**:
```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -b cookies.txt

# Check that response escapes HTML entities
```

---

### Test 3: Password Security

**Test Case**: Verify password is never returned

```bash
# Register user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Security Test",
    "email": "security.test@example.com",
    "password": "password123"
  }' \
  -c cookies.txt

# Check register response
# Check login response
# Check /me response
# Check database (should only see password_hash)
```

**Expected Result**:
- password_hash NEVER appears in any API response
- Only hashed password in database
- Original password not recoverable

---

### Test 4: Token Manipulation

**Test Case**: Attempt to use manipulated token

```bash
# Get valid token
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Manually edit cookies.txt and change token
# Then try to use it
curl -X GET http://localhost:5000/api/v1/auth/me \
  -b cookies.txt
```

**Expected Result**:
- HTTP Status: 403 Forbidden
- Response:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid access token"
  }
}
```

---

### Test 5: Cookie Security Flags

**Test Case**: Verify cookie security settings

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -v 2>&1 | grep -i "set-cookie"
```

**Expected Result**:
```
Set-Cookie: accessToken=...; HttpOnly; SameSite=Strict
Set-Cookie: refreshToken=...; HttpOnly; SameSite=Strict
```

In production (NODE_ENV=production):
```
Set-Cookie: accessToken=...; Secure; HttpOnly; SameSite=Strict
Set-Cookie: refreshToken=...; Secure; HttpOnly; SameSite=Strict
```

---

## Automated Testing Examples

### Jest + Supertest Test Suite

Create `backend/tests/auth.test.js`:

```javascript
const request = require('supertest');
const app = require('../src/app');
const { sequelize, User } = require('../src/models');

describe('Authentication Endpoints', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toHaveProperty('id');
      expect(response.body.data.user.email).toBe('test@example.com');
      expect(response.body.data.user).not.toHaveProperty('password_hash');

      // Check cookies
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies.some(c => c.startsWith('accessToken='))).toBe(true);
      expect(cookies.some(c => c.startsWith('refreshToken='))).toBe(true);
      expect(cookies.some(c => c.includes('HttpOnly'))).toBe(true);
    });

    it('should reject duplicate email', async () => {
      // First registration
      await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'User One',
          email: 'duplicate@example.com',
          password: 'password123'
        });

      // Duplicate registration
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'User Two',
          email: 'duplicate@example.com',
          password: 'password456'
        });

      expect(response.status).toBe(409);
      expect(response.body.error.code).toBe('EMAIL_EXISTS');
    });

    it('should validate input', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'A',
          email: 'invalid-email',
          password: 'short'
        });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details).toHaveLength(3);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Login Test',
          email: 'login@example.com',
          password: 'password123'
        });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('login@example.com');

      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    });
  });

  describe('GET /api/v1/auth/me', () => {
    let accessToken;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Me Test',
          email: 'me@example.com',
          password: 'password123'
        });

      const cookies = response.headers['set-cookie'];
      accessToken = cookies
        .find(c => c.startsWith('accessToken='))
        .split(';')[0];
    });

    it('should return current user with valid token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Cookie', accessToken);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('me@example.com');
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me');

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe('NOT_AUTHENTICATED');
    });
  });

  describe('POST /api/v1/auth/refresh', () => {
    let refreshToken;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Refresh Test',
          email: 'refresh@example.com',
          password: 'password123'
        });

      const cookies = response.headers['set-cookie'];
      refreshToken = cookies
        .find(c => c.startsWith('refreshToken='))
        .split(';')[0];
    });

    it('should issue new access token', async () => {
      const response = await request(app)
        .post('/api/v1/auth/refresh')
        .set('Cookie', refreshToken);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const cookies = response.headers['set-cookie'];
      expect(cookies.some(c => c.startsWith('accessToken='))).toBe(true);
    });

    it('should reject without refresh token', async () => {
      const response = await request(app)
        .post('/api/v1/auth/refresh');

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe('REFRESH_TOKEN_MISSING');
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    let accessToken;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Logout Test',
          email: 'logout@example.com',
          password: 'password123'
        });

      const cookies = response.headers['set-cookie'];
      accessToken = cookies
        .find(c => c.startsWith('accessToken='))
        .split(';')[0];
    });

    it('should clear cookies', async () => {
      const response = await request(app)
        .post('/api/v1/auth/logout')
        .set('Cookie', accessToken);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const cookies = response.headers['set-cookie'];
      // Cookies should be cleared (expire date in the past)
      expect(cookies.some(c => c.includes('expires=Thu, 01 Jan 1970'))).toBe(true);
    });
  });
});
```

### Running the Tests

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Add to package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}

# Run tests
npm test

# Run with coverage
npm run test:coverage
```

---

## Performance Testing

### Password Hashing Performance

```bash
# Test bcrypt performance with different rounds
node -e "
const bcrypt = require('bcrypt');
const rounds = [10, 11, 12, 13, 14];

async function test() {
  for (const r of rounds) {
    const start = Date.now();
    await bcrypt.hash('password123', r);
    const end = Date.now();
    console.log(\`Rounds: \${r}, Time: \${end - start}ms\`);
  }
}

test();
"
```

**Expected Results** (approximate):
- 10 rounds: ~50-100ms
- 11 rounds: ~100-200ms
- 12 rounds: ~200-400ms (current setting)
- 13 rounds: ~400-800ms
- 14 rounds: ~800-1600ms

---

## Integration Testing Checklist

- [ ] User can register with valid data
- [ ] User cannot register with duplicate email
- [ ] User cannot register with invalid data
- [ ] User can login with valid credentials
- [ ] User cannot login with invalid credentials
- [ ] User receives tokens in HttpOnly cookies
- [ ] User can access protected routes with valid token
- [ ] User cannot access protected routes without token
- [ ] User cannot access protected routes with invalid token
- [ ] User can refresh access token
- [ ] User cannot refresh without refresh token
- [ ] User can logout and cookies are cleared
- [ ] Rate limiting works on auth endpoints
- [ ] SQL injection attempts are prevented
- [ ] XSS attempts are sanitized
- [ ] Password is never returned in responses
- [ ] Token manipulation is detected
- [ ] Cookie security flags are set correctly

---

## Continuous Integration

### GitHub Actions Workflow

Create `.github/workflows/test-auth.yml`:

```yaml
name: Authentication Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: bookstore_user
          POSTGRES_PASSWORD: bookstore_pass
          POSTGRES_DB: bookstore_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: |
        cd backend
        npm install

    - name: Run tests
      env:
        NODE_ENV: test
        DB_HOST: localhost
        DB_PORT: 5432
        DB_NAME: bookstore_test
        DB_USER: bookstore_user
        DB_PASSWORD: bookstore_pass
        JWT_ACCESS_SECRET: test_access_secret_min_32_chars_long
        JWT_REFRESH_SECRET: test_refresh_secret_min_32_chars_long
      run: |
        cd backend
        npm test

    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./backend/coverage/lcov.info
```

---

## Troubleshooting Common Test Failures

### Test: "should set HttpOnly cookies"
**Failure**: Cookies not found in response
**Solution**: Check that cookie-parser middleware is installed and configured

### Test: "should reject duplicate email"
**Failure**: Second registration succeeds
**Solution**: Check unique constraint on email column in database

### Test: "should validate input"
**Failure**: Validation not working
**Solution**: Check authService.validateRegistrationInput implementation

### Test: "should hash password"
**Failure**: Password stored in plain text
**Solution**: Check bcrypt is installed and authService.hashPassword is called

### Test: "should reject invalid credentials"
**Failure**: Wrong password allows login
**Solution**: Check bcrypt.compare logic in authService.authenticateUser

---

## Next Steps

After completing testing:

1. Review test coverage report
2. Add tests for edge cases
3. Set up continuous integration
4. Configure monitoring and alerting
5. Document any additional test scenarios
6. Create load testing suite for production

---

## Resources

- Jest Documentation: https://jestjs.io/docs/getting-started
- Supertest Documentation: https://github.com/visionmedia/supertest
- Bcrypt Documentation: https://github.com/kelektiv/node.bcrypt.js
- JWT Documentation: https://jwt.io/introduction
