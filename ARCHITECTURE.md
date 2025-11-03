# BookStore - Technical Architecture Plan

## 1. Project Structure

### 1.1 Monorepo Layout

```
bookstore/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   │   ├── images/            # Image assets
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/               # API client and endpoint definitions
│   │   │   ├── client.js      # Axios instance with interceptors
│   │   │   ├── books.js       # Book-related API calls
│   │   │   ├── auth.js        # Authentication API calls
│   │   │   ├── users.js       # User management API calls
│   │   │   ├── orders.js      # Order management API calls
│   │   │   └── reviews.js     # Review API calls
│   │   ├── assets/            # Images, fonts, etc.
│   │   ├── components/        # Reusable React components
│   │   │   ├── common/        # Generic UI components
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Spinner/
│   │   │   │   └── ErrorBoundary/
│   │   │   ├── layout/        # Layout components
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   ├── Sidebar/
│   │   │   │   └── Layout/
│   │   │   ├── books/         # Book-specific components
│   │   │   │   ├── BookCard/
│   │   │   │   ├── BookDetail/
│   │   │   │   ├── BookList/
│   │   │   │   └── BookFilter/
│   │   │   ├── cart/          # Cart components
│   │   │   │   ├── CartItem/
│   │   │   │   ├── CartSummary/
│   │   │   │   └── CheckoutForm/
│   │   │   ├── reviews/       # Review components
│   │   │   │   ├── ReviewList/
│   │   │   │   ├── ReviewForm/
│   │   │   │   └── RatingStars/
│   │   │   └── admin/         # Admin-only components
│   │   │       ├── BookManagement/
│   │   │       ├── UserManagement/
│   │   │       ├── OrderManagement/
│   │   │       └── StatisticsDashboard/
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   ├── useDebounce.js
│   │   │   └── usePermissions.js
│   │   ├── pages/             # Page components (route containers)
│   │   │   ├── Home/
│   │   │   ├── BookDetails/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Cart/
│   │   │   ├── Profile/
│   │   │   └── Admin/
│   │   ├── routes/            # Route configuration
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── store/             # Redux store configuration
│   │   │   ├── index.js       # Store setup
│   │   │   ├── slices/        # Redux Toolkit slices
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   └── uiSlice.js
│   │   │   └── middleware/
│   │   ├── utils/             # Utility functions
│   │   │   ├── validation.js
│   │   │   ├── formatters.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── styles/            # Global styles
│   │   │   ├── index.css
│   │   │   └── tailwind.css
│   │   ├── App.jsx            # Root component
│   │   └── main.jsx           # Application entry point
│   ├── .env.development       # Development environment variables
│   ├── .env.production        # Production environment variables
│   ├── .eslintrc.json         # ESLint configuration
│   ├── .prettierrc            # Prettier configuration
│   ├── index.html             # HTML entry point
│   ├── package.json
│   ├── postcss.config.js      # PostCSS configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── vite.config.js         # Vite configuration
│
├── server/                     # Backend Node.js application
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   ├── database.js    # Sequelize configuration
│   │   │   ├── jwt.js         # JWT configuration
│   │   │   └── constants.js   # Application constants
│   │   ├── controllers/       # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── bookController.js
│   │   │   ├── userController.js
│   │   │   ├── orderController.js
│   │   │   └── reviewController.js
│   │   ├── middleware/        # Express middleware
│   │   │   ├── auth.js        # JWT verification
│   │   │   ├── rbac.js        # Role-based access control
│   │   │   ├── validation.js  # Request validation
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── models/            # Sequelize models
│   │   │   ├── index.js       # Model initialization
│   │   │   ├── User.js
│   │   │   ├── Book.js
│   │   │   ├── Review.js
│   │   │   ├── Order.js
│   │   │   └── OrderItem.js
│   │   ├── routes/            # Route definitions
│   │   │   ├── index.js       # Route aggregator
│   │   │   ├── authRoutes.js
│   │   │   ├── bookRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── reviewRoutes.js
│   │   ├── services/          # Business logic layer
│   │   │   ├── authService.js
│   │   │   ├── bookService.js
│   │   │   ├── userService.js
│   │   │   ├── orderService.js
│   │   │   └── reviewService.js
│   │   ├── utils/             # Utility functions
│   │   │   ├── validation.js
│   │   │   ├── sanitization.js
│   │   │   ├── errorResponse.js
│   │   │   └── logger.js
│   │   ├── seeders/           # Database seeders
│   │   │   └── demo-data.js
│   │   ├── migrations/        # Database migrations
│   │   └── app.js             # Express app setup
│   ├── tests/                 # Test files
│   │   ├── unit/
│   │   └── integration/
│   ├── .env.development       # Development environment variables
│   ├── .env.production        # Production environment variables
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package.json
│   └── server.js              # Server entry point
│
├── .gitignore
├── ARCHITECTURE.md            # This file
├── CLAUDE.md                  # Project instructions
└── README.md                  # Project documentation
```

### 1.2 Structure Rationale

**Frontend Structure:**
- **Component-based**: Components organized by feature/domain for better maintainability
- **Separation of concerns**: API calls, state management, and UI components are clearly separated
- **Scalability**: Easy to locate and modify specific features
- **Reusability**: Common components isolated for reuse across the application

**Backend Structure:**
- **MVC-inspired**: Controllers handle requests, Services contain business logic, Models define data
- **Middleware-first**: Security, validation, and error handling as reusable middleware
- **Service layer**: Business logic separated from route handlers for testability
- **Configuration isolation**: All config in dedicated files for easy environment management

## 2. Technology Stack Validation & Justification

