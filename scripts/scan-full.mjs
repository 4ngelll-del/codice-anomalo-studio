import sharp from 'sharp';

async function scanFull(filePath) {
  const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  for (let y = 300; y < 2200; y += 100) {
    let rSum = 0, gSum = 0, bSum = 0;
    for (let x = 0; x < width; x += 10) {
      const idx = (y * width + x) * channels;
      rSum += data[idx];
      gSum += data[idx + 1];
      bSum += data[idx + 2];
    }
    const samples = width / 10;
    const avg = Math.round((rSum + gSum + bSum) / (3 * samples));
    console.log(`y=${y}: avg=${avg}`);
  }
}

scanFull('C:/Users/Osmar Jesús/.gemini/antigravity/brain/2af31e2c-886d-4638-b124-9f72db08fe52/scratch/gdrive_instagram/imgs/IMG_0515.png');
