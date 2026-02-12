/**
 * Image Conversion Script
 * Converts PNG/JPG images in Assets folders to WebP format.
 * 
 * Usage:
 * 1. Open terminal
 * 2. Run: npm install sharp
 * 3. Run: node scripts/convert_images.js
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: "sharp" library not found.');
    console.log('Please run: npm install sharp');
    process.exit(1);
}

// Directories to scan (relative to project root)
const directories = [
    './Assets/Product Images',
    './Assets/Others',
    './Assets/Custom Icons'
];

console.log('Starting image conversion...');

directories.forEach(dir => {
    // Resolve path relative to this script file (assuming script is in /scripts folder)
    const targetDir = path.join(__dirname, '../', dir);

    if (fs.existsSync(targetDir)) {
        fs.readdir(targetDir, (err, files) => {
            if (err) return console.error(`Error reading ${targetDir}:`, err);

            files.forEach(file => {
                const ext = path.extname(file).toLowerCase();
                if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                    const name = path.basename(file, ext);
                    const inputPath = path.join(targetDir, file);
                    const outputPath = path.join(targetDir, `${name}.webp`);

                    // Only convert if WebP doesn't exist
                    if (!fs.existsSync(outputPath)) {
                        sharp(inputPath)
                            .webp({ quality: 80 }) // Balance between quality and size
                            .toFile(outputPath)
                            .then(() => console.log(`\x1b[32mConverted:\x1b[0m ${file} -> ${name}.webp`))
                            .catch(err => console.error(`\x1b[31mFailed:\x1b[0m ${file}`, err));
                    }
                }
            });
        });
    } else {
        console.warn(`\x1b[33mDirectory not found:\x1b[0m ${targetDir}`);
    }
});
