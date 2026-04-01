import type { RowDataPacket } from 'mysql2/promise';
import { getDbPool } from './db';

export interface RouteOverride {
  type: 'proxy' | 'redirect' | 'default';
  target: string;
  statusCode: number;
}

export type SitemapOverrides = Record<string, RouteOverride>;

// Garantiza que la tabla de control exista sin requerir migraciones manuales
async function ensureTable() {
  const pool = getDbPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS route_overrides (
      path VARCHAR(255) PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      target TEXT NOT NULL,
      status_code INT NOT NULL DEFAULT 302,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

export async function getSitemapOverrides(): Promise<SitemapOverrides> {
  await ensureTable();
  const pool = getDbPool();
  const [rows] = await pool.query<RowDataPacket[]>('SELECT path, type, target, status_code FROM route_overrides');
  
  const result: SitemapOverrides = {};
  for (const row of rows) {
    result[row.path] = {
      type: row.type as any,
      target: row.target,
      statusCode: row.status_code
    };
  }
  return result;
}

export async function saveSitemapOverride(path: string, override: RouteOverride): Promise<void> {
  await ensureTable();
  const pool = getDbPool();
  
  if (override.type === 'default') {
    await pool.query('DELETE FROM route_overrides WHERE path = ?', [path]);
  } else {
    await pool.query(`
      INSERT INTO route_overrides (path, type, target, status_code)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE type = VALUES(type), target = VALUES(target), status_code = VALUES(status_code)
    `, [path, override.type, override.target, override.statusCode || 302]);
  }
}