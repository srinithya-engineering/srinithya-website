/**
 * check_share_config.js
 * Verifies that product share pages are generated and contain valid OG Image tags.
 * Usage: node scripts/check_share_config.js
 */
const fs = require('fs');
const path = require('path');

const SHARE_DIR = path.join(__dirname, '../Product_details/share');

if (!fs.existsSync(SHARE_DIR)) {
    console.error('❌ Error: Share directory not found!');
    console.error('   Run: node scripts/generate_product_pages.js');
    process.exit(1);
}

const files = fs.readdirSync(SHARE_DIR).filter(f => f.endsWith('.html'));
if (files.length === 0) {
    console.error('❌ Error: No share pages found in Product_details/share/');
    process.exit(1);
}

console.log(`✅ Found ${files.length} product share pages.`);

// Check a random file
const randomFile = files[Math.floor(Math.random() * files.length)];
const content = fs.readFileSync(path.join(SHARE_DIR, randomFile), 'utf8');

console.log(`\n🔍 Inspecting: ${randomFile}`);
const imageMatch = content.match(/<meta property="og:image" content="(.*?)">/);

if (imageMatch) {
    console.log(`   Image URL: ${imageMatch[1]}`);
    if (imageMatch[1].includes('Assets/Product')) {
        console.log('   ✅ Success: Points to a product image.');
    } else {
        console.warn('   ⚠️ Warning: Might be using default logo (check if product has image defined).');
    }
} else {
    console.error('   ❌ Error: No og:image tag found!');
}