const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../client/public/assets/generated_images');

// Get all PNG images
const files = fs.readdirSync(imagesDir).filter(file => file.endsWith('.png'));

console.log(`Converting ${files.length} PNG images to WebP...\n`);

files.forEach(async (file) => {
  const inputPath = path.join(imagesDir, file);
  const outputPath = path.join(imagesDir, file.replace('.png', '.webp'));

  const inputStats = fs.statSync(inputPath);

  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log(`✓ ${file}`);
    console.log(`  ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (${savings}% smaller)\n`);
  } catch (error) {
    console.error(`✗ Error converting ${file}:`, error.message);
  }
});
