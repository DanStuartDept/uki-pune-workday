# Copilot Instructions - Timezone Glance App

> **AI Agent Development Guide for UKI-Pune Workday Timezone Application**

This file provides instructions for GitHub Copilot and AI coding agents working on this React/TypeScript/Vite application. Follow these guidelines when generating, modifying, or reviewing code.

---

## Project Context

**Application**: Timezone comparison tool for UKI (Ireland) and Pune (India) work schedules  
**Purpose**: Display current times, work progress, overlap periods, and optimal messaging windows  
**Tech Stack**: React 18 + TypeScript 5 + Vite 5 + Tailwind CSS 3 + shadcn/ui  
**Build Tool**: Vite with SWC for fast React compilation  
**Deployment**: GitHub Pages at `/uki-pune-workday/`

---

## Core Architecture

### Directory Structure
```
src/
├── components/          # UI components (TimeCard, ProgressBar, etc.)
│   └── ui/             # shadcn/ui components (48 files - DO NOT MODIFY)
├── contexts/           # React Context (SettingsContext.tsx)
├── hooks/              # Custom hooks (useTimezone.ts, use-toast.ts)
├── lib/                # Utilities (utils.ts with cn() helper)
├── pages/              # Routes (Index.tsx, NotFound.tsx)
├── App.tsx             # Root with providers
└── main.tsx            # Entry point
```

### Data Flow Pattern
```
User Interaction → Context Update → Hook Recalculation → Component Re-render
```

### Key Files & Responsibilities

**`src/hooks/useTimezone.ts`** (350+ lines)
- Central business logic for timezone calculations
- Computes work status, progress, overlaps
- Uses date-fns and date-fns-tz extensively
- Returns: `irelandInfo`, `puneInfo`, `offsetInfo`, `overlapInfo`, `messageIndicator`
- **ALWAYS** use `useMemo` and `useCallback` for performance

**`src/contexts/SettingsContext.tsx`** (115 lines)
- Global settings with localStorage persistence
- Manages work schedules, display preferences, theme
- Exports: `useSettings()` hook, `SettingsProvider` component
- **ALWAYS** update both interface and defaults when adding settings

**`src/pages/Index.tsx`** (95 lines)
- Main dashboard assembling all components
- Container component with SettingsProvider wrapper
- **DO NOT** add business logic here - use hooks

---

## Critical Coding Rules

### TypeScript Standards

#### 1. Always Define Interfaces (REQUIRED)
```typescript
// ✅ CORRECT - Explicit interface
interface TimeCardProps {
  location: string;
  time: string;
  status: WorkStatus;
}

// ❌ WRONG - Inline types
const TimeCard = ({ location }: { location: string }) => { }
```

#### 2. Use Exported Types
```typescript
// ✅ CORRECT - Reusable type
export type WorkStatus = 'before-work' | 'working' | 'lunch' | 'after-work';

// Import and use
import { WorkStatus } from '@/hooks/useTimezone';
```

#### 3. Never Use `any`
```typescript
// ❌ WRONG
const process = (data: any) => { }

// ✅ CORRECT
const process = (data: TimeInfo) => { }
```

### React Component Rules

#### 1. Functional Components Only
```typescript
// ✅ CORRECT - Modern functional component
export const TimeCard = ({ location, time }: TimeCardProps) => {
  return <div>{location}: {time}</div>;
};

// ❌ WRONG - Class components not used in this codebase
class TimeCard extends React.Component { }
```

#### 2. Hook Ordering (MANDATORY)
```typescript
export const MyComponent = (props: Props) => {
  // 1. Context hooks first
  const { settings } = useSettings();
  
  // 2. State hooks
  const [state, setState] = useState(initial);
  
  // 3. Memoization hooks
  const computed = useMemo(() => calculate(), [deps]);
  const callback = useCallback(() => { }, [deps]);
  
  // 4. Effect hooks last
  useEffect(() => { }, [deps]);
  
  // 5. Event handlers
  const handleClick = () => { };
  
  // 6. Return JSX
  return <div />;
};
```

#### 3. Always Destructure Props
```typescript
// ✅ CORRECT
export const TimeCard = ({ location, time }: TimeCardProps) => {

// ❌ WRONG
export const TimeCard = (props: TimeCardProps) => {
  return <div>{props.location}</div>;
```

### Performance Requirements

#### 1. Use useMemo for Calculations (CRITICAL)
```typescript
// ✅ CORRECT - Expensive calculations
const irelandTime = useMemo(() => 
  toZonedTime(now, IRELAND_TZ), 
  [now]
);

const overlapInfo = useMemo(() => {
  // Complex overlap logic
  return { periods, hasOverlap };
}, [settings, irelandTime, puneTime]);
```

