# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BookStore is a modern, responsive web application for browsing, purchasing, and reviewing books. The application follows a full-stack architecture with React frontend and RESTful API backend.

**Language Note**: The specification is in Hungarian, but code, comments, and documentation should be in English unless otherwise specified by the user.

## Technology Stack

### Frontend
- **React 18+** with Vite as the build tool
- **React Router** for navigation
- **TanStack Query** for API calls and server state management
- **Redux Toolkit** for client state management
- **Tailwind CSS** for styling

### Backend
- **Node.js + Express.js**
- **Sequelize** ORM for database operations
- **PostgreSQL** database
- **JWT** authentication with HttpOnly cookies
- **bcrypt** for password hashing

## Database Schema

Core tables:
- `users`: id, name, email, password_hash, role (user/admin), created_at
- `books`: id, title, author, price, category, description, image_url, stock, created_at
- `reviews`: id, user_id, book_id, rating (1-5), comment, created_at
- `orders`: id, user_id, total_price, status, created_at
- `order_items`: id, order_id, book_id, quantity, price

## Application Architecture

### Route Structure
- `/` - Home page with book listings
- `/books/:id` - Book details with reviews
- `/login` - User authentication
- `/register` - User registration
- `/cart` - Shopping cart and checkout
- `/profile` - User profile and purchase history
- `/admin` - Admin panel (books, users, orders, statistics)

### User Roles
- **Public**: Browse books, search, view details, register/login
- **User**: All public features + profile management, purchase history, write reviews
- **Admin**: All user features + CRUD operations on books/users, order tracking, statistics dashboard

## Security Requirements
- JWT tokens stored in HttpOnly cookies (never localStorage)
- Role-based access control (RBAC) for protected routes
- All passwords must be hashed with bcrypt before storage
- Input validation and sanitization on both client and server
- SQL injection prevention via Sequelize parameterized queries

## Development Setup

### Environment Configuration
Use `.env` files for configuration. Required variables should include:
- Database connection (host, port, user, password, database name)
- JWT secret
- API base URL
- Port numbers for frontend and backend

### Code Quality
- Use Prettier for code formatting
- Follow React best practices (hooks, functional components)
- Implement proper error handling and user feedback
- Use TypeScript if adding type safety (recommended but not specified)

## Future Considerations

Planned features mentioned in specification:
- Wishlist functionality
- Recommendation system based on purchase history
- Multi-language support (i18n)
- React Native mobile app
- Digital book purchases (PDF/e-book downloads)
- Payment integration (Stripe API suggested)

## Deployment
Suggested platforms: Vercel (frontend), Render/Railway (backend + database)

## Development Workflow

### CRITICAL: Read These First
Before implementing ANY feature, read:
- **[DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md)** - Required reading for all developers
- **[TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)** - Use after EVERY code change

### Quick Rules for AI Agents

**BEFORE implementing features:**
1. ✅ Understand EXACTLY which files you're allowed to modify
2. ✅ Get explicit permission to modify shared files
3. ✅ Create feature-specific folders (don't modify existing components)
4. ✅ Test EVERYTHING after your changes (use TESTING_CHECKLIST.md)

**NEVER do these without explicit permission:**
- ❌ Modify auth-related files (Login, Register, authService, authController)
- ❌ Change shared components outside your feature scope
- ❌ Update package.json or configuration files
- ❌ Refactor working code "while you're at it"
- ❌ Change API clients used by multiple features

**ALWAYS do these:**
- ✅ Create new files in feature-specific directories
- ✅ Report ALL files you created/modified
- ✅ Test all existing features still work
- ✅ Check for console errors
- ✅ Verify no breaking changes

### Git Workflow

```bash
# 1. Commit working code BEFORE starting new features
git add .
git commit -m "checkpoint: all features working"

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make small changes, test, commit
git add specific-files
git commit -m "feat: add component X"

# 4. Repeat until feature is complete

# 5. Push and create PR
git push origin feature/my-feature
```

### Testing Requirements

**After EVERY code change:**
- [ ] Run the Quick Test (5 min) - See TESTING_CHECKLIST.md
- [ ] No console errors
- [ ] Basic functionality works

**Before EVERY commit:**
- [ ] Run the Full Regression Test (15 min) - See TESTING_CHECKLIST.md
- [ ] All pages still work
- [ ] Authentication still works
- [ ] Navigation still works

**Before merging to development:**
- [ ] All tests pass
- [ ] Code review completed
- [ ] PR template checklist filled out

### File Organization

When creating new features, use this structure:
```
client/src/pages/[FeatureName]/
  ├── index.jsx
  ├── components/       # Feature-specific components
  ├── hooks/           # Feature-specific hooks
  └── utils/           # Feature-specific utilities
```

**Only modify shared files when absolutely necessary and with permission.**

### Recovery Procedures

If something breaks:
```bash
# See what changed
git status
git diff

# Revert to last working commit
git reset --hard HEAD~1

# Or restore specific file
git checkout HEAD~1 -- path/to/file.js
```

### Documentation References

- **[DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md)** - Complete development workflow
- **[TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)** - Testing procedures
- **[.github/PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md)** - PR requirements
- **backend/AUTH_IMPLEMENTATION.md** - Authentication system documentation
- **backend/AUTH_QUICK_REFERENCE.md** - Quick auth API reference
