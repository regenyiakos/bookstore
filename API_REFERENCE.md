# BookStore - API Reference Documentation

Complete reference for all REST API endpoints in the BookStore application.

## Base URL

- **Development**: `http://localhost:5000/api/v1`
- **Production**: `https://api.bookstore.com/api/v1`

## Authentication

All authenticated endpoints require a valid JWT access token stored in an HttpOnly cookie named `accessToken`.

**Cookie**: `accessToken=<jwt_token>`

## Standard Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    /* Response data */
  },
  "meta": {
    /* Optional metadata (pagination, etc.) */
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [
      /* Optional validation errors */
    ]
  }
}
```

## HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no response body
- `400 Bad Request` - Validation error or malformed request
- `401 Unauthorized` - Authentication required or token invalid/expired
- `403 Forbidden` - Authenticated but insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate email)
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

---

# API Endpoints

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint**: `POST /auth/register`

**Access**: Public

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Validation Rules**:
- `name`: Required, 2-100 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters

**Success Response** (`201 Created`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Set-Cookie Headers**:
- `accessToken`: HttpOnly, Secure, SameSite=Strict, Max-Age=900 (15 minutes)
- `refreshToken`: HttpOnly, Secure, SameSite=Strict, Max-Age=604800 (7 days)

**Error Responses**:

*Validation Error* (`400 Bad Request`):
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
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

*Email Exists* (`409 Conflict`):
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "An account with this email already exists"
  }
}
```

---

### Login User

Authenticate user and issue JWT tokens.

**Endpoint**: `POST /auth/login`

**Access**: Public

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    }
  }
}
```

**Set-Cookie Headers**: Same as register

**Error Responses**:

*Invalid Credentials* (`401 Unauthorized`):
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

**Rate Limiting**: 5 requests per 15 minutes per IP address

---

### Logout User

Invalidate tokens and clear cookies.

**Endpoint**: `POST /auth/logout`

**Access**: Authenticated

**Request Body**: None

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

**Set-Cookie Headers**:
- `accessToken`: Max-Age=0 (clears cookie)
- `refreshToken`: Max-Age=0 (clears cookie)

---

### Refresh Access Token

Exchange refresh token for new access token.

**Endpoint**: `POST /auth/refresh`

**Access**: Public (requires valid `refreshToken` cookie)

**Request Body**: None

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "message": "Token refreshed successfully"
  }
}
```

**Set-Cookie Headers**:
- `accessToken`: New access token (15 min expiry)
- `refreshToken`: New refresh token (7 day expiry) [if using token rotation]

**Error Responses**:

*Invalid/Expired Refresh Token* (`401 Unauthorized`):
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REFRESH_TOKEN",
    "message": "Refresh token is invalid or expired"
  }
}
```

---

### Get Current User

Get authenticated user's information.

**Endpoint**: `GET /auth/me`

**Access**: Authenticated

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

## Book Endpoints

### Get Books (List)

Get paginated list of books with filtering and sorting.

**Endpoint**: `GET /books`

**Access**: Public

**Query Parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page (max 100) |
| category | string | - | Filter by category |
| author | string | - | Filter by author |
| minPrice | number | - | Minimum price filter |
| maxPrice | number | - | Maximum price filter |
| search | string | - | Search in book titles |
| sortBy | enum | created_at | Sort field (price, created_at, title) |
| sortOrder | enum | desc | Sort order (asc, desc) |

**Example Request**:
```
GET /books?page=1&limit=20&category=Programming&sortBy=price&sortOrder=asc
```

**Success Response** (`200 OK`):
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
        "description": "A handbook of agile software craftsmanship...",
        "imageUrl": "https://cdn.example.com/images/clean-code.jpg",
        "stock": 50,
        "averageRating": 4.7,
        "reviewCount": 342,
        "createdAt": "2024-01-10T08:00:00.000Z"
      },
      {
        "id": 2,
        "title": "The Pragmatic Programmer",
        "author": "David Thomas",
        "price": 34.99,
        "category": "Programming",
        "description": "Your journey to mastery...",
        "imageUrl": "https://cdn.example.com/images/pragmatic.jpg",
        "stock": 25,
        "averageRating": 4.8,
        "reviewCount": 289,
        "createdAt": "2024-01-12T09:00:00.000Z"
      }
    ]
  },
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

---

### Get Book Details

Get single book with full details.

**Endpoint**: `GET /books/:id`

**Access**: Public

**URL Parameters**:
- `id`: Book ID (integer)

**Example Request**:
```
GET /books/1
```

**Success Response** (`200 OK`):
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
      "description": "A handbook of agile software craftsmanship. This book is packed with practical advice...",
      "imageUrl": "https://cdn.example.com/images/clean-code.jpg",
      "stock": 50,
      "averageRating": 4.7,
      "reviewCount": 342,
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  }
}
```

