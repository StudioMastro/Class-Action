# AI Assistant Configuration

> Note: The main AI assistant rules are now defined in the root `.cursorrules` file.
> This document serves as extended documentation and guidelines.
> For license-related information, please refer to `.cursor/docs/LICENSING.mdc`.

## Project Context

- **Project Type**: Figma Plugin
- **Framework**: React
- **Description**: Core configuration for AI assistant behavior in the Figma Plugin Project

## Extended Documentation

### Context Initialization

- Read project documentation before any operation
- Review relevant code sections before suggesting changes
- Check recent meeting notes for context
- Verify current project state and requirements

### Code Generation Standards

- Generate TypeScript code with strict type safety
- Follow project-specific naming conventions
- Implement proper error handling
- Include comprehensive documentation
- Add appropriate test coverage

### Development Standards

#### Code Style

- **Language**: TypeScript with strict mode enabled
- **Style Guide**:
  - Use functional components with TypeScript interfaces
  - Prefer named exports for components
  - Use proper type annotations
  - Avoid classes, prefer functional programming patterns
- **Naming Conventions**:
  - Use lowercase with dashes for directories (e.g., components/auth-wizard)
  - Use PascalCase for component names
  - Use camelCase for variables and functions
  - Use descriptive names with auxiliary verbs (e.g., isLoading, hasError)

#### File Organization

- **Structure**:
  - Components: exported component, subcomponents, helpers, static content, types
  - Separate UI and plugin logic
  - Follow established project structure
  - Place documentation in appropriate directories
- Place documentation in `.cursor/rules/`
- Use Notepads for dynamic documentation
- Maintain clear file separation
- Use appropriate file extensions

#### Performance Guidelines

- Minimize plugin startup time
- Handle large files efficiently
- Batch API operations
- Implement proper caching
- Optimize bundle size
- Consider memory usage
- Minimize UI redraws
- Cache expensive computations

### Figma-Specific Guidelines

#### API Usage

- Batch API operations for performance
- Handle API rate limits gracefully
- Implement proper error recovery
- Cache API results when possible

#### Plugin Communication

- Use typed messages
- Handle message failures
- Implement proper timeouts
- Validate message data

### Safety Requirements

- Never break type safety
- Always maintain proper error handling
- Never expose sensitive information
- Always validate user input
- Follow Figma's security guidelines

#### Error Handling

- Provide clear error messages
- Include debugging context
- Use Figma's notification system
- Log appropriate information
- Suggest potential solutions
- Reference relevant documentation

#### Security

- Follow Figma plugin security best practices
- Validate all inputs
- Sanitize data appropriately
- Handle sensitive data securely
- Implement proper access controls

### Project-Specific Rules

- Language: English only (All code, documentation, and inline comments must be written in English)
- Code Style: Strict TypeScript
- Formatting: Prettier
- Documentation: Markdown/MDC
- Testing: Jest + React Testing Library

### AI Interaction Guidelines

- Provide clear, concise responses
- Include code examples when relevant
- Reference documentation appropriately
- Use proper technical terminology
- Follow conversation context

### Development Workflow

- Review code before modifications
- Create atomic, focused changes
- Update documentation as needed
- Add appropriate tests
- Update CHANGELOG.md

### Documentation Standards

- Use clear, technical language
- Include code examples
- Reference related files with @ syntax
- Keep documentation up-to-date
- Follow established templates

### Version Control

- Write clear commit messages
- Follow semantic versioning
- Update CHANGELOG.md
- Document breaking changes

## References

- [Figma Plugin Development Guide](https://www.figma.com/plugin-docs)
- [Create Figma Plugin Documentation](https://yuanqing.github.io/create-figma-plugin)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
