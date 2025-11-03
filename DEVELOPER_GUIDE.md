# Developer Guide

Welcome to the BookStore project! This guide will help you set up your development environment and understand the development workflow.

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Development Tools](#development-tools)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Code Quality](#code-quality)
6. [Testing](#testing)
7. [Debugging](#debugging)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)

## Environment Setup

### Step 1: Prerequisites

Ensure you have the following installed:
- **Node.js 18+** (check: `node --version`)
- **npm 9+** (check: `npm --version`)
- **Docker Desktop** (check: `docker --version`)
- **Git** (check: `git --version`)

### Step 2: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd bookstore

# Install all dependencies (root + workspaces)
npm install
```

### Step 3: Environment Configuration

```bash
# Copy environment templates
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit environment files with your configuration
# At minimum, ensure database credentials match in:
# - .env (Docker config)
# - backend/.env (Backend database connection)
```

### Step 4: Start Database

```bash
# Start PostgreSQL with Docker
npm run db:up

# Verify database is running
docker ps

# You should see: bookstore_postgres
```

### Step 5: Start Development Servers

```bash
# Option 1: Start both frontend and backend
npm run dev

# Option 2: Start individually
npm run dev:frontend  # Terminal 1
npm run dev:backend   # Terminal 2
```

### Step 6: Verify Setup

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api
- Database: localhost:5432

## Development Tools

### VS Code (Recommended)

This project is optimized for VS Code with pre-configured settings.

#### Recommended Extensions

VS Code will prompt you to install recommended extensions. Install them all:

**Code Quality:**
- ESLint - JavaScript linting
- Prettier - Code formatting
- EditorConfig - Consistent editor settings

**Development:**
- ES7+ React/Redux/React-Native snippets
- JavaScript (ES6) code snippets
- TypeScript support

**Database:**
- PostgreSQL - Database management
- SQLTools - SQL queries
- SQLTools PostgreSQL Driver

**Docker:**
- Docker - Container management

**Git:**
- GitLens - Git supercharged
- Git Graph - Visualize branches

**Utilities:**
- Path Intellisense - Auto-complete paths
- Error Lens - Inline error display
- Color Highlight - Visualize colors
- Todo Highlight - Track TODOs

**API Testing:**
- Thunder Client - REST API testing
- REST Client - HTTP requests

#### VS Code Settings

Pre-configured settings include:
- Format on save (Prettier)
- ESLint auto-fix on save
- Organize imports on save
- 100 character line limit
- Consistent tab width (2 spaces)

### Git Hooks

Pre-commit hooks automatically run on every commit:
- **ESLint** - Checks JavaScript files
- **Prettier** - Formats all files
- Only staged files are checked (fast)

To bypass hooks (not recommended):
```bash
git commit --no-verify -m "message"
```

## Project Structure

```
bookstore/
├── .vscode/              # VS Code configuration
│   ├── settings.json     # Editor settings
│   ├── extensions.json   # Recommended extensions
│   └── launch.json       # Debug configurations
│
├── .husky/              # Git hooks
│   └── pre-commit       # Pre-commit hook
│
├── frontend/            # React application
│   ├── src/
│   │   ├── api/        # API client
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   ├── routes/     # Routing
│   │   ├── store/      # Redux store
│   │   └── utils/      # Utilities
│   └── package.json
│
├── backend/             # Express API
│   ├── src/
│   │   ├── config/     # Configuration
│   │   ├── controllers/# Route handlers
│   │   ├── middleware/ # Express middleware
│   │   ├── models/     # Sequelize models
│   │   ├── routes/     # API routes
│   │   ├── services/   # Business logic
│   │   └── utils/      # Utilities
│   └── package.json
│
├── docker-compose.yml   # Docker services
├── package.json        # Root package (workspaces)
└── [config files]      # Various config files
```

## Development Workflow

### Daily Workflow

1. **Start your day**
   ```bash
   # Pull latest changes
   git pull origin main

   # Start database
   npm run db:up

   # Start development servers
   npm run dev
   ```

2. **Make changes**
   - Edit files
   - Save (auto-format with Prettier)
   - Test in browser

3. **Commit changes**
   ```bash
   # Stage files
   git add .

   # Commit (pre-commit hooks run automatically)
   git commit -m "feat: add new feature"

   # Push to remote
   git push origin feature-branch
   ```

### Creating a New Feature

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Implement feature
# ... make changes ...

# 3. Test feature
npm test

# 4. Commit changes
git add .
git commit -m "feat: implement my feature"

# 5. Push to remote
git push origin feature/my-feature

# 6. Create Pull Request on GitHub
```

### Commit Message Convention

Use conventional commits format:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting changes
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add user profile page"
git commit -m "fix: resolve login authentication issue"
git commit -m "docs: update API documentation"
git commit -m "refactor: simplify cart calculation logic"
```

## Code Quality

### Linting

```bash
# Lint all workspaces
npm run lint

# Lint and auto-fix
npm run lint:fix

# Lint specific workspace
npm run lint --workspace=frontend
npm run lint --workspace=backend
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check

# Format specific directory
npx prettier --write "frontend/src/**/*.{js,jsx}"
```

### Pre-commit Hooks

Automatically run on commit:
1. ESLint checks staged `.js` and `.jsx` files
2. Prettier formats staged files
3. Commit fails if errors found

To manually trigger:
```bash
npx lint-staged
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Watch mode (re-run on changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Debugging

### VS Code Debugging

Pre-configured debug configurations:

1. **Debug Backend**
   - Start backend with Node.js debugger
   - Set breakpoints in backend code
   - Press F5 or use Debug panel

2. **Debug Frontend (Chrome)**
   - Launches Chrome with debugger
   - Requires backend to be running
   - Set breakpoints in frontend code

3. **Full Stack Debug**
   - Debugs both frontend and backend simultaneously
   - Most useful for full feature development

### Console Debugging

**Backend:**
```javascript
// Winston logger
logger.info('User logged in', { userId: user.id });
logger.error('Database error', { error: err.message });

// Console (development only)
console.log('Debug info', data);
```

**Frontend:**
```javascript
// Console methods
console.log('Info message', data);
console.error('Error occurred', error);
console.table(arrayData); // Formatted table

// React Query DevTools (automatically available in dev)
// Redux DevTools (browser extension required)
```

## Common Tasks

### Database Management

```bash
# Start database
npm run db:up

# Stop database
npm run db:down

# Reset database (deletes all data)
npm run db:reset

# View database logs
docker logs bookstore_postgres

# Access PostgreSQL CLI
docker exec -it bookstore_postgres psql -U bookstore_user -d bookstore_db
```

### Using pgAdmin (Optional)

```bash
# Start pgAdmin
docker-compose --profile tools up -d pgadmin

# Access: http://localhost:5050
# Login: admin@bookstore.local / admin

# Add server in pgAdmin:
# Host: postgres (not localhost!)
# Port: 5432
# Username: bookstore_user
# Password: bookstore_pass
```

### Adding Dependencies

```bash
# Add to frontend
npm install package-name --workspace=frontend

# Add to backend
npm install package-name --workspace=backend

# Add dev dependency to frontend
npm install -D package-name --workspace=frontend

# Add to root (tools like husky, prettier)
npm install -D package-name
```

### Managing Node Modules

```bash
# Clean install (if issues occur)
rm -rf node_modules frontend/node_modules backend/node_modules
npm install

# Update dependencies
npm update --workspaces

# Audit security vulnerabilities
npm audit
npm audit fix
```

### Docker Commands

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View logs
docker logs bookstore_postgres
docker logs -f bookstore_postgres  # Follow logs

# Stop all services
docker-compose down

# Remove volumes (deletes database data)
docker-compose down -v

# Rebuild containers
docker-compose up -d --build
```

## Troubleshooting

### Port Already in Use

**Problem:** Error: Port 3000 (or 5173) already in use

**Solution:**
```bash
# Find process using port (macOS/Linux)
lsof -i :3000

# Find process using port (Windows)
netstat -ano | findstr :3000

# Kill the process or change port in .env
```

### Database Connection Refused

**Problem:** Backend cannot connect to database

**Solution:**
```bash
# Check if database is running
docker ps

# Check database logs
docker logs bookstore_postgres

# Restart database
npm run db:down && npm run db:up

# Verify credentials match in .env and backend/.env
```

### Git Hooks Not Running

**Problem:** Pre-commit hooks don't execute

**Solution:**
```bash
# Reinstall Husky
npm run prepare

# Check .husky/pre-commit is executable
chmod +x .husky/pre-commit

# Verify Husky is installed
ls -la .husky
```

### ESLint/Prettier Conflicts

**Problem:** ESLint and Prettier show conflicting errors

**Solution:**
```bash
# ESLint config disables conflicting rules
# If issues persist:

# 1. Check .eslintrc.json has:
#    "extends": ["prettier"]

# 2. Disable ESLint formatting rules
#    (Prettier handles formatting)

# 3. Restart VS Code
```

### Workspace Dependencies Not Found

**Problem:** Module not found errors after installing

**Solution:**
```bash
# Ensure package.json has workspaces:
# "workspaces": ["frontend", "backend"]

# Reinstall from root
npm install

# Clear npm cache if needed
npm cache clean --force
npm install
```

### Docker Permission Issues (Linux)

**Problem:** Permission denied when running Docker commands

**Solution:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in, then verify
docker ps
```

## Best Practices

### Code Style

- Use ES6+ features (arrow functions, destructuring, async/await)
- Follow single responsibility principle
- Keep functions small and focused
- Use meaningful variable names
- Add comments for complex logic
- Avoid magic numbers (use constants)

### React Components

- Use functional components with hooks
- Keep components small and reusable
- Use custom hooks for shared logic
- Implement error boundaries
- Use React.memo for expensive components
- Prefer composition over inheritance

### Backend Development

- Use try-catch for async operations
- Validate all inputs
- Use Sequelize transactions for multi-step operations
- Implement proper error handling
- Log errors with Winston
- Use middleware for common functionality

### Git Workflow

- Commit often with meaningful messages
- Pull before pushing
- Keep commits focused (single purpose)
- Don't commit node_modules or .env files
- Write descriptive PR descriptions
- Review your own code before submitting PR

### Database

- Use migrations for schema changes
- Never edit migrations after they're deployed
- Write down migrations for reversibility
- Add indexes for frequently queried columns
- Use transactions for data consistency

## Resources

### Internal Documentation

- [README.md](./README.md) - Project overview
- [QUICKSTART.md](./QUICKSTART.md) - Quick setup guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture
- [API_REFERENCE.md](./API_REFERENCE.md) - API documentation
- [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql) - Database schema

### External Resources

**React:**
- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Redux Toolkit](https://redux-toolkit.js.org/)

**Backend:**
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [JWT](https://jwt.io/)

**Styling:**
- [Tailwind CSS](https://tailwindcss.com/)

**Development:**
- [Docker](https://docs.docker.com/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Getting Help

1. Check this guide first
2. Review relevant documentation
3. Search existing issues
4. Ask team members
5. Create detailed issue with:
   - What you're trying to do
   - What you expected
   - What actually happened
   - Steps to reproduce
   - Error messages
   - Your environment (OS, Node version, etc.)

---

Happy coding! If you have questions or suggestions for improving this guide, please submit a PR.
