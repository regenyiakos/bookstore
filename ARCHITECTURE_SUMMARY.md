# BookStore - Architecture Summary

Quick reference guide to the BookStore application architecture.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         BookStore System                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐          ┌──────────────────┐          ┌──────────────┐
│                 │  HTTPS   │                  │   SQL    │              │
│  React Client   │◄────────►│  Express Server  │◄────────►│  PostgreSQL  │
│  (Port 5173)    │  Cookie  │  (Port 5000)     │          │  (Port 5432) │
│                 │   Auth   │                  │          │              │
└─────────────────┘          └──────────────────┘          └──────────────┘
      │                              │
      │                              │
      ▼                              ▼
┌─────────────────┐          ┌──────────────────┐
│  TanStack Query │          │   JWT Tokens     │
│  Redux Toolkit  │          │   bcrypt Hash    │
│  React Router   │          │   Sequelize ORM  │
└─────────────────┘          └──────────────────┘
```

## Tech Stack at a Glance

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 18.2+ | UI Framework |
| | Vite | 5.0+ | Build Tool |
| | TanStack Query | 5.12+ | Server State |
| | Redux Toolkit | 2.0+ | Client State |
| | Tailwind CSS | 3.4+ | Styling |
| **Backend** | Node.js | 20 LTS | Runtime |
| | Express | 4.18+ | Web Framework |
| | Sequelize | 6.35+ | ORM |
| **Database** | PostgreSQL | 15+ | RDBMS |
| **Auth** | JWT | 9.0+ | Tokens |
| | bcrypt | 5.1+ | Password Hash |

## Database Schema Quick Reference

```
users                           books
─────────────                   ──────────────
id (PK)                         id (PK)
name                            title
email (UNIQUE)                  author
password_hash                   price
role (user/admin)               category
created_at                      description
updated_at                      image_url
                                stock
        │                       created_at
        │                       updated_at
        │                           │
        │                           │
        ▼                           ▼
    reviews                     order_items
    ────────                    ────────────
    id (PK)                     id (PK)
    user_id (FK) ──┐            order_id (FK)
    book_id (FK) ──┘            book_id (FK)
    rating (1-5)                quantity
    comment                     price (snapshot)
    created_at                  created_at
    updated_at

        │
        ▼
    orders
    ──────
    id (PK)
    user_id (FK)
    total_price
    status
    created_at
    updated_at
```

**Relationships:**
- User 1:N Reviews
- User 1:N Orders
- Book 1:N Reviews
- Book 1:N OrderItems
- Order 1:N OrderItems

## API Endpoints Quick Reference

### Public
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
GET    /api/v1/books
GET    /api/v1/books/:id
GET    /api/v1/books/:bookId/reviews
```

### Authenticated
```
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
GET    /api/v1/profile
PUT    /api/v1/profile
PUT    /api/v1/profile/password
POST   /api/v1/books/:bookId/reviews
PUT    /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
GET    /api/v1/orders
GET    /api/v1/orders/:id
POST   /api/v1/orders
```

### Admin Only
```
POST   /api/v1/books
PUT    /api/v1/books/:id
DELETE /api/v1/books/:id
PATCH  /api/v1/orders/:id/status
GET    /api/v1/users
GET    /api/v1/users/:id
PATCH  /api/v1/users/:id/role
DELETE /api/v1/users/:id
GET    /api/v1/admin/statistics
```

## Authentication Flow

```
1. User submits email + password
         │
         ▼
2. Server verifies with bcrypt
         │
         ▼
3. Generate JWT tokens
   - Access Token (15 min)
   - Refresh Token (7 days)
         │
         ▼
4. Store in HttpOnly cookies
         │
         ▼
5. Client sends cookies automatically
         │
         ▼
6. Middleware verifies JWT
         │
         ▼
7. Attach user to request
         │
         ▼
8. Route handler processes
```

## Security Layers

