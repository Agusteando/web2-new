interface SummerApiStudent {
  name?: unknown
  modality?: unknown
}

interface SummerApiSnapshot {
  ok?: boolean
  students?: SummerApiStudent[]
}

export interface SummerDirectoryStudent {
  name: string
  program: 'curso' | 'clinica'
}

const CACHE_TTL_MS = 55_000
let cache: { expiresAt: number; students: SummerDirectoryStudent[] } | null = null
let pending: Promise<SummerDirectoryStudent[]> | null = null

const cleanText = (value: unknown) => String(value ?? '').replace(/\s+/g, ' ').trim()

const normalizeText = (value: unknown) => {
  return cleanText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const resolveProgram = (modality: unknown): SummerDirectoryStudent['program'] | null => {
  const normalized = normalizeText(modality)

  if (normalized === 'clinica de futbol' || normalized.includes('clinica de futbol')) {
    return 'clinica'
  }

  if (normalized === 'husky dreamers' || normalized.includes('husky dreamers') || normalized.includes('curso de verano')) {
    return 'curso'
  }

  return null
}

const fetchDirectory = async () => {
  const config = useRuntimeConfig()
  const url = cleanText(config.summerApiUrl)
  const key = cleanText(config.summerApiKey)

  if (!url || !key) {
    return []
  }

  const snapshot = await $fetch<SummerApiSnapshot>(url, {
    method: 'GET',
    query: {
      action: 'snapshot',
      key,
    },
    timeout: 12_000,
    retry: 1,
  })

  if (!snapshot?.ok || !Array.isArray(snapshot.students)) {
    return []
  }

  const unique = new Map<string, SummerDirectoryStudent>()

  for (const student of snapshot.students) {
    const name = cleanText(student?.name)
    const program = resolveProgram(student?.modality)

    if (!name || !program) continue

    const uniqueKey = `${program}:${normalizeText(name)}`
    if (!unique.has(uniqueKey)) {
      unique.set(uniqueKey, { name, program })
    }
  }

  return Array.from(unique.values())
}

export const getSummerStudentDirectory = async () => {
  const now = Date.now()

  if (cache && cache.expiresAt > now) {
    return cache.students
  }

  if (!pending) {
    pending = fetchDirectory()
      .then((students) => {
        cache = {
          expiresAt: Date.now() + CACHE_TTL_MS,
          students,
        }
        return students
      })
      .finally(() => {
        pending = null
      })
  }

  return pending
}

export const normalizeSummerSearch = normalizeText
