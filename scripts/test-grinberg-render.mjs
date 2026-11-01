import { Resvg } from '@resvg/resvg-js';
import { createSlideSvg } from '../src/utils/viralSlideSvg.js';
import fs from 'node:fs/promises';

async function test() {
  const sampleCarousel = {
    id: 'ca-test-1',
    title: 'LA TEORÍA SINTÉRGICA DE JACOBO GRINBERG',
    subtitle: 'El neurofisiólogo de la UNAM que investigó la matriz holográfica antes de desaparecer',
    niche: 'MISTERIOS',
    archetype: 'CONSCIENTE_RASGADO',
    dossierCode: 'EXPEDIENTE #CA-0002',
    ctaKeyword: 'GRINBERG',
    slides: [
      {
        slideNumber: 1,
        headline: 'UNA TEORÍA AFIRMA QUE JACOBO GRINBERG ESTÁ ATRAPADO EN OTRA DIMENSIÓN'
      }
    ]
  };

  const svg = createSlideSvg(sampleCarousel, sampleCarousel.slides[0]);
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } });
  const png = resvg.render().asPng();
  await fs.writeFile('scripts/test_grinberg_slide1.png', png);
  console.log('SUCCESS: Rendered real photorealistic Grinberg slide! PNG bytes:', png.length);
}

test().catch(console.error);