```
┌────────────────────────────────────────────────┐
│ 1. Rate Limiting (100 req/15min)              │
├────────────────────────────────────────────────┤
│ 2. Helmet Security Headers                     │
├────────────────────────────────────────────────┤
│ 3. CORS (whitelist CLIENT_URL)                │
├────────────────────────────────────────────────┤
│ 4. Request Validation (express-validator)      │
├────────────────────────────────────────────────┤
│ 5. JWT Authentication (HttpOnly cookies)       │
├────────────────────────────────────────────────┤
│ 6. RBAC Authorization (role check)             │
├────────────────────────────────────────────────┤
│ 7. Sequelize ORM (SQL injection prevention)    │
├────────────────────────────────────────────────┤
│ 8. bcrypt Password Hashing (cost: 12)         │
└────────────────────────────────────────────────┘
```

## Frontend Architecture

```
src/
├── api/                    API Client Layer
│   ├── client.js          Axios + interceptors
│   ├── books.js           useQuery hooks
│   ├── auth.js            useMutation hooks
│   └── orders.js
│
├── components/            UI Components
│   ├── common/            Reusable (Button, Input)
│   ├── books/             Domain-specific
│   └── admin/
│
├── pages/                 Route Components
│   ├── Home/             Container components
│   ├── BookDetails/
│   └── Admin/
│
├── store/                Redux Store
│   └── slices/
│       ├── authSlice     User auth state
│       ├── cartSlice     Shopping cart
│       └── uiSlice       UI state
│
└── routes/               Routing Config
    ├── AppRoutes         Route definitions
    ├── PrivateRoute      Auth guard
    └── AdminRoute        Admin guard
```

## Backend Architecture

```
src/
├── routes/               Route Definitions
│   ├── authRoutes        POST /auth/login
│   ├── bookRoutes        GET /books
│   └── orderRoutes       POST /orders
│           │
│           ▼
├── middleware/           Middleware Chain
│   ├── auth              JWT verification
│   ├── rbac              Role check
│   ├── validation        Input validation
│   └── errorHandler      Error responses
│           │
│           ▼
├── controllers/          Request Handlers
│   ├── authController    Handle auth logic
│   ├── bookController    Handle book CRUD
│   └── orderController   Handle orders
│           │
│           ▼
├── services/             Business Logic
│   ├── authService       Hash, verify, sign JWT
│   ├── bookService       Book operations
│   └── orderService      Order processing
│           │
│           ▼
├── models/               Data Models
│   ├── User              Sequelize model
│   ├── Book              + associations
│   └── Order
│           │
│           ▼
        PostgreSQL
```

## Request Flow Example: Create Order

```
Client                  Server                      Database
  │                       │                            │
  │  POST /orders         │                            │
  │  + accessToken ──────►│                            │
  │                       │                            │
  │                       ├─ Middleware Chain          │
  │                       │  1. Rate limit check       │
  │                       │  2. Auth verify JWT        │
  │                       │  3. Validate request       │
  │                       │                            │
  │                       ├─ orderController           │
  │                       │  - Extract user from JWT   │
  │                       │  - Call orderService       │
  │                       │                            │
  │                       ├─ orderService              │
  │                       │  - Validate books exist ──►│ SELECT books
  │                       │  - Check stock        ◄────┤
  │                       │  - Start transaction       │
  │                       │  - Create order ──────────►│ INSERT order
  │                       │  - Create order_items ────►│ INSERT items
  │                       │  - Update stock ───────────►│ UPDATE books
  │                       │  - Commit transaction      │
  │                       │                       ◄────┤
  │                       │                            │
  │  201 Created          │                            │
  │  { order data } ◄─────┤                            │
  │                       │                            │
```

## Performance Optimization Strategy

### Database Level
- ✅ Indexes on foreign keys
- ✅ Indexes on filter columns (category, status, etc.)
- ✅ Trigram index for text search
- ✅ Connection pooling (Sequelize: 5 connections)
- 🔜 Read replicas (future)
- 🔜 Query result caching with Redis (future)

### Application Level
- ✅ Pagination (max 100 items per page)
- ✅ Eager loading to prevent N+1 queries
- ✅ Response compression (gzip)
- ✅ Rate limiting to prevent abuse
- 🔜 Response caching (future)

### Frontend Level
- ✅ Code splitting by route (React.lazy)
- ✅ TanStack Query caching (5 min staleTime)
- ✅ Debounced search inputs
- 🔜 Image lazy loading (future)
- 🔜 Virtual scrolling for long lists (future)

## Deployment Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Production                         │
└──────────────────────────────────────────────────────┘

