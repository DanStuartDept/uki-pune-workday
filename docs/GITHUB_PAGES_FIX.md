# GitHub Pages Deployment Fix

## Problem
The application was not working on GitHub Pages at https://danstuartdept.github.io/uki-pune-workday/

## Root Cause
This React SPA (Single Page Application) uses client-side routing via React Router's `BrowserRouter`. When deployed to GitHub Pages:

1. **Direct route access fails**: Accessing any route other than the root (e.g., `/uki-pune-workday/about`) returns a 404 from GitHub Pages because there's no physical file at that path.
2. **Asset paths**: Some meta tags were using absolute paths without considering the base path.

## Solution
Implemented the standard SPA GitHub Pages solution using redirect scripts:

### 1. Created `public/404.html`
- Intercepts all 404 requests from GitHub Pages
- Converts the path and query string into URL parameters
- Redirects to `index.html` with encoded route information
- Uses `pathSegmentsToKeep = 1` to preserve the `/uki-pune-workday/` base path

### 2. Updated `index.html`
- Added redirect handler script that runs before React loads
- Decodes the URL parameters from 404.html redirect
- Restores the original route using `history.replaceState`
- Fixed OG image meta tags to use relative paths (`./og-image.png`)

### 3. Added Automated Testing
- Created `scripts/test-gh-pages-build.js` to verify:
  - ✅ Both 404.html and index.html exist
  - ✅ All asset paths use correct base path (`/uki-pune-workday/`)
  - ✅ SPA redirect scripts are present
  - ✅ pathSegmentsToKeep is correctly configured
- Added `npm run test:gh-pages` script
- Integrated test into CI/CD workflow

### 4. Updated CI/CD
- Added test step after build in `.github/workflows/deploy.yml`
- Ensures build output is always verified before deployment

## How It Works

```
User visits: https://danstuartdept.github.io/uki-pune-workday/some-route
    ↓
GitHub Pages: "No file at /uki-pune-workday/some-route"
    ↓
Serves: 404.html
    ↓
404.html script: Converts path to parameters
    ↓
Redirects to: /uki-pune-workday/?/some-route
    ↓
index.html loads
    ↓
index.html script: Decodes ?/some-route and restores to /uki-pune-workday/some-route
    ↓
React Router: Routes correctly to the component
```

## Files Changed

- **`index.html`** - Added SPA redirect handler, fixed OG image paths
- **`public/404.html`** - New file for GitHub Pages 404 handling
- **`package.json`** - Added `test:gh-pages` script
- **`.github/workflows/deploy.yml`** - Added automated test step
- **`scripts/test-gh-pages-build.js`** - New automated verification script

## Verification

Run the following to verify the build:

```bash
npm run build
npm run test:gh-pages
```

Expected output:
```
✓ All tests passed!
The build is ready for GitHub Pages deployment.
```

## References

This solution is based on the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) approach, which is a widely-used pattern for deploying SPAs to GitHub Pages.

## Testing Locally

To test the production build locally:

```bash
npm run build
npx serve -s dist
```

Then navigate to `http://localhost:3000` (note: without the base path, as serve handles routing differently).

For testing with the exact base path:

```bash
npm run build
cd dist
python3 -m http.server 8080
```

Then navigate to `http://localhost:8080/uki-pune-workday/` (must include trailing slash).
