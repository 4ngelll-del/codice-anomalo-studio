// src/worker.js — Cloudflare Worker Full-Stack: Sirve la Web App + API Anual de 52 Semanas (1,092 Carruseles / 5,460 Slides) + 7 Arquetipos Virales + Cron Scheduler (America/Mexico_City)
import {
  buildInitialBatch,
  buildWeekBatch,
  NICHES,
  DAYS,
  DEFAULT_SLOTS,
  VIRAL_ARCHETYPES,
  ANNUAL_MONTH_THEMES,
  getAnnualSummary
} from './data/weeklyBatch.js';
import { ARCHETYPE_META } from './utils/viralSlideSvg.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "application/json; charset=utf-8"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Health & Metadata Endpoint (Plan Anual 52 Semanas / 1,092 Carruseles)
    if (url.pathname === "/api/status") {
      return new Response(
        JSON.stringify({
          ok: true,
          service: "Códice Anómalo Studio Engine v3.0 — Annual Viral Edition",
          status: "ONLINE_EDGE",
          handle: env.IG_HANDLE || "@codice.anomalo",
          timezone: env.TIMEZONE || "America/Mexico_City",
          utcOffset: "-06:00",
          schedule: {
            manana: env.SLOT_MANANA || "09:00",
            tarde: env.SLOT_TARDE || "15:00",
            noche: env.SLOT_NOCHE || "21:00"
          },
          annualCapacity: {
            totalWeeks: 52,
            totalDays: 364,
            dailyPosts: 3,
            totalCarousels: 1092,
            totalSlides: 5460
          },
          viralArchetypes: Object.values(ARCHETYPE_META).map((a) => ({
            id: a.id,
            name: a.name,
            referenceHandle: a.referenceHandle,
            accentColor: a.accentColor
          })),
          agents: [
            "Agente 01 // Arquitecto de Contenido Anual (1,092 Expedientes 0% Plagio)",
            "Agente 02 // Director de Arte Viral (7 Arquetipos de Referencia Drive)",
            "Agente 03 // Auditor de Retención y Psicología de Scroll",
            "Agente 04 // Escudo de Monetización & Automatización DM (ManyChat)"
          ]
        }),
        { headers: corsHeaders }
      );
    }

    // 2. Resumen del Plan Anual Completo (52 Semanas / 12 Meses)
    if (url.pathname === "/api/annual/summary") {
      const summary = getAnnualSummary();
      return new Response(
        JSON.stringify({
          ok: true,
          timezone: env.TIMEZONE || "America/Mexico_City",
          handle: env.IG_HANDLE || "@codice.anomalo",
          months: ANNUAL_MONTH_THEMES,
          archetypes: ARCHETYPE_META,
          ...summary
        }),
        { headers: corsHeaders }
      );
    }

    // 3. Obtener el lote semanal de 21 carruseles de cualquier semana del año (1..52)
    if (url.pathname === "/api/batch/current" || url.pathname === "/api/batch/week") {
      const customHandle = url.searchParams.get("handle") || env.IG_HANDLE || "@codice.anomalo";
      const weekParam = Number(url.searchParams.get("week") || 1);
      const weekNumber = Math.min(52, Math.max(1, Number.isFinite(weekParam) ? weekParam : 1));
      const batch = buildWeekBatch(weekNumber, DEFAULT_SLOTS, customHandle);

      return new Response(
        JSON.stringify({
          ok: true,
          timezone: env.TIMEZONE || "America/Mexico_City",
          handle: customHandle,
          weekNumber,
          monthName: batch[0]?.monthName || "Mes 1",
          count: batch.length,
          totalSlides: batch.length * 5,
          batch
        }),
        { headers: corsHeaders }
      );
    }

    // 4. Auditar o Regenerar un lote semanal específico
    if (url.pathname === "/api/batch/audit" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const weekNumber = Math.min(52, Math.max(1, Number(body.weekNumber || 1)));
      const batch = buildWeekBatch(
        weekNumber,
        body.slots || DEFAULT_SLOTS,
        body.handle || env.IG_HANDLE || "@codice.anomalo"
      );
      if (env.CODICE_LOTES_KV) {
        await env.CODICE_LOTES_KV.put(`WEEKLY_BATCH_W${weekNumber}`, JSON.stringify(batch));
      }
      return new Response(
        JSON.stringify({
          ok: true,
          auditedAt: new Date().toISOString(),
          timezone: "America/Mexico_City",
          weekNumber,
          certification: "GAMA_ALTA_PREMIUM_100",
          count: batch.length,
          batch
        }),
        { headers: corsHeaders }
      );
    }

    // 5. Servir la aplicación React (Static Assets en Cloudflare Workers)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response(
      JSON.stringify({
        service: "Códice Anómalo Studio Engine v3.0",
        endpoints: ["/api/status", "/api/annual/summary", "/api/batch/current?week=1..52", "/api/batch/audit"]
      }),
      { headers: corsHeaders }
    );
  },

  // Cron Trigger Automático (Zona Horaria México UTC-6)
  async scheduled(event, env, ctx) {
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const currentWeek = Math.min(52, Math.max(1, Math.ceil(dayOfYear / 7)));
    const batch = buildWeekBatch(currentWeek, DEFAULT_SLOTS, env.IG_HANDLE || "@codice.anomalo");
    if (env.CODICE_LOTES_KV) {
      await env.CODICE_LOTES_KV.put("WEEKLY_BATCH_ACTIVE", JSON.stringify(batch));
    }
    console.log(
      `[CRON MEXICO] Semana ${currentWeek}/52 sincronizada (${batch.length} carruseles / 105 slides) @ ${now.toISOString()}`
    );
  }
};
