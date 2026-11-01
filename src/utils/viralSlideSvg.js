// ============================================================================
// CÓDICE ANÓMALO STUDIO (@codice.anomalo)
// Agente 02 // Motor Compartido de Renderizado Visual Viral SVG/PNG (1080x1350 4:5)
// Compatible con Navegador (Canvas/ZIP) y Node.js (@resvg/resvg-js)
// Replica con fidelidad milimétrica los 7 arquetipos de referencia de Google Drive:
//   1. INGENIA_PURPURA       (@ingenia.ai          — IMG_0517, IMG_0534, IMG_0535, IMG_0536)
//   2. TRASELVELO_AMARILLO   (@traselveloreal      — IMG_0515)
//   3. CONSCIENTE_RASGADO    (@consciente          — IMG_0516)
//   4. DNOTICI_ROJO          (@dnotici             — IMG_0518)
//   5. TECNOLOGIA_CUTOUT     (@tecnologia          — IMG_0519, IMG_0539)
//   6. CIENCIA_SATURNO_SPLIT (@desde_la_ciencia    — IMG_0542, IMG_0551)
//   7. EVOLUCIONA_GOLD       (@mentalidadexitosa_  — IMG_0550, IMG_0547)
// ============================================================================

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
      'Escena superior con medallón circular y flecha curva, línea divisoria blanca con emblema verificado, titular condensado Blanco + Púrpura Eléctrico e interiores editoriales con marco de evidencia.'
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
      'Escena dramática con medallón circular derecho, titular condensado gigante en Amarillo Vibrante + remate Blanco y barra inferior con línea divisoria y DESLIZA PARA VER MÁS →.'
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
      'Doble escena cinematográfica (arriba/abajo) dividida al centro por una banda de papel blanco rasgado con sirenas de emergencia vectoriales y titular Negro + Rojo.'
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
      'Barra vertical roja superior izquierda + marca apilada, escena dramática y faldón inferior en degradado rojo carmesí con trama halftone y titular condensado gigante.'
  },
  TECNOLOGIA_CUTOUT: {
    id: 'TECNOLOGIA_CUTOUT',
    name: 'Tecnología Doble Cutout & Pregunta',
    referenceHandle: '@tecnologia',
    referenceImages: ['IMG_0519.png', 'IMG_0539.png'],
    accentColor: '#00F0FF',
    secondaryColor: '#3B82F6',
    badgeLabel: 'TECNOLOGÍA',
    description:
      'Escena superior con doble medallón circular superpuesto y flecha curva, etiqueta inclinada a la izquierda y gran titular en formato pregunta moderna.'
  },
  CIENCIA_SATURNO_SPLIT: {
    id: 'CIENCIA_SATURNO_SPLIT',
    name: 'Ciencia Saturno Split 50/50',
    referenceHandle: '@desde_la_ciencia / @kingxitytv',
    referenceImages: ['IMG_0542.png', 'IMG_0545.png', 'IMG_0551.png'],
    accentColor: '#D4FF33',
    secondaryColor: '#38BDF8',
    badgeLabel: 'ASTROFÍSICA & TIERRA',
    description:
      'Comparativa visual dividida con línea central + emblema de Saturno sobre línea blanca, barra de institución/país y titular Verde Lima/Amarillo + Blanco.'
  },
  EVOLUCIONA_GOLD: {
    id: 'EVOLUCIONA_GOLD',
    name: 'Evoluciona Dorado & Tarjeta Dossier',
    referenceHandle: '@mentalidadexitosa_ / @ia.evoluciona',
    referenceImages: ['IMG_0550.png', 'IMG_0547.png'],
    accentColor: '#E5A93B',
    secondaryColor: '#FDE047',
    badgeLabel: 'NEUROCIENCIA & FUTURO',
    description:
      'Portada atmosférica con titular Blanco + Dorado Cálido y flecha minimalista; interiores en tarjeta de expediente redondeada con borde blanco y doble evidencia.'
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

// Elimina emojis Unicode que en motores nativos sin fuente de emojis (como resvg)
// podrían verse como cuadros vacíos, conservando acentos e idioma español completo.
function cleanRenderableText(text = '') {
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

// Generador determinista basado en semilla para composiciones procedimentales ricas
function createSeededRng(seedStr = 'codice-anomalo') {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function next() {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Detecta el tema visual óptimo según el carrusel, nicho y diapositiva
function detectSceneTheme(carousel = {}, slide = {}, niche = {}) {
  const explicitScene = String(slide?.sceneType || carousel?.sceneType || '').toUpperCase();
  if (explicitScene.includes('ORGANOID') || explicitScene.includes('BIOTECH')) return 'BIOLAB_ORGANOID';
  if (explicitScene.includes('CAVE') || explicitScene.includes('ABYSSAL') || explicitScene.includes('OCEAN') || explicitScene.includes('TRENCH')) return 'ABYSSAL_OCEAN';
  if (explicitScene.includes('PORTAL') || explicitScene.includes('SYNTERG') || explicitScene.includes('MIND')) return 'SYNTERGIC_PORTAL';
  if (explicitScene.includes('BLACKHOLE') || explicitScene.includes('MULTIVERSE') || explicitScene.includes('VOID')) return 'BLACKHOLE_MULTIVERSE';
  if (explicitScene.includes('DYSON') || explicitScene.includes('ORBIT') || explicitScene.includes('STAR') || explicitScene.includes('ELEVATOR')) return 'COSMIC_DYSON';
  if (explicitScene.includes('LIDAR') || explicitScene.includes('PYRAMID') || explicitScene.includes('MAP') || explicitScene.includes('RELIC')) return 'ARCHAEOLOGY_LIDAR';
  if (explicitScene.includes('TIME') || explicitScene.includes('HOURGLASS') || explicitScene.includes('CLOCK')) return 'HOURGLASS_MIND';

  const blob = [
    carousel.id,
    carousel.title,
    carousel.subtitle,
    carousel.topic,
    carousel.archetype,
    niche?.id,
    niche?.name,
    slide?.headline,
    slide?.questionTitle,
    slide?.body,
    slide?.bodyText,
    slide?.visualPrompt,
    slide?.imagePrompt
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (blob.includes('grinberg') || blob.includes('dimensi') || blob.includes('sinterg') || blob.includes('chaman') || blob.includes('conscien') || blob.includes('babel') || blob.includes('simulaci')) {
    return 'SYNTERGIC_PORTAL';
  }
  if (blob.includes('agujero negro') || blob.includes('universo') || blob.includes('multiverso') || blob.includes('horizonte') || blob.includes('vacío') || blob.includes('vacio') || blob.includes('shgb') || blob.includes('boötes') || blob.includes('bootes')) {
    return 'BLACKHOLE_MULTIVERSE';
  }
  if (blob.includes('dyson') || blob.includes('tabby') || blob.includes('kic') || blob.includes('megaestructura') || blob.includes('saturno') || blob.includes('nasa') || blob.includes('satelit') || blob.includes('espaci') || blob.includes('ascensor') || blob.includes('estrella')) {
    return 'COSMIC_DYSON';
  }
  if (blob.includes('océan') || blob.includes('ocean') || blob.includes('abism') || blob.includes('mariana') || blob.includes('submarin') || blob.includes('oxígeno oscuro') || blob.includes('báltico') || blob.includes('agua') || blob.includes('cueva') || blob.includes('movile') || blob.includes('antárti') || blob.includes('vostok')) {
    return 'ABYSSAL_OCEAN';
  }
  if (blob.includes('tiempo') || blob.includes('reloj') || blob.includes('2000') || blob.includes('2020') || blob.includes('memoria') || blob.includes('psicól') || blob.includes('matusal')) {
    return 'HOURGLASS_MIND';
  }
  if (blob.includes('arqueolog') || blob.includes('pirámide') || blob.includes('piramide') || blob.includes('maya') || blob.includes('egipt') || blob.includes('gobekli') || blob.includes('lidar') || blob.includes('antigu') || blob.includes('mapa') || blob.includes('urbano monte') || blob.includes('antikythera') || blob.includes('voynich')) {
    return 'ARCHAEOLOGY_LIDAR';
  }
  if (blob.includes('carne') || blob.includes('organoide') || blob.includes('biobot') || blob.includes('adn') || blob.includes('neurona') || blob.includes('cerebro') || blob.includes('laboratorio') || blob.includes('genét') || blob.includes('tardígrado') || blob.includes('celular')) {
    return 'BIOLAB_ORGANOID';
  }
  return 'QUANTUM_AI_CORE';
}

// ----------------------------------------------------------------------------
// Iconos Vectoriales SVG de Alta Precisión (sin depender de fuentes de emoji)
// ----------------------------------------------------------------------------

function renderVerifiedCheck(cx, cy, r = 13) {
  return `
    <g transform="translate(${cx}, ${cy})">
      <circle cx="0" cy="0" r="${r}" fill="#1D9BF0" />
      <path d="M ${-r * 0.42} ${r * 0.02} L ${-r * 0.12} ${r * 0.32} L ${r * 0.46} ${-r * 0.28}"
        fill="none" stroke="#FFFFFF" stroke-width="${Math.max(2.2, r * 0.22)}" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  `;
}

function renderBrandEmblem(cx, cy, r = 22, accent = '#C04BFF', style = 'diamond') {
  if (style === 'eye') {
    return `
      <g transform="translate(${cx}, ${cy})">
        <circle cx="0" cy="0" r="${r}" fill="#050507" stroke="#FFFFFF" stroke-width="2.2" />
        <path d="M ${-r * 0.62} 0 Q 0 ${-r * 0.52} ${r * 0.62} 0 Q 0 ${r * 0.52} ${-r * 0.62} 0 Z"
          fill="none" stroke="#FFFFFF" stroke-width="2.2" />
        <circle cx="0" cy="0" r="${r * 0.22}" fill="${accent}" />
      </g>
    `;
  }
  return `
    <g transform="translate(${cx}, ${cy})">
      <circle cx="0" cy="0" r="${r}" fill="#08080F" stroke="${accent}" stroke-width="2" stroke-opacity="0.85" />
      <polygon points="0,${-r * 0.68} ${r * 0.54},0 0,${r * 0.68} ${-r * 0.54},0"
        fill="none" stroke="${accent}" stroke-width="2.4" />
      <polygon points="0,${-r * 0.36} ${r * 0.28},0 0,${r * 0.36} ${-r * 0.28},0"
        fill="${accent}" fill-opacity="0.85" />
    </g>
  `;
}

function renderEmergencySiren(cx, cy, scale = 1) {
  return `
    <g transform="translate(${cx}, ${cy}) scale(${scale})">
      <!-- Glow de emergencia -->
      <circle cx="0" cy="-6" r="44" fill="#EF4444" fill-opacity="0.22" />
      <!-- Rayos de alerta -->
      <line x1="-38" y1="-26" x2="-26" y2="-18" stroke="#EF4444" stroke-width="4" stroke-linecap="round" />
      <line x1="38" y1="-26" x2="26" y2="-18" stroke="#EF4444" stroke-width="4" stroke-linecap="round" />
      <line x1="0" y1="-44" x2="0" y2="-32" stroke="#EF4444" stroke-width="4" stroke-linecap="round" />
      <!-- Domo de cristal rojo -->
      <path d="M -22 14 L -18 -14 C -18 -27 18 -27 18 -14 L 22 14 Z" fill="url(#sirenDomeGrad)" stroke="#B91C1C" stroke-width="2" />
      <!-- Reflejo especular interno -->
      <path d="M -11 8 L -9 -11 C -9 -17 0 -17 2 -11 L 0 8 Z" fill="#FCA5A5" fill-opacity="0.65" />
      <circle cx="4" cy="-2" r="7" fill="#FEF08A" fill-opacity="0.9" />
      <!-- Base metálica -->
      <rect x="-26" y="13" width="52" height="10" rx="4" fill="#CBD5E1" stroke="#64748B" stroke-width="1.5" />
      <rect x="-30" y="21" width="60" height="8" rx="4" fill="#64748B" />
    </g>
  `;
}

function renderSaturnEmblem(cx, cy, scale = 1) {
  return `
    <g transform="translate(${cx}, ${cy}) scale(${scale})">
      <circle cx="0" cy="0" r="36" fill="#000000" />
      <ellipse cx="0" cy="0" rx="34" ry="11" transform="rotate(-24)" fill="none" stroke="#64748B" stroke-width="5" opacity="0.55" />
      <circle cx="0" cy="0" r="17" fill="url(#saturnPlanetGrad)" stroke="#E2E8F0" stroke-width="1.5" />
      <path d="M -32 13 A 35 11 -24 0 0 32 -13" fill="none" stroke="#F8FAFC" stroke-width="4.5" stroke-linecap="round" />
      <path d="M -28 11 A 31 9 -24 0 0 28 -11" fill="none" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round" />
    </g>
  `;
}

// ----------------------------------------------------------------------------
// Generador de Escenas Fotorrealistas / Cinematográficas Multicapa en SVG
// ----------------------------------------------------------------------------

export function renderPhotorealScene(carousel, slide, niche, width, height, clipId, variant = 'primary') {
  const theme = detectSceneTheme(carousel, slide, niche);
  const accent = carousel?.accentColor || niche?.accentColor || '#C04BFF';
  const secondary = niche?.secondaryColor || '#38BDF8';
  const rng = createSeededRng(`${carousel?.id || 'c'}-${slide?.slideNumber || 1}-${variant}`);

  // Estrellas / partículas de profundidad
  let particlesSvg = '';
  for (let i = 0; i < 42; i++) {
    const px = Math.round(rng() * width);
    const py = Math.round(rng() * height * 0.88);
    const pr = (0.8 + rng() * 2.4).toFixed(1);
    const pop = (0.2 + rng() * 0.75).toFixed(2);
    const pCol = i % 5 === 0 ? accent : i % 7 === 0 ? secondary : '#FFFFFF';
    particlesSvg += `<circle cx="${px}" cy="${py}" r="${pr}" fill="${pCol}" fill-opacity="${pop}" />`;
  }

  // Bokeh cinematográfico
  let bokehSvg = '';
  for (let i = 0; i < 7; i++) {
    const bx = Math.round((0.1 + rng() * 0.8) * width);
    const by = Math.round((0.12 + rng() * 0.65) * height);
    const br = Math.round(35 + rng() * 85);
    const bCol = i % 2 === 0 ? accent : secondary;
    bokehSvg += `<circle cx="${bx}" cy="${by}" r="${br}" fill="${bCol}" fill-opacity="0.09" />`;
  }

  let subjectSvg = '';
  const cx = Math.round(width * 0.5);
  const cy = Math.round(height * 0.45);

  if (theme === 'BLACKHOLE_MULTIVERSE') {
    if (variant === 'splitRight') {
      // Lado derecho de IMG_0551: Cúmulo de Universos Burbuja iridiscentes con galaxias dentro
      const bubbles = [
        { x: width * 0.52, y: height * 0.16, r: 118, col: '#60A5FA' },
        { x: width * 0.22, y: height * 0.32, r: 105, col: '#A855F7' },
        { x: width * 0.54, y: height * 0.48, r: 148, col: '#38BDF8' },
        { x: width * 0.48, y: height * 0.78, r: 138, col: '#34D399' },
        { x: width * 0.85, y: height * 0.30, r: 110, col: '#818CF8' }
      ];
      subjectSvg = `
        <rect width="${width}" height="${height}" fill="#040711" />
        ${bubbles
          .map(
            (b, idx) => `
          <g>
            <circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="#0B1528" fill-opacity="0.88" stroke="${b.col}" stroke-width="3" stroke-opacity="0.75" />
            <circle cx="${b.x - b.r * 0.18}" cy="${b.y - b.r * 0.18}" r="${b.r * 0.72}" fill="${b.col}" fill-opacity="0.16" />
            <ellipse cx="${b.x}" cy="${b.y}" rx="${b.r * 0.55}" ry="${b.r * 0.22}" transform="rotate(${idx * 28 - 20} ${b.x} ${b.y})" fill="#F8FAFC" fill-opacity="0.18" />
            <path d="M ${b.x - b.r * 0.65} ${b.y - b.r * 0.35} A ${b.r * 0.78} ${b.r * 0.78} 0 0 1 ${b.x + b.r * 0.45} ${b.y - b.r * 0.62}" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-opacity="0.55" stroke-linecap="round" />
          </g>`
          )
          .join('')}
      `;
    } else {
      // Lado izquierdo de IMG_0551: Agujero negro supermasivo con disco de acreción turbulento y jet relativista
      subjectSvg = `
        <rect width="${width}" height="${height}" fill="#05070E" />
        <!-- Nubes de polvo cósmico caliente -->
        <ellipse cx="${cx}" cy="${cy + 40}" rx="${width * 0.62}" ry="${height * 0.28}" fill="#78350F" fill-opacity="0.45" />
        <ellipse cx="${cx}" cy="${cy + 20}" rx="${width * 0.52}" ry="${height * 0.21}" fill="#D97706" fill-opacity="0.42" />
        <ellipse cx="${cx}" cy="${cy}" rx="${width * 0.42}" ry="${height * 0.15}" fill="#FDE68A" fill-opacity="0.75" />
        <ellipse cx="${cx}" cy="${cy}" rx="${width * 0.33}" ry="${height * 0.11}" fill="#E0F2FE" fill-opacity="0.92" />
        <!-- Jet relativista polar -->
        <polygon points="${cx - 12},${cy} ${cx - 58},0 ${cx + 58},0 ${cx + 12},${cy}" fill="url(#jetBeamGrad-${clipId})" opacity="0.85" />
        <!-- Horizonte de sucesos -->
        <ellipse cx="${cx}" cy="${cy}" rx="${width * 0.19}" ry="${height * 0.075}" fill="#000000" stroke="#38BDF8" stroke-width="2.5" />
        <ellipse cx="${cx}" cy="${cy}" rx="${width * 0.22}" ry="${height * 0.088}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.8" />
      `;
    }
  } else if (theme === 'SYNTERGIC_PORTAL') {
    if (variant === 'secondary') {
      // Escena inferior de IMG_0516: Laboratorio antiguo con velas, escritorio y portal de matriz cuántica
      subjectSvg = `
        <rect width="${width}" height="${height}" fill="#090D16" />
        <!-- Mitad izquierda: estudio cálido con velas -->
        <rect x="0" y="0" width="${width * 0.55}" height="${height}" fill="#2A1810" fill-opacity="0.7" />
        <circle cx="${width * 0.18}" cy="${height * 0.58}" r="160" fill="#F59E0B" fill-opacity="0.22" />
        <!-- Velas encendidas -->
        ${[75, 130, 195, 275]
          .map(
            (vx, idx) => `
          <g transform="translate(${vx}, ${Math.round(height * 0.55 + (idx % 2) * 24)})">
            <rect x="-8" y="0" width="16" height="58" rx="3" fill="#FDE68A" />
            <ellipse cx="0" cy="-12" rx="7" ry="15" fill="#F97316" />
            <ellipse cx="0" cy="-10" rx="3.5" ry="9" fill="#FEF08A" />
            <circle cx="0" cy="-12" r="28" fill="#F59E0B" fill-opacity="0.25" />
          </g>`
          )
          .join('')}
        <!-- Mitad derecha: túnel hiperdimensional de rejilla neón -->
        <g transform="translate(${width * 0.72}, ${height * 0.48})">
          ${[260, 200, 145, 95, 55]
            .map(
              (sz, i) => `
            <rect x="${-sz}" y="${-sz * 0.75}" width="${sz * 2}" height="${sz * 1.5}" fill="none" stroke="${i % 2 === 0 ? '#22D3EE' : '#F59E0B'}" stroke-width="2.2" stroke-opacity="0.78" />`
            )
            .join('')}
          <line x1="-260" y1="-195" x2="260" y2="195" stroke="#22D3EE" stroke-width="1.5" stroke-opacity="0.55" />
          <line x1="260" y1="-195" x2="-260" y2="195" stroke="#22D3EE" stroke-width="1.5" stroke-opacity="0.55" />
          <!-- Silueta atrapada al fondo del túnel -->
          <circle cx="95" cy="-14" r="9" fill="#000000" stroke="#22D3EE" stroke-width="1.5" />
          <path d="M 82 28 L 87 -2 L 103 -2 L 108 28 Z" fill="#000000" stroke="#22D3EE" stroke-width="1.5" />
        </g>
        <!-- Científico en el centro abriendo la grieta dimensional -->
        <path d="M ${width * 0.46} 0 L ${width * 0.52} ${height * 0.35} L ${width * 0.44} ${height * 0.68} L ${width * 0.54} ${height}" fill="none" stroke="#38BDF8" stroke-width="5" />
        <circle cx="${width * 0.42}" cy="${height * 0.36}" r="52" fill="#1E293B" stroke="#F8FAFC" stroke-width="2.5" />
        <path d="M ${width * 0.28} ${height * 0.86} C ${width * 0.28} ${height * 0.54} ${width * 0.56} ${height * 0.54} ${width * 0.56} ${height * 0.86} Z" fill="#E2E8F0" fill-opacity="0.88" />
      `;
    } else {
      // Escena superior de IMG_0516: Retrato dramático izquierdo + silueta neuronal cósmica derecha
      subjectSvg = `
        <rect width="${width}" height="${height}" fill="#050814" />
        <!-- Red sintérgica (Lattice) -->
        <g stroke="#1E40AF" stroke-width="1.2" opacity="0.55">
          ${Array.from({ length: 11 })
            .map((_, i) => `<line x1="${width * 0.38 + i * 65}" y1="0" x2="${width * 0.18 + i * 85}" y2="${height}" />`)
            .join('')}
          ${Array.from({ length: 8 })
            .map((_, i) => `<line x1="${width * 0.35}" y1="${i * 75}" x2="${width}" y2="${i * 65 + 40}" />`)
            .join('')}
        </g>
        <!-- Resplandor psico-neuronal derecho -->
        <circle cx="${width * 0.77}" cy="${height * 0.34}" r="150" fill="#EC4899" fill-opacity="0.28" />
        <circle cx="${width * 0.77}" cy="${height * 0.34}" r="95" fill="#38BDF8" fill-opacity="0.38" />
        <!-- Silueta humana proyectando energía cerebral -->
        <circle cx="${width * 0.77}" cy="${height * 0.34}" r="34" fill="#0F172A" stroke="#38BDF8" stroke-width="3" />
        <circle cx="${width * 0.77}" cy="${height * 0.32}" r="18" fill="#F472B6" fill-opacity="0.85" />
        <path d="M ${width * 0.73} ${height * 0.95} L ${width * 0.74} ${height * 0.43} C ${width * 0.74} ${height * 0.39} ${width * 0.81} ${height * 0.39} ${width * 0.80} ${height * 0.43} L ${width * 0.81} ${height * 0.95} Z" fill="#090D16" stroke="#38BDF8" stroke-width="2" />
        <!-- Retrato primer plano izquierdo -->
        <circle cx="${width * 0.29}" cy="${height * 0.46}" r="175" fill="#1E293B" />
        <circle cx="${width * 0.29}" cy="${height * 0.43}" r="118" fill="#D97706" fill-opacity="0.35" />
        <!-- Cabello y barba densa -->
        <path d="M ${width * 0.14} ${height * 0.55} C ${width * 0.10} ${height * 0.15} ${width * 0.48} ${height * 0.15} ${width * 0.44} ${height * 0.55} C ${width * 0.42} ${height * 0.78} ${width * 0.16} ${height * 0.78} ${width * 0.14} ${height * 0.55} Z" fill="#090A0F" />
        <ellipse cx="${width * 0.29}" cy="${height * 0.43}" rx="86" ry="96" fill="#C28E6E" />
        <path d="M ${width * 0.19} ${height * 0.52} Q ${width * 0.29} ${height * 0.44} ${width * 0.39} ${height * 0.52} Q ${width * 0.38} ${height * 0.74} ${width * 0.29} ${height * 0.76} Q ${width * 0.20} ${height * 0.74} ${width * 0.19} ${height * 0.52} Z" fill="#0F1117" />
        <!-- Ojos intensos -->
        <ellipse cx="${width * 0.24}" cy="${height * 0.40}" rx="14" ry="8" fill="#111827" />
        <ellipse cx="${width * 0.34}" cy="${height * 0.40}" rx="14" ry="8" fill="#111827" />
        <circle cx="${width * 0.24}" cy="${height * 0.40}" r="3.5" fill="#FFFFFF" />
        <circle cx="${width * 0.34}" cy="${height * 0.40}" r="3.5" fill="#FFFFFF" />
      `;
    }
  } else if (theme === 'BIOLAB_ORGANOID') {
    // Escena estilo IMG_0515: Laboratorio biotecnológico con pinzas quirúrgicas, guante azul y cultivo celular / organoide
    subjectSvg = `
      <rect width="${width}" height="${height}" fill="#0F172A" />
      <!-- Fondo de laboratorio clínico desenfocado -->
      <rect x="0" y="0" width="${width}" height="${height * 0.75}" fill="#CBD5E1" fill-opacity="0.18" />
      <circle cx="${width * 0.52}" cy="${height * 0.22}" r="95" fill="#0F172A" fill-opacity="0.55" stroke="#94A3B8" stroke-width="14" stroke-opacity="0.25" />
      <!-- Mesa metálica de laboratorio y placa Petri de cristal -->
      <ellipse cx="${width * 0.48}" cy="${height * 0.72}" rx="${width * 0.38}" ry="78" fill="#E2E8F0" fill-opacity="0.22" stroke="#F8FAFC" stroke-width="3" stroke-opacity="0.65" />
      <ellipse cx="${width * 0.48}" cy="${height * 0.69}" rx="${width * 0.34}" ry="56" fill="#0F172A" fill-opacity="0.35" stroke="#38BDF8" stroke-width="1.8" stroke-opacity="0.45" />
      <!-- Tejido / Organoide celular cultivado en la placa -->
      <g transform="translate(${width * 0.48}, ${height * 0.67})">
        <ellipse cx="0" cy="6" rx="155" ry="34" fill="#991B1B" fill-opacity="0.65" />
        ${[-95, -55, -15, 25, 68, 102]
          .map(
            (ox, i) => `
          <circle cx="${ox}" cy="${(i % 2) * 10 - 6}" r="${24 + (i % 3) * 8}" fill="#F43F5E" fill-opacity="0.82" />
          <circle cx="${ox + 6}" cy="${(i % 2) * 8 - 10}" r="8" fill="#FECDD3" fill-opacity="0.75" />`
          )
          .join('')}
      </g>
      <!-- Guante de nitrilo azul a la izquierda sosteniendo pinza metálica -->
      <path d="M 0 ${height * 0.10} C 160 ${height * 0.08} 255 ${height * 0.22} 230 ${height * 0.38} C 190 ${height * 0.48} 85 ${height * 0.52} 0 ${height * 0.48} Z" fill="#2563EB" />
      <ellipse cx="210" cy="${height * 0.26}" rx="68" ry="36" transform="rotate(-18 210 ${height * 0.26})" fill="#3B82F6" />
      <!-- Pinza de precisión de acero inoxidable -->
      <line x1="215" y1="${height * 0.24}" x2="445" y2="${height * 0.50}" stroke="#E2E8F0" stroke-width="10" stroke-linecap="round" />
      <line x1="230" y1="${height * 0.21}" x2="455" y2="${height * 0.48}" stroke="#64748B" stroke-width="6" stroke-linecap="round" />
      <!-- Muestra celular sujeta por la pinza -->
      <circle cx="462" cy="${height * 0.50}" r="38" fill="#FB7185" />
      <circle cx="448" cy="${height * 0.48}" r="14" fill="#FFE4E6" fill-opacity="0.8" />
    `;
  } else if (theme === 'COSMIC_DYSON') {
    // Escena estilo IMG_0518 / IMG_0542: Horizonte orbital de la Tierra + edificio/estación espacial + objeto/megaestructura incandescente
    subjectSvg = `
      <rect width="${width}" height="${height}" fill="#030712" />
      <!-- Curvatura luminosa del planeta Tierra vista desde órbita -->
      <circle cx="${width * 0.38}" cy="${height * 1.65}" r="${height * 1.28}" fill="#1D4ED8" fill-opacity="0.55" stroke="#93C5FD" stroke-width="8" />
      <circle cx="${width * 0.38}" cy="${height * 1.67}" r="${height * 1.26}" fill="#0F172A" />
      <!-- Sistemas de nubes orbitales -->
      <ellipse cx="${width * 0.48}" cy="${height * 0.62}" rx="340" ry="65" fill="#F8FAFC" fill-opacity="0.35" />
      <ellipse cx="${width * 0.68}" cy="${height * 0.72}" rx="280" ry="55" fill="#E0F2FE" fill-opacity="0.45" />
      <!-- Complejo de ensamblaje vertical (estilo VAB NASA en IMG_0518) -->
      <g transform="translate(56, ${Math.round(height * 0.32)})">
        <rect x="0" y="0" width="290" height="${Math.round(height * 0.52)}" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2" />
        <rect x="0" y="0" width="52" height="${Math.round(height * 0.52)}" fill="#94A3B8" />
        <rect x="135" y="0" width="26" height="${Math.round(height * 0.52)}" fill="#334155" />
        <!-- Insignia circular orbital -->
        <circle cx="178" cy="145" r="54" fill="#1E3A8A" />
        <path d="M 135 162 L 228 118 L 168 156 Z" fill="#EF4444" />
        <ellipse cx="178" cy="145" rx="48" ry="16" transform="rotate(-28 178 145)" fill="none" stroke="#FFFFFF" stroke-width="3" />
      </g>
      <!-- Cápsula / Megaestructura entrando en ignición atmosférica a la derecha -->
      <g transform="translate(${Math.round(width * 0.68)}, ${Math.round(height * 0.30)}) rotate(-34)">
        <!-- Estela de plasma incandescente -->
        <polygon points="-45,-55 340,-130 340,130 -45,55" fill="url(#plasmaWakeGrad-${clipId})" />
        <!-- Cilindro metálico orbital -->
        <rect x="-70" y="-52" width="155" height="104" rx="14" fill="#475569" stroke="#FDE047" stroke-width="3" />
        <ellipse cx="-70" cy="0" rx="22" ry="52" fill="#FEF08A" stroke="#F97316" stroke-width="6" />
        <line x1="-30" y1="-52" x2="-30" y2="52" stroke="#1E293B" stroke-width="4" />
        <line x1="25" y1="-52" x2="25" y2="52" stroke="#1E293B" stroke-width="4" />
      </g>
    `;
  } else if (theme === 'HOURGLASS_MIND') {
    // Escena estilo IMG_0550: Ciudad neón acelerada a la izquierda vs atardecer dorado nostálgico a la derecha, divididos por un reloj de arena gigante
    subjectSvg = `
      <rect width="${width}" height="${height}" fill="#090A10" />
      <!-- Mitad izquierda: Metrópolis neón en motion blur -->
      <g>
        <rect x="0" y="0" width="${width * 0.52}" height="${height}" fill="#0F172A" />
        ${[80, 145, 220, 310, 390, 460]
          .map(
            (ly, i) => `
          <rect x="10" y="${ly}" width="${160 + (i % 3) * 90}" height="14" rx="7" fill="${i % 2 === 0 ? '#EC4899' : '#38BDF8'}" fill-opacity="0.75" />`
          )
          .join('')}
      </g>
      <!-- Mitad derecha: Paseo dorado nostálgico al atardecer -->
      <g>
        <rect x="${width * 0.50}" y="0" width="${width * 0.50}" height="${height}" fill="#78350F" fill-opacity="0.65" />
        <circle cx="${width * 0.82}" cy="${height * 0.28}" r="145" fill="#FDE047" fill-opacity="0.45" />
        <!-- Siluetas caminando bajo luz cálida -->
        <circle cx="${width * 0.74}" cy="${height * 0.48}" r="22" fill="#271206" />
        <path d="M ${width * 0.70} ${height * 0.78} L ${width * 0.72} ${height * 0.52} L ${width * 0.77} ${height * 0.52} L ${width * 0.79} ${height * 0.78} Z" fill="#451A03" />
        <circle cx="${width * 0.84}" cy="${height * 0.45}" r="24" fill="#271206" />
        <path d="M ${width * 0.80} ${height * 0.78} L ${width * 0.81} ${height * 0.50} L ${width * 0.88} ${height * 0.50} L ${width * 0.89} ${height * 0.78} Z" fill="#271206" />
      </g>
      <!-- Reloj de arena monumental inclinado en el centro -->
      <g transform="translate(${cx}, ${Math.round(height * 0.40)}) rotate(-9)">
        <rect x="-125" y="-215" width="250" height="18" rx="8" fill="#78350F" stroke="#FDE68A" stroke-width="2.5" />
        <rect x="-125" y="197" width="250" height="18" rx="8" fill="#78350F" stroke="#FDE68A" stroke-width="2.5" />
        <line x1="-102" y1="-197" x2="-102" y2="197" stroke="#92400E" stroke-width="12" />
        <line x1="102" y1="-197" x2="102" y2="197" stroke="#92400E" stroke-width="12" />
        <!-- Bulbos de cristal -->
        <path d="M -86 -195 C -86 -65 -14 -20 0 0 C 14 -20 86 -65 86 -195 Z" fill="#E0F2FE" fill-opacity="0.22" stroke="#F8FAFC" stroke-width="3" />
        <path d="M -86 195 C -86 65 -14 20 0 0 C 14 20 86 65 86 195 Z" fill="#E0F2FE" fill-opacity="0.22" stroke="#F8FAFC" stroke-width="3" />
        <!-- Arena dorada cayendo -->
        <path d="M -66 -110 C -45 -45 -12 -18 0 0 C 12 -18 45 -45 66 -110 Z" fill="#D97706" fill-opacity="0.85" />
        <line x1="0" y1="0" x2="0" y2="185" stroke="#FDE047" stroke-width="4" stroke-dasharray="6 4" />
        <path d="M -74 194 Q 0 115 74 194 Z" fill="#F59E0B" />
      </g>
    `;
  } else if (theme === 'ABYSSAL_OCEAN') {
    // Fosa abismal con sonar batimétrico, nódulos polimetálicos bioluminiscentes y sumergible
    subjectSvg = `
      <rect width="${width}" height="${height}" fill="#020B18" />
      <!-- Haces de luz volumétrica submarina -->
      <polygon points="180,0 380,0 560,${height} 60,${height}" fill="#0EA5E9" fill-opacity="0.14" />
      <polygon points="580,0 760,0 980,${height} 490,${height}" fill="#22D3EE" fill-opacity="0.11" />
      <!-- Relieve de la fosa abismal y malla LIDAR batimétrica -->
      <path d="M 0 ${height * 0.58} Q ${width * 0.25} ${height * 0.46} ${width * 0.52} ${height * 0.64} T ${width} ${height * 0.52} L ${width} ${height} L 0 ${height} Z" fill="#06152D" stroke="#22D3EE" stroke-width="2" stroke-opacity="0.6" />
      <!-- Nódulos de Oxígeno Oscuro / Anomalía Báltica -->
      <ellipse cx="${cx}" cy="${height * 0.62}" rx="235" ry="74" fill="#0F172A" stroke="#38BDF8" stroke-width="3" />
      ${[-140, -65, 10, 85, 155]
        .map(
          (nx, i) => `
        <circle cx="${cx + nx}" cy="${height * 0.62 + (i % 2) * 18 - 8}" r="26" fill="#0284C7" fill-opacity="0.45" stroke="#67E8F9" stroke-width="2.5" />
        <circle cx="${cx + nx}" cy="${height * 0.62 + (i % 2) * 18 - 8}" r="8" fill="#A5F3FC" />`
        )
        .join('')}
      <!-- Vehículo de exploración profunda con faro -->
      <g transform="translate(${Math.round(width * 0.28)}, ${Math.round(height * 0.30)})">
        <polygon points="40,10 380,145 210,255" fill="#38BDF8" fill-opacity="0.24" />
        <rect x="-55" y="-24" width="110" height="48" rx="22" fill="#FACC15" stroke="#FFFFFF" stroke-width="2.5" />
        <circle cx="28" cy="0" r="15" fill="#E0F2FE" />
      </g>
    `;
  } else if (theme === 'ARCHAEOLOGY_LIDAR') {
    // Cámara subterránea / Pirámide escaneada por satélite SAR / LIDAR
    subjectSvg = `
      <rect width="${width}" height="${height}" fill="#08070C" />
      <!-- Pirámide / Estructura megalítica en superficie -->
      <polygon points="${cx},65 ${cx - 340},${height * 0.48} ${cx + 340},${height * 0.48}" fill="#1E1B18" stroke="#F59E0B" stroke-width="2.5" />
      <!-- Línea del suelo y cámaras subterráneas reveladas por radar SAR -->
      <line x1="0" y1="${height * 0.48}" x2="${width}" y2="${height * 0.48}" stroke="#38BDF8" stroke-width="3" stroke-dasharray="10 6" />
      <!-- 8 Cilindros verticales subterráneos (Caso Khafre / Gobekli / Maya) -->
      ${[-220, -155, -90, -25, 40, 105, 170, 235]
        .map(
          (px) => `
        <rect x="${cx + px - 16}" y="${height * 0.49}" width="32" height="${height * 0.36}" rx="6" fill="#0F172A" stroke="#22D3EE" stroke-width="2" stroke-opacity="0.8" />
        <line x1="${cx + px - 16}" y1="${height * 0.62}" x2="${cx + px + 16}" y2="${height * 0.62}" stroke="#F59E0B" stroke-width="2" />`
        )
        .join('')}
    `;
  } else {
    // QUANTUM_AI_CORE (Estilo @ingenia.ai / @tecnologia): Líderes/Investigadores + Núcleo Cuántico & HUD
    subjectSvg = `
      <rect width="${width}" height="${height}" fill="#070913" />
      <!-- Halo de computación cuántica -->
      <circle cx="${cx}" cy="${cy - 20}" r="240" fill="${accent}" fill-opacity="0.18" />
      <circle cx="${cx}" cy="${cy - 20}" r="165" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="12 8" stroke-opacity="0.65" />
      <!-- Rack de supercomputación / Chandelier cuántico al fondo -->
      <g transform="translate(${cx}, ${Math.round(height * 0.36)})">
        <rect x="-150" y="-155" width="300" height="22" rx="6" fill="#F59E0B" stroke="#FEF08A" stroke-width="2" />
        <rect x="-115" y="-95" width="230" height="18" rx="6" fill="#D97706" stroke="#FEF08A" stroke-width="1.5" />
        <rect x="-80" y="-35" width="160" height="16" rx="5" fill="#F59E0B" stroke="#FEF08A" stroke-width="1.5" />
        <line x1="-85" y1="-155" x2="-55" y2="45" stroke="#FDE047" stroke-width="3" />
        <line x1="0" y1="-155" x2="0" y2="65" stroke="#38BDF8" stroke-width="4" />
        <line x1="85" y1="-155" x2="55" y2="45" stroke="#FDE047" stroke-width="3" />
        <circle cx="0" cy="65" r="28" fill="#00F0FF" fill-opacity="0.85" />
      </g>
      <!-- Silueta de protagonista / investigador con gafas de laboratorio iluminadas -->
      <g transform="translate(${cx + 35}, ${Math.round(height * 0.52)})">
        <path d="M -185 260 C -175 75 175 75 185 260 Z" fill="#1E3A8A" stroke="#60A5FA" stroke-width="2" />
        <ellipse cx="0" cy="-35" rx="76" ry="92" fill="#D6A286" />
        <path d="M -78 -55 C -85 -135 85 -135 78 -55 C 60 -95 -60 -95 -78 -55 Z" fill="#1E1B18" />
        <!-- Gafas con reflejo de pantalla violeta/cian -->
        <rect x="-64" y="-58" width="54" height="32" rx="10" fill="#818CF8" fill-opacity="0.45" stroke="#E0E7FF" stroke-width="3.5" />
        <rect x="10" y="-58" width="54" height="32" rx="10" fill="#818CF8" fill-opacity="0.45" stroke="#E0E7FF" stroke-width="3.5" />
        <line x1="-10" y1="-44" x2="10" y2="-44" stroke="#E0E7FF" stroke-width="3.5" />
      </g>
    `;
  }

  return `
    <defs>
      <clipPath id="${clipId}">
        <rect x="0" y="0" width="${width}" height="${height}" />
      </clipPath>
      <linearGradient id="jetBeamGrad-${clipId}" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
        <stop offset="45%" stop-color="#60A5FA" stop-opacity="0.55" />
        <stop offset="100%" stop-color="#1E3A8A" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="plasmaWakeGrad-${clipId}" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.95" />
        <stop offset="35%" stop-color="#F97316" stop-opacity="0.80" />
        <stop offset="100%" stop-color="#7F1D1D" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g clip-path="url(#${clipId})">
      ${subjectSvg}
      ${particlesSvg}
      ${bokehSvg}
      <!-- Retícula HUD sutil de autenticidad científica -->
      <g stroke="#FFFFFF" stroke-opacity="0.16" stroke-width="1">
        <line x1="48" y1="52" x2="96" y2="52" />
        <line x1="48" y1="52" x2="48" y2="100" />
        <line x1="${width - 48}" y1="52" x2="${width - 96}" y2="52" />
        <line x1="${width - 48}" y1="52" x2="${width - 48}" y2="100" />
      </g>
    </g>
  `;
}

// Medallón Circular ("Cutout Zoom") con borde blanco y flecha curva blanca
function renderCutoutMedallion({
  cx = 210,
  cy = 550,
  r = 148,
  accent = '#C04BFF',
  variant = 'neural',
  withArrow = true,
  arrowSide = 'right'
}) {
  let innerArt = '';
  if (variant === 'speaker') {
    // Estilo IMG_0515: Figura pública / portavoz en debate con micrófonos
    innerArt = `
      <circle cx="0" cy="0" r="${r}" fill="#1E3A8A" />
      <circle cx="0" cy="${-r * 0.45}" r="${r * 0.42}" fill="#FDE68A" />
      <ellipse cx="0" cy="${-r * 0.22}" rx="${r * 0.34}" ry="${r * 0.40}" fill="#F3C6A8" />
      <circle cx="${-r * 0.12}" cy="${-r * 0.25}" r="6" fill="#0F172A" />
      <circle cx="${r * 0.12}" cy="${-r * 0.25}" r="6" fill="#0F172A" />
      <path d="M ${-r * 0.65} ${r * 0.95} C ${-r * 0.55} ${r * 0.20} ${r * 0.55} ${r * 0.20} ${r * 0.65} ${r * 0.95} Z" fill="#090A0F" stroke="#E2E8F0" stroke-width="4" stroke-dasharray="8 6" />
    `;
  } else if (variant === 'eye_zoom') {
    // Estilo IMG_0539: Detalle macro de iris / sensor biométrico
    innerArt = `
      <circle cx="0" cy="0" r="${r}" fill="#E2E8F0" />
      <circle cx="0" cy="0" r="${r * 0.66}" fill="#D97706" stroke="#78350F" stroke-width="6" />
      <circle cx="0" cy="0" r="${r * 0.28}" fill="#000000" />
      <circle cx="${-r * 0.16}" cy="${-r * 0.16}" r="${r * 0.10}" fill="#FFFFFF" fill-opacity="0.85" />
    `;
  } else {
    // Estilo IMG_0517: Icono de red neuronal / nodo de pensamiento sobre fondo terracota/acento
    innerArt = `
      <circle cx="0" cy="0" r="${r}" fill="#C86D51" />
      <path d="M ${-r * 0.28} ${r * 0.52} C ${-r * 0.48} ${r * 0.12} ${-r * 0.35} ${-r * 0.58} ${r * 0.10} ${-r * 0.55} C ${r * 0.48} ${-r * 0.52} ${r * 0.52} ${r * 0.10} ${r * 0.15} ${r * 0.48}"
        fill="none" stroke="#1E0E0A" stroke-width="8" stroke-linecap="round" />
      <!-- Nodos blancos conectados -->
      <line x1="0" y1="-22" x2="-58" y2="-22" stroke="#FFFFFF" stroke-width="7" />
      <line x1="0" y1="-22" x2="-34" y2="-68" stroke="#FFFFFF" stroke-width="7" />
      <line x1="0" y1="-22" x2="42" y2="-58" stroke="#FFFFFF" stroke-width="7" />
      <line x1="0" y1="-22" x2="56" y2="-10" stroke="#FFFFFF" stroke-width="7" />
      <line x1="0" y1="-22" x2="36" y2="34" stroke="#FFFFFF" stroke-width="7" />
      <circle cx="0" cy="-22" r="18" fill="#FFFFFF" />
      <circle cx="-58" cy="-22" r="11" fill="#FFFFFF" />
      <circle cx="-34" cy="-68" r="11" fill="#FFFFFF" />
      <circle cx="42" cy="-58" r="11" fill="#FFFFFF" />
      <circle cx="56" cy="-10" r="11" fill="#FFFFFF" />
      <circle cx="36" cy="34" r="11" fill="#FFFFFF" />
    `;
  }

  let arrowSvg = '';
  if (withArrow) {
    if (arrowSide === 'right') {
      arrowSvg = `
        <path d="M ${r * 0.72} ${r * 0.78} Q ${r * 1.32} ${r * 0.42} ${r * 1.28} ${-r * 0.08}"
          fill="none" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round" />
        <polygon points="${r * 1.28},${-r * 0.32} ${r * 1.04},${r * 0.02} ${r * 1.52},${r * 0.04}" fill="#FFFFFF" />
      `;
    } else {
      arrowSvg = `
        <path d="M ${-r * 0.72} ${-r * 0.35} Q ${-r * 1.18} ${-r * 0.62} ${-r * 1.05} ${-r * 1.08}"
          fill="none" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" />
        <polygon points="${-r * 1.05},${-r * 1.28} ${-r * 1.26},${-r * 0.94} ${-r * 0.82},${-r * 0.94}" fill="#FFFFFF" />
      `;
    }
  }

  return `
    <g transform="translate(${cx}, ${cy})">
      <circle cx="0" cy="8" r="${r + 4}" fill="#000000" fill-opacity="0.55" />
      <g>
        ${innerArt}
      </g>
      <circle cx="0" cy="0" r="${r}" fill="none" stroke="#FFFFFF" stroke-width="6" />
      ${arrowSvg}
    </g>
  `;
}

// ----------------------------------------------------------------------------
// Renderizadores de los 7 Arquetipos de Portada (Slide 1/5)
// ----------------------------------------------------------------------------

// 1. INGENIA_PURPURA (@ingenia.ai — IMG_0517, IMG_0534)
function renderCoverIngeniaPurpura(carousel, slide, niche) {
  const accent = '#C04BFF';
  const headline = slide.headline || carousel.title || 'DESCUBRIMIENTO CIENTÍFICO DE ALTO IMPACTO';
  const lines = wrapLines(headline.toUpperCase(), 21, 5);
  const subNiche = cleanRenderableText(niche?.name || slide.badgeText || 'Inteligencia & Ciencia');

  const fontSize = lines.length >= 5 ? 66 : 74;
  const lineHeight = Math.round(fontSize * 1.13);
  const startY = 868;

  // Alterna líneas en Blanco Puro y Púrpura Eléctrico como en IMG_0517 e IMG_0534
  const headlineSvg = lines
    .map((line, idx) => {
      const isPurple = idx === 0 || idx >= Math.ceil(lines.length / 2);
      const fill = isPurple ? accent : '#FFFFFF';
      return `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="${fill}" font-family="Impact, 'Arial Black', Haettenschweiler, sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.5">${escapeXml(line)}</text>`;
    })
    .join('\n');

  return `
    <!-- Escena superior cinematográfica (0..785px) -->
    ${renderPhotorealScene(carousel, slide, niche, 1080, 785, 'clip-ingenia-cover')}
    <!-- Fundido suave a negro puro -->
    <rect x="0" y="500" width="1080" height="295" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="780" width="1080" height="570" fill="#000000" />
    <!-- Medallón circular izquierdo con flecha blanca curva (IMG_0517) -->
    ${renderCutoutMedallion({ cx: 215, cy: 560, r: 150, accent, variant: 'neural', withArrow: true, arrowSide: 'right' })}
    <!-- Firma central verificada sobre línea blanca horizontal -->
    <g transform="translate(540, 736)">
      ${renderBrandEmblem(-132, 0, 20, accent, 'diamond')}
      <text x="-100" y="2" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="27" font-weight="800">Códice.AI</text>
      ${renderVerifiedCheck(42, -6, 11)}
      <text x="-100" y="26" fill="#94A3B8" font-family="'Segoe UI', Arial, sans-serif" font-size="18" font-weight="500">${escapeXml(subNiche)}</text>
    </g>
    <!-- Línea horizontal blanca de lado a lado (IMG_0517 / IMG_0534) -->
    <line x1="48" y1="782" x2="1032" y2="782" stroke="#FFFFFF" stroke-width="2.2" stroke-opacity="0.9" />
    <!-- Titular condensado gigante Blanco + Púrpura -->
    ${headlineSvg}
  `;
}

// 2. TRASELVELO_AMARILLO (@traselveloreal — IMG_0515)
function renderCoverTrasElVeloAmarillo(carousel, slide, niche) {
  const yellow = '#FFE600';
  const headline = slide.headline || carousel.title || 'HALLAZGO HISTÓRICO CAMBIA LA CIENCIA OFICIAL';
  const lines = wrapLines(headline.toUpperCase(), 23, 5);
  const fontSize = lines.length >= 5 ? 66 : 72;
  const lineHeight = Math.round(fontSize * 1.12);
  const startY = 850;

  // Primeras líneas en Amarillo Vibrante (#FFE600) y última línea en Blanco Puro (#FFFFFF) como en IMG_0515
  const headlineSvg = lines
    .map((line, idx) => {
      const isLast = idx === lines.length - 1 && lines.length > 1;
      const fill = isLast ? '#FFFFFF' : yellow;
      return `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="${fill}" font-family="Impact, 'Arial Black', Haettenschweiler, sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.4">${escapeXml(line)}</text>`;
    })
    .join('\n');

  return `
    <!-- Escena superior de laboratorio / investigación (0..800px) -->
    ${renderPhotorealScene(carousel, slide, niche, 1080, 800, 'clip-traselvelo-cover')}
    <!-- Medallón circular derecho con borde blanco (IMG_0515) -->
    ${renderCutoutMedallion({ cx: 745, cy: 335, r: 215, accent: yellow, variant: 'speaker', withArrow: false })}
    <!-- Fundido a negro puro -->
    <rect x="0" y="540" width="1080" height="270" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="795" width="1080" height="555" fill="#000000" />
    <!-- Titular condensado Amarillo + Blanco -->
    ${headlineSvg}
    <!-- Barra inferior idéntica a IMG_0515 -->
    <g transform="translate(0, 1272)">
      ${renderBrandEmblem(72, 0, 32, yellow, 'eye')}
      <text x="120" y="10" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="31" font-weight="800">Códice Anómalo</text>
      ${renderVerifiedCheck(394, 1, 14)}
      <line x1="428" y1="2" x2="642" y2="2" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.7" />
      <text x="668" y="10" fill="${yellow}" font-family="Impact, 'Arial Black', sans-serif" font-size="29" font-weight="900" letter-spacing="0.8">DESLIZA PARA VER MÁS →</text>
    </g>
  `;
}

// 3. CONSCIENTE_RASGADO (@consciente — IMG_0516)
function renderCoverConscienteRasgado(carousel, slide, niche) {
  const headline = slide.headline || carousel.title || 'UNA TEORÍA AFIRMA QUE ABRIÓ OTRA DIMENSIÓN CON SUS EXPERIMENTOS';
  const lines = wrapLines(headline.toUpperCase(), 24, 4);
  const startY = 588;
  const lineHeight = 58;

  const headlineSvg = lines
    .map((line, idx) => {
      const isHighlight = idx === 1 || idx === 2;
      const fill = isHighlight ? '#09090B' : '#18181B';
      const weight = isHighlight ? '900' : '800';
      return `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="${fill}" font-family="'Segoe UI', 'Arial Black', Arial, sans-serif" font-size="45" font-weight="${weight}" letter-spacing="0.2">${escapeXml(line)}</text>`;
    })
    .join('\n');

  return `
    <!-- Escena superior (0..530px) -->
    ${renderPhotorealScene(carousel, slide, niche, 1080, 535, 'clip-consciente-top', 'primary')}
    <!-- Escena inferior (790..1350px) -->
    <g transform="translate(0, 790)">
      ${renderPhotorealScene(carousel, slide, niche, 1080, 560, 'clip-consciente-bottom', 'secondary')}
    </g>
    <!-- Marca superior centrada estilo @consciente -->
    <g transform="translate(540, 44)">
      <circle cx="-86" cy="-6" r="14" fill="#FFFFFF" />
      <text x="-62" y="2" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="24" font-weight="900" letter-spacing="1.2">CÓDICE ANÓMALO</text>
    </g>
    <!-- Sombra del papel rasgado -->
    <polygon points="0,492 95,480 190,496 310,482 430,495 540,480 660,494 790,478 910,495 1015,484 1080,492 1080,838 990,825 880,842 760,828 640,844 510,826 390,842 260,828 140,840 50,826 0,836"
      fill="#000000" fill-opacity="0.55" transform="translate(0, 10)" />
    <!-- Banda central de PAPEL BLANCO RASGADO (IMG_0516) -->
    <polygon points="0,492 95,480 190,496 310,482 430,495 540,480 660,494 790,478 910,495 1015,484 1080,492 1080,834 990,822 880,838 760,824 640,840 510,822 390,838 260,824 140,836 50,822 0,832"
      fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
    <!-- Borde fibroso del papel -->
    <polyline points="0,498 95,486 190,502 310,488 430,501 540,486 660,500 790,484 910,501 1015,490 1080,498"
      fill="none" stroke="#CBD5E1" stroke-width="3" />
    <polyline points="0,826 50,816 140,830 260,818 390,832 510,816 640,834 760,818 880,832 990,816 1080,828"
      fill="none" stroke="#CBD5E1" stroke-width="3" />
    <!-- Sirenas de emergencia vectoriales a izquierda y derecha (IMG_0516) -->
    ${renderEmergencySiren(68, 665, 1.15)}
    ${renderEmergencySiren(1012, 665, 1.15)}
    <!-- Titular central sobre el papel rasgado -->
    ${headlineSvg}
    <!-- Marca inferior centrada -->
    <g transform="translate(540, 1304)">
      <circle cx="-86" cy="-6" r="12" fill="#FFFFFF" />
      <text x="-64" y="2" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="1.2">CÓDICE ANÓMALO</text>
    </g>
  `;
}

// 4. DNOTICI_ROJO (@dnotici — IMG_0518)
function renderCoverDnoticiRojo(carousel, slide, niche) {
  const headline = slide.headline || carousel.title || 'LA NASA ADVIERTE LA CAÍDA DE UN OBJETO A LA TIERRA SIN CONTROL';
  const lines = wrapLines(headline.toUpperCase(), 21, 5);
  const fontSize = lines.length >= 5 ? 70 : lines.length === 4 ? 78 : 84;
  const lineHeight = Math.round(fontSize * 1.08);
  const startY = lines.length >= 5 ? 865 : 895;

  const headlineSvg = lines
    .map(
      (line, idx) =>
        `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="#FFFFFF" font-family="Impact, 'Arial Black', Haettenschweiler, sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.6">${escapeXml(line)}</text>`
    )
    .join('\n');

  return `
    <!-- Escena superior dramática (0..780px) -->
    ${renderPhotorealScene(carousel, slide, niche, 1080, 780, 'clip-dnotici-cover')}
    <!-- Esquina superior izquierda: Barra vertical roja + CÓDICE ANÓMALO apilado (IMG_0518) -->
    <g transform="translate(42, 42)">
      <rect x="-12" y="-12" width="280" height="148" rx="14" fill="#000000" fill-opacity="0.48" />
      <rect x="0" y="0" width="18" height="122" fill="#DC2626" />
      <text x="30" y="58" fill="#FFFFFF" font-family="Impact, 'Arial Black', sans-serif" font-size="64" font-weight="900" letter-spacing="1">CÓDICE</text>
      <text x="30" y="118" fill="#EF4444" font-family="Impact, 'Arial Black', sans-serif" font-size="56" font-weight="900" letter-spacing="0.8">ANÓMALO</text>
    </g>
    <!-- Faldón inferior en degradado carmesí profundo con patrón halftone (IMG_0518) -->
    <rect x="0" y="700" width="1080" height="650" fill="url(#crimsonBottomGrad)" />
    <rect x="0" y="760" width="1080" height="590" fill="url(#halftoneDotsPattern)" opacity="0.28" />
    <!-- Titular condensado blanco ultra-impactante -->
    ${headlineSvg}
    <!-- Línea negra inferior de cierre -->
    <line x1="56" y1="1312" x2="1024" y2="1312" stroke="#000000" stroke-width="6" />
  `;
}

// 5. TECNOLOGIA_CUTOUT (@tecnologia — IMG_0519, IMG_0539)
function renderCoverTecnologiaCutout(carousel, slide, niche) {
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
    <!-- Escena superior (0..780px) -->
    ${renderPhotorealScene(carousel, slide, niche, 1080, 780, 'clip-tecnologia-cover')}
    <!-- Fundido a negro puro -->
    <rect x="0" y="520" width="1080" height="270" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="775" width="1080" height="575" fill="#000000" />
    <!-- Doble medallón circular superpuesto en la derecha con flecha blanca curva (IMG_0539) -->
    ${renderCutoutMedallion({ cx: 925, cy: 520, r: 96, accent: '#00F0FF', variant: 'eye_zoom', withArrow: false })}
    ${renderCutoutMedallion({ cx: 790, cy: 615, r: 146, accent: '#00F0FF', variant: 'speaker', withArrow: true, arrowSide: 'left' })}
    <!-- Píldora superior derecha 1/5 -->
    <rect x="942" y="42" width="96" height="52" rx="26" fill="#000000" fill-opacity="0.65" />
    <text x="990" y="76" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="28" font-weight="700">1/5</text>
    <!-- Etiqueta inclinada TECNOLOGÍA alineada a la izquierda (IMG_0519 / IMG_0539) -->
    <g transform="translate(92, 732) skewX(-12)">
      <rect x="0" y="0" width="330" height="54" rx="10" fill="#18181B" stroke="#3F3F46" stroke-width="1.5" />
      <text x="165" y="38" text-anchor="middle" fill="#FFFFFF" font-family="'Arial Black', Impact, sans-serif" font-size="29" font-weight="900" letter-spacing="1.2">${escapeXml(badge.slice(0, 18))}</text>
    </g>
    <!-- Gran pregunta alineada a la izquierda -->
    ${headlineSvg}
    <!-- Subtítulo limpio -->
    <text x="92" y="1265" fill="#D4D4D8" font-family="'Segoe UI', Arial, sans-serif" font-size="36" font-weight="400">${escapeXml(subtitle.slice(0, 48))}</text>
  `;
}

// 6. CIENCIA_SATURNO_SPLIT (@desde_la_ciencia / @kingxitytv — IMG_0542, IMG_0551)
function renderCoverCienciaSaturnoSplit(carousel, slide, niche) {
  const lime = '#D8FF3E';
  const headline = slide.headline || carousel.title || 'Cada agujero negro escondería un universo entero y el nuestro habría nacido dentro de uno';
  const lines = wrapLines(headline, 25, 4);
  const inst = cleanRenderableText(carousel.institutionTag || 'Indiana University');
  const loc = cleanRenderableText(carousel.locationTag || 'Estados Unidos');

  const splitIndex = Math.ceil(lines.length / 2);
  const topLines = lines.slice(0, splitIndex);
  const bottomLines = lines.slice(splitIndex);

  return `
    <!-- Mitad superior dividida 50/50 verticalmente (IMG_0551) -->
    <g>
      ${renderPhotorealScene(carousel, slide, niche, 538, 760, 'clip-split-left', 'primary')}
      <g transform="translate(542, 0)">
        ${renderPhotorealScene(carousel, slide, niche, 538, 760, 'clip-split-right', 'splitRight')}
      </g>
      <!-- Línea divisoria vertical amarilla central (IMG_0551) -->
      <line x1="540" y1="0" x2="540" y2="755" stroke="#EAB308" stroke-width="7" />
    </g>
    <!-- Fundido a negro puro -->
    <rect x="0" y="540" width="1080" height="235" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="760" width="1080" height="590" fill="#000000" />
    <!-- Línea horizontal blanca con icono vectorial de Saturno en el centro (IMG_0542) -->
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
          `<text x="540" y="${905 + idx * 84}" text-anchor="middle" fill="${lime}" font-family="Impact, 'Arial Black', Haettenschweiler, sans-serif" font-size="76" font-weight="900">${escapeXml(line)}</text>`
      )
      .join('\n')}
    <!-- Subtitular inferior en Blanco condensado (IMG_0551) -->
    ${bottomLines
      .map(
        (line, idx) =>
          `<text x="540" y="${905 + topLines.length * 84 + 10 + idx * 68}" text-anchor="middle" fill="#FFFFFF" font-family="Impact, 'Arial Black', Haettenschweiler, sans-serif" font-size="60" font-weight="900">${escapeXml(line)}</text>`
      )
      .join('\n')}
    <!-- Indicador inferior DESLIZAR A MÁS >>> (IMG_0542) -->
    <text x="540" y="1322" text-anchor="middle" fill="#CBD5E1" font-family="'Segoe UI', Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="1.5">DESLIZAR A MÁS &gt;&gt;&gt;</text>
  `;
}

// 7. EVOLUCIONA_GOLD (@mentalidadexitosa_ / @ia.evoluciona — IMG_0550)
function renderCoverEvolucionaGold(carousel, slide, niche) {
  const gold = '#D6A74A';
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
      return `<text x="540" y="${startY + idx * lineHeight}" text-anchor="middle" fill="${fill}" font-family="Impact, 'Arial Black', Haettenschweiler, sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.6">${escapeXml(line)}</text>`;
    })
    .join('\n');

  return `
    <!-- Escena superior atmosférica con reloj de arena / dualidad temporal (0..720px) -->
    ${renderPhotorealScene(carousel, slide, niche, 1080, 720, 'clip-evoluciona-cover')}
    <!-- Píldora superior derecha 1/5 -->
    <rect x="942" y="42" width="96" height="52" rx="26" fill="#000000" fill-opacity="0.55" />
    <text x="990" y="76" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="28" font-weight="700">1/5</text>
    <!-- Fundido profundo a negro puro -->
    <rect x="0" y="470" width="1080" height="260" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="715" width="1080" height="635" fill="#000000" />
    <!-- Titular condensado Blanco + Dorado Cálido (IMG_0550) -->
    ${headlineSvg}
    <!-- Flecha minimalista elegante centrada abajo (IMG_0550: ───────▷) -->
    <g transform="translate(540, 1286)">
      <line x1="-75" y1="0" x2="55" y2="0" stroke="#A1A1AA" stroke-width="2.5" />
      <polygon points="80,0 55,-11 55,11" fill="none" stroke="#A1A1AA" stroke-width="2.5" />
    </g>
  `;
}

// ----------------------------------------------------------------------------
// Diapositivas Interiores (Slides 2/5, 3/5, 4/5)
// ----------------------------------------------------------------------------

// Variante A: Editorial @ingenia.ai (IMG_0535.png, IMG_0536.png)
function renderInteriorIngeniaEditorial(carousel, slide, niche, archetypeMeta) {
  const accent = carousel.accentColor || archetypeMeta.accentColor || '#C04BFF';
  const slideNum = slide.slideNumber || 2;
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
    slide.sourceUrl || carousel.sourceCitation || `https://codiceanomalo.studio/expedientes/${(carousel.dossierCode || 'ca-2026').toLowerCase()}`
  );
  const statVal = cleanRenderableText(slide.statValue || carousel.metrics?.retention ? `${carousel.metrics.retention}%` : '');
  const statLbl = cleanRenderableText(slide.statLabel || carousel.institutionTag || '');

  return `
    <!-- Fondo negro puro editorial (IMG_0535 / IMG_0536) -->
    <rect width="1080" height="1350" fill="#000000" />

    <!-- Cabecera superior derecha: Logo + Códice Anómalo + Píldora 2/5 -->
    <g transform="translate(740, 68)">
      ${renderBrandEmblem(0, 8, 34, accent, 'diamond')}
      <text x="48" y="6" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="33" font-weight="800">Códice</text>
      <text x="48" y="34" fill="#A1A1AA" font-family="'Segoe UI', Arial, sans-serif" font-size="20" font-weight="500">@codice.anomalo</text>
      <rect x="202" y="-24" width="96" height="54" rx="27" fill="#27272A" />
      <text x="250" y="12" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="27" font-weight="700">${slideNum}/5</text>
    </g>

    <!-- Título de pregunta / hallazgo en negrita (IMG_0535) -->
    ${headlineLines
      .map(
        (line, idx) =>
          `<text x="56" y="${178 + idx * 54}" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="44" font-weight="800">${escapeXml(line)}</text>`
      )
      .join('\n')}

    <!-- Párrafo editorial de alta legibilidad (IMG_0535) -->
    ${bodyLines
      .map((line, idx) => {
        const yPos = (headlineLines.length > 1 ? 290 : 246) + idx * 46;
        return `<text x="56" y="${yPos}" fill="#E4E4E7" font-family="'Segoe UI', Arial, sans-serif" font-size="32" font-weight="400">${escapeXml(line)}</text>`;
      })
      .join('\n')}

    <!-- Gran recuadro fotográfico / evidencia con bordes redondeados y borde blanco (IMG_0535) -->
    <g transform="translate(56, 565)">
      <clipPath id="evidence-frame-clip-${slideNum}">
        <rect x="0" y="0" width="968" height="580" rx="24" />
      </clipPath>
      <g clip-path="url(#evidence-frame-clip-${slideNum})">
        ${renderPhotorealScene(carousel, slide, niche, 968, 580, `inner-scene-${slideNum}`, slideNum % 2 === 0 ? 'primary' : 'secondary')}
        <!-- Degradado inferior dentro de la tarjeta para resaltar la métrica HUD -->
        <rect x="0" y="390" width="968" height="190" fill="url(#fadeToBlackGrad)" />
        <!-- Etiqueta de telemetría / dato duro dentro de la evidencia -->
        <g transform="translate(32, 465)">
          <rect x="0" y="0" width="904" height="88" rx="16" fill="#09090B" fill-opacity="0.82" stroke="${accent}" stroke-width="1.8" stroke-opacity="0.7" />
          <text x="28" y="38" fill="${accent}" font-family="Impact, 'Arial Black', sans-serif" font-size="28" letter-spacing="1">${escapeXml(
            cleanRenderableText(slide.headline || slide.badgeText || `ACTO 0${slideNum} // EVIDENCIA VERIFICADA`).toUpperCase()
          )}</text>
          <text x="28" y="70" fill="#F8FAFC" font-family="'Segoe UI', Arial, sans-serif" font-size="24" font-weight="600">${escapeXml(
            cleanRenderableText(slide.highlight || slide.highlightText || slide.visualCaption || carousel.title).slice(0, 58)
          )}</text>
          ${
            statVal
              ? `<text x="876" y="56" text-anchor="end" fill="#FFFFFF" font-family="Impact, 'Arial Black', sans-serif" font-size="44">${escapeXml(statVal)}</text>`
              : ''
          }
        </g>
      </g>
      <rect x="0" y="0" width="968" height="580" rx="24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.7" />
    </g>

    <!-- Pie de fuente en cursiva debajo del recuadro (IMG_0535 / IMG_0536) -->
    <text x="56" y="1198" fill="#D4D4D8" font-family="'Segoe UI', Georgia, serif" font-size="26" font-style="italic">
      ${escapeXml(sourceText.slice(0, 74))}
    </text>
    <text x="56" y="1234" fill="#71717A" font-family="'Segoe UI', Georgia, serif" font-size="23" font-style="italic">
      ${escapeXml(carousel.dossierCode || 'EXPEDIENTE #CA-0001')} • ${escapeXml(statLbl || 'Archivo Códice Anómalo')}
    </text>
  `;
}

// Variante B: Tarjeta de Expediente Redondeada con Borde Blanco (@ia.evoluciona — IMG_0547.png)
function renderInteriorDossierCard(carousel, slide, niche, archetypeMeta) {
  const accent = carousel.accentColor || archetypeMeta.accentColor || '#22C55E';
  const slideNum = slide.slideNumber || 4;
  const p1Lines = wrapLines(slide.questionTitle || slide.headline || 'Hallazgo crítico del expediente científico.', 46, 2);
  const p2Lines = wrapLines(slide.body || slide.bodyText || '', 48, 4);
  const p3Lines = wrapLines(slide.highlight || slide.highlightText || slide.visualCaption || carousel.subtitle || '', 48, 3);

  return `
    <!-- Fondo negro puro (IMG_0547) -->
    <rect width="1080" height="1350" fill="#000000" />

    <!-- Cabecera superior derecha fuera de la tarjeta (IMG_0547) -->
    <g transform="translate(740, 66)">
      ${renderBrandEmblem(0, 8, 34, accent, 'diamond')}
      <text x="48" y="6" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="31" font-weight="800">Códice</text>
      <text x="48" y="34" fill="#A1A1AA" font-family="'Segoe UI', Arial, sans-serif" font-size="20">@codice.anomalo</text>
      <rect x="206" y="-22" width="92" height="52" rx="26" fill="#27272A" />
      <text x="252" y="12" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="26" font-weight="700">${slideNum}/5</text>
    </g>

    <!-- Gran contenedor redondeado con borde blanco (IMG_0547) -->
    <g transform="translate(52, 136)">
      <rect x="0" y="0" width="976" height="1136" rx="28" fill="#050508" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.85" />

      <!-- Cabecera interna de perfil verificado dentro de la tarjeta -->
      <circle cx="56" cy="58" r="28" fill="#18181B" stroke="${accent}" stroke-width="2" />
      <text x="56" y="67" text-anchor="middle" fill="#FFFFFF" font-family="Impact, sans-serif" font-size="24">CA</text>
      <text x="100" y="52" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="25" font-weight="800">${escapeXml(
        cleanRenderableText(carousel.institutionTag || 'Códice_Lab').slice(0, 36)
      )}</text>
      ${renderVerifiedCheck(915, 43, 14)}
      <text x="100" y="80" fill="#71717A" font-family="'Segoe UI', Arial, sans-serif" font-size="21">@codice.anomalo • ${escapeXml(
        carousel.dossierCode || 'EXP-2026'
      )}</text>

      <!-- Bloques de texto estructurados estilo tweet/dossier (IMG_0547) -->
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

      <!-- Doble evidencia visual lado a lado en la base de la tarjeta (IMG_0547) -->
      <!-- Recuadro izquierdo: Tarjeta blanca de dato clave / institución -->
      <g transform="translate(22, 576)">
        <rect x="0" y="0" width="456" height="534" rx="18" fill="#F8FAFC" />
        <circle cx="92" cy="235" r="44" fill="none" stroke="#D97706" stroke-width="8" stroke-dasharray="14 8" />
        <text x="152" y="255" fill="#09090B" font-family="Georgia, 'Times New Roman', serif" font-size="68" font-weight="700">${escapeXml(
          cleanRenderableText(slide.statValue || '99.4%').slice(0, 8)
        )}</text>
        <text x="42" y="340" fill="#334155" font-family="'Segoe UI', Arial, sans-serif" font-size="26" font-weight="700">${escapeXml(
          cleanRenderableText(slide.statLabel || 'Nivel de confianza instrumental').slice(0, 32)
        )}</text>
        <text x="42" y="475" fill="#64748B" font-family="'Segoe UI', Arial, sans-serif" font-size="21" font-weight="600">${escapeXml(
          cleanRenderableText(carousel.sourceCitation || 'Fuente: Paper revisado por pares').slice(0, 34)
        )}</text>
      </g>

      <!-- Recuadro derecho: Escena visual de evidencia -->
      <g transform="translate(498, 576)">
        <clipPath id="dossier-right-clip-${slideNum}">
          <rect x="0" y="0" width="456" height="534" rx="18" />
        </clipPath>
        <g clip-path="url(#dossier-right-clip-${slideNum})">
          ${renderPhotorealScene(carousel, slide, niche, 456, 534, `dossier-scene-${slideNum}`, 'primary')}
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
  const keyword = cleanRenderableText(carousel.ctaKeyword || 'EXPEDIENTE').toUpperCase();
  const deliverable = cleanRenderableText(
    carousel.dmDeliverable || 'Dossier PDF extendido con fuentes científicas originales, diagramas y análisis completo.'
  );
  const headlineLines = wrapLines(slide.headline || '¿Quieres recibir el expediente científico completo en tu DM?', 28, 3);
  const delivLines = wrapLines(deliverable, 44, 3);

  return `
    <!-- Fondo con escena atmosférica superior oscurecida -->
    <rect width="1080" height="1350" fill="#000000" />
    <g opacity="0.45">
      ${renderPhotorealScene(carousel, slide, niche, 1080, 560, 'clip-cta-bg', 'primary')}
    </g>
    <rect x="0" y="240" width="1080" height="340" fill="url(#fadeToBlackGrad)" />
    <rect x="0" y="550" width="1080" height="800" fill="#000000" />

    <!-- Cabecera superior derecha 5/5 -->
    <g transform="translate(740, 68)">
      ${renderBrandEmblem(0, 8, 34, accent, 'diamond')}
      <text x="48" y="6" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="31" font-weight="800">Códice</text>
      <text x="48" y="34" fill="#A1A1AA" font-family="'Segoe UI', Arial, sans-serif" font-size="20">@codice.anomalo</text>
      <rect x="202" y="-24" width="96" height="54" rx="27" fill="${accent}" />
      <text x="250" y="12" text-anchor="middle" fill="#000000" font-family="'Segoe UI', Arial, sans-serif" font-size="27" font-weight="900">5/5</text>
    </g>

    <!-- Tarjeta de conversión DM con borde blanco brillante -->
    <g transform="translate(56, 175)">
      <rect x="0" y="0" width="968" height="1065" rx="30" fill="#07070C" fill-opacity="0.94" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.82" />

      <!-- Etiqueta de Dossier Desbloqueable -->
      <rect x="48" y="44" width="430" height="50" rx="25" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-width="1.8" />
      <text x="263" y="77" text-anchor="middle" fill="${accent}" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="1.5">
        ACCESO DIRECTO AL EXPEDIENTE
      </text>

      <!-- Pregunta de cierre -->
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
        <text x="436" y="162" text-anchor="middle" fill="${accent}" font-family="Impact, 'Arial Black', Haettenschweiler, sans-serif" font-size="96" font-weight="900" letter-spacing="3">
          &quot;${escapeXml(keyword)}&quot;
        </text>
      </g>

      <!-- Entregable automático por DM -->
      <text x="48" y="645" fill="#FFFFFF" font-family="'Segoe UI', Arial, sans-serif" font-size="30" font-weight="800">
        ¿Qué recibirás al instante en tus mensajes privados (DM)?
      </text>
      ${delivLines
        .map(
          (line, idx) =>
            `<text x="48" y="${698 + idx * 42}" fill="#D4D4D8" font-family="'Segoe UI', Arial, sans-serif" font-size="28">${escapeXml(line)}</text>`
        )
        .join('\n')}

      <!-- 3 Píldoras de acción de alto engagement (Guardar / Compartir / Seguir) -->
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
    // Diapositivas interiores 2, 3 y 4:
    // Usa la tarjeta redondeada con borde blanco (IMG_0547) para EVOLUCIONA_GOLD o el slide 4,
    // y el diseño editorial @ingenia.ai (IMG_0535 / IMG_0536) para los demás.
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