**Error Responses**:

*Book Not Found* (`404 Not Found`):
```json
{
  "success": false,
  "error": {
    "code": "BOOK_NOT_FOUND",
    "message": "Book not found"
  }
}
```

---

### Create Book (Admin)

Create a new book.

**Endpoint**: `POST /books`

**Access**: Admin only

**Request Body**:
```json
{
  "title": "Domain-Driven Design",
  "author": "Eric Evans",
  "price": 45.99,
  "category": "Software Architecture",
  "description": "Tackling complexity in the heart of software...",
  "imageUrl": "https://cdn.example.com/images/ddd.jpg",
  "stock": 30
}
```

**Validation Rules**:
- `title`: Required, 1-255 characters
- `author`: Required, 1-255 characters
- `price`: Required, positive number
- `category`: Required, 1-100 characters
- `description`: Optional, string
- `imageUrl`: Optional, valid URL
- `stock`: Required, non-negative integer

**Success Response** (`201 Created`):
```json
{
  "success": true,
  "data": {
    "book": {
      "id": 25,
      "title": "Domain-Driven Design",
      "author": "Eric Evans",
      "price": 45.99,
      "category": "Software Architecture",
      "description": "Tackling complexity in the heart of software...",
      "imageUrl": "https://cdn.example.com/images/ddd.jpg",
      "stock": 30,
      "createdAt": "2024-01-15T11:00:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not admin

---

### Update Book (Admin)

Update existing book details.

**Endpoint**: `PUT /books/:id`

**Access**: Admin only

**URL Parameters**:
- `id`: Book ID (integer)

**Request Body** (all fields optional):
```json
{
  "price": 39.99,
  "stock": 45
}
```

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "book": {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "price": 39.99,
      "category": "Programming",
      "description": "A handbook of agile software craftsmanship...",
      "imageUrl": "https://cdn.example.com/images/clean-code.jpg",
      "stock": 45,
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-15T11:30:00.000Z"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not admin
- `404 Not Found`: Book not found

---

### Delete Book (Admin)

Delete a book from the catalog.

**Endpoint**: `DELETE /books/:id`

**Access**: Admin only

**URL Parameters**:
- `id`: Book ID (integer)

**Success Response** (`204 No Content`)

No response body

**Error Responses**:
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not admin
- `404 Not Found`: Book not found

---

## Review Endpoints

### Get Book Reviews

Get paginated reviews for a specific book.

**Endpoint**: `GET /books/:bookId/reviews`

**Access**: Public

**URL Parameters**:
- `bookId`: Book ID (integer)

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `sortBy`: Sort field (rating, created_at, default: created_at)
- `sortOrder`: Sort order (asc, desc, default: desc)

**Example Request**:
```
GET /books/1/reviews?page=1&limit=10&sortBy=rating&sortOrder=desc
```

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Excellent book! Changed the way I write code.",
        "createdAt": "2024-01-14T15:30:00.000Z",
        "updatedAt": "2024-01-14T15:30:00.000Z",
        "user": {
          "id": 5,
          "name": "Jane Smith"
        }
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "Very comprehensive, but can be dense at times.",
        "createdAt": "2024-01-13T10:20:00.000Z",
        "updatedAt": "2024-01-13T10:20:00.000Z",
        "user": {
          "id": 12,
          "name": "Bob Johnson"
        }
      }
    ]
  },
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 342,
      "totalPages": 35
    }
  }
}
```

---

### Create Review

Create a review for a book.

**Endpoint**: `POST /books/:bookId/reviews`

**Access**: Authenticated

**URL Parameters**:
- `bookId`: Book ID (integer)

**Request Body**:
```json
{
  "rating": 5,
  "comment": "Amazing book! Highly recommend to all developers."
}
```

**Validation Rules**:
- `rating`: Required, integer between 1 and 5
- `comment`: Optional, max 1000 characters

