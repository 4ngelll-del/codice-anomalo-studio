// scripts/rebuild-clean-original-assets.mjs
// Genera photoData.js a partir de activos 100% originales (IA personalizada) y archivos de dominio público (NASA, Wikimedia)
// CERO pantallazos de Instagram, CERO plagio, CERO marcas de agua, CERO elementos de interfaz ajena.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PHOTOS_DIR = path.resolve('public/photos');
const OUTPUT_JS = path.resolve('src/utils/photoData.js');

const CLEAN_FILES = [
  { key: 'photo_organoid_biocomputer', file: 'original_organoid_biocomputer.jpg', width: 1080, height: 1350 },
  { key: 'photo_grinberg_syntergic', file: 'original_grinberg_syntergic_lab.jpg', width: 1080, height: 1350 },
  { key: 'photo_datacenter_servers', file: 'clean_datacenter_servers.jpg', width: 1080, height: 720 },
  { key: 'photo_electron_microscope', file: 'clean_scientific_electron_microscope.jpg', width: 1080, height: 720 },
  { key: 'photo_deep_space_antenna', file: 'clean_deep_space_antenna.jpg', width: 1080, height: 720 },
  { key: 'photo_nasa_blackhole', file: 'clean_nasa_blackhole.jpg', width: 1080, height: 720 },
  { key: 'photo_nasa_saturn', file: 'clean_nasa_saturn.jpg', width: 1080, height: 720 },
  { key: 'photo_nasa_deep_field', file: 'clean_nasa_deep_field.jpg', width: 1080, height: 720 },
  { key: 'photo_nasa_earth_aurora', file: 'clean_nasa_earth_aurora.jpg', width: 1080, height: 720 },
  { key: 'photo_nasa_earth_night', file: 'clean_nasa_earth_night.jpg', width: 1080, height: 720 },
  { key: 'photo_astronaut_spacewalk', file: 'clean_astronaut_spacewalk.jpg', width: 1080, height: 720 },
  { key: 'photo_hourglass_time', file: 'clean_hourglass_time.jpg', width: 1080, height: 720 },
  { key: 'photo_underground_cave', file: 'clean_underground_cave.jpg', width: 1080, height: 720 },
  { key: 'photo_human_eye_macro', file: 'clean_human_eye_macro.jpg', width: 720, height: 720 }
];

async function main() {
  console.log('🔄 Optimizando activos 100% limpios y originales...');
  const photoMap = {};

  for (const item of CLEAN_FILES) {
    const filePath = path.join(PHOTOS_DIR, item.file);
    try {
      const buffer = await sharp(filePath)
        .resize({ width: item.width, height: item.height, fit: 'cover' })
        .jpeg({ quality: 84, progressive: true })
        .toBuffer();

      const b64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      photoMap[item.key] = b64;
      console.log(`✅ ${item.key} (${item.file}) -> ${(buffer.length / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`❌ Error procesando ${item.file}:`, err.message);
    }
  }

  // Generar compatibilidad con alias viejos para que nunca falte una clave
  photoMap['photo_biolab_culture'] = photoMap['photo_organoid_biocomputer'];
  photoMap['archetype_traselvelo_biolab'] = photoMap['photo_organoid_biocomputer'];
  photoMap['photo_ai_executive_editorial'] = photoMap['photo_organoid_biocomputer'];
  photoMap['archetype_ingenia_pichai_ai'] = photoMap['photo_organoid_biocomputer'];
  photoMap['photo_grinberg_portrait_syntergic'] = photoMap['photo_grinberg_syntergic'];
  photoMap['photo_grinberg_candle_portal'] = photoMap['photo_grinberg_syntergic'];
  photoMap['archetype_consciente_grinberg_top'] = photoMap['photo_grinberg_syntergic'];
  photoMap['archetype_consciente_grinberg_bottom'] = photoMap['photo_grinberg_syntergic'];
  photoMap['photo_nasa_satellite_reentry'] = photoMap['photo_deep_space_antenna'];
  photoMap['archetype_dnotici_satellite_reentry'] = photoMap['photo_deep_space_antenna'];
  photoMap['photo_evidence_datacenter_servers'] = photoMap['photo_datacenter_servers'];
  photoMap['evidence_ingenia_server_rack'] = photoMap['photo_datacenter_servers'];
  photoMap['photo_evidence_quantum_lab'] = photoMap['photo_electron_microscope'];
  photoMap['evidence_ingenia_lab_quantum'] = photoMap['photo_electron_microscope'];
  photoMap['photo_hourglass_time_dilation'] = photoMap['photo_hourglass_time'];
  photoMap['archetype_evoluciona_hourglass_time'] = photoMap['photo_hourglass_time'];
  photoMap['photo_nasa_saturn_rings'] = photoMap['photo_nasa_saturn'];
  photoMap['photo_blackhole_multiverse_split'] = photoMap['photo_nasa_blackhole'];
  photoMap['archetype_saturn_blackhole_split'] = photoMap['photo_nasa_blackhole'];
  photoMap['photo_earth_orbit_satellite'] = photoMap['photo_nasa_earth_aurora'];
  photoMap['archetype_ciencia_earth_orbit'] = photoMap['photo_nasa_earth_aurora'];
  photoMap['photo_nasa_earth_night_lights'] = photoMap['photo_nasa_earth_night'];
  photoMap['photo_tech_cyber_eye'] = photoMap['photo_human_eye_macro'];
  photoMap['archetype_tecnologia_bionic_eye'] = photoMap['photo_human_eye_macro'];
  photoMap['photo_quantum_core_3d'] = photoMap['photo_electron_microscope'];
  photoMap['archetype_locos_quantum_cell'] = photoMap['photo_electron_microscope'];

  const fileContent = `// src/utils/photoData.js
// Activos fotográficos 100% ORIGINALES de alta definición para Códice Anómalo Studio
// CERO plagio, CERO pantallazos de Instagram, CERO elementos de interfaz ajena.
// Fuentes: Generación IA propia y Archivos de Dominio Público NASA / Wikimedia Commons.

export const PHOTO_DATA = ${JSON.stringify(photoMap, null, 2)};

export function getPhotoDataUri(key, fallbackKey = 'photo_organoid_biocomputer') {
  if (PHOTO_DATA[key]) return PHOTO_DATA[key];
  if (fallbackKey && PHOTO_DATA[fallbackKey]) return PHOTO_DATA[fallbackKey];
  return PHOTO_DATA['photo_organoid_biocomputer'] || '';
}
`;

  await fs.writeFile(OUTPUT_JS, fileContent, 'utf8');
  console.log(`🎉 Módulo generado con éxito: ${OUTPUT_JS} (${(fileContent.length / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch(console.error);
