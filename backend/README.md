# BookStore Backend API

RESTful API backend for the BookStore application built with Node.js, Express, Sequelize, and PostgreSQL.

## Features

- JWT-based authentication with HttpOnly cookies
- Role-based access control (User/Admin)
- RESTful API design with consistent response format
- Request validation and sanitization
- Rate limiting and security headers
- Structured logging with Winston
- Database migrations and seeders
- Error handling middleware

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Winston** - Logging
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+
- Git

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Generate JWT secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

4. Update `.env` with your configuration:
   - Database credentials
   - JWT secrets (generated above)
   - Port and environment settings

## Database Setup

1. Create the database:
```bash
npm run db:create
```

2. Run migrations:
```bash
npm run db:migrate
```

3. (Optional) Seed the database:
```bash
npm run db:seed
```

## Development

Start the development server with auto-reload:
```bash
npm run dev
```

The API will be available at `http://localhost:5000/api/v1`

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run db:create` - Create database
- `npm run db:drop` - Drop database
- `npm run db:migrate` - Run all migrations
- `npm run db:migrate:undo` - Undo last migration
- `npm run db:seed` - Run all seeders
- `npm run db:seed:undo` - Undo all seeders
- `npm run db:reset` - Drop, create, migrate, and seed database

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.js   # Sequelize configuration
│   │   └── jwt.js        # JWT configuration
│   ├── models/           # Sequelize models
│   │   ├── User.js
│   │   ├── Book.js
│   │   ├── Review.js
│   │   ├── Order.js
│   │   ├── OrderItem.js
│   │   └── index.js      # Model associations
│   ├── middleware/       # Express middleware
│   │   ├── auth.js       # JWT authentication
│   │   ├── roleCheck.js  # RBAC middleware
│   │   ├── errorHandler.js
│   │   └── validate.js   # Validation middleware
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── books.js
│   │   ├── reviews.js
│   │   ├── orders.js
│   │   ├── users.js
│   │   └── index.js
│   ├── controllers/      # Route controllers (to be implemented)
│   ├── services/         # Business logic (to be implemented)
│   ├── utils/            # Utility functions
│   │   ├── logger.js     # Winston logger
│   │   └── helpers.js    # Helper functions
│   ├── database/
│   │   ├── migrations/   # Database migrations
│   │   └── seeders/      # Database seeders
│   ├── app.js            # Express app setup
│   └── server.js         # Server entry point
├── logs/                 # Log files
├── .env.example          # Environment variables template
├── .sequelizerc          # Sequelize CLI configuration
├── nodemon.json          # Nodemon configuration
├── .eslintrc.json        # ESLint configuration
├── .prettierrc.json      # Prettier configuration
└── package.json
```

## API Endpoints

### Health Check
- `GET /api/v1/health` - API health status

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user

### Books
- `GET /api/v1/books` - Get all books (with pagination/filters)
- `GET /api/v1/books/:id` - Get book by ID
- `POST /api/v1/books` - Create book (Admin only)
- `PUT /api/v1/books/:id` - Update book (Admin only)
- `DELETE /api/v1/books/:id` - Delete book (Admin only)

### Reviews
- `GET /api/v1/books/:bookId/reviews` - Get book reviews
- `POST /api/v1/books/:bookId/reviews` - Create review
- `PUT /api/v1/reviews/:id` - Update review (Owner/Admin)
- `DELETE /api/v1/reviews/:id` - Delete review (Owner/Admin)

### Orders
- `GET /api/v1/orders` - Get user orders
- `GET /api/v1/orders/:id` - Get order details
- `POST /api/v1/orders` - Create order
- `PATCH /api/v1/orders/:id/status` - Update order status (Admin)

### Users (Admin)
- `GET /api/v1/users` - Get all users (Admin)
- `GET /api/v1/users/:id` - Get user by ID (Admin)
- `PATCH /api/v1/users/:id/role` - Update user role (Admin)
- `DELETE /api/v1/users/:id` - Delete user (Admin)

### Profile
- `GET /api/v1/users/profile` - Get current user profile
- `PUT /api/v1/users/profile` - Update profile
- `PUT /api/v1/users/profile/password` - Change password

## Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - Database config
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` - JWT secrets
- `CLIENT_URL` - Frontend URL for CORS

## Security Features

- HttpOnly cookies for JWT tokens (XSS prevention)
- SameSite cookies (CSRF prevention)
- Helmet security headers
- Rate limiting on all endpoints
- Stricter rate limiting on auth endpoints
- bcrypt password hashing (cost factor: 12)
- Input validation with express-validator
- SQL injection prevention via Sequelize ORM

## License

ISC
