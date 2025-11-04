# Book Details Page - Testing Guide

## Prerequisites

1. Backend server running: `cd backend && npm run dev`
2. Frontend server running: `cd client && npm run dev`
3. Database with sample data (books, users)
4. At least one user account for authentication

---

## Backend API Testing

### Using Thunder Client / Postman

#### 1. Test GET /api/v1/books/:id

**Request:**
```
GET http://localhost:5000/api/v1/books/1
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "price": "19.99",
    "category": "Fiction",
    "description": "Book description...",
    "image_url": "https://...",
    "stock": 25,
    "averageRating": 4.5,
    "reviewCount": 10,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

#### 2. Test GET /api/v1/books/:id/related

**Request:**
```
GET http://localhost:5000/api/v1/books/1/related?limit=6
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "books": [...],
    "count": 6
  }
}
```

#### 3. Test GET /api/v1/reviews

**Request:**
```
GET http://localhost:5000/api/v1/reviews?bookId=1&page=1&limit=10&sortBy=recent
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "reviews": [...],
    "pagination": {...},
    "summary": {
      "averageRating": 4.5,
      "totalReviews": 10,
      "ratingDistribution": {
        "5": 5,
        "4": 3,
        "3": 1,
        "2": 1,
        "1": 0
      }
    }
  }
}
```

#### 4. Test POST /api/v1/reviews (Authenticated)

**Request:**
```
POST http://localhost:5000/api/v1/reviews
Content-Type: application/json
Cookie: accessToken=<your-jwt-token>

{
  "bookId": 1,
  "rating": 5,
  "comment": "Excellent book! Highly recommend."
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 11,
    "user_id": 1,
    "book_id": 1,
    "rating": 5,
    "comment": "Excellent book! Highly recommend.",
    "created_at": "2024-11-04T...",
    "user": {
      "id": 1,
      "name": "Test User"
    }
  },
  "message": "Review submitted successfully"
}
```

#### 5. Test PUT /api/v1/reviews/:id (Owner)

**Request:**
```
PUT http://localhost:5000/api/v1/reviews/11
Content-Type: application/json
Cookie: accessToken=<your-jwt-token>

{
  "rating": 4,
  "comment": "Updated: Very good book!"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {...},
  "message": "Review updated successfully"
}
```

#### 6. Test DELETE /api/v1/reviews/:id (Owner/Admin)

**Request:**
```
DELETE http://localhost:5000/api/v1/reviews/11
Cookie: accessToken=<your-jwt-token>
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## Frontend Testing

### 1. Book Details Page Load

**Steps:**
1. Navigate to `http://localhost:5173/books/1`
2. Verify:
   - ✅ Breadcrumbs display correctly
   - ✅ Book image loads (or placeholder shows)
   - ✅ Book title, author, price display
   - ✅ Stock badge shows correct status
   - ✅ Rating stars and count display
   - ✅ Category badge shows
   - ✅ Description displays
   - ✅ Related books section appears (if applicable)

### 2. Add to Cart Functionality

**Steps:**
1. On book details page
2. Change quantity using +/- buttons
3. Click "Add to Cart"
4. Verify:
   - ✅ Success message appears
   - ✅ Cart icon in navbar updates count
   - ✅ Cart icon shows bounce animation (if implemented)
   - ✅ Button shows "Adding..." during request
   - ✅ Quantity resets to 1 after adding

### 3. Review Display

**Steps:**
1. Scroll to reviews section
2. Verify:
   - ✅ Average rating displays correctly
   - ✅ Rating distribution shows bars with percentages
   - ✅ Individual reviews display with:
     - User name
     - Star rating
     - Date (relative format)
     - Comment text
     - "Verified Purchase" badge (if applicable)

### 4. Review Filtering & Sorting

**Steps:**
1. Click on a rating in distribution (e.g., "5 stars")
2. Verify:
   - ✅ Only 5-star reviews show
   - ✅ Filter highlights/activates
3. Change sort order to "Highest Rated"
4. Verify:
   - ✅ Reviews re-order correctly

### 5. Write Review (Unauthenticated)

**Steps:**
1. **Not logged in**: Click "Write a Review"
2. Verify:
   - ✅ Redirects to login page
   - ✅ URL includes redirect parameter

### 6. Write Review (Authenticated)

**Steps:**
1. Log in first
2. Navigate to book details page
3. Click "Write a Review"
4. Verify:
   - ✅ Modal opens
   - ✅ Star selector works (click stars to rate)
   - ✅ Comment textarea accepts input
   - ✅ Character counter updates
5. Try submitting without rating
   - ✅ Shows validation error
6. Select rating (e.g., 5 stars)
7. Type comment (min 10 chars)
8. Click "Submit Review"
9. Verify:
   - ✅ Modal closes
   - ✅ Success message appears
   - ✅ New review appears in list
   - ✅ Button changes to "Edit Your Review"

### 7. Edit Review

**Steps:**
1. As authenticated user with existing review
2. Click "Edit Your Review"
3. Modal opens with pre-filled data
4. Change rating or comment
5. Click "Update Review"
6. Verify:
   - ✅ Modal closes
   - ✅ Review updates in list
   - ✅ Success message appears

### 8. Delete Review

**Steps:**
1. As authenticated user with existing review
2. Find your review (marked "Your Review")
3. Click "Delete" button
4. Verify:
   - ✅ Confirmation dialog appears
   - ✅ Warning message shows
