# BookStore - Dependencies Reference Guide

This document provides detailed information about all dependencies used in the BookStore project, including their purpose, configuration, and alternatives.

## Frontend Dependencies (client/package.json)

### Core Dependencies

#### react (^18.2.0)
- **Purpose**: Core UI library for building component-based user interfaces
- **Why this version**: React 18 introduces concurrent features, automatic batching, and Suspense improvements
- **Key features used**:
  - Hooks (useState, useEffect, useContext, etc.)
  - Concurrent rendering
  - Suspense for code splitting
- **Documentation**: https://react.dev/

#### react-dom (^18.2.0)
- **Purpose**: React renderer for web browsers (DOM manipulation)
- **Why needed**: Required to render React components to the DOM
- **Key features**: createRoot API for concurrent rendering

#### react-router-dom (^6.20.0)
- **Purpose**: Declarative routing for React applications
- **Why this version**: v6 introduces simplified API, nested routes, and better TypeScript support
- **Key features used**:
  - BrowserRouter for HTML5 history API
  - Route components for page mapping
  - Navigate for programmatic navigation
  - useParams, useNavigate hooks
- **Configuration**: Defined in `src/routes/AppRoutes.jsx`
- **Documentation**: https://reactrouter.com/

#### @tanstack/react-query (^5.12.0)
- **Purpose**: Powerful asynchronous state management for data fetching
- **Why chosen over alternatives**:
  - Superior caching and background refetching
  - Automatic request deduplication
  - Better than Redux for server state
  - Lighter than RTK Query
- **Key features used**:
  - useQuery for data fetching
  - useMutation for data updates
  - Query invalidation for cache management
  - Optimistic updates
- **Configuration**:
  ```javascript
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,  // Data fresh for 5 minutes
        cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
  ```
- **Documentation**: https://tanstack.com/query/

#### @reduxjs/toolkit (^2.0.0)
- **Purpose**: State management for client-side state (cart, UI state)
- **Why RTK over plain Redux**: Less boilerplate, built-in Immer, better DevTools
- **Use cases in this project**:
  - Shopping cart state (persisted to localStorage)
  - Authentication state (user info, tokens)
  - UI state (modals, sidebars)
- **Key features**:
  - createSlice for reducers
  - configureStore for store setup
  - createAsyncThunk for async actions (minimal use - prefer React Query)
- **Trade-off**: Could use Context API for simpler state needs
- **Documentation**: https://redux-toolkit.js.org/

#### react-redux (^9.0.0)
- **Purpose**: Official React bindings for Redux
- **Key features**:
  - Provider component
  - useSelector hook
  - useDispatch hook
- **Documentation**: https://react-redux.js.org/

#### axios (^1.6.0)
- **Purpose**: Promise-based HTTP client for API requests
- **Why chosen over fetch**:
  - Automatic JSON transformation
  - Request/response interceptors (for auth)
  - Better error handling
  - Request cancellation
  - Progress tracking
- **Configuration**: Set up in `src/api/client.js` with interceptors
- **Example interceptor**:
  ```javascript
  axios.interceptors.response.use(
    response => response,
    async error => {
      // Handle 401 and refresh token
    }
  );
  ```
- **Documentation**: https://axios-http.com/

#### clsx (^2.0.0)
- **Purpose**: Utility for constructing className strings conditionally
- **Why needed**: Simplifies dynamic Tailwind class composition
- **Example usage**:
  ```javascript
  <button className={clsx('btn', isActive && 'btn-active', className)}>
  ```
- **Alternative**: classnames (slightly heavier)
- **Documentation**: https://github.com/lukeed/clsx

#### react-hook-form (^7.48.0)
- **Purpose**: Performant form handling with minimal re-renders
- **Why chosen**:
  - Uncontrolled inputs (better performance)
  - Built-in validation
  - Small bundle size
  - Works well with Zod for schema validation
- **Key features**:
  - useForm hook
  - register for input binding
  - handleSubmit for form submission
  - formState for errors and validation
- **Documentation**: https://react-hook-form.com/

#### zod (^3.22.0)
- **Purpose**: TypeScript-first schema validation library
- **Use cases**:
  - Form validation (with react-hook-form)
  - API response validation
  - Environment variable validation
- **Example schema**:
  ```javascript
  const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });
  ```
- **Why chosen**: Type inference, composability, great error messages
- **Documentation**: https://zod.dev/

#### @hookform/resolvers (^3.3.0)
- **Purpose**: Validation resolvers for react-hook-form
- **Why needed**: Bridges react-hook-form with Zod validation
- **Usage**:
  ```javascript
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });
  ```

