import { getSummerStudentDirectory, normalizeSummerSearch } from '~/server/utils/summerStudents'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'private, no-store')

  const query = getQuery(event)
  const term = String(query.q ?? '').trim().slice(0, 80)
  const program = query.tipo === 'clinica' ? 'clinica' : 'curso'
  const normalizedTerm = normalizeSummerSearch(term)

  if (normalizedTerm.length < 2) {
    return { students: [] }
  }

  try {
    const directory = await getSummerStudentDirectory()
    const matches = directory
      .filter((student) => student.program === program)
      .map((student) => ({
        name: student.name,
        normalizedName: normalizeSummerSearch(student.name),
      }))
      .filter((student) => student.normalizedName.includes(normalizedTerm))
      .sort((left, right) => {
        const leftStarts = left.normalizedName.startsWith(normalizedTerm) ? 0 : 1
        const rightStarts = right.normalizedName.startsWith(normalizedTerm) ? 0 : 1

        return leftStarts - rightStarts || left.name.localeCompare(right.name, 'es', { sensitivity: 'base' })
      })
      .slice(0, 8)
      .map((student) => student.name)

    return { students: matches }
  } catch (error) {
    console.error('[curso-verano] No se pudo consultar el directorio de alumnos.', error)
    return { students: [] }
  }
})