**Success Response** (`201 Created`):
```json
{
  "success": true,
  "data": {
    "review": {
      "id": 343,
      "rating": 5,
      "comment": "Amazing book! Highly recommend to all developers.",
      "userId": 1,
      "bookId": 1,
      "createdAt": "2024-01-15T12:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

**Error Responses**:

*Already Reviewed* (`409 Conflict`):
```json
{
  "success": false,
  "error": {
    "code": "ALREADY_REVIEWED",
    "message": "You have already reviewed this book"
  }
}
```

*Book Not Found* (`404 Not Found`):
```json
{
  "success": false,
  "error": {
    "code": "BOOK_NOT_FOUND",
    "message": "Book not found"
  }
}
```

---

### Update Review

Update own review.

**Endpoint**: `PUT /reviews/:id`

**Access**: Authenticated (owner only)

**URL Parameters**:
- `id`: Review ID (integer)

**Request Body** (all fields optional):
```json
{
  "rating": 4,
  "comment": "Updated my review after re-reading."
}
```

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "review": {
      "id": 343,
      "rating": 4,
      "comment": "Updated my review after re-reading.",
      "userId": 1,
      "bookId": 1,
      "createdAt": "2024-01-15T12:00:00.000Z",
      "updatedAt": "2024-01-15T13:00:00.000Z"
    }
  }
}
```

**Error Responses**:
- `403 Forbidden`: Not the review owner
- `404 Not Found`: Review not found

---

### Delete Review

Delete own review (or any review if admin).

**Endpoint**: `DELETE /reviews/:id`

**Access**: Authenticated (owner or admin)

**URL Parameters**:
- `id`: Review ID (integer)

**Success Response** (`204 No Content`)

**Error Responses**:
- `403 Forbidden`: Not the review owner and not admin
- `404 Not Found`: Review not found

---

## Order Endpoints

### Get Orders

Get user's order history (or all orders if admin).

**Endpoint**: `GET /orders`

**Access**: Authenticated

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `status`: Filter by status (pending, processing, shipped, delivered, cancelled)

**Example Request**:
```
GET /orders?page=1&limit=10&status=delivered
```

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 42,
        "totalPrice": 89.97,
        "status": "delivered",
        "itemCount": 3,
        "createdAt": "2024-01-10T14:30:00.000Z",
        "updatedAt": "2024-01-13T10:00:00.000Z"
      },
      {
        "id": 28,
        "totalPrice": 45.99,
        "status": "delivered",
        "itemCount": 1,
        "createdAt": "2024-01-05T09:15:00.000Z",
        "updatedAt": "2024-01-08T16:20:00.000Z"
      }
    ]
  },
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "totalPages": 2
    }
  }
}
```

**Admin Behavior**: If user is admin, returns all orders from all users.

---

### Get Order Details

Get detailed information about a specific order.

**Endpoint**: `GET /orders/:id`

**Access**: Authenticated (owner or admin)

**URL Parameters**:
- `id`: Order ID (integer)

**Example Request**:
```
GET /orders/42
```

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "order": {
      "id": 42,
      "userId": 1,
      "totalPrice": 89.97,
      "status": "delivered",
      "createdAt": "2024-01-10T14:30:00.000Z",
      "updatedAt": "2024-01-13T10:00:00.000Z",
      "items": [
        {
          "id": 101,
          "quantity": 2,
          "price": 29.99,
          "book": {
            "id": 1,
            "title": "Clean Code",
            "author": "Robert C. Martin",
            "imageUrl": "https://cdn.example.com/images/clean-code.jpg"
          }
        },
        {
          "id": 102,
          "quantity": 1,
          "price": 29.99,
          "book": {
            "id": 3,
            "title": "Refactoring",
            "author": "Martin Fowler",
            "imageUrl": "https://cdn.example.com/images/refactoring.jpg"
          }
        }
      ]
    }
  }
}
```

**Error Responses**:
- `403 Forbidden`: Not the order owner and not admin
- `404 Not Found`: Order not found

---

### Create Order

Create a new order from cart items.

**Endpoint**: `POST /orders`

**Access**: Authenticated

**Request Body**:
```json
{
  "items": [
    {
      "bookId": 1,
      "quantity": 2
    },
    {
      "bookId": 3,
      "quantity": 1
    }
  ]
}
```

**Validation Rules**:
- `items`: Required, non-empty array
- `items[].bookId`: Required, positive integer
- `items[].quantity`: Required, positive integer

**Success Response** (`201 Created`):
```json
{
  "success": true,
  "data": {
    "order": {
      "id": 43,
      "userId": 1,
      "totalPrice": 89.97,
      "status": "pending",
      "createdAt": "2024-01-15T14:00:00.000Z",
      "updatedAt": "2024-01-15T14:00:00.000Z",
      "items": [
        {
          "id": 103,
          "orderId": 43,
          "bookId": 1,
          "quantity": 2,
          "price": 29.99
        },
        {
          "id": 104,
          "orderId": 43,
          "bookId": 3,
          "quantity": 1,
          "price": 29.99
        }
      ]
    }
  }
}
```

