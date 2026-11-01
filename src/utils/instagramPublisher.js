// src/utils/instagramPublisher.js
// ============================================================================
// MOTOR DE AUTOPUBLICACIÓN OFICIAL META / INSTAGRAM GRAPH API (v21.0)
// & KIT DE IDENTIDAD DE PERFIL (@codice.anomalo)
// Códice Anómalo Studio — Zona Horaria Oficial: America/Mexico_City (UTC-6)
// ============================================================================

import { buildWeekBatch, NICHES, DEFAULT_SLOTS } from '../data/weeklyBatch.js';

export const INSTAGRAM_GRAPH_API_VERSION = 'v21.0';
export const INSTAGRAM_GRAPH_BASE_URL = `https://graph.facebook.com/${INSTAGRAM_GRAPH_API_VERSION}`;
export const INSTAGRAM_PUBLIC_BASE_URL = 'https://codice-anomalo-studio.4ngelll-200.workers.dev';

/**
 * Kit Maestro de Identidad Visual, Biografía SEO, Highlights y Enlaces Públicos
 * para la cuenta oficial @codice.anomalo (sincronizado con /public/ig-profile y /public/ig-nov01)
 */
export const INSTAGRAM_PROFILE_KIT = {
  handle: '@codice.anomalo',
  backupHandles: ['@codiceanomalo', '@elcodiceanomalo', '@codiceanomalo.lab'],
  seoName: 'Códice Anómalo | Ciencia, IA & Misterios Documentados',
  seoNameAlternatives: [
    'Códice Anómalo | Misterios, Archivos y Mente Oculta 👁️‍🗨️',
    'Códice Anómalo | Archivos Ocultos & Psicología del Poder',
    'Códice Anómalo · Casos Inexplicables y Ciencia Prohibida'
  ],
  category: 'Ciencia y tecnología / Creador digital',
  categoryAlternatives: ['Educación', 'Sitio web de medios/noticias'],
  timezone: 'America/Mexico_City',
  utcOffset: '-06:00',
  schedulesCDMX: ['09:00', '15:00', '21:00'],
  primaryKeyword: 'CODICE',
  websiteUrl: INSTAGRAM_PUBLIC_BASE_URL,
  bio: [
    '🏛️ Ciencia extrema, IA, astrofísica y misterios documentados.',
    '🔬 3 expedientes diarios verificados (09:00 • 15:00 • 21:00 CDMX).',
    '📂 Bóveda: 7 Dossiers PDF + Papers',
    '👇 Comenta "CODICE" o entra aquí:'
  ].join('\n'),
  bioLines: [
    '🏛️ Ciencia extrema, IA, astrofísica y misterios documentados.',
    '🔬 3 expedientes diarios verificados (09:00 • 15:00 • 21:00 CDMX).',
    '📂 Bóveda: 7 Dossiers PDF + Papers',
    '👇 Comenta "CODICE" o entra aquí:'
  ],
  bioVaultAlternative: [
    '🏛️ Archivo de anomalías históricas, ciencia límite y poder oculto.',
    '🧠 Decodificamos lo que borraron del registro oficial.',
    '📂 Bóveda: 7 Dossiers PDF',
    '👇 Comenta "CODICE" o entra aquí:'
  ].join('\n'),
  profileAssets: {
    avatarNeon: '/ig-profile/avatar-principal.png',
    avatarGold: '/ig-profile/avatar-dorado.png',
    banner: '/ig-profile/banner-perfil.png',
    welcomeStory: '/ig-profile/historia-bienvenida.png',
    avatarNeonUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/avatar-principal.png`,
    avatarGoldUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/avatar-dorado.png`,
    bannerUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/banner-perfil.png`,
    welcomeStoryUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/historia-bienvenida.png`
  },
  avatar: {
    id: 'avatar-principal',
    title: 'Foto de Perfil Oficial — Neón Cian & Oro (1080×1080)',
    dimensions: '1080×1080 px (1:1)',
    fileName: '01_FOTO_DE_PERFIL_AVATAR_1080x1080.png',
    relativePath: '/ig-profile/avatar-principal.png',
    publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/avatar-principal.png`,
    description:
      'Emblema oficial de Códice Anómalo en cian cibernético (#00F0FF) y oro cuántico (#F59E0B) sobre obsidiana profunda (#06070B), optimizado para el recorte circular de Instagram.'
  },
  avatarGold: {
    id: 'avatar-dorado',
    title: 'Foto de Perfil Alternativa — Ojo Dorado Hermético (1080×1080)',
    dimensions: '1080×1080 px (1:1)',
    fileName: '02_FOTO_DE_PERFIL_OJO_DORADO_1080x1080.png',
    relativePath: '/ig-profile/avatar-dorado.png',
    publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/avatar-dorado.png`,
    description:
      'Variante de prestigio en oro imperial (#F59E0B) para campañas especiales o cuenta secundaria.'
  },
  banner: {
    id: 'banner-perfil',
    title: 'Banner Maestro de Cabecera & Fondo Editorial (1920×1080)',
    dimensions: '1920×1080 px (16:9)',
    fileName: '03_BANNER_FONDO_PERFIL_Y_META_1920x1080.png',
    relativePath: '/ig-profile/banner-perfil.png',
    publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/banner-perfil.png`,
    description:
      'Arte conceptual 16:9 para cabecera de Meta Business Suite, Media Kit y portada del repositorio documental.'
  },
  welcomeStory: {
    id: 'historia-bienvenida',
    title: 'Portada de Historia Destacada / Bienvenida (1080×1920 9:16)',
    dimensions: '1080×1920 px (9:16)',
    fileName: '04_PORTADA_HISTORIA_BIENVENIDA_1080x1920.png',
    relativePath: '/ig-profile/historia-bienvenida.png',
    publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/historia-bienvenida.png`,
    description:
      'Story vertical 9:16 lista para fijar en el primer Highlight con CTA a la palabra clave "CODICE".'
  },
  highlights: [
    {
      id: 'hl-01',
      order: 1,
      title: 'IA & Tech',
      subtitle: 'BIOCÓMPUTO & SILICIO',
      keyword: 'ORGANOIDE',
      accentColor: '#00F0FF',
      fileName: 'HIGHLIGHT_01_IA_Y_TECH.png',
      relativePath: '/ig-profile/highlight-1.png',
      url: '/ig-profile/highlight-1.png',
      publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/highlight-1.png`,
      storyCopy:
        'Servidores biológicos de neuronas humanas (FinalSpark), cristales sintetizados por IA (GNoME) y robots celulares autorreplicantes (Xenobots). Responde "ORGANOIDE" para recibir el índice.'
    },
    {
      id: 'hl-02',
      order: 2,
      title: 'Insólito',
      subtitle: 'FENÓMENO EMPÍRICO',
      keyword: 'MOVILE',
      accentColor: '#10B981',
      fileName: 'HIGHLIGHT_02_INSOLITO.png',
      relativePath: '/ig-profile/highlight-2.png',
      url: '/ig-profile/highlight-2.png',
      publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/highlight-2.png`,
      storyCopy:
        'La cueva de Movile sellada por 5.5 millones de años, el reactor nuclear natural de Oklo y el pozo superprofundo de Kola. Responde "MOVILE" para ver las pruebas.'
    },
    {
      id: 'hl-03',
      order: 3,
      title: 'Misterios',
      subtitle: 'EXPEDIENTE ABIERTO',
      keyword: 'ARECIBO',
      accentColor: '#F59E0B',
      fileName: 'HIGHLIGHT_03_MISTERIOS.png',
      relativePath: '/ig-profile/highlight-3.png',
      url: '/ig-profile/highlight-3.png',
      publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/highlight-3.png`,
      storyCopy:
        'La señal SHGb02+14a de Arecibo, la anomalía de sonar del Mar Báltico y las cámaras detectadas por muones en Guiza. Responde "ARECIBO" para recibir las fichas forenses.'
    },
    {
      id: 'hl-04',
      order: 4,
      title: 'Cosmología',
      subtitle: 'ÓPTICA & GEODESIA',
      keyword: 'MAPAMUNDI',
      accentColor: '#EC4899',
      fileName: 'HIGHLIGHT_04_COSMOLOGIA.png',
      relativePath: '/ig-profile/highlight-4.png',
      url: '/ig-profile/highlight-4.png',
      publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/highlight-4.png`,
      storyCopy:
        'El planisferio polar de Urbano Monte (1587), la ilusión de la bóveda celeste y experimentos geodésicos en la Antártida. Responde "MAPAMUNDI" para descargar los mapas HD.'
    },
    {
      id: 'hl-05',
      order: 5,
      title: 'Mega-Ing',
      subtitle: 'INGENIERÍA EXTREMA',
      keyword: 'DYSON',
      accentColor: '#8B5CF6',
      fileName: 'HIGHLIGHT_05_MEGA_ING.png',
      relativePath: '/ig-profile/highlight-5.png',
      url: '/ig-profile/highlight-5.png',
      publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/highlight-5.png`,
      storyCopy:
        'El ascensor espacial japonés de 96.000 km (Obayashi), discos de cuarzo 5D eternos y las 7 candidatas a Esferas de Dyson. Responde "DYSON" para abrir el expediente.'
    },
    {
      id: 'hl-06',
      order: 6,
      title: 'Cosmos',
      subtitle: 'ESPACIO PROFUNDO',
      keyword: 'MATUSALEN',
      accentColor: '#3B82F6',
      fileName: 'HIGHLIGHT_06_ESPACIO.png',
      relativePath: '/ig-profile/highlight-6.png',
      url: '/ig-profile/highlight-6.png',
      publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/highlight-6.png`,
      storyCopy:
        'El Gran Vacío de Boötes, la Estrella Matusalén (HD 140283) y el púlsar que gira 716 veces por segundo. Responde "MATUSALEN" para abrir el archivo astronómico.'
    },
    {
      id: 'hl-07',
      order: 7,
      title: 'Dossiers VIP',
      subtitle: 'BÓVEDA PDF • DM',
      keyword: 'CODICE',
      accentColor: '#A855F7',
      fileName: 'HIGHLIGHT_07_DOSSIERS_DM.png',
      relativePath: '/ig-profile/highlight-7.png',
      url: '/ig-profile/highlight-7.png',
      publicUrl: `${INSTAGRAM_PUBLIC_BASE_URL}/ig-profile/highlight-7.png`,
      storyCopy:
        'Acceso directo a los 7 Dossiers Documentales en PDF, papers revisados por pares y el Círculo Interno de Códice Anómalo. Responde "CODICE" y te enviamos la llave por DM.'
    }
  ]
};

