import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const dir = 'C:/Users/Osmar Jesús/.gemini/antigravity/brain/2af31e2c-886d-4638-b124-9f72db08fe52/scratch/gdrive_instagram/imgs';
const outDir = 'c:/Users/Osmar Jesús/Documents/Antigravity Contenido/codice-anomalo-studio/public/photos';

await fs.mkdir(outDir, { recursive: true });

const crops = [
  { file: 'IMG_0515.png', name: 'archetype_traselvelo_biolab.jpg', top: 600, height: 950 },
  { file: 'IMG_0516.png', name: 'archetype_consciente_grinberg_top.jpg', top: 450, height: 650 },
  { file: 'IMG_0516.png', name: 'archetype_consciente_grinberg_bottom.jpg', top: 1250, height: 660 },
  { file: 'IMG_0518.png', name: 'archetype_dnotici_satellite_reentry.jpg', top: 400, height: 950 },
  { file: 'IMG_0534.png', name: 'archetype_ingenia_pichai_ai.jpg', top: 500, height: 950 },
  { file: 'IMG_0535.png', name: 'evidence_ingenia_lab_quantum.jpg', top: 750, height: 750 },
  { file: 'IMG_0536.png', name: 'evidence_ingenia_server_rack.jpg', top: 750, height: 750 },
  { file: 'IMG_0539.png', name: 'archetype_tecnologia_bionic_eye.jpg', top: 400, height: 950 },
  { file: 'IMG_0540.png', name: 'archetype_locos_quantum_cell.jpg', top: 450, height: 950 },
  { file: 'IMG_0545.png', name: 'archetype_ciencia_earth_orbit.jpg', top: 450, height: 950 },
  { file: 'IMG_0550.png', name: 'archetype_evoluciona_hourglass_time.jpg', top: 380, height: 950 },
  { file: 'IMG_0551.png', name: 'archetype_saturn_blackhole_split.jpg', top: 450, height: 900 }
];

for (const c of crops) {
  try {
    const src = path.join(dir, c.file);
    const dest = path.join(outDir, c.name);
    await sharp(src)
      .extract({ left: 0, top: c.top, width: 1170, height: c.height })
      .resize(1080, Math.round(c.height * (1080 / 1170)), { fit: 'cover' })
      .jpeg({ quality: 90 })
      .toFile(dest);
    console.log(`Extracted ${c.name}`);
  } catch (err) {
    console.error(`Error extracting ${c.name}:`, err.message);
  }
}
