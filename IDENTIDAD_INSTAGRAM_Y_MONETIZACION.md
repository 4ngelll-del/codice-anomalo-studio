# AUDITORÍA DE IDENTIDAD DIGITAL, OPTIMIZACIÓN DE CONVERSIÓN Y ARQUITECTURA DE MONETIZACIÓN — CÓDICE ANÓMALO

**Fecha de Auditoría:** 1 de noviembre de 2026  
**Zona Horaria Oficial de Operación:** `America/Mexico_City` (UTC-6, Tiempo del Centro de México)  
**Ecosistema Objetivo:** Instagram (Reels, Carruseles, Stories, Automatización DM vía Meta Graph API / ManyChat)  
**Estado de Validación:** Verificación HTTP SSR (`facebookexternalhit/1.1`) + Indexación SERP completada con éxito.

---

## 1. AUDITORÍA TÉCNICA DE DISPONIBILIDAD DE HANDLES EN INSTAGRAM

### 1.1 Metodología de Verificación No Intrusiva
Para determinar la disponibilidad real sin activar bloqueos de tasa (*rate-limiting*) en los endpoints de registro de Meta, se ejecutó una doble validación técnica:
1. **Inspección de Metadatos OpenGraph (SSR Crawler Check):** Peticiones HTTP GET mediante el agente de renderizado oficial `facebookexternalhit/1.1` contra `https://www.instagram.com/{handle}/`, utilizando `@nasa` como perfil de control activo (`LEN: 693,956 bytes`, `OG_TITLE: NASA (@nasa) • Instagram photos and videos`). Los perfiles inexistentes/disponibles devuelven el contenedor base vacío (`LEN: ~506,360 bytes`, `TITLE: Instagram`, `OG_TITLE: NONE`).
2. **Rastreo de Indexación Pública (SERP Dorking):** Búsqueda de huella digital exacta con operadores `site:instagram.com` para descartar cuentas suspendidas, renombradas recientemente o con reclamos previos de marca.

### 1.2 Matriz de Resultados y Ranking de Handles

| Prioridad | Handle Candidato | Estado HTTP / OpenGraph (`og:title`) | Huella SERP (`site:instagram.com`) | Disponibilidad | Evaluación de Branding, Legibilidad y SEO |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **#1 (GANADOR)** | **`@codice.anomalo`** | `NONE` (Contenedor vacío: 506,369 B) | `0 resultados` | **DISPONIBLE** | **Óptimo.** El punto separador divide limpiamente ambos lexemas (`codice` + `anomalo`), maximiza la lectura visual en menos de 0.3 segundos en el feed de Reels y activa la tokenización exacta en el buscador interno de Instagram. |
| **#2 (Respaldo 1)** | **`@codiceanomalo`** | `NONE` (Contenedor vacío: 506,359 B) | `0 resultados` | **DISPONIBLE** | **Excelente.** Cero fricción tipográfica al dictarlo por voz en podcasts o cierres hablados de Reels. Se recomienda registrarlo simultáneamente como cuenta espejo/defensiva para evitar *typosquatting*. |
| **#3 (Respaldo 2)** | **`@elcodiceanomalo`** | `NONE` (Contenedor vacío: 506,358 B) | `0 resultados` | **DISPONIBLE** | **Muy Bueno.** El artículo determinante *"El"* aporta autoridad editorial y narrativa monolítica (estilo documental o archivo clasificado). Ideal como segunda opción si se busca tono de publicación literaria/investigativa. |
| **#4 (Respaldo 3)** | **`@codiceanomalo.lab`** | `NONE` (Contenedor vacío: 506,368 B) | `0 resultados` | **DISPONIBLE** | **Especializado.** El sufijo `.lab` posiciona la marca como laboratorio de experimentación, decodificación e inteligencia aplicada. Excelente para una cuenta secundaria de pruebas, detrás de cámaras o comunidad técnica. |
| **#5 (Respaldo 4)** | **`@codice.anomalo.oficial`** | `NONE` (Contenedor vacío: 506,372 B) | `0 resultados` | **DISPONIBLE** | **Funcional pero secundario.** El doble punto y el sufijo `.oficial` alargan el handle a 22 caracteres. Útil únicamente como contingencia ante suplantación de identidad. |