### 2.1 Frontend Stack

#### React 18+ with Vite
- **Validation**: Excellent choice
- **Justification**:
  - Vite provides extremely fast HMR (Hot Module Replacement) - 10-20x faster than webpack
  - Native ES modules support reduces build complexity
  - React 18 concurrent features enable better UX (transitions, Suspense)
  - Massive ecosystem and community support
  - Excellent performance for SPA applications
- **Version**: React 18.2.0, Vite 5.0+

#### React Router v6
- **Validation**: Industry standard for React routing
- **Justification**:
  - Declarative routing matches React's philosophy
  - Nested routes simplify layout management
  - Built-in code splitting support
  - Type-safe with TypeScript (future-proofing)
- **Version**: 6.20+

#### TanStack Query (React Query)
- **Validation**: Excellent for server state management
- **Justification**:
  - Eliminates boilerplate for API calls
  - Built-in caching, refetching, and background updates
  - Optimistic updates for better UX
  - Automatic request deduplication
  - Reduces Redux complexity by handling server state
  - Better than RTK Query for this use case (lighter weight, more flexible)
- **Version**: @tanstack/react-query 5.0+

#### Redux Toolkit
- **Validation**: Appropriate for client state (cart, UI state)
- **Justification**:
  - Excellent for cross-cutting client state (shopping cart persistence)
  - Simplified Redux with less boilerplate
  - Built-in Immer for immutable updates
  - Redux DevTools for debugging
  - **Trade-off**: Could be overkill if only managing cart state - context + useReducer might suffice
  - **Recommendation**: Use Redux Toolkit only for cart state, auth state; use TanStack Query for all server data
- **Version**: @reduxjs/toolkit 2.0+

#### Tailwind CSS
- **Validation**: Excellent choice for rapid UI development
- **Justification**:
  - Utility-first approach accelerates development
  - Highly customizable design system
  - Excellent performance (PurgeCSS removes unused styles)
  - Responsive design made simple
  - Growing component library ecosystem (Headless UI, DaisyUI)
  - Smaller bundle size than component libraries
- **Version**: 3.4+

### 2.2 Backend Stack

#### Node.js + Express.js
- **Validation**: Solid choice for this application
- **Justification**:
  - JavaScript across full stack reduces context switching
  - Express is minimalist and flexible
  - Massive middleware ecosystem
  - Excellent performance for I/O-bound operations
  - Easy to scale horizontally
  - **Alternative considered**: NestJS (more structured but adds complexity)
- **Versions**: Node.js 20 LTS, Express 4.18+

#### Sequelize ORM
- **Validation**: Acceptable but with caveats
- **Justification**:
  - Abstracts SQL complexity
  - Built-in migrations and seeders
  - Support for multiple databases
  - **Concerns**:
    - Slower development/updates compared to Prisma
    - Complex queries can be verbose
    - TypeScript support not as strong as Prisma
  - **Alternative**: Prisma (better DX, type safety, faster) but Sequelize is acceptable
- **Recommendation**: Sequelize 6.35+ is fine for this project
- **Future consideration**: Migrate to Prisma if team wants better TypeScript support

#### PostgreSQL
- **Validation**: Excellent choice
- **Justification**:
  - ACID compliance for order transactions
  - Excellent performance for complex queries
  - JSON support for flexible data (future: book metadata)
  - Full-text search capabilities for book search
  - Strong indexing for fast lookups
  - Mature replication and backup tools
  - Free and open-source
- **Version**: PostgreSQL 15+ (latest stable)

#### JWT Authentication
- **Validation**: Standard approach
- **Justification**:
  - Stateless authentication enables horizontal scaling
  - Works well with SPA architecture
  - Industry standard, well-understood
  - **Critical**: HttpOnly cookies prevent XSS attacks
  - **Configuration**: Short expiration (15min access, 7d refresh)
- **Implementation**: jsonwebtoken 9.0+

#### bcrypt
- **Validation**: Excellent choice for password hashing
- **Justification**:
  - Industry standard, battle-tested
  - Configurable work factor (cost) for future-proofing
  - Resistant to rainbow table attacks
  - Automatically handles salting
- **Version**: bcrypt 5.1+
- **Configuration**: Cost factor of 12 (balance security/performance)

### 2.3 Stack Trade-off Analysis

**What we're optimizing for:**
- Developer velocity (Vite, Tailwind, Redux Toolkit)
- Type safety potential (all choices work well with TypeScript)
- Scalability (stateless JWT, PostgreSQL, horizontal scaling)
- Modern DX (Vite HMR, TanStack Query caching)

**Trade-offs accepted:**
- Sequelize over Prisma: Slightly worse DX, but acceptable
- Redux Toolkit included: Might be overkill but provides structure
- PostgreSQL over MongoDB: Slightly more rigid schema but better for transactional data

## 3. Dependencies Specification

### 3.1 Frontend Dependencies (client/package.json)

```json
{
  "name": "bookstore-client",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css,md}\""
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@tanstack/react-query": "^5.12.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "axios": "^1.6.0",
    "clsx": "^2.0.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.0",
    "prettier": "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  }
}
```

**Key Dependencies Explained:**

- **react-hook-form**: Form handling with excellent performance (uncontrolled inputs)
- **zod**: Schema validation for forms and API responses
- **@hookform/resolvers**: Bridges react-hook-form with Zod
- **clsx**: Conditional className composition (Tailwind helper)
- **axios**: HTTP client with interceptors for auth token injection
- **prettier-plugin-tailwindcss**: Auto-sorts Tailwind classes

### 3.2 Backend Dependencies (server/package.json)