/**
 * Construye los 3 carruseles de lanzamiento (Inauguración Hoy Domingo 1 de Noviembre de 2026:
 * #CA-0001, #CA-0002 y #CA-0003) + los 3 carruseles astronómicos de Domingo (#CA-0019, #CA-0020 y #CA-0021)
 * apuntando a las rutas exactas en /ig-nov01/post{1..3}-slide{1..5}.png y /ig-nov01/domingo{1..3}-slide{1..5}.png
 */
export function getTodayNov01Carousels(
  baseUrl = INSTAGRAM_PUBLIC_BASE_URL,
  handle = '@codice.anomalo',
  mode = 'launch' // 'launch' = post1..3 (#CA-0001..0003) | 'sunday' = domingo1..3 (#CA-0019..0021)
) {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const week1Batch = buildWeekBatch(1, DEFAULT_SLOTS, handle);

  const isSundayPack = mode === 'sunday';
  const selectedPosts = isSundayPack ? week1Batch.slice(18, 21) : week1Batch.slice(0, 3);
  const filePrefix = isSundayPack ? 'domingo' : 'post';

  const slotLabels = [
    {
      slotIndex: 0,
      slotId: 'MANANA',
      slot: '09:00',
      timeCDMX: '09:00',
      utcCron: '15:00 UTC',
      label: 'MAÑANA (ALTO ALCANCE — 09:00 CDMX)'
    },
    {
      slotIndex: 1,
      slotId: 'TARDE',
      slot: '15:00',
      timeCDMX: '15:00',
      utcCron: '21:00 UTC',
      label: 'TARDE (GUARDADOS Y DEBATE — 15:00 CDMX)'
    },
    {
      slotIndex: 2,
      slotId: 'NOCHE',
      slot: '21:00',
      timeCDMX: '21:00',
      utcCron: '03:00 UTC (+1)',
      label: 'NOCHE (RETENCIÓN PROFUNDA — 21:00 CDMX)'
    }
  ];

  return selectedPosts.map((post, idx) => {
    const slotMeta = slotLabels[idx] || slotLabels[0];
    const nicheInfo = NICHES[post.niche] || NICHES.TECH_IA;
    const postNum = idx + 1;

    const imageUrls = [1, 2, 3, 4, 5].map(
      (sNum) => `${cleanBase}/ig-nov01/${filePrefix}${postNum}-slide${sNum}.png`
    );
    const relativeImagePaths = [1, 2, 3, 4, 5].map(
      (sNum) => `/ig-nov01/${filePrefix}${postNum}-slide${sNum}.png`
    );

    return {
      ...post,
      dateISO: '2026-11-01',
      dateLabel: 'Domingo 1 de Noviembre de 2026',
      timezone: 'America/Mexico_City (UTC-6)',
      slotIndex: idx,
      slot: slotMeta.slot,
      slotId: slotMeta.slotId,
      timeCDMX: slotMeta.timeCDMX,
      utcCron: slotMeta.utcCron,
      label: slotMeta.label,
      slotLabel: slotMeta.label,
      nicheName: nicheInfo.name,
      nicheBadge: nicheInfo.badge,
      nicheColor: nicheInfo.color,
      imageUrls,
      slidesUrls: imageUrls,
      relativeImagePaths
    };
  });
}

