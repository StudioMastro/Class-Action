> Note: For common rules regarding error handling, performance, input validation, and naming conventions, please refer to @rules/cursor_rules.mdc. The rules defined here are specific to React component development.

# React Component Standards

## Component Structure

- Use functional components with TypeScript
- Implement proper prop typing with interfaces
- Follow the single responsibility principle
- Keep components small and focused
- Use composition over inheritance

## State Management

- Use React hooks appropriately
- Minimize state when possible
- Leverage context for global state
- Handle side effects in useEffect
- Clean up subscriptions and listeners

## Performance Optimization

- Implement React.memo for expensive renders
- Use useMemo and useCallback appropriately
- Avoid unnecessary re-renders
- Lazy load components when possible
- Implement proper error boundaries

## Figma UI Integration

- Use @create-figma-plugin/ui components
- Follow Figma's design system
- Implement proper loading states
- Handle plugin-UI communication efficiently
- Support both light and dark themes

## Component Testing

- Write unit tests for each component
- Test component interactions
- Verify prop type checking
- Test error boundaries
- Validate accessibility features

## Documentation

- Document component props
- Include usage examples
- Document side effects
- Specify required context providers
- Note performance considerations
