/**
 * add_meta_tags.js
 * 
 * Scans HTML files in Product_details and Service_details directories
 * and injects Open Graph meta tags for WhatsApp/Facebook sharing.
 * 
 * Usage: node scripts/add_meta_tags.js
 */

const fs = require('fs');
const path = require('path');

// Allow passing domain as command line argument (e.g., node scripts/add_meta_tags.js https://my-ngrok-url.app)
const args = process.argv.slice(2);
const DOMAIN = args[0] ? args[0].replace(/\/$/, '') : 'https://srinithyaepl.in';
const DEFAULT_IMAGE = `${DOMAIN}/Assets/Others/logo.png`;

const DIRECTORIES = [
    path.join(__dirname, '../Product_details'),
    path.join(__dirname, '../Service_details')
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove existing Open Graph tags to allow updating/overwriting
    content = content.replace(/(\s*<!-- Open Graph \/ Facebook \/ WhatsApp -->)?(\s*<meta property="og:[^>]+>)+/g, '');

    // Extract Title from existing <title> tag
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1] : 'Srinithya Engineering';

    // Extract Description from existing meta description, or use default
    const descMatch = content.match(/<meta name="description" content="(.*?)"/i);
    const pageDesc = descMatch ? descMatch[1] : 'Manufacturer of Bar Bending/Cutting machines and Trader of Light Construction Equipment.';

    // Construct Canonical URL
    const relativePath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
    const pageUrl = `${DOMAIN}/${relativePath}`;

    const ogTags = `
    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDesc}">
    <meta property="og:image" content="${DEFAULT_IMAGE}">`;

    // Insert before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', `${ogTags}\n</head>`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${path.basename(filePath)}`);
    } else {
        console.warn(`Warning: Could not find </head> in ${path.basename(filePath)}`);
    }
}

console.log('--- Adding Open Graph Meta Tags ---');
DIRECTORIES.forEach(dir => {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        files.filter(f => f.endsWith('.html')).forEach(file => processFile(path.join(dir, file)));
    }
});
console.log('--- Done ---');