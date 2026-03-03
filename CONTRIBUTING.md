# Contributing to ConnectoFarmo Frontend

Thank you for your interest in contributing to ConnectoFarmo! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Code Review](#code-review)

---

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome different perspectives
- Be patient with new contributors
- Report inappropriate behavior to maintainers

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/connectoFarmoFrontend.git
cd connectoFarmoFrontend
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/connectoFarmoFrontend.git
```

### 4. Follow Setup Guide

Follow the instructions in [SETUP.md](SETUP.md) to get the project running locally.

---

## 💻 Development Process

### Create a Feature Branch

Always create a new branch for your work (never commit directly to `main`):

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**

- `feature/description` - For new features
- `bugfix/description` - For bug fixes
- `docs/description` - For documentation changes
- `refactor/description` - For code refactoring
- `test/description` - For test additions

### Make Changes

1. Edit files as needed
2. Keep changes focused on one feature/fix
3. Test your changes thoroughly
4. Follow [Coding Standards](#coding-standards)

### Commit Frequently

Commit often with clear messages:

```bash
git add .
git commit -m "Brief description of changes"
```

Never use generic commit messages like "Fix bugs" or "Update files".

### Push to Your Fork

```bash
git push origin feature/your-feature-name
```

---

## 📐 Coding Standards

### TypeScript/React Guidelines

**File Naming:**

- Components: PascalCase (`MyComponent.tsx`)
- Utilities: camelCase (`helperFunction.ts`)
- Styles: Match component name (`MyComponent.css`)

**Component Structure:**

```tsx
import { useState, useEffect } from "react";
import type { ComponentProps } from "@/types";
import "./MyComponent.css";

interface MyComponentProps {
  title: string;
  onAction?: (value: string) => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState("");

  useEffect(() => {
    // Side effects here
  }, []);

  const handleAction = () => {
    onAction?.(state);
  };

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <button onClick={handleAction}>Action</button>
    </div>
  );
}
```

**Key Principles:**

- Use functional components with hooks
- Define props interface for each component
- Add JSDoc comments for complex logic
- Use TypeScript - avoid `any` type
- Keep components focused and reusable

### CSS Guidelines

```css
/* Use meaningful class names */
.component-name {
  display: flex;
  align-items: center;
}

.component-name__section {
  margin-top: 1rem;
}

.component-name--active {
  background-color: var(--primary);
}
```

**Naming Convention:** BEM (Block Element Modifier)

- Block: `.component-name`
- Element: `.component-name__element`
- Modifier: `.component-name--modifier`

### Code Quality

Before committing, ensure:

```bash
# Check for linting issues
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Verify TypeScript types
npm run build

# Check for console.log (remove before committing)
grep -r "console.log" src/
```

### Comments & Documentation

Add comments for **why**, not **what**:

```tsx
// ✅ Good - explains the reason
// Use state instead of ref because we need re-renders
const [isOpen, setIsOpen] = useState(false);

// ❌ Bad - just restates the code
// Set isOpen to false
setIsOpen(false);
```

Add JSDoc for functions:

```tsx
/**
 * Formats a date to a readable string
 * @param date - The date to format
 * @param locale - Optional locale for formatting
 * @returns Formatted date string
 */
function formatDate(date: Date, locale: string = "en-US"): string {
  return date.toLocaleDateString(locale);
}
```

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Example:**

```
feat(postService): add image upload functionality

- Implement base64 encoding for image preview
- Add image size validation (max 5MB)
- Update PostDto to accept image field

Closes #123
```

### Type

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, semicolons)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build, dependencies, or tooling changes

### Scope

The area of the codebase affected (optional):

- `authService`
- `components`
- `types`
- `routing`

### Subject

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at end
- Maximum 50 characters

### Body

- Explain **why** the change was made
- List any specific implementation details
- Reference related issues

### Footer

Link to related GitHub issues:

```
Closes #123
Relates to #456
```

---

## 🔄 Pull Request Process

### Before Creating PR

1. Sync with latest main branch:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Resolve any conflicts
3. Run tests and linting:
   ```bash
   npm run lint
   npm run build
   ```

### Create Pull Request

1. Push your branch to your fork
2. Go to GitHub and click "Create Pull Request"
3. Fill in the PR template (if provided)
4. Add descriptive title and description

### PR Description Template

```markdown
## Description

Brief description of what this PR does

## Type of Change

- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update

## Related Issues

Closes #123
Relates to #456

## Testing

Describe how you tested these changes:

- [ ] Unit tests
- [ ] Manual testing
- [ ] Browser tested (Chrome, Firefox, Safari)

## Screenshots (if applicable)

[Add screenshots for UI changes]

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No breaking changes (unless intentional)
- [ ] Tests pass locally
- [ ] Linting passes
```

### PR Review

Maintainers will review your PR and may request changes. Respond to feedback:

```bash
# Make requested changes
git add .
git commit -m "Address review feedback"
git push origin feature/your-feature-name

# No need to create new PR - existing one updates automatically
```

### Merge

Once approved:

- A maintainer will merge your PR
- Your branch can be safely deleted:
  ```bash
  git branch -d feature/your-feature-name
  ```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- MyComponent.test.tsx

# Watch mode (re-run on changes)
npm run test -- --watch
```

### Writing Tests

Create a `.test.tsx` file next to your component:

```tsx
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders with title prop", () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("calls onAction when button clicked", () => {
    const onAction = jest.fn();
    render(<MyComponent title="Test" onAction={onAction} />);

    screen.getByRole("button").click();
    expect(onAction).toHaveBeenCalled();
  });
});
```

### Test Coverage

Aim for:

- Core logic: 80%+ coverage
- UI components: 60%+ coverage
- Utilities: 90%+ coverage

---

## 👀 Code Review

### For Contributors

**During review:**

- Respond to feedback promptly
- Ask for clarification if needed
- Don't take criticism personally
- Focus on improvement

**Common feedback:**

- Type safety issues
- Performance concerns
- Missing error handling
- Documentation gaps
- Test coverage

### For Reviewers

**When reviewing:**

- Be constructive and respectful
- Explain **why** something should change
- Suggest improvements, don't demand
- Approve when standards are met

**Check for:**

- Code quality and standards compliance
- Proper error handling
- Type safety
- Performance implications
- Documentation completeness
- Test coverage

---

## 🚫 Things to Avoid

- ❌ Committing `console.log()` statements
- ❌ Using `any` type in TypeScript
- ❌ Hardcoded values that should be constants
- ❌ Large files (split into smaller components)
- ❌ Leaving commented-out code
- ❌ Making multiple unrelated changes in one PR
- ❌ Skipping tests
- ❌ Directly pushing to `main` branch

---

## ✅ Best Practices

- ✅ Write small, focused commits
- ✅ Keep PRs focused on single feature/fix
- ✅ Test thoroughly before submitting
- ✅ Add meaningful commit messages
- ✅ Request review from relevant maintainers
- ✅ Respond to feedback in timely manner
- ✅ Keep code DRY (Don't Repeat Yourself)
- ✅ Document complex logic

---

## 📚 Resources

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Git Documentation](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [BEM CSS Methodology](https://getbem.com/)

---

## 🤔 Questions?

- **Setup Issues?** Check [SETUP.md](SETUP.md)
- **General Info?** Read [README.md](README.md)
- **Specific Help?** Create an issue with details
- **Security Issues?** Email security@connectofarmo.com (don't create public issue)

---

## 🎉 Thank You!

Your contributions are appreciated and help make ConnectoFarmo better for everyone!

Happy coding! 🚀