```json
{
  "name": "bookstore-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "migrate": "node src/migrations/migrate.js",
    "seed": "node src/seeders/seed.js",
    "test": "jest --coverage",
    "lint": "eslint . --ext js --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{js,json,md}\""
  },
  "dependencies": {
    "express": "^4.18.0",
    "sequelize": "^6.35.0",
    "pg": "^8.11.0",
    "pg-hstore": "^2.3.4",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0",
    "express-validator": "^7.0.0",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.0",
    "morgan": "^1.10.0",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.0"
  }
}
```

**Key Dependencies Explained:**

- **pg & pg-hstore**: PostgreSQL driver and hstore serialization
- **cookie-parser**: Parse cookies from requests (for JWT in HttpOnly cookies)
- **helmet**: Security headers middleware
- **express-rate-limit**: Rate limiting to prevent abuse
- **express-validator**: Request validation middleware
- **morgan**: HTTP request logger
- **winston**: Application logging framework
- **supertest**: HTTP assertions for testing

## 4. Database Schema Design

### 4.1 Entity Relationship Overview

```
users (1) ──────< (N) reviews (N) >────── (1) books
  │                                           │
  │                                           │
  └──< (1) orders (N) >───< (N) order_items (N) >───┘
```

**Relationships:**
- User HAS MANY Reviews
- User HAS MANY Orders
- Book HAS MANY Reviews
- Book HAS MANY OrderItems
- Order HAS MANY OrderItems
- Order BELONGS TO User
- Review BELONGS TO User AND Book
- OrderItem BELONGS TO Order AND Book

### 4.2 Table Definitions

#### users

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

**Column Justifications:**
- `id`: Serial primary key for performance
- `email`: Unique constraint enforces one account per email
- `password_hash`: 255 chars sufficient for bcrypt output
- `role`: Enum-style check constraint ensures data integrity
- `created_at/updated_at`: Audit trail and user account age tracking

**Indexes:**
- `email`: Primary lookup for authentication
- `role`: Admin queries filtering by role

#### books

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  category VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_price ON books(price);
CREATE INDEX idx_books_created_at ON books(created_at DESC);
CREATE INDEX idx_books_title_trgm ON books USING gin(title gin_trgm_ops);
```

**Column Justifications:**
- `price`: DECIMAL(10,2) prevents floating-point errors in financial calculations
- `stock`: Integer inventory tracking with constraint prevents negative stock
- `description`: TEXT for unlimited length
- `image_url`: Stores CDN/S3 URL (external storage recommended)

**Indexes:**
- `category`: Filtering books by category (common query)
- `author`: Filtering books by author
- `price`: Range queries (price filtering)
- `created_at DESC`: "New arrivals" queries
- `title gin_trgm_ops`: Full-text search using trigram similarity (requires pg_trgm extension)

#### reviews

```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, book_id)
);

CREATE INDEX idx_reviews_book_id ON reviews(book_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

**Column Justifications:**
- `rating`: 1-5 constraint enforces valid ratings
- `comment`: Optional TEXT field for review content
- `UNIQUE(user_id, book_id)`: Prevents multiple reviews per user per book

**Indexes:**
- `book_id`: Fetching all reviews for a book (most common query)
- `user_id`: Fetching user's review history
- `rating`: Aggregation queries (average rating)

**Cascade Behavior:**
- ON DELETE CASCADE: If user/book is deleted, reviews are automatically removed

#### orders

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

**Column Justifications:**
- `total_price`: Pre-calculated total for performance (avoid joins for order history)
- `status`: Enum-style constraint for order lifecycle
- `ON DELETE SET NULL`: Preserve order history even if user account is deleted

**Indexes:**
- `user_id`: User order history
- `status`: Admin filtering orders by status
- `created_at DESC`: Recent orders first

#### order_items

```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_book_id ON order_items(book_id);
```

**Column Justifications:**
- `quantity`: Per-item quantity in order
- `price`: Snapshot of book price at time of purchase (historical accuracy)
- `book_id SET NULL`: Preserve order history even if book is deleted from catalog

**Indexes:**
- `order_id`: Fetching items for an order (primary use case)
- `book_id`: Analytics (most purchased books)

### 4.3 Database Extensions Required

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- For fuzzy text search
```

### 4.4 Database Constraints & Business Rules

**Enforced at Database Level:**
1. Email uniqueness (users.email UNIQUE)
2. Price non-negative (CHECK constraints)
3. Stock non-negative (CHECK constraint)
4. Rating range 1-5 (CHECK constraint)
5. One review per user per book (UNIQUE constraint)
6. Valid role values (CHECK constraint)
7. Valid order status values (CHECK constraint)

**Enforced at Application Level:**
1. Password strength requirements
2. Email format validation
3. Stock availability before order creation
4. Order total calculation matches sum of items
5. User can only review purchased books (business logic)
6. Admin-only operations (RBAC middleware)

### 4.5 Performance Considerations

**Query Optimization:**
- All foreign keys have indexes
- Common filter fields (category, author, status) indexed
- Timestamp fields indexed for sorting
- Full-text search index on book titles

**Scalability:**
- Composite indexes can be added later for specific query patterns
- Partitioning strategy for orders table (by created_at) if volume grows
- Read replicas for book browsing queries (read-heavy workload)

**Expected Query Patterns:**
1. Book listing with filters (category, author, price range) - **Covered by indexes**
2. Book search by title - **Covered by trigram index**
3. Book details with reviews - **Join optimized by indexes**
4. User order history - **Covered by user_id index**
5. Order details with items - **Covered by order_id index**
6. Admin statistics (order counts by status) - **Covered by status index**

## 5. API Architecture

### 5.1 API Design Principles

1. **RESTful conventions**: Resources as nouns, HTTP methods for actions
2. **Versioning**: URL-based versioning (`/api/v1/...`) for future-proofing
3. **Consistent response format**: Standardized JSON structure
4. **HTTP status codes**: Semantic status codes (200, 201, 400, 401, 403, 404, 500)
5. **Pagination**: Cursor-based or offset-based for list endpoints
6. **Filtering & sorting**: Query parameters for flexible data retrieval
7. **Error handling**: Consistent error response structure

### 5.2 Base URL Structure

- **Development**: `http://localhost:5000/api/v1`
- **Production**: `https://api.bookstore.com/api/v1`

### 5.3 Response Format Standards

#### Success Response

```json
{
  "success": true,
  "data": { /* resource or array */ },
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

#### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 5.4 API Endpoints

#### 5.4.1 Authentication Endpoints

**POST /api/v1/auth/register**
- **Description**: Register a new user account
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "string (required, 2-100 chars)",
    "email": "string (required, valid email)",
    "password": "string (required, min 8 chars)"
  }
  ```
- **Response**: 201 Created
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      }
    }
  }
  ```
- **Set-Cookie**: `accessToken` (HttpOnly, Secure, SameSite=Strict, 15min expiry)
- **Set-Cookie**: `refreshToken` (HttpOnly, Secure, SameSite=Strict, 7d expiry)
- **Errors**: 400 (validation), 409 (email exists)

**POST /api/v1/auth/login**
- **Description**: Authenticate user and issue JWT tokens
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "string (required)",
    "password": "string (required)"
  }
  ```