**Business Logic**:
1. Validate all books exist
2. Check stock availability for each book
3. Calculate total price from current book prices
4. Create order and order items in a transaction
5. Reduce stock atomically
6. Snapshot book prices in order_items

**Error Responses**:

*Insufficient Stock* (`400 Bad Request`):
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "Insufficient stock for one or more items",
    "details": [
      {
        "bookId": 1,
        "requested": 5,
        "available": 3
      }
    ]
  }
}
```

*Book Not Found* (`404 Not Found`):
```json
{
  "success": false,
  "error": {
    "code": "BOOK_NOT_FOUND",
    "message": "One or more books not found",
    "details": [
      {
        "bookId": 999
      }
    ]
  }
}
```

---

### Update Order Status (Admin)

Update the status of an order.

**Endpoint**: `PATCH /orders/:id/status`

**Access**: Admin only

**URL Parameters**:
- `id`: Order ID (integer)

**Request Body**:
```json
{
  "status": "shipped"
}
```

**Validation Rules**:
- `status`: Required, one of: pending, processing, shipped, delivered, cancelled

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "order": {
      "id": 42,
      "userId": 5,
      "totalPrice": 89.97,
      "status": "shipped",
      "createdAt": "2024-01-10T14:30:00.000Z",
      "updatedAt": "2024-01-15T15:00:00.000Z"
    }
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid status
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not admin
- `404 Not Found`: Order not found

---

## User Management Endpoints (Admin)

### Get Users (Admin)

Get paginated list of all users.

**Endpoint**: `GET /users`

**Access**: Admin only

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `role`: Filter by role (user, admin)
- `search`: Search by name or email

**Example Request**:
```
GET /users?page=1&limit=20&role=user&search=john
```

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "user",
        "createdAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "id": 8,
        "name": "John Smith",
        "email": "john.smith@example.com",
        "role": "user",
        "createdAt": "2024-01-12T08:15:00.000Z"
      }
    ]
  },
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1250,
      "totalPages": 63
    }
  }
}
```

**Note**: `password_hash` is never included in responses.

---

### Get User Details (Admin)

Get detailed information about a specific user.

**Endpoint**: `GET /users/:id`

**Access**: Admin only

**URL Parameters**:
- `id`: User ID (integer)

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "orderCount": 15,
      "totalSpent": 1234.50,
      "reviewCount": 8
    }
  }
}
```

---

### Update User Role (Admin)

Change a user's role.

**Endpoint**: `PATCH /users/:id/role`

**Access**: Admin only

**URL Parameters**:
- `id`: User ID (integer)

**Request Body**:
```json
{
  "role": "admin"
}
```

**Validation Rules**:
- `role`: Required, one of: user, admin

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 5,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "role": "admin",
      "updatedAt": "2024-01-15T16:00:00.000Z"
    }
  }
}
```

---

### Delete User (Admin)

Delete a user account.

**Endpoint**: `DELETE /users/:id`

**Access**: Admin only

**URL Parameters**:
- `id`: User ID (integer)

**Success Response** (`204 No Content`)

**Error Responses**:
- `400 Bad Request`: Cannot delete own admin account
- `404 Not Found`: User not found

**Note**: Orders are preserved (user_id set to NULL via ON DELETE SET NULL).

---

## Profile Endpoints

### Get Current User Profile

Get authenticated user's profile.

**Endpoint**: `GET /profile`

**Access**: Authenticated

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

### Update Profile

Update authenticated user's profile information.

**Endpoint**: `PUT /profile`

**Access**: Authenticated

**Request Body** (all fields optional):
```json
{
  "name": "John A. Doe",
  "email": "john.a.doe@example.com"
}
```

**Validation Rules**:
- `name`: 2-100 characters
- `email`: Valid email format, unique

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John A. Doe",
      "email": "john.a.doe@example.com",
      "role": "user",
      "updatedAt": "2024-01-15T17:00:00.000Z"
    }
  }
}
```

**Error Responses**:

*Email Already Exists* (`409 Conflict`):
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "An account with this email already exists"
  }
}
```

---

### Change Password

Change authenticated user's password.

**Endpoint**: `PUT /profile/password`

**Access**: Authenticated

