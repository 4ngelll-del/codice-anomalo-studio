import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

async function main() {
  const imgBuf = await sharp({
    create: { width: 400, height: 400, channels: 3, background: { r: 180, g: 40, b: 220 } }
  }).jpeg().toBuffer();

  const b64 = 'data:image/jpeg;base64,' + imgBuf.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <image href="${b64}" width="400" height="400" />
    <circle cx="200" cy="200" r="80" fill="none" stroke="#FFFFFF" stroke-width="6"/>
  </svg>`;

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();
  console.log('SUCCESS: Resvg rendered base64 photographic image! PNG bytes:', png.length);
}

main().catch(console.error);
