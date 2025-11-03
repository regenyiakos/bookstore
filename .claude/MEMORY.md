# Claude Code Memory - BookStore Project

## 🧠 Important Information to Remember

### Git Workflow Strategy

**ALWAYS follow the Git Flow model documented in `GIT_WORKFLOW.md`**

#### Branch Structure:
1. **`main`** - Production branch
   - Only receives merges from release branches
   - Always stable and deployable
   - Never commit directly to main

2. **`development`** - Integration branch
   - Default working branch
   - All features merge here first
   - Continuous testing happens here
   - Never commit features directly to development

3. **`feature/*`** - Feature development
   - Create from: `development`
   - Merge to: `development` via Pull Request
   - Format: `feature/feature-name`
   - Delete after merge

4. **`bugfix/*`** - Bug fixes
   - Create from: `development`
   - Merge to: `development` via Pull Request
   - Format: `bugfix/bug-description`

5. **`hotfix/*`** - Critical production fixes
   - Create from: `main`
   - Merge to: `main` AND `development`
   - Format: `hotfix/issue-description`

6. **`release/*`** - Release preparation
   - Create from: `development`
   - Merge to: `main` (then tag) AND `development`
   - Format: `release/v1.0.0`

### Feature Development Process:

```bash
# 1. Start new feature (ALWAYS from development)
git checkout development
git pull origin development
git checkout -b feature/feature-name

# 2. Develop and commit
# ... work ...
git add .
git commit -m "feat: description"

# 3. Push and create PR
git push -u origin feature/feature-name
# Create PR to development on GitHub

# 4. After merge, delete branch
git checkout development
git pull origin development
git branch -d feature/feature-name
```

### Commit Message Format:

**Use Conventional Commits:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Build/tools

Example:
```
feat(auth): implement user login

Add JWT authentication with HttpOnly cookies.
Includes token validation middleware.

Closes #123
```

### Important Rules:

❌ **NEVER:**
- Commit directly to `main`
- Commit directly to `development`
- Force push to `main` or `development`
- Commit `.env` files or secrets
- Merge without code review

✅ **ALWAYS:**
- Create feature branches from `development`
- Use Pull Requests for merging
- Follow commit message conventions
- Test before committing
- Delete branches after merge
- Pull before push

### Current Branch State:

- **main**: Production-ready code with workflow documentation
- **development**: Active development branch (current default)

### Project Context:

- **Name**: BookStore
- **Type**: Full-stack web application
- **Frontend**: React 19 + Vite + Redux Toolkit + TanStack Query + Tailwind CSS
- **Backend**: Express.js + Sequelize + PostgreSQL
- **Database**: PostgreSQL 16 (Docker)
- **Status**: Foundation complete, ready for feature development

### Repository:
- **URL**: https://github.com/regenyiakos/bookstore.git
- **Default branch**: `development` (for new work)
- **Protected branches**: `main`, `development`

---

**Last Updated**: 2025-11-03
**Memory Status**: Active - Follow this workflow for all future work