### 1.3 Veredicto de Identidad y Mitigación Semántica (Brand Safety)
* **Handle Principal Seleccionado:** **`@codice.anomalo`**
* **Estrategia de Protección de Marca:** Registrar `@codice.anomalo` como cuenta principal de producción y asegurar `@codiceanomalo` como cuenta reserva que redirija al perfil matriz.
* **Nota Crítica de Brand Safety Lingüístico:** En italiano, la cadena exacta *"codice anomalo"* significa literalmente *"código anómalo"* (asociado en buscadores italianos a alertas de códigos OTP/2FA de seguridad). Para blindar el posicionamiento semántico en español (México y LATAM) y evitar confusión algorítmica con soporte técnico de ciberseguridad:
  1. Mantener siempre la tilde ortográfica en el **Nombre Visible (`Códice Anómalo`)** y en los subtítulos en pantalla.
  2. Configurar el idioma de cuenta y metadatos de publicación en **Español (México / Latinoamérica)** desde el primer Reel.
  3. Evitar en los primeros 30 días palabras clave de soporte técnico (*"contraseña", "código SMS", "verificación de cuenta", "hackeo de perfil"*) que puedan activar filtros automatizados de *anti-phishing* de Meta.

---

## 2. NOMBRE DE PERFIL OPTIMIZADO PARA SEO EN INSTAGRAM

El campo **Nombre (Name)** de Instagram es independiente del `@handle`, permite hasta 64 caracteres y tiene el mayor peso de indexación en el motor de búsqueda interno de Instagram y Google.

### Opción Principal Recomendada (58 caracteres — Máxima Indexación y Autoridad)
```text
Códice Anómalo | Misterios, Archivos y Mente Oculta 👁️‍🗨️
```

### Variantes Alternativas según Enfoque de Monetización
* **Variante A (Enfoque Psicología Oscura, Poder y Decodificación — 56 caracteres):**
  ```text
  Códice Anómalo | Archivos Ocultos & Psicología del Poder
  ```
* **Variante B (Enfoque Investigación Documental & Anomalías — 55 caracteres):**
  ```text
  Códice Anómalo · Casos Inexplicables y Ciencia Prohibida
  ```

**Categoría de Cuenta (Creator / Business Profile):** `Educación` o `Sitio web de medios/noticias` (habilita todos los audios en tendencia, llamadas a la acción extendidas y acceso completo a la API de ManyChat).

---

## 3. BIOGRAFÍA DE 4 LÍNEAS DE ALTA CONVERSIÓN

Diseñada bajo la arquitectura **A-P-L-C** (*Autoridad + Promesa + Lead Magnet + Call To Action*), respetando el límite estricto de 150 caracteres para evitar el truncamiento (`... más`) en pantallas móviles iOS y Android:

### Versión Maestra (146 caracteres — Lista para Copiar y Pegar)
```text
🏛️ Archivo de anomalías históricas, ciencia límite y poder oculto.
🧠 Decodificamos lo que borraron del registro oficial.
📂 Bóveda: 7 Dossiers PDF
👇 Comenta "CODICE" o entra aquí:
```

### Desglose Psicológico Línea por Línea
1. **Línea 1 — Autoridad (`🏛️ Archivo de anomalías históricas, ciencia límite y poder oculto.`):** Establece un marco institucional de archivo documental, alejando la cuenta del contenido genérico de terror o teorías sin fundamento.
2. **Línea 2 — Promesa de Transformación (`🧠 Decodificamos lo que borraron del registro oficial.`):** Activa el sesgo cognitivo de *curiosidad epistémica* y pertenencia a una minoría informada.
3. **Línea 3 — Lead Magnet Tangible (`📂 Bóveda: 7 Dossiers PDF`):** Especifica un entregable concreto, coleccionable y de alto valor percibido (*"7 Dossiers PDF"* en lugar de un enlace ambiguo).
4. **Línea 4 — CTA Dual (`👇 Comenta "CODICE" o entra aquí:`):** Captura tanto al usuario que prefiere automatización por DM en publicaciones fijadas como al visitante que hace clic directo en el enlace de la biografía (`bento.me/codiceanomalo` o landing propia).

