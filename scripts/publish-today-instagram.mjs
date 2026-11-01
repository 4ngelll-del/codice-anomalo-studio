#!/usr/bin/env node
// scripts/publish-today-instagram.mjs
// ============================================================================
// CLI OFICIAL DE AUTOPUBLICACIÓN EN INSTAGRAM GRAPH API (v21.0)
// Códice Anómalo Studio (@codice.anomalo) — Zona Horaria: America/Mexico_City (UTC-6)
//
// Ejemplos de uso:
//   1. Verificar credenciales:
//      IG_USER_ID="178414..." IG_ACCESS_TOKEN="EAAB..." node scripts/publish-today-instagram.mjs --verify
//
//   2. Simular (Dry-Run) la publicación de los 3 carruseles de Hoy (Domingo 1 Nov 2026):
//      node scripts/publish-today-instagram.mjs --dry-run
//
//   3. Publicar un turno específico (0 = 09:00, 1 = 15:00, 2 = 21:00) o los 3 (--slot all):
//      IG_USER_ID="178414..." IG_ACCESS_TOKEN="EAAB..." node scripts/publish-today-instagram.mjs --slot 0
//      IG_USER_ID="178414..." IG_ACCESS_TOKEN="EAAB..." node scripts/publish-today-instagram.mjs --slot all
//
//   4. Elegir entre el Pack de Lanzamiento (#CA-0001..0003) o el Pack Astronómico de Domingo (#CA-0019..0021):
//      IG_USER_ID="178414..." IG_ACCESS_TOKEN="EAAB..." node scripts/publish-today-instagram.mjs --pack sunday --slot all
// ============================================================================

import {
  INSTAGRAM_PROFILE_KIT,
  INSTAGRAM_PUBLIC_BASE_URL,
  getTodayNov01Carousels,
  verifyInstagramCredentials,
  publishCarouselToInstagramGraph
} from '../src/utils/instagramPublisher.js';

function parseArgs(argv) {
  const args = {
    igUserId: process.env.IG_USER_ID || '',
    accessToken: process.env.IG_ACCESS_TOKEN || '',
    slot: 'all', // '0' | '1' | '2' | 'all'
    pack: process.env.IG_PACK || 'launch', // 'launch' | 'sunday'
    baseUrl: process.env.IG_BASE_URL || INSTAGRAM_PUBLIC_BASE_URL,
    verifyOnly: false,
    dryRun: false
  };

  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];
    if (token === '--verify') {
      args.verifyOnly = true;
    } else if (token === '--dry-run') {
      args.dryRun = true;
    } else if (token === '--user-id' && argv[i + 1]) {
      args.igUserId = argv[++i];
    } else if (token === '--token' && argv[i + 1]) {
      args.accessToken = argv[++i];
    } else if (token === '--slot' && argv[i + 1]) {
      args.slot = argv[++i];
    } else if (token === '--pack' && argv[i + 1]) {
      args.pack = argv[++i];
    } else if (token === '--base-url' && argv[i + 1]) {
      args.baseUrl = argv[++i];
    }
  }

  return args;
}

async function main() {
  const opts = parseArgs(process.argv);
  const carousels = getTodayNov01Carousels(
    opts.baseUrl,
    INSTAGRAM_PROFILE_KIT.handle,
    opts.pack === 'sunday' ? 'sunday' : 'launch'
  );

  console.log('============================================================================');
  console.log('📸 MOTOR DE AUTOPUBLICACIÓN INSTAGRAM GRAPH API v21.0 — CÓDICE ANÓMALO STUDIO');
  console.log(`   Cuenta Objetivo : ${INSTAGRAM_PROFILE_KIT.handle} (${INSTAGRAM_PROFILE_KIT.seoName})`);
  console.log(`   Zona Horaria    : ${INSTAGRAM_PROFILE_KIT.timezone} (${INSTAGRAM_PROFILE_KIT.utcOffset})`);
  console.log(`   Pack Seleccionado: ${opts.pack === 'sunday' ? 'Especial Domingo Astronómico (#CA-0019..0021)' : 'Lanzamiento Oficial (#CA-0001..0003)'}`);
  console.log(`   CDN / Base URL  : ${opts.baseUrl}`);
  console.log('============================================================================\n');

  if (opts.dryRun || (!opts.igUserId && !opts.accessToken)) {
    console.log(
      opts.dryRun
        ? '🧪 [MODO DRY-RUN ACTIVO] Verificando estructura de los 3 carruseles de hoy sin enviar a Meta:\n'
        : 'ℹ️  No se detectaron IG_USER_ID / IG_ACCESS_TOKEN en el entorno. Mostrando vista previa lista para publicar:\n'
    );

    for (const c of carousels) {
      console.log(`  ▶ [${c.timeCDMX} CDMX] ${c.dossierCode} — ${c.title}`);
      console.log(`    • Arquetipo : ${c.archetype} | Keyword ManyChat: "${c.ctaKeyword}"`);
      console.log(`    • 5 Imágenes:`);
      c.imageUrls.forEach((u, idx) => console.log(`        ${idx + 1}. ${u}`));
      console.log('');
    }

    console.log('💡 Para publicar en vivo desde la terminal ejecuta:');
    console.log(
      '   $env:IG_USER_ID="TU_IG_USER_ID"; $env:IG_ACCESS_TOKEN="TU_ACCESS_TOKEN"; node scripts/publish-today-instagram.mjs --slot all'
    );
    return;
  }

  // 1. Verificar cuenta en Meta Graph API
  console.log('🔐 Verificando credenciales contra graph.facebook.com/v21.0...');
  const verification = await verifyInstagramCredentials({
    igUserId: opts.igUserId,
    accessToken: opts.accessToken
  });

  if (!verification.ok) {
    console.error(`❌ Error de verificación de credenciales: ${verification.error}`);
    process.exit(1);
  }

  console.log(
    `✅ Cuenta verificada: ${verification.account.username} (${verification.account.name || 'Instagram Business'}) — Seguidores: ${verification.account.followersCount} | Posts: ${verification.account.mediaCount}\n`
  );

  if (opts.verifyOnly) {
    return;
  }

  // 2. Determinar qué carruseles publicar (0, 1, 2 o todos)
  const targetCarousels =
    opts.slot === 'all'
      ? carousels
      : carousels.filter((c) => String(c.slotIndex) === String(opts.slot) || c.slot === opts.slot);

  if (targetCarousels.length === 0) {
    console.error(`❌ No se encontró ningún carrusel para --slot "${opts.slot}". Usa 0, 1, 2 o all.`);
    process.exit(1);
  }

  // 3. Publicar cada carrusel con el flujo de 3 pasos de Instagram Graph API
  for (const carousel of targetCarousels) {
    console.log(`\n🚀 Publicando [${carousel.timeCDMX} CDMX] ${carousel.dossierCode}: ${carousel.title}...`);
    const result = await publishCarouselToInstagramGraph({
      igUserId: opts.igUserId,
      accessToken: opts.accessToken,
      imageUrls: carousel.imageUrls,
      caption: carousel.caption
    });

    console.log(`   ✅ Contenedores Hijos (5 slides): ${result.childContainerIds.join(', ')}`);
    console.log(`   ✅ Contenedor CAROUSEL Maestro  : ${result.carouselContainerId}`);
    console.log(`   🎉 Publicado exitosamente! Media ID: ${result.publishedMediaId}`);
    if (result.permalink) {
      console.log(`   🔗 Permalink Oficial: ${result.permalink}`);
    }
  }
}

main().catch((err) => {
  console.error('\n❌ Error durante la autopublicación en Instagram Graph API:', err.message);
  process.exit(1);
});
