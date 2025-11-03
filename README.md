# BookStore - Full-Stack E-Commerce Application

A modern, responsive web application for browsing, purchasing, and reviewing books. Built with React, Node.js, Express, and PostgreSQL.

## Project Status

**Current Phase**: Development Environment Ready ✅

**Next Phase**: Frontend & Backend Implementation

## Documentation

This project includes comprehensive architectural documentation:

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide to get up and running in 5 minutes
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete technical architecture, database design, API structure, and security implementation
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Step-by-step setup instructions for local development
- **[DEPENDENCIES.md](./DEPENDENCIES.md)** - Detailed explanation of all dependencies and their purposes
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete API documentation with request/response examples
- **[DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)** - PostgreSQL schema with indexes, constraints, and sample queries
- **[CLAUDE.md](./CLAUDE.md)** - Project instructions for Claude Code

## Quick Start

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **Docker & Docker Compose** (for database)
- **Git**
- **npm 9+** or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bookstore

# Install root dependencies and set up workspaces
npm install

# Set up environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with your configuration
# See QUICKSTART.md for detailed setup instructions

# Start PostgreSQL database with Docker
npm run db:up

# Wait for database to be healthy (about 30 seconds)
# Then run migrations (when backend is implemented)
# npm run migrate --workspace=backend
```

### Development

```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually:
npm run dev:frontend   # Frontend only (http://localhost:5173)
npm run dev:backend    # Backend only (http://localhost:3000)
```

### Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **pgAdmin** (optional): http://localhost:5050
  - Start with: `docker-compose --profile tools up -d pgadmin`
  - Default login: admin@bookstore.local / admin

### Useful Commands

```bash
# Database Management
npm run db:up          # Start database
npm run db:down        # Stop database
npm run db:reset       # Reset database (deletes all data)

# Code Quality
npm run lint           # Lint all workspaces
npm run format         # Format code with Prettier
npm run format:check   # Check formatting

# Docker Services
npm run docker:up      # Start all services
npm run docker:down    # Stop all services
npm run docker:logs    # View logs
```

## Features

### User Features
- Browse books with advanced filtering (category, author, price, search)
- View detailed book information with user reviews
- User authentication (register, login, logout)
- Shopping cart management
- Checkout and order placement
- Order history tracking
- Write and manage book reviews
- Profile management (update info, change password)

### Admin Features
- Complete book CRUD operations
- User management (view, role assignment, delete)
- Order tracking and status updates
- Dashboard with statistics and analytics
- Inventory management

### Technical Features
- JWT-based authentication with HttpOnly cookies
- Role-based access control (RBAC)
- Rate limiting for security
- Input validation and sanitization
- Responsive design (mobile-first)
- Optimistic UI updates
- Automatic token refresh
- Comprehensive error handling
- Docker-based development environment
- Hot module replacement (HMR)
- Git hooks for code quality

## Technology Stack

### Frontend
- **React 18** - UI library with concurrent features
- **Vite** - Next-generation build tool (fast HMR)
- **React Router v6** - Declarative routing
- **TanStack Query** - Server state management and caching
- **Redux Toolkit** - Client state management (cart, auth)
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation
- **Axios** - HTTP client with interceptors

### Backend
- **Node.js 20** - JavaScript runtime
- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **PostgreSQL 16** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **Winston** - Logging

### Development Tools
- **Docker & Docker Compose** - Containerized database
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files
- **Concurrently** - Run multiple commands
- **Nodemon** - Auto-reload backend
- **Jest** - Testing framework
- **Supertest** - API testing

## Project Structure

```
bookstore/
├── frontend/               # Frontend React application
│   ├── src/
│   │   ├── api/           # API client and endpoints
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configuration
│   │   ├── store/         # Redux store
│   │   └── utils/         # Utility functions
│   ├── .env.example       # Frontend environment template
│   └── package.json
│
├── backend/                # Backend Node.js application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # Route definitions
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   ├── .env.example       # Backend environment template
│   └── package.json
│
├── .vscode/               # VS Code workspace settings
│   ├── settings.json      # Editor configuration
│   ├── extensions.json    # Recommended extensions
│   └── launch.json        # Debug configurations
│
├── .husky/                # Git hooks
│   └── pre-commit         # Pre-commit hook
│
├── docker-compose.yml     # Docker services configuration
├── .gitignore            # Git ignore patterns
├── .editorconfig         # Editor configuration
├── .prettierrc.json      # Prettier configuration
├── .prettierignore       # Prettier ignore patterns
├── .eslintignore         # ESLint ignore patterns
├── .lintstagedrc.json    # lint-staged configuration
├── .env.example          # Root environment template (Docker)
├── package.json          # Root package.json with workspaces
│
├── ARCHITECTURE.md       # Technical architecture
├── SETUP_GUIDE.md       # Setup instructions
├── QUICKSTART.md        # Quick start guide
├── API_REFERENCE.md     # API documentation
├── DATABASE_SCHEMA.sql  # Database schema
└── README.md            # This file
```

## API Overview

Base URL: `http://localhost:3000/api`

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user