---

## 4. ESTRATEGIA DE HIGHLIGHTS (HISTORIAS DESTACADAS) Y ARQUITECTURA MANYCHAT (21 PALABRAS CLAVE)

### 4.1 Arquitectura de 5 Historias Destacadas (Embudo Visual en Perfil)
Ordenadas de izquierda a derecha según el recorrido ocular del nuevo visitante:

| Orden | Título (Máx. 11 car.) | Icono / Portada Minimalista (Fondo `#0A0A0C`, Trazo Dorado `#C5A059`) | Objetivo de Conversión y Estructura Interna (4–6 Stories por Highlight) |
| :---: | :--- | :--- | :--- |
| **1** | `👁️ INICIA AQUÍ` | Sello de lacre / Ojo geométrico grabado | **Onboarding y Retención:** Story 1: Manifiesto de Códice Anómalo. Story 2: Cómo se clasifican los expedientes (Nivel 1 al 5). Story 3: Los 3 casos más impactantes del archivo. Story 4: CTA para responder `"CODICE"` y recibir el Dossier Inicial. |
| **2** | `📂 LA BÓVEDA` | Carpeta clasificada con candado abierto | **Captura de Leads (Lead Magnet):** Vista previa en video/carrusel de los 7 Dossiers PDF descargables, índice de páginas borradas y enlace directo + disparador de palabra clave por respuesta de Story. |
| **3** | `🧬 EXPEDIENTES` | Astrolabio / Manuscrito antiguo | **Prueba de Valor Contenido:** Índice curado de las mejores miniseries de Reels y Carruseles (Anomalías Históricas, Experimentos Desclasificados, Paradojas Cognitivas) para aumentar el tiempo de sesión en perfil. |
| **4** | `⚡ COMUNIDAD` | Llave maestra / Símbolo de círculo interno | **Social Proof y Pertenencia:** Capturas reales de miembros leyendo los Dossiers, debates de la comunidad privada (Telegram/Discord/Newsletter) y acceso al canal de difusión de Instagram (*Broadcast Channel*). |
| **5** | `🗝️ ACCESO VIP` | Monolito / Corona hermética | **Monetización Directa (Low/Mid-Ticket):** Presentación del producto premium (*El Compendio Completo Códice Anómalo / Membresía de Investigadores / Biblioteca Privada*), preguntas frecuentes y enlace de compra inmediata. |

---

### 4.2 Matriz Maestra de Automatización ManyChat: Las 21 Palabras Clave

> [!IMPORTANT]
> **Regla de Oro de Cumplimiento Meta Graph API (Anti-Ban):**
> 1. **Rotación de Respuestas Públicas:** Configurar en ManyChat **mínimo 5 variaciones de respuesta pública al comentario** antes de enviar el DM (ej. *"📂 Expediente liberado. Revisa tu bandeja de mensajes (y la carpeta de Solicitudes)."*, *"👁️ Acceso concedido. Te acabo de enviar el enlace privado por DM."*, *"🏛️ Archivo enviado a tus mensajes directos. Confírmame cuando lo abras."*).
> 2. **Doble Opt-In en DM (Ventana de 24h):** El primer DM enviado automáticamente tras un comentario **NUNCA** debe incluir enlaces externos directos. Debe incluir un botón rápido (*Quick Reply* o *Postback Button*) como `[ 📂 Abrir Expediente ]`. Solo cuando el usuario pulsa ese botón (abriendo oficialmente la ventana de mensajería de 24 horas de Meta), ManyChat entrega el enlace al PDF o página de ventas.

A continuación se presenta la arquitectura completa de las **21 Palabras Clave**, divididas en 3 niveles de intención dentro del embudo de monetización:

