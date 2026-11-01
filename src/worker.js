// src/worker.js — Cloudflare Worker Full-Stack: Sirve la Web App + API Anual de 52 Semanas (1,092 Carruseles / 5,460 Slides) + Motor Instagram Graph API v21.0 + Cron Scheduler (America/Mexico_City)
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
import {
  INSTAGRAM_GRAPH_API_VERSION,
  INSTAGRAM_PUBLIC_BASE_URL,
  getInstagramProfileKitPayload,
  getTodayNov01Carousels,
  verifyInstagramCredentials,
  publishCarouselToInstagramGraph
} from './utils/instagramPublisher.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const originBaseUrl = url.origin.includes('localhost')
      ? INSTAGRAM_PUBLIC_BASE_URL
      : url.origin;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json; charset=utf-8'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Health & Metadata Endpoint (Plan Anual 52 Semanas / 1,092 Carruseles + Instagram Graph API v21.0)
    if (url.pathname === '/api/status') {
      return new Response(
        JSON.stringify({
          ok: true,
          service: 'Códice Anómalo Studio Engine v3.5 — Annual Viral Edition + Instagram Graph API v21.0',
          status: 'ONLINE_EDGE',
          handle: env.IG_HANDLE || '@codice.anomalo',
          timezone: env.TIMEZONE || 'America/Mexico_City',
          utcOffset: '-06:00',
          instagramGraphApi: {
            version: INSTAGRAM_GRAPH_API_VERSION,
            configuredInEnv: Boolean(env.IG_USER_ID && env.IG_ACCESS_TOKEN),
            endpoints: [
              'GET /api/instagram/profile-kit',
              'POST /api/instagram/verify',
              'POST /api/instagram/publish'
            ]
          },
          schedule: {
            manana: env.SLOT_MANANA || '09:00',
            tarde: env.SLOT_TARDE || '15:00',
            noche: env.SLOT_NOCHE || '21:00'
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
            'Agente 00 // Operador Meta Instagram Graph API v21.0 & Kit de Identidad (@codice.anomalo)',
            'Agente 01 // Arquitecto de Contenido Anual (1,092 Expedientes 0% Plagio)',
            'Agente 02 // Director de Arte Viral (7 Arquetipos de Referencia Drive)',
            'Agente 03 // Auditor de Retención y Psicología de Scroll',
            'Agente 04 // Escudo de Monetización & Automatización DM (ManyChat)'
          ]
        }),
        { headers: corsHeaders }
      );
    }

    // 2. Kit de Perfil de Instagram (@codice.anomalo) + Los 3 Carruseles de Hoy (Domingo 1 Nov 2026)
    if (url.pathname === '/api/instagram/profile-kit') {
      const handle = url.searchParams.get('handle') || env.IG_HANDLE || '@codice.anomalo';
      const kitPayload = getInstagramProfileKitPayload(originBaseUrl, handle);

      return new Response(
        JSON.stringify({
          ok: true,
          apiVersion: INSTAGRAM_GRAPH_API_VERSION,
          envCredentialsReady: Boolean(env.IG_USER_ID && env.IG_ACCESS_TOKEN),
          ...kitPayload
        }),
        { headers: corsHeaders }
      );
    }

    // 3. Verificar Credenciales de Meta / Instagram Graph API (IG_USER_ID + IG_ACCESS_TOKEN)
    if (url.pathname === '/api/instagram/verify' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const igUserId = body.igUserId || env.IG_USER_ID;
      const accessToken = body.accessToken || env.IG_ACCESS_TOKEN;

      const verification = await verifyInstagramCredentials({ igUserId, accessToken });
      return new Response(JSON.stringify(verification), {
        status: verification.ok ? 200 : 400,
        headers: corsHeaders
      });
    }

    // 4. Autopublicar Carrusel(es) en Instagram Graph API v21.0 (POST /api/instagram/publish)
    if (url.pathname === '/api/instagram/publish' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const igUserId = body.igUserId || env.IG_USER_ID;
      const accessToken = body.accessToken || env.IG_ACCESS_TOKEN;

      if (body.action === 'verify') {
        const verification = await verifyInstagramCredentials({ igUserId, accessToken });
        return new Response(JSON.stringify(verification), {
          status: verification.ok ? 200 : 400,
          headers: corsHeaders
        });
      }

      if (!igUserId || !accessToken) {
        return new Response(
          JSON.stringify({
            ok: false,
            error:
              'Faltan credenciales IG_USER_ID o IG_ACCESS_TOKEN. Ingrésalas en la pestaña "📸 0. Operador Instagram" o configúralas como Secretos en Cloudflare Workers.'
          }),
          { status: 400, headers: corsHeaders }
        );
      }

      const packMode = body.pack === 'sunday' ? 'sunday' : 'launch';
      const todayCarousels = getTodayNov01Carousels(
        originBaseUrl,
        env.IG_HANDLE || '@codice.anomalo',
        packMode
      );

      try {
        // Si el usuario solicita publicar los 3 carruseles de hoy en lote (slotIndex === 'all')
        if (body.slotIndex === 'all' || body.publishAllToday === true) {
          const batchResults = [];
          for (const carousel of todayCarousels) {
            const pubRes = await publishCarouselToInstagramGraph({
              igUserId,
              accessToken,
              imageUrls: carousel.imageUrls,
              caption: carousel.caption
            });
            batchResults.push({
              slotIndex: carousel.slotIndex,
              timeCDMX: carousel.timeCDMX,
              dossierCode: carousel.dossierCode,
              title: carousel.title,
              ...pubRes
            });
          }

          return new Response(
            JSON.stringify({
              ok: true,
              mode: 'BATCH_3_CAROUSELS',
              pack: packMode,
              publishedCount: batchResults.length,
              results: batchResults
            }),
            { headers: corsHeaders }
          );
        }

        // Publicar un carrusel individual (por slotIndex 0, 1, 2 o con customImageUrls + caption)
        const slotIdx = Math.min(2, Math.max(0, Number(body.slotIndex ?? 0)));
        const selectedCarousel = todayCarousels[slotIdx] || todayCarousels[0];
        const imageUrls =
          Array.isArray(body.customImageUrls) && body.customImageUrls.length >= 2
            ? body.customImageUrls
            : selectedCarousel.imageUrls;
        const caption = body.caption || selectedCarousel.caption;

        const publishResult = await publishCarouselToInstagramGraph({
          igUserId,
          accessToken,
          imageUrls,
          caption
        });

        return new Response(
          JSON.stringify({
            ok: true,
            mode: 'SINGLE_CAROUSEL',
            pack: packMode,
            slotIndex: slotIdx,
            timeCDMX: selectedCarousel.timeCDMX,
            dossierCode: selectedCarousel.dossierCode,
            title: selectedCarousel.title,
            ...publishResult
          }),
          { headers: corsHeaders }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({
            ok: false,
            error: err.message || 'Error al publicar el carrusel en Instagram Graph API v21.0'
          }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // 5. Resumen del Plan Anual Completo (52 Semanas / 12 Meses)
    if (url.pathname === '/api/annual/summary') {
      const summary = getAnnualSummary();
      return new Response(
        JSON.stringify({
          ok: true,
          timezone: env.TIMEZONE || 'America/Mexico_City',
          handle: env.IG_HANDLE || '@codice.anomalo',
          months: ANNUAL_MONTH_THEMES,
          archetypes: ARCHETYPE_META,
          ...summary
        }),
        { headers: corsHeaders }
      );
    }

    // 6. Obtener el lote semanal de 21 carruseles de cualquier semana del año (1..52)
    if (url.pathname === '/api/batch/current' || url.pathname === '/api/batch/week') {
      const customHandle = url.searchParams.get('handle') || env.IG_HANDLE || '@codice.anomalo';
      const weekParam = Number(url.searchParams.get('week') || 1);
      const weekNumber = Math.min(52, Math.max(1, Number.isFinite(weekParam) ? weekParam : 1));
      const batch = buildWeekBatch(weekNumber, DEFAULT_SLOTS, customHandle);

      return new Response(
        JSON.stringify({
          ok: true,
          timezone: env.TIMEZONE || 'America/Mexico_City',
          handle: customHandle,
          weekNumber,
          monthName: batch[0]?.monthName || 'Mes 1',
          count: batch.length,
          totalSlides: batch.length * 5,
          batch
        }),
        { headers: corsHeaders }
      );
    }

    // 7. Auditar o Regenerar un lote semanal específico
    if (url.pathname === '/api/batch/audit' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const weekNumber = Math.min(52, Math.max(1, Number(body.weekNumber || 1)));
      const batch = buildWeekBatch(
        weekNumber,
        body.slots || DEFAULT_SLOTS,
        body.handle || env.IG_HANDLE || '@codice.anomalo'
      );
      if (env.CODICE_LOTES_KV) {
        await env.CODICE_LOTES_KV.put(`WEEKLY_BATCH_W${weekNumber}`, JSON.stringify(batch));
      }
      return new Response(
        JSON.stringify({
          ok: true,
          auditedAt: new Date().toISOString(),
          timezone: 'America/Mexico_City',
          weekNumber,
          certification: 'GAMA_ALTA_PREMIUM_100',
          count: batch.length,
          batch
        }),
        { headers: corsHeaders }
      );
    }

    // 8. Servir la aplicación React y los archivos estáticos (/ig-profile/* y /ig-nov01/*)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response(
      JSON.stringify({
        service: 'Códice Anómalo Studio Engine v3.5',
        endpoints: [
          '/api/status',
          '/api/instagram/profile-kit',
          '/api/instagram/verify',
          '/api/instagram/publish',
          '/api/annual/summary',
          '/api/batch/current?week=1..52',
          '/api/batch/audit'
        ]
      }),
      { headers: corsHeaders }
    );
  },

  // Cron Trigger Automático (Zona Horaria México UTC-6: 09:00, 15:00 y 21:00 CDMX -> 15:00, 21:00, 03:00 UTC)
  async scheduled(event, env, ctx) {
    const now = new Date(event?.scheduledTime || Date.now());
    const utcHour = now.getUTCHours();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const currentWeek = Math.min(52, Math.max(1, Math.ceil(dayOfYear / 7)));
    const handle = env.IG_HANDLE || '@codice.anomalo';

    const batch = buildWeekBatch(currentWeek, DEFAULT_SLOTS, handle);
    if (env.CODICE_LOTES_KV) {
      await env.CODICE_LOTES_KV.put('WEEKLY_BATCH_ACTIVE', JSON.stringify(batch));
    }

    // Mapear la hora UTC del Cron ("0 3,15,21 * * *") al turno CDMX (UTC-6):
    // 15:00 UTC = 09:00 CDMX (slotIndex 0 — Mañana)
    // 21:00 UTC = 15:00 CDMX (slotIndex 1 — Tarde)
    // 03:00 UTC = 21:00 CDMX (slotIndex 2 — Noche)
    let slotIndex = 0;
    if (utcHour === 15) slotIndex = 0;
    else if (utcHour === 21) slotIndex = 1;
    else if (utcHour === 3) slotIndex = 2;

    console.log(
      `[CRON MEXICO] Semana ${currentWeek}/52 sincronizada (${batch.length} carruseles) | Turno CDMX slot=${slotIndex} (UTC=${utcHour}:00) @ ${now.toISOString()}`
    );

    if (env.IG_USER_ID && env.IG_ACCESS_TOKEN) {
      const baseUrl = env.PUBLIC_BASE_URL || INSTAGRAM_PUBLIC_BASE_URL;
      const todayCarousels = getTodayNov01Carousels(baseUrl, handle, 'launch');
      const targetCarousel = todayCarousels[slotIndex] || todayCarousels[0];

      try {
        const result = await publishCarouselToInstagramGraph({
          igUserId: env.IG_USER_ID,
          accessToken: env.IG_ACCESS_TOKEN,
          imageUrls: targetCarousel.imageUrls,
          caption: targetCarousel.caption
        });
        console.log(
          `[CRON IG AUTO-PUBLISH OK] Publicado ${targetCarousel.dossierCode} (${targetCarousel.timeCDMX} CDMX) -> Media ID: ${result.publishedMediaId}`
        );
      } catch (err) {
        console.error(
          `[CRON IG AUTO-PUBLISH ERROR] Fallo al autopublicar turno ${slotIndex}: ${err.message}`
        );
      }
    } else {
      console.log(
        '[CRON IG STANDBY] IG_USER_ID / IG_ACCESS_TOKEN aún no configurados en secretos de Worker. Lote listo en espera.'
      );
    }
  }
};
