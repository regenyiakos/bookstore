# Development Guidelines

## Core Principles

### 1. **Commit Early, Commit Often**
- Commit working code immediately after getting it to work
- Don't let working features sit uncommitted
- Each commit should be a working state you can return to

```bash
# Good practice
git add .
git commit -m "feat: working authentication system"
git push

# Do this BEFORE starting new features
```

### 2. **Test Everything After Every Change**
Before committing ANY code, manually verify:

**Regression Testing Checklist:**
```
□ Home page loads
□ Books listing page works
□ Book details page works (if implemented)
□ Login form works
□ Register form works
□ Navigation works between all pages
□ No console errors
□ No backend errors
```

**Pro Tip:** Keep this checklist open in a browser tab and check it after EVERY change.

### 3. **Feature Isolation**
When implementing a new feature:

**DO:**
- Create files in a dedicated feature folder
- Add new API endpoints without modifying existing ones
- Create new components in isolated directories
- Make changes incremental and testable

**DON'T:**
- Modify shared components unless absolutely necessary
- Change API clients that other features depend on
- Refactor existing working code "while you're at it"
- Update dependencies without documenting why

## Git Workflow

### Feature Development Flow

```bash
# 1. Start from a clean, working state
git checkout development
git pull origin development

# 2. Create feature branch
git checkout -b feature/my-new-feature

# 3. Make ONE small change
# ... edit files ...

# 4. Test EVERYTHING (use checklist above)
npm run dev  # Verify app still works

# 5. Commit with descriptive message
git add specific-files  # Don't use git add . blindly
git commit -m "feat: add user profile component"

# 6. Repeat steps 3-5 for each logical piece

# 7. When feature is complete, push
git push origin feature/my-new-feature

# 8. Create Pull Request on GitHub
# 9. After review and approval, merge to development
```

### Commit Message Convention

```
feat: add new feature
fix: fix bug in existing feature
refactor: refactor code without changing behavior
docs: update documentation
style: formatting, missing semicolons, etc.
test: add tests
chore: update dependencies, config, etc.
```

## Working with AI Agents

### When Launching Agents

**Always provide clear boundaries:**

```markdown
Implement [feature name].

ALLOWED TO MODIFY:
- Create new files in [specific directory]
- Add new route in AppRoutes.jsx
- Create new API endpoint in [specific file]

DO NOT MODIFY:
- Any auth-related files
- Login/Register pages
- Existing components outside [feature] folder
- package.json without asking first
- Shared utilities or helpers

TESTING REQUIREMENT:
After implementation:
1. Test the new feature works
2. Test ALL existing pages still work
3. Check for console errors
4. Report ALL files you created/modified
```

### Agent Safety Checklist

Before accepting agent output:

```
□ Review list of ALL files changed
□ Check for unexpected modifications
□ Verify no existing features were broken
□ Ensure only feature-specific files were touched
□ Test the application end-to-end
```

### Agent Red Flags

⚠️ **Be cautious if agent:**
- Modified files outside feature scope
- Changed package.json without explicit permission
- Refactored existing working code
- Modified shared utilities
- Changed API client functions used by other features
- Updated configuration files

## File Organization

### Creating New Features

```
client/src/pages/[FeatureName]/
  ├── index.jsx                 # Main page component
  ├── components/               # Feature-specific components
  │   ├── ComponentA.jsx
  │   └── ComponentB.jsx
  ├── hooks/                    # Feature-specific hooks
  │   ├── useFeatureData.js
  │   └── useFeatureActions.js
  └── utils/                    # Feature-specific utilities
      └── helpers.js
```

### Shared Code

**Only create shared code when:**
- The component is used by 3+ features
- The utility is truly generic
- You've verified it won't break existing features

**Location for shared code:**
```
client/src/
  ├── components/shared/        # Truly shared components
  ├── hooks/shared/            # Truly shared hooks
  └── utils/                   # Truly shared utilities
```

## Preventing Breaking Changes

### Before Modifying Shared Files

1. **Search for usage:**
   ```bash
   # Find where this file is imported
   grep -r "import.*from.*filename" client/src
   ```

2. **Check git history:**
   ```bash
   # See who else modified this file
   git log --oneline filename
   ```

