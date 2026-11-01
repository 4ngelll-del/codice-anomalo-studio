// src/worker.js — Cloudflare Worker Full-Stack: Sirve la Web App + API de Lotes Semanales (21 Posts) + Auditoría Multi-Agente + Cron Scheduler (America/Mexico_City)
import { buildInitialBatch, NICHES, DAYS, DEFAULT_SLOTS } from './data/weeklyBatch.js';

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

    // 1. Health & Metadata Endpoint
    if (url.pathname === "/api/status") {
      return new Response(
        JSON.stringify({
          ok: true,
          service: "Códice Anómalo Studio Engine v2.0",
          status: "ONLINE_EDGE",
          handle: env.IG_HANDLE || "@codice.anomalo",
          timezone: env.TIMEZONE || "America/Mexico_City",
          utcOffset: "-06:00",
          schedule: {
            manana: env.SLOT_MANANA || "09:00",
            tarde: env.SLOT_TARDE || "15:00",
            noche: env.SLOT_NOCHE || "21:00"
          },
          batchSize: 21,
          totalSlides: 105,
          agents: [
            "Agente 01 // Guardián de Originalidad (Anti-Plagio 0%)",
            "Agente 02 // Auditor de Retención y Psicología de Scroll",
            "Agente 03 // Escudo de Monetización & Brand Safety",
            "Agente 04 // Arquitecto de Conversión DM & Lead Magnets"
          ]
        }),
        { headers: corsHeaders }
      );
    }

    // 2. Obtener el lote semanal activo de 21 carruseles auditados
    if (url.pathname === "/api/batch/current") {
      const customHandle = url.searchParams.get("handle") || env.IG_HANDLE || "@codice.anomalo";
      let storedBatch = null;
      if (env.CODICE_LOTES_KV) {
        storedBatch = await env.CODICE_LOTES_KV.get("WEEKLY_BATCH_ACTIVE", "json");
      }
      const batch = storedBatch || buildInitialBatch(DEFAULT_SLOTS, customHandle);
      return new Response(
        JSON.stringify({
          ok: true,
          timezone: env.TIMEZONE || "America/Mexico_City",
          handle: customHandle,
          count: batch.length,
          totalSlides: batch.length * 5,
          batch
        }),
        { headers: corsHeaders }
      );
    }

    // 3. Auditar o Regenerar un carrusel / lote
    if (url.pathname === "/api/batch/audit" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const batch = buildInitialBatch(body.slots || DEFAULT_SLOTS, body.handle || env.IG_HANDLE || "@codice.anomalo");
      if (env.CODICE_LOTES_KV) {
        await env.CODICE_LOTES_KV.put("WEEKLY_BATCH_ACTIVE", JSON.stringify(batch));
      }
      return new Response(
        JSON.stringify({
          ok: true,
          auditedAt: new Date().toISOString(),
          timezone: "America/Mexico_City",
          certification: "GAMA_ALTA_PREMIUM_100",
          count: batch.length,
          batch
        }),
        { headers: corsHeaders }
      );
    }

    // 4. Servir la aplicación React (Static Assets en Cloudflare Workers)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response(
      JSON.stringify({
        service: "Códice Anómalo Studio Engine",
        endpoints: ["/api/status", "/api/batch/current", "/api/batch/audit"]
      }),
      { headers: corsHeaders }
    );
  },

  // Ejecución programada en Zona Horaria de México (America/Mexico_City)
  async scheduled(event, env, ctx) {
    const mexicoTime = new Intl.DateTimeFormat("es-MX", {
      timeZone: "America/Mexico_City",
      dateStyle: "full",
      timeStyle: "medium"
    }).format(new Date());

    console.log(`[Códice Anómalo Cron] Disparo ejecutado a las ${mexicoTime} (America/Mexico_City)`);
    if (env.CODICE_LOTES_KV) {
      const batch = buildInitialBatch(DEFAULT_SLOTS, env.IG_HANDLE || "@codice.anomalo");
      ctx.waitUntil(env.CODICE_LOTES_KV.put("WEEKLY_BATCH_ACTIVE", JSON.stringify(batch)));
    }
  }
};
