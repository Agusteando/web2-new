import type { RowDataPacket } from 'mysql2/promise'
import { getDbPool } from './db'

export type SummerReviewProgram = 'curso' | 'clinica'

export interface SummerTeacherReview {
  id: number
  submissionKey: string
  cycleYear: number
  studentName: string
  program: SummerReviewProgram
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}

export interface SummerReviewStats {
  total: number
  average: number
  distribution: Record<1 | 2 | 3 | 4 | 5, number>
}

export interface SaveSummerReviewInput {
  submissionKey: string
  cycleYear: number
  studentName: string
  program: SummerReviewProgram
  rating: number
  comment: string
}

const normalizeDate = (value: unknown) => {
  if (value instanceof Date) return value.toISOString()
  const parsed = new Date(String(value ?? ''))
  return Number.isNaN(parsed.getTime()) ? String(value ?? '') : parsed.toISOString()
}

export async function saveSummerReview(input: SaveSummerReviewInput): Promise<void> {
  const pool = getDbPool()

  await pool.execute(
    `
      INSERT INTO summer_teacher_reviews (
        submission_key,
        cycle_year,
        student_name,
        program,
        rating,
        comment
      )
      VALUES (?, ?, ?, ?, ?, NULLIF(?, ''))
      ON DUPLICATE KEY UPDATE
        student_name = VALUES(student_name),
        program = VALUES(program),
        rating = VALUES(rating),
        comment = VALUES(comment),
        updated_at = CURRENT_TIMESTAMP
    `,
    [
      input.submissionKey,
      input.cycleYear,
      input.studentName,
      input.program,
      input.rating,
      input.comment,
    ],
  )
}

export async function getSummerReviewStats(cycleYear: number): Promise<SummerReviewStats> {
  const pool = getDbPool()
  const [rows] = await pool.query<RowDataPacket[]>(
    `
      SELECT
        COUNT(*) AS total,
        COALESCE(AVG(rating), 0) AS average_rating,
        COALESCE(SUM(rating = 1), 0) AS rating_1,
        COALESCE(SUM(rating = 2), 0) AS rating_2,
        COALESCE(SUM(rating = 3), 0) AS rating_3,
        COALESCE(SUM(rating = 4), 0) AS rating_4,
        COALESCE(SUM(rating = 5), 0) AS rating_5
      FROM summer_teacher_reviews
      WHERE cycle_year = ?
    `,
    [cycleYear],
  )

  const row = rows[0] || {}

  return {
    total: Number(row.total || 0),
    average: Math.round(Number(row.average_rating || 0) * 100) / 100,
    distribution: {
      1: Number(row.rating_1 || 0),
      2: Number(row.rating_2 || 0),
      3: Number(row.rating_3 || 0),
      4: Number(row.rating_4 || 0),
      5: Number(row.rating_5 || 0),
    },
  }
}

export async function listSummerReviews(
  cycleYear: number,
  options: { program?: SummerReviewProgram; limit?: number } = {},
): Promise<SummerTeacherReview[]> {
  const pool = getDbPool()
  const limit = Math.min(Math.max(Number(options.limit || 2000), 1), 50_000)
  const where = ['cycle_year = ?']
  const values: Array<string | number> = [cycleYear]

  if (options.program) {
    where.push('program = ?')
    values.push(options.program)
  }

  const [rows] = await pool.query<RowDataPacket[]>(
    `
      SELECT
        id,
        submission_key,
        cycle_year,
        student_name,
        program,
        rating,
        COALESCE(comment, '') AS comment,
        created_at,
        updated_at
      FROM summer_teacher_reviews
      WHERE ${where.join(' AND ')}
      ORDER BY created_at DESC, id DESC
      LIMIT ${limit}
    `,
    values,
  )

  return rows.map((row) => ({
    id: Number(row.id),
    submissionKey: String(row.submission_key || ''),
    cycleYear: Number(row.cycle_year),
    studentName: String(row.student_name || ''),
    program: row.program === 'clinica' ? 'clinica' : 'curso',
    rating: Number(row.rating),
    comment: String(row.comment || ''),
    createdAt: normalizeDate(row.created_at),
    updatedAt: normalizeDate(row.updated_at),
  }))
}