3. **Ask yourself:**
   - Is this change necessary?
   - Can I achieve my goal without modifying this?
   - Will this break any existing features?

### Safe Modification Strategy

If you MUST modify shared code:

1. **Create a new version first:**
   ```javascript
   // Instead of modifying validateEmail()
   // Create validateEmailV2() or validateEmailStrict()
   ```

2. **Update your feature to use new version**

3. **Test everything thoroughly**

4. **Document the change**

5. **Only then consider migrating other features**

## Backup Strategies

### Before Starting Risky Work

```bash
# Option 1: Create a backup branch
git checkout -b backup/before-book-details
git push origin backup/before-book-details

# Option 2: Use git stash
git stash push -m "Working state before book details"

# Option 3: Simple commit
git commit -m "checkpoint: all features working"
```

### Recovery if Something Breaks

```bash
# See recent commits
git log --oneline -10

# Go back one commit
git reset --hard HEAD~1

# Go back to specific commit
git reset --hard abc1234

# Restore specific file from previous commit
git checkout HEAD~1 -- path/to/file.js
```

## Testing Best Practices

### Manual Testing Workflow

1. **Start servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd client && npm run dev
   ```

2. **Open checklist** (see TESTING_CHECKLIST.md)

3. **Test each item methodically**

4. **Document any issues found**

5. **Fix issues before committing**

### Automated Testing (Future)

```bash
# Run all tests before committing
npm test

# Run tests in watch mode during development
npm test -- --watch
```

## Code Review Checklist

Before submitting PR:

```
□ All regression tests pass
□ New feature works as expected
□ Code is clean and readable
□ No console.logs left in code
□ No commented-out code
□ Error handling is present
□ Loading states implemented
□ User feedback messages are clear
□ No hardcoded values (use env variables)
□ Documentation updated if needed
```

## Common Pitfalls to Avoid

### ❌ Don't Do This:

1. **Batch commits**
   ```bash
   # Bad: Multiple features in one commit
   git add .
   git commit -m "Added everything"
   ```

2. **Modify everything**
   ```
   Modified: 45 files
   (When you only needed to change 5)
   ```

3. **Skip testing**
   ```
   "It works on my machine, ship it!"
   ```

4. **Trust agent output blindly**
   ```
   "Agent said it's done, I'll commit without checking"
   ```

### ✅ Do This Instead:

1. **Incremental commits**
   ```bash
   git add client/src/pages/Profile
   git commit -m "feat: add profile page layout"

   git add client/src/api/profile.js
   git commit -m "feat: add profile API client"
   ```

2. **Minimal changes**
   ```
   Modified: 5 files
   (Only the files needed for this feature)
   ```

3. **Always test**
   ```
   Use the regression testing checklist
   Test on both dev server and production build
   ```

4. **Review agent changes**
   ```bash
   git diff
   # Review every changed file
   # Understand why each change was made
   ```

## Emergency Procedures

### If Everything Broke

1. **Don't Panic**

2. **Check what changed:**
   ```bash
   git status
   git diff
   ```

3. **Identify the breaking commit:**
   ```bash
   git log --oneline -10
   ```

4. **Revert or reset:**
   ```bash
   # Revert last commit (keeps history)
   git revert HEAD

   # Or reset to previous commit (rewrites history)
   git reset --hard HEAD~1
   ```

5. **Restore from backup:**
   ```bash
   # If you created backup branch
   git checkout backup/working-state
   git checkout -b feature/try-again
   ```

6. **Start over with smaller steps**

## Questions to Ask Before Committing

1. ✅ Did I test the new feature?
2. ✅ Did I test all existing features?
3. ✅ Are there any console errors?
4. ✅ Did I only modify files I intended to?
5. ✅ Can I explain every file I changed?
6. ✅ Did I document breaking changes?
7. ✅ Is my commit message clear?
8. ✅ Would I be able to revert this safely?

If you answered "No" to any question, **DON'T COMMIT YET**.

---

## Remember

> "Commit working code before breaking it."

> "Test everything after every change."

> "Small, incremental commits are better than big bang deployments."

> "If you can't explain what a file does, don't modify it."