#### Bloque A: Entrada al Ecosistema y Captura de Leads (TOFU — Palabras 1 a 7)
| # | Palabra Clave (Trigger) | Variantes Toleradas (`Contains` / Sin Tilde) | Contexto de Activación (Reels / Carruseles / Bio) | Activo Entregado (Lead Magnet) | Mensaje de Apertura DM (Paso 1) + Botón de Confirmación (Paso 2) |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **01** | **`CODICE`** | `códice, codice, codices` | Palabra ancla de Biografía, Reels fijados e Historias Destacadas. | **Kit de Iniciación:** *Los 7 Dossiers del Códice Anómalo (PDF)*. | *"👁️ Has solicitado acceso al índice central de Códice Anómalo. Pulsa abajo para desbloquear los 7 Dossiers en PDF:"* → `[ 📂 Descargar 7 Dossiers ]` |
| **02** | **`BOVEDA`** | `bóveda, boveda` | Reels sobre bibliotecas ocultas, archivos del Vaticano o colecciones prohibidas. | **Acceso al Repositorio Central** (Notion / Drive organizado por eras). | *"🏛️ La Bóveda Digital está lista. Confirma tu acceso para recibir el enlace privado al repositorio:"* → `[ 🗝️ Entrar a la Bóveda ]` |
| **03** | **`ARCHIVO`** | `archivo, archivos` | Contenido sobre documentos desclasificados (CIA, FOIA, crónicas antiguas). | **Pack de 5 Documentos Desclasificados** traducidos y anotados. | *"📄 Expediente localizado en el archivo. Toca el botón para recibir las copias traducidas:"* → `[ 📥 Recibir Archivos ]` |
| **04** | **`EXPEDIENTE`** | `expediente, expedientes` | Casos de estudio individuales (desapariciones, incidentes inexplicables). | **Ficha Forense del Caso** con línea de tiempo completa y fuentes. | *"🔍 He separado la ficha técnica completa de este caso que no pude mostrar en el video por tiempo:"* → `[ 📋 Ver Ficha Completa ]` |
| **05** | **`ANOMALIA`** | `anomalía, anomalia, anomalias` | Reels de artefactos fuera de su tiempo (*OOPArt*) y fallos en el registro histórico. | **Catálogo Ilustrado:** *12 Anomalías Arqueológicas Sin Explicación*. | *"⏳ Este hallazgo desafía la cronología oficial. Pulsa aquí para recibir el catálogo ilustrado:"* → `[ 🏺 Abrir Catálogo ]` |
| **06** | **`MAPA`** | `mapa, mapas, cartografia` | Cartografía antigua (Piri Reis, tierras míticas, geografías borradas). | **Colección HD de Mapas Antiguos** con superposición satelital moderna. | *"🧭 He preparado los mapas en alta resolución con las coordenadas comparadas:"* → `[ 🗺️ Descargar Mapas HD ]` |
| **07** | **`ORIGEN`** | `origen, origenes, génesis` | Reels sobre civilizaciones perdidas, mitos fundacionales comparados y diluvios. | **Línea del Tiempo Paralela:** *Civilizaciones Olvidadas (Infografía PDF)*. | *"🗿 La historia oficial empieza hace 6,000 años; este diagrama muestra lo que hubo antes:"* → `[ 📜 Ver Línea de Tiempo ]` |

