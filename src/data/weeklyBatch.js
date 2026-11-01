// src/data/weeklyBatch.js
// ============================================================================
// BASE DE DATOS AUDITADA GAMA ALTA PREMIUM — CÓDICE ANÓMALO STUDIO (@codice.anomalo)
// Planificación Anual Completa: 52 Semanas × 21 Carruseles = 1,092 Carruseles (5,460 Diapositivas 4:5)
// 3 Publicaciones Diarias (09:00, 15:00 y 21:00 America/Mexico_City) + 7 Arquetipos Visuales Virales
// ============================================================================

import {
  VIRAL_ARCHETYPES,
  ARCHETYPE_KEYS,
  ANNUAL_MONTH_THEMES,
  SEED_CASES_84,
  MASTER_CASE_LIBRARY,
  generateWeekCatalog,
  getAnnualSummary
} from './annualCatalog.js';

export {
  VIRAL_ARCHETYPES,
  ARCHETYPE_KEYS,
  ANNUAL_MONTH_THEMES,
  SEED_CASES_84,
  MASTER_CASE_LIBRARY,
  getAnnualSummary
};

export const NICHES = {
  TECH_IA: {
    id: 'TECH_IA',
    name: 'Tecnología e IA',
    badge: 'IA & BIOCÓMPUTO',
    color: '#00F0FF',
    gradient: 'from-cyan-950 via-slate-950 to-blue-950',
    accentBg: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(0, 240, 255, 0.18) 0%, transparent 55%)'
  },
  INSOLITO: {
    id: 'INSOLITO',
    name: 'Cosas Insólitas',
    badge: 'FENÓMENO EMPÍRICO',
    color: '#10B981',
    gradient: 'from-emerald-950 via-slate-950 to-teal-950',
    accentBg: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.18) 0%, transparent 55%)'
  },
  MISTERIOS: {
    id: 'MISTERIOS',
    name: 'Misterios Sin Resolver',
    badge: 'EXPEDIENTE ABIERTO',
    color: '#F59E0B',
    gradient: 'from-amber-950 via-slate-950 to-orange-950',
    accentBg: 'bg-amber-500/10 border-amber-500/40 text-amber-300',
    pattern: 'radial-gradient(circle at 50% 25%, rgba(245, 158, 11, 0.18) 0%, transparent 55%)'
  },
  COSMOLOGIA: {
    id: 'COSMOLOGIA',
    name: 'Teorías y Tierra Plana',
    badge: 'COSMOLOGÍA & ÓPTICA',
    color: '#EC4899',
    gradient: 'from-pink-950 via-slate-950 to-purple-950',
    accentBg: 'bg-pink-500/10 border-pink-500/40 text-pink-300',
    pattern: 'radial-gradient(circle at 85% 75%, rgba(236, 72, 153, 0.18) 0%, transparent 55%)'
  },
  TECH_EXTRA: {
    id: 'TECH_EXTRA',
    name: 'Tecnología Extraordinaria',
    badge: 'MEGA-INGENIERÍA',
    color: '#8B5CF6',
    gradient: 'from-violet-950 via-slate-950 to-indigo-950',
    accentBg: 'bg-violet-500/10 border-violet-500/40 text-violet-300',
    pattern: 'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 55%)'
  },
  ESPACIO: {
    id: 'ESPACIO',
    name: 'Espacio Sideral',
    badge: 'COSMOS PROFUNDO',
    color: '#3B82F6',
    gradient: 'from-blue-950 via-black to-indigo-950',
    accentBg: 'bg-blue-500/10 border-blue-500/40 text-blue-300',
    pattern: 'radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 55%)'
  },
  INTERNET: {
    id: 'INTERNET',
    name: 'Cultura del Internet',
    badge: 'ARCHIVO DIGITAL',
    color: '#14B8A6',
    gradient: 'from-teal-950 via-slate-950 to-emerald-950',
    accentBg: 'bg-teal-500/10 border-teal-500/40 text-teal-300',
    pattern: 'radial-gradient(circle at 30% 70%, rgba(20, 184, 166, 0.18) 0%, transparent 55%)'
  }
};

export const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const DEFAULT_SLOTS = [
  { id: 'MANANA', label: 'Mañana', time: '09:00', tag: 'Alto Alcance (CDMX)' },
  { id: 'TARDE', label: 'Tarde', time: '15:00', tag: 'Debate & Guardados' },
  { id: 'NOCHE', label: 'Noche', time: '21:00', tag: 'Retención Nocturna' }
];

// Los 21 temas de la Semana 1 (compatibilidad 100% con importaciones directas de PREMIUM_RAW_TOPICS)
export const PREMIUM_RAW_TOPICS = SEED_CASES_84.slice(0, 21).map((item, idx) => ({
  dayIndex: Math.floor(idx / 3),
  slotIndex: idx % 3,
  niche: item.niche,
  archetype: item.archetype,
  dossierCode: `EXPEDIENTE #CA-${String(idx + 1).padStart(4, '0')}`,
  title: item.title,
  highlightPhrase: item.highlightPhrase,
  subtitle: item.subtitle,
  institutionTag: item.institutionTag,
  locationTag: item.locationTag,
  sourceCitation: item.sourceCitation,
  cutoutLabel: item.cutoutLabel,
  context: item.context,
  twist: item.twist,
  climax: item.climax,
  ctaKeyword: item.ctaKeyword,
  visualPrompt: item.visualPrompt,
  sceneType: item.sceneType,
  reelScript15s: `Expediente #CA-${String(idx + 1).padStart(4, '0')}: ${item.subtitle}. ${item.context.split('.')[0]}. Acabo de subir las 5 pruebas al perfil. Comenta ${item.ctaKeyword} y te envío el dossier completo por DM.`,
  monetizationCategory: item.monetizationCategory,
  auditNotes: item.auditNotes
}));

/**
 * Construye el lote de 21 carruseles de cualquier semana del año (1..52)
 */
export function buildWeekBatch(weekNumber = 1, customSlots = DEFAULT_SLOTS, handle = '@codice.anomalo') {
  const rawWeek = generateWeekCatalog(weekNumber, customSlots, handle);
  return rawWeek.map((post) => {
    const nicheInfo = NICHES[post.niche] || NICHES.TECH_IA;
    const tagNiche = nicheInfo.name.replace(/\s+/g, '');
    return {
      ...post,
      caption: `${post.caption} #${tagNiche}`
    };
  });
}

/**
 * Construye el lote inicial (por defecto Semana 1, o cualquier semana indicada en el 3er parámetro)
 */
export function buildInitialBatch(customSlots = DEFAULT_SLOTS, handle = '@codice.anomalo', weekNumber = 1) {
  return buildWeekBatch(weekNumber, customSlots, handle);
}