/**
 * Devuelve el paquete completo del Kit de Perfil + los 3 Carruseles de Hoy (Domingo 1 Nov 2026)
 * y también los 3 Carruseles Especiales de Domingo Astronómico
 */
export function getInstagramProfileKitPayload(baseUrl = INSTAGRAM_PUBLIC_BASE_URL, handle = '@codice.anomalo') {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const todayCarousels = getTodayNov01Carousels(cleanBase, handle, 'launch');
  const sundayAstronomyCarousels = getTodayNov01Carousels(cleanBase, handle, 'sunday');

  return {
    ...INSTAGRAM_PROFILE_KIT,
    handle,
    baseUrl: cleanBase,
    websiteUrl: cleanBase,
    profileAssets: {
      avatarNeon: '/ig-profile/avatar-principal.png',
      avatarGold: '/ig-profile/avatar-dorado.png',
      banner: '/ig-profile/banner-perfil.png',
      welcomeStory: '/ig-profile/historia-bienvenida.png',
      avatarNeonUrl: `${cleanBase}/ig-profile/avatar-principal.png`,
      avatarGoldUrl: `${cleanBase}/ig-profile/avatar-dorado.png`,
      bannerUrl: `${cleanBase}/ig-profile/banner-perfil.png`,
      welcomeStoryUrl: `${cleanBase}/ig-profile/historia-bienvenida.png`,
      highlights: INSTAGRAM_PROFILE_KIT.highlights.map((hl) => ({
        ...hl,
        publicUrl: `${cleanBase}${hl.relativePath}`
      }))
    },
    avatar: {
      ...INSTAGRAM_PROFILE_KIT.avatar,
      publicUrl: `${cleanBase}${INSTAGRAM_PROFILE_KIT.avatar.relativePath}`
    },
    avatarGold: {
      ...INSTAGRAM_PROFILE_KIT.avatarGold,
      publicUrl: `${cleanBase}${INSTAGRAM_PROFILE_KIT.avatarGold.relativePath}`
    },
    banner: {
      ...INSTAGRAM_PROFILE_KIT.banner,
      publicUrl: `${cleanBase}${INSTAGRAM_PROFILE_KIT.banner.relativePath}`
    },
    welcomeStory: {
      ...INSTAGRAM_PROFILE_KIT.welcomeStory,
      publicUrl: `${cleanBase}${INSTAGRAM_PROFILE_KIT.welcomeStory.relativePath}`
    },
    highlights: INSTAGRAM_PROFILE_KIT.highlights.map((hl) => ({
      ...hl,
      publicUrl: `${cleanBase}${hl.relativePath}`
    })),
    todayDate: 'Domingo 1 de Noviembre de 2026',
    todayCarousels,
    sundayAstronomyCarousels
  };
}

