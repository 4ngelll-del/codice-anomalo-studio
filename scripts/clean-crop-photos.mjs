import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const dir = 'C:/Users/Osmar Jesús/.gemini/antigravity/brain/2af31e2c-886d-4638-b124-9f72db08fe52/scratch/gdrive_instagram/imgs';
const outDir = 'c:/Users/Osmar Jesús/Documents/Antigravity Contenido/codice-anomalo-studio/public/photos';

await fs.mkdir(outDir, { recursive: true });

// Pure photo crops: start after the IG header bar (around y=560) and height ~780
const pureCrops = [
  // 1. Lab / Culture / Organoid (for TECH_IA and Biolabs)
  { file: 'IMG_0515.png', name: 'photo_biolab_culture.jpg', top: 580, height: 750 },
  // 2. Jacobo Grinberg & Syntergic Portal (for MISTERIOS & CONSCIENTE)
  { file: 'IMG_0516.png', name: 'photo_grinberg_portrait_syntergic.jpg', top: 480, height: 580 },
  { file: 'IMG_0516.png', name: 'photo_grinberg_candle_portal.jpg', top: 1350, height: 580 },
  // 3. NASA Satellite Reentry (for ESPACIO & DNOTICI)
  { file: 'IMG_0518.png', name: 'photo_nasa_satellite_reentry.jpg', top: 560, height: 760 },
  // 4. Sundar Pichai / AI Executive (for INGENIA & TECH_IA)
  { file: 'IMG_0534.png', name: 'photo_ai_executive_editorial.jpg', top: 560, height: 760 },
  // 5. Quantum Lab Inner Evidence (for Inner Slides)
  { file: 'IMG_0535.png', name: 'photo_evidence_quantum_lab.jpg', top: 780, height: 550 },
  { file: 'IMG_0536.png', name: 'photo_evidence_datacenter_servers.jpg', top: 780, height: 550 },
  // 6. Bionic Iris / Tech Eye (for TECNOLOGIA_CUTOUT)
  { file: 'IMG_0539.png', name: 'photo_tech_cyber_eye.jpg', top: 560, height: 760 },
  // 7. Quantum Cell 3D Core (for LOCOS POR LA FISICA & CASOS EXTRAORDINARIOS)
  { file: 'IMG_0540.png', name: 'photo_quantum_core_3d.jpg', top: 560, height: 760 },
  // 8. Earth Orbit Satellite Photography (for CIENCIA_SATURNO_SPLIT & ESPACIO)
  { file: 'IMG_0545.png', name: 'photo_earth_orbit_satellite.jpg', top: 560, height: 760 },
  // 9. Hourglass & Time Dilation (for EVOLUCIONA_GOLD & NEUROCIENCIA)
  { file: 'IMG_0550.png', name: 'photo_hourglass_time_dilation.jpg', top: 560, height: 760 },
  // 10. Black Hole & Multiverse Bubble Cluster (for COSMOLOGIA & SPACE)
  { file: 'IMG_0551.png', name: 'photo_blackhole_multiverse_split.jpg', top: 560, height: 760 }
];

for (const c of pureCrops) {
  try {
    const src = path.join(dir, c.file);
    const dest = path.join(outDir, c.name);
    await sharp(src)
      .extract({ left: 0, top: c.top, width: 1170, height: c.height })
      .resize(1080, Math.round(c.height * (1080 / 1170)), { fit: 'cover' })
      .jpeg({ quality: 92 })
      .toFile(dest);
    console.log(`Clean cropped: ${c.name}`);
  } catch (err) {
    console.error(`Error with ${c.name}:`, err.message);
  }
}