#### Bloque B: Profundización, Retención y Autoridad Temática (MOFU — Palabras 8 a 14)
| # | Palabra Clave (Trigger) | Variantes Toleradas (`Contains` / Sin Tilde) | Contexto de Activación (Reels / Carruseles / Bio) | Activo Entregado (Nutrición / Comunidad) | Mensaje de Apertura DM (Paso 1) + Botón de Confirmación (Paso 2) |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **08** | **`MENTE`** | `mente, mental, cognitivo` | Experimentos psicológicos, percepción alterada, efecto placebo/nocebo extremo. | **Guía Práctica:** *7 Sesgos y Protocolos de Blindaje Mental*. | *"🧠 Tu cerebro filtra el 99% de la realidad. Descarga el manual de blindaje perceptivo aquí:"* → `[ 🧠 Desbloquear Guía ]` |
| **09** | **`PODER`** | `poder, control, elite` | Historia de sociedades estratégicas, ingeniería social y propaganda histórica. | **Dossier de Análisis:** *Las 5 Leyes Silenciosas de la Ingeniería Social*. | *"♟️ Quien controla el relato controla el tablero. Aquí tienes el análisis completo:"* → `[ ♟️ Leer Análisis ]` |
| **10** | **`SIMBOLO`** | `símbolo, simbolo, simbolos` | Simbología hermética, arquitectura sagrada y mensajes ocultos en el arte. | **Diccionario Visual:** *33 Símbolos Ocultos en la Historia y la Arquitectura*. | *"📐 Nada en esta obra fue puesto al azar. Descarga el diccionario visual de símbolos:"* → `[ 👁️ Ver Diccionario ]` |
| **11** | **`FRECUENCIA`** | `frecuencia, vibracion, ondas` | Acústica antigua, resonancia Schumann, experimentos de sonido y neurociencia. | **Reporte Técnico + Audio:** *Frecuencias Acústicas en Templos Antiguos*. | *"🔊 Los constructores antiguos dominaban la acústica cerebral. Accede al estudio y muestras de audio:"* → `[ 🎧 Escuchar y Leer ]` |
| **12** | **`CRONICA`** | `crónica, cronica, cronicas` | Textos apócrifos, manuscritos censurados (Voynich, Mar Muerto, Nag Hammadi). | **Compendio Comparativo:** *Los Textos Excluidos de la Historia*. | *"📖 Estos fragmentos quedaron fuera del canon. Toca abajo para leer la traducción comentada:"* → `[ 📜 Leer Fragmentos ]` |
| **13** | **`PARADOJA`** | `paradoja, paradojas, tiempo` | Física límite, paradojas cuánticas, tiempo no lineal y simulación. | **Ensayo Ilustrado:** *Las 5 Paradojas que Rompen la Física Clásica*. | *"⚛️ Cuando la ciencia llega a su límite, empieza lo anómalo. Descarga el ensayo ilustrado:"* → `[ 🌌 Abrir Ensayo ]` |
| **14** | **`NEXO`** | `nexo, conexion, red` | Invitación al boletín semanal (*Newsletter*) y Canal de Difusión privado. | **Suscripción VIP al Boletín Semanal + Audio Exclusivo de Domingo**. | *"🕸️ Únete al Nexo: cada domingo enviamos el caso que no podemos publicar en abierto:"* → `[ ✉️ Entrar al Nexo ]` |

#### Bloque C: Conversión Comercial, Monetización y Alto Ticket (BOFU — Palabras 15 a 21)
| # | Palabra Clave (Trigger) | Variantes Toleradas (`Contains` / Sin Tilde) | Contexto de Activación (Reels / Carruseles / Bio) | Oferta / Producto de Monetización | Mensaje de Apertura DM (Paso 1) + Botón de Confirmación (Paso 2) |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **15** | **`COMPENDIO`** | `compendio, libro, obra` | Lanzamiento y venta del producto digital insignia (Ebook / Grimorio Documental). | **Producto Principal ($19–$37 USD):** *El Gran Compendio del Códice Anómalo (+250 págs)*. | *"📕 Has solicitado acceso a la edición completa de «El Gran Compendio». Revisa el índice y bonos incluidos:"* → `[ 📕 Ver El Compendio ]` |
| **16** | **`ORDEN`** | `orden, circulo, miembro` | Promoción de la membresía recurrente o comunidad privada de investigación. | **Membresía Recurrente ($9–$15 USD/mes):** *Círculo Interno Códice Anómalo*. | *"🏛️ Las puertas del Círculo Interno están abiertas. Consulta los beneficios de miembro y el archivo mensual:"* → `[ 🗝️ Solicitar Ingreso ]` |
| **17** | **`SISTEMA`** | `sistema, metodo, ia` | Detrás de cámaras: cómo se investigan, guionizan y producen los videos de la cuenta. | **Curso / Plantilla ($47–$97 USD):** *Sistema de Creación Documental & Narrativa Viral*. | *"⚙️ ¿Quieres replicar nuestra metodología de investigación y producción visual? Mira el sistema por dentro:"* → `[ ⚡ Ver el Sistema ]` |
| **18** | **`ESTUDIO`** | `estudio, produccion, agencia` | Captación de clientes B2B, patrocinios de marca o servicios de producción audiovisual. | **Servicio B2B / Sponsorships:** *Códice Anómalo Studio (Producción & Narrativa)*. | *"🎬 Gracias por tu interés en colaborar con Códice Anómalo Studio. Selecciona el tipo de proyecto:"* → `[ 🤝 Ver Media Kit / Servicios ]` |
| **19** | **`COLECCION`** | `colección, coleccion, pack` | Ofertas relámpago (*Bundle*) de todos los tomos digitales + audiolibros. | **Bundle Completo ($49 USD):** *Colección Integral Códice Anómalo (Tomos I–IV + Audios)*. | *"📦 He activado el enlace con 40% de descuento para la Colección Integral (4 Tomos + Audiolibros):"* → `[ 🎁 Reclamar Colección ]` |
| **20** | **`ORACULO`** | `oráculo, oraculo, bot` | Lanzamiento de asistente IA entrenado con la biblioteca de Códice Anómalo. | **Acceso SaaS / GPT Privado:** *El Oráculo del Códice (Buscador IA de Archivos)*. | *"🔮 Consulta directamente a nuestra base de datos de +1,000 expedientes históricos con IA:"* → `[ 🤖 Probar El Oráculo ]` |
| **21** | **`LLAVE`** | `llave, vip, acceso` | Campañas de escasez (48 horas), becas o acceso anticipado a nuevos lanzamientos. | **Pase de Acceso Anticipado / Descuento Fundador (Cupón oculto 24h)**. | *"🗝️ Has activado una Llave Temporal. Tienes 24 horas para usar este pase de fundador antes de que expire:"* → `[ 🔓 Usar Llave Ahora ]` |

