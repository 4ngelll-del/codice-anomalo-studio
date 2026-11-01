// scripts/generate-profile-and-nov1-pack.mjs
// ============================================================================
// GENERADOR DE IDENTIDAD VISUAL DE PERFIL + PAQUETE DE LANZAMIENTO HOY (01 NOV 2026)
// Códice Anómalo Studio (@codice.anomalo)
// Produce en PNG de Ultra-Alta Definición con @resvg/resvg-js:
//   1. 01_FOTO_PERFIL_OFICIAL_DIAMANTE_NEON_1080x1080.png (Emblema Cuántico Púrpura/Cian)
//   2. 02_FOTO_PERFIL_ALTERNATIVA_OJO_DORADO_1080x1080.png (Emblema Bóveda Imperial Oro)
//   3. 03_FONDO_DETRAS_DEL_PERFIL_BANNER_1920x1080.png (Banner Panorámico de Marca / Link-in-Bio / Meta)
//   4. 04_FONDO_VERTICAL_HISTORIA_BIENVENIDA_1080x1920.png (Story Fijada / Fondo de Canal)
//   5. 7 Portadas de Historias Destacadas (HIGHLIGHT_01 a HIGHLIGHT_07 en 1080x1920)
//   6. Los 3 Carruseles Oficiales de HOY Domingo 1 de Noviembre de 2026 (09:00, 15:00 y 21:00 CDMX)
//      + Trío alternativo de Domingo Astronómico (#CA-0019, #CA-0020, #CA-0021)
//   7. Espejo público en public/ig-profile/ y public/ig-nov01/ para la API de Instagram Graph
// ============================================================================

import fs from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import JSZip from 'jszip';
import { buildWeekBatch, NICHES } from '../src/data/weeklyBatch.js';
import { createSlideSvg, ARCHETYPE_META, escapeXml } from '../src/utils/viralSlideSvg.js';

const FONT_SANS = "'Arial Black', 'Impact', 'Montserrat', 'Segoe UI', 'Helvetica Neue', sans-serif";
const FONT_BODY = "'Segoe UI', 'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'Consolas', 'Courier New', monospace";

