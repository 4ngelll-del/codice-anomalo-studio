import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const dir = 'C:/Users/Osmar Jesús/.gemini/antigravity/brain/2af31e2c-886d-4638-b124-9f72db08fe52/scratch/gdrive_instagram/imgs';
const outDir = 'c:/Users/Osmar Jesús/Documents/Antigravity Contenido/codice-anomalo-studio/public/photos';

const preciseCrops = [
  // 1. Biolab Cell Culture (IMG_0515 @traselveloreal)
  { file: 'IMG_0515.png', name: 'photo_biolab_culture.jpg', top: 570, height: 780 },
  { file: 'IMG_0515.png', name: 'archetype_traselvelo_biolab.jpg', top: 570, height: 780 },

  // 2. Jacobo Grinberg & Syntergic Portal (IMG_0516 @consciente)
  { file: 'IMG_0516.png', name: 'photo_grinberg_portrait_syntergic.jpg', top: 450, height: 540 },
  { file: 'IMG_0516.png', name: 'photo_grinberg_candle_portal.jpg', top: 1380, height: 530 },

  // 3. NASA Satellite Fiery Reentry (IMG_0518 @dnotici)
  { file: 'IMG_0518.png', name: 'photo_nasa_satellite_reentry.jpg', top: 500, height: 780 },
  { file: 'IMG_0518.png', name: 'archetype_dnotici_satellite_reentry.jpg', top: 500, height: 780 },

  // 4. Sundar Pichai / AI Executive (IMG_0534 @ingenia.ai)
  { file: 'IMG_0534.png', name: 'photo_ai_executive_editorial.jpg', top: 520, height: 760 },
  { file: 'IMG_0534.png', name: 'archetype_ingenia_pichai_ai.jpg', top: 520, height: 760 },

  // 5. Quantum Lab Inner Evidence (IMG_0535)
  { file: 'IMG_0535.png', name: 'photo_evidence_quantum_lab.jpg', top: 820, height: 520 },
  { file: 'IMG_0535.png', name: 'evidence_ingenia_lab_quantum.jpg', top: 820, height: 520 },

  // 6. Datacenter Server Racks (IMG_0536)
  { file: 'IMG_0536.png', name: 'photo_evidence_datacenter_servers.jpg', top: 820, height: 520 },
  { file: 'IMG_0536.png', name: 'evidence_ingenia_server_rack.jpg', top: 820, height: 520 },

  // 7. Bionic Cyber Eye / Iris Macro (IMG_0539 @tecnologia)
  { file: 'IMG_0539.png', name: 'photo_tech_cyber_eye.jpg', top: 480, height: 780 },
  { file: 'IMG_0539.png', name: 'archetype_tecnologia_bionic_eye.jpg', top: 480, height: 780 },

  // 8. 3D Glowing Quantum Core (IMG_0540 @locos.por.la.fisica)
  { file: 'IMG_0540.png', name: 'photo_quantum_core_3d.jpg', top: 520, height: 780 },
  { file: 'IMG_0540.png', name: 'archetype_locos_quantum_cell.jpg', top: 520, height: 780 },

  // 9. Earth Orbit Satellite Photography (IMG_0545 @desde_la_ciencia)
  { file: 'IMG_0545.png', name: 'photo_earth_orbit_satellite.jpg', top: 500, height: 780 },
  { file: 'IMG_0545.png', name: 'archetype_ciencia_earth_orbit.jpg', top: 500, height: 780 },

  // 10. Cinematic Hourglass on Wet Street (IMG_0550 @mentalidadexitosa_)
  { file: 'IMG_0550.png', name: 'photo_hourglass_time_dilation.jpg', top: 460, height: 760 },
  { file: 'IMG_0550.png', name: 'archetype_evoluciona_hourglass_time.jpg', top: 460, height: 760 },

  // 11. Black Hole & Bubble Universes Split (IMG_0551 @kingxitytv)
  { file: 'IMG_0551.png', name: 'photo_blackhole_multiverse_split.jpg', top: 500, height: 760 },
  { file: 'IMG_0551.png', name: 'archetype_saturn_blackhole_split.jpg', top: 500, height: 760 }
];

for (const c of preciseCrops) {
  try {
    const src = path.join(dir, c.file);
    const dest = path.join(outDir, c.name);
    await sharp(src)
      .extract({ left: 0, top: c.top, width: 1170, height: c.height })
      .resize(1080, Math.round(c.height * (1080 / 1170)), { fit: 'cover' })
      .jpeg({ quality: 92 })
      .toFile(dest);
    console.log(`Precise cropped: ${c.name}`);
  } catch (err) {
    console.error(`Error with ${c.name}:`, err.message);
  }
}
console.log('✅ All pure photographic assets extracted cleanly!');
