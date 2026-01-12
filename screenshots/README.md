# Application Screenshots

This directory contains screenshots demonstrating the application's functionality and UI components.

## Full Application View

**Full Page Screenshot:**
![Full Application](full-page-app.png)

## Component Screenshots

### Time Cards
Display current time and work status for each location:

**UKI Time Card:**
![UKI Time Card](time-card-uki.png)

**Pune Time Card:**
![Pune Time Card](time-card-pune.png)

### Status Indicators

**Message Indicator:**
![Message Indicator](message-indicator.png)

### Progress Tracking

**UKI Workday Progress:**
![UKI Progress Bar](progress-bar-uki.png)

### Overlap Information

**Overlap Indicator:**
![Overlap Indicator](overlap-indicator.png)

### Settings Panel

**Settings Dialog:**
![Settings Panel](settings-panel.png)

---

## How to Update Screenshots

When making UI changes, update screenshots using Playwright:

```bash
# Start the preview server
npm run build
npm run preview

# Use Playwright to capture screenshots
# See .github/copilot-instructions.md for detailed examples
```

### Full Page Screenshot
```typescript
await page.screenshot({ 
  fullPage: true, 
  path: 'screenshots/full-page-app.png' 
});
```

### Component Screenshot
```typescript
await page.locator('selector').screenshot({
  path: 'screenshots/component-name.png'
});
```

---

**Last Updated:** January 12, 2026
