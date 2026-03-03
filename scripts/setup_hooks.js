/**
 * setup_hooks.js
 * 
 * Installs a git pre-commit hook to automatically run generation scripts
 * before every commit.
 * 
 * Usage: node scripts/setup_hooks.js
 */
const fs = require('fs');
const path = require('path');

const hookScript = `#!/bin/sh
# Auto-generated pre-commit hook by scripts/setup_hooks.js

echo "⚡ Running pre-commit build scripts..."

# 1. Generate Product Share Pages (for WhatsApp/OG tags)
if [ -f "scripts/generate_product_pages.js" ]; then
    echo "  - Generating product share pages..."
    node scripts/generate_product_pages.js
    # Add the generated files to the commit
    git add Product_details/share/
fi

# 2. Generate Sitemap
if [ -f "scripts/generate_sitemap.js" ]; then
    echo "  - Generating sitemap..."
    node scripts/generate_sitemap.js
    # Add the sitemap to the commit
    git add sitemap.xml
fi

echo "✅ Pre-commit tasks completed."
`;

const gitDir = path.join(__dirname, '..', '.git');
const hooksDir = path.join(gitDir, 'hooks');
const hookPath = path.join(hooksDir, 'pre-commit');

if (!fs.existsSync(gitDir)) {
    console.error('❌ Error: .git directory not found. Please ensure this is a git repository.');
    process.exit(1);
}

if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
}

fs.writeFileSync(hookPath, hookScript);
fs.chmodSync(hookPath, '755'); // Make executable (rwxr-xr-x)

console.log('✅ Git pre-commit hook installed successfully!');
console.log('The following scripts will now run automatically before every commit:');
console.log(' - scripts/generate_product_pages.js');
console.log(' - scripts/generate_sitemap.js');