### Development Dependencies

#### @vitejs/plugin-react (^4.2.0)
- **Purpose**: Official Vite plugin for React with Fast Refresh
- **Features**: Hot Module Replacement (HMR), JSX transformation

#### vite (^5.0.0)
- **Purpose**: Next-generation frontend build tool
- **Why chosen over webpack**:
  - 10-20x faster HMR
  - Native ES modules
  - Simpler configuration
  - Faster builds
- **Configuration**: `vite.config.js`
- **Documentation**: https://vitejs.dev/

#### tailwindcss (^3.4.0)
- **Purpose**: Utility-first CSS framework
- **Why chosen**:
  - Rapid development
  - Consistent design system
  - Minimal CSS output (PurgeCSS built-in)
  - Excellent customization
- **Configuration**: `tailwind.config.js`
- **Documentation**: https://tailwindcss.com/

#### postcss (^8.4.0)
- **Purpose**: CSS transformation tool (required by Tailwind)
- **Configuration**: `postcss.config.js`

#### autoprefixer (^10.4.0)
- **Purpose**: Adds vendor prefixes to CSS automatically
- **Why needed**: Browser compatibility for older browsers

#### eslint (^8.55.0)
- **Purpose**: JavaScript linting tool
- **Configuration**: `.eslintrc.json`
- **Purpose**: Enforce code quality and catch errors

#### eslint-plugin-react (^7.33.0)
- **Purpose**: React-specific linting rules
- **Key rules**: JSX best practices, hook usage

#### eslint-plugin-react-hooks (^4.6.0)
- **Purpose**: Enforces Rules of Hooks
- **Why critical**: Prevents common React hook mistakes

#### eslint-plugin-react-refresh (^0.4.0)
- **Purpose**: Validates Fast Refresh constraints
- **Why needed**: Ensures HMR works correctly

#### prettier (^3.1.0)
- **Purpose**: Opinionated code formatter
- **Why needed**: Consistent code style across team
- **Configuration**: `.prettierrc`
- **Documentation**: https://prettier.io/

#### prettier-plugin-tailwindcss (^0.5.0)
- **Purpose**: Auto-sorts Tailwind CSS classes
- **Why needed**: Consistent class ordering, easier to read
- **Example**: `className="flex items-center justify-between"` (sorted)

---

## Backend Dependencies (server/package.json)

### Core Dependencies

#### express (^4.18.0)
- **Purpose**: Minimalist web framework for Node.js
- **Why chosen**:
  - Industry standard
  - Massive middleware ecosystem
  - Flexible and unopinionated
  - Excellent documentation
- **Key features**:
  - Routing
  - Middleware chain
  - Request/response handling
- **Alternative considered**: NestJS (more structured but complex), Fastify (faster but smaller ecosystem)
- **Documentation**: https://expressjs.com/

#### sequelize (^6.35.0)
- **Purpose**: Promise-based ORM for PostgreSQL (and other databases)
- **Why chosen**:
  - Mature and stable
  - Built-in migrations and seeders
  - Support for associations
  - Transaction support
- **Key features**:
  - Model definition
  - Associations (hasMany, belongsTo, etc.)
  - Query building
  - Migrations
- **Concerns**: TypeScript support not as good as Prisma
- **Alternative**: Prisma (better DX, type safety)
- **Documentation**: https://sequelize.org/

#### pg (^8.11.0)
- **Purpose**: PostgreSQL client for Node.js
- **Why needed**: Required by Sequelize for PostgreSQL connection
- **Features**: Connection pooling, prepared statements

#### pg-hstore (^2.3.4)
- **Purpose**: Serialization/deserialization of hstore data type
- **Why needed**: Required by Sequelize for PostgreSQL

#### bcrypt (^5.1.0)
- **Purpose**: Password hashing library
- **Why chosen**:
  - Industry standard
  - Configurable work factor (future-proofing)
  - Automatic salting
  - Resistant to rainbow table attacks
- **Configuration**: Work factor of 12 (balance security/performance)
- **Usage**:
  ```javascript
  const hashedPassword = await bcrypt.hash(password, 12);
  const isValid = await bcrypt.compare(password, hashedPassword);
  ```
- **Alternative**: argon2 (newer, potentially more secure)
- **Documentation**: https://github.com/kelektiv/node.bcrypt.js

#### jsonwebtoken (^9.0.0)
- **Purpose**: JSON Web Token implementation
- **Why chosen**: Industry standard for stateless authentication
- **Usage**:
  ```javascript
  const token = jwt.sign({ userId: 1 }, secret, { expiresIn: '15m' });
  const decoded = jwt.verify(token, secret);
  ```
