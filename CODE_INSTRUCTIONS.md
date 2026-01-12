# Code Instructions - Timezone Glance App

> **Developer Guide for the UKI-Pune Workday Timezone Application**

This document provides comprehensive instructions for developing, maintaining, and extending this React application. It combines insights from our code audit with practical best practices for the tech stack.

---

## Table of Contents

1. [Tech Stack Overview](#tech-stack-overview)
2. [Project Setup](#project-setup)
3. [Development Workflow](#development-workflow)
4. [Architecture Guide](#architecture-guide)
5. [Coding Standards](#coding-standards)
6. [Component Development](#component-development)
7. [State Management](#state-management)
8. [Styling Guidelines](#styling-guidelines)
9. [Testing Strategy](#testing-strategy)
10. [Common Tasks](#common-tasks)
11. [Troubleshooting](#troubleshooting)

---

## Tech Stack Overview

### Core Technologies
- **React 18.3.1** - UI library with hooks and functional components
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 5.4.19** - Fast build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### Key Libraries
- **shadcn/ui** - Accessible component library built on Radix UI
- **date-fns 3.6.0** - Date manipulation and formatting
- **date-fns-tz 3.2.0** - Timezone support
- **React Router 7.12.0** - Client-side routing
- **React Query 5.83.0** - Server state management (available for future use)
- **Zod 3.25.76** - Schema validation
- **React Hook Form 7.61.1** - Form management

### Development Tools
- **ESLint 9.32.0** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **lovable-tagger** - Component tagging for Lovable platform

---

## Project Setup

### Prerequisites
```bash
# Required versions
Node.js: >= 18.0.0
npm: >= 9.0.0
```

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd uki-pune-workday

# Install dependencies
npm install

# Start development server
npm run dev
# App runs at http://localhost:8080
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:8080)

# Building
npm run build           # Production build
npm run build:dev       # Development build
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
```

### Environment Setup

The app uses a base URL configured in `vite.config.ts`:
- **Development**: `/` (root)
- **Production**: `/uki-pune-workday/` (GitHub Pages)

---

## Development Workflow

### Daily Development

1. **Start your work**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   npm run dev
   ```

2. **Make changes**
   - Write code following the standards below
   - Test changes in the browser
   - Run linter frequently

3. **Before committing**
   ```bash
   npm run lint           # Fix any errors
   npm run build          # Ensure builds succeed
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: descriptive message"
   git push origin feature/your-feature-name
   ```

### Code Quality Checklist

Before pushing code, ensure:
- ✅ No ESLint errors (warnings are acceptable for shadcn/ui components)
- ✅ TypeScript compiles without errors
- ✅ Build completes successfully
- ✅ App runs without console errors
- ✅ Key user flows work correctly

---

## Architecture Guide

### Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── TimeCard.tsx     # Display time for a location
│   ├── ProgressBar.tsx  # Workday progress visualization
│   ├── OverlapIndicator.tsx  # Show timezone overlaps
│   ├── MessageIndicator.tsx  # Messaging availability status
│   ├── SettingsPanel.tsx     # App settings UI
│   └── ui/              # shadcn/ui components (48 files)
│
├── contexts/            # React Context providers
│   └── SettingsContext.tsx  # App settings & persistence
│
├── hooks/              # Custom React hooks
│   ├── useTimezone.ts  # Main timezone logic
│   ├── use-toast.ts    # Toast notifications
│   └── use-mobile.tsx  # Mobile detection
│
├── lib/                # Utility functions
│   └── utils.ts        # cn() helper for className merging
│
├── pages/              # Top-level page components
│   ├── Index.tsx       # Main dashboard page
│   └── NotFound.tsx    # 404 page
│
├── App.tsx             # App root with providers
├── main.tsx            # Entry point
└── index.css           # Global styles & CSS variables
```

### Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Context Update (Settings)
    ↓
useTimezone Hook (Calculations)
    ↓
Component Re-render
    ↓
UI Update
```

### Key Design Patterns

1. **Container/Presenter Pattern**
   - `Index.tsx` contains `Dashboard` (logic) and presentational components
   - Separation of business logic from UI

2. **Custom Hooks for Logic**
   - `useTimezone` - All timezone calculations
   - `useSettings` - Settings management
   - Keep components clean and focused

3. **Context for Global State**
   - Settings stored in context
   - Persisted to localStorage
   - Theme management via CSS classes

---

## Coding Standards

### TypeScript Best Practices

#### 1. Always Define Interfaces

```typescript
// ✅ Good - Clear interface
interface TimeCardProps {
  location: string;
  time: string;
  date: string;
  status: WorkStatus;
}

// ❌ Avoid - Inline types
const TimeCard = ({ location, time }: { location: string; time: string }) => {
  // ...
}
```

#### 2. Use Type Exports

```typescript
// ✅ Good - Reusable types
export type WorkStatus = 'before-work' | 'working' | 'lunch' | 'after-work';

export interface TimeInfo {
  time: Date;
  formattedTime: string;
  status: WorkStatus;
}
```

#### 3. Avoid `any`

```typescript
// ❌ Avoid
const processData = (data: any) => { /* ... */ }

// ✅ Better
const processData = (data: TimeInfo) => { /* ... */ }

// ✅ For unknown data
const processData = (data: unknown) => {
  if (isTimeInfo(data)) {
    // Type guard
  }
}
```

### React Component Standards

#### 1. Functional Components with Hooks

```typescript
// ✅ Good - Modern React
export const TimeCard = ({ location, time, status }: TimeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div onMouseEnter={() => setIsHovered(true)}>
      {/* ... */}
    </div>
  );
};

// ❌ Avoid - Class components
export class TimeCard extends React.Component {
  // ...
}
```

#### 2. Component Organization

```typescript
// Standard order for component code:
export const MyComponent = ({ prop1, prop2 }: Props) => {
  // 1. Hooks (in order)
  const context = useContext(SomeContext);
  const [state, setState] = useState(initial);
  const memoValue = useMemo(() => compute(), [deps]);
  const callback = useCallback(() => { /* ... */ }, [deps]);
  useEffect(() => { /* ... */ }, [deps]);
  
  // 2. Event handlers
  const handleClick = () => { /* ... */ };
  
  // 3. Render helpers (if needed)
  const renderItem = (item: Item) => <div>{item.name}</div>;
  
  // 4. Return JSX
  return (
    <div>
      {/* ... */}
    </div>
  );
};
```

#### 3. Props Destructuring

```typescript
// ✅ Good - Destructure in params
export const TimeCard = ({ location, time, status }: TimeCardProps) => {
  return <div>{location}: {time}</div>;
};

// ❌ Avoid - Access via props object
export const TimeCard = (props: TimeCardProps) => {
  return <div>{props.location}: {props.time}</div>;
};
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `TimeCard`, `SettingsPanel` |
| Files | Match component | `TimeCard.tsx` |
| Hooks | use + PascalCase | `useTimezone`, `useSettings` |
| Interfaces | PascalCase | `WorkSchedule`, `TimeInfo` |
| Types | PascalCase | `WorkStatus` |
| Constants | UPPER_SNAKE_CASE | `IRELAND_TZ`, `PUNE_TZ` |
| Functions | camelCase | `formatDuration`, `parseTime` |
| Variables | camelCase | `currentTime`, `isActive` |

---

## Component Development

### Creating a New Component

1. **Create the file**
   ```bash
   # For app components
   touch src/components/MyComponent.tsx
   
   # For UI components (if needed)
   touch src/components/ui/my-component.tsx
   ```

2. **Component template**
   ```typescript
   import { cn } from '@/lib/utils';
   
   interface MyComponentProps {
     title: string;
     isActive?: boolean;
     onAction?: () => void;
   }
   
   /**
    * Brief description of what this component does
    */
   export const MyComponent = ({ 
     title, 
     isActive = false,
     onAction 
   }: MyComponentProps) => {
     return (
       <div className={cn(
         'base-classes',
         isActive && 'active-classes'
       )}>
         <h2>{title}</h2>
         {onAction && (
           <button onClick={onAction}>Action</button>
         )}
       </div>
     );
   };
   ```

### Using shadcn/ui Components

```typescript
// Import from @/components/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Use with Tailwind classes
<Button variant="outline" size="lg" className="custom-class">
  Click me
</Button>
```

### Accessibility Requirements

```typescript
// ✅ Icon buttons need labels
<Button 
  variant="outline" 
  size="icon"
  aria-label="Open settings"
>
  <Settings className="h-4 w-4" />
</Button>

// ✅ Form inputs need labels
<div>
  <Label htmlFor="start-time">Start Time</Label>
  <Input id="start-time" type="time" />
</div>

// ✅ Use semantic HTML
<main>
  <header>
    <h1>Title</h1>
  </header>
  <section>
    {/* content */}
  </section>
</main>
```

---

## State Management

### Local State (useState)

Use for component-specific UI state:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [inputValue, setInputValue] = useState('');

// Functional updates when depending on previous state
setCount(prev => prev + 1);
```

### Context API (Global State)

For app-wide settings and shared state:

```typescript
// Using existing context
const { settings, updateSettings } = useSettings();

// Update settings
updateSettings({ use24Hour: true });

// Update schedule
updateIrelandSchedule({ startTime: '09:00' });
```

### Custom Hooks (Complex Logic)

Extract complex logic into custom hooks:

```typescript
// In src/hooks/useMyFeature.ts
export const useMyFeature = () => {
  const [state, setState] = useState(initial);
  
  const computation = useMemo(() => {
    // Complex calculation
    return result;
  }, [dependencies]);
  
  return { state, computation };
};

// In component
const { state, computation } = useMyFeature();
```

### Performance Optimization

```typescript
// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);

// Use useCallback for stable function references
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  // Component code
});
```

---

## Styling Guidelines

### Tailwind CSS

#### 1. Use Utility Classes

```typescript
// ✅ Good - Compose with utilities
<div className="flex items-center justify-between p-4 bg-card rounded-lg">

// ❌ Avoid - Custom CSS when utilities exist
<div className="custom-container">
<style>.custom-container { display: flex; ... }</style>
```

#### 2. Use the `cn()` Helper

```typescript
import { cn } from '@/lib/utils';

// Combine classes conditionally
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  variant === 'primary' && 'primary-classes'
)}>
```

#### 3. Responsive Design

```typescript
<div className="flex flex-col md:flex-row gap-4 md:gap-6">
  {/* Stacked on mobile, row on medium+ */}
</div>
```

#### 4. Use CSS Variables

```typescript
// Defined in index.css as HSL values
<div className="bg-background text-foreground border-border">
  {/* Uses theme-aware colors */}
</div>

// Custom colors in tailwind.config.ts
colors: {
  success: {
    DEFAULT: "hsl(var(--success))",
    foreground: "hsl(var(--success-foreground))",
  },
}
```

### Theme System

The app supports light/dark/system themes:

```typescript
// Theme classes automatically applied to <html>
// Configured in SettingsContext

// Use semantic color tokens
'bg-card text-card-foreground'     // Card styling
'bg-success text-success-foreground' // Success state
'bg-warning text-warning-foreground' // Warning state
'bg-muted text-muted-foreground'    // Muted/disabled
```

---

## Testing Strategy

### Current State
- ⚠️ No automated tests currently implemented
- Manual testing workflow below

### Manual Testing Checklist

When making changes, test:

1. **Time Display**
   - Verify times update correctly
   - Check 12/24 hour format toggle
   - Test seconds display toggle

2. **Work Schedule**
   - Modify Ireland schedule
   - Modify Pune schedule
   - Verify progress bars update

3. **Overlap Calculation**
   - Change schedules to create overlaps
   - Verify overlap periods display correctly
   - Check "good time to message" indicator

4. **Settings**
   - Change all settings
   - Verify persistence (reload page)
   - Test theme switching

5. **Responsive Design**
   - Test on mobile viewport
   - Test on tablet viewport
   - Test on desktop

### Recommended Testing (Future)

```typescript
// Unit tests for hooks (with @testing-library/react-hooks)
describe('useTimezone', () => {
  it('calculates overlap periods correctly', () => {
    // Test implementation
  });
});

// Component tests (with @testing-library/react)
describe('TimeCard', () => {
  it('displays time and status correctly', () => {
    // Test implementation
  });
});
```

---

## Common Tasks

### Adding a New Timezone

1. **Add timezone constant**
   ```typescript
   // In src/hooks/useTimezone.ts
   const NEW_LOCATION_TZ = 'America/New_York';
   ```

2. **Add to settings interface**
   ```typescript
   // In src/contexts/SettingsContext.tsx
   export interface Settings {
     // ... existing
     newLocationSchedule: WorkSchedule;
   }
   ```

3. **Add schedule in SettingsPanel**
   ```typescript
   <ScheduleEditor
     title="New Location"
     schedule={settings.newLocationSchedule}
     onUpdate={updateNewLocationSchedule}
   />
   ```

4. **Add calculations in useTimezone**
   ```typescript
   const newLocationTime = useMemo(() => 
     toZonedTime(now, NEW_LOCATION_TZ), 
     [now]
   );
   ```

5. **Add UI in Index.tsx**
   ```typescript
   <TimeCard
     location="NEW LOCATION"
     time={newLocationInfo.formattedTime}
     // ... props
   />
   ```

### Adding a New shadcn/ui Component

```bash
# Components are already installed
# To add a new one (example):
npx shadcn-ui@latest add dialog

# This adds the component to src/components/ui/
# Then import and use:
import { Dialog, DialogContent } from '@/components/ui/dialog';
```

### Modifying Work Hours Logic

The main logic is in `src/hooks/useTimezone.ts`:

```typescript
// Modify work status detection
const getWorkStatus = (date: Date, schedule: WorkSchedule): WorkStatus => {
  // Update logic here
};

// Modify progress calculation
const calculateProgress = (time: Date, schedule: WorkSchedule): ProgressInfo => {
  // Update calculations here
};

// Modify overlap detection
const overlapInfo: OverlapInfo = useMemo(() => {
  // Update overlap logic here
}, [dependencies]);
```

### Adding Persistent Settings

1. **Add to Settings interface**
   ```typescript
   export interface Settings {
     newSetting: string;
   }
   ```

2. **Add to defaults**
   ```typescript
   const defaultSettings: Settings = {
     newSetting: 'default value',
   };
   ```

3. **Access in components**
   ```typescript
   const { settings, updateSettings } = useSettings();
   updateSettings({ newSetting: 'new value' });
   ```

   Settings automatically persist to localStorage.

---

## Troubleshooting

### Build Issues

#### Error: `Cannot find module '@/...'`

The `@` alias points to `src/`. Ensure `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### Error: ESLint cache issues

```bash
rm -rf node_modules/.vite
npm run lint
```

#### Error: Build fails but dev works

```bash
# Clear caches
rm -rf dist node_modules/.vite
npm run build
```

### Development Issues

#### Times not updating

- Check `updateFrequency` setting (standard = 60s, smooth = 1s)
- Verify `useEffect` cleanup in `useTimezone`
- Check browser console for errors

#### Settings not persisting

- Check browser localStorage (DevTools → Application → Local Storage)
- Verify no errors in `SettingsContext` try-catch blocks
- Clear localStorage and test: `localStorage.clear()`

#### Theme not switching

- Check `<html>` element for `light`/`dark` class
- Verify CSS variables in `index.css`
- Check `SettingsContext` theme effect

#### Component not rendering

- Check for console errors
- Verify imports are correct
- Check that component is exported
- Verify props are passed correctly

### Performance Issues

#### Slow updates

```typescript
// Add React DevTools Profiler
// Check for unnecessary re-renders

// Ensure expensive calculations use useMemo
const expensive = useMemo(() => calculate(), [deps]);

// Ensure callbacks use useCallback
const handler = useCallback(() => {}, [deps]);
```

#### Large bundle size

```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer dist/assets/*.js
```

---

## Additional Resources

### Documentation Links

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Vite**: https://vitejs.dev/guide/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **date-fns**: https://date-fns.org/docs
- **React Router**: https://reactrouter.com
- **React Query**: https://tanstack.com/query/latest

### Project Documentation

- `AUDIT_REPORT.md` - Code audit findings and recommendations
- `BEST_PRACTICES.md` - Coding standards and conventions
- `AUDIT_SUMMARY.md` - Executive summary of code quality
- `README.md` - Basic project information

### Getting Help

1. Check this guide first
2. Review existing code for patterns
3. Check documentation links above
4. Search for similar issues in the codebase
5. Ask the team in your communication channels

---

## Quick Reference

### Essential Commands

```bash
npm run dev          # Start development
npm run build        # Production build
npm run lint         # Check code quality
npm run preview      # Preview production build
```

### Common Imports

```typescript
// Utilities
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// Hooks
import { useSettings } from '@/contexts/SettingsContext';
import { useTimezone } from '@/hooks/useTimezone';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
```

### Color Tokens

```typescript
// Backgrounds
'bg-background'     // Main background
'bg-card'          // Card backgrounds
'bg-muted'         // Muted areas
'bg-success'       // Success state
'bg-warning'       // Warning state

// Text
'text-foreground'         // Primary text
'text-muted-foreground'   // Secondary text
'text-success-foreground' // Success text
'text-warning-foreground' // Warning text

// Borders
'border-border'    // Standard borders
```

---

## Summary

This guide covers the essential aspects of developing with this codebase. Key takeaways:

1. ✅ Use TypeScript with proper types
2. ✅ Follow React hooks best practices
3. ✅ Use shadcn/ui components
4. ✅ Style with Tailwind utilities
5. ✅ Extract logic to custom hooks
6. ✅ Test manually before committing
7. ✅ Run lint and build before pushing

**Always refer to existing code patterns when in doubt!**