5. Click "Yes, Delete"
6. Verify:
   - ✅ Review disappears from list
   - ✅ Review count decreases
   - ✅ Button changes back to "Write a Review"

### 9. Pagination

**Steps:**
1. On a book with > 10 reviews
2. Verify:
   - ✅ Pagination controls appear
   - ✅ Page numbers show correctly
   - ✅ Ellipsis (...) appears for many pages
3. Click "Next" button
4. Verify:
   - ✅ New reviews load
   - ✅ Page scrolls to top
   - ✅ Current page number highlights
   - ✅ URL updates (optional)

### 10. Related Books

**Steps:**
1. Scroll to "You May Also Like" section
2. Verify:
   - ✅ Shows 4-6 books from same category
   - ✅ Each book card shows:
     - Image (or placeholder)
     - Title
     - Author
     - Rating
     - Price
3. Click on a related book
4. Verify:
   - ✅ Navigates to that book's details page

### 11. Error Handling

**Test 404 - Book Not Found:**
1. Navigate to `http://localhost:5173/books/999999`
2. Verify:
   - ✅ Error page shows "Book Not Found"
   - ✅ "Back to Home" button works

**Test Network Error:**
1. Stop backend server
2. Try to load book details page
3. Verify:
   - ✅ Error message shows
   - ✅ "Try Again" button appears
   - ✅ "Go to Home" button works

**Test Invalid Book ID:**
1. Navigate to `http://localhost:5173/books/abc`
2. Verify:
   - ✅ Appropriate error handling

### 12. Responsive Design

**Mobile (< 640px):**
1. Resize browser to mobile width (or use DevTools)
2. Verify:
   - ✅ Single column layout
   - ✅ Image stacks above info
   - ✅ Add to cart button full width
   - ✅ Reviews stack vertically
   - ✅ Related books scroll horizontally (or stack)

**Tablet (640-1024px):**
1. Resize to tablet width
2. Verify:
   - ✅ Two-column layout for book info
   - ✅ Appropriate spacing
   - ✅ Reviews display well

**Desktop (>= 1024px):**
1. Resize to desktop width
2. Verify:
   - ✅ Full grid layout
   - ✅ Related books in grid (not carousel)
   - ✅ All content fits well

### 13. Loading States

**Steps:**
1. Navigate to book details (throttle network if fast)
2. Verify:
   - ✅ Skeleton loader appears during load
   - ✅ Skeleton matches final layout
   - ✅ No layout shift when content loads

---

## Integration Tests

### Full User Flow - Browse to Purchase

**Steps:**
1. Start at home page
2. Click on a book card → navigates to details
3. Read book info and reviews
4. Click filter "5 stars" → reviews filter
5. Change sort to "Most Recent"
6. Click "Write a Review" (if logged in)
7. Submit review → success
8. Change quantity to 2
9. Click "Add to Cart" → success
10. Click cart icon → navigate to cart
11. Verify item in cart with quantity 2

### Full User Flow - Unauthenticated to Authenticated

**Steps:**
1. Visit book details page (not logged in)
2. Click "Write a Review" → redirects to login
3. Log in → redirects back to book page
4. Write and submit review → success
5. Verify review appears

---

## Performance Testing

### Lighthouse Audit

**Steps:**
1. Open Chrome DevTools
2. Run Lighthouse audit on book details page
3. Verify scores:
   - Performance: > 80
   - Accessibility: > 90
   - Best Practices: > 80
   - SEO: > 80

### Network Analysis

**Steps:**
1. Open Network tab
2. Load book details page
3. Verify:
   - ✅ Total requests < 20
   - ✅ Total size < 2MB
   - ✅ LCP < 2.5s
   - ✅ FCP < 1.5s

---

## Security Testing

### Authentication Checks

**Test 1: Review without login**
```bash
curl -X POST http://localhost:5000/api/v1/reviews \
  -H "Content-Type: application/json" \
  -d '{"bookId": 1, "rating": 5, "comment": "Test"}'
```
**Expected**: 401 Unauthorized

**Test 2: Edit another user's review**
- Log in as User A
- Try to update User B's review
**Expected**: 403 Forbidden

**Test 3: XSS Prevention**
- Submit review with: `<script>alert('XSS')</script>`
**Expected**: Text displayed, not executed

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Checklist Summary

### Backend ✅
- [ ] All endpoints return correct data
- [ ] Authentication works correctly
- [ ] Authorization prevents unauthorized actions
- [ ] Validation rejects invalid inputs
- [ ] Error responses are user-friendly

### Frontend ✅
- [ ] Page loads without errors
- [ ] All components render correctly
- [ ] Add to cart works
- [ ] Reviews display and paginate
- [ ] Review form validates and submits
- [ ] Edit/delete review works
- [ ] Related books display
- [ ] Responsive on all devices
- [ ] Loading states show
- [ ] Error states handle gracefully

### Integration ✅
- [ ] Full user flows work end-to-end
- [ ] Authentication flow works
- [ ] Cart integration works
- [ ] Data updates in real-time

### Performance ✅
- [ ] Page loads in < 2.5s
- [ ] No layout shifts
- [ ] Images load efficiently
- [ ] API calls are optimized

---

**Status**: Ready for QA Testing
**Last Updated**: 2025-11-04
