import { getQuery, getRequestHeader } from 'h3';
import { fetchNoticias } from "~/server/utils/news";
import { closeDbPool } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const limit = q.limit ? Number(q.limit) : undefined;

  const isPrerender = Boolean(getRequestHeader(event, 'x-nitro-prerender'));
  let rows;
  try {
    if (isPrerender && process.env.NUXT_SKIP_PRERENDER_DB === 'true') {
      rows = [];
    } else {
      rows = await fetchNoticias(Number.isFinite(limit) ? limit : undefined);
    }
  } catch (error) {
    if (isPrerender) {
      console.warn('[Noticias] DB unavailable during prerender; rendering without latest news cards.');
      rows = [];
    } else {
      throw error;
    }
  } finally {
    if (isPrerender) {
      await closeDbPool();
    }
  }

  const cfg = useRuntimeConfig();
  const siteUrl = String(cfg.public.siteUrl || "").replace(/\/+$/, "");

  return rows.map((r) => ({
    ...r,
    fb: `${siteUrl}/noticias/${r.id}`
  }));
});
