# BookStore - Quick Start Guide

Get up and running with the BookStore project in under 15 minutes.

## Prerequisites Check

Before you begin, verify you have:

```bash
# Node.js 20+
node --version  # Should show v20.x.x or higher

# PostgreSQL 15+
psql --version  # Should show 15.x or higher

# Git
git --version
```

If any are missing, install them:
- **Node.js**: https://nodejs.org/ (Download LTS version)
- **PostgreSQL**: https://www.postgresql.org/download/
- **Git**: https://git-scm.com/

## 5-Minute Setup (Experienced Developers)

```bash
# 1. Clone and navigate
git clone <repository-url>
cd bookstore

# 2. Install dependencies
cd client && npm install && cd ..
cd server && npm install && cd ..

# 3. Set up database
createdb bookstore_dev
psql bookstore_dev -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;"
psql bookstore_dev -f DATABASE_SCHEMA.sql

# 4. Configure environment
# Copy .env.example to .env and fill in secrets
# Generate JWT secrets:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 5. Start development servers
cd server && npm run dev &    # Terminal 1
cd client && npm run dev      # Terminal 2
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API: http://localhost:5000/api/v1

## Step-by-Step Setup (First-Time Developers)

### Step 1: Set Up Database (5 minutes)

```bash
# Start PostgreSQL service (varies by OS)
# Windows: Services > PostgreSQL
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Connect to PostgreSQL
psql -U postgres

# In PostgreSQL shell, run:
CREATE DATABASE bookstore_dev;
CREATE USER bookstore_user WITH PASSWORD 'BookStore2024!';
GRANT ALL PRIVILEGES ON DATABASE bookstore_dev TO bookstore_user;
\c bookstore_dev
CREATE EXTENSION IF NOT EXISTS pg_trgm;
\q

# Load schema
psql -U bookstore_user -d bookstore_dev -f DATABASE_SCHEMA.sql
```

### Step 2: Install Frontend Dependencies (2 minutes)

```bash
cd client
npm install
```

**Expected output:**
```
added 250 packages in 45s
```

### Step 3: Install Backend Dependencies (2 minutes)

```bash
cd ../server
npm install
```

**Expected output:**
```
added 180 packages in 35s
```

### Step 4: Configure Environment Variables (3 minutes)

**Generate JWT secrets:**
```bash
# Run this twice to get two different secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Create `client/.env.development`:**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=BookStore
VITE_ENABLE_DEVTOOLS=true
```

**Create `server/.env.development`:**
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore_dev
DB_USER=bookstore_user
DB_PASSWORD=BookStore2024!
DB_DIALECT=postgres

JWT_ACCESS_SECRET=<paste-first-generated-secret>
JWT_REFRESH_SECRET=<paste-second-generated-secret>
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

COOKIE_DOMAIN=localhost
COOKIE_SECURE=false

BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=debug
```

### Step 5: Start Development Servers (1 minute)

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Expected output:**
```
[INFO] Database connection established successfully
[INFO] Server running in development mode on port 5000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

**Expected output:**
```
VITE v5.0.0  ready in 450 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 6: Verify Setup

Open http://localhost:5173 in your browser.

**You should see:**
- BookStore home page
- Navigation menu (Home, Login, Register)
- Book listings (if you loaded sample data)

**Test backend:**
```bash
curl http://localhost:5000/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T12:00:00.000Z"
}
```

## Common Setup Issues

### Issue: "Port already in use"

**Solution:**
```bash
# Find and kill process using the port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue: "Database connection failed"

**Check:**
1. PostgreSQL is running: `pg_isready`
2. Database exists: `psql -l | grep bookstore_dev`
3. Credentials are correct in `.env.development`

**Solution:**
```bash
# Reset database
dropdb bookstore_dev
createdb bookstore_dev
psql bookstore_dev -f DATABASE_SCHEMA.sql
```

### Issue: "Cannot find module"

**Solution:**
```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: "JWT_ACCESS_SECRET is not defined"

**Solution:**
- Verify `.env.development` exists in `server/` directory
- Check file has no typos in variable names
- Restart the server after creating .env file

## Next Steps After Setup

### 1. Load Sample Data (Optional)

Add sample books and users to test the application:

```bash
cd server
npm run seed
```

### 2. Create Admin Account

Use the default admin (if seeded) or create one via PostgreSQL:

