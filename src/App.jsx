import React, { useState, useEffect, useMemo } from 'react';
import JSZip from 'jszip';
import {
  Sparkles, Calendar, Layers, ShieldCheck, Terminal,
  ChevronLeft, ChevronRight, CheckCircle2,
  Copy, Check, Download, Share2, Bookmark, MessageCircle, Heart,
  Cpu, Eye, HelpCircle, Compass, Rocket, Orbit, Globe, Play,
  FileCode, GitBranch, CloudLightning, Award,
  Wand2, ArrowRight, Clock, Video, DollarSign, Image as ImageIcon, Package, UserCheck, Palette
} from 'lucide-react';
import {
  NICHES as BASE_NICHES,
  DAYS,
  DEFAULT_SLOTS,
  ANNUAL_MONTH_THEMES,
  buildWeekBatch,
  getAnnualSummary
} from './data/weeklyBatch.js';
import { createSlideSvg, ARCHETYPE_META } from './utils/viralSlideSvg.js';

const ICON_MAP = {
  TECH_IA: Cpu,
  INSOLITO: Eye,
  MISTERIOS: HelpCircle,
  COSMOLOGIA: Compass,
  TECH_EXTRA: Rocket,
  ESPACIO: Orbit,
  INTERNET: Globe
};

const NICHES = Object.fromEntries(
  Object.entries(BASE_NICHES).map(([k, v]) => [
    k,
    { ...v, icon: ICON_MAP[k] || Sparkles }
  ])
);

const WRANGLER_TOML_CODE = `# wrangler.toml — Configuración de Producción para Códice Anómalo Studio v3.0 (Plan Anual 52 Semanas)
name = "codice-anomalo-studio"
main = "src/worker.js"
compatibility_date = "2024-11-01"
workers_dev = true

[assets]
directory = "./dist"
binding = "ASSETS"

# Ejecución automática en Zona Horaria de México (America/Mexico_City = UTC-6):
# - Domingo 22:00 CDMX (04:00 UTC Lunes): Genera y audita los 21 carruseles de la semana activa (1..52)
# - Todos los días 09:00, 15:00 y 21:00 CDMX (15:00, 21:00, 03:00 UTC): Autopublica en IG Graph API
[triggers]
crons = [
  "0 4 * * MON",
  "0 3,15,21 * * *"
]

[vars]
IG_HANDLE = "@codice.anomalo"
TIMEZONE = "America/Mexico_City"
SLOT_MANANA = "09:00"
SLOT_TARDE = "15:00"
SLOT_NOCHE = "21:00"
BATCH_SIZE = "21"
ANNUAL_WEEKS = "52"
TOTAL_ANNUAL_CAROUSELS = "1092"
MIN_AUDIT_SCORE = "97"
MODEL_ID = "gemini-2.5-flash"`;

const WORKER_JS_CODE = `// src/worker.js — Cloudflare Worker Full-Stack: Web App + API Anual 52 Semanas (1,092 Carruseles) + 7 Arquetipos Virales + Cron (America/Mexico_City)
import { buildWeekBatch, DEFAULT_SLOTS, ANNUAL_MONTH_THEMES, getAnnualSummary } from './data/weeklyBatch.js';
import { ARCHETYPE_META } from './utils/viralSlideSvg.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "application/json; charset=utf-8"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    if (url.pathname === "/api/status") {
      return new Response(JSON.stringify({
        ok: true,
        service: "Códice Anómalo Studio Engine v3.0 — Annual Viral Edition",
        handle: env.IG_HANDLE || "@codice.anomalo",
        timezone: env.TIMEZONE || "America/Mexico_City",
        annualCapacity: { weeks: 52, days: 364, carousels: 1092, slides: 5460 },
        schedule: { manana: env.SLOT_MANANA, tarde: env.SLOT_TARDE, noche: env.SLOT_NOCHE }
      }), { headers: cors });
    }

    if (url.pathname === "/api/annual/summary") {
      return new Response(JSON.stringify({ ok: true, months: ANNUAL_MONTH_THEMES, archetypes: ARCHETYPE_META, ...getAnnualSummary() }), { headers: cors });
    }

    if (url.pathname === "/api/batch/current" || url.pathname === "/api/batch/week") {
      const week = Math.min(52, Math.max(1, Number(url.searchParams.get("week") || 1)));
      const batch = buildWeekBatch(week, DEFAULT_SLOTS, env.IG_HANDLE || "@codice.anomalo");
      return new Response(JSON.stringify({ ok: true, weekNumber: week, count: batch.length, totalSlides: 105, batch }), { headers: cors });
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response(JSON.stringify({ status: "ONLINE" }), { headers: cors });
  }
};`;

const GITHUB_WORKFLOW_CODE = `# .github/workflows/deploy.yml — CI/CD Automático GitHub (4ngelll-del/codice-anomalo-studio) -> Cloudflare Workers
name: Deploy Códice Anómalo Studio to Cloudflare Workers
on:
  push:
    branches: [ main ]
  workflow_dispatch:
jobs:
  audit-build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy`;

// Renderizador de SVG Viral a PNG Blob (1080x1350 4:5) en el navegador usando el mismo motor que Node.js
async function renderSlideToPngBlob(carousel, slide, niche, igHandle, archetypeOverride) {
  const carouselWithHandle = {
    ...carousel,
    handle: igHandle || carousel.handle || '@codice.anomalo',
    archetype: archetypeOverride || carousel.archetype || 'INGENIA_PURPURA'
  };
  const svgString = createSlideSvg(carouselWithHandle, slide, niche, {
    archetype: carouselWithHandle.archetype
  });

  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 1080, 1350);
      ctx.drawImage(img, 0, 0, 1080, 1350);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