#### 2. Use useCallback for Functions (CRITICAL)
```typescript
// ✅ CORRECT - Stable function reference
const formatTimeDisplay = useCallback((date: Date): string => {
  return settings.use24Hour ? format(date, 'HH:mm') : format(date, 'hh:mm a');
}, [settings.use24Hour, settings.showSeconds]);
```

#### 3. Minimal Dependencies
```typescript
// ✅ CORRECT - Only what you need
const memoValue = useMemo(() => calculate(a, b), [a, b]);

// ❌ WRONG - Entire object when only properties needed
const memoValue = useMemo(() => calculate(obj.a, obj.b), [obj]);
```

---

## Styling Rules

### Tailwind CSS (PRIMARY)

#### 1. Use Utility Classes
```typescript
// ✅ CORRECT - Tailwind utilities
<div className="flex items-center justify-between p-4 bg-card rounded-lg">

// ❌ WRONG - Custom CSS
<div className="custom-container">
<style>.custom-container { display: flex; }</style>
```

#### 2. Use cn() Helper for Conditionals
```typescript
import { cn } from '@/lib/utils';

// ✅ CORRECT
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  variant === 'primary' && 'primary-classes'
)}>
```

#### 3. Use CSS Variables for Colors
```typescript
// ✅ CORRECT - Theme-aware
<div className="bg-background text-foreground border-border">
<div className="bg-success text-success-foreground">
<div className="bg-warning text-warning-foreground">

// ❌ WRONG - Hard-coded colors
<div className="bg-white text-black border-gray-200">
```

#### 4. Responsive Design Pattern
```typescript
// ✅ CORRECT - Mobile-first
<div className="flex flex-col md:flex-row gap-4 md:gap-6">
```

### shadcn/ui Components

```typescript
// Import from @/components/ui (NEVER modify these files)
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Use with Tailwind
<Button variant="outline" size="lg" className="custom-spacing">
  Click me
</Button>
```

---

## Date/Time Handling

### Critical Libraries
- **date-fns**: All date formatting and manipulation
- **date-fns-tz**: Timezone conversions with `toZonedTime()`

### Standard Patterns

```typescript
import { format, addDays, differenceInMinutes } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// Convert to timezone
const irelandTime = toZonedTime(now, 'Europe/Dublin');
const puneTime = toZonedTime(now, 'Asia/Kolkata');

// Format display
const formatted = format(irelandTime, 'HH:mm:ss'); // 24-hour
const formatted = format(irelandTime, 'hh:mm:ss a'); // 12-hour

// Date arithmetic
const tomorrow = addDays(date, 1);
const diff = differenceInMinutes(date2, date1);
```

### Time Parsing Pattern
```typescript
// Parse HH:mm to minutes since midnight
const parseTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Format minutes to HH:mm
const formatMinutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};
```

---

## State Management

### Local State (useState)
Use for component-specific UI state only:
```typescript
const [isOpen, setIsOpen] = useState(false);
const [inputValue, setInputValue] = useState('');
```

### Global State (Context)
Use `useSettings()` for app-wide state:
```typescript
const { settings, updateSettings } = useSettings();

// Update settings (auto-persists to localStorage)
updateSettings({ use24Hour: true });
updateIrelandSchedule({ startTime: '09:00' });
updatePuneSchedule({ endTime: '17:30' });
```

### Custom Hooks (Business Logic)
Extract complex logic to hooks:
```typescript
// In src/hooks/useMyFeature.ts
export const useMyFeature = () => {
  const { settings } = useSettings();
  const [state, setState] = useState(initial);
  
  const computed = useMemo(() => {
    // Business logic
    return result;
  }, [dependencies]);
  
  return { state, computed };
};
```

---

## Accessibility Requirements

### ARIA Labels (MANDATORY for icon buttons)
```typescript
// ✅ CORRECT
<Button variant="outline" size="icon" aria-label="Open settings">
  <Settings className="h-4 w-4" />
</Button>

// ❌ WRONG - Missing label
<Button variant="outline" size="icon">
  <Settings className="h-4 w-4" />
</Button>
```

### Form Labels (MANDATORY)
```typescript
// ✅ CORRECT
<div>
  <Label htmlFor="start-time">Start Time</Label>
  <Input id="start-time" type="time" />
</div>
```

### Semantic HTML
```typescript
// ✅ CORRECT - Use semantic tags
<main>
  <header><h1>Title</h1></header>
  <section>Content</section>
</main>
```

---

## Common Tasks for AI Agents

### Adding a New Timezone Location

1. **Add timezone constant**
   ```typescript
   // In src/hooks/useTimezone.ts
   const NEW_LOCATION_TZ = 'America/New_York';
   ```

