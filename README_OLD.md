# BookStore - Full-Stack E-Commerce Application

A modern, responsive web application for browsing, purchasing, and reviewing books. Built with React, Node.js, Express, and PostgreSQL.

## Project Status

**Current Phase**: Architecture & Planning Complete ✅

**Next Phase**: Implementation (Ready to Begin)

## Documentation

This project includes comprehensive architectural documentation:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete technical architecture, database design, API structure, and security implementation
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Step-by-step setup instructions for local development
- **[DEPENDENCIES.md](./DEPENDENCIES.md)** - Detailed explanation of all dependencies and their purposes
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete API documentation with request/response examples
- **[DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)** - PostgreSQL schema with indexes, constraints, and sample queries
- **[CLAUDE.md](./CLAUDE.md)** - Project instructions for Claude Code

## Quick Start

### Prerequisites

- Node.js 20+ LTS
- PostgreSQL 15+
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bookstore

# Set up frontend
cd client
npm install

# Set up backend
cd ../server
npm install

# Set up database
psql -U postgres
CREATE DATABASE bookstore_dev;
CREATE USER bookstore_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE bookstore_dev TO bookstore_user;
\c bookstore_dev
CREATE EXTENSION IF NOT EXISTS pg_trgm;
\q

# Run database schema
psql -U bookstore_user -d bookstore_dev -f DATABASE_SCHEMA.sql

# Configure environment variables
# See SETUP_GUIDE.md for detailed instructions
```

### Development

```bash
# Terminal 1: Start backend (from /server)
npm run dev

# Terminal 2: Start frontend (from /client)
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API: http://localhost:5000/api/v1

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
- **PostgreSQL 15** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **Winston** - Logging

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Supertest** - API testing

## Project Structure

```
bookstore/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API client and endpoints
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configuration
│   │   ├── store/         # Redux store
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── server/                 # Backend Node.js application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # Route definitions
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── ARCHITECTURE.md         # Technical architecture
├── SETUP_GUIDE.md         # Setup instructions
├── API_REFERENCE.md       # API documentation
├── DATABASE_SCHEMA.sql    # Database schema
└── README.md              # This file
```

## API Overview

Base URL: `http://localhost:5000/api/v1`

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
```bash
# Lint code
npm run lint

# Format code
npm run format

# Run tests
npm test
```

### Database Management
```bash
# Create migration
# Create file in server/src/migrations/

# Run migrations
npm run migrate

# Seed database
npm run seed
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Commit changes
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/your-feature-name
```

## Testing

### Backend Testing
```bash
cd server
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Frontend Testing
```bash
cd client
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

### Frontend (.env.development)
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=BookStore
VITE_ENABLE_DEVTOOLS=true
```

### Backend (.env.development)
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore_dev
DB_USER=bookstore_user
DB_PASSWORD=your_password
JWT_ACCESS_SECRET=generate_with_crypto
JWT_REFRESH_SECRET=generate_with_crypto
# ... see SETUP_GUIDE.md for complete list
```

## Contributing

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system design
2. Follow the coding standards (ESLint + Prettier)
3. Write tests for new features
4. Update documentation as needed
5. Submit pull requests with clear descriptions

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

## License

This project is proprietary. All rights reserved.

## Support

For questions or issues:
- Check documentation in this repository
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions
- Consult [API_REFERENCE.md](./API_REFERENCE.md) for API details
- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for setup help

---

**Project Version**: 1.0.0
**Documentation Last Updated**: 2025-11-03
**Ready for Implementation**: ✅

Built with ❤️ using modern web technologies