// ============================================================================
// 1. GENERADOR SVG: FOTO DE PERFIL OFICIAL (1080x1080)
// Diseñada con margen de seguridad circular para que en el recorte redondo de
// Instagram (tanto en móvil 110px como en comentarios 32px) tenga contraste hipnótico.
// ============================================================================
export function createAvatarSvg(variant = 'neon') {
  const isGold = variant === 'gold';
  const primary = isGold ? '#FFE600' : '#C04BFF';
  const secondary = isGold ? '#D6A74A' : '#00F0FF';
  const tertiary = isGold ? '#FFFbeb' : '#38BDF8';
  const coreBg1 = isGold ? '#0B0904' : '#070312';
  const coreBg2 = isGold ? '#030304' : '#02040A';
  const badgeTop = isGold ? 'ARCHIVO CLASIFICADO' : 'CÓDICE ANÓMALO';
  const badgeBottom = isGold ? 'BÓVEDA CENTRAL • MMXXVI' : 'CIENCIA • TECH • MISTERIO';

  // Anillos de graduación tipo astrolabio / telemetría dentro del círculo de Instagram
  let ticks = '';
  for (let i = 0; i < 72; i++) {
    const angle = i * 5;
    const isMajor = i % 6 === 0;
    const r1 = isMajor ? 452 : 464;
    const r2 = 478;
    const rad = (angle * Math.PI) / 180;
    const x1 = (540 + Math.cos(rad) * r1).toFixed(1);
    const y1 = (540 + Math.sin(rad) * r1).toFixed(1);
    const x2 = (540 + Math.cos(rad) * r2).toFixed(1);
    const y2 = (540 + Math.sin(rad) * r2).toFixed(1);
    const strokeCol = isMajor ? secondary : primary;
    const op = isMajor ? '0.85' : '0.35';
    const sw = isMajor ? '4' : '2';
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${strokeCol}" stroke-width="${sw}" opacity="${op}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <radialGradient id="bgRad" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="${coreBg1}"/>
      <stop offset="65%" stop-color="${coreBg2}"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <radialGradient id="auraCenter" cx="50%" cy="48%" r="44%">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0.42"/>
      <stop offset="50%" stop-color="${secondary}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${secondary}"/>
      <stop offset="50%" stop-color="${primary}"/>
      <stop offset="100%" stop-color="${secondary}"/>
    </linearGradient>
    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="55%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="${secondary}"/>
    </linearGradient>
  </defs>

  <!-- Fondo abismal -->
  <rect width="1080" height="1080" fill="url(#bgRad)"/>
  <circle cx="540" cy="540" r="480" fill="url(#auraCenter)"/>

  <!-- Retícula geométrica sagrada de fondo -->
  <g opacity="0.16" stroke="${secondary}" stroke-width="1.5" fill="none">
    <circle cx="540" cy="540" r="410"/>
    <circle cx="540" cy="540" r="340" stroke-dasharray="10 8"/>
    <circle cx="540" cy="540" r="260"/>
    <line x1="60" y1="540" x2="1020" y2="540"/>
    <line x1="540" y1="60" x2="540" y2="1020"/>
    <line x1="190" y1="190" x2="890" y2="890"/>
    <line x1="890" y1="190" x2="190" y2="890"/>
  </g>

  <!-- Anillo perimetral diseñado para encajar al milímetro en el recorte circular de Instagram -->
  <circle cx="540" cy="540" r="502" fill="none" stroke="url(#ringGrad)" stroke-width="18" opacity="0.95"/>
  <circle cx="540" cy="540" r="484" fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity="0.45"/>
  ${ticks}

  <!-- Octágono / Estrella de geometría hermética -->
  <g transform="translate(540, 495)">
    <polygon points="0,-310 220,-220 310,0 220,220 0,310 -220,220 -310,0 -220,-220"
      fill="none" stroke="${primary}" stroke-width="3" opacity="0.45"/>
    <rect x="-205" y="-205" width="410" height="410" rx="28" transform="rotate(45)"
      fill="#050711" fill-opacity="0.88" stroke="url(#ringGrad)" stroke-width="10"/>
    <rect x="-178" y="-178" width="356" height="356" rx="18" transform="rotate(45)"
      fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.35"/>

    <!-- Triángulo de iluminación superior e inferior -->
    <polygon points="0,-245 212,122 -212,122" fill="none" stroke="${secondary}" stroke-width="4" opacity="0.55"/>
    <polygon points="0,245 212,-122 -212,-122" fill="none" stroke="${primary}" stroke-width="4" opacity="0.45"/>

    <!-- OJO CUÁNTICO CENTRAL (Símbolo de Códice Anómalo) -->
    <path d="M -210 0 Q 0 -155 210 0 Q 0 155 -210 0 Z"
      fill="#040814" stroke="url(#ringGrad)" stroke-width="12"/>
    <path d="M -182 0 Q 0 -122 182 0 Q 0 122 -182 0 Z"
      fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity="0.6"/>

    <!-- Iris cibernético -->
    <circle cx="0" cy="0" r="76" fill="${primary}" fill-opacity="0.28" stroke="${secondary}" stroke-width="8"/>
    <circle cx="0" cy="0" r="54" fill="#03050C" stroke="${primary}" stroke-width="5" stroke-dasharray="16 8"/>
    <!-- Pupila diamante -->
    <polygon points="0,-36 28,0 0,36 -28,0" fill="${secondary}"/>
    <circle cx="-18" cy="-18" r="10" fill="#FFFFFF" opacity="0.95"/>
    <circle cx="20" cy="14" r="5" fill="${tertiary}" opacity="0.85"/>

    <!-- Nodos de circuito laterales -->
    <circle cx="-210" cy="0" r="11" fill="${secondary}"/>
    <circle cx="210" cy="0" r="11" fill="${secondary}"/>
    <circle cx="0" cy="-255" r="11" fill="${primary}"/>
    <circle cx="0" cy="255" r="11" fill="${primary}"/>
  </g>

  <!-- Cartela superior curvada / Etiqueta de autoridad -->
  <rect x="290" y="102" width="500" height="54" rx="27" fill="#070B16" fill-opacity="0.92" stroke="${secondary}" stroke-width="3"/>
  <text x="540" y="138" text-anchor="middle" fill="#FFFFFF" font-family="${FONT_MONO}" font-size="25" font-weight="800" letter-spacing="6">${escapeXml(badgeTop)}</text>

  <!-- Placa tipográfica inferior de alto contraste (Legible en miniatura) -->
  <g transform="translate(540, 845)">
    <rect x="-350" y="-68" width="700" height="132" rx="28" fill="#05070F" fill-opacity="0.96" stroke="url(#ringGrad)" stroke-width="6"/>
    <text x="0" y="-8" text-anchor="middle" fill="url(#metalGrad)" font-family="${FONT_SANS}" font-size="60" font-weight="900" letter-spacing="4">CÓDICE ANÓMALO</text>
    <text x="0" y="40" text-anchor="middle" fill="${secondary}" font-family="${FONT_MONO}" font-size="22" font-weight="700" letter-spacing="5">${escapeXml(badgeBottom)}</text>
  </g>
</svg>`;
}

// ============================================================================
// 2. GENERADOR SVG: BANNER PANORÁMICO DETRÁS DEL PERFIL / META / LINK-IN-BIO (1920x1080)
// ============================================================================
export function createProfileBannerSvg() {
  const nichesList = [
    { code: '01', name: 'IA & BIOCÓMPUTO', color: '#00F0FF' },
    { code: '02', name: 'FENÓMENO EMPÍRICO', color: '#10B981' },
    { code: '03', name: 'MISTERIOS SIN RESOLVER', color: '#F59E0B' },
    { code: '04', name: 'COSMOLOGÍA & ÓPTICA', color: '#EC4899' },
    { code: '05', name: 'MEGA-INGENIERÍA', color: '#C04BFF' },
    { code: '06', name: 'COSMOS PROFUNDO', color: '#38BDF8' },
    { code: '07', name: 'ARCHIVO DIGITAL', color: '#FFE600' }
  ];

  const pillsSvg = nichesList
    .map((n, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const x = 110 + col * 435;
      const y = 790 + row * 86;
      return `<g transform="translate(${x}, ${y})">
        <rect width="410" height="66" rx="16" fill="#080D1A" fill-opacity="0.92" stroke="${n.color}" stroke-width="2.5"/>
        <circle cx="32" cy="33" r="9" fill="${n.color}"/>
        <text x="54" y="40" fill="#FFFFFF" font-family="${FONT_MONO}" font-size="18.5" font-weight="700" letter-spacing="1.2">${escapeXml(n.code)} // ${escapeXml(n.name)}</text>
      </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="bannerBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#04020C"/>
      <stop offset="50%" stop-color="#080D1E"/>
      <stop offset="100%" stop-color="#03050B"/>
    </linearGradient>
    <radialGradient id="glowLeft" cx="22%" cy="42%" r="45%">
      <stop offset="0%" stop-color="#C04BFF" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowRight" cx="82%" cy="38%" r="45%">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00F0FF"/>
      <stop offset="50%" stop-color="#C04BFF"/>
      <stop offset="100%" stop-color="#FFE600"/>
    </linearGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#bannerBg)"/>
  <rect width="1920" height="1080" fill="url(#glowLeft)"/>
  <rect width="1920" height="1080" fill="url(#glowRight)"/>

  <!-- Cuadrícula de observatorio astronómico y telemetría -->
  <g stroke="#1E293B" stroke-width="1" opacity="0.45">
    <line x1="0" y1="180" x2="1920" y2="180"/>
    <line x1="0" y1="360" x2="1920" y2="360"/>
    <line x1="0" y1="540" x2="1920" y2="540"/>
    <line x1="0" y1="720" x2="1920" y2="720"/>
    <line x1="320" y1="0" x2="320" y2="1080"/>
    <line x1="640" y1="0" x2="640" y2="1080"/>
    <line x1="960" y1="0" x2="960" y2="1080"/>
    <line x1="1280" y1="0" x2="1280" y2="1080"/>
    <line x1="1600" y1="0" x2="1600" y2="1080"/>
  </g>

  <!-- Marco perimetral de expediente -->
  <rect x="44" y="44" width="1832" height="992" rx="32" fill="none" stroke="url(#accentLine)" stroke-width="4" opacity="0.85"/>
  <rect x="64" y="64" width="1792" height="952" rx="24" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.18"/>

  <!-- Emblema holográfico derecho -->
  <g transform="translate(1510, 410)">
    <circle cx="0" cy="0" r="250" fill="#050814" fill-opacity="0.85" stroke="#00F0FF" stroke-width="4"/>
    <circle cx="0" cy="0" r="215" fill="none" stroke="#C04BFF" stroke-width="3" stroke-dasharray="14 10"/>
    <polygon points="0,-190 165,95 -165,95" fill="none" stroke="#00F0FF" stroke-width="4" opacity="0.65"/>
    <polygon points="0,190 165,-95 -165,-95" fill="none" stroke="#C04BFF" stroke-width="4" opacity="0.65"/>
    <rect x="-115" y="-115" width="230" height="230" rx="18" transform="rotate(45)" fill="#070B19" stroke="#FFE600" stroke-width="5"/>
    <path d="M -115 0 Q 0 -86 115 0 Q 0 86 -115 0 Z" fill="#040814" stroke="#00F0FF" stroke-width="7"/>
    <circle cx="0" cy="0" r="40" fill="#C04BFF" fill-opacity="0.35" stroke="#FFFFFF" stroke-width="5"/>
    <polygon points="0,-20 16,0 0,20 -16,0" fill="#00F0FF"/>
    <text x="0" y="295" text-anchor="middle" fill="#00F0FF" font-family="${FONT_MONO}" font-size="22" font-weight="700" letter-spacing="4">ID: @CODICE.ANOMALO</text>
  </g>

  <!-- Encabezado de telemetría izquierda -->
  <rect x="110" y="105" width="660" height="54" rx="27" fill="#0B132B" stroke="#00F0FF" stroke-width="2.5"/>
  <circle cx="148" cy="132" r="10" fill="#10B981"/>
  <text x="176" y="140" fill="#E2E8F0" font-family="${FONT_MONO}" font-size="22" font-weight="700" letter-spacing="3">SISTEMA EDITORIAL ACTIVO • UTC-6 CDMX</text>

  <!-- Título Monumental -->
  <text x="110" y="295" fill="#FFFFFF" font-family="${FONT_SANS}" font-size="118" font-weight="900" letter-spacing="3">CÓDICE ANÓMALO</text>
  <text x="110" y="385" fill="#C04BFF" font-family="${FONT_SANS}" font-size="54" font-weight="800" letter-spacing="4">@CODICE.ANOMALO • ARCHIVO DOCUMENTAL</text>

  <rect x="110" y="425" width="1060" height="6" fill="url(#accentLine)"/>

  <!-- Lema Oficial -->
  <text x="110" y="502" fill="#F8FAFC" font-family="${FONT_BODY}" font-size="35" font-weight="700">EL ARCHIVO DE LO QUE LA CIENCIA Y LA HISTORIA OFICIAL</text>
  <text x="110" y="552" fill="#00F0FF" font-family="${FONT_BODY}" font-size="32" font-weight="800">NO TE CONTARON — EVIDENCIA EMPÍRICA, TECNOLOGÍA Y MISTERIO</text>

  <!-- Estadísticas del sistema -->
  <g transform="translate(110, 610)">
    <rect width="330" height="110" rx="18" fill="#090E1C" stroke="#C04BFF" stroke-width="2.5"/>
    <text x="28" y="48" fill="#C04BFF" font-family="${FONT_SANS}" font-size="40" font-weight="900">3 CARRUSELES/DÍA</text>
    <text x="28" y="84" fill="#94A3B8" font-family="${FONT_MONO}" font-size="20" font-weight="700">09:00 • 15:00 • 21:00 CDMX</text>

    <g transform="translate(360, 0)">
      <rect width="330" height="110" rx="18" fill="#090E1C" stroke="#00F0FF" stroke-width="2.5"/>
      <text x="28" y="48" fill="#00F0FF" font-family="${FONT_SANS}" font-size="40" font-weight="900">1,092 DOSSIERS</text>
      <text x="28" y="84" fill="#94A3B8" font-family="${FONT_MONO}" font-size="20" font-weight="700">PLAN ANUAL 52 SEMANAS</text>
    </g>

    <g transform="translate(720, 0)">
      <rect width="340" height="110" rx="18" fill="#090E1C" stroke="#FFE600" stroke-width="2.5"/>
      <text x="28" y="48" fill="#FFE600" font-family="${FONT_SANS}" font-size="40" font-weight="900">COMENTA "CODICE"</text>
      <text x="28" y="84" fill="#94A3B8" font-family="${FONT_MONO}" font-size="20" font-weight="700">BÓVEDA AUTOMÁTICA POR DM</text>
    </g>
  </g>

  <!-- Los 7 Nichos Oficiales -->
  <text x="110" y="768" fill="#94A3B8" font-family="${FONT_MONO}" font-size="22" font-weight="700" letter-spacing="4">LOS 7 PILARES TEMÁTICOS DE ALTA RETENCIÓN:</text>
  ${pillsSvg}

  <g transform="translate(1415, 876)">
    <rect width="395" height="66" rx="16" fill="#131005" stroke="#FFE600" stroke-width="2.5"/>
    <text x="197" y="42" text-anchor="middle" fill="#FFE600" font-family="${FONT_MONO}" font-size="22" font-weight="800" letter-spacing="2">VERIFICADO • 100% ORIGINAL</text>
  </g>
</svg>`;
}

// ============================================================================
// 3. GENERADOR SVG: PORTADA VERTICAL DE BIENVENIDA / FONDO DE CANAL (1080x1920)
// ============================================================================
export function createWelcomeStorySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <linearGradient id="stBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#05020E"/>
      <stop offset="50%" stop-color="#070B1A"/>
      <stop offset="100%" stop-color="#020307"/>
    </linearGradient>
    <radialGradient id="stGlow" cx="50%" cy="34%" r="45%">
      <stop offset="0%" stop-color="#C04BFF" stop-opacity="0.38"/>
      <stop offset="60%" stop-color="#00F0FF" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1920" fill="url(#stBg)"/>
  <rect width="1080" height="1920" fill="url(#stGlow)"/>

  <!-- Marco editorial -->
  <rect x="48" y="48" width="984" height="1824" rx="40" fill="none" stroke="#C04BFF" stroke-width="4" opacity="0.8"/>
  <rect x="72" y="72" width="936" height="1776" rx="30" fill="none" stroke="#00F0FF" stroke-width="1.5" opacity="0.35"/>

  <rect x="200" y="130" width="680" height="58" rx="29" fill="#090F22" stroke="#00F0FF" stroke-width="2.5"/>
  <text x="540" y="167" text-anchor="middle" fill="#00F0FF" font-family="${FONT_MONO}" font-size="23" font-weight="800" letter-spacing="4">MANIFIESTO OFICIAL • INICIA AQUÍ</text>

  <!-- Emblema Central -->
  <g transform="translate(540, 520)">
    <circle cx="0" cy="0" r="240" fill="#050814" stroke="#C04BFF" stroke-width="6"/>
    <circle cx="0" cy="0" r="205" fill="none" stroke="#00F0FF" stroke-width="3" stroke-dasharray="14 10"/>
    <rect x="-125" y="-125" width="250" height="250" rx="22" transform="rotate(45)" fill="#070B18" stroke="#00F0FF" stroke-width="6"/>
    <path d="M -130 0 Q 0 -95 130 0 Q 0 95 -130 0 Z" fill="#040814" stroke="#C04BFF" stroke-width="8"/>
    <circle cx="0" cy="0" r="46" fill="#00F0FF" fill-opacity="0.3" stroke="#FFFFFF" stroke-width="5"/>
    <polygon points="0,-24 18,0 0,24 -18,0" fill="#FFE600"/>
  </g>

  <text x="540" y="880" text-anchor="middle" fill="#FFFFFF" font-family="${FONT_SANS}" font-size="82" font-weight="900" letter-spacing="3">CÓDICE ANÓMALO</text>
  <text x="540" y="945" text-anchor="middle" fill="#00F0FF" font-family="${FONT_MONO}" font-size="30" font-weight="700" letter-spacing="6">@CODICE.ANOMALO</text>

  <rect x="140" y="1010" width="800" height="4" fill="#C04BFF"/>

  <text x="540" y="1095" text-anchor="middle" fill="#F8FAFC" font-family="${FONT_BODY}" font-size="38" font-weight="700">BIENVENIDO A LA BÓVEDA DE</text>
  <text x="540" y="1150" text-anchor="middle" fill="#FFE600" font-family="${FONT_SANS}" font-size="46" font-weight="900">CIENCIA LÍMITE Y ARCHIVOS OCULTOS</text>

  <!-- Pasos de Onboarding -->
  <g transform="translate(110, 1230)">
    <rect width="860" height="125" rx="22" fill="#0A1022" stroke="#00F0FF" stroke-width="2.5"/>
    <text x="45" y="55" fill="#00F0FF" font-family="${FONT_SANS}" font-size="34" font-weight="900">01. TRES EXPEDIENTES DIARIOS</text>
    <text x="45" y="96" fill="#CBD5E1" font-family="${FONT_BODY}" font-size="26" font-weight="600">Nuevos carruseles 4:5 a las 09:00, 15:00 y 21:00 hrs (CDMX).</text>
  </g>

  <g transform="translate(110, 1385)">
    <rect width="860" height="125" rx="22" fill="#0A1022" stroke="#C04BFF" stroke-width="2.5"/>
    <text x="45" y="55" fill="#C04BFF" font-family="${FONT_SANS}" font-size="34" font-weight="900">02. EVIDENCIA REVISADA POR PARES</text>
    <text x="45" y="96" fill="#CBD5E1" font-family="${FONT_BODY}" font-size="26" font-weight="600">Papers, patentes desclasificadas, astrofísica e ingeniería extrema.</text>
  </g>

  <g transform="translate(110, 1540)">
    <rect width="860" height="145" rx="22" fill="#141106" stroke="#FFE600" stroke-width="3.5"/>
    <text x="45" y="58" fill="#FFE600" font-family="${FONT_SANS}" font-size="35" font-weight="900">03. RESPONDE "CODICE" A ESTA HISTORIA</text>
    <text x="45" y="104" fill="#FFFFFF" font-family="${FONT_BODY}" font-size="23.5" font-weight="700">Recibe automáticamente por DM los 7 Dossiers PDF de iniciación.</text>
  </g>

  <text x="540" y="1795" text-anchor="middle" fill="#94A3B8" font-family="${FONT_MONO}" font-size="24" font-weight="700" letter-spacing="4">GUARDA Y ACTIVA NOTIFICACIONES EN EL PERFIL ↗</text>
</svg>`;
}

// ============================================================================
// 4. GENERADOR SVG: 7 PORTADAS DE HISTORIAS DESTACADAS (HIGHLIGHTS 1080x1920)
// El icono central está inscrito en un círculo de radio 380 centrado en (540, 960),
// que es exactamente el área que Instagram recorta por defecto al subir una portada
// de Historia Destacada 9:16.
// ============================================================================
export const HIGHLIGHTS_SPEC = [
  {
    file: 'HIGHLIGHT_01_IA_Y_TECH.png',
    publicFile: 'highlight-1.png',
    title: 'IA & Tech',
    subtitle: 'BIOCÓMPUTO & SILICIO',
    color: '#00F0FF',
    secondary: '#3B82F6',
    iconType: 'chip'
  },
  {
    file: 'HIGHLIGHT_02_INSOLITO.png',
    publicFile: 'highlight-2.png',
    title: 'Insólito',
    subtitle: 'FENÓMENO EMPÍRICO',
    color: '#10B981',
    secondary: '#34D399',
    iconType: 'eye'
  },
  {
    file: 'HIGHLIGHT_03_MISTERIOS.png',
    publicFile: 'highlight-3.png',
    title: 'Misterios',
    subtitle: 'EXPEDIENTE ABIERTO',
    color: '#F59E0B',
    secondary: '#FDE047',
    iconType: 'pyramid'
  },
  {
    file: 'HIGHLIGHT_04_COSMOLOGIA.png',
    publicFile: 'highlight-4.png',
    title: 'Cosmología',
    subtitle: 'ÓPTICA & GEODESIA',
    color: '#EC4899',
    secondary: '#F472B6',
    iconType: 'astrolabe'
  },
  {
    file: 'HIGHLIGHT_05_MEGA_ING.png',
    publicFile: 'highlight-5.png',
    title: 'Mega-Ing',
    subtitle: 'INGENIERÍA EXTREMA',
    color: '#C04BFF',
    secondary: '#A855F7',
    iconType: 'dyson'
  },
  {
    file: 'HIGHLIGHT_06_ESPACIO.png',
    publicFile: 'highlight-6.png',
    title: 'Cosmos',
    subtitle: 'ESPACIO PROFUNDO',
    color: '#38BDF8',
    secondary: '#60A5FA',
    iconType: 'saturn'
  },
  {
    file: 'HIGHLIGHT_07_DOSSIERS_DM.png',
    publicFile: 'highlight-7.png',
    title: 'Dossiers VIP',
    subtitle: 'BÓVEDA PDF • DM',
    color: '#FFE600',
    secondary: '#F59E0B',
    iconType: 'vault'
  }
];

function renderHighlightCenterIcon(iconType, color, secondary) {
  switch (iconType) {
    case 'chip':
      return `<g stroke="${color}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <rect x="-110" y="-110" width="220" height="220" rx="28" fill="#06101E" stroke="${color}" stroke-width="12"/>
        <rect x="-62" y="-62" width="124" height="124" rx="14" fill="${color}" fill-opacity="0.2" stroke="#FFFFFF" stroke-width="6"/>
        <circle cx="0" cy="0" r="24" fill="${color}"/>
        <!-- Pines del procesador neuronal -->
        <line x1="-60" y1="-165" x2="-60" y2="-110"/><line x1="0" y1="-180" x2="0" y2="-110"/><line x1="60" y1="-165" x2="60" y2="-110"/>
        <line x1="-60" y1="110" x2="-60" y2="165"/><line x1="0" y1="110" x2="0" y2="180"/><line x1="60" y1="110" x2="60" y2="165"/>
        <line x1="-165" y1="-60" x2="-110" y2="-60"/><line x1="-180" y1="0" x2="-110" y2="0"/><line x1="-165" y1="60" x2="-110" y2="60"/>
        <line x1="110" y1="-60" x2="165" y2="-60"/><line x1="110" y1="0" x2="180" y2="0"/><line x1="110" y1="60" x2="165" y2="60"/>
      </g>`;
    case 'eye':
      return `<g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M -185 0 Q 0 -145 185 0 Q 0 145 -185 0 Z" fill="#051812" stroke="${color}" stroke-width="14"/>
        <circle cx="0" cy="0" r="68" fill="${color}" fill-opacity="0.25" stroke="#FFFFFF" stroke-width="8"/>
        <polygon points="0,-34 26,0 0,34 -26,0" fill="${color}"/>
        <circle cx="-18" cy="-16" r="10" fill="#FFFFFF"/>
        <line x1="0" y1="-175" x2="0" y2="-130" stroke="${secondary}" stroke-width="8"/>
        <line x1="0" y1="130" x2="0" y2="175" stroke="${secondary}" stroke-width="8"/>
      </g>`;
    case 'pyramid':
      return `<g fill="none" stroke-linejoin="round">
        <polygon points="0,-175 180,135 -180,135" fill="#171005" stroke="${color}" stroke-width="14"/>
        <polygon points="0,-115 120,100 -120,100" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.65"/>
        <path d="M -75 20 Q 0 -45 75 20 Q 0 85 -75 20 Z" fill="#0A0804" stroke="${color}" stroke-width="8"/>
        <circle cx="0" cy="20" r="18" fill="${color}"/>
      </g>`;
    case 'astrolabe':
      return `<g fill="none" stroke="${color}" stroke-width="10">
        <circle cx="0" cy="0" r="165" fill="#180614" stroke-width="12"/>
        <circle cx="0" cy="0" r="115" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="16 10"/>
        <ellipse cx="0" cy="0" rx="165" ry="68" transform="rotate(-28)" stroke="${secondary}" stroke-width="8"/>
        <ellipse cx="0" cy="0" rx="165" ry="68" transform="rotate(28)" stroke="${color}" stroke-width="8"/>
        <polygon points="0,-145 28,-28 145,0 28,28 0,145 -28,28 -145,0 -28,-28" fill="${color}" fill-opacity="0.28" stroke="#FFFFFF" stroke-width="5"/>
        <circle cx="0" cy="0" r="18" fill="#FFFFFF"/>
      </g>`;
    case 'dyson':
      return `<g fill="none">
        <polygon points="0,-175 152,-88 152,88 0,175 -152,88 -152,-88" fill="#11061D" stroke="${color}" stroke-width="14"/>
        <polygon points="0,-120 104,-60 104,60 0,120 -104,60 -104,-60" stroke="#FFFFFF" stroke-width="5" opacity="0.7"/>
        <circle cx="0" cy="0" r="52" fill="${color}" fill-opacity="0.35" stroke="${color}" stroke-width="10"/>
        <circle cx="0" cy="0" r="22" fill="#FFFFFF"/>
        <line x1="0" y1="-175" x2="0" y2="-52" stroke="${color}" stroke-width="6"/>
        <line x1="152" y1="-88" x2="45" y2="-26" stroke="${color}" stroke-width="6"/>
        <line x1="152" y1="88" x2="45" y2="26" stroke="${color}" stroke-width="6"/>
        <line x1="0" y1="175" x2="0" y2="52" stroke="${color}" stroke-width="6"/>
        <line x1="-152" y1="88" x2="-45" y2="26" stroke="${color}" stroke-width="6"/>
        <line x1="-152" y1="-88" x2="-45" y2="-26" stroke="${color}" stroke-width="6"/>
      </g>`;
    case 'saturn':
      return `<g fill="none">
        <circle cx="0" cy="0" r="96" fill="#061528" stroke="${color}" stroke-width="12"/>
        <ellipse cx="0" cy="0" rx="205" ry="58" transform="rotate(-22)" stroke="#FFFFFF" stroke-width="10"/>
        <ellipse cx="0" cy="0" rx="180" ry="44" transform="rotate(-22)" stroke="${color}" stroke-width="8"/>
        <circle cx="-30" cy="-28" r="16" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="125" cy="-115" r="12" fill="${color}"/>
        <circle cx="-140" cy="105" r="9" fill="#FFFFFF"/>
      </g>`;
    case 'vault':
    default:
      return `<g fill="none">
        <rect x="-145" y="-145" width="290" height="290" rx="42" fill="#171305" stroke="${color}" stroke-width="14"/>
        <circle cx="0" cy="-18" r="56" fill="${color}" fill-opacity="0.22" stroke="#FFFFFF" stroke-width="10"/>
        <circle cx="0" cy="-18" r="20" fill="${color}"/>
        <path d="M -22 30 L 22 30 L 34 105 L -34 105 Z" fill="${color}"/>
      </g>`;
  }
}

export function createHighlightCoverSvg(spec) {
  const iconMarkup = renderHighlightCenterIcon(spec.iconType, spec.color, spec.secondary);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <radialGradient id="hlBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#0B0F1E"/>
      <stop offset="70%" stop-color="#04060C"/>
      <stop offset="100%" stop-color="#010204"/>
    </radialGradient>
    <radialGradient id="hlGlow" cx="50%" cy="50%" r="36%">
      <stop offset="0%" stop-color="${spec.color}" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1920" fill="url(#hlBg)"/>
  <circle cx="540" cy="960" r="520" fill="url(#hlGlow)"/>

  <!-- Anillo central (Zona exacta del recorte circular de Historias Destacadas en Instagram) -->
  <g transform="translate(540, 960)">
    <circle cx="0" cy="0" r="370" fill="#050811" stroke="${spec.color}" stroke-width="18"/>
    <circle cx="0" cy="0" r="338" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.4" stroke-dasharray="18 12"/>
    <circle cx="0" cy="0" r="295" fill="none" stroke="${spec.color}" stroke-width="3" opacity="0.3"/>
    ${iconMarkup}
  </g>

  <!-- Etiquetas superiores e inferiores para cuando el usuario abre la historia a pantalla completa -->
  <text x="540" y="360" text-anchor="middle" fill="#94A3B8" font-family="${FONT_MONO}" font-size="26" font-weight="700" letter-spacing="6">@CODICE.ANOMALO // ARCHIVO DESTACADO</text>
  <text x="540" y="1505" text-anchor="middle" fill="#FFFFFF" font-family="${FONT_SANS}" font-size="68" font-weight="900" letter-spacing="2">${escapeXml(spec.title.toUpperCase())}</text>
  <text x="540" y="1568" text-anchor="middle" fill="${spec.color}" font-family="${FONT_MONO}" font-size="28" font-weight="800" letter-spacing="5">${escapeXml(spec.subtitle)}</text>
</svg>`;
}

// ============================================================================
// 5. DOCUMENTO MAESTRO DE CONFIGURACIÓN DEL PERFIL Y PUBLICACIÓN DE HOY
// ============================================================================
function buildMasterProfileMarkdown(launchCarousels, sundayAltCarousels) {
  return `# 🏛️ GUÍA OFICIAL DE CONFIGURACIÓN DE PERFIL + PAQUETE DE LANZAMIENTO HOY (DOMINGO 1 DE NOVIEMBRE DE 2026)

- **Cuenta Oficial Verificada Disponible:** \`@codice.anomalo\` (Alternativas: \`@codiceanomalo\`, \`@elcodiceanomalo\`, \`@codiceanomalo.lab\`)
- **Fecha de Lanzamiento:** **HOY Domingo 1 de Noviembre de 2026**
- **Zona Horaria Oficial:** \`America/Mexico_City (UTC-6)\`
- **URL Pública de Activos para Instagram Graph API:** \`https://codice-anomalo-studio.4ngelll-200.workers.dev/ig-nov01/\` y \`https://codice-anomalo-studio.4ngelll-200.workers.dev/ig-profile/\`

---

## 👤 PASO 1: CONFIGURACIÓN EXACTA DEL PERFIL DE INSTAGRAM (COPIAR Y PEGAR)

### 1.1 Nombre de Usuario (\`@handle\`)
\`\`\`text
codice.anomalo
\`\`\`

### 1.2 Nombre Visible Optimizado para SEO (58 caracteres)
\`\`\`text
Códice Anómalo | Ciencia Límite, IA y Archivos Ocultos 👁️
\`\`\`

### 1.3 Categoría de Cuenta Profesional (Modo Creador)
- **Categoría Principal Recomendada:** \`Educación\` o \`Sitio web de ciencia, tecnología e ingeniería\`
- **Mostrar etiqueta de categoría en el perfil:** \`Activado\` (color gris neutro de autoridad).

### 1.4 Biografía de 4 Líneas de Alta Conversión (146 caracteres — No se corta con "... más")
\`\`\`text
🏛️ Archivo de anomalías históricas, ciencia límite y tecnología.
🧠 Decodificamos lo que borraron del registro oficial.
📂 Bóveda: 7 Dossiers PDF
👇 Comenta "CODICE" o entra aquí:
\`\`\`

### 1.5 Enlace de Biografía (Link-in-Bio)
- **URL:** \`https://codice-anomalo-studio.4ngelll-200.workers.dev\`
- **Título del Enlace:** \`📂 Bóveda Oficial + Dossiers PDF Desclasificados\`

---

## 🖼️ PASO 2: ACTIVOS GRÁFICOS DEL PERFIL INCLUIDOS EN ESTA CARPETA

1. **Foto de Perfil Principal (\`1080×1080 px\`):**
   - Archivo: \`01_FOTO_PERFIL_OFICIAL_DIAMANTE_NEON_1080x1080.png\` (también copiado como \`01_FOTO_DE_PERFIL_AVATAR_1080x1080.png\`)
   - Diseño: Emblema cuántico en negro abismal con anillo perimetral luminoso Púrpura Eléctrico (\`#C04BFF\`) y Cian (\`#00F0FF\`), ojo geométrico central y placa \`CÓDICE ANÓMALO\`. Diseñado para verse ultra-nítido en el recorte circular de Instagram.
2. **Foto de Perfil Alternativa Dorada (\`1080×1080 px\`):**
   - Archivo: \`02_FOTO_PERFIL_ALTERNATIVA_OJO_DORADO_1080x1080.png\` (también copiado como \`02_FOTO_DE_PERFIL_OJO_DORADO_1080x1080.png\`)
   - Diseño: Edición Bóveda Imperial en Negro y Oro (\`#FFE600\` / \`#D6A74A\`).
3. **Imagen de Fondo Detrás del Perfil / Banner Meta / Canal / Web (\`1920×1080 px\`):**
   - Archivo: \`03_FONDO_DETRAS_DEL_PERFIL_BANNER_1920x1080.png\` (también copiado como \`03_BANNER_FONDO_PERFIL_Y_META_1920x1080.png\`)
   - Nota sobre Instagram: Como el perfil nativo de Instagram móvil no tiene "banner horizontal" tipo X/YouTube, este archivo sirve como **Fondo Oficial del Perfil en Meta Business Suite / Página de Facebook vinculada / Portada de Canal de Difusión / Cabecera de Link-in-Bio**.
4. **Portada Vertical Fijada de Bienvenida (\`1080×1920 px\`):**
   - Archivo: \`04_FONDO_VERTICAL_HISTORIA_BIENVENIDA_1080x1920.png\` (también copiado como \`04_PORTADA_HISTORIA_BIENVENIDA_1080x1920.png\`)
   - Súbela hoy como tu primera Historia y fíjala como la **Historia Destacada #1 (\`Inicia Aquí\`)**.
5. **Las 7 Portadas de Historias Destacadas (\`1080×1920 px\`):**
   - \`HIGHLIGHT_01_IA_Y_TECH.png\` → Nombre sugerido: **\`IA & Tech\`**
   - \`HIGHLIGHT_02_INSOLITO.png\` → Nombre sugerido: **\`Insólito\`**
   - \`HIGHLIGHT_03_MISTERIOS.png\` → Nombre sugerido: **\`Misterios\`**
   - \`HIGHLIGHT_04_COSMOLOGIA.png\` → Nombre sugerido: **\`Cosmología\`**
   - \`HIGHLIGHT_05_MEGA_ING.png\` → Nombre sugerido: **\`Mega-Ing\`**
   - \`HIGHLIGHT_06_ESPACIO.png\` → Nombre sugerido: **\`Cosmos\`**
   - \`HIGHLIGHT_07_DOSSIERS_DM.png\` → Nombre sugerido: **\`Dossiers VIP\`**

---

## 🚀 PASO 3: LOS 3 CARRUSELES DE HOY DOMINGO 1 DE NOVIEMBRE DE 2026 (LISTOS PARA PUBLICAR)

Ubicación: carpeta \`DOMINGO_01_NOVIEMBRE_2026_3_CARRUSELES_HOY/\`

${launchCarousels
  .map(
    (c, idx) => `### 🕒 CARRUSEL 0${idx + 1} DE HOY — ${c.slotLabel} (${c.slotTime} hrs CDMX)
- **Expediente:** \`${c.carousel.dossierCode}\` — **${c.carousel.title}**
- **Arquetipo Visual:** \`${c.carousel.archetype}\`
- **Palabra Clave ManyChat / DM:** \`${c.carousel.ctaKeyword}\`
- **Carpeta Local:** \`DOMINGO_01_NOVIEMBRE_2026_3_CARRUSELES_HOY/${c.folderName}/\`
- **URLs Públicas para Instagram Graph API:**
  1. \`https://codice-anomalo-studio.4ngelll-200.workers.dev/ig-nov01/post${idx + 1}-slide1.png\`
  2. \`https://codice-anomalo-studio.4ngelll-200.workers.dev/ig-nov01/post${idx + 1}-slide2.png\`
  3. \`https://codice-anomalo-studio.4ngelll-200.workers.dev/ig-nov01/post${idx + 1}-slide3.png\`
  4. \`https://codice-anomalo-studio.4ngelll-200.workers.dev/ig-nov01/post${idx + 1}-slide4.png\`
  5. \`https://codice-anomalo-studio.4ngelll-200.workers.dev/ig-nov01/post${idx + 1}-slide5.png\`

#### 📋 Caption Oficial (Copiar y Pegar):
\`\`\`text
${c.carousel.caption}
\`\`\`
`
  )
  .join('\n---\n\n')}

---

## 🌌 BONUS INCLUIDO: TRÍO ESPECIAL DE DOMINGO ASTRONÓMICO (#CA-0019 A #CA-0021)

Además de los 3 expedientes insignia de apertura (\`#CA-0001\`, \`#CA-0002\` y \`#CA-0003\`), incluimos en \`DOMINGO_01_NOVIEMBRE_2026_3_CARRUSELES_HOY/BONUS_DOMINGO_ASTRONOMICO_CA0019_CA0021/\` los 3 carruseles de cierre dominical de la Semana 1:
${sundayAltCarousels.map((c) => `- **\`${c.carousel.dossierCode}\` (${c.slotTime} CDMX):** ${c.carousel.title} (Keyword: \`${c.carousel.ctaKeyword}\`)`).join('\n')}
`;
}

async function renderSvgToPngBuffer(svgString, width) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: width }
  });
  return resvg.render().asPng();
}

async function main() {
  const rootDir = process.cwd();
  const parentDir = path.resolve(rootDir, '..');

  const kitFolderName = 'KIT_PERFIL_Y_LANZAMIENTO_01_NOV_2026_CODICE_ANOMALO';
  const kitDir = path.join(parentDir, kitFolderName);
  const kitZipPath = path.join(parentDir, `${kitFolderName}.zip`);

  const profileSubDir = path.join(kitDir, '01_ACTIVOS_PERFIL_Y_PORTADAS_OFICIALES');
  const highlightsSubDir = path.join(profileSubDir, 'PORTADAS_7_HISTORIAS_DESTACADAS_1080x1920');
  const todaySubDir = path.join(kitDir, 'DOMINGO_01_NOVIEMBRE_2026_3_CARRUSELES_HOY');
  const bonusSundayDir = path.join(todaySubDir, 'BONUS_DOMINGO_ASTRONOMICO_CA0019_CA0021');

  const publicProfileDir = path.join(rootDir, 'public', 'ig-profile');
  const publicNov01Dir = path.join(rootDir, 'public', 'ig-nov01');
  const publicAssetsAliasDir = path.join(rootDir, 'public', 'ig-assets');

  // Limpiar duplicados previos en public/ para garantizar peso total < 8 MB en Cloudflare Workers
  await fs.rm(publicAssetsAliasDir, { recursive: true, force: true });
  await fs.rm(publicProfileDir, { recursive: true, force: true });
  await fs.rm(publicNov01Dir, { recursive: true, force: true });

  await fs.mkdir(profileSubDir, { recursive: true });
  await fs.mkdir(highlightsSubDir, { recursive: true });
  await fs.mkdir(todaySubDir, { recursive: true });
  await fs.mkdir(bonusSundayDir, { recursive: true });
  await fs.mkdir(publicProfileDir, { recursive: true });
  await fs.mkdir(publicNov01Dir, { recursive: true });

  const zip = new JSZip();
  const zipProfile = zip.folder('01_ACTIVOS_PERFIL_Y_PORTADAS_OFICIALES');
  const zipHighlights = zipProfile.folder('PORTADAS_7_HISTORIAS_DESTACADAS_1080x1920');
  const zipToday = zip.folder('DOMINGO_01_NOVIEMBRE_2026_3_CARRUSELES_HOY');
  const zipBonus = zipToday.folder('BONUS_DOMINGO_ASTRONOMICO_CA0019_CA0021');

  console.log('🎨 1/4 Renderizando Fotos de Perfil (1080x1080), Banner Detrás del Perfil (1920x1080) y Portada Bienvenida (1080x1920)...');

  // 1. Foto de Perfil Oficial Neón (1080x1080)
  const avatarNeonPng = await renderSvgToPngBuffer(createAvatarSvg('neon'), 1080);
  const avatarNeonNames = [
    '01_FOTO_PERFIL_OFICIAL_DIAMANTE_NEON_1080x1080.png',
    '01_FOTO_DE_PERFIL_AVATAR_1080x1080.png'
  ];
  for (const name of avatarNeonNames) {
    await fs.writeFile(path.join(kitDir, name), avatarNeonPng);
    await fs.writeFile(path.join(profileSubDir, name), avatarNeonPng);
    zip.file(name, avatarNeonPng);
    zipProfile.file(name, avatarNeonPng);
  }
  await fs.writeFile(path.join(publicProfileDir, 'avatar-principal.png'), avatarNeonPng);

  // 2. Foto de Perfil Alternativa Ojo Dorado (1080x1080)
  const avatarGoldPng = await renderSvgToPngBuffer(createAvatarSvg('gold'), 1080);
  const avatarGoldNames = [
    '02_FOTO_PERFIL_ALTERNATIVA_OJO_DORADO_1080x1080.png',
    '02_FOTO_DE_PERFIL_OJO_DORADO_1080x1080.png'
  ];
  for (const name of avatarGoldNames) {
    await fs.writeFile(path.join(kitDir, name), avatarGoldPng);
    await fs.writeFile(path.join(profileSubDir, name), avatarGoldPng);
    zip.file(name, avatarGoldPng);
    zipProfile.file(name, avatarGoldPng);
  }
  await fs.writeFile(path.join(publicProfileDir, 'avatar-dorado.png'), avatarGoldPng);

  // 3. Banner Panorámico Detrás del Perfil / Meta / Link-in-Bio (1920x1080)
  const bannerPng = await renderSvgToPngBuffer(createProfileBannerSvg(), 1920);
  const bannerNames = [
    '03_FONDO_DETRAS_DEL_PERFIL_BANNER_1920x1080.png',
    '03_BANNER_FONDO_PERFIL_Y_META_1920x1080.png'
  ];
  for (const name of bannerNames) {
    await fs.writeFile(path.join(kitDir, name), bannerPng);
    await fs.writeFile(path.join(profileSubDir, name), bannerPng);
    zip.file(name, bannerPng);
    zipProfile.file(name, bannerPng);
  }
  await fs.writeFile(path.join(publicProfileDir, 'banner-perfil.png'), bannerPng);

  // 4. Portada Vertical Historia Bienvenida (1080x1920)
  const welcomeStoryPng = await renderSvgToPngBuffer(createWelcomeStorySvg(), 1080);
  const welcomeNames = [
    '04_FONDO_VERTICAL_HISTORIA_BIENVENIDA_1080x1920.png',
    '04_PORTADA_HISTORIA_BIENVENIDA_1080x1920.png'
  ];
  for (const name of welcomeNames) {
    await fs.writeFile(path.join(kitDir, name), welcomeStoryPng);
    await fs.writeFile(path.join(profileSubDir, name), welcomeStoryPng);
    zip.file(name, welcomeStoryPng);
    zipProfile.file(name, welcomeStoryPng);
  }
  await fs.writeFile(path.join(publicProfileDir, 'historia-bienvenida.png'), welcomeStoryPng);

  console.log('✨ 2/4 Renderizando las 7 Portadas de Historias Destacadas (1080x1920)...');
  for (const hl of HIGHLIGHTS_SPEC) {
    const hlPng = await renderSvgToPngBuffer(createHighlightCoverSvg(hl), 1080);
    await fs.writeFile(path.join(highlightsSubDir, hl.file), hlPng);
    await fs.writeFile(path.join(profileSubDir, hl.file), hlPng);
    await fs.writeFile(path.join(publicProfileDir, hl.publicFile), hlPng);
    zipHighlights.file(hl.file, hlPng);
    zipProfile.file(hl.file, hlPng);
  }

  console.log('🔥 3/4 Renderizando los 3 Carruseles Oficiales de HOY Domingo 1 de Noviembre de 2026 (15 imágenes 1080x1350)...');
  const week1 = buildWeekBatch(1);

  // Los 3 carruseles insignia de lanzamiento para publicar HOY Domingo 1 de Noviembre (09:00, 15:00, 21:00)
  const launchTriadSpecs = [
    {
      index: 1,
      slotTime: '09:00',
      slotLabel: 'MAÑANA (ALTO ALCANCE)',
      folderName: '09_00_MANANA_CARRUSEL_01',
      carousel: week1[0] // #CA-0001 Biocomputadoras con Neuronas Humanas Vivas
    },
    {
      index: 2,
      slotTime: '15:00',
      slotLabel: 'TARDE (GUARDADOS Y DEBATE)',
      folderName: '15_00_TARDE_CARRUSEL_02',
      carousel: week1[1] // #CA-0002 La Cueva de Movile Sellada por 5.5 Millones de Años
    },
    {
      index: 3,
      slotTime: '21:00',
      slotLabel: 'NOCHE (RETENCIÓN PROFUNDA)',
      folderName: '21_00_NOCHE_CARRUSEL_03',
      carousel: week1[2] // #CA-0003 La Señal SHGb02+14a desde el Vacío Absoluto
    }
  ];

  // Y el trío astronómico/filosófico de Domingo (#CA-0019, #CA-0020, #CA-0021)
  const sundayAltSpecs = [
    {
      index: 1,
      slotTime: '09:00',
      slotLabel: 'DOMINGO MAÑANA (ASTRONOMÍA)',
      folderName: '09_00_DOMINGO_CA0019_PROYECTO_HEPHAISTOS_DYSON',
      carousel: week1[18] // #CA-0019
    },
    {
      index: 2,
      slotTime: '15:00',
      slotLabel: 'DOMINGO TARDE (ASTROFÍSICA)',
      folderName: '15_00_DOMINGO_CA0020_ESTRELLA_MATUSALEN',
      carousel: week1[19] // #CA-0020
    },
    {
      index: 3,
      slotTime: '21:00',
      slotLabel: 'DOMINGO NOCHE (ALGORITMOS)',
      folderName: '21_00_DOMINGO_CA0021_BIBLIOTECA_DE_BABEL',
      carousel: week1[20] // #CA-0021
    }
  ];

  const publicManifest = {
    generatedAt: '2026-11-01T08:30:00-06:00',
    timezone: 'America/Mexico_City',
    account: '@codice.anomalo',
    baseUrl: 'https://codice-anomalo-studio.4ngelll-200.workers.dev',
    profileAssets: {
      avatarNeon: '/ig-profile/avatar-principal.png',
      avatarGold: '/ig-profile/avatar-dorado.png',
      banner: '/ig-profile/banner-perfil.png',
      welcomeStory: '/ig-profile/historia-bienvenida.png',
      highlights: HIGHLIGHTS_SPEC.map((h) => ({
        title: h.title,
        subtitle: h.subtitle,
        url: `/ig-profile/${h.publicFile}`
      }))
    },
    todayCarousels: [],
    sundayAstronomyCarousels: []
  };

  for (const item of launchTriadSpecs) {
    const { carousel, folderName, slotTime, slotLabel, index } = item;
    const niche = NICHES[carousel.niche] || NICHES.TECH_IA;
    const archMeta = ARCHETYPE_META[carousel.archetype] || ARCHETYPE_META.INGENIA_PURPURA;
    const postDir = path.join(todaySubDir, folderName);
    await fs.mkdir(postDir, { recursive: true });
    const zipPost = zipToday.folder(folderName);

    const slideUrls = [];
    for (const slide of carousel.slides) {
      const svg = createSlideSvg(carousel, slide, niche, { archetype: carousel.archetype });
      const pngBuffer = await renderSvgToPngBuffer(svg, 1080);

      const fileName = `SLIDE_0${slide.slideNumber}_${slide.type.replace(/[^A-Z0-9]+/gi, '_')}.png`;
      const publicName = `post${index}-slide${slide.slideNumber}.png`;

      await fs.writeFile(path.join(postDir, fileName), pngBuffer);
      await fs.writeFile(path.join(publicNov01Dir, publicName), pngBuffer);
      zipPost.file(fileName, pngBuffer);

      slideUrls.push(`https://codice-anomalo-studio.4ngelll-200.workers.dev/ig-nov01/${publicName}`);
    }

    const captionTxt = `============================================================================
CÓDICE ANÓMALO (@codice.anomalo) — PUBLICACIÓN OFICIAL DE HOY DOMINGO 1 DE NOVIEMBRE DE 2026
HORARIO PROGRAMADO: ${slotTime} HRS (Tiempo del Centro de México, UTC-6) — ${slotLabel}
EXPEDIENTE: ${carousel.dossierCode} — ${carousel.title}
ARQUETIPO VISUAL: ${archMeta.name} (${carousel.archetype})
PALABRA CLAVE MANYCHAT / DM: ${carousel.ctaKeyword}
============================================================================

--- 1. COPIA Y PEGA ESTE CAPTION EN INSTAGRAM ---

${carousel.caption}

--- 2. TEXTO ALTERNATIVO (ALT TEXT SEO) RECOMENDADO ---
Infografía documental de Códice Anómalo (${carousel.dossierCode}) sobre ${carousel.title}. ${carousel.subtitle}. Fuente: ${carousel.sourceCitation}.

--- 3. URLS PÚBLICAS PARA PUBLICACIÓN AUTOMÁTICA VÍA INSTAGRAM GRAPH API ---
${slideUrls.map((u, idx) => `Slide 0${idx + 1}: ${u}`).join('\n')}
`;

    await fs.writeFile(path.join(postDir, 'CAPTION_Y_CONFIGURACION.txt'), captionTxt, 'utf8');
    zipPost.file('CAPTION_Y_CONFIGURACION.txt', captionTxt);

    publicManifest.todayCarousels.push({
      slot: slotTime,
      label: slotLabel,
      dossierCode: carousel.dossierCode,
      title: carousel.title,
      subtitle: carousel.subtitle,
      niche: niche.name,
      archetype: carousel.archetype,
      ctaKeyword: carousel.ctaKeyword,
      caption: carousel.caption,
      slides: slideUrls
    });
  }

  for (const item of sundayAltSpecs) {
    const { carousel, folderName, slotTime, slotLabel, index } = item;
    const niche = NICHES[carousel.niche] || NICHES.TECH_EXTRA;
    const archMeta = ARCHETYPE_META[carousel.archetype] || ARCHETYPE_META.INGENIA_PURPURA;
    const postDir = path.join(bonusSundayDir, folderName);
    await fs.mkdir(postDir, { recursive: true });
    const zipPost = zipBonus.folder(folderName);

    const slideUrls = [];
    for (const slide of carousel.slides) {
      const svg = createSlideSvg(carousel, slide, niche, { archetype: carousel.archetype });
      const pngBuffer = await renderSvgToPngBuffer(svg, 1080);

      const fileName = `SLIDE_0${slide.slideNumber}_${slide.type.replace(/[^A-Z0-9]+/gi, '_')}.png`;

      await fs.writeFile(path.join(postDir, fileName), pngBuffer);
      zipPost.file(fileName, pngBuffer);

      slideUrls.push(`https://codice-anomalo-studio.4ngelll-200.workers.dev/ig-nov01/post${index}-slide${slide.slideNumber}.png`);
    }

    const captionTxt = `============================================================================
CÓDICE ANÓMALO (@codice.anomalo) — TRÍO ESPECIAL DOMINGO ASTRONÓMICO (01 NOV 2026)
HORARIO: ${slotTime} HRS (CDMX) — ${slotLabel}
EXPEDIENTE: ${carousel.dossierCode} — ${carousel.title}
ARQUETIPO VISUAL: ${archMeta.name} (${carousel.archetype})
PALABRA CLAVE MANYCHAT / DM: ${carousel.ctaKeyword}
============================================================================

${carousel.caption}
`;
    await fs.writeFile(path.join(postDir, 'CAPTION_Y_CONFIGURACION.txt'), captionTxt, 'utf8');
    zipPost.file('CAPTION_Y_CONFIGURACION.txt', captionTxt);

    publicManifest.sundayAstronomyCarousels.push({
      slot: slotTime,
      label: slotLabel,
      dossierCode: carousel.dossierCode,
      title: carousel.title,
      subtitle: carousel.subtitle,
      niche: niche.name,
      archetype: carousel.archetype,
      ctaKeyword: carousel.ctaKeyword,
      caption: carousel.caption,
      slides: slideUrls
    });
  }

  // Guardar manifiesto público y guía maestra
  const manifestJson = JSON.stringify(publicManifest, null, 2);
  await fs.writeFile(path.join(publicNov01Dir, 'manifest.json'), manifestJson, 'utf8');

  const masterGuideMd = buildMasterProfileMarkdown(launchTriadSpecs, sundayAltSpecs);
  await fs.writeFile(path.join(kitDir, '00_CONFIGURACION_COMPLETA_PERFIL_HOY_01_NOV_2026.md'), masterGuideMd, 'utf8');
  zip.file('00_CONFIGURACION_COMPLETA_PERFIL_HOY_01_NOV_2026.md', masterGuideMd);

  console.log('🗜️ 4/4 Empaquetando KIT_PERFIL_Y_LANZAMIENTO_01_NOV_2026_CODICE_ANOMALO.zip...');
  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });
  await fs.writeFile(kitZipPath, zipBuffer);

  console.log('✅ ¡Generación completada con éxito!');
  console.log(`   📁 Carpeta descomprimida: ${kitDir}`);
  console.log(`   🗜️ Archivo ZIP Maestro:   ${kitZipPath}`);
  console.log(`   🌐 Activos públicos IG:   ${publicProfileDir} y ${publicNov01Dir}`);
}

main().catch((err) => {
  console.error('❌ Error generando kit de perfil y paquete del 1 de noviembre:', err);
  process.exit(1);
});
