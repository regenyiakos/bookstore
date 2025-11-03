-- ============================================
-- BookStore Database Schema
-- PostgreSQL 15+
-- ============================================
-- This file contains the complete database schema
-- for the BookStore application.
--
-- Usage:
--   psql -U bookstore_user -d bookstore_dev -f DATABASE_SCHEMA.sql
--
-- Note: This is for reference and initial setup.
-- In production, use Sequelize migrations for schema changes.
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- Trigram similarity for fuzzy text search

-- ============================================
-- Drop existing tables (for clean setup)
-- ============================================
-- Uncomment these lines if you need to reset the database
-- DROP TABLE IF EXISTS order_items CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS reviews CASCADE;
-- DROP TABLE IF EXISTS books CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- Table: users
-- ============================================
-- Stores user account information
-- password_hash: bcrypt hashed password (never store plain text)
-- role: Either 'user' or 'admin' (enforced by CHECK constraint)
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Comments for documentation
COMMENT ON TABLE users IS 'User accounts with authentication credentials';
COMMENT ON COLUMN users.password_hash IS 'bcrypt hashed password with salt (cost factor: 12)';
COMMENT ON COLUMN users.role IS 'User role: user (default) or admin';

-- ============================================
-- Table: books
-- ============================================
-- Stores book catalog information
-- price: DECIMAL(10,2) prevents floating-point errors
-- stock: Current inventory count (non-negative)
-- image_url: External URL to book cover (CDN/S3)
-- ============================================

CREATE TABLE IF NOT EXISTS books (
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

-- Indexes for books table
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);
CREATE INDEX IF NOT EXISTS idx_books_price ON books(price);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_books_title_trgm ON books USING gin(title gin_trgm_ops);

-- Comments
COMMENT ON TABLE books IS 'Book catalog with pricing and inventory';
COMMENT ON COLUMN books.price IS 'Book price in USD (DECIMAL prevents floating-point errors)';
COMMENT ON COLUMN books.stock IS 'Current inventory count (updated atomically during orders)';
COMMENT ON INDEX idx_books_title_trgm IS 'Trigram index for fuzzy title search';

-- ============================================
-- Table: reviews
-- ============================================
-- Stores user reviews for books
-- rating: 1-5 stars (enforced by CHECK constraint)
-- UNIQUE(user_id, book_id): One review per user per book
-- ON DELETE CASCADE: Delete reviews if user/book is deleted
-- ============================================

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, book_id)
);

