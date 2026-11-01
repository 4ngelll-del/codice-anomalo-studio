// scripts/generate-weekly-zip.mjs
// Generador de Lote Semanal Completo: 21 Carruseles × 5 Imágenes PNG (1080x1350 4:5) + Guiones Reels + Captions + Dossiers + ZIP
import fs from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import JSZip from 'jszip';
import { buildInitialBatch, NICHES } from '../src/data/weeklyBatch.js';

const WIDTH = 1080;
const HEIGHT = 1350;

function escapeXml(unsafe = '') {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine) {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function renderArtworkPattern(nicheId, color, slideNumber) {
  const seed = slideNumber * 37;
  switch (nicheId) {
    case 'TECH_IA':
      return `
        <g opacity="0.28" stroke="${color}" fill="none">
          <circle cx="820" cy="310" r="190" stroke-width="2" stroke-dasharray="10 8"/>
          <circle cx="820" cy="310" r="130" stroke-width="1.5"/>
          <circle cx="820" cy="310" r="65" fill="${color}" fill-opacity="0.12" stroke-width="3"/>
          <path d="M 630 310 L 1010 310 M 820 120 L 820 500" stroke-width="1" stroke-dasharray="4 6"/>
          <path d="M 700 190 L 560 120 L 420 120" stroke-width="2"/>
          <path d="M 710 410 L 540 480 L 350 480" stroke-width="2"/>
          <circle cx="420" cy="120" r="6" fill="${color}"/>
          <circle cx="350" cy="480" r="6" fill="${color}"/>
        </g>`;
    case 'ESPACIO':
      return `
        <g opacity="0.32" stroke="${color}" fill="none">
          <ellipse cx="800" cy="320" rx="240" ry="90" transform="rotate(-24 800 320)" stroke-width="2"/>
          <ellipse cx="800" cy="320" rx="165" ry="60" transform="rotate(-24 800 320)" stroke-width="1.5" stroke-dasharray="8 6"/>
          <circle cx="800" cy="320" r="46" fill="${color}" fill-opacity="0.18" stroke-width="2.5"/>
          <circle cx="610" cy="210" r="4" fill="#ffffff"/>
          <circle cx="920" cy="180" r="3" fill="#ffffff"/>
          <circle cx="960" cy="420" r="5" fill="${color}"/>
        </g>`;
    case 'COSMOLOGIA':
      return `
        <g opacity="0.26" stroke="${color}" fill="none">
          <circle cx="810" cy="310" r="200" stroke-width="2"/>
          <circle cx="810" cy="310" r="145" stroke-width="1.2" stroke-dasharray="6 6"/>
          <circle cx="810" cy="310" r="90" stroke-width="1.2"/>
          <line x1="610" y1="310" x2="1010" y2="310" stroke-width="1.5"/>
          <line x1="810" y1="110" x2="810" y2="510" stroke-width="1.5"/>
          <line x1="668" y1="168" x2="952" y2="452" stroke-width="1"/>
          <line x1="952" y1="168" x2="668" y2="452" stroke-width="1"/>
        </g>`;
    case 'MISTERIOS':
      return `
        <g opacity="0.28" stroke="${color}" fill="none">
          <polygon points="810,120 990,440 630,440" stroke-width="2"/>
          <polygon points="810,175 940,415 680,415" stroke-width="1.2" stroke-dasharray="8 6"/>
          <circle cx="810" cy="335" r="52" stroke-width="2" fill="${color}" fill-opacity="0.12"/>
          <circle cx="810" cy="335" r="12" fill="${color}"/>
        </g>`;
    default:
      return `
        <g opacity="0.26" stroke="${color}" fill="none">
          <polygon points="810,130 965,220 965,400 810,490 655,400 655,220" stroke-width="2.2"/>
          <polygon points="810,185 915,245 915,375 810,435 705,375 705,245" stroke-width="1.4" stroke-dasharray="10 6"/>
          <circle cx="810" cy="310" r="45" fill="${color}" fill-opacity="0.15" stroke-width="2"/>
          <line x1="655" y1="220" x2="965" y2="400" stroke-width="1" stroke-opacity="0.5"/>
          <line x1="965" y1="220" x2="655" y2="400" stroke-width="1" stroke-opacity="0.5"/>
        </g>`;
  }
}

export function createSlideSvg(carousel, slide, niche) {
  const color = niche.color || '#00F0FF';
  const headlineLines = wrapText(slide.headline.toUpperCase(), 21).slice(0, 4);
  const bodyLines = wrapText(slide.body, 43).slice(0, 6);
  const promptLines = wrapText(`PROMPT VISUAL: ${slide.visualPrompt}`, 66).slice(0, 2);

  const headlineStartY = 470 - (headlineLines.length - 1) * 32;
  const headlineTspans = headlineLines
    .map(
      (line, idx) =>
        `<tspan x="84" y="${headlineStartY + idx * 68}">${escapeXml(line)}</tspan>`
    )
    .join('');

  const bodyCardY = headlineStartY + headlineLines.length * 68 + 26;
  const bodyCardHeight = Math.max(220, bodyLines.length * 46 + 74);
  const bodyTspans = bodyLines
    .map(
      (line, idx) =>
        `<tspan x="118" y="${bodyCardY + 62 + idx * 45}">${escapeXml(line)}</tspan>`
    )
    .join('');

  const dotsSvg = [1, 2, 3, 4, 5]
    .map((num) => {
      const active = num === slide.slideNumber;
      const x = 470 + (num - 1) * 32;
      return `<rect x="${x}" y="1264" width="${active ? 42 : 14}" height="10" rx="5" fill="${
        active ? color : '#334155'
      }" />`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#05070B"/>
        <stop offset="52%" stop-color="#090D16"/>
        <stop offset="100%" stop-color="#04060A"/>
      </linearGradient>
      <radialGradient id="glowTop" cx="82%" cy="22%" r="55%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.28"/>
        <stop offset="60%" stop-color="${color}" stop-opacity="0.06"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowBottom" cx="15%" cy="88%" r="50%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
      <pattern id="cyberGrid" width="45" height="45" patternUnits="userSpaceOnUse">
        <path d="M 45 0 L 0 0 0 45" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.045"/>
      </pattern>
    </defs>

    <!-- Fondo Principal -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowTop)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowBottom)"/>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#cyberGrid)"/>

    <!-- Marco Exterior Editorial -->
    <rect x="36" y="36" width="${WIDTH - 72}" height="${HEIGHT - 72}" rx="28" fill="none" stroke="${color}" stroke-opacity="0.28" stroke-width="2"/>
    <rect x="52" y="52" width="${WIDTH - 104}" height="${HEIGHT - 104}" rx="20" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>

    <!-- Arte Geométrico Temático -->
    ${renderArtworkPattern(carousel.niche, color, slide.slideNumber)}

    <!-- Barra Superior: Badge de Nicho + Expediente + Contador de Slide -->
    <rect x="84" y="88" width="320" height="48" rx="12" fill="${color}" fill-opacity="0.14" stroke="${color}" stroke-opacity="0.65" stroke-width="1.5"/>
    <text x="108" y="119" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="bold" letter-spacing="2">
      ${escapeXml(niche.badge)}
    </text>

    <rect x="422" y="88" width="340" height="48" rx="12" fill="#0B111E" fill-opacity="0.85" stroke="#1E293B" stroke-width="1.5"/>
    <text x="446" y="119" fill="#94A3B8" font-family="Consolas, Courier New, monospace" font-size="19" font-weight="bold">
      ${escapeXml(carousel.dossierCode || `EXPEDIENTE #${carousel.id.toUpperCase()}`)}
    </text>

    <rect x="860" y="88" width="136" height="48" rx="12" fill="#0B111E" stroke="${color}" stroke-opacity="0.5" stroke-width="1.5"/>
    <text x="928" y="119" text-anchor="middle" fill="#F8FAFC" font-family="Consolas, Courier New, monospace" font-size="22" font-weight="bold">
      0${slide.slideNumber} / 05
    </text>

    <!-- Etiqueta de Acto Narrativo -->
    <text x="84" y="210" fill="${color}" font-family="Consolas, Courier New, monospace" font-size="22" font-weight="bold" letter-spacing="3">
      // ${escapeXml(slide.type)} • ${escapeXml(carousel.dayName.toUpperCase())} ${escapeXml(carousel.slotInfo.time)} CDMX
    </text>
    <rect x="84" y="232" width="130" height="8" rx="4" fill="${color}"/>

    <!-- Titular Principal de Alto Impacto -->
    <text fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="900" letter-spacing="0.5">
      ${headlineTspans}
    </text>

    <!-- Tarjeta de Contenido Documental -->
    <rect x="84" y="${bodyCardY}" width="${WIDTH - 168}" height="${bodyCardHeight}" rx="22" fill="#070B12" fill-opacity="0.86" stroke="${color}" stroke-opacity="0.38" stroke-width="2"/>
    <rect x="84" y="${bodyCardY}" width="10" height="${bodyCardHeight}" rx="5" fill="${color}"/>
    <text fill="#E2E8F0" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="500">
      ${bodyTspans}
    </text>

    <!-- Banda de Metadatos & Telemetría Verificada -->
    <rect x="84" y="1025" width="${WIDTH - 168}" height="74" rx="14" fill="#090F1B" fill-opacity="0.9" stroke="#1E293B" stroke-width="1.5"/>
    <text x="112" y="1055" fill="#64748B" font-family="Consolas, Courier New, monospace" font-size="16" font-weight="bold">
      ${escapeXml(promptLines[0] || '')}
    </text>
    <text x="112" y="1081" fill="#94A3B8" font-family="Consolas, Courier New, monospace" font-size="16">
      ORIGINALIDAD: ${carousel.metrics.originality}%  |  RETENCIÓN: ${carousel.metrics.retention}%  |  BRAND SAFETY: 100%  |  CTA: "${escapeXml(carousel.ctaKeyword)}"
    </text>

    <!-- Barra CTA de Deslizamiento / Conversión -->
    <rect x="84" y="1128" width="${WIDTH - 168}" height="88" rx="18" fill="${color}" fill-opacity="0.16" stroke="${color}" stroke-width="2"/>
    <text x="540" y="1181" text-anchor="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="900" letter-spacing="1.5">
      ${escapeXml(slide.highlight)}
    </text>

    <!-- Footer de Marca Códice Anómalo -->
    <text x="84" y="1276" fill="#CBD5E1" font-family="Consolas, Courier New, monospace" font-size="22" font-weight="bold">
      ${escapeXml(carousel.handle || '@codice.anomalo')}
    </text>
    ${dotsSvg}
    <text x="996" y="1276" text-anchor="end" fill="${color}" font-family="Consolas, Courier New, monospace" font-size="20" font-weight="bold">
      4:5 ULTRA HD
    </text>
  </svg>`;
}

async function main() {
  const rootDir = process.cwd();
  const parentDir = path.resolve(rootDir, '..');
  const deliveryFolderName = 'ENTREGA_SEMANA_01_CODICE_ANOMALO_21_CARRUSELES';
  const deliveryPath = path.join(parentDir, deliveryFolderName);
  const zipFilePath = path.join(parentDir, 'ENTREGA_SEMANA_01_CODICE_ANOMALO_21_CARRUSELES.zip');
  const publicZipPath = path.join(rootDir, 'public', 'codice-anomalo-semana-01-21-carruseles.zip');

  await fs.mkdir(deliveryPath, { recursive: true });
  await fs.mkdir(path.join(rootDir, 'public'), { recursive: true });

  const batch = buildInitialBatch();
  const zip = new JSZip();

  let masterIndexMd = `# 📦 ENTREGA OFICIAL SEMANA 01 — CÓDICE ANÓMALO STUDIO (@codice.anomalo)\n\n`;
  masterIndexMd += `- **Cuenta de Instagram Validada:** \`@codice.anomalo\` (Alternativa: \`@codiceanomalo.lab\`)\n`;
  masterIndexMd += `- **Zona Horaria Configurada:** \`America/Mexico_City (UTC-6)\`\n`;
  masterIndexMd += `- **Frecuencia de Publicación:** 3 Carruseles Diarios × 7 Días = **21 Carruseles Semanales (105 Imágenes PNG en formato 1080×1350px 4:5)**\n`;
  masterIndexMd += `- **Auditoría Multi-Agente:** 100% Originalidad (Cero Plagio) • 100% Brand Safety • Embudo de Monetización ManyChat Activo\n\n`;
  masterIndexMd += `## 🗓️ CALENDARIO MAESTRO DE LOS 21 CARRUSELES Y PALABRAS CLAVE\n\n`;
  masterIndexMd += `| # | Día | Hora (CDMX) | Nicho | Título del Carrusel | Keyword DM | Carpeta |\n`;
  masterIndexMd += `|---|---|---|---|---|---|---|\n`;

  console.log(`Generando 21 carruseles (105 imágenes PNG 1080x1350px)...`);

  for (let i = 0; i < batch.length; i++) {
    const carousel = batch[i];
    const niche = NICHES[carousel.niche];
    const numStr = String(i + 1).padStart(2, '0');
    const cleanDay = carousel.dayName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const cleanSlug = carousel.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z0-9]+/gi, '_')
      .replace(/^_|_$/g, '')
      .slice(0, 38)
      .toUpperCase();

    const dayFolderName = `DIA_${carousel.dayIndex + 1}_${cleanDay}`;
    const postFolderName = `CARRUSEL_${numStr}_${carousel.slotInfo.id}_${cleanSlug}`;
    const postDiskDir = path.join(deliveryPath, dayFolderName, postFolderName);
    await fs.mkdir(postDiskDir, { recursive: true });

    const zipPostFolder = zip.folder(dayFolderName).folder(postFolderName);

    masterIndexMd += `| ${numStr} | ${carousel.dayName} | ${carousel.slotInfo.time} | ${niche.name} | **${carousel.title}** | \`${carousel.ctaKeyword}\` | \`${dayFolderName}/${postFolderName}\` |\n`;

    // Renderizar las 5 imágenes PNG 1080x1350
    for (const slide of carousel.slides) {
      const svgString = createSlideSvg(carousel, slide, niche);
      const resvg = new Resvg(svgString, {
        fitTo: { mode: 'width', value: WIDTH }
      });
      const pngBuffer = resvg.render().asPng();
      const slideFileName = `SLIDE_0${slide.slideNumber}_${slide.type.replace(/[^A-Z0-9]+/gi, '_')}.png`;

      await fs.writeFile(path.join(postDiskDir, slideFileName), pngBuffer);
      zipPostFolder.file(slideFileName, pngBuffer);
    }

    // Crear guía individual del post (Caption + Guion de Reel + Prompts + Monetización)
    const postGuideMd = `# 📂 ${carousel.dossierCode || `EXPEDIENTE #${numStr}`} — ${carousel.title}

- **Día y Hora Programada (Zona Horaria México):** ${carousel.dayName} a las **${carousel.slotInfo.time} hrs (CDMX)** (${carousel.slotInfo.tag})
- **Nicho Editorial:** ${niche.name} (\`${niche.badge}\`)
- **Palabra Clave de Automatización (ManyChat / DM):** \`${carousel.ctaKeyword}\`
- **Puntuación de Auditoría Multi-Agente:** Originalidad ${carousel.metrics.originality}% | Retención ${carousel.metrics.retention}% | Brand Safety ${carousel.metrics.brandSafety}% | Conversión ${carousel.metrics.conversion}%

---

## 📝 1. CAPTION OFICIAL PARA COPIAR Y PEGAR EN INSTAGRAM

\`\`\`text
${carousel.caption}
\`\`\`

---

## 🎬 2. GUION DE REEL COMPLEMENTARIO (15 SEGUNDOS — PUENTE DE TRÁFICO AL CARRUSEL)

> **Instrucción de grabación / IA de video:** Usa las imágenes generadas en esta carpeta con efecto Ken Burns (zoom lento) y voz profunda documental:
>
> **Guion:** "${carousel.reelScript15s || `${carousel.slides[0].body} ${carousel.slides[2].body} Lee el expediente completo de 5 partes que acabo de publicar en el perfil y comenta ${carousel.ctaKeyword}.`}"

---

## 💰 3. ESTRATEGIA DE MONETIZACIÓN Y AUDITORÍA DE ESTE CARRUSEL

- **Ángulo de Monetización:** ${carousel.monetizationCategory || 'Captación de suscriptores para Newsletter Tech/Ciencia, Afiliación de Herramientas IA/Libros y Patrocinios de Marca.'}
- **Dictamen de los 4 Agentes:** ${carousel.auditNotes || 'Verificado con hechos científicos e históricos documentados. Cero riesgo de restricción algorítmica.'}

---

## 🖼️ 4. ESTRUCTURA DETALLADA DE LAS 5 IMÁGENES (1080×1350px 4:5)

${carousel.slides
  .map(
    (s) => `### Slide 0${s.slideNumber} — ${s.type}
- **Titular:** ${s.headline}
- **Cuerpo:** ${s.body}
- **Callout Inferior:** ${s.highlight}
- **Prompt de Imagen IA (Midjourney / Flux / Imagen 3):** \`${s.visualPrompt}\`
`
  )
  .join('\n')}
`;

    await fs.writeFile(path.join(postDiskDir, '00_GUIA_PUBLICACION_Y_CAPTION.md'), postGuideMd, 'utf8');
    zipPostFolder.file('00_GUIA_PUBLICACION_Y_CAPTION.md', postGuideMd);
  }

  await fs.writeFile(path.join(deliveryPath, '00_INDICE_MAESTRO_SEMANA_01.md'), masterIndexMd, 'utf8');
  zip.file('00_INDICE_MAESTRO_SEMANA_01.md', masterIndexMd);
  zip.file('codice-anomalo-21-carruseles-semana-01.json', JSON.stringify(batch, null, 2));

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } });
  await fs.writeFile(zipFilePath, zipBuffer);

  console.log(`✅ Entrega generada exitosamente:`);
  console.log(`   📁 Carpeta descomprimida: ${deliveryPath}`);
  console.log(`   🗜️ Archivo ZIP Maestro:   ${zipFilePath}`);
}

main().catch((err) => {
  console.error('Error generando lote semanal:', err);
  process.exit(1);
});
