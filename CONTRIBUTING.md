# Contributing to Renewable Energy Dashboard

Thank you for your interest in contributing to the Renewable Energy Dashboard! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- A NREL API key (for testing API integrations)
- Basic knowledge of React and TypeScript

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/renewable-energy-dashboard.git
   cd renewable-energy-dashboard
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🎯 How to Contribute

### Reporting Bugs
- **Search existing issues** first to avoid duplicates
- **Use the bug report template** when creating new issues
- **Include steps to reproduce** the bug
- **Add screenshots** if applicable
- **Specify your environment** (OS, browser, Node version)

### Suggesting Features
- **Check the roadmap** to see if it's already planned
- **Use the feature request template**
- **Explain the use case** and expected behavior
- **Consider backwards compatibility**

### Code Contributions

#### 1. Choose an Issue
- Look for issues labeled `good first issue` for beginners
- Comment on the issue to let others know you're working on it
- Ask questions if the requirements aren't clear

#### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix-name
```

#### 3. Make Your Changes
- **Follow the coding standards** (see below)
- **Write tests** for new functionality
- **Update documentation** if needed
- **Keep commits atomic** and well-described

#### 4. Test Your Changes
```bash
# Run the test suite
npm run test

# Run type checking
npm run type-check

# Run linting
npm run lint
```

#### 5. Submit a Pull Request
- **Fill out the PR template** completely
- **Link to related issues** using keywords (fixes #123)
- **Provide screenshots** for UI changes
- **Request review** from maintainers

## 📝 Coding Standards

### TypeScript
- **Use strict TypeScript** - no `any` types unless absolutely necessary
- **Define proper interfaces** for all data structures
- **Use meaningful variable names** that describe their purpose
- **Add JSDoc comments** for complex functions

### React
- **Use functional components** with hooks
- **Follow the hooks rules** (don't call hooks in loops or conditions)
- **Use proper dependency arrays** in useEffect and useCallback
- **Prefer composition over inheritance**

### Styling
- **Use Tailwind CSS** for styling
- **Follow the design system** tokens defined in index.css
- **Use semantic class names** when creating custom components
- **Ensure responsive design** works on all screen sizes

### Testing
- **Write unit tests** for components and hooks
- **Test user interactions** not implementation details
- **Use descriptive test names** that explain what is being tested
- **Mock external dependencies** appropriately

### Git Commit Messages
Follow the conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation changes
- `style`: formatting changes
- `refactor`: code refactoring
- `test`: adding tests
- `chore`: maintenance tasks

Examples:
- `feat(dashboard): add export functionality for project data`
- `fix(auth): resolve login redirect issue on mobile`
- `docs(readme): update installation instructions`

## 🧪 Testing Guidelines

### Writing Tests
- **Test behavior, not implementation**
- **Use descriptive test names**
- **Follow the Arrange-Act-Assert pattern**
- **Mock external dependencies**

### Test Structure
```typescript
describe('ComponentName', () => {
  it('should render correctly with valid props', () => {
    // Arrange
    const props = { /* test props */ };
    
    // Act
    render(<ComponentName {...props} />);
    
    // Assert
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

### Code Documentation
- **Add JSDoc comments** for public functions
- **Document complex logic** with inline comments
- **Keep README.md updated** with new features
- **Update API documentation** when changing interfaces

### Writing Documentation
- **Use clear, concise language**
- **Include code examples** where helpful
- **Add screenshots** for UI features
- **Test all code examples** to ensure they work

## 🔍 Code Review Process

### For Contributors
- **Self-review your code** before submitting
- **Respond to feedback** promptly and professionally
- **Make requested changes** in additional commits
- **Squash commits** before merging if requested

### Review Criteria
- **Functionality** - Does the code work as intended?
- **Code Quality** - Is it readable, maintainable, and following standards?
- **Performance** - Are there any performance implications?
- **Security** - Are there any security concerns?
- **Testing** - Is the code adequately tested?

## 🚀 Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version is bumped appropriately
- [ ] Release notes are prepared

## 🤝 Community Guidelines

### Be Respectful
- **Use inclusive language**
- **Be patient with newcomers**
- **Give constructive feedback**
- **Assume good intentions**

### Communication Channels
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Pull Request Comments** - Code-specific discussions

### Getting Help
- **Check the documentation** first
- **Search existing issues** for similar problems
- **Ask specific questions** with relevant context
- **Provide minimal reproducible examples**

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- **Listed in the contributors section** of the README
- **Mentioned in release notes** for significant contributions
- **Given credit** in relevant documentation

---

Thank you for contributing to a more sustainable future! 🌱