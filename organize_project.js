/**
 * organize_project.js
 * Run this script with Node.js to reorganize the project structure into a cleaner, nested format.
 * Usage: node organize_project.js
 */

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// Configuration: Files to move and their specific destinations
const moves = {
    'js/components': [
        'navbar.js', 
        'footer.js', 
        'whatsapp.js', 
        'product_cards.js', 
        'product_renderer.js'
    ],
    'js/core': [
        'router.js', 
        'cart.js', 
        'compare.js', 
        'search.js'
    ],
    'js/data': [
        'product_data.js',
        'chatbot.js'
    ],
    'js/config': [
        'tailwind-config.js'
    ],
    'css': [
        'style.css'
    ],
    'scripts': [
        'add_meta_tags.js',
        'check_share_config.js',
        'convert_images.js',
        'generate_product_pages.js',
        'generate_sitemap.js',
        'setup_hooks.js'
    ]
};

// Helper to find and move file
function findAndMoveFile(fileName, targetDir) {
    // Possible locations where the file might currently be
    const possiblePaths = [
        path.join(rootDir, fileName),                // Root
        path.join(rootDir, 'js', fileName),          // Previous js/ folder
        path.join(rootDir, 'Product_details', fileName) // Edge case
    ];

    const targetPath = path.join(rootDir, targetDir, fileName);

    if (fs.existsSync(targetPath)) {
        console.log(`Skipped: ${fileName} (already in ${targetDir})`);
        return;
    }

    for (const currentPath of possiblePaths) {
        if (fs.existsSync(currentPath)) {
            // Create target directory if it doesn't exist
            if (!fs.existsSync(path.join(rootDir, targetDir))) {
                fs.mkdirSync(path.join(rootDir, targetDir), { recursive: true });
            }

            fs.renameSync(currentPath, targetPath);
            console.log(`Moved: ${fileName} -> ${targetDir}/${fileName}`);
            return; // Stop after moving
        }
    }
    console.warn(`Warning: Could not find ${fileName}`);
}

// 1. Perform Moves
console.log('--- Moving Files ---');
for (const [dir, files] of Object.entries(moves)) {
    files.forEach(file => findAndMoveFile(file, dir));
}

// 2. Update HTML References
console.log('\n--- Updating HTML References ---');

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateHtmlContent(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    const isRoot = !filePath.includes('Product_details') && !filePath.includes('Service_details');
    const prefix = isRoot ? '' : '../';

    // Iterate through all move configurations
    for (const [dir, files] of Object.entries(moves)) {
        files.forEach(file => {
            // Regex to match src="..." or href="..." containing the filename
            // It captures the attribute (src/href) and ignores the old path prefix
            // Example matches: src="navbar.js", src="js/navbar.js", src="../js/navbar.js"
            const regex = new RegExp(`(src|href)=["']([^"']*/)?${escapeRegExp(file)}["']`, 'g');
            
            if (regex.test(content)) {
                // Replace with new path: src="prefix/dir/file"
                // e.g., src="../js/components/navbar.js"
                const newPath = `${prefix}${dir}/${file}`;
                content = content.replace(regex, `$1="${newPath}"`);
                updated = true;
            }
        });
    }

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${path.relative(rootDir, filePath)}`);
    }
}

function scanAndFixHtml(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'js' && file !== 'css' && file !== 'Assets') {
                scanAndFixHtml(fullPath);
            }
        } else if (file.endsWith('.html')) {
            updateHtmlContent(fullPath);
        }
    });
}

scanAndFixHtml(rootDir);

// 3. Update CSS Assets Paths
console.log('\n--- Updating CSS Paths ---');
const cssPath = path.join(rootDir, 'css', 'style.css');
if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    // Replace url('Assets/...') with url('../Assets/...')
    // Avoid double replacing if run multiple times by checking if it starts with ../
    cssContent = cssContent.replace(/url\((['"])Assets\//g, "url($1../Assets/");
    fs.writeFileSync(cssPath, cssContent, 'utf8');
    console.log('Updated: css/style.css asset paths');
}

// 4. Update Scripts Paths
console.log('\n--- Updating Script Paths ---');
const scriptPath = path.join(rootDir, 'scripts', 'convert_images.js');
if (fs.existsSync(scriptPath)) {
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    // Update Assets path to be relative to the new script location or use process.cwd()
    // Changing path.join(__dirname, 'Assets') to path.join(__dirname, '../Assets')
    scriptContent = scriptContent.replace(/path\.join\(__dirname,\s*['"]Assets['"]\)/, "path.join(__dirname, '../Assets')");
    fs.writeFileSync(scriptPath, scriptContent, 'utf8');
    console.log('Updated: scripts/convert_images.js asset path');
}

console.log('\n--- Organization Complete! ---');