**Request Body**:
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewSecurePass456!"
}
```

**Validation Rules**:
- `currentPassword`: Required
- `newPassword`: Required, minimum 8 characters

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "message": "Password updated successfully"
  }
}
```

**Error Responses**:

*Invalid Current Password* (`401 Unauthorized`):
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PASSWORD",
    "message": "Current password is incorrect"
  }
}
```

**Security Note**: All sessions should be invalidated after password change (increment tokenVersion).

---

## Statistics Endpoints (Admin)

### Get Dashboard Statistics

Get administrative statistics for dashboard.

**Endpoint**: `GET /admin/statistics`

**Access**: Admin only

**Query Parameters**:
- `period`: Time period (7d, 30d, 90d, 1y, default: 30d)

**Example Request**:
```
GET /admin/statistics?period=30d
```

**Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 1250,
      "totalOrders": 3400,
      "totalRevenue": 125000.00,
      "pendingOrders": 45,
      "lowStockBooks": 12
    },
    "recentOrders": [
      {
        "id": 50,
        "user": {
          "id": 15,
          "name": "Alice Johnson"
        },
        "totalPrice": 59.98,
        "status": "pending",
        "createdAt": "2024-01-15T18:00:00.000Z"
      }
    ],
    "topSellingBooks": [
      {
        "bookId": 1,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "totalSold": 450,
        "revenue": 13495.50
      },
      {
        "bookId": 2,
        "title": "The Pragmatic Programmer",
        "author": "David Thomas",
        "totalSold": 380,
        "revenue": 13296.20
      }
    ],
    "salesByMonth": [
      {
        "month": "2024-01",
        "orderCount": 450,
        "revenue": 15234.50
      },
      {
        "month": "2023-12",
        "orderCount": 520,
        "revenue": 18567.80
      }
    ],
    "categoryDistribution": [
      {
        "category": "Programming",
        "bookCount": 250,
        "orderCount": 1200,
        "revenue": 45000.00
      }
    ]
  }
}
```

---

## Rate Limiting

### Global Rate Limits

- **Public endpoints**: 100 requests per 15 minutes per IP
- **Authenticated endpoints**: 1000 requests per 15 minutes per user
- **Admin endpoints**: 2000 requests per 15 minutes per admin

### Specific Endpoint Limits

- `POST /auth/login`: 5 requests per 15 minutes per IP
- `POST /auth/register`: 3 requests per hour per IP
- `POST /orders`: 10 requests per hour per user

### Rate Limit Headers

All responses include rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642263600
```

### Rate Limit Exceeded Response (`429 Too Many Requests`)

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests, please try again later",
    "retryAfter": 900
  }
}
```

---

## Error Codes Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Request validation failed |
| INVALID_CREDENTIALS | 401 | Email or password incorrect |
| INVALID_PASSWORD | 401 | Current password incorrect |
| INVALID_REFRESH_TOKEN | 401 | Refresh token invalid/expired |
| NOT_AUTHENTICATED | 401 | Authentication required |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| BOOK_NOT_FOUND | 404 | Book not found |
| ORDER_NOT_FOUND | 404 | Order not found |
| USER_NOT_FOUND | 404 | User not found |
| REVIEW_NOT_FOUND | 404 | Review not found |
| EMAIL_EXISTS | 409 | Email already registered |
| ALREADY_REVIEWED | 409 | User already reviewed this book |
| INSUFFICIENT_STOCK | 400 | Not enough stock available |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| INTERNAL_SERVER_ERROR | 500 | Server error |

---

## Testing with cURL

### Register a User

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!"
  }' \
  -c cookies.txt
```

### Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }' \
  -c cookies.txt
```

### Get Books (Authenticated)

```bash
curl -X GET http://localhost:5000/api/v1/books \
  -b cookies.txt
```

### Create Order

```bash
curl -X POST http://localhost:5000/api/v1/orders \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "items": [
      {"bookId": 1, "quantity": 2}
    ]
  }'
```

---

## Postman Collection

A Postman collection with all endpoints is available at:
`/docs/postman_collection.json` (to be created during implementation)

Import this collection into Postman for easy API testing.

---

## OpenAPI/Swagger Documentation

Interactive API documentation will be available at:
- **Development**: `http://localhost:5000/api-docs`
- **Production**: `https://api.bookstore.com/api-docs`

(To be implemented using `swagger-ui-express` and `swagger-jsdoc`)

---

**Document Version**: 1.0
**Last Updated**: 2025-11-03
**API Version**: v1
