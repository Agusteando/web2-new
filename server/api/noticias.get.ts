import { getQuery, getRequestHeader } from 'h3';
import { fetchNoticias } from "~/server/utils/news";

export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const limit = q.limit ? Number(q.limit) : undefined;
  const isPrerender = Boolean(getRequestHeader(event, 'x-nitro-prerender'));

  // La portada se genera sin abrir MySQL. El navegador refresca estos datos al montar la app.
  if (isPrerender) {
    return [];
  }

  const rows = await fetchNoticias(Number.isFinite(limit) ? limit : undefined);
  const cfg = useRuntimeConfig();
  const siteUrl = String(cfg.public.siteUrl || "").replace(/\/+$/, "");

  return rows.map((r) => ({
    ...r,
    fb: `${siteUrl}/noticias/${r.id}`
  }));
});