- **Response**: 200 OK (same structure as register)
- **Set-Cookie**: Same as register
- **Errors**: 401 (invalid credentials), 400 (validation)

**POST /api/v1/auth/logout**
- **Description**: Invalidate refresh token and clear cookies
- **Access**: Authenticated
- **Response**: 200 OK
  ```json
  {
    "success": true,
    "data": {
      "message": "Logged out successfully"
    }
  }
  ```
- **Set-Cookie**: Clear `accessToken` and `refreshToken`

**POST /api/v1/auth/refresh**
- **Description**: Exchange refresh token for new access token
- **Access**: Public (requires refreshToken cookie)
- **Response**: 200 OK
- **Set-Cookie**: New `accessToken`
- **Errors**: 401 (invalid/expired refresh token)

**GET /api/v1/auth/me**
- **Description**: Get current authenticated user
- **Access**: Authenticated
- **Response**: 200 OK
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      }
    }
  }
  ```
- **Errors**: 401 (not authenticated)

#### 5.4.2 Book Endpoints

**GET /api/v1/books**
- **Description**: Get paginated list of books with filtering and sorting
- **Access**: Public
- **Query Parameters**:
  - `page` (number, default: 1)
  - `limit` (number, default: 20, max: 100)
  - `category` (string, optional)
  - `author` (string, optional)
  - `minPrice` (number, optional)
  - `maxPrice` (number, optional)
  - `search` (string, optional - searches title)
  - `sortBy` (enum: 'price', 'created_at', 'title', default: 'created_at')
  - `sortOrder` (enum: 'asc', 'desc', default: 'desc')
- **Response**: 200 OK
  ```json
  {
    "success": true,
    "data": {
      "books": [
        {
          "id": 1,
          "title": "Clean Code",
          "author": "Robert C. Martin",
          "price": 29.99,
          "category": "Programming",
          "description": "...",
          "imageUrl": "https://...",
          "stock": 50,
          "averageRating": 4.5,
          "reviewCount": 120
        }
      ]
    },
    "meta": {
      "pagination": { /* ... */ }
    }
  }
  ```

**GET /api/v1/books/:id**
- **Description**: Get single book details with reviews
- **Access**: Public
- **Response**: 200 OK
  ```json
  {
    "success": true,
    "data": {
      "book": {
        "id": 1,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "price": 29.99,
        "category": "Programming",
        "description": "...",
        "imageUrl": "https://...",
        "stock": 50,
        "averageRating": 4.5,
        "reviewCount": 120,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    }
  }
  ```
- **Errors**: 404 (book not found)

**POST /api/v1/books** (Admin only)
- **Description**: Create new book
- **Access**: Admin
- **Request Body**:
  ```json
  {
    "title": "string (required)",
    "author": "string (required)",
    "price": "number (required, > 0)",
    "category": "string (required)",
    "description": "string (optional)",
    "imageUrl": "string (optional, valid URL)",
    "stock": "number (required, >= 0)"
  }
  ```
- **Response**: 201 Created
- **Errors**: 400 (validation), 401 (not authenticated), 403 (not admin)

**PUT /api/v1/books/:id** (Admin only)
- **Description**: Update book details
- **Access**: Admin
- **Request Body**: Same as POST (all fields optional)
- **Response**: 200 OK
- **Errors**: 400 (validation), 401, 403, 404

**DELETE /api/v1/books/:id** (Admin only)
- **Description**: Delete book (soft delete recommended)
- **Access**: Admin
- **Response**: 204 No Content
- **Errors**: 401, 403, 404

#### 5.4.3 Review Endpoints

**GET /api/v1/books/:bookId/reviews**
- **Description**: Get paginated reviews for a book
- **Access**: Public
- **Query Parameters**: `page`, `limit`, `sortBy` (rating, created_at)
- **Response**: 200 OK
  ```json
  {
    "success": true,
    "data": {
      "reviews": [
        {
          "id": 1,
          "rating": 5,
          "comment": "Excellent book!",
          "createdAt": "2024-01-01T00:00:00Z",
          "user": {
            "id": 1,
            "name": "John Doe"
          }
        }
      ]
    },
    "meta": { /* pagination */ }
  }
  ```

**POST /api/v1/books/:bookId/reviews**
- **Description**: Create review for a book
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "rating": "number (required, 1-5)",
    "comment": "string (optional, max 1000 chars)"
  }
  ```
- **Response**: 201 Created
- **Errors**: 400 (validation), 401, 409 (already reviewed), 403 (not purchased - optional business rule)

**PUT /api/v1/reviews/:id**
- **Description**: Update own review
- **Access**: Authenticated (owner only)
- **Request Body**: Same as POST
- **Response**: 200 OK
- **Errors**: 400, 401, 403 (not owner), 404

**DELETE /api/v1/reviews/:id**
- **Description**: Delete own review (or any if admin)
- **Access**: Authenticated (owner or admin)
- **Response**: 204 No Content
- **Errors**: 401, 403, 404

#### 5.4.4 Order Endpoints

**GET /api/v1/orders**
- **Description**: Get user's order history (or all orders if admin)
- **Access**: Authenticated
- **Query Parameters**: `page`, `limit`, `status` (filter by status)
- **Response**: 200 OK
  ```json
  {
    "success": true,
    "data": {
      "orders": [
        {
          "id": 1,
          "totalPrice": 89.97,
          "status": "delivered",
          "createdAt": "2024-01-01T00:00:00Z",
          "itemCount": 3
        }
      ]
    },
    "meta": { /* pagination */ }
  }
  ```

**GET /api/v1/orders/:id**
- **Description**: Get order details with items
- **Access**: Authenticated (owner or admin)
- **Response**: 200 OK
  ```json
  {
    "success": true,
    "data": {
      "order": {
        "id": 1,
        "totalPrice": 89.97,
        "status": "delivered",
        "createdAt": "2024-01-01T00:00:00Z",
        "items": [
          {
            "id": 1,
            "quantity": 2,
            "price": 29.99,
            "book": {
              "id": 1,
              "title": "Clean Code",
              "author": "Robert C. Martin",
              "imageUrl": "https://..."
            }
          }
        ]
      }
    }
  }
  ```
- **Errors**: 401, 403 (not owner/admin), 404

**POST /api/v1/orders**
- **Description**: Create new order from cart items
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "items": [
      {
        "bookId": 1,
        "quantity": 2
      }
    ]
  }
  ```
- **Response**: 201 Created
- **Errors**: 400 (validation, insufficient stock), 401
- **Business Logic**:
  - Validate stock availability
  - Calculate total price from current book prices
  - Reduce stock atomically (use transaction)
  - Snapshot book prices in order_items

**PATCH /api/v1/orders/:id/status** (Admin only)
- **Description**: Update order status
- **Access**: Admin
- **Request Body**:
  ```json
  {
    "status": "processing | shipped | delivered | cancelled"
  }
  ```
- **Response**: 200 OK
- **Errors**: 400, 401, 403, 404

#### 5.4.5 User Management Endpoints (Admin)

**GET /api/v1/users** (Admin only)
- **Description**: Get paginated list of users
- **Access**: Admin
- **Query Parameters**: `page`, `limit`, `role`, `search` (name/email)
- **Response**: 200 OK (exclude password_hash)

**GET /api/v1/users/:id** (Admin only)
- **Description**: Get user details
- **Access**: Admin
- **Response**: 200 OK

**PATCH /api/v1/users/:id/role** (Admin only)
- **Description**: Update user role
- **Access**: Admin
- **Request Body**:
  ```json
  {
    "role": "user | admin"
  }
  ```
- **Response**: 200 OK

**DELETE /api/v1/users/:id** (Admin only)
- **Description**: Delete user account
- **Access**: Admin
- **Response**: 204 No Content

#### 5.4.6 Profile Endpoints

**GET /api/v1/profile**
- **Description**: Get current user profile (alias for /auth/me)
- **Access**: Authenticated

**PUT /api/v1/profile**
- **Description**: Update current user profile
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "name": "string (optional)",
    "email": "string (optional)"
  }
  ```
