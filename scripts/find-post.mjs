import sharp from 'sharp';
import path from 'node:path';

async function findPostArea(fileName) {
  const dir = 'C:/Users/Osmar Jesús/.gemini/antigravity/brain/2af31e2c-886d-4638-b124-9f72db08fe52/scratch/gdrive_instagram/imgs';
  const imgPath = path.join(dir, fileName);
  
  // Crop a strip in the middle to find where the Instagram top bar ends
  // Typically: status bar ~120px, header ~140px -> post starts around y=260-350, height ~1462
  const meta = await sharp(imgPath).metadata();
  console.log(`${fileName}: width=${meta.width}, height=${meta.height}`);
}

async function run() {
  await findPostArea('IMG_0515.png');
  await findPostArea('IMG_0516.png');
  await findPostArea('IMG_0534.png');
  await findPostArea('IMG_0545.png');
  await findPostArea('IMG_0550.png');
}

run();
