// scripts/generate-weekly-zip.mjs
// ============================================================================
// GENERADOR OFICIAL DE LOTES SEMANALES Y PLAN ANUAL (52 SEMANAS / 1,092 CARRUSELES)
// Códice Anómalo Studio (@codice.anomalo)
// Renderiza las 105 imágenes PNG (1080x1350px 4:5) de la Semana activa usando los
// 7 Arquetipos Visuales Virales de Google Drive + Índice Anual de 1,092 Carruseles.
// ============================================================================
import fs from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import JSZip from 'jszip';
import {
  buildWeekBatch,
  NICHES,
  VIRAL_ARCHETYPES,
  ANNUAL_MONTH_THEMES,
  getAnnualSummary
} from '../src/data/weeklyBatch.js';
import { createSlideSvg, ARCHETYPE_META } from '../src/utils/viralSlideSvg.js';

const WIDTH = 1080;
const HEIGHT = 1350;

async function main() {
  const weekArg = Number(process.argv[2] || 1);
  const weekNumber = Math.min(52, Math.max(1, Number.isFinite(weekArg) ? weekArg : 1));
  const weekPad = String(weekNumber).padStart(2, '0');

  const rootDir = process.cwd();
  const parentDir = path.resolve(rootDir, '..');
  const deliveryFolderName = `ENTREGA_SEMANA_${weekPad}_CODICE_ANOMALO_21_CARRUSELES`;
  const deliveryPath = path.join(parentDir, deliveryFolderName);
  const zipFilePath = path.join(parentDir, `${deliveryFolderName}.zip`);
  const legacyZipPath = path.join(parentDir, 'Lote_Semanal_21_Carruseles_Codice_Anomalo.zip');

  await fs.mkdir(deliveryPath, { recursive: true });

  const batch = buildWeekBatch(weekNumber);
  const annualSummary = getAnnualSummary();
  const zip = new JSZip();

  let masterIndexMd = `# 📦 ENTREGA OFICIAL SEMANA ${weekPad} (PLAN ANUAL 52 SEMANAS) — CÓDICE ANÓMALO STUDIO (@codice.anomalo)\n\n`;
  masterIndexMd += `- **Cuenta Oficial Validada:** \`@codice.anomalo\` (Alternativas: \`@codiceanomalo.lab\`, \`@elcodiceanomalo\`)\n`;
  masterIndexMd += `- **Zona Horaria Configurada:** \`America/Mexico_City (UTC-6)\`\n`;
  masterIndexMd += `- **Capacidad del Motor Anual:** **52 Semanas = 364 Días = 1,092 Carruseles Únicos = 5,460 Imágenes 4:5 (3 por día: 09:00, 15:00 y 21:00 CDMX)**\n`;
  masterIndexMd += `- **Arquetipos Visuales Virales Aplicados (7 Estilos de Referencia Drive):**\n`;
  for (const arch of Object.values(ARCHETYPE_META)) {
    masterIndexMd += `  - **\`${arch.id}\` (${arch.name})** — Estructura inspirada en \`${arch.referenceHandle}\` (${arch.description})\n`;
  }
  masterIndexMd += `\n## 🗓️ CALENDARIO MAESTRO DE LOS 21 CARRUSELES — SEMANA ${weekPad} (${batch[0]?.monthName || 'Mes 1'})\n\n`;
  masterIndexMd += `| # | Expediente | Día | Hora (CDMX) | Nicho | Arquetipo Visual | Título del Carrusel | Keyword DM |\n`;
  masterIndexMd += `|---|---|---|---|---|---|---|---|\n`;

  console.log(`🚀 Renderizando Semana ${weekPad}/52: 21 carruseles (105 imágenes PNG 1080x1350px con los 7 Arquetipos Virales)...`);

  for (let i = 0; i < batch.length; i++) {
    const carousel = batch[i];
    const niche = NICHES[carousel.niche] || NICHES.TECH_IA;
    const archMeta = ARCHETYPE_META[carousel.archetype] || ARCHETYPE_META.INGENIA_PURPURA;
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

    masterIndexMd += `| ${numStr} | \`${carousel.dossierCode}\` | ${carousel.dayName} | ${carousel.slotInfo.time} | ${niche.name} | \`${archMeta.name}\` | **${carousel.title}** | \`${carousel.ctaKeyword}\` |\n`;

    // Renderizar las 5 imágenes PNG 1080x1350 con @resvg/resvg-js
    for (const slide of carousel.slides) {
      const svgString = createSlideSvg(carousel, slide, niche, { archetype: carousel.archetype });
      const resvg = new Resvg(svgString, {
        fitTo: { mode: 'width', value: WIDTH }
      });
      const pngBuffer = resvg.render().asPng();
      const slideFileName = `SLIDE_0${slide.slideNumber}_${slide.type.replace(/[^A-Z0-9]+/gi, '_')}.png`;

      await fs.writeFile(path.join(postDiskDir, slideFileName), pngBuffer);
      zipPostFolder.file(slideFileName, pngBuffer);
    }

    const postGuideMd = `# 📂 ${carousel.dossierCode} — ${carousel.title}

- **Semana / Día / Hora (Zona Horaria México):** Semana ${weekPad} • ${carousel.dayName} a las **${carousel.slotInfo.time} hrs (CDMX)** (${carousel.slotInfo.tag})
- **Nicho Editorial:** ${niche.name} (\`${niche.badge}\`)
- **Arquetipo Visual Viral Aplicado:** **${archMeta.name}** (\`${carousel.archetype}\` — estructura de \`${archMeta.referenceHandle}\`)
- **Institución & Ubicación:** ${carousel.institutionTag || 'Instituto Científico'} • ${carousel.locationTag || 'Global'}
- **Fuente Documental:** ${carousel.sourceCitation || 'Literatura científica revisada por pares'}
- **Palabra Clave de Automatización (ManyChat / DM):** \`${carousel.ctaKeyword}\`
- **Puntuación de Auditoría Multi-Agente:** Originalidad ${carousel.metrics.originality}% | Retención ${carousel.metrics.retention}% | Brand Safety ${carousel.metrics.brandSafety}% | Conversión ${carousel.metrics.conversion}%

---

## 📝 1. CAPTION OFICIAL PARA COPIAR Y PEGAR EN INSTAGRAM

\`\`\`text
${carousel.caption}
\`\`\`

---

## 🎬 2. GUION DE REEL COMPLEMENTARIO (15 SEGUNDOS — PUENTE DE TRÁFICO AL CARRUSEL)

> **Guion:** "${carousel.reelScript15s}"

---

## 🖼️ 3. ESTRUCTURA DETALLADA DE LAS 5 IMÁGENES (1080×1350px 4:5)

${carousel.slides
  .map(
    (s) => `### Slide 0${s.slideNumber} — ${s.type}
- **Pregunta / Encabezado Editorial:** ${s.questionTitle || s.headline}
- **Titular:** ${s.headline}
- **Cuerpo Documental:** ${s.body}
- **Callout Inferior:** ${s.highlight}
- **Fuente / Pie:** ${s.sourceUrl || carousel.sourceCitation}
- **Prompt de Imagen IA:** \`${s.visualPrompt}\`
`
  )
  .join('\n')}
