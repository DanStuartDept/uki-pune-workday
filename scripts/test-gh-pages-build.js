#!/usr/bin/env node

/**
 * Simple test to verify GitHub Pages deployment assets
 * This script checks that all asset paths in index.html use the correct base path
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

// Expected base path for GitHub Pages
const BASE_PATH = '/uki-pune-workday/';

console.log('Testing GitHub Pages deployment build...\n');

let errors = 0;

// Test 1: Check if 404.html exists
console.log('Test 1: Checking for 404.html...');
if (fs.existsSync(notFoundPath)) {
  console.log('✓ 404.html exists');
} else {
  console.error('✗ 404.html is missing - required for SPA routing on GitHub Pages');
  errors++;
}

// Test 2: Check if index.html exists
console.log('\nTest 2: Checking for index.html...');
if (!fs.existsSync(indexPath)) {
  console.error('✗ index.html is missing');
  errors++;
  process.exit(1);
}
console.log('✓ index.html exists');

// Test 3: Check asset paths in index.html
console.log('\nTest 3: Checking asset paths in index.html...');
const indexContent = fs.readFileSync(indexPath, 'utf-8');

// Check for script tags with correct base path
const scriptRegex = /<script[^>]*src="([^"]+)"/g;
let match;
while ((match = scriptRegex.exec(indexContent)) !== null) {
  const src = match[1];
  if (src.startsWith('/') && !src.startsWith(BASE_PATH) && !src.startsWith('//')) {
    console.error(`✗ Script tag uses incorrect path: ${src}`);
    console.error(`  Expected path to start with: ${BASE_PATH}`);
    errors++;
  } else if (src.startsWith(BASE_PATH)) {
    console.log(`✓ Script tag uses correct base path: ${src}`);
  }
}

// Check for link tags (CSS) with correct base path
const linkRegex = /<link[^>]*href="([^"]+)"/g;
while ((match = linkRegex.exec(indexContent)) !== null) {
  const href = match[1];
  if (href.startsWith('/') && !href.startsWith(BASE_PATH) && !href.startsWith('//')) {
    console.error(`✗ Link tag uses incorrect path: ${href}`);
    console.error(`  Expected path to start with: ${BASE_PATH}`);
    errors++;
  } else if (href.startsWith(BASE_PATH)) {
    console.log(`✓ Link tag uses correct base path: ${href}`);
  }
}

// Test 4: Check for SPA redirect script
console.log('\nTest 4: Checking for SPA redirect script...');
if (indexContent.includes('Single Page Apps for GitHub Pages')) {
  console.log('✓ SPA redirect script is present in index.html');
} else {
  console.error('✗ SPA redirect script is missing from index.html');
  errors++;
}

// Test 5: Check 404.html has redirect script
console.log('\nTest 5: Checking 404.html redirect script...');
const notFoundContent = fs.readFileSync(notFoundPath, 'utf-8');
if (notFoundContent.includes('Single Page Apps for GitHub Pages')) {
  console.log('✓ SPA redirect script is present in 404.html');
} else {
  console.error('✗ SPA redirect script is missing from 404.html');
  errors++;
}

// Test 6: Verify pathSegmentsToKeep is set correctly
console.log('\nTest 6: Checking pathSegmentsToKeep configuration...');
const pathSegmentsMatch = notFoundContent.match(/pathSegmentsToKeep\s*=\s*(\d+)/);
if (pathSegmentsMatch && pathSegmentsMatch[1] === '1') {
  console.log('✓ pathSegmentsToKeep is correctly set to 1');
} else {
  console.error('✗ pathSegmentsToKeep is not set to 1 in 404.html');
  console.error('  This should be 1 for GitHub Project Pages');
  errors++;
}

// Summary
console.log('\n' + '='.repeat(50));
if (errors === 0) {
  console.log('✓ All tests passed!');
  console.log('The build is ready for GitHub Pages deployment.');
  process.exit(0);
} else {
  console.error(`✗ ${errors} test(s) failed!`);
  console.error('Please fix the issues before deploying.');
  process.exit(1);
}
