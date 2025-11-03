# Git Workflow - BookStore Project

## 📋 Branch Strategy

This project follows a **Git Flow** workflow model for organized and scalable development.

---

## 🌳 Branch Structure

### Main Branches

#### `main` (Production)
- **Purpose**: Production-ready code only
- **Protection**: Protected branch, requires review
- **Updates**: Only via release merges from `development`
- **Never**: Direct commits or feature development

#### `development` (Integration)
- **Purpose**: Integration branch for all features
- **Protection**: Protected, requires review for merges
- **Updates**: Via feature branch merges
- **Testing**: Continuous testing happens here
- **Never**: Direct feature development

### Supporting Branches

#### `feature/*` (Feature Development)
- **Purpose**: New feature development
- **Naming**: `feature/feature-name`
- **Base**: Created from `development`
- **Merge to**: `development` (via Pull Request)
- **Lifetime**: Temporary, deleted after merge

#### `bugfix/*` (Bug Fixes)
- **Purpose**: Non-critical bug fixes
- **Naming**: `bugfix/bug-description`
- **Base**: Created from `development`
- **Merge to**: `development` (via Pull Request)
- **Lifetime**: Temporary, deleted after merge

#### `hotfix/*` (Critical Production Fixes)
- **Purpose**: Critical production bug fixes
- **Naming**: `hotfix/critical-bug-description`
- **Base**: Created from `main`
- **Merge to**: Both `main` AND `development`
- **Lifetime**: Temporary, deleted after merge

#### `release/*` (Release Preparation)
- **Purpose**: Prepare new production release
- **Naming**: `release/v1.0.0`
- **Base**: Created from `development`
- **Merge to**: `main` (then tag) AND back to `development`
- **Lifetime**: Temporary, deleted after merge

---

## 🔄 Workflow Processes

### 1. Starting a New Feature

```bash
# 1. Ensure you're on latest development
git checkout development
git pull origin development

# 2. Create feature branch
git checkout -b feature/user-authentication

# 3. Develop your feature
# ... make changes ...
git add .
git commit -m "feat: implement user login"

# 4. Push to remote
git push -u origin feature/user-authentication

# 5. Create Pull Request to development
# (via GitHub UI)
```

### 2. Completing a Feature

```bash
# 1. Update your feature branch with latest development
git checkout development
git pull origin development
git checkout feature/user-authentication
git merge development
# Resolve any conflicts

# 2. Push updated branch
git push origin feature/user-authentication

# 3. Create Pull Request on GitHub
# - Base: development
# - Compare: feature/user-authentication
# - Request review
# - Ensure CI passes

# 4. After approval, merge via GitHub
# (Use "Squash and merge" or "Merge commit")

# 5. Delete feature branch
git checkout development
git pull origin development
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

### 3. Creating a Release

```bash
# 1. Create release branch from development
git checkout development
git pull origin development
git checkout -b release/v1.0.0

# 2. Update version numbers
# - package.json versions
# - Update CHANGELOG.md
git add .
git commit -m "chore: bump version to 1.0.0"

# 3. Push release branch
git push -u origin release/v1.0.0

# 4. Final testing on release branch
# ... run tests, fix minor issues ...

# 5. Merge to main
git checkout main
git pull origin main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# 6. Merge back to development
git checkout development
git pull origin development
git merge release/v1.0.0
git push origin development

# 7. Delete release branch
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

### 4. Hotfix for Production

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. Fix the critical issue
# ... make fixes ...
git add .
git commit -m "fix: patch critical security vulnerability"

# 3. Merge to main
git checkout main
git merge hotfix/critical-security-fix
git tag -a v1.0.1 -m "Hotfix: critical security patch"
git push origin main --tags

# 4. Merge to development
git checkout development
git merge hotfix/critical-security-fix
git push origin development

# 5. Delete hotfix branch
git branch -d hotfix/critical-security-fix
git push origin --delete hotfix/critical-security-fix
```

---

## 📝 Commit Message Guidelines

Follow **Conventional Commits** specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, tools
- **perf**: Performance improvements
- **ci**: CI/CD changes

### Examples
```bash
feat(auth): add user login with JWT

Implement user authentication using JWT tokens stored in HttpOnly cookies.
Includes login endpoint, token validation middleware, and refresh token logic.

Closes #123
```

```bash
fix(cart): prevent duplicate items in shopping cart

Fixed a race condition where rapid clicks could add the same item multiple times.

Fixes #456
```

```bash
docs: update API reference with new endpoints

