# Best Practices & Conventions

This document outlines the coding standards and best practices for this codebase.

## Code Style

### TypeScript
- Use TypeScript for all new files
- Define interfaces for component props and data structures
- Export types that may be reused across components
- Use descriptive type names (e.g., `WorkSchedule`, `TimeInfo`)

### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Use `memo` for expensive components that receive stable props
- Use `useCallback` for functions passed as props to memoized components
- Use `useMemo` for expensive calculations

### Naming Conventions
- **Components**: PascalCase (e.g., `TimeCard`, `SettingsPanel`)
- **Files**: Match component name (e.g., `TimeCard.tsx`)
- **Hooks**: Start with "use" (e.g., `useTimezone`, `useSettings`)
- **Interfaces**: PascalCase with descriptive names
- **Constants**: UPPER_SNAKE_CASE (e.g., `IRELAND_TZ`)

### File Organization
```
src/
├── components/        # Reusable components
│   └── ui/           # shadcn/ui base components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page-level components
└── types/            # Shared TypeScript types (if needed)
```

## React Patterns

### Custom Hooks
- Extract complex logic into custom hooks
- Return objects with descriptive property names
- Document hook behavior with JSDoc
- Include proper dependencies in effect/memo hooks

**Example:**
```typescript
/**
 * Hook description
 * @returns Description of returned values
 */
export const useCustomHook = () => {
  // Implementation
  return { value1, value2 };
};
```

### Context Usage
- Use context for global state (settings, theme, auth)
- Provide helper hook for accessing context
- Throw error if used outside provider
- Persist important settings to localStorage

### Component Props
- Define prop interfaces explicitly
- Document complex props with JSDoc
- Use TypeScript for prop validation

## Performance

### Memoization
- Use `useMemo` for expensive calculations
- Use `useCallback` for stable function references
- Use `React.memo` for components with stable props
- Only memoize when there's a measurable benefit

### Update Patterns
- Minimize re-renders by proper dependency arrays
- Use functional setState for state depending on previous state
- Consider code splitting for large components

## Accessibility

### ARIA Labels
- Add `aria-label` to icon-only buttons
- Use semantic HTML when possible
- Ensure keyboard navigation works
- Test with screen readers when possible

### Visual Feedback
- Provide clear status indicators
- Use color and text together (not color alone)
- Ensure sufficient contrast ratios

## State Management

### Local State
- Use `useState` for component-specific state
- Keep state close to where it's used
- Lift state only when necessary

### Global State
- Use Context API for app-wide settings
- Consider React Query for server state
- Persist important state to localStorage

### State Updates
- Use functional updates when depending on previous state
- Batch related state updates
- Consider reducer for complex state logic

## Code Documentation

### JSDoc Comments
Add JSDoc for:
- All exported functions and hooks
- Complex utility functions
- Public component APIs
- Non-obvious business logic

**Example:**
```typescript
/**
 * Calculates work overlap between two timezones
 * @param schedule1 - Work schedule for first location
 * @param schedule2 - Work schedule for second location
 * @returns Array of overlap periods
 */
```

### Inline Comments
- Explain "why" not "what"
- Document complex algorithms
- Note important business rules
- Mark TODOs with context

## Error Handling

### Try-Catch
- Wrap localStorage operations
- Handle JSON parsing errors
- Provide fallback values
- Log errors appropriately

### Validation
- Validate user input
- Check for null/undefined
- Provide meaningful error messages
- Handle edge cases

## Dependencies

### Adding Dependencies
1. Check package popularity and maintenance
2. Review bundle size impact
3. Verify TypeScript support
4. Check for security vulnerabilities
5. Document why the dependency is needed

### Updating Dependencies
- Test thoroughly after updates
- Review breaking changes
- Update one major version at a time
- Check for deprecation warnings

## Git Workflow

### Commits
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Reference issues when applicable

### Pull Requests
- Include description of changes
- List any breaking changes
- Add screenshots for UI changes
- Ensure all tests pass

## Testing (Recommended)

### Unit Tests
- Test custom hooks
- Test utility functions
- Mock external dependencies
- Aim for high coverage of business logic

### Integration Tests
- Test component interactions
- Test user workflows
- Test error scenarios

## Build & Deployment

### Before Pushing
1. Run linter: `npm run lint`
2. Build project: `npm run build`
3. Check for console errors
4. Test key functionality

### Environment Variables
- Use `.env` for local development
- Never commit secrets
- Document required variables
- Provide example `.env.example`

## Security

### Best Practices
- Keep dependencies updated
- Run `npm audit` regularly
- Sanitize user input
- Use HTTPS in production
- Follow OWASP guidelines

### Sensitive Data
- Never commit secrets or API keys
- Use environment variables
- Rotate credentials regularly
- Use secure storage for tokens

## Performance Monitoring

### Metrics to Watch
- Bundle size
- Load time
- Time to interactive
- Memory usage
- Re-render frequency

### Tools
- React DevTools Profiler
- Lighthouse
- Bundle analyzer
- Browser DevTools

## Code Review Checklist

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No ESLint errors
- [ ] No console.log statements
- [ ] TypeScript types are correct
- [ ] Documentation is updated
- [ ] Accessibility considered
- [ ] Performance impact assessed
- [ ] Security implications reviewed

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [date-fns Documentation](https://date-fns.org/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
