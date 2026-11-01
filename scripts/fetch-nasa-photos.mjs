import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = 'c:/Users/Osmar Jesús/Documents/Antigravity Contenido/codice-anomalo-studio/public/photos';

const nasaQueries = [
  { q: 'deep space webb telescope galaxy', name: 'photo_nasa_webb_deep_space.jpg' },
  { q: 'arecibo radio telescope dish', name: 'photo_arecibo_dish_space.jpg' },
  { q: 'saturn rings cassini spacecraft', name: 'photo_nasa_saturn_rings.jpg' },
  { q: 'black hole accretion disk simulation', name: 'photo_nasa_blackhole_accretion.jpg' },
  { q: 'earth at night from space ISS city lights', name: 'photo_nasa_earth_night_lights.jpg' }
];

async function fetchNasa() {
  for (const item of nasaQueries) {
    try {
      const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(item.q)}&media_type=image`;
      const res = await fetch(url);
      const json = await res.json();
      const firstItem = json.collection?.items?.[0];
      if (firstItem && firstItem.links?.[0]?.href) {
        const imgUrl = firstItem.links[0].href;
        const imgRes = await fetch(imgUrl);
        const arrayBuf = await imgRes.arrayBuffer();
        const buf = Buffer.from(arrayBuf);
        
        await sharp(buf)
          .resize(1080, 780, { fit: 'cover' })
          .jpeg({ quality: 90 })
          .toFile(path.join(outDir, item.name));
        console.log(`Fetched NASA: ${item.name}`);
      }
    } catch (e) {
      console.error(`Error fetching ${item.name}:`, e.message);
    }
  }
}

fetchNasa();