### Book Endpoints
- `GET /books` - Get books (with filtering, pagination)
- `GET /books/:id` - Get book details
- `POST /books` - Create book (admin)
- `PUT /books/:id` - Update book (admin)
- `DELETE /books/:id` - Delete book (admin)

### Review Endpoints
- `GET /books/:bookId/reviews` - Get book reviews
- `POST /books/:bookId/reviews` - Create review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

### Order Endpoints
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get order details
- `POST /orders` - Create order
- `PATCH /orders/:id/status` - Update order status (admin)

### User Management (Admin)
- `GET /users` - Get all users
- `GET /users/:id` - Get user details
- `PATCH /users/:id/role` - Update user role
- `DELETE /users/:id` - Delete user

### Profile Endpoints
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `PUT /profile/password` - Change password

### Statistics (Admin)
- `GET /admin/statistics` - Get dashboard statistics

See [API_REFERENCE.md](./API_REFERENCE.md) for complete documentation.

## Database Schema

### Tables
- **users** - User accounts and authentication
- **books** - Book catalog with pricing and inventory
- **reviews** - User reviews and ratings
- **orders** - Order headers
- **order_items** - Order line items

### Key Relationships
- User has many Reviews
- User has many Orders
- Book has many Reviews
- Book has many Order Items
- Order has many Order Items

See [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql) for complete schema with indexes and constraints.

## Security Features

### Authentication
- JWT tokens stored in HttpOnly cookies (XSS protection)
- Separate access (15 min) and refresh (7 days) tokens
- Automatic token rotation
- Secure cookie attributes (Secure, SameSite=Strict)

### Authorization
- Role-based access control (user, admin)
- Route-level permission checks
- Owner-based resource access

### Data Protection
- bcrypt password hashing (cost factor: 12)
- SQL injection prevention (Sequelize parameterized queries)
- Input validation (express-validator, Zod)
- Input sanitization
- Security headers (Helmet)

### API Security
- Rate limiting (global and endpoint-specific)
- CORS configuration
- Request size limits
- Error messages don't leak sensitive data

## Development Workflow

### Code Quality

All code is automatically checked before commit using Husky and lint-staged:

```bash
# Manual checks
npm run lint           # Lint code
npm run lint:fix       # Fix lint errors
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting

# Run tests
npm test              # Run all tests
```

### Database Management

```bash
# Using Docker (recommended)
npm run db:up         # Start PostgreSQL
npm run db:down       # Stop PostgreSQL
npm run db:reset      # Reset database (deletes all data)

# Access pgAdmin
docker-compose --profile tools up -d pgadmin
# Visit http://localhost:5050
# Login: admin@bookstore.local / admin
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# ... edit files ...

# Stage and commit (pre-commit hook will run automatically)
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/your-feature-name
```