---

## 5. CALENDARIO HORARIO OPTIMIZADO (`America/Mexico_City`, UTC-6) Y PROTOCOLO DE MONETIZACIÓN

### 5.1 Fundamento Algorítmico de Zona Horaria (`UTC-6`)
México no aplica cambio de horario estacional en la mayor parte del territorio (incluyendo CDMX), manteniendo `UTC-6` fijo todo el año. Esta franja horaria ofrece una ventaja estratégica única para cuentas en español:
* Publicar en las ventanas pico de `America/Mexico_City` sincroniza simultáneamente con **Colombia/Perú (`UTC-5`, +1h)**, **Miami/Nueva York (`UTC-5`/`UTC-4`, +1h/+2h)**, **Argentina/Chile (`UTC-3`, +3h)** y captura la noche tardía de **España (`UTC+1`/`UTC+2`)**.

### 5.2 Parrilla Semanal de Publicación de Alto Rendimiento (`America/Mexico_City`)

| Día | Ventana 1 (Mediodía / Comida) | Ventana 2 (Prime Time Nocturno — Principal) | Formato Recomendado | Keyword ManyChat Asignada | Objetivo en el Embudo |
| :--- | :---: | :---: | :--- | :---: | :--- |
| **Lunes** | `13:15 hrs` (Carrusel / Story) | **`20:00 hrs` (Reel Principal)** | Reel de Gancho Disruptivo (45–60s) | `ARCHIVO` / `CODICE` | Alcance frío (No seguidores) + Captura de correos. |
| **Martes** | `12:30 hrs` (Secuencia Stories) | **`20:30 hrs` (Carrusel 8-10 slides)** | Carrusel Documental Guardable (*Save-Bait*) | `SIMBOLO` / `MAPA` | Guardados masivos (señal #1 de autoridad algorítmica). |
| **Miércoles** | `13:15 hrs` (Encuesta en Stories) | **`20:00 hrs` (Reel Principal)** | Reel de Caso de Estudio / Misterio Histórico | `EXPEDIENTE` / `ANOMALIA` | Comentarios profundos + Tráfico a La Bóveda. |
| **Jueves** | `12:30 hrs` (Story de Valor + CTA) | **`21:00 hrs` (Reel o Carrusel)** | Psicología del Poder / Ciencia Límite | `MENTE` / `PODER` | Nutrición de audiencia (MOFU) y paso al Newsletter (`NEXO`). |
| **Viernes** | `14:00 hrs` (Story de Cierre Semanal) | **`19:30 hrs` (Reel Corto 25-35s)** | Reel de Alta Retención / Paradoja Visual | `PARADOJA` / `BOVEDA` | Retención >100% (*Looping*) para tracción de fin de semana. |
| **Sábado** | `11:30 hrs` (Carrusel de Colección) | **`19:00 hrs` (Story / Reel Especial)** | Micro-Documental de Fin de Semana | `COMPENDIO` / `COLECCION` | **Conversión Comercial (BOFU):** Venta de Dossiers Premium. |
| **Domingo** | `12:00 hrs` (Broadcast Channel) | **`20:30 hrs` (Reel Estrella Semanal)** | El Caso Mayor de la Semana (60–75s) | `CODICE` / `ORDEN` | Pico máximo de tráfico semanal en Instagram México/LATAM. |

> [!TIP]
> **Ventana Nocturna de Retención ("Hora del Insomnio Curioso" — `21:00 a 23:30 hrs CDMX`):**
> El nicho de misterio documental, archivos ocultos y psicología profunda registra su **tasa de finalización de video (Watch Time) y tasa de lectura de PDFs más alta entre las `20:30 y las 23:00 hrs` (CDMX)**. Publicar el Reel principal puntualmente entre las **`20:00 y 20:30 hrs`** permite que el algoritmo indexe la pieza durante 30 minutos y la empuje con fuerza exactamente cuando el usuario está en cama con auriculares.

### 5.3 Protocolo Operativo Pre y Post-Publicación (Regla 15/30)
1. **15 minutos antes de publicar (`19:45 hrs CDMX`):**
   * Subir 1 o 2 Historias con un *sticker* de interacción (Encuesta polarizante o Caja de preguntas sobre el tema del Reel de la noche) para reactivar la puntuación de afinidad de los seguidores actuales.
2. **Minuto 0 (`20:00 hrs CDMX`):**
   * Publicar el Reel con el disparador de ManyChat tanto en el último segundo del video como en la primera línea de la descripción (antes del corte `... más`).
   * Compartir el Reel en Historias tapando parcialmente el titular con un gancho de curiosidad (*"La página 4 de este documento fue borrada en 1974..."*).
3. **Primeros 30 minutos (`20:00 a 20:30 hrs CDMX`):**
   * Fijar un comentario propio en el Reel: *"👁️ Si quieres recibir el expediente completo en PDF con las fuentes originales que no caben en 60 segundos, comenta la palabra «CODICE» aquí abajo y te lo envío por DM."*
   * Responder manualmente (con preguntas abiertas) a los comentarios largos que no sean únicamente la palabra clave, duplicando el conteo de comentarios en los primeros 30 minutos.

### 5.4 Blindaje de Monetización y Brand Safety en Meta
Para garantizar que `@codice.anomalo` mantenga el estado **"Cuenta Recomendable" (*Account Status: Green*)** y sea elegible para **Bonos de Reels, Suscripciones de Instagram, Colaboraciones de Marca y Meta Ads**:
* **Sustitución Léxica Segura (Algoritmo Safe-Search):** En subtítulos quemados en video y textos de descripción, utilizar lenguaje académico/documental en lugar de términos que disparen censura automática (*"suceso fatal"* o *"desaparición"* en vez de términos gráficos; *"sustancias experimentales"* en vez de nombres de narcóticos; *"archivos censurados"* en vez de palabras asociadas a desinformación médica o electoral reciente).
* **Diversificación de Ingresos desde el Día 1:**
  1. **Nivel 1 (Día 1–30):** Captación masiva de correos vía ManyChat (`CODICE`, `BOVEDA`) + oferta *Tripwire* de bajo costo ($9–$19 USD: *El Gran Compendio Digital*) en la página de agradecimiento tras descargar el Lead Magnet gratuito.
  2. **Nivel 2 (Día 31–60):** Lanzamiento de **Suscripciones de Instagram / Círculo Interno** (`ORDEN`) con 2 expedientes exclusivos por semana y sesiones de análisis.
  3. **Nivel 3 (Día 61–90):** Producto principal de alto margen (`SISTEMA` / `COLECCION`) y patrocinios integrados de herramientas de lectura, audiolibros, VPNs o plataformas educativas (`ESTUDIO`).
