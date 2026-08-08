import { defineEventHandler, setResponseHeader } from 'h3'
import { listSummerReviews } from '~/server/utils/summerReviews'
import { createSimpleXlsx } from '~/server/utils/simpleXlsx'

const CYCLE_YEAR = 2026

const programLabel = (program: 'curso' | 'clinica') => (
  program === 'clinica' ? 'Clínica de Fútbol' : 'Curso de Verano'
)

const formatMexicoDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  }).format(date)
}

export default defineEventHandler(async (event) => {
  const reviews = await listSummerReviews(CYCLE_YEAR, { limit: 50_000 })
  const workbook = createSimpleXlsx({
    name: `Evaluaciones ${CYCLE_YEAR}`,
    headers: ['Fecha', 'Programa', 'Alumno', 'Evaluación', 'Comentario'],
    rows: reviews.map((review) => [
      formatMexicoDate(review.createdAt),
      programLabel(review.program),
      review.studentName,
      review.rating,
      review.comment,
    ]),
    widths: [24, 24, 38, 14, 72],
  })

  setResponseHeader(event, 'Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  setResponseHeader(event, 'Content-Disposition', `attachment; filename="evaluaciones-curso-verano-${CYCLE_YEAR}.xlsx"`)
  setResponseHeader(event, 'Cache-Control', 'private, no-store')
  return workbook
})
