# Contributing to Bahola Commerce

Thank you for your interest in contributing to Bahola Commerce! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or pnpm package manager
- Git
- A Swell store account (for testing)

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/bahola-commerce.git
   cd bahola-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Generate GraphQL types**
   ```bash
   npm run codegen
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Creating a Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Making Changes
1. Make your changes
2. Write tests if applicable
3. Run linting: `npm run lint`
4. Run tests: `npm run test`
5. Build to check for errors: `npm run build`

### Committing Changes
```bash
git add .
git commit -m "feat: add new payment method"
```

**Commit Message Format:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Pushing Changes
```bash
git push origin feature/your-feature-name
```

### Creating a Pull Request
1. Go to GitHub and create a Pull Request
2. Fill in the PR template
3. Add reviewers
4. Link related issues
5. Wait for review and approval

## 📋 Code Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use strict type checking

### React/Next.js
- Use functional components with hooks
- Prefer Server Components when possible
- Use proper error boundaries
- Implement proper loading states

### Styling
- Use Tailwind CSS for styling
- Follow mobile-first approach
- Use consistent spacing and colors
- Ensure accessibility compliance

### File Organization
```
components/
├── feature-name/
│   ├── index.tsx          # Main component
│   ├── types.ts           # TypeScript types
│   ├── styles.module.css  # Component-specific styles
│   └── __tests__/         # Test files
```

## 🧪 Testing

### Running Tests
```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### Writing Tests
- Write unit tests for utility functions
- Write integration tests for API routes
- Write component tests for React components
- Aim for >80% code coverage

### Test Structure
```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });
  
  it('should handle user interactions', () => {
    // Test implementation
  });
});
```

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Try the latest version
3. Reproduce the bug
4. Check browser console for errors

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]

**Additional Context**
Any other context about the problem.
```

## 💡 Feature Requests

### Before Requesting
1. Check existing feature requests
2. Consider if it fits the project scope
3. Think about implementation complexity

### Feature Request Template
```markdown
**Feature Description**
A clear description of the feature.

**Use Case**
Why is this feature needed?

**Proposed Solution**
How would you like it to work?

**Alternatives**
Any alternative solutions considered?

**Additional Context**
Any other context or screenshots.
```

## 🔍 Code Review Process

### For Contributors
- Address all review comments
- Keep PRs focused and small
- Write clear commit messages
- Test your changes thoroughly

### For Reviewers
- Be constructive and helpful
- Check for security issues
- Verify functionality works
- Ensure code follows standards

## 🚫 What Not to Contribute

- Code that breaks existing functionality
- Features that don't align with project goals
- Code without proper tests
- Changes that reduce accessibility
- Code that introduces security vulnerabilities

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Swell Documentation](https://developers.swell.is/)

### Tools
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Jest](https://jestjs.io/) - Testing framework
- [Testing Library](https://testing-library.com/) - React testing

## 🤝 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and general discussion
- **Email** - support@baholalabs.com for urgent issues

## 📄 License

By contributing to Bahola Commerce, you agree that your contributions will be licensed under the same license as the project.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Bahola Commerce! 🎉