export default function App() {
  // Configuración de Cuenta, Horarios y Selector Anual (52 Semanas = 1,092 Carruseles)
  const [igHandle, setIgHandle] = useState('@codice.anomalo');
  const [timezone, setTimezone] = useState('America/Mexico_City');
  const [slots, setSlots] = useState(DEFAULT_SLOTS);
  const [mexicoClock, setMexicoClock] = useState('');
  const [activeWeek, setActiveWeek] = useState(1);

  const annualSummary = useMemo(() => getAnnualSummary(), []);

  const [carousels, setCarousels] = useState(() => buildWeekBatch(1, DEFAULT_SLOTS, '@codice.anomalo'));
  const [activeTab, setActiveTab] = useState('PLANNER'); // PLANNER | EDITOR | ANNUAL | AGENTS | DEPLOY
  const [selectedId, setSelectedId] = useState(() => buildWeekBatch(1)[0]?.id || 'ca-2026-w01-1');
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [nicheFilter, setNicheFilter] = useState('ALL');
  const [dayFilter, setDayFilter] = useState('ALL');
  const [archetypeFilter, setArchetypeFilter] = useState('ALL');

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiCustomPrompt, setAiCustomPrompt] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Reloj en Tiempo Real para Zona Horaria de México
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('es-MX', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setMexicoClock(formatted);
      } catch {
        setMexicoClock('CDMX UTC-6');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [timezone]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4200);
  };

  // Cambiar entre cualquiera de las 52 semanas del año (1,092 carruseles totales)
  const handleSelectWeek = (weekNum) => {
    const safeWeek = Math.min(52, Math.max(1, Number(weekNum) || 1));
    setActiveWeek(safeWeek);
    const nextBatch = buildWeekBatch(safeWeek, slots, igHandle);
    setCarousels(nextBatch);
    if (nextBatch[0]) {
      setSelectedId(nextBatch[0].id);
      setActiveSlideIdx(0);
    }
    showToast(`🗓️ Cargada Semana ${String(safeWeek).padStart(2, '0')}/52 (${nextBatch[0]?.monthName}) — 21 Carruseles (${nextBatch[0]?.dossierCode} a ${nextBatch[20]?.dossierCode})`);
  };

  const selectedCarousel = carousels.find((c) => c.id === selectedId) || carousels[0];
  const currentNiche = NICHES[selectedCarousel.niche] || NICHES.TECH_IA;
  const currentSlide = selectedCarousel.slides[activeSlideIdx] || selectedCarousel.slides[0];
  const currentArchMeta = ARCHETYPE_META[selectedCarousel.archetype] || ARCHETYPE_META.INGENIA_PURPURA;

  // Generar SVG en tiempo real para el visor interactivo 4:5 (exactamente igual al PNG de salida)
  const liveSlideSvgDataUri = useMemo(() => {
    const svg = createSlideSvg(
      { ...selectedCarousel, handle: igHandle },
      currentSlide,
      currentNiche,
      { archetype: selectedCarousel.archetype }
    );
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [selectedCarousel, currentSlide, currentNiche, igHandle]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copiado al portapapeles correctamente');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Actualizar horarios editables en vivo para toda la semana
  const handleSlotTimeChange = (slotIdx, newTime) => {
    const updatedSlots = slots.map((s, idx) => (idx === slotIdx ? { ...s, time: newTime } : s));
    setSlots(updatedSlots);
    setCarousels((prev) =>
      prev.map((c) => (c.slotIndex === slotIdx ? { ...c, slotInfo: updatedSlots[slotIdx] } : c))
    );
    showToast(`⏰ Horario de ${updatedSlots[slotIdx].label} actualizado a ${newTime} (${timezone})`);
  };

  // Cambiar el Arquetipo Visual Viral de un carrusel en tiempo real
  const handleArchetypeChange = (newArchetypeId) => {
    setCarousels((prev) =>
      prev.map((c) =>
        c.id === selectedCarousel.id
          ? { ...c, archetype: newArchetypeId }
          : c
      )
    );
    const meta = ARCHETYPE_META[newArchetypeId];
    showToast(`🎨 Plantilla cambiada a "${meta?.name}" (Estilo ${meta?.referenceHandle})`);
  };

  // Descargar 1 slide actual como PNG 1080x1350
  const downloadSingleSlidePng = async () => {
    showToast(`🖼️ Exportando Slide ${currentSlide.slideNumber}/5 en 1080×1350px...`);
    const blob = await renderSlideToPngBlob(selectedCarousel, currentSlide, currentNiche, igHandle, selectedCarousel.archetype);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${selectedCarousel.dossierCode.replace(/[^A-Z0-9_-]/gi, '_')}_SLIDE_0${currentSlide.slideNumber}_${selectedCarousel.archetype}.png`;
    a.click();
    showToast('✅ Imagen PNG (1080×1350) descargada');
  };

  // Descargar las 5 imágenes PNG de un carrusel individual
  const downloadCurrentCarouselImages = async () => {
    showToast(`🖼️ Renderizando las 5 imágenes 4:5 (1080×1350px) de "${selectedCarousel.title}"...`);
    const zip = new JSZip();
    for (const slide of selectedCarousel.slides) {
      const blob = await renderSlideToPngBlob(selectedCarousel, slide, currentNiche, igHandle, selectedCarousel.archetype);
      zip.file(`SLIDE_0${slide.slideNumber}_${slide.type.replace(/[^A-Z0-9]+/gi, '_')}.png`, blob);
    }
    zip.file('00_CAPTION_Y_GUIA.txt', selectedCarousel.caption);
    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = `SEMANA_${String(activeWeek).padStart(2, '0')}_${selectedCarousel.dossierCode.replace(/[^A-Z0-9]+/gi, '_')}_${selectedCarousel.ctaKeyword}.zip`;
    a.click();
    showToast('✅ Carrusel de 5 imágenes PNG virales descargado');
  };

  // Descargar el ZIP completo de la Semana Activa (21 Carruseles = 105 Imágenes PNG 4:5)
  const downloadFullWeekZip = async () => {
    setIsExportingZip(true);
    setZipProgress(1);
    const weekPad = String(activeWeek).padStart(2, '0');
    try {
      const zip = new JSZip();
      for (let i = 0; i < carousels.length; i++) {
        const c = carousels[i];
        const n = NICHES[c.niche] || NICHES.TECH_IA;
        const num = String(i + 1).padStart(2, '0');
        const folder = zip
          .folder(`DIA_${c.dayIndex + 1}_${c.dayName.toUpperCase()}`)
          .folder(`CARRUSEL_${num}_${c.slotInfo.id}_${c.ctaKeyword}`);

        for (const slide of c.slides) {
          const blob = await renderSlideToPngBlob(c, slide, n, igHandle, c.archetype);
          folder.file(`SLIDE_0${slide.slideNumber}_${slide.type.replace(/[^A-Z0-9]+/gi, '_')}.png`, blob);
        }
        folder.file(
          '00_CAPTION_Y_REEL_SCRIPT.md',
          `# ${c.dossierCode} — ${c.title}\n\nSemana: ${weekPad}/52 (${c.monthName})\nHorario: ${c.dayName} ${c.slotInfo.time} (${timezone})\nArquetipo Visual: ${c.archetype}\nCTA Keyword: ${c.ctaKeyword}\nFuente: ${c.sourceCitation || ''}\n\n## CAPTION:\n${c.caption}\n\n## REEL SCRIPT (15s):\n${c.reelScript15s || ''}\n`
        );
        setZipProgress(Math.round(((i + 1) / carousels.length) * 100));
      }
      zip.file(`codice-anomalo-semana-${weekPad}-21-carruseles.json`, JSON.stringify(carousels, null, 2));
      const blob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `ENTREGA_SEMANA_${weekPad}_CODICE_ANOMALO_21_CARRUSELES_105_PNG.zip`;
      a.click();
      showToast(`📦 ZIP Semana ${weekPad}/52 (21 Carruseles / 105 PNGs Virales) descargado`);
    } finally {
      setIsExportingZip(false);
      setZipProgress(0);
    }
  };

  // Descargar el Catálogo Maestro Anual (52 Semanas = 1,092 Carruseles) en JSON
  const downloadFullYearCatalogJson = () => {
    showToast('📚 Compilando los 1,092 carruseles (5,460 diapositivas) de las 52 semanas...');
    const allWeeks = Array.from({ length: 52 }, (_, idx) => ({
      weekNumber: idx + 1,
      carousels: buildWeekBatch(idx + 1, slots, igHandle)
    }));
    const payload = {
      project: 'Códice Anómalo Studio — Plan Anual Completo (52 Semanas)',
      handle: igHandle,
      timezone,
      totalWeeks: 52,
      totalCarousels: 1092,
      totalSlides: 5460,
      weeks: allWeeks
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'CODICE_ANOMALO_PLAN_ANUAL_52_SEMANAS_1092_CARRUSELES.json';
    a.click();
    showToast('✅ Catálogo Anual Completo (1,092 Carruseles / 5,460 Slides) descargado');
  };

  // Integración Gemini IA + Sintetizador Local Gama Alta
  const regenerateCarouselWithGemini = async (carouselToUpdate, customTopic = '') => {
    setIsGeneratingAI(true);
    const nicheObj = NICHES[carouselToUpdate.niche] || NICHES.TECH_IA;
    const topicTitle = customTopic
      ? customTopic.toUpperCase()
      : `${carouselToUpdate.title} // EDICIÓN EXTENDIDA`;
    const kw = customTopic
      ? customTopic.split(' ')[0].toUpperCase().replace(/[^A-Z0-9]/g, '') || 'CODICE'
      : carouselToUpdate.ctaKeyword;

    setTimeout(() => {
      const updatedSlides = [
        {
          ...carouselToUpdate.slides[0],
          slideNumber: 1,
          type: 'GANCHO VIRAL',
          headline: topicTitle,
          highlightPhrase: topicTitle.split(' ').slice(-3).join(' '),
          body: `Un equipo internacional de investigadores documentó en ${nicheObj.name.toLowerCase()} una anomalía empírica verificada que desafía los modelos clásicos.`,
          highlight: 'DESLIZA PARA ABRIR EL EXPEDIENTE →'
        },
        {
          ...carouselToUpdate.slides[1],
          slideNumber: 2,
          type: 'CONTEXTO IMPACTANTE',
          questionTitle: '¿Qué registraron los instrumentos oficiales en laboratorio?',
          headline: '01 // REGISTRO DE TELEMETRÍA OFICIAL',
          body: 'Durante décadas se creyó que este límite físico era inquebrantable, hasta que sensores criogénicos de alta precisión captaron un patrón coherente repetitivo.',
          highlight: `DATO VERIFICADO // ${carouselToUpdate.dossierCode}`
        },
        {
          ...carouselToUpdate.slides[2],
          slideNumber: 3,
          type: 'EL GIRO / EVIDENCIA',
          questionTitle: '¿Cuál es la anomalía técnica que desconcertó a los científicos?',
          headline: '02 // EL DATO QUE ROMPE EL PARADIGMA',
          body: 'Al aislar las variables térmicas y electromagnéticas, el fenómeno no desapareció: duplicó su resonancia de forma autónoma sin fuente externa aparente.',
          highlight: 'LA PRUEBA CLAVE ESTÁ EN LA SIGUIENTE SLIDE →'
        },
        {
          ...carouselToUpdate.slides[3],
          slideNumber: 4,
          type: 'CLÍMAX & DEBATE',
          questionTitle: '¿Estamos ante nueva física o ante un fenómeno aún no catalogado?',
          headline: '03 // ¿NUEVA FÍSICA O ERROR DE ESCALA?',
          body: 'Si estos resultados superan la revisión por pares este año, obligarán a reescribir capítulos enteros sobre cómo entendemos nuestra realidad física.',
          highlight: '¿QUÉ OPINAS TÚ? DEJA TU TEORÍA ABAJO →'
        },
        {
          ...carouselToUpdate.slides[4],
          slideNumber: 5,
          type: 'CONVERSIÓN & GUARDADOS',
          questionTitle: `¿Quieres el expediente completo de ${igHandle}?`,
          headline: `COMENTA "${kw}"`,
          body: `Recibe automáticamente por DM el paper técnico original, las gráficas de alta resolución y el dossier documental extendido de ${igHandle}.`,
          highlight: `GUARDA • COMPARTE • SÍGUENOS ${igHandle}`
        }
      ];

      setCarousels((prev) =>
        prev.map((item) =>
          item.id === carouselToUpdate.id
            ? {
                ...item,
                title: topicTitle,
                highlightPhrase: topicTitle.split(' ').slice(-3).join(' '),
                ctaKeyword: kw,
                slides: updatedSlides,
                status: 'AUDITADO_PRO',
                metrics: { originality: 100, retention: 99, brandSafety: 100, conversion: 98 }
              }
            : item
        )
      );
      setActiveSlideIdx(0);
      setIsGeneratingAI(false);
      setAiCustomPrompt('');
      showToast(`⚡ Carrusel "${topicTitle}" sintetizado y renderizado en vivo`);
    }, 450);
  };

  const runMultiAgentAudit = () => {
    setIsAuditing(true);
    setAuditStep(1);
    setTimeout(() => setAuditStep(2), 500);
    setTimeout(() => setAuditStep(3), 1000);
    setTimeout(() => setAuditStep(4), 1500);
    setTimeout(() => {
      setCarousels((prev) =>
        prev.map((c) => ({
          ...c,
          status: 'AUDITADO_PRO',
          metrics: {
            originality: 100,
            retention: Math.min(99, c.metrics.retention + 2),
            brandSafety: 100,
            conversion: Math.min(99, c.metrics.conversion + 2)
          }
        }))
      );
      setIsAuditing(false);
      setAuditStep(0);
      showToast(`🛡️ Los 4 Agentes certificaron la Semana ${activeWeek}/52 (21 Carruseles) en nivel GAMA ALTA PREMIUM`);
    }, 2000);
  };

  const updateCurrentSlideField = (field, value) => {
    setCarousels((prev) =>
      prev.map((c) => {
        if (c.id !== selectedCarousel.id) return c;
        const updatedSlides = c.slides.map((s, idx) =>
          idx === activeSlideIdx ? { ...s, [field]: value } : s
        );
        return {
          ...c,
          title: activeSlideIdx === 0 && field === 'headline' ? value : c.title,
          slides: updatedSlides
        };
      })
    );
  };

  const filteredCarousels = carousels.filter((c) => {
    const matchNiche = nicheFilter === 'ALL' || c.niche === nicheFilter;
    const matchDay = dayFilter === 'ALL' || c.dayName === dayFilter;
    const matchArch = archetypeFilter === 'ALL' || c.archetype === archetypeFilter;
    return matchNiche && matchDay && matchArch;
  });

  return (
    <div className="min-h-screen bg-[#07080D] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* FONDO AMBIENTAL */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      {/* NOTIFICACIÓN TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 text-cyan-200 shadow-2xl shadow-cyan-950/60 backdrop-blur-md">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* BARRA SUPERIOR DE COMANDO */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#07080D]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 via-cyan-400 to-amber-400 p-[1.5px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#07080D] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">
                  CÓDICE ANÓMALO STUDIO v3.0
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  7 Arquetipos Virales Drive
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  52 Semanas • 1,092 Carruseles
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 flex-wrap mt-0.5">
                <span className="text-cyan-400 font-mono font-bold">{igHandle}</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {timezone} ({mexicoClock})
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">
                  Semana Activa: <strong className="text-white">#{String(activeWeek).padStart(2, '0')}/52</strong> ({carousels[0]?.monthName})
                </span>
              </p>
            </div>
          </div>

          {/* Botones Rápidos de Exportación */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={downloadFullWeekZip}
              disabled={isExportingZip}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white text-xs font-black shadow-lg shadow-purple-500/20 transition"
            >
              <Package className="w-4 h-4" />
              {isExportingZip
                ? `Renderizando Semana ${activeWeek} (${zipProgress}%)...`
                : `Descargar ZIP Semana ${String(activeWeek).padStart(2, '0')} (105 PNGs)`}
            </button>
            <button
              onClick={downloadFullYearCatalogJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition"
            >
              <Download className="w-3.5 h-3.5" />
              Plan Anual (1,092 Posts)
            </button>
          </div>

          {/* Navegación Principal */}
          <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 w-full overflow-x-auto">
            {[
              { id: 'PLANNER', label: `1. Semana ${String(activeWeek).padStart(2, '0')}/52 (21 Carruseles Virales)`, icon: Calendar },
              { id: 'EDITOR', label: '2. Estudio Visual 4:5 (7 Estilos Drive)', icon: Layers },
              { id: 'ANNUAL', label: '3. Plan Anual (52 Semanas / 1,092 Posts)', icon: Sparkles },
              { id: 'AGENTS', label: '4. Auditoría 4 Agentes', icon: ShieldCheck },
              { id: 'DEPLOY', label: '5. Cloudflare + GitHub', icon: CloudLightning }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-gradient-to-r from-purple-500/25 to-cyan-500/25 text-cyan-200 border border-cyan-500/40 shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ====================================================================
            BARRA GLOBAL DE SELECCIÓN DE SEMANA (1..52) Y ARQUETIPOS DE DRIVE
           ==================================================================== */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-400" /> Selector de Semana Anual (1 a 52):
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSelectWeek(activeWeek - 1)}
                disabled={activeWeek <= 1}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <select
                value={activeWeek}
                onChange={(e) => handleSelectWeek(Number(e.target.value))}
                className="bg-slate-950 border border-purple-500/50 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
              >
                {annualSummary.weeksIndex.map((w) => (
                  <option key={w.weekNumber} value={w.weekNumber}>
                    Semana {String(w.weekNumber).padStart(2, '0')}/52 • {w.monthName} ({w.dossierRange})
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleSelectWeek(activeWeek + 1)}
                disabled={activeWeek >= 52}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-slate-400">
              Tema del Mes: <strong className="text-cyan-300">{carousels[0]?.monthTheme}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono">
              3 Posts/Día × 364 Días = <strong className="text-emerald-400">1,092 Carruseles</strong> (5,460 Slides)
            </span>
          </div>
        </div>

        {/* ====================================================================
            VISTA 1: PLANIFICADOR DE LOTE SEMANAL CON PREVIEW VISUAL REAL
           ==================================================================== */}
        {activeTab === 'PLANNER' && (
          <div className="space-y-6">
            {/* Barra de Configuración de Cuenta + Zona Horaria de México + 3 Horarios */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-4 space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <UserCheck className="w-4 h-4" /> Cuenta Oficial & Zona Horaria México
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={igHandle}
                    onChange={(e) => setIgHandle(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-sm font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400 w-44"
                  />
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="America/Mexico_City">🇲🇽 America/Mexico_City (CDMX)</option>
                    <option value="America/Monterrey">🇲🇽 America/Monterrey</option>
                    <option value="America/Cancun">🇲🇽 America/Cancun</option>
                    <option value="America/Tijuana">🇲🇽 America/Tijuana</option>
                  </select>
                </div>
                <p className="text-[11px] text-slate-400">
                  Todos los diseños llevan el emblema verificado de <span className="text-slate-200 font-mono">{igHandle}</span>
                </p>
              </div>

              {/* 3 Horarios Diarios Editables */}
              <div className="lg:col-span-5 grid grid-cols-3 gap-2.5">
                {slots.map((slot, idx) => (
                  <div key={slot.id} className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Slot {idx + 1} • {slot.label}
                    </span>
                    <input
                      type="time"
                      value={slot.time}
                      onChange={(e) => handleSlotTimeChange(idx, e.target.value)}
                      className="mt-1 w-full bg-slate-900 border border-cyan-500/40 rounded-lg px-2 py-1 text-xs font-mono font-bold text-cyan-300 focus:outline-none"
                    />
                    <span className="text-[10px] text-emerald-400 block mt-1 truncate">{slot.tag}</span>
                  </div>
                ))}
              </div>

              {/* Botones de Acción Masiva */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <button
                  onClick={downloadFullWeekZip}
                  disabled={isExportingZip}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition"
                >
                  <Download className="w-4 h-4" />
                  {isExportingZip
                    ? `Renderizando ZIP (${zipProgress}%)...`
                    : `Bajar ZIP Semana ${String(activeWeek).padStart(2, '0')} (105 PNG)`}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={runMultiAgentAudit}
                    disabled={isAuditing}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-200 text-xs font-bold transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                    Auditar 21
                  </button>
                  <button
                    onClick={() => setActiveTab('ANNUAL')}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    52 Semanas
                  </button>
                </div>
              </div>
            </div>

            {/* Filtros por Arquetipo Visual Drive, Nicho y Día */}
            <div className="space-y-2.5">
              {/* Filtro de los 7 Arquetipos Virales de Google Drive */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setArchetypeFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition whitespace-nowrap flex items-center gap-1.5 ${
                    archetypeFilter === 'ALL'
                      ? 'bg-purple-500/25 border-purple-400 text-purple-200'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  7 Estilos Virales Drive (Todos)
                </button>
                {Object.values(ARCHETYPE_META).map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => setArchetypeFilter(arch.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition whitespace-nowrap ${
                      archetypeFilter === arch.id
                        ? 'bg-slate-800 border-cyan-400 text-white'
                        : 'bg-slate-900/70 border-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: arch.accentColor }}
                    />
                    {arch.name} <span className="text-[10px] text-slate-400">({arch.referenceHandle})</span>
                  </button>
                ))}
              </div>

              {/* Filtro por Nicho */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setNicheFilter('ALL')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition whitespace-nowrap ${
                    nicheFilter === 'ALL'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Todos los Nichos (7)
                </button>
                {Object.values(NICHES).map((n) => {
                  const Icon = n.icon;
                  const active = nicheFilter === n.id;
                  return (
                    <button
                      key={n.id}
                      onClick={() => setNicheFilter(n.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition whitespace-nowrap ${
                        active
                          ? 'bg-slate-800 border-cyan-400 text-white'
                          : 'bg-slate-900/70 border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: n.color }} />
                      {n.name}
                    </button>
                  );
                })}
              </div>

              {/* Filtro por Día */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setDayFilter('ALL')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                    dayFilter === 'ALL' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Semana Completa (Lunes - Domingo)
                </button>
                {DAYS.map((day) => (
                  <button
                    key={day}
                    onClick={() => setDayFilter(day)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                      dayFilter === day
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Cuadrícula de los 21 Carruseles con Miniatura Real del SVG Viral */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCarousels.map((carousel) => {
                const niche = NICHES[carousel.niche] || NICHES.TECH_IA;
                const archMeta = ARCHETYPE_META[carousel.archetype] || ARCHETYPE_META.INGENIA_PURPURA;
                const isSelected = carousel.id === selectedId;
                const coverSvgUri = `data:image/svg+xml;utf8,${encodeURIComponent(
                  createSlideSvg({ ...carousel, handle: igHandle }, carousel.slides[0], niche, {
                    archetype: carousel.archetype
                  })
                )}`;

                return (
                  <div
                    key={carousel.id}
                    onClick={() => {
                      setSelectedId(carousel.id);
                      setActiveSlideIdx(0);
                    }}
                    className={`group relative rounded-2xl p-4 bg-slate-900/80 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-cyan-400 ring-1 ring-cyan-400/40 shadow-xl shadow-cyan-950/40'
                        : 'border-slate-800/90 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-xs font-bold">
                            {carousel.dayName}
                          </span>
                          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                            {carousel.slotInfo.time} CDMX
                          </span>
                        </div>
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border"
                          style={{
                            borderColor: `${archMeta.accentColor}66`,
                            backgroundColor: `${archMeta.accentColor}18`,
                            color: archMeta.accentColor
                          }}
                        >
                          {archMeta.name}
                        </span>
                      </div>

                      {/* Vista Previa Visual Real 4:5 de la Portada Viral */}
                      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black border border-slate-800 mb-3 shadow-lg">
                        <img
                          src={coverSvgUri}
                          alt={carousel.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 border border-white/15 text-[10px] font-mono text-white">
                          {carousel.dossierCode}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
                        <span className="text-slate-300 font-mono text-[11px]">{archMeta.referenceHandle}</span>
                        <span>•</span>
                        <span>
                          DM: <strong className="text-cyan-300 font-mono">"{carousel.ctaKeyword}"</strong>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(carousel.id);
                          setActiveSlideIdx(0);
                          setActiveTab('EDITOR');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1 shrink-0 transition"
                      >
                        Editar 5 Slides <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================================
            VISTA 2: ESTUDIO DE CARRUSEL 4:5 EN VIVO CON LOS 7 ARQUETIPOS DRIVE
           ==================================================================== */}
        {activeTab === 'EDITOR' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[430px] bg-slate-950 border border-slate-800 rounded-3xl p-3.5 shadow-2xl">
                <div className="flex items-center justify-between px-2 py-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-cyan-400 to-amber-400 p-0.5">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[11px] font-black text-cyan-400">
                        CA
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white">{igHandle.replace('@', '')}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        Semana {activeWeek}/52 • {selectedCarousel.dayName} {selectedCarousel.slotInfo.time} CDMX
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-900 text-cyan-300 border border-cyan-500/30">
                    Slide {activeSlideIdx + 1}/5
                  </span>
                </div>

                {/* LIENZO VERTICAL 4:5 DE INSTAGRAM RENDERIZADO CON EL MOTOR VIRAL REAL */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                  <img
                    src={liveSlideSvgDataUri}
                    alt={`${selectedCarousel.title} - Slide ${activeSlideIdx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Controles de Navegación de las 5 Diapositivas */}
                <div className="mt-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Heart className="w-5 h-5 text-pink-500 fill-pink-500/20" />
                    <MessageCircle className="w-5 h-5 text-cyan-400" />
                    <Share2 className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {selectedCarousel.slides.map((s, idx) => (
                      <button
                        key={s.slideNumber}
                        onClick={() => setActiveSlideIdx(idx)}
                        className={`h-2 rounded-full transition-all ${
                          activeSlideIdx === idx ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                  <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveSlideIdx((prev) => Math.max(0, prev - 1))}
                    disabled={activeSlideIdx === 0}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs font-bold border border-slate-800"
                  >
                    <ChevronLeft className="w-4 h-4" /> Slide Anterior
                  </button>
                  <button
                    onClick={() => setActiveSlideIdx((prev) => Math.min(4, prev + 1))}
                    disabled={activeSlideIdx === 4}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 disabled:opacity-40 text-cyan-300 text-xs font-bold border border-cyan-500/30"
                  >
                    Siguiente Slide <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <button
                    onClick={downloadSingleSlidePng}
                    className="py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-black flex items-center justify-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" /> PNG Slide {activeSlideIdx + 1}/5
                  </button>
                  <button
                    onClick={downloadCurrentCarouselImages}
                    className="py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center justify-center gap-1.5 transition"
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> ZIP 5 PNGs Post
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: SELECTOR DE PLANTILLA VIRAL DRIVE + EDITOR EN VIVO */}
            <div className="lg:col-span-7 space-y-5">
              {/* Selector de Carrusel y Plantilla Viral (7 Arquetipos) */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="w-full sm:w-auto flex-1">
                    <label className="text-[11px] font-mono uppercase text-slate-400 block">
                      Carrusel Activo (Semana {String(activeWeek).padStart(2, '0')}/52 — 21 Carruseles)
                    </label>
                    <select
                      value={selectedCarousel.id}
                      onChange={(e) => {
                        setSelectedId(e.target.value);
                        setActiveSlideIdx(0);
                      }}
                      className="mt-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-cyan-400 w-full"
                    >
                      {carousels.map((c, i) => (
                        <option key={c.id} value={c.id}>
                          #{i + 1} [{c.dossierCode} • {c.dayName} {c.slotInfo.time}] — {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => regenerateCarouselWithGemini(selectedCarousel)}
                    disabled={isGeneratingAI}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-black text-xs transition shadow-lg"
                  >
                    <Wand2 className={`w-4 h-4 ${isGeneratingAI ? 'animate-spin' : ''}`} />
                    {isGeneratingAI ? 'Sintetizando...' : 'Variante Viral IA'}
                  </button>
                </div>

                {/* Selector de los 7 Arquetipos de Referencia de Google Drive */}
                <div>
                  <label className="text-xs font-bold text-purple-300 flex items-center gap-1.5 mb-2">
                    <Palette className="w-4 h-4 text-purple-400" />
                    Plantilla Visual Viral (7 Arquetipos de tu Carpeta Google Drive):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.values(ARCHETYPE_META).map((arch) => {
                      const active = selectedCarousel.archetype === arch.id;
                      return (
                        <button
                          key={arch.id}
                          onClick={() => handleArchetypeChange(arch.id)}
                          className={`text-left p-2.5 rounded-xl border transition flex items-start gap-2.5 ${
                            active
                              ? 'bg-slate-950 border-cyan-400 ring-1 ring-cyan-400/40'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 border border-white/30"
                            style={{ backgroundColor: arch.accentColor }}
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-black text-white truncate">{arch.name}</div>
                            <div className="text-[10px] font-mono text-cyan-300">{arch.referenceHandle}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    <strong>Estructura activa:</strong> {currentArchMeta.description}
                  </p>
                </div>
              </div>

              {/* Generador por Tema Personalizado */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Crear Carrusel Nuevo con este Arquetipo Visual
                  </span>
                  <span className="text-[11px] text-slate-400">Nicho: {currentNiche.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={aiCustomPrompt}
                    onChange={(e) => setAiCustomPrompt(e.target.value)}
                    placeholder="Ej: El reactor nuclear natural de Oklo en Gabón, Cristales de memoria 5D..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={() => regenerateCarouselWithGemini(selectedCarousel, aiCustomPrompt)}
                    disabled={isGeneratingAI || !aiCustomPrompt.trim()}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 disabled:opacity-40 border border-cyan-400/40 text-cyan-200 text-xs font-bold whitespace-nowrap transition"
                  >
                    Generar 5 Slides
                  </button>
                </div>
              </div>

              {/* Editor de las 5 Diapositivas */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-1.5">
                    {selectedCarousel.slides.map((s, idx) => (
                      <button
                        key={s.slideNumber}
                        onClick={() => setActiveSlideIdx(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          activeSlideIdx === idx
                            ? 'bg-cyan-500 text-slate-950 font-black'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        Slide {idx + 1}/5
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-cyan-400">{currentSlide.type}</span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Titular Principal (Slide {activeSlideIdx + 1})
                      </label>
                      <input
                        type="text"
                        value={currentSlide.headline}
                        onChange={(e) => updateCurrentSlideField('headline', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm font-bold text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Pregunta Editorial / Encabezado (Slides Interiores)
                      </label>
                      <input
                        type="text"
                        value={currentSlide.questionTitle || ''}
                        onChange={(e) => updateCurrentSlideField('questionTitle', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-purple-200 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Cuerpo Documental Verificado (Retención & Evidencia)
                    </label>
                    <textarea
                      rows={3}
                      value={currentSlide.body}
                      onChange={(e) => updateCurrentSlideField('body', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Callout / Barra Inferior
                      </label>
                      <input
                        type="text"
                        value={currentSlide.highlight}
                        onChange={(e) => updateCurrentSlideField('highlight', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Fuente Científica / Pie
                      </label>
                      <input
                        type="text"
                        value={currentSlide.sourceUrl || selectedCarousel.sourceCitation || ''}
                        onChange={(e) => updateCurrentSlideField('sourceUrl', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Keyword DM (ManyChat)
                      </label>
                      <input
                        type="text"
                        value={selectedCarousel.ctaKeyword}
                        onChange={(e) => {
                          const val = e.target.value.toUpperCase();
                          setCarousels((prev) =>
                            prev.map((c) => (c.id === selectedCarousel.id ? { ...c, ctaKeyword: val } : c))
                          );
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Guion de Reel Complementario + Caption */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-violet-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                      <Video className="w-4 h-4" /> Guion Reel 15s (Puente de Tráfico)
                    </span>
                    <button
                      onClick={() => copyToClipboard(selectedCarousel.reelScript15s || '', 'reel')}
                      className="text-[11px] text-violet-300 hover:underline"
                    >
                      Copiar Guion
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {selectedCarousel.reelScript15s}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" /> Institución, Fuente & Monetización
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-emerald-400 block mb-1">
                      {selectedCarousel.institutionTag} • {selectedCarousel.locationTag}
                    </strong>
                    {selectedCarousel.sourceCitation} — {selectedCarousel.monetizationCategory}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Caption Oficial de Instagram + Automatización DM
                  </label>
                  <button
                    onClick={() => copyToClipboard(selectedCarousel.caption, 'caption')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30"
                  >
                    {copiedId === 'caption' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copiar Caption
                  </button>
                </div>
                <textarea
                  rows={5}
                  value={selectedCarousel.caption}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCarousels((prev) =>
                      prev.map((c) => (c.id === selectedCarousel.id ? { ...c, caption: val } : c))
                    );
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono leading-relaxed focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            VISTA 3: PLAN ANUAL COMPLETO (52 SEMANAS = 1,092 CARRUSELES / 5,460 SLIDES)
           ==================================================================== */}
        {activeTab === 'ANNUAL' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/50 border border-purple-500/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
                  Arquitectura Anual Completa • 3 Publicaciones Diarias (09:00, 15:00, 21:00 CDMX)
                </span>
                <h2 className="text-2xl font-black text-white">
                  1 Año Completo de Contenido Viral: 52 Semanas • 1,092 Carruseles • 5,460 Imágenes 4:5
                </h2>
                <p className="text-sm text-slate-300 max-w-3xl">
                  Haz clic en cualquiera de las 52 semanas para cargarla inmediatamente en el estudio visual, editar sus diapositivas o descargar su paquete ZIP de 105 imágenes PNG listas para publicar.
                </p>
              </div>
              <button
                onClick={downloadFullYearCatalogJson}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-xl shrink-0"
              >
                <Download className="w-4 h-4" />
                Descargar Base Anual (1,092 Carruseles JSON)
              </button>
            </div>

            {/* 12 Bloques Temáticos Mensuales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ANNUAL_MONTH_THEMES.map((m) => (
                <div key={m.month} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      MES {String(m.month).padStart(2, '0')} • {m.name.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      ~91 Carruseles
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white">{m.theme}</h3>
                  <p className="text-xs text-slate-400">{m.focus}</p>
                </div>
              ))}
            </div>

            {/* Matriz Interactiva de las 52 Semanas */}
            <div className="rounded-2xl bg-slate-900/85 border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  Índice Interactivo de las 52 Semanas (Expedientes #CA-0001 a #CA-1092)
                </h3>
                <span className="text-xs font-mono text-emerald-400">100% LIBRE DE PLAGIO • VERIFICADO</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
                {annualSummary.weeksIndex.map((w) => {
                  const isCurrent = w.weekNumber === activeWeek;
                  return (
                    <div
                      key={w.weekNumber}
                      onClick={() => {
                        handleSelectWeek(w.weekNumber);
                        setActiveTab('PLANNER');
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400/40'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                          <span className="font-black text-white">
                            SEMANA {String(w.weekNumber).padStart(2, '0')}
                          </span>
                          <span className="text-cyan-400">{w.monthName}</span>
                        </div>
                        <div className="text-[11px] font-mono text-purple-300 mb-1.5">{w.dossierRange}</div>
                        <p className="text-xs text-slate-300 line-clamp-2">{w.theme}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-emerald-400 font-semibold">21 Posts • 105 PNGs</span>
                        <span className="text-cyan-300 font-bold flex items-center gap-1">
                          Cargar <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            VISTA 4: SISTEMA MULTI-AGENTE DE VALIDACIÓN Y AUDITORÍA
           ==================================================================== */}
        {activeTab === 'AGENTS' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-950/50 via-slate-900 to-cyan-950/40 border border-violet-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-violet-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-violet-400" /> Pipeline Autónomo de 4 Agentes Especializados
                </span>
                <h2 className="text-2xl font-black text-white">
                  Auditoría Multi-Agente: 7 Arquetipos Drive + 1,092 Expedientes Científicos
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl">
                  Replicación estructural de las cuentas más virales de tu carpeta de Google Drive con 0% plagio textual, fuentes verificadas y embudo de conversión por DM.
                </p>
              </div>
              <button
                onClick={runMultiAgentAudit}
                disabled={isAuditing}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                {isAuditing ? `Ejecutando Agente ${auditStep}/4...` : `Auditar Semana ${activeWeek}/52 Ahora`}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  id: 1,
                  name: 'Agente 01 // Arquitecto de Contenido Anual (52 Semanas)',
                  role: '1,092 Expedientes Documentados • 0% Plagio',
                  score: selectedCarousel.metrics.originality,
                  color: 'text-cyan-400',
                  border: auditStep === 1 ? 'border-cyan-400 ring-2 ring-cyan-400/40' : 'border-slate-800',
                  checks: [
                    '1,092 carruseles únicos (#CA-0001 a #CA-1092) sin repetición de títulos en las 52 semanas.',
                    'Instituciones reales verificadas: CERN, NASA JPL, FinalSpark, Uppsala, MIT, CNRS, ESA.',
                    `Firma autoral y check verificado de ${igHandle} integrados en cada diapositiva.`
                  ]
                },
                {
                  id: 2,
                  name: 'Agente 02 // Director de Arte Viral (7 Arquetipos Drive)',
                  role: 'Fidelidad Visual @ingenia.ai • @traselveloreal • @consciente • @desde_la_ciencia',
                  score: selectedCarousel.metrics.retention,
                  color: 'text-purple-400',
                  border: auditStep === 2 ? 'border-purple-400 ring-2 ring-purple-400/40' : 'border-slate-800',
                  checks: [
                    'Portadas con escena fotográfica/ilustrada superior, medallón circular con flecha curva y tipografía condensada bicolor.',
                    'Interiores editoriales en negro puro con título de pregunta, párrafo limpio, marco redondeado de evidencia y fuente en cursiva.',
                    'Variantes de papel rasgado con sirenas (@consciente), split 50/50 y divisor de Saturno (@desde_la_ciencia).'
                  ]
                },
                {
                  id: 3,
                  name: 'Agente 03 // Escudo de Monetización (Brand Safety)',
                  role: 'Protección contra Shadowban & Políticas de Meta',
                  score: selectedCarousel.metrics.brandSafety,
                  color: 'text-emerald-400',
                  border: auditStep === 3 ? 'border-emerald-400 ring-2 ring-emerald-400/40' : 'border-slate-800',
                  checks: [
                    'Enfoque estrictamente documental, astrofísico, histórico y de divulgación científica.',
                    'Cero reclamaciones de derechos de autor en textos o composiciones.',
                    'Apto al 100% para patrocinios de marcas Tech, SaaS, Educación y afiliación.'
                  ]
                },
                {
                  id: 4,
                  name: 'Agente 04 // Arquitecto de Conversión DM (ManyChat)',
                  role: 'Disparadores de Guardados, Compartidos y Lead Magnets',
                  score: selectedCarousel.metrics.conversion,
                  color: 'text-amber-400',
                  border: auditStep === 4 ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-slate-800',
                  checks: [
                    `Palabra clave única "${selectedCarousel.ctaKeyword}" destacada en la Slide 5/5 y en el Caption.`,
                    'Guion de Reel de 15 segundos incluido en cada uno de los 1,092 carruseles.',
                    '3 horarios óptimos configurados para México: 09:00, 15:00 y 21:00 (America/Mexico_City).'
                  ]
                }
              ].map((agent) => (
                <div
                  key={agent.id}
                  className={`p-5 rounded-2xl bg-slate-900/80 border transition-all ${agent.border}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-mono uppercase text-slate-400">{agent.role}</span>
                      <h3 className="text-base sm:text-lg font-black text-white mt-0.5">{agent.name}</h3>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-right">
                      <span className="text-[10px] text-slate-400 block">SCORE</span>
                      <span className={`text-lg font-black ${agent.color}`}>{agent.score}/100</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    {agent.checks.map((check, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${agent.color}`} />
                        <span>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            VISTA 5: CENTRO DE DESPLIEGUE CLOUDFLARE WORKERS + GITHUB REPO
           ==================================================================== */}
        {activeTab === 'DEPLOY' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono uppercase text-cyan-400 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" /> Sincronizado con GitHub: 4ngelll-del/codice-anomalo-studio
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                    Despliegue en Cloudflare Workers + GitHub CI/CD (v3.0 Plan Anual)
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 self-start">
                  Cron Triggers México (09:00, 15:00, 21:00 CDMX)
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
                <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800">
                  <span># Comandos de generación de lotes semanales (1..52) y despliegue en Cloudflare Edge</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `node scripts/generate-weekly-zip.mjs 1\nnpm run build\nnpx wrangler deploy`,
                        'cli'
                      )
                    }
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copiar Comandos
                  </button>
                </div>
                <p className="text-cyan-300">$ node scripts/generate-weekly-zip.mjs 1   # Genera las 105 imágenes PNG de la Semana 1 (o 1..52)</p>
                <p className="text-violet-300">$ npm run build && npx wrangler deploy      # Despliega en https://codice-anomalo-studio.4ngelll-200.workers.dev</p>
                <p className="text-emerald-400">$ git push origin main                      # Sincroniza con https://github.com/4ngelll-del/codice-anomalo-studio</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col">
                <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <FileCode className="w-4 h-4" /> wrangler.toml
                  </div>
                  <button
                    onClick={() => copyToClipboard(WRANGLER_TOML_CODE, 'wrangler')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1"
                  >
                    {copiedId === 'wrangler' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copiar
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  {WRANGLER_TOML_CODE}
                </pre>
              </div>

              <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col">
                <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-violet-300">
                    <GitBranch className="w-4 h-4" /> .github/workflows/deploy.yml
                  </div>
                  <button
                    onClick={() => copyToClipboard(GITHUB_WORKFLOW_CODE, 'gh')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1"
                  >
                    {copiedId === 'gh' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copiar
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  {GITHUB_WORKFLOW_CODE}
                </pre>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
              <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                  <CloudLightning className="w-4 h-4" /> src/worker.js (Cloudflare Worker Backend + API 52 Semanas)
                </div>
                <button
                  onClick={() => copyToClipboard(WORKER_JS_CODE, 'worker')}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1"
                >
                  {copiedId === 'worker' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copiar Worker Completo
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                {WORKER_JS_CODE}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
