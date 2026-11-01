import sharp from 'sharp';

async function scanBorders(filePath) {
  const { data, info } = await sharp(filePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Scan vertical profile of row average brightness
  console.log('Image:', filePath, width, height, channels);
  for (let y = 150; y < 600; y += 20) {
    let rSum = 0, gSum = 0, bSum = 0;
    for (let x = 0; x < width; x += 10) {
      const idx = (y * width + x) * channels;
      rSum += data[idx];
      gSum += data[idx + 1];
      bSum += data[idx + 2];
    }
    const samples = width / 10;
    const avg = Math.round((rSum + gSum + bSum) / (3 * samples));
    console.log(`y=${y}: avg=${avg} (r=${Math.round(rSum/samples)}, g=${Math.round(gSum/samples)}, b=${Math.round(bSum/samples)})`);
  }
}

scanBorders('C:/Users/Osmar Jesús/.gemini/antigravity/brain/2af31e2c-886d-4638-b124-9f72db08fe52/scratch/gdrive_instagram/imgs/IMG_0515.png');