-- Indexes for reviews table
CREATE INDEX IF NOT EXISTS idx_reviews_book_id ON reviews(book_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Comments
COMMENT ON TABLE reviews IS 'User reviews and ratings for books';
COMMENT ON COLUMN reviews.rating IS 'Rating from 1 (poor) to 5 (excellent)';
COMMENT ON CONSTRAINT reviews_user_id_book_id_key ON reviews IS 'Prevent multiple reviews per user per book';

-- ============================================
-- Table: orders
-- ============================================
-- Stores order header information
-- total_price: Pre-calculated total for performance
-- status: Order lifecycle state (enforced by CHECK constraint)
-- ON DELETE SET NULL: Preserve orders if user is deleted
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for orders table
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Comments
COMMENT ON TABLE orders IS 'Order headers with status and total';
COMMENT ON COLUMN orders.total_price IS 'Pre-calculated total (sum of order_items)';
COMMENT ON COLUMN orders.status IS 'Order status: pending, processing, shipped, delivered, cancelled';

-- ============================================
-- Table: order_items
-- ============================================
-- Stores line items for each order
-- price: Snapshot of book price at time of purchase (historical accuracy)
-- ON DELETE CASCADE: Delete items if order is deleted
-- ON DELETE SET NULL: Preserve items if book is deleted from catalog
-- ============================================

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for order_items table
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_book_id ON order_items(book_id);

-- Comments
COMMENT ON TABLE order_items IS 'Individual items within an order';
COMMENT ON COLUMN order_items.price IS 'Snapshot of book price at time of purchase (not current price)';
COMMENT ON COLUMN order_items.quantity IS 'Number of units purchased';

-- ============================================
-- Functions and Triggers
-- ============================================

-- Function: Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger: users.updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: books.updated_at
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: reviews.updated_at
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: orders.updated_at
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Views for Common Queries
-- ============================================

-- View: Book statistics (average rating, review count)
CREATE OR REPLACE VIEW book_statistics AS
SELECT
  b.id AS book_id,
  b.title,
  b.author,
  b.price,
  b.category,
  b.stock,
  COALESCE(AVG(r.rating), 0) AS average_rating,
  COUNT(r.id) AS review_count
FROM books b
LEFT JOIN reviews r ON b.id = r.book_id
GROUP BY b.id;

COMMENT ON VIEW book_statistics IS 'Books with calculated average rating and review count';

-- View: Order summary with item count
CREATE OR REPLACE VIEW order_summary AS
SELECT
  o.id AS order_id,
  o.user_id,
  u.name AS user_name,
  u.email AS user_email,
  o.total_price,
  o.status,
  COUNT(oi.id) AS item_count,
  o.created_at,
  o.updated_at
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, u.name, u.email;

COMMENT ON VIEW order_summary IS 'Orders with user info and item count';

-- ============================================
-- Sample Data (for development/testing)
-- ============================================
-- Uncomment to insert sample data

-- Insert admin user (password: Admin123!)
-- INSERT INTO users (name, email, password_hash, role) VALUES
-- ('Admin User', 'admin@bookstore.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5ajJnmDfyC4cK', 'admin');

-- Insert regular user (password: User123!)
-- INSERT INTO users (name, email, password_hash, role) VALUES
-- ('John Doe', 'john@example.com', '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

-- Insert sample books
-- INSERT INTO books (title, author, price, category, description, image_url, stock) VALUES
-- ('Clean Code', 'Robert C. Martin', 29.99, 'Programming', 'A handbook of agile software craftsmanship.', 'https://via.placeholder.com/300x400', 50),
-- ('The Pragmatic Programmer', 'David Thomas', 34.99, 'Programming', 'Your journey to mastery.', 'https://via.placeholder.com/300x400', 30),
-- ('Design Patterns', 'Erich Gamma', 39.99, 'Software Architecture', 'Elements of reusable object-oriented software.', 'https://via.placeholder.com/300x400', 25),
-- ('Refactoring', 'Martin Fowler', 29.99, 'Programming', 'Improving the design of existing code.', 'https://via.placeholder.com/300x400', 40),
-- ('Domain-Driven Design', 'Eric Evans', 45.99, 'Software Architecture', 'Tackling complexity in the heart of software.', 'https://via.placeholder.com/300x400', 20);

-- Insert sample reviews
-- INSERT INTO reviews (user_id, book_id, rating, comment) VALUES
-- (2, 1, 5, 'Excellent book! Changed the way I write code.'),
-- (2, 2, 4, 'Very comprehensive, but can be dense at times.');

-- ============================================
-- Useful Queries for Development
-- ============================================

-- Get books with average rating and review count
-- SELECT * FROM book_statistics ORDER BY average_rating DESC;

-- Get all orders for a user
-- SELECT * FROM order_summary WHERE user_id = 1 ORDER BY created_at DESC;

-- Find books with low stock (< 10)
-- SELECT id, title, author, stock FROM books WHERE stock < 10 ORDER BY stock ASC;

-- Get top-selling books
-- SELECT
--   b.id,
--   b.title,
--   b.author,
--   SUM(oi.quantity) AS total_sold,
--   SUM(oi.quantity * oi.price) AS total_revenue
-- FROM books b
-- JOIN order_items oi ON b.id = oi.book_id
-- GROUP BY b.id
-- ORDER BY total_sold DESC
-- LIMIT 10;

-- Get user order history with details
-- SELECT
--   o.id AS order_id,
--   o.created_at,
--   o.status,
--   b.title,
--   oi.quantity,
--   oi.price,
--   (oi.quantity * oi.price) AS item_total
-- FROM orders o
-- JOIN order_items oi ON o.id = oi.order_id
-- JOIN books b ON oi.book_id = b.id
-- WHERE o.user_id = 1
-- ORDER BY o.created_at DESC;

-- ============================================
-- Database Maintenance
-- ============================================

-- Analyze tables for query optimization (run periodically)
-- ANALYZE users;
-- ANALYZE books;
-- ANALYZE reviews;
-- ANALYZE orders;
-- ANALYZE order_items;

-- Vacuum to reclaim storage (run during off-peak hours)
-- VACUUM ANALYZE;

-- Check index usage (identify unused indexes)
-- SELECT
--   schemaname,
--   tablename,
--   indexname,
--   idx_scan AS index_scans
-- FROM pg_stat_user_indexes
-- WHERE schemaname = 'public'
-- ORDER BY idx_scan ASC;

-- Check table sizes
-- SELECT
--   tablename,
--   pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================
-- Security Notes
-- ============================================
-- 1. NEVER store plain text passwords - always use bcrypt
-- 2. Use prepared statements (Sequelize does this automatically)
-- 3. Limit database user privileges (don't use superuser in app)
-- 4. Enable SSL for database connections in production
-- 5. Regularly backup the database
-- 6. Monitor slow queries and optimize indexes
-- 7. Use connection pooling to prevent connection exhaustion
-- 8. Set appropriate max_connections in PostgreSQL config

-- ============================================
-- Backup and Restore Commands
-- ============================================
-- Backup database:
--   pg_dump -U bookstore_user -d bookstore_dev -F c -f bookstore_backup.dump
--
-- Restore database:
--   pg_restore -U bookstore_user -d bookstore_dev -c bookstore_backup.dump
--
-- Backup with SQL format (human-readable):
--   pg_dump -U bookstore_user -d bookstore_dev > bookstore_backup.sql
--
-- Restore from SQL:
--   psql -U bookstore_user -d bookstore_dev < bookstore_backup.sql

-- ============================================
-- Performance Tuning Recommendations
-- ============================================
-- For production PostgreSQL configuration:
--
-- shared_buffers = 256MB           # 25% of RAM
-- effective_cache_size = 1GB       # 50-75% of RAM
-- maintenance_work_mem = 64MB      # For faster index creation
-- checkpoint_completion_target = 0.9
-- wal_buffers = 16MB
-- default_statistics_target = 100  # Better query planning
-- random_page_cost = 1.1           # For SSD storage
-- effective_io_concurrency = 200   # For SSD storage
-- work_mem = 16MB                  # Per-operation memory
-- max_connections = 100            # Adjust based on load

-- ============================================
-- Schema Version
-- ============================================
-- Version: 1.0
-- Last Updated: 2025-11-03
-- PostgreSQL Version: 15+
-- Compatible with: Sequelize 6.35+