- **Configuration**: Separate secrets for access/refresh tokens
- **Documentation**: https://github.com/auth0/node-jsonwebtoken

#### cookie-parser (^1.4.6)
- **Purpose**: Parse Cookie header and populate req.cookies
- **Why needed**: Access JWT tokens stored in HttpOnly cookies
- **Usage**:
  ```javascript
  app.use(cookieParser());
  const token = req.cookies.accessToken;
  ```

#### cors (^2.8.5)
- **Purpose**: Enable CORS with various options
- **Configuration**:
  ```javascript
  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // Allow cookies
  }));
  ```
- **Why needed**: Allow frontend (different origin) to make requests

#### dotenv (^16.3.0)
- **Purpose**: Load environment variables from .env files
- **Usage**:
  ```javascript
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  ```
- **Why needed**: Separate configuration from code

#### express-validator (^7.0.0)
- **Purpose**: Middleware for request validation and sanitization
- **Why chosen**:
  - Built on validator.js
  - Express-specific API
  - Validation chains
- **Example**:
  ```javascript
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  ```
- **Documentation**: https://express-validator.github.io/

#### helmet (^7.1.0)
- **Purpose**: Secure Express apps by setting various HTTP headers
- **Headers set**:
  - Content-Security-Policy
  - X-DNS-Prefetch-Control
  - X-Frame-Options
  - X-Content-Type-Options
  - Strict-Transport-Security (HSTS)
- **Usage**: `app.use(helmet())`
- **Documentation**: https://helmetjs.github.io/

#### express-rate-limit (^7.1.0)
- **Purpose**: Rate limiting middleware for Express
- **Why needed**: Prevent brute-force attacks and API abuse
- **Configuration**:
  ```javascript
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  });
  ```
- **Production enhancement**: Use Redis store for distributed rate limiting
- **Documentation**: https://github.com/express-rate-limit/express-rate-limit

#### morgan (^1.10.0)
- **Purpose**: HTTP request logger middleware
- **Modes**:
  - Development: 'dev' (colored, concise)
  - Production: 'combined' (Apache common log format)
- **Integration**: Can pipe to Winston for structured logging
- **Documentation**: https://github.com/expressjs/morgan

#### winston (^3.11.0)
- **Purpose**: Versatile logging library
- **Why chosen**:
  - Multiple transports (console, file, external services)
  - Log levels (error, warn, info, debug)
  - Structured logging (JSON)
  - Production-ready
- **Configuration**:
  ```javascript
  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  ```
- **Documentation**: https://github.com/winstonjs/winston

### Development Dependencies

#### nodemon (^3.0.0)
- **Purpose**: Automatically restart server on file changes
- **Configuration**: `nodemon.config.json` (optional)
- **Usage**: `nodemon src/server.js`
- **Why needed**: Development convenience

#### eslint (^8.55.0)
- **Purpose**: JavaScript linting
- **Configuration**: `.eslintrc.json`

#### prettier (^3.1.0)
- **Purpose**: Code formatting
- **Configuration**: `.prettierrc`

#### jest (^29.7.0)
- **Purpose**: JavaScript testing framework
- **Why chosen**:
  - Zero config for Node.js
  - Snapshot testing
  - Coverage reports
  - Mocking capabilities
- **Configuration**: `jest.config.js`
- **Documentation**: https://jestjs.io/

#### supertest (^6.3.0)
- **Purpose**: HTTP assertions for testing Express apps
- **Why needed**: Test API endpoints without running server
- **Example**:
  ```javascript
  const request = require('supertest');
  const app = require('./app');

  test('GET /api/v1/books', async () => {
    const response = await request(app).get('/api/v1/books');
    expect(response.status).toBe(200);
  });
  ```
- **Documentation**: https://github.com/ladjs/supertest

---

## Optional Dependencies (Future Enhancements)

### Frontend

#### @tanstack/react-query-devtools
- **Purpose**: DevTools for React Query
- **Why**: Inspect queries, mutations, cache
- **Installation**: `npm install -D @tanstack/react-query-devtools`

#### react-hot-toast or react-toastify
- **Purpose**: Toast notifications for user feedback
- **Use cases**: Success messages, error alerts
- **Installation**: `npm install react-hot-toast`

#### react-icons
- **Purpose**: Popular icon library (Font Awesome, Material, etc.)
- **Installation**: `npm install react-icons`

#### date-fns or dayjs
- **Purpose**: Date manipulation and formatting
- **Use cases**: Format order dates, "2 days ago"
- **Installation**: `npm install date-fns`