- **Response**: 200 OK
- **Errors**: 400, 401, 409 (email conflict)

**PUT /api/v1/profile/password**
- **Description**: Change password
- **Access**: Authenticated
- **Request Body**:
  ```json
  {
    "currentPassword": "string (required)",
    "newPassword": "string (required, min 8 chars)"
  }
  ```
- **Response**: 200 OK
- **Errors**: 400, 401 (invalid current password)

#### 5.4.7 Statistics Endpoints (Admin)

**GET /api/v1/admin/statistics**
- **Description**: Get dashboard statistics
- **Access**: Admin
- **Response**: 200 OK
  ```json
  {
    "success": true,
    "data": {
      "totalUsers": 1250,
      "totalOrders": 3400,
      "totalRevenue": 125000.00,
      "pendingOrders": 45,
      "lowStockBooks": 12,
      "recentOrders": [/* ... */],
      "topSellingBooks": [/* ... */],
      "salesByMonth": [/* ... */]
    }
  }
  ```

### 5.5 Rate Limiting Strategy

**Global Rate Limits:**
- Public endpoints: 100 requests/15 minutes per IP
- Authenticated endpoints: 1000 requests/15 minutes per user
- Admin endpoints: 2000 requests/15 minutes per admin

**Specific Endpoints:**
- POST /auth/login: 5 requests/15 minutes per IP (brute-force prevention)
- POST /auth/register: 3 requests/hour per IP (spam prevention)
- POST /orders: 10 requests/hour per user (abuse prevention)