2. **Extend Settings interface**
   ```typescript
   // In src/contexts/SettingsContext.tsx
   export interface Settings {
     // existing...
     newLocationSchedule: WorkSchedule;
   }
   
   const defaultSettings: Settings = {
     // existing...
     newLocationSchedule: { startTime: '09:00', lunchStart: '13:00', lunchEnd: '14:00', endTime: '17:30' },
   };
   ```

3. **Add update function**
   ```typescript
   const updateNewLocationSchedule = (schedule: Partial<WorkSchedule>) => {
     setSettings(prev => ({
       ...prev,
       newLocationSchedule: { ...prev.newLocationSchedule, ...schedule },
     }));
   };
   ```

4. **Add calculations in useTimezone**
   ```typescript
   const newLocationTime = useMemo(() => toZonedTime(now, NEW_LOCATION_TZ), [now]);
   const newLocationInfo: TimeInfo = useMemo(() => ({
     time: newLocationTime,
     formattedTime: formatTimeDisplay(newLocationTime),
     formattedDate: format(newLocationTime, 'EEEE, dd MMM'),
     status: getWorkStatus(newLocationTime, settings.newLocationSchedule),
   }), [newLocationTime, formatTimeDisplay, settings.newLocationSchedule]);
   ```

5. **Add UI components in Index.tsx**
   ```typescript
   <TimeCard
     location="NEW LOCATION"
     time={newLocationInfo.formattedTime}
     date={newLocationInfo.formattedDate}
     status={newLocationInfo.status}
   />
   ```

### Creating a New Component

**Template:**
```typescript
import { cn } from '@/lib/utils';

interface MyComponentProps {
  title: string;
  isActive?: boolean;
  onAction?: () => void;
}

/**
 * Brief JSDoc description
 * @param title - Description
 * @param isActive - Description
 * @param onAction - Description
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
        <button onClick={onAction} aria-label="Action button">
          Action
        </button>
      )}
    </div>
  );
};
```

### Modifying Work Hours Logic

All business logic is in `src/hooks/useTimezone.ts`:

```typescript
// Modify work status detection
const getWorkStatus = (date: Date, schedule: WorkSchedule): WorkStatus => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentMinutes = hours * 60 + minutes;
  
  // Add new logic here
  if (currentMinutes < parseTimeToMinutes(schedule.startTime)) {
    return 'before-work';
  }
  // ... rest of logic
};
```

---

## Code Quality Checklist

Before committing code changes, verify:

- [ ] No ESLint errors (`npm run lint`)
- [ ] TypeScript compiles (`npm run build`)
- [ ] All interfaces properly defined
- [ ] Props destructured in component params
- [ ] `useMemo` used for expensive calculations
- [ ] `useCallback` used for functions passed as props
- [ ] Correct dependency arrays in hooks
- [ ] Tailwind utilities used (no custom CSS)
- [ ] `cn()` helper used for conditional classes
- [ ] ARIA labels on icon buttons
- [ ] Semantic HTML elements
- [ ] JSDoc comments on exported functions
- [ ] No `console.log` statements (except intentional error logging)

---

## Pull Request Requirements

### Quality Gates (MANDATORY)

All PRs must pass these quality checks before merging:

1. **Lint Check** - MUST pass without errors
   ```bash
   npm run lint
   ```
   - 0 errors required
   - Warnings acceptable only for shadcn/ui fast-refresh patterns

2. **Type Check** - MUST pass without errors
   ```bash
   npm run build
   ```
   - Build must complete successfully
   - No TypeScript compilation errors

3. **Manual Testing** - MUST verify functionality
   - Test changed features in browser
   - Verify no console errors
   - Check responsive design (mobile, tablet, desktop)

### Screenshot Requirements (MANDATORY)

**Every PR that changes UI MUST include screenshots.**

#### Full-Page Screenshots
- Capture entire page with full content visible
- **DO NOT** cut off content below the fold
- Use full-page screenshot option to ensure everything is visible
- Show the complete user interface in context

#### Component-Level Screenshots (Bonus)
When possible, also include focused screenshots of:
- Individual components that were modified
- Specific UI elements that changed
- Interactive states (hover, active, etc.)

#### How to Capture Screenshots

**Using Playwright (Recommended):**
```typescript
// Full page screenshot
await page.screenshot({ 
  fullPage: true, 
  path: 'screenshots/full-page.png' 
});

// Component screenshot using selector
await page.locator('[data-testid="time-card"]').screenshot({
  path: 'screenshots/time-card.png'
});
```

**Guidelines:**
- ✅ Full-page screenshots showing complete interface
- ✅ Component screenshots showing specific changes
- ✅ Screenshots at default viewport (1280x720 or similar)
- ✅ Multiple screenshots for different states if relevant
- ❌ Cut-off screenshots missing content below fold
- ❌ Screenshots with only partial UI visible

### PR Description Template

