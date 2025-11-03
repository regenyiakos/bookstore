# BookStore - Setup and Implementation Guide

This guide provides step-by-step instructions for setting up the BookStore project based on the architecture defined in `ARCHITECTURE.md`.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** 20.x LTS or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 15.x or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - PostgreSQL (for database management)

## Quick Start Commands

### 1. Initial Project Setup

```bash
# Create root directory
mkdir bookstore
cd bookstore

# Initialize Git repository
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment variables
.env
.env.local
.env.development.local
.env.production.local

# Build outputs
client/dist/
server/dist/
*.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Testing
coverage/

# Temporary files
*.tmp
*.temp
EOF
```

### 2. Frontend Setup

```bash
# Create client directory with Vite
npm create vite@latest client -- --template react

cd client

# Install core dependencies
npm install react-router-dom @tanstack/react-query @reduxjs/toolkit react-redux axios clsx react-hook-form zod @hookform/resolvers

# Install dev dependencies
npm install -D tailwindcss postcss autoprefixer prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks

# Initialize Tailwind CSS
npx tailwindcss init -p

cd ..
```

### 3. Backend Setup

```bash
# Create server directory
mkdir server
cd server

# Initialize package.json
npm init -y

# Install core dependencies
npm install express sequelize pg pg-hstore bcrypt jsonwebtoken cookie-parser cors dotenv express-validator helmet express-rate-limit morgan winston

# Install dev dependencies
npm install -D nodemon eslint prettier jest supertest

# Create folder structure
mkdir -p src/{config,controllers,middleware,models,routes,services,utils,seeders,migrations}
mkdir -p tests/{unit,integration}

cd ..
```

### 4. Database Setup

```bash
# Connect to PostgreSQL (adjust for your OS)
psql -U postgres

# In PostgreSQL shell:
CREATE DATABASE bookstore_dev;
CREATE USER bookstore_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE bookstore_dev TO bookstore_user;

# Enable required extensions
\c bookstore_dev
CREATE EXTENSION IF NOT EXISTS pg_trgm;
\q
```

### 5. Environment Configuration

```bash
# Generate JWT secrets
node -e "console.log('JWT_ACCESS_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Create client/.env.development
cat > client/.env.development << 'EOF'
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=BookStore
VITE_ENABLE_DEVTOOLS=true
EOF

# Create server/.env.development (replace secrets with generated ones)
cat > server/.env.development << 'EOF'
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore_dev
DB_USER=bookstore_user
DB_PASSWORD=your_password
DB_DIALECT=postgres

JWT_ACCESS_SECRET=paste_generated_secret_here
JWT_REFRESH_SECRET=paste_generated_secret_here
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

COOKIE_DOMAIN=localhost
COOKIE_SECURE=false

BCRYPT_ROUNDS=12

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

LOG_LEVEL=debug
EOF
```

## Detailed Configuration Files

### Frontend Configuration

#### client/tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
```

#### client/vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

#### client/.eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "react-hooks", "react-refresh"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-refresh/only-export-components": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

#### client/.prettierrc

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Backend Configuration

#### server/package.json (update scripts)

```json
{
  "name": "bookstore-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development nodemon src/server.js",
    "start": "NODE_ENV=production node src/server.js",
    "migrate": "node src/migrations/migrate.js",
    "seed": "node src/seeders/seed.js",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext js",
    "format": "prettier --write \"src/**/*.{js,json}\""
  }
}
```

#### server/.eslintrc.json

```json
{
  "env": {
    "node": true,
    "es2021": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-console": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

#### server/.prettierrc

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## File Templates

### Frontend Entry Points

#### client/src/main.jsx

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import './styles/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          {import.meta.env.VITE_ENABLE_DEVTOOLS === 'true' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
```

#### client/src/styles/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-secondary {
    @apply rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }

  .input-field {
    @apply w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 disabled:bg-gray-100 disabled:cursor-not-allowed;
  }

  .card {
    @apply rounded-lg border border-gray-200 bg-white p-6 shadow-sm;
  }
}
```

### Backend Entry Points

#### server/src/server.js

```javascript
import dotenv from 'dotenv';
import app from './app.js';
import { sequelize } from './models/index.js';
import logger from './utils/logger.js';

// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const PORT = process.env.PORT || 5000;

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    logger.info('Database connection established successfully');

    // Sync models (development only - use migrations in production)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false });
      logger.info('Database models synchronized');
    }

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();
```

#### server/src/app.js

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
}

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/v1', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
```

## Development Workflow

### Running the Application

```bash
# Terminal 1: Start PostgreSQL (if not running as service)
# Varies by OS

# Terminal 2: Start backend
cd server
npm run dev

# Terminal 3: Start frontend
cd client
npm run dev
```

### Common Development Tasks

```bash
# Run linting
npm run lint

# Format code
npm run format

# Run tests
npm test

# Create database migration (manual - Sequelize CLI alternative)
# Create a new file in server/src/migrations/

# Run seeders
npm run seed

# Check database
psql -U bookstore_user -d bookstore_dev
```

## Testing Strategy

### Backend Testing

```bash
# Install testing dependencies (if not already installed)
cd server
npm install -D jest supertest

# Example test structure:
# tests/unit/services/authService.test.js
# tests/integration/routes/authRoutes.test.js
```

### Frontend Testing

```bash
# Install testing dependencies
cd client
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Run tests
npm run test
```

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Environment variables configured for production
- [ ] Database migrations ready
- [ ] HTTPS certificate configured
- [ ] CORS origins updated for production domain
- [ ] Rate limiting configured appropriately
- [ ] Logging configured for production
- [ ] Error tracking set up (Sentry, etc.)
- [ ] Database backups configured
- [ ] Secrets rotated from development values

### Backend Deployment (Render/Railway)

1. Connect Git repository
2. Set environment variables from `.env.production`
3. Configure build command: `npm install`
4. Configure start command: `npm start`
5. Set up PostgreSQL database service
6. Run migrations
7. Test health endpoint

### Frontend Deployment (Vercel)

1. Connect Git repository
2. Set framework preset: Vite
3. Configure environment variables
4. Set output directory: `dist`
5. Deploy

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
pg_isready

# Check connection details
psql -U bookstore_user -d bookstore_dev

# Reset database
dropdb bookstore_dev
createdb bookstore_dev
```

### Port Already in Use

```bash
# Find process using port (Linux/Mac)
lsof -i :5000

# Find process using port (Windows)
netstat -ano | findstr :5000

# Kill process
kill -9 <PID>  # Linux/Mac
taskkill /PID <PID> /F  # Windows
```

### Node Modules Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/)
- [Express Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## Getting Help

If you encounter issues during setup:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that PostgreSQL is running and accessible
5. Review the ARCHITECTURE.md for design decisions
6. Consult the official documentation for each technology

---

**Document Version**: 1.0
**Last Updated**: 2025-11-03
