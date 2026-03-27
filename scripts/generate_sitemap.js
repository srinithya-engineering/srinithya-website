/**
 * generate_sitemap.js
 * 
 * Run this script to automatically generate a sitemap.xml file based on the 
 * HTML files present in your project structure.
 * 
 * Usage: node scripts/generate_sitemap.js
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://srinithyaepl.in';
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'sitemap.xml');

// Configuration: Directories to scan and their priority
const SCAN_CONFIG = [
    { dir: '', priority: '1.0', changefreq: 'weekly' }, // Root
    { dir: 'Product_details', priority: '0.8', changefreq: 'monthly' },
    { dir: 'Service_details', priority: '0.7', changefreq: 'monthly' }
];

// Files to exclude
const EXCLUDE_FILES = ['404.html', 'google', 'template.html'];

function getHtmlFiles(dir) {
    const fullPath = path.join(ROOT_DIR, dir);
    if (!fs.existsSync(fullPath)) return [];
    
    return fs.readdirSync(fullPath)
        .filter(file => file.endsWith('.html') && !EXCLUDE_FILES.some(ex => file.includes(ex)))
        .map(file => path.join(dir, file).replace(/\\/g, '/'));
}

function generateSitemap() {
    console.log('Generating sitemap.xml...');
    
    let urls = [];

    SCAN_CONFIG.forEach(config => {
        const files = getHtmlFiles(config.dir);
        
        files.forEach(filePath => {
            // Handle root index.html specifically
            if (filePath === 'index.html') {
                urls.push({
                    loc: `${DOMAIN}/`,
                    priority: '1.0',
                    changefreq: 'weekly'
                });
                urls.push({
                    loc: `${DOMAIN}/index.html`,
                    priority: '1.0',
                    changefreq: 'weekly'
                });
            } else {
                urls.push({
                    loc: `${DOMAIN}/${filePath}`,
                    priority: config.priority,
                    changefreq: config.changefreq
                });
            }
        });
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `   <url>
      <loc>${url.loc}</loc>
      <priority>${url.priority}</priority>
      <changefreq>${url.changefreq}</changefreq>
   </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(OUTPUT_FILE, sitemapContent);
    console.log(`Sitemap generated successfully at: ${OUTPUT_FILE}`);
    console.log(`Total URLs: ${urls.length}`);
}

generateSitemap();