```markdown
## Changes
Brief description of what changed

## Quality Checks
- [x] `npm run lint` - passes with 0 errors
- [x] `npm run build` - builds successfully
- [x] Manual testing completed
- [x] No console errors

## Screenshots

### Full Page View
![Full page screenshot](url)

### Component Views (if applicable)
![Component 1](url)
![Component 2](url)

## Testing Notes
- Tested feature X
- Verified responsive design
- Checked accessibility
```

### Before Submitting PR

**Required checklist:**
- [ ] Run `npm run lint` - must pass with 0 errors
- [ ] Run `npm run build` - must complete successfully  
- [ ] Test changes in browser
- [ ] Take full-page screenshots (not cut off)
- [ ] Take component screenshots (bonus)
- [ ] Add screenshots to PR description
- [ ] Add testing notes to PR description
- [ ] Verify no console errors

**Quality Standards:**
- Code follows all patterns in this guide
- TypeScript interfaces defined for all props
- Performance optimizations applied (useMemo/useCallback)
- Accessibility requirements met (ARIA labels)
- Styling uses Tailwind utilities
- No anti-patterns used

---

## Anti-Patterns to Avoid

### ❌ NEVER Do This

```typescript
// ❌ Class components
class MyComponent extends React.Component { }

// ❌ Direct style objects
<div style={{ display: 'flex' }}>

// ❌ any type
const process = (data: any) => { }

// ❌ Missing dependencies
useMemo(() => calculate(a, b), []); // a, b should be in deps

// ❌ Inline function without useCallback when passed to memoized child
<ExpensiveChild onAction={() => doSomething()} />

// ❌ Modifying shadcn/ui files
// Never edit files in src/components/ui/

// ❌ Hard-coded colors
<div className="bg-white text-black">

// ❌ Props without destructuring
const MyComponent = (props: Props) => <div>{props.title}</div>

// ❌ Business logic in components
// Use custom hooks instead
```

---

## Build & Development Commands

```bash
# Development
npm run dev              # Start dev server at :8080

# Production
npm run build            # Build for production
npm run build:dev        # Build for development
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
```

---

## Import Patterns

### Path Aliases
```typescript
// Use @ alias for src imports
import { cn } from '@/lib/utils';
import { useSettings } from '@/contexts/SettingsContext';
import { TimeCard } from '@/components/TimeCard';
import { Button } from '@/components/ui/button';
```

### Standard Imports Order
```typescript
// 1. External libraries
import { useState, useMemo, useCallback } from 'react';
import { format, addDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// 2. UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 3. Internal utilities
import { cn } from '@/lib/utils';

// 4. Contexts/Hooks
import { useSettings } from '@/contexts/SettingsContext';
import { useTimezone } from '@/hooks/useTimezone';

// 5. Types
import type { WorkStatus, TimeInfo } from '@/hooks/useTimezone';
```

---

## TypeScript Configuration Notes

- **Strict mode**: Currently DISABLED (by design from Lovable)
- **noImplicitAny**: false
- **noUnusedLocals**: false
- **skipLibCheck**: true

**For AI agents**: Follow strict typing patterns anyway (define all interfaces, avoid `any`) even though compiler allows loose types.

---

## Known Constraints

1. **shadcn/ui components**: 48 pre-built components in `src/components/ui/` - DO NOT MODIFY
2. **ESLint warnings**: 8 warnings from shadcn/ui fast-refresh exports are EXPECTED and acceptable
3. **Base URL**: Production uses `/uki-pune-workday/` path (GitHub Pages)
4. **Update frequency**: Configurable (1 second or 60 seconds)
5. **Timezone constants**: `Europe/Dublin` and `Asia/Kolkata` are hardcoded

---

## Security Notes

- Settings stored in localStorage (user-controlled, no sensitive data)
- No external API calls
- No authentication required
- Static site deployment

---

## Documentation References

When making changes, consult:
- `AUDIT_REPORT.md` - Code quality assessment and recommendations
- `BEST_PRACTICES.md` - Detailed coding standards
- `AUDIT_SUMMARY.md` - Executive summary of codebase health

---

## Summary for AI Agents

**When writing code for this project:**

1. ✅ Use TypeScript with explicit interfaces
2. ✅ Use functional components with hooks
3. ✅ Use `useMemo` and `useCallback` for performance
4. ✅ Use Tailwind utilities with `cn()` helper
5. ✅ Use date-fns and date-fns-tz for dates
6. ✅ Extract business logic to custom hooks
7. ✅ Use `useSettings()` for global state
8. ✅ Add ARIA labels to icon buttons
9. ✅ Follow existing patterns in the codebase
10. ✅ Run `npm run lint` and `npm run build` before committing

**Primary objective**: Maintain consistency with existing code patterns while ensuring type safety, performance, and accessibility.
