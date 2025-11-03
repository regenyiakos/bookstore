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
