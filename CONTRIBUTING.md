# Contributing to Proxy Server

We love your input! We want to make contributing to the proxy server as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Development Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/proxy.git
cd proxy
```
3. Install dependencies:
```bash
yarn
```
4. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

### Development Workflow

1. Make your changes:
   - Write clean, maintainable, and testable code
   - Follow the existing code style and formatting
   - Add appropriate comments and documentation
   - Write or update tests for new features

2. Test your changes:
```bash
yarn test
```

3. Build the project:
```bash
yarn build
```

4. Commit your changes:
   - Keep commits atomic and focused
   - Write clear commit messages
   - Follow conventional commit format:
     ```
     feat: add new feature
     fix: resolve specific issue
     docs: update documentation
     test: add tests
     refactor: code improvement
     ```

## Bug Reports

We use GitHub issues to track public bugs. Report a bug by opening a new issue; it's that easy!

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We use GitHub issues to track feature requests. When proposing a feature:

- Explain in detail how it would work
- Keep the scope as narrow as possible
- Remember that this is a volunteer-driven project

## Code Review Process

The core team looks at Pull Requests on a regular basis. After feedback has been given we expect responses within two weeks. After two weeks we may close the PR if it isn't showing any activity.

## Community

- Be respectful and inclusive
- Keep discussions constructive
- Help others learn and grow
- Follow ethical coding practices

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