/**
 * Utilidad interna para pausa asíncrona entre chequeos de contenedor en Meta Graph API
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Verifica las credenciales de Instagram Graph API (IG_USER_ID + IG_ACCESS_TOKEN)
 * consultando los metadatos reales de la cuenta de Instagram Business / Creator.
 */
export async function verifyInstagramCredentials({ igUserId, accessToken }) {
  if (!igUserId || !accessToken) {
    return {
      ok: false,
      error: 'Faltan credenciales: proporciona igUserId (ID de cuenta Instagram Business/Creator) y accessToken.'
    };
  }

  const cleanUserId = String(igUserId).trim();
  const cleanToken = String(accessToken).trim();
  const endpoint = `${INSTAGRAM_GRAPH_BASE_URL}/${encodeURIComponent(
    cleanUserId
  )}?fields=id,username,name,profile_picture_url,followers_count,media_count&access_token=${encodeURIComponent(
    cleanToken
  )}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    const data = await response.json();

    if (!response.ok || data.error) {
      return {
        ok: false,
        status: response.status,
        error: data?.error?.message || `Error HTTP ${response.status} al verificar cuenta en Instagram Graph API`,
        errorDetails: data?.error || null
      };
    }

    return {
      ok: true,
      apiVersion: INSTAGRAM_GRAPH_API_VERSION,
      account: {
        id: data.id,
        username: data.username ? `@${data.username.replace(/^@/, '')}` : '@codice.anomalo',
        name: data.name || '',
        profilePictureUrl: data.profile_picture_url || null,
        followersCount: data.followers_count ?? 0,
        mediaCount: data.media_count ?? 0
      }
    };
  } catch (err) {
    return {
      ok: false,
      error: `Error de red al conectar con graph.facebook.com: ${err.message}`
    };
  }
}

/**
 * Ejecuta el flujo oficial de 3 pasos de Meta Instagram Graph API (v21.0)
 * para publicar un carrusel de 5 imágenes (1080x1350 4:5):
 *
 * Paso 1: Por cada imagen en `imageUrls`, ejecuta:
 *         POST https://graph.facebook.com/v21.0/{igUserId}/media
 *         con { image_url, is_carousel_item: true, access_token }
 *
 * Paso 2: Crea el contenedor padre del carrusel:
 *         POST https://graph.facebook.com/v21.0/{igUserId}/media
 *         con { media_type: 'CAROUSEL', children: 'id1,id2,id3,id4,id5', caption, access_token }
 *
 * Paso 3: Verifica que el contenedor tenga status_code === 'FINISHED' y publica:
 *         POST https://graph.facebook.com/v21.0/{igUserId}/media_publish
 *         con { creation_id: carouselContainerId, access_token }
 */
export async function publishCarouselToInstagramGraph({
  igUserId,
  accessToken,
  imageUrls,
  caption,
  pollIntervalMs = 2000,
  maxPollAttempts = 15
}) {
  if (!igUserId || !accessToken) {
    throw new Error(
      'Credenciales incompletas: se requieren IG_USER_ID e IG_ACCESS_TOKEN de una cuenta Instagram Business o Creator vinculada a Meta Graph API.'
    );
  }

  if (!Array.isArray(imageUrls) || imageUrls.length < 2 || imageUrls.length > 10) {
    throw new Error(
      `Un carrusel de Instagram Graph API requiere entre 2 y 10 URLs públicas de imagen (recibidas: ${
        Array.isArray(imageUrls) ? imageUrls.length : 0
      }).`
    );
  }

  const cleanUserId = String(igUserId).trim();
  const cleanToken = String(accessToken).trim();
  const stepsLog = [];

  // ---------------------------------------------------------------------------
  // PASO 1: Crear los 5 contenedores hijos (is_carousel_item = true)
  // ---------------------------------------------------------------------------
  const childContainerIds = [];
  for (let i = 0; i < imageUrls.length; i++) {
    const imgUrl = imageUrls[i];
    const childParams = new URLSearchParams({
      image_url: imgUrl,
      is_carousel_item: 'true',
      access_token: cleanToken
    });

    const childRes = await fetch(`${INSTAGRAM_GRAPH_BASE_URL}/${encodeURIComponent(cleanUserId)}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: childParams.toString()
    });
    const childData = await childRes.json();

    if (!childRes.ok || childData.error || !childData.id) {
      const errMsg =
        childData?.error?.message ||
        `Fallo al crear contenedor hijo #${i + 1} (${imgUrl}) — HTTP ${childRes.status}`;
      throw new Error(`[Paso 1.${i + 1} - Contenedor Hijo] ${errMsg}`);
    }

    childContainerIds.push(childData.id);
    stepsLog.push({
      step: `1.${i + 1}`,
      action: 'CREATE_CAROUSEL_ITEM',
      slideNumber: i + 1,
      imageUrl: imgUrl,
      creationId: childData.id
    });
  }

  // ---------------------------------------------------------------------------
  // PASO 2: Crear el contenedor maestro del carrusel (media_type = CAROUSEL)
  // ---------------------------------------------------------------------------
  const parentParams = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: childContainerIds.join(','),
    caption: caption || '',
    access_token: cleanToken
  });

  const parentRes = await fetch(`${INSTAGRAM_GRAPH_BASE_URL}/${encodeURIComponent(cleanUserId)}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: parentParams.toString()
  });
  const parentData = await parentRes.json();

  if (!parentRes.ok || parentData.error || !parentData.id) {
    const errMsg =
      parentData?.error?.message || `Fallo al crear contenedor maestro CAROUSEL — HTTP ${parentRes.status}`;
    throw new Error(`[Paso 2 - Contenedor CAROUSEL] ${errMsg}`);
  }

  const carouselContainerId = parentData.id;
  stepsLog.push({
    step: '2',
    action: 'CREATE_CAROUSEL_CONTAINER',
    carouselContainerId,
    children: childContainerIds
  });

  // ---------------------------------------------------------------------------
  // PASO 3A: Consultar status_code del contenedor hasta que sea 'FINISHED'
  // ---------------------------------------------------------------------------
  let containerReady = false;
  let lastStatusCode = 'IN_PROGRESS';

  for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
    const statusUrl = `${INSTAGRAM_GRAPH_BASE_URL}/${encodeURIComponent(
      carouselContainerId
    )}?fields=status_code,status&access_token=${encodeURIComponent(cleanToken)}`;

    const statusRes = await fetch(statusUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    const statusData = await statusRes.json().catch(() => ({}));

    if (statusData?.status_code) {
      lastStatusCode = statusData.status_code;
    }

    if (statusData?.status_code === 'FINISHED' || (!statusData?.status_code && statusRes.ok)) {
      containerReady = true;
      stepsLog.push({
        step: `3A.${attempt}`,
        action: 'POLL_CONTAINER_STATUS',
        statusCode: statusData?.status_code || 'READY',
        attempt
      });
      break;
    }

    if (statusData?.status_code === 'ERROR' || statusData?.status_code === 'EXPIRED') {
      throw new Error(
        `[Paso 3A - Estado del Contenedor] Meta reportó estado ${statusData.status_code}: ${
          statusData.status || 'Error procesando las imágenes del carrusel.'
        }`
      );
    }

    await sleep(pollIntervalMs);
  }

  if (!containerReady) {
    stepsLog.push({
      step: '3A.WARN',
      action: 'POLL_TIMEOUT_PROCEEDING',
      lastStatusCode
    });
  }

  // ---------------------------------------------------------------------------
  // PASO 3B: Publicar el contenedor en el Feed de Instagram (/media_publish)
  // ---------------------------------------------------------------------------
  const publishParams = new URLSearchParams({
    creation_id: carouselContainerId,
    access_token: cleanToken
  });

  const publishRes = await fetch(
    `${INSTAGRAM_GRAPH_BASE_URL}/${encodeURIComponent(cleanUserId)}/media_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: publishParams.toString()
    }
  );
  const publishData = await publishRes.json();

  if (!publishRes.ok || publishData.error || !publishData.id) {
    const errMsg =
      publishData?.error?.message || `Fallo en /media_publish — HTTP ${publishRes.status}`;
    throw new Error(`[Paso 3B - Publicación Final] ${errMsg}`);
  }

  const publishedMediaId = publishData.id;
  stepsLog.push({
    step: '3B',
    action: 'MEDIA_PUBLISH_SUCCESS',
    publishedMediaId
  });

  // ---------------------------------------------------------------------------
  // PASO 4 (Opcional): Obtener el permalink oficial del post recién publicado
  // ---------------------------------------------------------------------------
  let permalink = null;
  let shortcode = null;
  try {
    const mediaInfoUrl = `${INSTAGRAM_GRAPH_BASE_URL}/${encodeURIComponent(
      publishedMediaId
    )}?fields=id,permalink,shortcode,timestamp&access_token=${encodeURIComponent(cleanToken)}`;
    const mediaInfoRes = await fetch(mediaInfoUrl);
    const mediaInfo = await mediaInfoRes.json();
    if (mediaInfoRes.ok && mediaInfo.permalink) {
      permalink = mediaInfo.permalink;
      shortcode = mediaInfo.shortcode || null;
    }
  } catch {
    // Si falla la lectura opcional del permalink, igual retornamos éxito con el mediaId
  }

  return {
    ok: true,
    apiVersion: INSTAGRAM_GRAPH_API_VERSION,
    igUserId: cleanUserId,
    childContainerIds,
    carouselContainerId,
    publishedMediaId,
    permalink,
    shortcode,
    publishedAt: new Date().toISOString(),
    stepsLog
  };
}
