/**
 * Converts PNG and JPEG images in Assets to WebP format.
 *
 * Usage:
 * 1. Run: npm install sharp
 * 2. Run: node scripts/convert_images.js
 * 3. Add --delete-jpg to remove JPEG sources after their WebP files validate.
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
    sharp = require('sharp');
} catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: "sharp" library not found.');
    console.log('Please run: npm install sharp');
    process.exit(1);
}

const assetDirectory = path.resolve(__dirname, '../Assets');
const deleteJpg = process.argv.includes('--delete-jpg');

async function findImages(directory) {
    const entries = await fs.promises.readdir(directory, { withFileTypes: true });
    const nestedFiles = await Promise.all(entries.map(entry => {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) return findImages(entryPath);

        const extension = path.extname(entry.name).toLowerCase();
        return ['.png', '.jpg', '.jpeg'].includes(extension) ? [entryPath] : [];
    }));

    return nestedFiles.flat();
}

async function isValidWebp(filePath) {
    try {
        const metadata = await sharp(filePath).metadata();
        return metadata.format === 'webp';
    } catch (error) {
        return false;
    }
}

async function main() {
    if (!fs.existsSync(assetDirectory)) {
        throw new Error(`Assets directory not found: ${assetDirectory}`);
    }

    const images = await findImages(assetDirectory);
    const outputs = new Map();

    for (const imagePath of images) {
        const outputPath = path.join(path.dirname(imagePath), `${path.basename(imagePath, path.extname(imagePath))}.webp`);
        const key = outputPath.toLowerCase();
        const current = outputs.get(key);
        const extension = path.extname(imagePath).toLowerCase();

        if (!current || (extension === '.png' && path.extname(current).toLowerCase() !== '.png')) {
            outputs.set(key, imagePath);
        }
    }

    console.log('Starting image conversion...');

    for (const imagePath of outputs.values()) {
        const outputPath = path.join(path.dirname(imagePath), `${path.basename(imagePath, path.extname(imagePath))}.webp`);
        if (await isValidWebp(outputPath)) continue;

        await sharp(imagePath)
            .webp({ quality: 80 })
            .toFile(outputPath);
        console.log(`\x1b[32mConverted:\x1b[0m ${path.basename(imagePath)} -> ${path.basename(outputPath)}`);

        if (!await isValidWebp(outputPath)) {
            throw new Error(`Conversion did not produce a valid WebP file: ${outputPath}`);
        }
    }

    if (deleteJpg) {
        for (const imagePath of images) {
            if (!['.jpg', '.jpeg'].includes(path.extname(imagePath).toLowerCase())) continue;

            const outputPath = path.join(path.dirname(imagePath), `${path.basename(imagePath, path.extname(imagePath))}.webp`);
            if (!await isValidWebp(outputPath)) {
                throw new Error(`Refusing to delete JPEG without a valid WebP replacement: ${imagePath}`);
            }

            await fs.promises.unlink(imagePath);
            console.log(`\x1b[33mDeleted:\x1b[0m ${path.basename(imagePath)}`);
        }
    }

    console.log('Image conversion complete.');
}

main().catch(error => {
    console.error('\x1b[31m%s\x1b[0m', 'Image conversion failed:', error);
    process.exitCode = 1;
});