### Git Commit Convention

Use conventional commits format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Testing

### Backend Testing
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Frontend Testing
```bash
cd frontend
npm test                    # Run all tests
npm run test:watch         # Watch mode
```

## Deployment

### Backend Deployment (Render/Railway)
1. Connect Git repository
2. Set environment variables from `.env.production`
3. Configure build: `npm install`
4. Configure start: `npm start`
5. Set up PostgreSQL database
6. Run migrations

### Frontend Deployment (Vercel)
1. Connect Git repository
2. Set framework: Vite
3. Set environment variables
4. Configure output: `dist`
5. Deploy

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed deployment instructions.

## Performance Optimization

### Database
- Indexes on all foreign keys and common filters
- Connection pooling (Sequelize default: 5)
- Query optimization with eager loading
- Pagination on all list endpoints

### Frontend
- Code splitting by route (React.lazy)
- TanStack Query caching (5 min staleTime)
- Image lazy loading
- Debounced search inputs

### Backend
- Response compression (gzip)
- Rate limiting
- Efficient query patterns
- Proper HTTP caching headers

## Monitoring and Logging

### Backend Logging
- Winston for structured logging
- Log levels: error, warn, info, debug
- Separate error and combined logs
- Request logging with Morgan

### Metrics to Track
- API response times
- Error rates
- Database query performance
- Authentication success/failure
- Order completion rate

## Environment Variables

### Root (.env) - Docker Configuration
```env
POSTGRES_USER=bookstore_user
POSTGRES_PASSWORD=bookstore_pass
POSTGRES_DB=bookstore_db
POSTGRES_PORT=5432
```

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=BookStore
VITE_DEBUG=true
```

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore_db
DB_USER=bookstore_user
DB_PASSWORD=bookstore_pass
JWT_ACCESS_SECRET=generate_with_crypto
JWT_REFRESH_SECRET=generate_with_crypto
# ... see backend/.env.example for complete list
```

## VS Code Setup

This project includes recommended VS Code settings and extensions:

1. Install recommended extensions (VS Code will prompt you)
2. Settings are pre-configured for:
   - Format on save with Prettier
   - ESLint auto-fix on save
   - Consistent editor behavior

### Debug Configuration

Use VS Code's debug panel to:
- **Debug Backend** - Start backend with debugger
- **Debug Frontend (Chrome)** - Launch Chrome with debugger
- **Full Stack Debug** - Debug both frontend and backend simultaneously

## Contributing

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system design
2. Follow the coding standards (ESLint + Prettier)
3. Write tests for new features
4. Update documentation as needed
5. Submit pull requests with clear descriptions
6. Ensure all commits pass pre-commit hooks

## Future Enhancements

Planned features for future versions:
- [ ] Wishlist functionality
- [ ] Recommendation system based on purchase history
- [ ] Multi-language support (i18n)
- [ ] React Native mobile app
- [ ] Digital book downloads (PDF/e-book)
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Advanced search with filters
- [ ] Book preview (sample pages)
- [ ] Social sharing
- [ ] Gift cards
- [ ] Loyalty program

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps

# View database logs
docker logs bookstore_postgres

# Restart database
npm run db:down && npm run db:up
```

### Port Already in Use
```bash
# Find process using port 3000 (backend)
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or change port in .env
```

### Git Hooks Not Running
```bash
# Reinstall Husky hooks
npm run prepare
```

## License

This project is proprietary. All rights reserved.

## Support

For questions or issues:
- Check [QUICKSTART.md](./QUICKSTART.md) for quick setup help
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions
- Consult [API_REFERENCE.md](./API_REFERENCE.md) for API details
- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions

---

**Project Version**: 1.0.0
**Documentation Last Updated**: 2025-11-03
**Development Environment**: Ready ✅
**Ready for Implementation**: ✅

Built with modern web technologies and DevOps best practices