┌─────────────────┐         ┌──────────────────┐
│                 │         │                  │
│  Vercel CDN     │         │  Render/Railway  │
│  (Frontend)     │         │  (Backend)       │
│                 │         │                  │
│  - Static files │         │  - Node.js app   │
│  - Auto-scaling │         │  - Auto-deploy   │
│  - Global CDN   │         │  - Health checks │
│                 │         │                  │
└─────────────────┘         └──────────────────┘
         │                           │
         │                           │
         │                           ▼
         │                  ┌──────────────────┐
         │                  │                  │
         └─────────────────►│  PostgreSQL DB   │
           API Calls        │  (Managed)       │
                            │                  │
                            │  - Backups       │
                            │  - Replication   │
                            │  - Monitoring    │
                            │                  │
                            └──────────────────┘
```

## Environment Configuration

### Development
```
Client:  http://localhost:5173
Server:  http://localhost:5000
DB:      localhost:5432
Cookies: Secure=false
Logging: DEBUG level
```

### Production
```
Client:  https://bookstore.com
Server:  https://api.bookstore.com
DB:      managed-db.region.provider.com
Cookies: Secure=true, SameSite=Strict
Logging: INFO level
```

## Key Files

| File | Purpose |
|------|---------|
| `ARCHITECTURE.md` | Complete technical architecture |
| `SETUP_GUIDE.md` | Setup and installation guide |
| `API_REFERENCE.md` | Complete API documentation |
| `DEPENDENCIES.md` | Dependency explanations |
| `DATABASE_SCHEMA.sql` | PostgreSQL schema |
| `README.md` | Project overview |
| `CLAUDE.md` | Project instructions |

## Implementation Phases

```
Phase 1: Foundation Setup (Week 1)
├─ Initialize monorepo
├─ Configure Vite + React
├─ Configure Express + Sequelize
└─ Set up PostgreSQL

Phase 2: Database & Models (Week 1-2)
├─ Create Sequelize models
├─ Create migrations
└─ Seed sample data

Phase 3: Authentication (Week 2)
├─ JWT utilities
├─ Auth endpoints
├─ Auth middleware
└─ RBAC middleware

Phase 4: Core API (Week 2-3)
├─ Book CRUD endpoints
├─ Review endpoints
├─ Order endpoints
├─ User management
└─ Validation & error handling

Phase 5: Frontend Foundation (Week 3)
├─ React Router setup
├─ Redux store setup
├─ TanStack Query setup
├─ Axios client with interceptors
└─ Common UI components

Phase 6: Frontend Features (Week 3-4)
├─ Auth pages (login, register)
├─ Book browsing & details
├─ Shopping cart
├─ Checkout flow
├─ User profile
└─ Admin panel

Phase 7: Security & Optimization (Week 4)
├─ Rate limiting
├─ Security headers
├─ Input sanitization
├─ Performance optimization
└─ Logging setup

Phase 8: Testing & Deployment (Week 5)
├─ Unit tests
├─ Integration tests
├─ CI/CD pipeline
└─ Deploy to production
```

## Success Metrics

**Performance:**
- API response time < 200ms (p95)
- Page load time < 2s
- Time to interactive < 3s
- Database query time < 50ms (p95)

**Scalability:**
- Support 10,000 concurrent users
- Handle 1M books in catalog
- Process 100K orders/month

**Security:**
- Zero XSS vulnerabilities
- Zero SQL injection vulnerabilities
- 100% HTTPS in production
- Regular dependency updates

**Code Quality:**
- 80%+ test coverage
- Zero ESLint errors
- 100% formatted with Prettier
- All APIs documented

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Database
npm run migrate          # Run migrations
npm run seed            # Seed data

# Testing
npm test                # Run tests
npm run test:coverage   # Coverage report

# Code Quality
npm run lint            # Lint code
npm run format          # Format code

# Production
npm run build           # Build for production
npm start              # Start production server
```

## Support & Resources

- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed design decisions
- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for setup help
- Refer to [API_REFERENCE.md](./API_REFERENCE.md) for API details
- See [DEPENDENCIES.md](./DEPENDENCIES.md) for technology explanations

---

**Architecture Version**: 1.0
**Last Updated**: 2025-11-03
**Status**: Ready for Implementation ✅