#### recharts or chart.js
- **Purpose**: Charting library for admin statistics
- **Installation**: `npm install recharts`

### Backend

#### joi
- **Purpose**: Alternative to express-validator for schema validation
- **Why consider**: More powerful for complex validation
- **Installation**: `npm install joi`

#### ioredis
- **Purpose**: Redis client for Node.js
- **Use cases**: Session storage, caching, rate limiting
- **Installation**: `npm install ioredis`

#### multer
- **Purpose**: Middleware for handling multipart/form-data (file uploads)
- **Use cases**: Book cover image uploads
- **Installation**: `npm install multer`

#### sharp
- **Purpose**: Image processing (resize, optimize)
- **Use cases**: Optimize uploaded book covers
- **Installation**: `npm install sharp`

#### @sentry/node
- **Purpose**: Error tracking and monitoring
- **Why needed**: Production error tracking
- **Installation**: `npm install @sentry/node`

#### compression
- **Purpose**: Gzip compression middleware
- **Why needed**: Reduce response size
- **Installation**: `npm install compression`

---

## Dependency Management Best Practices

### Version Pinning Strategy

**Development Philosophy:**
- Use `^` (caret) for minor updates: `^1.2.3` allows `>=1.2.3 <2.0.0`
- Avoid `*` or `latest` (unpredictable)
- Lock versions in `package-lock.json`

**Production Philosophy:**
- Consider exact versions for critical dependencies
- Test updates in staging before production
- Use tools like Dependabot for security updates

### Security Auditing

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force
```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update to latest within semver range
npm update

# Update specific package
npm update <package-name>

# Interactive update (use npm-check-updates)
npx npm-check-updates -i
```

### Bundle Size Monitoring

```bash
# Analyze frontend bundle
npm run build
npx vite-bundle-visualizer

# Check package size before installing
npx bundle-phobia <package-name>
```

---

## Dependency Alternatives Comparison

### Frontend State Management

| Library | Pros | Cons | Use Case |
|---------|------|------|----------|
| Redux Toolkit | Predictable, DevTools, Large ecosystem | Boilerplate, Learning curve | Complex apps, multiple features |
| Zustand | Minimal boilerplate, Simple API | Smaller ecosystem | Simpler state needs |
| Jotai | Atomic state, TypeScript-first | Newer, smaller community | Fine-grained state |
| Context API | Built-in, No dependencies | Performance issues at scale | Simple, localized state |

**Current choice**: Redux Toolkit (for standardization and tooling)

### Form Handling

| Library | Pros | Cons | Use Case |
|---------|------|------|----------|
| React Hook Form | Performance, Small size | Uncontrolled inputs | Most forms |
| Formik | Easy API, Controlled inputs | Slower, Larger | Simple forms |
| React Final Form | Flexible, Framework agnostic | More setup | Complex forms |

**Current choice**: React Hook Form (best performance)

### HTTP Client

| Library | Pros | Cons | Use Case |
|---------|------|------|----------|
| axios | Interceptors, Auto-parse JSON | Larger size | Full-featured apps |
| fetch (native) | No dependencies, Modern | Manual JSON parsing | Simple requests |
| ky | Modern fetch wrapper | Smaller ecosystem | Lightweight apps |

**Current choice**: axios (interceptors for auth)

### Backend ORM

| Library | Pros | Cons | Use Case |
|---------|------|------|----------|
| Sequelize | Mature, Multi-DB support | Verbose, Weaker TypeScript | Existing projects |
| Prisma | Type-safe, Great DX | PostgreSQL-focused | New projects |
| TypeORM | TypeScript-first | Complex queries verbose | TypeScript apps |
| Kysely | Type-safe SQL builder | Manual migrations | SQL-first approach |

**Current choice**: Sequelize (specification requirement, but Prisma recommended for future)

---

## Total Dependency Count

**Frontend:**
- Production: 9 packages
- Development: 12 packages
- Total: 21 packages

**Backend:**
- Production: 13 packages
- Development: 4 packages
- Total: 17 packages

**Combined: 38 packages** (reasonable for a full-stack application)

---

## License Compliance

All chosen dependencies use permissive licenses:
- **MIT**: Most dependencies (React, Express, Sequelize, etc.)
- **Apache 2.0**: Some packages (winston, helmet)
- **ISC**: Some packages (bcrypt)

**No GPL or restrictive licenses** that would require open-sourcing proprietary code.

---

**Document Version**: 1.0
**Last Updated**: 2025-11-03
**Next Review**: Before Phase 3 (Authentication System)