`;

    await fs.writeFile(path.join(postDiskDir, '00_GUIA_PUBLICACION_Y_CAPTION.md'), postGuideMd, 'utf8');
    zipPostFolder.file('00_GUIA_PUBLICACION_Y_CAPTION.md', postGuideMd);
  }

  // Generar catálogo maestro de las 52 semanas (1,092 expedientes) en Markdown y CSV
  let annualMd = `# 🗓️ PLAN ANUAL MAESTRO (52 SEMANAS = 1,092 CARRUSELES / 5,460 DIAPOSITIVAS)\n\n`;
  annualMd += `- **Total Semanas:** ${annualSummary.totalWeeks}\n`;
  annualMd += `- **Total Días:** ${annualSummary.totalDays}\n`;
  annualMd += `- **Total Carruseles:** ${annualSummary.totalCarousels}\n`;
  annualMd += `- **Total Imágenes 4:5 (1080×1350):** ${annualSummary.totalSlides}\n\n`;
  annualMd += `## 📚 Los 12 Bloques Temáticos Mensuales\n\n`;
  for (const m of ANNUAL_MONTH_THEMES) {
    annualMd += `- **Mes ${m.month} (${m.name}) — ${m.theme}:** ${m.focus}\n`;
  }
  annualMd += `\n## 🗂️ Índice de las 52 Semanas del Año\n\n`;
  annualMd += `| Semana | Mes | Enfoque Editorial | Rango de Expedientes | Carruseles | Slides |\n`;
  annualMd += `|---|---|---|---|---|---|\n`;
  for (const w of annualSummary.weeksIndex) {
    annualMd += `| Semana ${String(w.weekNumber).padStart(2, '0')} | ${w.monthName} | ${w.theme} | \`${w.dossierRange}\` | ${w.carouselsCount} | ${w.slidesCount} |\n`;
  }

  await fs.writeFile(path.join(deliveryPath, '00_INDICE_MAESTRO_SEMANA_01.md'), masterIndexMd, 'utf8');
  await fs.writeFile(path.join(deliveryPath, '01_PLAN_ANUAL_52_SEMANAS_1092_CARRUSELES.md'), annualMd, 'utf8');

  zip.file(`00_INDICE_MAESTRO_SEMANA_${weekPad}.md`, masterIndexMd);
  zip.file('01_PLAN_ANUAL_52_SEMANAS_1092_CARRUSELES.md', annualMd);
  zip.file(`codice-anomalo-semana-${weekPad}-21-carruseles.json`, JSON.stringify(batch, null, 2));
  zip.file('codice-anomalo-resumen-anual-52-semanas.json', JSON.stringify(annualSummary, null, 2));

  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });
  await fs.writeFile(zipFilePath, zipBuffer);
  if (weekNumber === 1) {
    await fs.writeFile(legacyZipPath, zipBuffer);
  }

  console.log(`✅ Entrega generada exitosamente:`);
  console.log(`   📁 Carpeta descomprimida: ${deliveryPath}`);
  console.log(`   🗜️ Archivo ZIP Maestro:   ${zipFilePath}`);
  if (weekNumber === 1) {
    console.log(`   🗜️ Archivo ZIP Raíz:      ${legacyZipPath}`);
  }
}

main().catch((err) => {
  console.error('Error generando lote semanal:', err);
  process.exit(1);
});
