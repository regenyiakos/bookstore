# Testing Checklist

Use this checklist **AFTER EVERY CODE CHANGE** before committing.

## Quick Test (5 minutes)

Run this after small changes:

```
□ No console errors in browser
□ No backend errors in terminal
□ Page I worked on still loads
□ Basic navigation works
```

## Full Regression Test (15 minutes)

Run this before committing ANY feature:

### 1. Home Page
```
□ Page loads without errors
□ Hero section displays correctly
□ Featured books show up
□ Categories display properly
□ Images load correctly
□ All links work
```

### 2. Books Listing Page
```
□ Page loads with books grid
□ Search bar works
□ Category filter works
□ Price filter works
□ Sort dropdown works
□ Pagination works (if more than 12 books)
□ Book cards display correctly
□ "Add to Cart" button shows on hover
□ Click on book navigates to details page
```

### 3. Book Details Page (if implemented)
```
□ Page loads when clicking a book
□ Book information displays correctly
□ Images load
□ Price and stock info correct
□ Reviews section loads
□ Related books show up
□ Add to cart works
□ Breadcrumb navigation works
```

### 4. Authentication
```
□ Navigate to /login - page loads
□ Can see email and password fields
□ Can see "Remember me" checkbox
□ Can see "Sign up" link
□ Can submit login form
□ Successful login redirects to home
□ Invalid credentials show error message
□ Error message is clear and user-friendly
```

```
□ Navigate to /register - page loads
□ Can see all form fields (name, email, password, confirm)
□ Password strength indicator works
□ Password match validation works
□ Terms checkbox is required
□ Can submit registration form
□ Successful registration creates account and redirects
□ Duplicate email shows error
□ Validation errors display correctly
```

```
□ After login, user state persists
□ Navbar shows user name/avatar
□ Can navigate while logged in
□ Logout button works
□ After logout, redirected to login
□ Protected routes require login
```

### 5. Navigation
```
□ Click logo → goes to home
□ Click "Books" in navbar → goes to books page
□ Click "Categories" dropdown → shows categories
□ Click a category → filters books by category
□ Click "Login" → goes to login page
□ Click "Register" → goes to register page
□ Browser back button works
□ Browser forward button works
□ URL changes reflect page changes
```

### 6. Console & Network
```
□ Open browser DevTools (F12)
□ Check Console tab - NO red errors
□ Check Network tab - all requests succeed (200/304)
□ No 404 errors for assets
□ No CORS errors
□ API responses have correct data
```

### 7. Backend
```
□ Check terminal running backend
□ No error messages in red
□ API endpoints respond successfully
□ Database queries execute without errors
```

### 8. Mobile Responsiveness (Quick Check)
```
□ Resize browser to mobile width (375px)
□ Pages still look good
□ Navigation menu works on mobile
□ Forms are usable on mobile
□ No horizontal scrolling
```

## Deep Test (30 minutes)

Run this before major releases or merging to main:

### Edge Cases
```
□ Test with empty database
□ Test with large datasets (100+ books)
□ Test with very long text inputs
□ Test with special characters in inputs
□ Test with slow network (DevTools → Network → Slow 3G)
□ Test with disabled JavaScript (should show error)
```

### Security
```
□ Cannot access admin routes without admin role
□ Cannot access /profile without login
□ Cannot submit forms with invalid data
□ Passwords are hidden in forms
□ No sensitive data in console logs
□ No tokens visible in localStorage (should be in cookies)
```

### Performance
```
□ Pages load in < 2 seconds
□ Images are optimized
□ No layout shift when loading
□ Smooth scrolling
□ No janky animations
```

### Browser Compatibility
```
□ Works in Chrome
□ Works in Firefox
□ Works in Edge
□ Works in Safari (if available)
```

## Testing After Agent Work

**CRITICAL:** After an AI agent implements a feature, run this extended checklist:

### File Review
```
□ Review ALL files the agent created/modified
□ Understand WHY each file was changed
□ Verify no unexpected files were modified
□ Check package.json for unwanted dependencies
□ Review config files (vite.config, etc.)
```

### Scope Verification
```
□ Agent only modified files in the feature scope
□ No existing components were changed (unless planned)
□ No existing APIs were modified (unless planned)
□ No shared utilities were changed (unless planned)
□ Verify the agent didn't "improve" unrelated code
```

### Integration Testing
```
□ New feature works with existing features
□ No naming conflicts
□ No duplicate components created
□ API endpoints don't conflict
□ Routes don't conflict
```

## Failed Test - What to Do

If ANY test fails:

1. **STOP** - Don't commit
2. **Document** - Write down what failed
3. **Fix** - Fix the issue
4. **Re-test** - Run the checklist again from the start
5. **Verify** - Make sure the fix didn't break something else

## Passed All Tests

If everything passes:

```bash
# Review your changes
git status
git diff

# Stage only the files you intended to change
git add [specific-files]

# Commit with clear message
git commit -m "feat: descriptive message"

# Push to GitHub
git push origin your-branch-name
```

## Quick Command Reference

```bash
# Start servers for testing
cd backend && npm run dev  # Terminal 1
cd client && npm run dev   # Terminal 2

# Check for errors
npm run lint               # Check code style
npm run test              # Run tests (if available)

# Build for production
npm run build             # Check for build errors
```

## Automation (Future)

Once we set up automated tests:

```bash
# Run before every commit
npm run test:all

# This will automatically:
# - Run unit tests
# - Run integration tests
# - Run linting
# - Check for type errors
```

## Remember

✅ **Better to spend 15 minutes testing than 2 hours debugging later.**

✅ **If you skip testing, you WILL break something.**

✅ **When in doubt, test it out.**

---

## Testing Log Template

Keep a testing log for major features:

```markdown
## Feature: [Name]
Date: [Date]
Tester: [Your name]

### Tests Performed
- [ ] Test 1
- [ ] Test 2

### Issues Found
1. Issue description
   - Severity: Low/Medium/High
   - Fix: How it was fixed

### Sign-off
All tests passed: Yes/No
Ready to merge: Yes/No
```
