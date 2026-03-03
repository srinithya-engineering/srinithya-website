/**
 * generate_product_pages.js
 * 
 * Generates individual HTML files for each product to support specific Open Graph images
 * for WhatsApp/Facebook sharing.
 * 
 * Output: Product_details/share/{product-slug}.html
 * 
 * Usage: node scripts/generate_product_pages.js [domain]
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 1. Configuration
const args = process.argv.slice(2);
const DOMAIN = args[0] ? args[0].replace(/\/$/, '') : 'https://srinithyaepl.in';
const OUTPUT_DIR = path.join(__dirname, '../Product_details/share');

// Mapping from Data Category to HTML Filename
const CATEGORY_MAP = {
    'bar-bending-models': 'bar_bending_models.html',
    'bar-cutting-models': 'bar_cutting_models.html',
    'concrete-mixer-models': 'concrete_mixer_models.html',
    'concrete-pouring-buckets': 'concrete_mixer_models.html',
    'dewatering-pump': 'dewatering_pump.html',
    'handy-vibration-models': 'handy_vibration_models.html',
    'high-frequency-converter-models': 'high_frequency_converter_models.html',
    'high-frequency-poker-models': 'high_frequency_poker_models.html',
    'industrial-cutting-tools': 'industrial_cutting_tools.html',
    'mechanical-poker-models': 'mechanical_poker_models.html',
    'mini-lift-models': 'mini_lift_models.html',
    'plate-compactor-models': 'plate_compactor_models.html',
    'portable-bar-processing-models': 'portable_bar_processing_models.html',
    'power-trowel-models': 'power_trowel_models.html',
    'road-roller-models': 'road_roller_models.html',
    'excavator-drum-compactor': 'excavator_drum_compactor.html',
    'scrap-straightener-models': 'scrap_straightener_models.html',
    'shutter-vibrator-models': 'shutter_vibrator_models.html',
    'surface-smootheners': 'surface_smootheners.html',
    'suspended-rope-platform': 'suspended_rope_platform.html',
    'vibrators': 'Vibrators.html',
    'scissor-lift-models': 'scissorlift_models.html',
    'prefabStructures': 'prefab_structures.html',
    'civic-utility-products': 'civic_utility_products.html',
    'repair-services': '../Service_details/repair_services.html',
    'rental-services': '../Service_details/rental_equipment.html',
    'maintenance-services': '../Service_details/maintenance_services.html'
};

// 2. Load Product Data
const dataPath = path.join(__dirname, '../js/data/product_data.js');
const code = fs.readFileSync(dataPath, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const productData = sandbox.window.productData;

// 3. Helper to Flatten Products
function flattenProducts(data) {
    let all = [];
    for (const [category, items] of Object.entries(data)) {
        if (Array.isArray(items)) {
            items.forEach(item => {
                item._categoryKey = category;
                all.push(item);
            });
        } else if (typeof items === 'object' && items !== null) {
            for (const [subCat, subItems] of Object.entries(items)) {
                if (Array.isArray(subItems)) {
                    subItems.forEach(item => {
                        item._categoryKey = category;
                        all.push(item);
                    });
                }
            }
        }
    }
    return all;
}

// 4. Generate Files
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const products = flattenProducts(productData);
console.log(`Found ${products.length} products. Generating share pages...`);

products.forEach(p => {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const fileName = `${slug}.html`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    
    // Resolve Image
    let imageUrl = p.image;
    if (imageUrl && !imageUrl.startsWith('http')) {
        // Convert relative path (./Assets/...) to absolute domain path
        const cleanPath = imageUrl.replace(/^(\.\/|\.\.\/)/, '');
        imageUrl = `${DOMAIN}/${cleanPath}`;
    } else if (!imageUrl) {
        imageUrl = `${DOMAIN}/Assets/Others/logo.png`;
    }

    // Resolve Redirect URL
    const parentFile = CATEGORY_MAP[p._categoryKey] || 'index.html';
    // If parentFile starts with ../, it's in Service_details, otherwise Product_details
    const redirectUrl = parentFile.startsWith('../') 
        ? `${DOMAIN}/${parentFile.replace('../', '')}#${slug}`
        : `${DOMAIN}/Product_details/${parentFile}#${slug}`;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${p.name} | Srinithya Engineering</title>
    <meta property="og:title" content="${p.name}">
    <meta property="og:description" content="${p.description || 'Check out this product from Srinithya Engineering'}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:url" content="${redirectUrl}">
    <meta property="og:type" content="product">
    <script>window.location.replace("${redirectUrl}");</script>
</head>
<body>
    <p>Redirecting to <a href="${redirectUrl}">${p.name}</a>...</p>
</body>
</html>`;

    fs.writeFileSync(filePath, htmlContent);
});

console.log(`Successfully generated ${products.length} share pages in ${OUTPUT_DIR}`);