Added documentation for authentication endpoints and updated request/response examples.
```

---

## 🔒 Branch Protection Rules

### `main` Branch
- ✅ Require pull request reviews (1+ approvals)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Require linear history
- ❌ Allow force pushes
- ❌ Allow deletions

### `development` Branch
- ✅ Require pull request reviews (1+ approvals)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ❌ Allow force pushes
- ❌ Allow deletions

### Feature/Bugfix/Hotfix Branches
- No protection rules
- Can be force-pushed during development
- Should be deleted after merge

---

## 🎯 Pull Request Guidelines

### Creating a Pull Request

1. **Title**: Clear, descriptive title
   - Good: `feat: implement user profile page`
   - Bad: `updates`

2. **Description**: Include:
   - What changed and why
   - How to test the changes
   - Screenshots (if UI changes)
   - Related issues (Closes #123)

3. **Checklist**:
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] Tests added/updated
   - [ ] All tests pass locally
   - [ ] No console errors or warnings

### Reviewing a Pull Request

1. **Check**:
   - Code quality and style
   - Logic correctness
   - Test coverage
   - Performance implications
   - Security concerns

2. **Feedback**:
   - Be constructive and respectful
   - Explain reasoning
   - Suggest alternatives
   - Approve only when satisfied

3. **Testing**:
   - Pull branch locally
   - Test functionality
   - Check edge cases

---

## 🚀 Release Checklist

### Before Release

- [ ] All features merged to `development`
- [ ] All tests passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version numbers bumped
- [ ] Database migrations tested
- [ ] Performance testing completed
- [ ] Security audit passed

### During Release

- [ ] Create release branch
- [ ] Final testing on release branch
- [ ] Fix any critical issues
- [ ] Update version in all package.json files
- [ ] Merge to `main`
- [ ] Tag release with version number
- [ ] Deploy to production
- [ ] Merge back to `development`

### After Release

- [ ] Monitor production for issues
- [ ] Update project board
- [ ] Notify team of release
- [ ] Close related issues
- [ ] Delete release branch

---

## 📊 Workflow Diagram

```
main (production)
  ↑
  │ merge on release
  │
  ├─── release/v1.0.0
  │      ↑
  │      │ create from
  │      │
development (integration)
  ↑
  ├─── feature/user-auth ──┐
  ├─── feature/book-list ──┤ merge when complete
  ├─── bugfix/cart-bug ────┘
  │
  └─── hotfix/security-patch (from main)
         ↓
         ├─→ main (critical fixes)
         └─→ development (sync)
```

---

## 🛠️ Common Commands

### Check current branch
```bash
git branch
```

### List all branches (local + remote)
```bash
git branch -a
```

### Switch to existing branch
```bash
git checkout development
```

### Create and switch to new branch
```bash
git checkout -b feature/new-feature
```

### Update branch with remote changes
```bash
git pull origin development
```

### Delete local branch
```bash
git branch -d feature/old-feature
```

### Delete remote branch
```bash
git push origin --delete feature/old-feature
```

### View commit history
```bash
git log --oneline --graph --all
```

### Undo last commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Discard local changes
```bash
git checkout -- filename
```

### Stash changes temporarily
```bash
git stash
git stash pop
```

---

## 🚨 Important Rules

### ❌ NEVER Do This

1. **Direct commits to `main`**
   - Always use pull requests through `development`

2. **Force push to `main` or `development`**
   - Can break team's work and history

3. **Merge without code review**
   - Always require at least one approval

4. **Commit sensitive data**
   - No `.env` files, API keys, passwords, secrets

5. **Large binary files**
   - Use Git LFS for large files

6. **Rewrite public history**
   - Don't rebase after pushing to shared branches

### ✅ ALWAYS Do This

1. **Pull before push**
   - `git pull origin branch-name` before pushing

2. **Small, focused commits**
   - One logical change per commit

3. **Descriptive commit messages**
   - Follow Conventional Commits

4. **Test before committing**
   - Run tests locally first

5. **Resolve conflicts carefully**
   - Test after resolving conflicts

6. **Delete merged branches**
   - Keep repository clean

---

## 📞 Getting Help

### Stuck with Git?

```bash
# View Git command help
git help <command>

# Example
git help merge
git help rebase
```

### Common Issues

**Merge Conflict**
1. Don't panic
2. Open conflicted files
3. Look for `<<<<<<<`, `=======`, `>>>>>>>`
4. Edit to keep correct code
5. Remove conflict markers
6. Test changes
7. `git add .` and `git commit`

**Accidentally committed to wrong branch**
```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Switch to correct branch
git checkout correct-branch

# Re-commit
git commit -m "message"
```

**Need to sync with remote**
```bash
# Get latest changes
git fetch origin

# View differences
git diff development origin/development

# Pull changes
git pull origin development
```

---

## 🎓 Learning Resources

- [Git Flow Cheat Sheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Git Documentation](https://git-scm.com/doc)

---

## 📋 Summary

**Remember the golden rules:**

1. `main` = production, always stable
2. `development` = integration, tested features
3. `feature/*` = new development
4. Always create Pull Requests
5. Always get code review
6. Test before merging
7. Use descriptive commit messages
8. Keep branches short-lived
9. Delete merged branches
10. Communicate with team

---

**Workflow established**: 2025-11-03
**Last updated**: 2025-11-03
**Status**: Active

This workflow will be followed by all contributors, including AI assistants (Claude Code).