```sql
-- Connect to database
psql -U bookstore_user -d bookstore_dev

-- Insert admin user (password: Admin123!)
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@bookstore.com',
 '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5ajJnmDfyC4cK',
 'admin');
```

**Login credentials:**
- Email: admin@bookstore.com
- Password: Admin123!

### 3. Test Basic Functionality

**Register a new user:**
1. Navigate to http://localhost:5173/register
2. Fill in the form
3. Submit and verify redirect to home page

**Browse books:**
1. Navigate to http://localhost:5173
2. View book listings
3. Click on a book to see details

**Admin panel:**
1. Login as admin (admin@bookstore.com / Admin123!)
2. Navigate to http://localhost:5173/admin
3. Verify access to admin features

### 4. Explore the Codebase

**Key files to review:**

**Frontend:**
- `client/src/main.jsx` - Application entry point
- `client/src/App.jsx` - Root component
- `client/src/routes/AppRoutes.jsx` - Route definitions
- `client/src/api/client.js` - Axios configuration

**Backend:**
- `server/src/server.js` - Server entry point
- `server/src/app.js` - Express app configuration
- `server/src/routes/index.js` - Route aggregator
- `server/src/models/index.js` - Sequelize models

### 5. Read Documentation

Familiarize yourself with the architecture:

1. **[README.md](./README.md)** - Project overview
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture
3. **[API_REFERENCE.md](./API_REFERENCE.md)** - API endpoints
4. **[DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)** - Database structure

## Development Workflow

### Daily Development

```bash
# Start both servers (in separate terminals)
cd server && npm run dev
cd client && npm run dev

# Make changes to code
# Hot reload will update automatically

# Run tests
npm test

# Lint and format
npm run lint
npm run format
```

### Before Committing

```bash
# Lint code
npm run lint

# Format code
npm run format

# Run tests
npm test

# Check for TypeScript errors (if using TS)
npm run type-check
```

### Database Changes

```bash
# Create a new migration file
# Create file: server/src/migrations/YYYYMMDD-description.js

# Run migrations
npm run migrate

# Seed data
npm run seed
```

## Useful Commands

### Database

```bash
# Connect to database
psql -U bookstore_user -d bookstore_dev

# View all tables
\dt

# Describe table structure
\d users

# Count records
SELECT COUNT(*) FROM books;

# View all books
SELECT id, title, author, price FROM books;
```

### Testing API with cURL

```bash
# Health check
curl http://localhost:5000/health

# Get books
curl http://localhost:5000/api/v1/books

# Register user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123!"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}' \
  -c cookies.txt

# Authenticated request
curl http://localhost:5000/api/v1/auth/me -b cookies.txt
```

### VS Code Setup (Recommended)

**Install extensions:**
1. ESLint
2. Prettier - Code formatter
3. Tailwind CSS IntelliSense
4. PostgreSQL (by Chris Kolkman)

**Configure settings.json:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Getting Help

**If you encounter issues:**

1. Check the logs in the terminal
2. Review [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
3. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions
4. Search the error message online
5. Ask for help (provide error messages and logs)

**Useful debugging:**

```bash
# Backend logs
cd server
npm run dev
# Watch the console output

# Frontend logs
# Open browser DevTools (F12)
# Check Console and Network tabs

# Database logs
# Check PostgreSQL logs (location varies by OS)
tail -f /var/log/postgresql/postgresql-15-main.log  # Linux
```

## Tips for Success

1. **Keep both terminals open** - One for backend, one for frontend
2. **Use browser DevTools** - Inspect network requests and console logs
3. **Check database regularly** - Verify data is being saved correctly
4. **Read error messages** - They usually tell you exactly what's wrong
5. **Git commit often** - Make small, incremental commits
6. **Test as you go** - Don't wait until the end to test

## What's Next?

You're now ready to start development! Consider:

1. **Implementing a feature** - Start with something small (e.g., book search)
2. **Writing tests** - Add unit tests for a service or component
3. **Improving UI** - Enhance the design with Tailwind
4. **Adding documentation** - Document your code as you write it

Refer to the implementation phases in [ARCHITECTURE.md](./ARCHITECTURE.md) for a suggested development roadmap.

---

**Quick Start Version**: 1.0
**Last Updated**: 2025-11-03

Happy coding! 🚀