**Implementation**: express-rate-limit with Redis store (production) or memory store (development)

### 5.6 CORS Configuration

**Allowed Origins:**
- Development: `http://localhost:5173` (Vite default)
- Production: `https://bookstore.com`

**Allowed Methods:** GET, POST, PUT, PATCH, DELETE, OPTIONS

**Allowed Headers:** Content-Type, Authorization (not used - using cookies)

**Credentials:** `credentials: true` (required for cookies)

## 6. Authentication Flow Architecture

### 6.1 JWT Token Strategy

**Access Token:**
- **Purpose**: Short-lived token for API authorization
- **Storage**: HttpOnly cookie named `accessToken`
- **Expiration**: 15 minutes
- **Payload**:
  ```json
  {
    "userId": 1,
    "email": "user@example.com",
    "role": "user",
    "iat": 1234567890,
    "exp": 1234568790
  }
  ```

**Refresh Token:**
- **Purpose**: Long-lived token for obtaining new access tokens
- **Storage**: HttpOnly cookie named `refreshToken`
- **Expiration**: 7 days
- **Payload**:
  ```json
  {
    "userId": 1,
    "tokenVersion": 1,
    "iat": 1234567890,
    "exp": 1235172690
  }
  ```
- **Token Rotation**: On refresh, issue new refresh token (optional but recommended)

### 6.2 Cookie Configuration

```javascript
const cookieOptions = {
  httpOnly: true,          // Prevent XSS attacks
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
  sameSite: 'strict',      // CSRF protection
  path: '/',
  maxAge: /* 15min or 7d */
};
```

**Security Rationale:**
- `httpOnly`: JavaScript cannot access tokens (prevents XSS token theft)
- `secure`: Cookies only sent over HTTPS (prevents MITM attacks)
- `sameSite: strict`: Cookies not sent on cross-site requests (prevents CSRF)
- **Trade-off**: `sameSite: strict` may break OAuth flows - use `lax` if needed

### 6.3 Authentication Flow Diagram

**Registration/Login Flow:**
```
Client                    Server                    Database
  │                         │                          │
  ├──POST /auth/login──────>│                          │
  │  {email, password}      │                          │
  │                         ├──Query user by email───>│
  │                         │<─────User data───────────┤
  │                         │                          │
  │                         ├──bcrypt.compare()        │
  │                         │  (verify password)       │
  │                         │                          │
  │                         ├──Generate access token   │
  │                         ├──Generate refresh token  │
  │                         │                          │
  │<─200 OK + Set-Cookie───┤                          │
  │  accessToken (15min)    │                          │
  │  refreshToken (7d)      │                          │
  │  {user data}            │                          │
```

**Authenticated Request Flow:**
```
Client                    Server
  │                         │
  ├──GET /api/v1/profile──>│
  │  Cookie: accessToken    │
  │                         │
  │                         ├──Verify JWT signature
  │                         ├──Check expiration
  │                         ├──Extract userId from payload
  │                         │
  │<─200 OK─────────────────┤
  │  {user data}            │
```

**Token Refresh Flow:**
```
Client                    Server
  │                         │
  ├──GET /api/v1/books────>│
  │  Cookie: accessToken    │
  │  (expired)              │
  │                         │
  │<─401 Unauthorized───────┤
  │                         │
  │                         │
  ├──POST /auth/refresh───>│
  │  Cookie: refreshToken   │
  │                         │
  │                         ├──Verify refresh token
  │                         ├──Generate new access token
  │                         │
  │<─200 OK + Set-Cookie───┤
  │  new accessToken        │
  │                         │
  │                         │
  ├──GET /api/v1/books────>│ (retry original request)
  │  Cookie: new token      │
  │                         │
  │<─200 OK─────────────────┤
```

### 6.4 Middleware Implementation Plan

**Authentication Middleware (`middleware/auth.js`):**
```javascript
// Pseudocode
function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(403).json({ error: 'Invalid token' });
  }
}
```

**RBAC Middleware (`middleware/rbac.js`):**
```javascript
// Pseudocode
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

// Usage:
// router.post('/books', authenticateToken, requireRole('admin'), createBook);
```

### 6.5 Logout Flow

```
Client                    Server
  │                         │
  ├──POST /auth/logout────>│
  │  Cookie: refreshToken   │
  │                         │
  │                         ├──Optional: Invalidate refresh token
  │                         │  (add to blacklist or increment tokenVersion)
  │                         │
  │<─200 OK + Set-Cookie───┤
  │  Clear accessToken      │
  │  Clear refreshToken     │
  │  (maxAge: 0)            │
```

**Token Revocation Strategy:**
- **Simple**: Clear cookies (tokens expire naturally)
- **Secure**: Maintain tokenVersion in database, increment on logout/password change
- **Enterprise**: Redis blacklist for revoked tokens (overhead vs. security trade-off)

**Recommendation**: Start with tokenVersion approach (balance security/complexity)

### 6.6 Frontend Token Handling

**Automatic Token Refresh:**
```javascript
// Pseudocode: Axios interceptor
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post('/api/v1/auth/refresh'); // Uses refreshToken cookie
        return axios(originalRequest); // Retry with new accessToken
      } catch (refreshError) {
        // Redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

**No Token Storage in JavaScript:**
- Tokens live only in HttpOnly cookies
- Frontend never accesses token values
- Browser automatically sends cookies with requests

### 6.7 Security Considerations

**XSS Protection:**
- HttpOnly cookies prevent JavaScript access
- Content Security Policy headers
- Input sanitization on all user inputs

**CSRF Protection:**
- `SameSite=Strict` cookies prevent cross-site requests
- Alternative: CSRF tokens for `SameSite=Lax`

**Session Hijacking Prevention:**
- Short access token expiration (15min)
- Secure cookies (HTTPS only)
- Optional: IP/User-Agent validation (UX vs. security trade-off)

**Brute Force Prevention:**
- Rate limiting on /auth/login (5 attempts/15min)
- Account lockout after N failed attempts (optional)
- CAPTCHA on repeated failures (optional)

## 7. Environment Configuration

### 7.1 Frontend Environment Variables

**client/.env.development:**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=BookStore
VITE_ENABLE_DEVTOOLS=true
```

