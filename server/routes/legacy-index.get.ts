import { load } from "cheerio";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { defineEventHandler, getQuery, getRequestURL, setHeader } from "h3";
import { fetchNoticias } from "~/server/utils/news";
import { escapeHtml, formatFechaEsMX } from "~/server/utils/format";

function resolveDbImageSrc(raw: unknown): string | null {
  if (raw == null) return null;

  // mysql2 can sometimes return Buffer depending on config; handle safely.
  const s =
    typeof raw === "string"
      ? raw.trim()
      : Buffer.isBuffer(raw)
        ? raw.toString("utf8").trim()
        : String(raw).trim();

  if (!s) return null;

  // If DB already stores absolute URL, use it exactly.
  if (/^https?:\/\//i.test(s)) return s;

  // If DB stores "/virtual/blob..." or "virtual/blob..." or just "blob..."
  const cleaned = s.replace(/^\/+/, "");
  if (/^virtual\//i.test(cleaned)) return `/${cleaned}`;
  if (/^blob/i.test(cleaned)) return `/virtual/${cleaned}`;

  // Otherwise treat as-is (assets/, etc.)
  return s.startsWith("/") ? s : s;
}

function renderPostCol(opts: {
  fechaText: string;
  titulo: string;
  href: string;
  imgSrc: string;
  fallbackImgSrc: string;
  hasDbImage: boolean;
  fadeFrom: "left" | "bottom" | "right";
}): string {
  const dateSvg = `
    <svg class="mr-5" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12.0683C0.000926244 12.8416 0.308512 13.5829 0.855289 14.1297C1.40207 14.6765 2.14339 14.984 2.91665 14.985H11.0833C11.8565 14.984 12.5978 14.6765 13.1446 14.1297C13.6914 13.5829 13.999 12.8416 13.9999 12.0683V6.81836H0V12.0683Z" fill="currentColor" />
      <path d="M11.0833 2.15201H10.4999V1.56868C10.4999 1.41397 10.4385 1.2656 10.3291 1.1562C10.2197 1.04681 10.0713 0.985352 9.9166 0.985352C9.76189 0.985352 9.61352 1.04681 9.50412 1.1562C9.39473 1.2656 9.33327 1.41397 9.33327 1.56868V2.15201H4.66663V1.56868C4.66663 1.41397 4.60518 1.2656 4.49578 1.1562C4.38639 1.04681 4.23801 0.985352 4.0833 0.985352C3.9286 0.985352 3.78022 1.04681 3.67083 1.1562C3.56143 1.2656 3.49998 1.41397 3.49998 1.56868V2.15201H2.91665C2.14339 2.15294 1.40207 2.46052 0.855289 3.0073C0.308512 3.55408 0.000926244 4.2954 0 5.06866L0 5.65199H13.9999V5.06866C13.999 4.2954 13.6914 3.55408 13.1446 3.0073C12.5978 2.46052 11.8565 2.15294 11.0833 2.15201Z" fill="currentColor" />
    </svg>
  `;

  const safeTitle = escapeHtml(opts.titulo);
  const safeDate = escapeHtml(opts.fechaText);

  // IMPORTANT:
  // If the DB has an image, do NOT auto-fallback to placeholders (per your request).
  const onErr = opts.hasDbImage
    ? `this.onerror=null;console.warn('[NEWS IMG FAIL]', this.src);`
    : `this.onerror=null;this.src='${opts.fallbackImgSrc}';`;

  return `
    <div class="col-xl-4 col-lg-6 col-md-6 tp_fade_anim" data-delay=".4" data-fade-from="${opts.fadeFrom}" data-ease="bounce">
      <div class="tp-blog-ai-item tp-blog-md-item tp--hover-item tp-round-24 mb-30">
        <a href="${opts.href}" class="tp-round-24 w-100 fix p-relative d-inline-block">
          <div class="tp-blog-ai-thumb w-100 tp--hover-img tp-round-24" data-displacement="assets/img/imghover/stripe-mul.png" data-intensity="0.2" data-speedin="1" data-speedout="1">
            <img
              class="tp-round-24 w-100"
              src="${opts.imgSrc}"
              alt=""
              loading="lazy"
              decoding="async"
              referrerpolicy="no-referrer-when-downgrade"
              onerror="${onErr}"
            >
          </div>
        </a>
        <div class="tp-blog-ai-content tp-blog-md-content text-center">
          <div class="tp-blog-md-dates">
            <span class="tp-ff-dm mb-5 fw-500 fs-16 tp-text-common-black-5 d-inline-block">
              ${dateSvg}
              ${safeDate}
            </span>
          </div>
          <h4 class="tp-blog-md-title tp-ff-familjen fs-42 lh-1 ls-m-4 tp-text-common-black-5 mb-25">
            <a href="${opts.href}" class="underline-white">${safeTitle}</a>
          </h4>
          <a href="${opts.href}" class="tp-left-right p-relative hover-text-black d-inline-block text-uppercase tp-text-common-black-5 lh-1 fs-16 fw-700 tp-ff-dm">
            <span class="td-text d-inline-block mr-5">Descubre más</span>
            <span class="tp-arrow-angle">
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  `;
}

export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const debug = String(q.debug || "") === "1";

  const tplPathDev = join(process.cwd(), "public", "legacy", "index.html");
  const tplPathProd = join(process.cwd(), ".output", "public", "legacy", "index.html");
  const tplPath = await (async () => {
    try {
      await readFile(tplPathDev, "utf-8");
      return tplPathDev;
    } catch {}
    return tplPathProd;
  })();

  const html = await readFile(tplPath, "utf-8");
  const noticias = await fetchNoticias(3);

  const $ = load(html, { decodeEntities: false });

  const blogArea = $(".tp-blog-area").first();

  // Find the row that contains the cards, regardless of how many rows exist above it.
  let postsRow = blogArea.find(".tp-blog-ai-item").first().closest(".row");
  if (!postsRow.length) {
    const container = blogArea.find(".container-fluid.container-1824").first();
    postsRow = container.children(".row").eq(1);
  }

  const fallbacks = [
    "assets/img/IECS-IEDIS IMAGES/ex-news-578x433.webp",
    "assets/img/IECS-IEDIS IMAGES/ex-news2-578x433.webp",
    "assets/img/IECS-IEDIS IMAGES/ex-news3-578x433.webp",
  ];
  const fades: Array<"left" | "bottom" | "right"> = ["left", "bottom", "right"];

  if (postsRow.length) {
    const items = (noticias || []).slice(0, 3).map((n, i) => {
      const fallbackImgSrc = fallbacks[i] || fallbacks[0];
      const dbImg = resolveDbImageSrc(n.imagen);

      // If DB has an image URL (like https://casitaiedis.edu.mx/virtual/blob...), USE IT.
      // Only use placeholder when DB is null/empty.
      const hasDbImage = Boolean(dbImg);
      const imgSrc = dbImg || fallbackImgSrc;

      const fechaText = formatFechaEsMX(n.fecha);
      const href = `/noticias/${n.id}`;

      return renderPostCol({
        fechaText,
        titulo: n.titulo,
        href,
        imgSrc,
        fallbackImgSrc,
        hasDbImage,
        fadeFrom: fades[i] || "bottom",
      });
    });

    if (items.length) postsRow.html(items.join(""));

    if (debug) {
      const origin = getRequestURL(event).origin;
      const dbg = {
        origin,
        noticiasCount: noticias?.length ?? 0,
        picked: (noticias || []).slice(0, 3).map((n, i) => ({
          id: n.id,
          imagen_raw: n.imagen,
          imagen_resolved: resolveDbImageSrc(n.imagen),
          placeholder: fallbacks[i] || fallbacks[0],
        })),
      };

      $("body").append(`
        <script>
          (function(){
            const dbg = ${JSON.stringify(dbg).replace(/</g, "\\u003c")};
            console.groupCollapsed("[NEWS DEBUG] resolve imagen");
            console.table(dbg.picked);
            console.groupEnd();
          })();
        </script>
      `);
    }
  } else if (debug) {
    $("body").append(
      `<script>console.warn("[NEWS DEBUG] postsRow not found: template structure changed.");</script>`
    );
  }

  setHeader(event, "Content-Type", "text/html; charset=utf-8");
  return $.html();
});
