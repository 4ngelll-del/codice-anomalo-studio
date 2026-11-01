// ============================================================================
// CÓDICE ANÓMALO STUDIO (@codice.anomalo)
// Agente 02 // Motor Fotorrealista de Renderizado Visual Viral SVG/PNG (1080x1350 4:5)
// Compatible con Navegador (Canvas/ZIP) y Node.js (@resvg/resvg-js)
// 100% FOTORREALISMO: Emplea imágenes fotográficas reales de alta definición
// Replicación milimétrica de los 7 arquetipos virales de Google Drive:
//   1. INGENIA_PURPURA       (@ingenia.ai          — IMG_0517, IMG_0534, IMG_0535, IMG_0536)
//   2. TRASELVELO_AMARILLO   (@traselveloreal      — IMG_0515)
//   3. CONSCIENTE_RASGADO    (@consciente          — IMG_0516)
//   4. DNOTICI_ROJO          (@dnotici             — IMG_0518)
//   5. TECNOLOGIA_CUTOUT     (@tecnologia          — IMG_0519, IMG_0539)
//   6. CIENCIA_SATURNO_SPLIT (@desde_la_ciencia    — IMG_0542, IMG_0545, IMG_0551)
//   7. EVOLUCIONA_GOLD       (@mentalidadexitosa_  — IMG_0550, IMG_0547)
// ============================================================================

import { getPhotoDataUri } from './photoData.js';

export const ARCHETYPE_META = {
  INGENIA_PURPURA: {
    id: 'INGENIA_PURPURA',
    name: 'Ingenia Púrpura Editorial',
    referenceHandle: '@ingenia.ai',
    referenceImages: ['IMG_0517.png', 'IMG_0534.png', 'IMG_0535.png', 'IMG_0536.png'],
    accentColor: '#C04BFF',
    secondaryColor: '#7C3AED',
    badgeLabel: 'INTELIGENCIA & CIENCIA',
    description:
      'Fotografía editorial superior con medallón circular y flecha curva, línea divisoria con sello Códice Anómalo, titular condensado Blanco + Púrpura Eléctrico e interiores con ventana fotográfica de evidencia.'
  },
  TRASELVELO_AMARILLO: {
    id: 'TRASELVELO_AMARILLO',
    name: 'Tras El Velo Amarillo Impacto',
    referenceHandle: '@traselveloreal',
    referenceImages: ['IMG_0515.png'],
    accentColor: '#FFE600',
    secondaryColor: '#F59E0B',
    badgeLabel: 'EXPEDIENTE DESCLASIFICADO',
    description:
      'Fotografía macro documental con medallón circular derecho, titular condensado gigante en Amarillo Vibrante + remate Blanco y barra inferior con línea divisoria y DESLIZA PARA VER MÁS →.'
  },
  CONSCIENTE_RASGADO: {
    id: 'CONSCIENTE_RASGADO',
    name: 'Consciente Papel Rasgado Doble Escena',
    referenceHandle: '@consciente',
    referenceImages: ['IMG_0516.png'],
    accentColor: '#DC2626',
    secondaryColor: '#38BDF8',
    badgeLabel: 'ANOMALÍA DE LA CONSCIENCIA',
    description:
      'Doble fotografía cinematográfica (superior e inferior) dividida al centro por una banda auténtica de papel blanco rasgado con sirenas de emergencia y titular Negro + Rojo.'
  },
  DNOTICI_ROJO: {
    id: 'DNOTICI_ROJO',
    name: 'DNotici Alerta Carmesí Halftone',
    referenceHandle: '@dnotici',
    referenceImages: ['IMG_0518.png'],
    accentColor: '#EF4444',
    secondaryColor: '#FACC15',
    badgeLabel: 'ALERTA CIENTÍFICA',
    description:
      'Barra vertical roja superior izquierda + marca Códice Anómalo apilada, fotografía satelital dramática y faldón inferior en degradado rojo carmesí con trama halftone y titular condensado gigante.'
  },
  TECNOLOGIA_CUTOUT: {
    id: 'TECNOLOGIA_CUTOUT',
    name: 'Tecnología Doble Cutout & Pregunta',
    referenceHandle: '@tecnologia',
    referenceImages: ['IMG_0519.png', 'IMG_0539.png'],
    accentColor: '#00F0FF',
    secondaryColor: '#3B82F6',
    badgeLabel: 'TECNOLOGÍA E IA',
    description:
      'Fotografía tecnológica con doble medallón circular superpuesto y flecha curva, etiqueta inclinada a la izquierda y gran titular en formato pregunta moderna.'
  },
  CIENCIA_SATURNO_SPLIT: {
    id: 'CIENCIA_SATURNO_SPLIT',
    name: 'Ciencia Saturno Split 50/50',
    referenceHandle: '@desde_la_ciencia / @kingxitytv',
    referenceImages: ['IMG_0542.png', 'IMG_0545.png', 'IMG_0551.png'],
    accentColor: '#D8FF3E',
    secondaryColor: '#38BDF8',
    badgeLabel: 'ASTROFÍSICA & ESPACIO',
    description:
      'Doble fotografía cósmica dividida con línea central amarilla + emblema de Saturno sobre línea blanca, barra de institución/país y titular Verde Lima/Amarillo + Blanco.'
  },
  EVOLUCIONA_GOLD: {
    id: 'EVOLUCIONA_GOLD',
    name: 'Evoluciona Dorado & Tarjeta Dossier',
    referenceHandle: '@mentalidadexitosa_ / @ia.evoluciona',
    referenceImages: ['IMG_0550.png', 'IMG_0547.png'],
    accentColor: '#D6A74A',
    secondaryColor: '#FDE047',
    badgeLabel: 'NEUROCIENCIA & TIEMPO',
    description:
      'Fotografía atmosférica hiperrealista con titular Blanco + Dorado Cálido y flecha minimalista; interiores en tarjeta de expediente redondeada con borde blanco y doble evidencia.'
  }
};

// ----------------------------------------------------------------------------
// Utilidades XML / Texto seguras para navegador y @resvg/resvg-js
// ----------------------------------------------------------------------------

