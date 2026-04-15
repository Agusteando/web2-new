import type { RowDataPacket } from "mysql2/promise";
import { getDbPool } from "./db";

export type NoticiaRow = {
  id: number;
  fecha: string;
  titulo: string;
  contenido: string;
  imagen: string | null;
};

// Optimización: Reduce drásticamente las conexiones concurrentes a DB al cachear a nivel de Nitro
export const fetchNoticias = defineCachedFunction(async (limit?: number): Promise<NoticiaRow[]> => {
  const pool = getDbPool();
  const lim = typeof limit === "number" ? Math.max(1, Math.min(50, limit)) : undefined;

  const sql = `
    SELECT id, fecha, titulo, contenido, imagen
    FROM noticias
    ORDER BY fecha DESC
    ${lim ? "LIMIT ?" : ""}
  `;

  const [rows] = await pool.query<RowDataPacket[]>(sql, lim ? [lim] : []);
  return rows as unknown as NoticiaRow[];
}, {
  maxAge: 300, // 5 minutos de caché en Nitro
  name: 'noticias-list-cache',
  getKey: (limit?: number) => String(limit ?? 'all')
});

// Cacheo también del detalle individual de la noticia para acompañar la estrategia general de mitigación
export const fetchNoticiaById = defineCachedFunction(async (id: number): Promise<NoticiaRow | null> => {
  const pool = getDbPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    `
      SELECT id, fecha, titulo, contenido, imagen
      FROM noticias
      WHERE id = ?
      LIMIT 1
    `,
    [id]
  );
  const r = (rows as unknown as NoticiaRow[])[0];
  return r ?? null;
}, {
  maxAge: 300,
  name: 'noticia-by-id-cache',
  getKey: (id: number) => String(id)
});