import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

async function inspect() {
  const dir = 'C:/Users/Osmar Jesús/.gemini/antigravity/brain/2af31e2c-886d-4638-b124-9f72db08fe52/scratch/gdrive_instagram/imgs';
  const imgPath = path.join(dir, 'IMG_0515.png');
  const meta = await sharp(imgPath).metadata();
  console.log('Metadata of IMG_0515:', meta.width, meta.height);
}

inspect();