export function escapeXml(value = '') {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function cleanRenderableText(text = '') {
  return String(text ?? '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function wrapLines(text = '', maxChars = 24, maxLines = 6) {
  const cleaned = cleanRenderableText(text);
  if (!cleaned) return [];
  const words = cleaned.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }

  const consumedWords = lines.join(' ').split(/\s+/).filter(Boolean).length;
  const remainingWords = words.slice(consumedWords);
  if (remainingWords.length > 0) {
    const lastLine = remainingWords.join(' ');
    if (lastLine.length <= maxChars + 6) {
      lines.push(lastLine);
    } else {
      lines.push(lastLine.slice(0, Math.max(8, maxChars - 1)).trim() + '…');
    }
  }

  return lines.slice(0, maxLines);
}

// ----------------------------------------------------------------------------
// Asignador Inteligente de Fotografías Reales de Alta Definición
// ----------------------------------------------------------------------------

export function resolvePhotoForTopic(carousel = {}, slide = {}, role = 'primary') {
  const textBlob = [
    carousel.title,
    carousel.subtitle,
    carousel.niche,
    carousel.archetype,
    carousel.topic,
    slide.headline,
    slide.body,
    slide.sceneType
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  // 1. Jacobo Grinberg / Consciencia / Portales
  if (textBlob.includes('grinberg') || textBlob.includes('sintérg') || textBlob.includes('sinterg') || textBlob.includes('chaman') || textBlob.includes('conscien')) {
    if (role === 'secondary') return getPhotoDataUri('photo_electron_microscope', 'photo_grinberg_syntergic');
    return getPhotoDataUri('photo_grinberg_syntergic');
  }

  // 2. Tiempo / Neurociencia / Memoria / Matusalén / Reloj
  if (textBlob.includes('tiempo') || textBlob.includes('2000') || textBlob.includes('reloj') || textBlob.includes('memoria') || textBlob.includes('psicól')) {
    if (role === 'secondary') return getPhotoDataUri('photo_nasa_earth_night');
    return getPhotoDataUri('photo_hourglass_time');
  }

  // 3. Biocomputadoras / Organoides / Neuronas Vivas / Células / Placas / FinalSpark
  if (textBlob.includes('organoid') || textBlob.includes('neurona') || textBlob.includes('cerebro') || textBlob.includes('biocómputo') || textBlob.includes('dishbrain') || textBlob.includes('finalspark') || textBlob.includes('xenobot')) {
    if (role === 'secondary') return getPhotoDataUri('photo_electron_microscope');
    return getPhotoDataUri('photo_organoid_biocomputer');
  }

  // 4. Cuevas / Fosas / Lagos / Movile / Ecosistemas Extremos
  if (textBlob.includes('movile') || textBlob.includes('cueva') || textBlob.includes('ácido') || textBlob.includes('natron') || textBlob.includes('kola') || textBlob.includes('abism')) {
    if (role === 'secondary') return getPhotoDataUri('photo_electron_microscope');
    return getPhotoDataUri('photo_underground_cave');
  }

  // 5. Satélites / Órbita / Reentry / Arecibo / Caída Espacial / Señales / Antenas
  if (textBlob.includes('satél') || textBlob.includes('satel') || textBlob.includes('reentry') || textBlob.includes('arecibo') || textBlob.includes('caída') || textBlob.includes('nasa') || textBlob.includes('objeto') || textBlob.includes('láser') || textBlob.includes('psyche')) {
    if (role === 'secondary') return getPhotoDataUri('photo_nasa_earth_aurora');
    return getPhotoDataUri('photo_deep_space_antenna');
  }

  // 6. Agujeros Negros / Multiverso / Boötes / Saturno / Cosmos
  if (textBlob.includes('agujero negro') || textBlob.includes('universo') || textBlob.includes('multiverso') || textBlob.includes('boötes') || textBlob.includes('bootes') || textBlob.includes('saturno') || textBlob.includes('vacío') || textBlob.includes('vacio')) {
    if (role === 'splitRight') return getPhotoDataUri('photo_nasa_saturn');
    if (role === 'secondary') return getPhotoDataUri('photo_nasa_deep_field');
    return getPhotoDataUri('photo_nasa_blackhole');
  }

  // 7. Inteligencia Artificial / Silicio / GNoME / DeepMind / Chips
  if (textBlob.includes('gnome') || textBlob.includes('deepmind') || textBlob.includes('inteligencia') || textBlob.includes('algoritmo') || textBlob.includes('silicio') || textBlob.includes('cristal') || textBlob.includes('diamante')) {
    if (role === 'secondary') return getPhotoDataUri('photo_datacenter_servers');
    return getPhotoDataUri('photo_electron_microscope');
  }

  // 8. Internet Muerto / Servidores / Ciberseguridad / Redes / Cicada
  if (textBlob.includes('internet') || textBlob.includes('bot') || textBlob.includes('cicada') || textBlob.includes('servidor') || textBlob.includes('red') || textBlob.includes('ciber')) {
    if (role === 'secondary') return getPhotoDataUri('photo_deep_space_antenna');
    return getPhotoDataUri('photo_datacenter_servers');
  }

  // Fallbacks por nicho
  if (carousel.niche === 'ESPACIO' || carousel.niche === 'COSMOLOGIA') {
    return getPhotoDataUri('photo_nasa_earth_aurora');
  }
  if (carousel.niche === 'MISTERIOS' || carousel.niche === 'INSOLITO') {
    return getPhotoDataUri('photo_underground_cave');
  }

  return getPhotoDataUri('photo_organoid_biocomputer');
}

// ----------------------------------------------------------------------------
// Elementos Gráficos de Autoridad Oficial (100% Códice Anómalo)
// ----------------------------------------------------------------------------

export function renderBrandEmblem(cx, cy, r = 22, accent = '#C04BFF', style = 'diamond') {
  if (style === 'eye') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <circle cx="0" cy="0" r="${r}" fill="#050507" stroke="#FFFFFF" stroke-width="2.4" />
        <path d="M ${-r * 0.65} 0 Q 0 ${-r * 0.55} ${r * 0.65} 0 Q 0 ${r * 0.55} ${-r * 0.65} 0 Z"
          fill="none" stroke="#FFFFFF" stroke-width="2.4" />
        <circle cx="0" cy="0" r="${r * 0.24}" fill="${accent}" />
      </g>
    `;
  }
  return `
    <g transform="translate(${cx}, ${cy})">
      <circle cx="0" cy="0" r="${r}" fill="#07080F" stroke="${accent}" stroke-width="2.2" stroke-opacity="0.9" />
      <polygon points="0,${-r * 0.70} ${r * 0.56},0 0,${r * 0.70} ${-r * 0.56},0"
        fill="none" stroke="${accent}" stroke-width="2.4" />
      <polygon points="0,${-r * 0.38} ${r * 0.30},0 0,${r * 0.38} ${-r * 0.30},0"
        fill="${accent}" fill-opacity="0.9" />
    </g>
  `;
}

export function renderEmergencySiren(cx, cy, scale = 1) {
  return `
    <g transform="translate(${cx}, ${cy}) scale(${scale})">
      <circle cx="0" cy="-6" r="46" fill="#EF4444" fill-opacity="0.25" />
      <line x1="-40" y1="-28" x2="-28" y2="-20" stroke="#EF4444" stroke-width="4.5" stroke-linecap="round" />
      <line x1="40" y1="-28" x2="28" y2="-20" stroke="#EF4444" stroke-width="4.5" stroke-linecap="round" />
      <line x1="0" y1="-46" x2="0" y2="-34" stroke="#EF4444" stroke-width="4.5" stroke-linecap="round" />
      <path d="M -24 15 L -20 -15 C -20 -28 20 -28 20 -15 L 24 15 Z" fill="url(#sirenDomeGrad)" stroke="#B91C1C" stroke-width="2" />
      <path d="M -12 9 L -10 -12 C -10 -18 0 -18 2 -12 L 0 9 Z" fill="#FCA5A5" fill-opacity="0.75" />
      <circle cx="4" cy="-2" r="7.5" fill="#FEF08A" fill-opacity="0.95" />
      <rect x="-28" y="14" width="56" height="11" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="1.8" />
      <rect x="-32" y="23" width="64" height="9" rx="4" fill="#475569" />
    </g>
  `;
}

export function renderSaturnEmblem(cx, cy, scale = 1) {
  return `
    <g transform="translate(${cx}, ${cy}) scale(${scale})">
      <circle cx="0" cy="0" r="38" fill="#000000" />
      <ellipse cx="0" cy="0" rx="36" ry="12" transform="rotate(-24)" fill="none" stroke="#64748B" stroke-width="5.5" opacity="0.6" />
      <circle cx="0" cy="0" r="18" fill="url(#saturnPlanetGrad)" stroke="#E2E8F0" stroke-width="1.8" />
      <path d="M -34 14 A 37 12 -24 0 0 34 -14" fill="none" stroke="#F8FAFC" stroke-width="4.8" stroke-linecap="round" />
      <path d="M -30 12 A 33 10 -24 0 0 30 -12" fill="none" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" />
    </g>
  `;
}

export function renderCutoutMedallion({ cx, cy, r = 160, photoKey = 'photo_tech_cyber_eye', withArrow = true, arrowSide = 'right' }) {
  const photoUri = getPhotoDataUri(photoKey, 'photo_tech_cyber_eye');

  let arrowSvg = '';
  if (withArrow) {
    if (arrowSide === 'right') {
      arrowSvg = `
        <path d="M ${r * 0.72} ${r * 0.78} Q ${r * 1.35} ${r * 0.42} ${r * 1.30} ${-r * 0.08}"
          fill="none" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round" />
        <polygon points="${r * 1.30},${-r * 0.32} ${r * 1.05},${r * 0.02} ${r * 1.55},${r * 0.04}" fill="#FFFFFF" />
      `;
    } else {
      arrowSvg = `
        <path d="M ${-r * 0.72} ${-r * 0.35} Q ${-r * 1.20} ${-r * 0.62} ${-r * 1.06} ${-r * 1.08}"
          fill="none" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" />
        <polygon points="${-r * 1.06},${-r * 1.28} ${-r * 1.28},${-r * 0.94} ${-r * 0.84},${-r * 0.94}" fill="#FFFFFF" />
      `;
    }
  }

  const clipId = `medallion-clip-${Math.round(cx)}-${Math.round(cy)}`;

  return `
    <g transform="translate(${cx}, ${cy})">
      <defs>
        <clipPath id="${clipId}">
          <circle cx="0" cy="0" r="${r}" />
        </clipPath>
      </defs>
      <!-- Sombra exterior -->
      <circle cx="0" cy="10" r="${r + 5}" fill="#000000" fill-opacity="0.65" />
      <!-- Foto real recortada en círculo -->
      <g clip-path="url(#${clipId})">
        <image href="${photoUri}" x="${-r}" y="${-r}" width="${r * 2}" height="${r * 2}" preserveAspectRatio="xMidYMid slice" />
      </g>
      <!-- Borde blanco nítido -->
      <circle cx="0" cy="0" r="${r}" fill="none" stroke="#FFFFFF" stroke-width="6.5" />
      ${arrowSvg}
    </g>
  `;
}

// ----------------------------------------------------------------------------
// Renderizadores Fotorrealistas de los 7 Arquetipos de Portada (Slide 1/5)
// ----------------------------------------------------------------------------

// 1. INGENIA_PURPURA (@ingenia.ai — IMG_0517, IMG_0534)
function renderCoverIngeniaPurpura(carousel, slide, niche) {
  const accent = '#C04BFF';
  const photoUri = resolvePhotoForTopic(carousel, slide, 'primary');
  const headline = slide.headline || carousel.title || 'DESCUBRIMIENTO CIENTÍFICO DE ALTO IMPACTO';
  const lines = wrapLines(headline.toUpperCase(), 21, 5);
  const subNiche = cleanRenderableText(niche?.name || slide.badgeText || 'Inteligencia & Ciencia');

  const fontSize = lines.length >= 5 ? 66 : 74;
  const lineHeight = Math.round(fontSize * 1.13);
  const startY = 868;

  const headlineSvg = lines
    .map((line, idx) => {
      const isPurple = idx === 0 || idx >= Math.ceil(lines.length / 2);
      const fill = isPurple ? accent : '#FFFFFF';
      return `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="${fill}" font-family="Impact, 'Arial Black', sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.5">${escapeXml(line)}</text>`;
    })
    .join('\n');

  return `
    <!-- FOTOGRAFÍA REAL SUPERIOR (0..785px) -->
    <image href="${photoUri}" x="0" y="0" width="1080" height="785" preserveAspectRatio="xMidYMid slice" />
    <!-- Gradiente multicapa de fundido a negro puro -->
    <rect x="0" y="480" width="1080" height="305" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="780" width="1080" height="570" fill="#000000" />
    <!-- Medallón circular izquierdo con micrografía electrónica y flecha blanca curva -->
    ${renderCutoutMedallion({ cx: 215, cy: 560, r: 150, photoKey: 'photo_electron_microscope', withArrow: true, arrowSide: 'right' })}
    <!-- Línea divisoria central con emblema oficial Códice Anómalo -->
    <g transform="translate(540, 736)">
      ${renderBrandEmblem(-162, 0, 20, accent, 'diamond')}
      <text x="-130" y="2" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="28" font-weight="800">Códice Anómalo</text>
      <text x="-130" y="26" fill="#94A3B8" font-family="'Segoe UI', Arial, sans-serif" font-size="18" font-weight="600">${escapeXml(subNiche)}</text>
    </g>
    <!-- Línea horizontal blanca completa -->
    <line x1="48" y1="782" x2="1032" y2="782" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.9" />
    <!-- Titular condensado gigante Blanco + Púrpura -->
    ${headlineSvg}
  `;
}

// 2. TRASELVELO_AMARILLO (@traselveloreal — IMG_0515)
function renderCoverTrasElVeloAmarillo(carousel, slide, niche) {
  const yellow = '#FFE600';
  const photoUri = resolvePhotoForTopic(carousel, slide, 'primary');
  const headline = slide.headline || carousel.title || 'HALLAZGO HISTÓRICO CAMBIA LA CIENCIA OFICIAL';
  const lines = wrapLines(headline.toUpperCase(), 23, 5);
  const fontSize = lines.length >= 5 ? 66 : 72;
  const lineHeight = Math.round(fontSize * 1.12);
  const startY = 850;

  const headlineSvg = lines
    .map((line, idx) => {
      const isLast = idx === lines.length - 1 && lines.length > 1;
      const fill = isLast ? '#FFFFFF' : yellow;
      return `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="${fill}" font-family="Impact, 'Arial Black', sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.4">${escapeXml(line)}</text>`;
    })
    .join('\n');

  return `
    <!-- FOTOGRAFÍA REAL DOCUMENTAL SUPERIOR (0..800px) -->
    <image href="${photoUri}" x="0" y="0" width="1080" height="800" preserveAspectRatio="xMidYMid slice" />
    <!-- Medallón circular derecho con foto real (IMG_0515) -->
    ${renderCutoutMedallion({ cx: 755, cy: 335, r: 215, photoKey: 'photo_ai_executive_editorial', withArrow: false })}
    <!-- Fundido a negro puro -->
    <rect x="0" y="520" width="1080" height="280" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="795" width="1080" height="555" fill="#000000" />
    <!-- Titular condensado Amarillo + Blanco -->
    ${headlineSvg}
    <!-- Barra inferior auténtica de Códice Anómalo -->
    <g transform="translate(0, 1272)">
      ${renderBrandEmblem(72, 0, 32, yellow, 'eye')}
      <text x="120" y="10" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="31" font-weight="800">Códice Anómalo</text>
      <line x1="390" y1="2" x2="620" y2="2" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.7" />
      <text x="646" y="10" fill="${yellow}" font-family="Impact, 'Arial Black', sans-serif" font-size="29" font-weight="900" letter-spacing="0.8">DESLIZA PARA VER MÁS →</text>
    </g>
  `;
}

// 3. CONSCIENTE_RASGADO (@consciente — IMG_0516)
function renderCoverConscienteRasgado(carousel, slide, niche) {
  const topPhotoUri = resolvePhotoForTopic(carousel, slide, 'primary');
  const bottomPhotoUri = resolvePhotoForTopic(carousel, slide, 'secondary');
  const headline = slide.headline || carousel.title || 'UNA TEORÍA AFIRMA QUE ABRIÓ OTRA DIMENSIÓN CON SUS EXPERIMENTOS';
  const lines = wrapLines(headline.toUpperCase(), 24, 4);
  const startY = lines.length >= 4 ? 565 : 595;
  const lineHeight = lines.length >= 4 ? 52 : 58;
  const fontSize = lines.length >= 4 ? 40 : 45;

  const headlineSvg = lines
    .map((line, idx) => {
      const isHighlight = idx === 1 || idx === 2;
      const fill = isHighlight ? '#09090B' : '#18181B';
      const weight = isHighlight ? '900' : '800';
      return `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="${fill}" font-family="'Segoe UI', 'Arial Black', Arial, sans-serif" font-size="${fontSize}" font-weight="${weight}" letter-spacing="0.2">${escapeXml(line)}</text>`;
    })
    .join('\n');

  return `
    <!-- FOTOGRAFÍA REAL SUPERIOR (0..495px) -->
    <image href="${topPhotoUri}" x="0" y="0" width="1080" height="495" preserveAspectRatio="xMidYMid slice" />
    <!-- FOTOGRAFÍA REAL INFERIOR (830..1350px) -->
    <g transform="translate(0, 830)">
      <image href="${bottomPhotoUri}" x="0" y="0" width="1080" height="520" preserveAspectRatio="xMidYMid slice" />
    </g>
    <!-- Marca superior centrada Códice Anómalo -->
    <g transform="translate(540, 44)">
      <circle cx="-105" cy="-6" r="14" fill="#FFFFFF" />
      <text x="-80" y="2" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="24" font-weight="900" letter-spacing="1.2">CÓDICE ANÓMALO</text>
    </g>
    <!-- Sombra del papel rasgado -->
    <polygon points="0,465 95,455 190,470 310,455 430,468 540,452 660,468 790,452 910,468 1015,456 1080,465 1080,880 990,865 880,882 760,866 640,884 510,866 390,882 260,866 140,880 50,866 0,878"
      fill="#000000" fill-opacity="0.65" transform="translate(0, 8)" />
    <!-- Banda central de PAPEL BLANCO RASGADO (IMG_0516) -->
    <polygon points="0,465 95,455 190,470 310,455 430,468 540,452 660,468 790,452 910,468 1015,456 1080,465 1080,874 990,860 880,876 760,860 640,878 510,860 390,876 260,860 140,874 50,860 0,872"
      fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2.2" />
    <!-- Bordes fibrosos del papel rasgado -->
    <polyline points="0,470 95,460 190,475 310,460 430,473 540,458 660,473 790,458 910,474 1015,462 1080,470"
      fill="none" stroke="#CBD5E1" stroke-width="3" />
    <polyline points="0,868 50,856 140,870 260,856 390,872 510,856 640,874 760,856 880,872 990,856 1080,868"
      fill="none" stroke="#CBD5E1" stroke-width="3" />
    <!-- Sirenas de emergencia a izquierda y derecha (IMG_0516) -->
    ${renderEmergencySiren(70, 665, 1.15)}
    ${renderEmergencySiren(1010, 665, 1.15)}
    <!-- Titular central sobre el papel rasgado -->
    ${headlineSvg}
    <!-- Marca inferior centrada -->
    <g transform="translate(540, 1304)">
      <circle cx="-105" cy="-6" r="12" fill="#FFFFFF" />
      <text x="-82" y="2" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="1.2">CÓDICE ANÓMALO</text>
    </g>
  `;
}

// 4. DNOTICI_ROJO (@dnotici — IMG_0518)
function renderCoverDnoticiRojo(carousel, slide, niche) {
  const photoUri = resolvePhotoForTopic(carousel, slide, 'primary');
  const headline = slide.headline || carousel.title || 'LA NASA ADVIERTE LA CAÍDA DE UN OBJETO A LA TIERRA SIN CONTROL';
  const lines = wrapLines(headline.toUpperCase(), 21, 5);
  const fontSize = lines.length >= 5 ? 70 : lines.length === 4 ? 78 : 84;
  const lineHeight = Math.round(fontSize * 1.08);
  const startY = lines.length >= 5 ? 865 : 895;

  const headlineSvg = lines
    .map(
      (line, idx) =>
        `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="#FFFFFF" font-family="Impact, 'Arial Black', sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.6">${escapeXml(line)}</text>`
    )
    .join('\n');

  return `
    <!-- FOTOGRAFÍA SATELITAL REAL SUPERIOR (0..780px) -->
    <image href="${photoUri}" x="0" y="0" width="1080" height="780" preserveAspectRatio="xMidYMid slice" />
    <!-- Esquina superior izquierda: Barra roja vertical + Marca apilada (IMG_0518) -->
    <g transform="translate(42, 42)">
      <rect x="-12" y="-12" width="280" height="148" rx="14" fill="#000000" fill-opacity="0.55" />
      <rect x="0" y="0" width="18" height="122" fill="#DC2626" />
      <text x="30" y="58" fill="#FFFFFF" font-family="Impact, 'Arial Black', sans-serif" font-size="64" font-weight="900" letter-spacing="1">CÓDICE</text>
      <text x="30" y="118" fill="#EF4444" font-family="Impact, 'Arial Black', sans-serif" font-size="56" font-weight="900" letter-spacing="0.8">ANÓMALO</text>
    </g>
    <!-- Faldón inferior en degradado carmesí profundo con patrón halftone (IMG_0518) -->
    <rect x="0" y="680" width="1080" height="670" fill="url(#crimsonBottomGrad)" />
    <rect x="0" y="750" width="1080" height="600" fill="url(#halftoneDotsPattern)" opacity="0.32" />
    <!-- Titular condensado blanco ultra-impactante -->
    ${headlineSvg}
    <line x1="56" y1="1312" x2="1024" y2="1312" stroke="#000000" stroke-width="6" />
  `;
}

// 5. TECNOLOGIA_CUTOUT (@tecnologia — IMG_0519, IMG_0539)
function renderCoverTecnologiaCutout(carousel, slide, niche) {
  const photoUri = resolvePhotoForTopic(carousel, slide, 'primary');
  const headline = slide.headline || carousel.title || '¿Qué acaba de descubrirse en las últimas 48 horas?';
  const lines = wrapLines(headline, 21, 5);
  const badge = cleanRenderableText(slide.badgeText || niche?.badge || niche?.name || 'TECNOLOGÍA').toUpperCase();
  const subtitle = cleanRenderableText(slide.visualCaption || carousel.subtitle || carousel.hookType || 'Tendencias en ciencia, tecnología e IA');

  const fontSize = lines.length >= 5 ? 54 : 62;
  const lineHeight = Math.round(fontSize * 1.18);
  const startY = 875;

  const headlineSvg = lines
    .map(
      (line, idx) =>
        `<text x="92" y="${startY + idx * lineHeight}" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="-0.6">${escapeXml(line)}</text>`
    )
    .join('\n');

  return `
    <!-- FOTOGRAFÍA REAL SUPERIOR (0..780px) -->
    <image href="${photoUri}" x="0" y="0" width="1080" height="780" preserveAspectRatio="xMidYMid slice" />
    <!-- Fundido a negro puro -->
    <rect x="0" y="520" width="1080" height="270" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="775" width="1080" height="575" fill="#000000" />
    <!-- Doble medallón circular superpuesto en la derecha con flecha blanca curva (IMG_0539) -->
    ${renderCutoutMedallion({ cx: 925, cy: 520, r: 96, photoKey: 'photo_tech_cyber_eye', withArrow: false })}
    ${renderCutoutMedallion({ cx: 790, cy: 615, r: 146, photoKey: 'photo_ai_executive_editorial', withArrow: true, arrowSide: 'left' })}
    <!-- Píldora 1/5 superior derecha -->
    <rect x="942" y="42" width="96" height="52" rx="26" fill="#000000" fill-opacity="0.65" />
    <text x="990" y="76" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="28" font-weight="700">1/5</text>
    <!-- Etiqueta inclinada TECNOLOGÍA (IMG_0539) -->
    <g transform="translate(92, 732) skewX(-12)">
      <rect x="0" y="0" width="330" height="54" rx="10" fill="#18181B" stroke="#3F3F46" stroke-width="1.8" />
      <text x="165" y="38" text-anchor="middle" fill="#FFFFFF" font-family="'Arial Black', Impact, sans-serif" font-size="29" font-weight="900" letter-spacing="1.2">${escapeXml(badge.slice(0, 18))}</text>
    </g>
    <!-- Titular de pregunta alineado a la izquierda -->
    ${headlineSvg}
    <text x="92" y="1265" fill="#D4D4D8" font-family="'Segoe UI', Arial, sans-serif" font-size="36" font-weight="400">${escapeXml(subtitle.slice(0, 48))}</text>
  `;
}

// 6. CIENCIA_SATURNO_SPLIT (@desde_la_ciencia / @kingxitytv — IMG_0542, IMG_0551)
function renderCoverCienciaSaturnoSplit(carousel, slide, niche) {
  const lime = '#D8FF3E';
  const leftPhotoUri = resolvePhotoForTopic(carousel, slide, 'primary');
  const rightPhotoUri = resolvePhotoForTopic(carousel, slide, 'splitRight');
  const headline = slide.headline || carousel.title || 'Cada agujero negro escondería un universo entero y el nuestro habría nacido dentro de uno';
  const lines = wrapLines(headline, 25, 4);
  const inst = cleanRenderableText(carousel.institutionTag || 'Indiana University');
  const loc = cleanRenderableText(carousel.locationTag || 'Estados Unidos');

  const splitIndex = Math.ceil(lines.length / 2);
  const topLines = lines.slice(0, splitIndex);
  const bottomLines = lines.slice(splitIndex);

  return `
    <!-- MITAD SUPERIOR DIVIDIDA 50/50 CON FOTOGRAFÍA REAL (0..760px) (IMG_0551) -->
    <defs>
      <clipPath id="split-left-clip">
        <rect x="0" y="0" width="538" height="760" />
      </clipPath>
      <clipPath id="split-right-clip">
        <rect x="542" y="0" width="538" height="760" />
      </clipPath>
    </defs>
    <g clip-path="url(#split-left-clip)">
      <image href="${leftPhotoUri}" x="0" y="0" width="538" height="760" preserveAspectRatio="xMidYMid slice" />
    </g>
    <g clip-path="url(#split-right-clip)">
      <image href="${rightPhotoUri}" x="542" y="0" width="538" height="760" preserveAspectRatio="xMidYMid slice" />
    </g>
    <!-- Línea divisoria vertical amarilla central (IMG_0551) -->
    <line x1="540" y1="0" x2="540" y2="755" stroke="#EAB308" stroke-width="7" />
    <!-- Fundido a negro puro -->
    <rect x="0" y="540" width="1080" height="235" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="760" width="1080" height="590" fill="#000000" />
    <!-- Línea horizontal con icono de Saturno en el centro (IMG_0542) -->
    <line x1="150" y1="742" x2="482" y2="742" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.9" />
    <line x1="598" y1="742" x2="930" y2="742" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.9" />
    ${renderSaturnEmblem(540, 742, 1.05)}
    <!-- Barra de metadatos: @codice.anomalo | Institución | País (IMG_0551) -->
    <text x="540" y="814" text-anchor="middle" fill="#F8FAFC" font-family="'Segoe UI', Arial, sans-serif" font-size="27" font-weight="600">
      @codice.anomalo  |  ${escapeXml(inst)}  |  ${escapeXml(loc)}
    </text>
    <!-- Titular superior en Verde Lima / Amarillo (IMG_0551) -->
    ${topLines
      .map(
        (line, idx) =>
          `<text x="540" y="${905 + idx * 84}" text-anchor="middle" fill="${lime}" font-family="Impact, 'Arial Black', sans-serif" font-size="76" font-weight="900">${escapeXml(line)}</text>`
      )
      .join('\n')}
    <!-- Subtitular inferior en Blanco condensado -->
    ${bottomLines
      .map(
        (line, idx) =>
          `<text x="540" y="${905 + topLines.length * 84 + 10 + idx * 68}" text-anchor="middle" fill="#FFFFFF" font-family="Impact, 'Arial Black', sans-serif" font-size="60" font-weight="900">${escapeXml(line)}</text>`
      )
      .join('\n')}
    <text x="540" y="1322" text-anchor="middle" fill="#CBD5E1" font-family="'Segoe UI', Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="1.5">DESLIZAR A MÁS &gt;&gt;&gt;</text>
  `;
}

// 7. EVOLUCIONA_GOLD (@mentalidadexitosa_ / @ia.evoluciona — IMG_0550)
function renderCoverEvolucionaGold(carousel, slide, niche) {
  const gold = '#D6A74A';
  const photoUri = resolvePhotoForTopic(carousel, slide, 'primary');
  const headline =
    slide.headline ||
    carousel.title ||
    'SEGÚN PSICÓLOGOS, EL PROPIO TIEMPO CAMBIÓ DESPUÉS DE LOS AÑOS 2000 Y EL CEREBRO HUMANO DEJÓ DE REGISTRARLO.';
  const lines = wrapLines(headline.toUpperCase(), 25, 7);
  const fontSize = lines.length >= 7 ? 56 : 62;
  const lineHeight = Math.round(fontSize * 1.14);
  const startY = 740;
  const goldStartIndex = Math.floor(lines.length * 0.55);

  const headlineSvg = lines
    .map((line, idx) => {
      const fill = idx >= goldStartIndex ? gold : '#FFFFFF';
      return `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="${fill}" font-family="Impact, 'Arial Black', sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.6">${escapeXml(line)}</text>`;
    })
    .join('\n');

  return `
    <!-- FOTOGRAFÍA HIPERREALISTA ATMOSFÉRICA SUPERIOR (0..720px) (IMG_0550) -->
    <image href="${photoUri}" x="0" y="0" width="1080" height="720" preserveAspectRatio="xMidYMid slice" />
    <rect x="942" y="42" width="96" height="52" rx="26" fill="#000000" fill-opacity="0.65" />
    <text x="990" y="76" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="28" font-weight="700">1/5</text>
    <!-- Fundido profundo a negro puro -->
    <rect x="0" y="460" width="1080" height="270" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="715" width="1080" height="635" fill="#000000" />
    <!-- Titular condensado Blanco + Dorado Cálido (IMG_0550) -->
    ${headlineSvg}
    <!-- Flecha minimalista centrada abajo (IMG_0550: ───────▷) -->
    <g transform="translate(540, 1286)">
      <line x1="-75" y1="0" x2="55" y2="0" stroke="#A1A1AA" stroke-width="2.5" />
      <polygon points="80,0 55,-11 55,11" fill="none" stroke="#A1A1AA" stroke-width="2.5" />
    </g>
  `;
}

// ----------------------------------------------------------------------------
// Diapositivas Interiores de Evidencia Fotorrealista (Slides 2/5, 3/5, 4/5)
// ----------------------------------------------------------------------------

// Formato Editorial @ingenia.ai con Ventana Fotográfica Real (IMG_0535 / IMG_0536)
function renderInteriorIngeniaEditorial(carousel, slide, niche, archetypeMeta) {
  const accent = carousel.accentColor || archetypeMeta.accentColor || '#C04BFF';
  const slideNum = slide.slideNumber || 2;
  const photoUri = resolvePhotoForTopic(carousel, slide, slideNum % 2 === 0 ? 'primary' : 'secondary');
  const headlineLines = wrapLines(
    slide.questionTitle || slide.headline || '¿Qué descubrieron exactamente los investigadores?',
    34,
    2
  );
  const bodyLines = wrapLines(
    slide.body ||
      slide.bodyText ||
      'Los registros instrumentales confirmaron una anomalía persistente que desafía los modelos convencionales publicados hasta la fecha.',
    48,
    6
  );
  const sourceText = cleanRenderableText(
    slide.sourceUrl || carousel.sourceCitation || 'Fuente: Revista Nature / Science'
  );
  const statVal = cleanRenderableText(slide.statValue || (carousel.metrics?.retention ? `${carousel.metrics.retention}%` : ''));
  const statLbl = cleanRenderableText(slide.statLabel || carousel.institutionTag || 'Archivo Códice Anómalo');

  const clipId = `evidence-frame-clip-${slideNum}-${Math.round(Math.random() * 1000)}`;

  return `
    <rect width="1080" height="1350" fill="#000000" />

    <!-- Cabecera superior derecha: Emblema Códice Anómalo + Píldora 2/5 -->
    <g transform="translate(740, 68)">
      ${renderBrandEmblem(0, 8, 34, accent, 'diamond')}
      <text x="48" y="6" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="33" font-weight="800">Códice</text>
      <text x="48" y="34" fill="#A1A1AA" font-family="'Segoe UI', Arial, sans-serif" font-size="20" font-weight="500">@codice.anomalo</text>
      <rect x="202" y="-24" width="96" height="54" rx="27" fill="#27272A" />
      <text x="250" y="12" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="27" font-weight="700">${slideNum}/5</text>
    </g>

    <!-- Título de pregunta editorial en negrita (IMG_0535) -->
    ${headlineLines
      .map(
        (line, idx) =>
          `<text x="56" y="${178 + idx * 54}" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="44" font-weight="800">${escapeXml(line)}</text>`
      )
      .join('\n')}

    <!-- Párrafo documental de alta legibilidad -->
    ${bodyLines
      .map((line, idx) => {
        const yPos = (headlineLines.length > 1 ? 290 : 246) + idx * 46;
        return `<text x="56" y="${yPos}" fill="#E4E4E7" font-family="'Segoe UI', Arial, sans-serif" font-size="32" font-weight="400">${escapeXml(line)}</text>`;
      })
      .join('\n')}

    <!-- RECUADRO FOTOGRÁFICO DE EVIDENCIA REAL (IMG_0535 / IMG_0536) -->
    <g transform="translate(56, 565)">
      <defs>
        <clipPath id="${clipId}">
          <rect x="0" y="0" width="968" height="580" rx="24" />
        </clipPath>
      </defs>
      <g clip-path="url(#${clipId})">
        <!-- Fotografía real enmarcada -->
        <image href="${photoUri}" x="0" y="0" width="968" height="580" preserveAspectRatio="xMidYMid slice" />
        <rect x="0" y="380" width="968" height="200" fill="url(#fadeToBlackGrad)" />
        <!-- Callout de telemetría y datos duros -->
        <g transform="translate(32, 465)">
          <rect x="0" y="0" width="904" height="88" rx="16" fill="#09090B" fill-opacity="0.88" stroke="${accent}" stroke-width="2" />
          <text x="28" y="38" fill="${accent}" font-family="Impact, 'Arial Black', sans-serif" font-size="28" letter-spacing="1">
            ${escapeXml(cleanRenderableText(slide.headline || `EVIDENCIA VERIFICADA // ACTO 0${slideNum}`).toUpperCase())}
          </text>
          <text x="28" y="70" fill="#F8FAFC" font-family="'Segoe UI', Arial, sans-serif" font-size="24" font-weight="600">
            ${escapeXml(cleanRenderableText(slide.highlight || carousel.title).slice(0, 58))}
          </text>
          ${
            statVal
              ? `<text x="876" y="56" text-anchor="end" fill="#FFFFFF" font-family="Impact, 'Arial Black', sans-serif" font-size="44">${escapeXml(statVal)}</text>`
              : ''
          }
        </g>
      </g>
      <rect x="0" y="0" width="968" height="580" rx="24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.85" />
    </g>

    <!-- Cita de fuente científica en cursiva (IMG_0535 / IMG_0536) -->
    <text x="56" y="1198" fill="#D4D4D8" font-family="'Segoe UI', Georgia, serif" font-size="26" font-style="italic">
      ${escapeXml(sourceText.slice(0, 74))}
    </text>
    <text x="56" y="1234" fill="#71717A" font-family="'Segoe UI', Georgia, serif" font-size="23" font-style="italic">
      ${escapeXml(carousel.dossierCode || 'EXPEDIENTE #CA-0001')} • ${escapeXml(statLbl)}
    </text>
  `;
}

// Formato Tarjeta Redondeada de Expediente con Foto y Métricas (@ia.evoluciona — IMG_0547)
function renderInteriorDossierCard(carousel, slide, niche, archetypeMeta) {
  const accent = carousel.accentColor || archetypeMeta.accentColor || '#22C55E';
  const slideNum = slide.slideNumber || 4;
  const photoUri = resolvePhotoForTopic(carousel, slide, 'primary');
  const p1Lines = wrapLines(slide.questionTitle || slide.headline || 'Hallazgo crítico del expediente científico.', 46, 2);
  const p2Lines = wrapLines(slide.body || slide.bodyText || '', 48, 4);
  const p3Lines = wrapLines(slide.highlight || carousel.subtitle || '', 48, 3);

  const clipId = `dossier-card-clip-${slideNum}-${Math.round(Math.random() * 1000)}`;

  return `
    <rect width="1080" height="1350" fill="#000000" />

    <!-- Cabecera superior derecha -->
    <g transform="translate(740, 66)">
      ${renderBrandEmblem(0, 8, 34, accent, 'diamond')}
      <text x="48" y="6" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="31" font-weight="800">Códice</text>
      <text x="48" y="34" fill="#A1A1AA" font-family="'Segoe UI', Arial, sans-serif" font-size="20">@codice.anomalo</text>
      <rect x="206" y="-22" width="92" height="52" rx="26" fill="#27272A" />
      <text x="252" y="12" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="26" font-weight="700">${slideNum}/5</text>
    </g>

    <!-- Tarjeta redondeada con borde blanco nítido (IMG_0547) -->
    <g transform="translate(52, 136)">
      <rect x="0" y="0" width="976" height="1136" rx="28" fill="#050508" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.9" />

      <!-- Cabecera interna con sello oficial -->
      <circle cx="56" cy="58" r="28" fill="#18181B" stroke="${accent}" stroke-width="2" />
      <text x="56" y="67" text-anchor="middle" fill="#FFFFFF" font-family="Impact, sans-serif" font-size="24">CA</text>
      <text x="100" y="52" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="25" font-weight="800">
        ${escapeXml(cleanRenderableText(carousel.institutionTag || 'Códice Anómalo Lab').slice(0, 36))}
      </text>
      <text x="100" y="80" fill="#71717A" font-family="'Segoe UI', Arial, sans-serif" font-size="21">
        @codice.anomalo • ${escapeXml(carousel.dossierCode || 'EXP-2026')}
      </text>

      <!-- Bloques de texto estructurados estilo tweet/dossier -->
      ${p1Lines
        .map(
          (line, idx) =>
            `<text x="32" y="${142 + idx * 42}" fill="#F4F4F5" font-family="'Segoe UI', Arial, sans-serif" font-size="31" font-weight="700">${escapeXml(line)}</text>`
        )
        .join('\n')}

      ${p2Lines
        .map(
          (line, idx) =>
            `<text x="32" y="${250 + idx * 42}" fill="#E4E4E7" font-family="'Segoe UI', Arial, sans-serif" font-size="30" font-weight="400">${escapeXml(line)}</text>`
        )
        .join('\n')}

      ${p3Lines
        .map(
          (line, idx) =>
            `<text x="32" y="${445 + idx * 42}" fill="${accent}" font-family="'Segoe UI', Arial, sans-serif" font-size="29" font-weight="600">${escapeXml(line)}</text>`
        )
        .join('\n')}

      <!-- Doble evidencia inferior: Dato estadístico + Fotografía real (IMG_0547) -->
      <g transform="translate(22, 576)">
        <rect x="0" y="0" width="456" height="534" rx="18" fill="#F8FAFC" />
        <circle cx="92" cy="235" r="44" fill="none" stroke="#D97706" stroke-width="8" stroke-dasharray="14 8" />
        <text x="152" y="255" fill="#09090B" font-family="Georgia, 'Times New Roman', serif" font-size="68" font-weight="700">
          ${escapeXml(cleanRenderableText(slide.statValue || '99.4%').slice(0, 8))}
        </text>
        <text x="42" y="340" fill="#334155" font-family="'Segoe UI', Arial, sans-serif" font-size="26" font-weight="700">
          ${escapeXml(cleanRenderableText(slide.statLabel || 'Nivel de confianza instrumental').slice(0, 32))}
        </text>
        <text x="42" y="475" fill="#64748B" font-family="'Segoe UI', Arial, sans-serif" font-size="21" font-weight="600">
          ${escapeXml(cleanRenderableText(carousel.sourceCitation || 'Fuente: Paper revisado por pares').slice(0, 34))}
        </text>
      </g>

      <!-- Recuadro fotográfico real derecho (IMG_0547) -->
      <g transform="translate(498, 576)">
        <defs>
          <clipPath id="${clipId}">
            <rect x="0" y="0" width="456" height="534" rx="18" />
          </clipPath>
        </defs>
        <g clip-path="url(#${clipId})">
          <image href="${photoUri}" x="0" y="0" width="456" height="534" preserveAspectRatio="xMidYMid slice" />
        </g>
        <rect x="0" y="0" width="456" height="534" rx="18" fill="none" stroke="#3F3F46" stroke-width="2" />
      </g>
    </g>
  `;
}

// ----------------------------------------------------------------------------
// Diapositiva 5 (5/5 — Cierre Viral & Conversión DM ManyChat)
// ----------------------------------------------------------------------------

function renderCtaSlide(carousel, slide, niche, archetypeMeta) {
  const accent = carousel.accentColor || archetypeMeta.accentColor || '#C04BFF';
  const photoUri = resolvePhotoForTopic(carousel, slide, 'primary');
  const keyword = cleanRenderableText(carousel.ctaKeyword || 'EXPEDIENTE').toUpperCase();
  const deliverable = cleanRenderableText(
    carousel.dmDeliverable || 'Dossier PDF extendido con fuentes científicas originales, diagramas y análisis completo.'
  );
  const headlineLines = wrapLines(slide.headline || '¿Quieres recibir el expediente científico completo en tu DM?', 28, 3);
  const delivLines = wrapLines(deliverable, 44, 3);

  return `
    <rect width="1080" height="1350" fill="#000000" />
    <!-- Fondo atmosférico con fotografía real oscurecida -->
    <g opacity="0.38">
      <image href="${photoUri}" x="0" y="0" width="1080" height="560" preserveAspectRatio="xMidYMid slice" />
    </g>
    <rect x="0" y="240" width="1080" height="340" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="550" width="1080" height="800" fill="#000000" />

    <!-- Cabecera 5/5 -->
    <g transform="translate(740, 68)">
      ${renderBrandEmblem(0, 8, 34, accent, 'diamond')}
      <text x="48" y="6" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="31" font-weight="800">Códice</text>
      <text x="48" y="34" fill="#A1A1AA" font-family="'Segoe UI', Arial, sans-serif" font-size="20">@codice.anomalo</text>
      <rect x="202" y="-24" width="96" height="54" rx="27" fill="${accent}" />
      <text x="250" y="12" text-anchor="middle" fill="#000000" font-family="'Segoe UI', Arial, sans-serif" font-size="27" font-weight="900">5/5</text>
    </g>

    <!-- Tarjeta de conversión DM con borde blanco brillante -->
    <g transform="translate(56, 175)">
      <rect x="0" y="0" width="968" height="1065" rx="30" fill="#07070C" fill-opacity="0.94" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.85" />

      <rect x="48" y="44" width="430" height="50" rx="25" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-width="1.8" />
      <text x="263" y="77" text-anchor="middle" fill="${accent}" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="1.5">
        ACCESO DIRECTO AL EXPEDIENTE
      </text>

      ${headlineLines
        .map(
          (line, idx) =>
            `<text x="48" y="${168 + idx * 60}" fill="#FFFFFF" font-family="Impact, 'Arial Black', sans-serif" font-size="54" font-weight="900" letter-spacing="0.5">${escapeXml(line.toUpperCase())}</text>`
        )
        .join('\n')}

      <!-- Caja protagonista de Palabra Clave ManyChat -->
      <g transform="translate(48, 365)">
        <rect x="0" y="0" width="872" height="210" rx="24" fill="#0F101A" stroke="${accent}" stroke-width="3.5" />
        <text x="436" y="64" text-anchor="middle" fill="#A1A1AA" font-family="'Segoe UI', Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="2">
          COMENTA ESTA PALABRA CLAVE AQUÍ ABAJO:
        </text>
        <text x="436" y="162" text-anchor="middle" fill="${accent}" font-family="Impact, 'Arial Black', sans-serif" font-size="96" font-weight="900" letter-spacing="3">
          &quot;${escapeXml(keyword)}&quot;
        </text>
      </g>

      <text x="48" y="645" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="30" font-weight="800">
        ¿Qué recibirás al instante en tus mensajes privados (DM)?
      </text>
      ${delivLines
        .map(
          (line, idx) =>
            `<text x="48" y="${698 + idx * 42}" fill="#D4D4D8" font-family="'Segoe UI', Arial, sans-serif" font-size="28">${escapeXml(line)}</text>`
        )
        .join('\n')}

      <!-- 3 Píldoras de acción de alto engagement -->
      <g transform="translate(48, 860)">
        <rect x="0" y="0" width="272" height="135" rx="18" fill="#12131F" stroke="#27272A" stroke-width="2" />
        <text x="136" y="55" text-anchor="middle" fill="${accent}" font-family="Impact, sans-serif" font-size="34">01. GUARDA</text>
        <text x="136" y="96" text-anchor="middle" fill="#E4E4E7" font-family="'Segoe UI', Arial, sans-serif" font-size="22">Para consultarlo luego</text>

        <rect x="300" y="0" width="272" height="135" rx="18" fill="#12131F" stroke="#27272A" stroke-width="2" />
        <text x="436" y="55" text-anchor="middle" fill="#FFFFFF" font-family="Impact, sans-serif" font-size="34">02. COMPARTE</text>
        <text x="436" y="96" text-anchor="middle" fill="#E4E4E7" font-family="'Segoe UI', Arial, sans-serif" font-size="22">Envíalo a alguien curioso</text>

        <rect x="600" y="0" width="272" height="135" rx="18" fill="#12131F" stroke="#27272A" stroke-width="2" />
        <text x="736" y="55" text-anchor="middle" fill="${accent}" font-family="Impact, sans-serif" font-size="34">03. SÍGUENOS</text>
        <text x="736" y="96" text-anchor="middle" fill="#E4E4E7" font-family="'Segoe UI', Arial, sans-serif" font-size="22">@codice.anomalo</text>
      </g>
    </g>
  `;
}

// ----------------------------------------------------------------------------
// Función Principal Exportada: createSlideSvg(carousel, slide, niche, options)
// ----------------------------------------------------------------------------

export function createSlideSvg(carousel = {}, slide = {}, niche = {}, options = {}) {
  const archetypeKey =
    options.archetypeOverride ||
    slide?.archetype ||
    carousel?.archetype ||
    'INGENIA_PURPURA';

  const archetypeMeta = ARCHETYPE_META[archetypeKey] || ARCHETYPE_META.INGENIA_PURPURA;
  const slideNumber = Number(slide?.slideNumber || 1);

  let contentSvg = '';

  if (slideNumber === 1) {
    switch (archetypeMeta.id) {
      case 'TRASELVELO_AMARILLO':
        contentSvg = renderCoverTrasElVeloAmarillo(carousel, slide, niche);
        break;
      case 'CONSCIENTE_RASGADO':
        contentSvg = renderCoverConscienteRasgado(carousel, slide, niche);
        break;
      case 'DNOTICI_ROJO':
        contentSvg = renderCoverDnoticiRojo(carousel, slide, niche);
        break;
      case 'TECNOLOGIA_CUTOUT':
        contentSvg = renderCoverTecnologiaCutout(carousel, slide, niche);
        break;
      case 'CIENCIA_SATURNO_SPLIT':
        contentSvg = renderCoverCienciaSaturnoSplit(carousel, slide, niche);
        break;
      case 'EVOLUCIONA_GOLD':
        contentSvg = renderCoverEvolucionaGold(carousel, slide, niche);
        break;
      case 'INGENIA_PURPURA':
      default:
        contentSvg = renderCoverIngeniaPurpura(carousel, slide, niche);
        break;
    }
  } else if (slideNumber === 5) {
    contentSvg = renderCtaSlide(carousel, slide, niche, archetypeMeta);
  } else {
    const useDossierCard =
      archetypeMeta.id === 'EVOLUCIONA_GOLD' ||
      slide?.layoutVariant === 'DOSSIER_CARD' ||
      (slideNumber === 4 && (archetypeMeta.id === 'TECNOLOGIA_CUTOUT' || archetypeMeta.id === 'CONSCIENTE_RASGADO'));

    contentSvg = useDossierCard
      ? renderInteriorDossierCard(carousel, slide, niche, archetypeMeta)
      : renderInteriorIngeniaEditorial(carousel, slide, niche, archetypeMeta);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <linearGradient id="fadeToBlackGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="65%" stop-color="#000000" stop-opacity="0.82" />
      <stop offset="100%" stop-color="#000000" stop-opacity="1" />
    </linearGradient>
    <linearGradient id="crimsonBottomGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6B0F0F" stop-opacity="0" />
      <stop offset="16%" stop-color="#6B0F0F" stop-opacity="0.96" />
      <stop offset="100%" stop-color="#220404" stop-opacity="1" />
    </linearGradient>
    <linearGradient id="sirenDomeGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#EF4444" />
      <stop offset="100%" stop-color="#991B1B" />
    </linearGradient>
    <linearGradient id="saturnPlanetGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E2E8F0" />
      <stop offset="50%" stop-color="#64748B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <pattern id="halftoneDotsPattern" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="2.2" fill="#000000" />
    </pattern>
  </defs>
  <rect width="1080" height="1350" fill="#000000" />
  ${contentSvg}
</svg>`;
}