**client/.env.production:**
```env
VITE_API_BASE_URL=https://api.bookstore.com/api/v1
VITE_APP_NAME=BookStore
VITE_ENABLE_DEVTOOLS=false
```

**Vite Environment Variable Notes:**
- All variables must be prefixed with `VITE_` to be exposed to client
- Access via `import.meta.env.VITE_API_BASE_URL`
- Never expose secrets in frontend environment (client-side code is public)

### 7.2 Backend Environment Variables

**server/.env.development:**
```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore_dev
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_DIALECT=postgres

# JWT Configuration
JWT_ACCESS_SECRET=your_access_secret_here_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_here_min_32_chars
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Cookie Configuration
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false

# Bcrypt Configuration
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

**server/.env.production:**
```env
# Server Configuration
NODE_ENV=production
PORT=5000
CLIENT_URL=https://bookstore.com

# Database Configuration
DB_HOST=your-db-host.region.rds.amazonaws.com
DB_PORT=5432
DB_NAME=bookstore_prod
DB_USER=bookstore_user
DB_PASSWORD=your_secure_password_here
DB_DIALECT=postgres
DB_SSL=true

# JWT Configuration
JWT_ACCESS_SECRET=your_production_access_secret_min_64_chars
JWT_REFRESH_SECRET=your_production_refresh_secret_min_64_chars
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Cookie Configuration
COOKIE_DOMAIN=.bookstore.com
COOKIE_SECURE=true

# Bcrypt Configuration
BCRYPT_ROUNDS=12

# Rate Limiting (with Redis)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
REDIS_URL=redis://your-redis-host:6379

# Logging
LOG_LEVEL=info
```

### 7.3 Environment Variable Security

**Secret Generation:**
```bash
# Generate secure JWT secrets (Node.js)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Secret Management Best Practices:**
1. **Never commit .env files to version control**
   - Add `.env*` to `.gitignore`
   - Commit `.env.example` with dummy values
2. **Use secret management services in production**
   - AWS Secrets Manager
   - HashiCorp Vault
   - Environment variables in hosting platform (Vercel, Render)
3. **Rotate secrets periodically** (quarterly recommended)
4. **Use different secrets per environment**

### 7.4 .env.example Templates

**client/.env.example:**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=BookStore
VITE_ENABLE_DEVTOOLS=true
```

**server/.env.example:**
```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore_dev
DB_USER=postgres
DB_PASSWORD=changeme
DB_DIALECT=postgres

# JWT Configuration (GENERATE YOUR OWN SECRETS!)
JWT_ACCESS_SECRET=generate_using_crypto_randomBytes
JWT_REFRESH_SECRET=generate_using_crypto_randomBytes
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Cookie Configuration
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false

# Bcrypt Configuration
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

### 7.5 Configuration File Structure

**server/src/config/database.js:**
```javascript
// Pseudocode
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  }
};
```

**server/src/config/jwt.js:**
```javascript
// Pseudocode
module.exports = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRATION,
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  },
  cookie: {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'strict',
    domain: process.env.COOKIE_DOMAIN,
  }
};
```

## 8. Implementation Roadmap

### Phase 1: Foundation Setup (Week 1)
1. Initialize monorepo structure
2. Set up frontend (Vite + React + Tailwind)
3. Set up backend (Express + Sequelize)
4. Configure PostgreSQL database
5. Set up ESLint + Prettier
6. Create .env files and .env.example
7. Set up Git repository and .gitignore

### Phase 2: Database & Models (Week 1-2)
1. Create Sequelize models (User, Book, Review, Order, OrderItem)
2. Define associations and indexes
3. Create database migrations
4. Create database seeders with sample data
5. Test database operations

### Phase 3: Authentication System (Week 2)
1. Implement JWT utilities (sign, verify)
2. Create auth controller (register, login, logout, refresh)
3. Create auth middleware (authenticateToken, requireRole)
4. Create auth routes
5. Test authentication flow

### Phase 4: Core API Endpoints (Week 2-3)
1. Implement book CRUD endpoints
2. Implement review endpoints
3. Implement order endpoints
4. Implement user management endpoints
5. Add request validation (express-validator)
6. Add error handling middleware
7. Test all endpoints

### Phase 5: Frontend Foundation (Week 3)
1. Set up React Router
2. Set up Redux Toolkit store
3. Set up TanStack Query
4. Create Axios client with interceptors
5. Create authentication context/hooks
6. Create common UI components

### Phase 6: Frontend Features (Week 3-4)
1. Implement authentication pages (login, register)
2. Implement book listing and detail pages
3. Implement shopping cart functionality
4. Implement checkout flow
5. Implement user profile pages
6. Implement admin panel

### Phase 7: Security & Optimization (Week 4)
1. Add rate limiting
2. Add security headers (Helmet)
3. Implement CORS configuration
4. Add input sanitization
5. Performance optimization (caching, query optimization)
6. Add logging (Winston, Morgan)

