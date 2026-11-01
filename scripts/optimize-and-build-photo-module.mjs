import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const photosDir = 'c:/Users/Osmar Jesús/Documents/Antigravity Contenido/codice-anomalo-studio/public/photos';
const outputJsPath = 'c:/Users/Osmar Jesús/Documents/Antigravity Contenido/codice-anomalo-studio/src/utils/photoData.js';

async function build() {
  const files = await fs.readdir(photosDir);
  const jpgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

  const photoDict = {};
  console.log(`Optimizing and encoding ${jpgFiles.length} photos...`);

  for (const f of jpgFiles) {
    const filePath = path.join(photosDir, f);
    const key = path.parse(f).name;

    // Optimize to width 1080px, quality 85 JPEG
    const optimizedBuffer = await sharp(filePath)
      .resize(1080, null, { withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer();

    const b64 = `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`;
    photoDict[key] = b64;
    console.log(`  Encoded: ${key} (${Math.round(optimizedBuffer.length / 1024)} KB)`);
  }

  const jsContent = `// src/utils/photoData.js — Módulo de Fotografías Reales de Alta Definición Base64
// Renderizado Fotorrealista Nativo 100% para Resvg (Node.js) y Canvas (Navegador)
// Compatible con Cloudflare Workers y Cero Dependencias de Red o CORS
export const PHOTO_DATA = ${JSON.stringify(photoDict, null, 2)};

export function getPhotoDataUri(key, fallbackKey = 'photo_biolab_culture') {
  return PHOTO_DATA[key] || PHOTO_DATA[fallbackKey] || '';
}
`;

  await fs.writeFile(outputJsPath, jsContent, 'utf8');
  const stat = await fs.stat(outputJsPath);
  console.log(`✅ photoData.js generated successfully! Total module size: ${Math.round(stat.size / 1024)} KB`);
}

build().catch(console.error);