### Phase 8: Testing & Deployment (Week 5)
1. Write unit tests (Jest)
2. Write integration tests (Supertest)
3. Set up CI/CD pipeline
4. Deploy backend (Render/Railway)
5. Deploy frontend (Vercel)
6. Configure production environment variables
7. Set up monitoring and error tracking

## 9. Technology Trade-off Summary

| Decision | Choice | Alternative | Rationale | Risk Mitigation |
|----------|--------|-------------|-----------|-----------------|
| Frontend Framework | React 18 | Vue 3, Svelte | Largest ecosystem, team familiarity | Regular updates required |
| Build Tool | Vite | webpack, Parcel | Superior DX, fast HMR | Smaller community than webpack |
| Server State | TanStack Query | RTK Query, SWR | Best caching, lightweight | Learning curve for team |
| Client State | Redux Toolkit | Context API, Zustand | Standardized, devtools | May be overkill for simple state |
| CSS Framework | Tailwind CSS | styled-components, CSS Modules | Rapid development, small bundle | Utility class verbosity |
| Backend Framework | Express | NestJS, Fastify | Simplicity, flexibility | Less structure than NestJS |
| ORM | Sequelize | Prisma, TypeORM | Stable, mature | Slower than Prisma |
| Database | PostgreSQL | MongoDB, MySQL | ACID, relational data | More rigid than NoSQL |
| Auth Strategy | JWT + HttpOnly Cookies | Sessions, Auth0 | Stateless, scalable | Token revocation complexity |

## 10. Security Checklist

- [x] Passwords hashed with bcrypt (cost factor 12)
- [x] JWT tokens in HttpOnly cookies (not localStorage)
- [x] SameSite=Strict cookies for CSRF protection
- [x] Secure cookies in production (HTTPS only)
- [x] Short access token expiration (15 minutes)
- [x] Rate limiting on authentication endpoints
- [x] Input validation on all endpoints (express-validator)
- [x] SQL injection prevention (Sequelize parameterized queries)
- [x] CORS configuration (whitelist origins)
- [x] Security headers (Helmet middleware)
- [x] Role-based access control (RBAC middleware)
- [x] Environment secrets management (.env, not committed)
- [ ] HTTPS enforcement (production deployment)
- [ ] Database connection encryption (SSL)
- [ ] Regular dependency updates (npm audit)
- [ ] Error messages don't leak sensitive info
- [ ] Logging without sensitive data (passwords, tokens)

## 11. Performance Optimization Strategy

**Database Level:**
- Indexes on all foreign keys and common query fields
- Connection pooling (Sequelize default: 5)
- Read replicas for book browsing (future)
- Query result caching (Redis - future)

**Application Level:**
- Pagination on all list endpoints (max 100 items)
- Eager loading for associations (avoid N+1 queries)
- Response compression (gzip)
- Static asset caching (CDN - future)

**Frontend Level:**
- Code splitting by route (React.lazy)
- Image optimization (lazy loading, WebP)
- TanStack Query caching (staleTime, cacheTime)
- Debounced search inputs
- Virtual scrolling for long lists (future)

**Expected Performance Metrics:**
- API response time: < 200ms (p95)
- Page load time: < 2s (LCP)
- Time to interactive: < 3s
- Database query time: < 50ms (p95)

## 12. Monitoring & Observability Plan

**Logging:**
- Winston for structured logging
- Log levels: error, warn, info, debug
- Log rotation (daily, 14-day retention)

**Metrics to Track:**
- Request count and latency by endpoint
- Error rate and types
- Database query performance
- Authentication success/failure rate
- Order completion rate

**Alerting Thresholds:**
- Error rate > 5%
- API latency > 1s (p95)
- Database connection pool exhausted
- Disk space < 10%

**Tools (Future):**
- Sentry for error tracking
- Datadog/New Relic for APM
- PostgreSQL slow query log

## 13. Future Scalability Considerations

**Horizontal Scaling:**
- Stateless backend (JWT-based auth enables multiple instances)
- Load balancer (NGINX, AWS ALB)
- Session affinity not required

**Database Scaling:**
- Read replicas for book catalog queries
- Connection pooling (PgBouncer)
- Sharding by user_id (if user base grows significantly)
- Separate analytics database (future)

**Caching Strategy:**
- Redis for session data and query results
- CDN for static assets and images
- API response caching (Cache-Control headers)

**Microservices Migration (Future):**
- Candidate services: Order Service, Notification Service, Payment Service
- Event-driven architecture (message queue: RabbitMQ, Kafka)
- API Gateway (Kong, AWS API Gateway)

**Current Architecture Supports:**
- Up to 10,000 concurrent users
- Up to 1 million books in catalog
- Up to 100,000 orders per month
- Single region deployment

## 14. Next Steps for Implementation

1. **Review this architecture document** with the team
2. **Validate assumptions** about scale, budget, timeline
3. **Generate secrets** for JWT and database
4. **Set up local development environment** (PostgreSQL, Node.js, Git)
5. **Create Git repository** and initial commit with folder structure
6. **Implement Phase 1** (foundation setup)
7. **Iterate based on feedback** from implementation experience

## 15. Documentation Standards

**Code Documentation:**
- JSDoc comments for all functions (purpose, params, return)
- README.md in each major directory
- Inline comments for complex business logic

**API Documentation:**
- OpenAPI/Swagger specification (future)
- Postman collection for testing
- API changelog for versioning

**Architecture Documentation:**
- Keep this ARCHITECTURE.md updated
- Document major decisions in ADR format (future)
- Update database schema diagrams on changes

---

**Document Version**: 1.0
**Last Updated**: 2025-11-03
**Next Review**: Before Phase 8 (Deployment)
