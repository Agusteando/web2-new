<template>
  <main class="reviews-dashboard">
    <div class="reviews-shell">
      <header class="reviews-header">
        <div>
          <span class="reviews-kicker">Curso de Verano 2026</span>
          <h1>Evaluaciones</h1>
        </div>

        <a class="excel-button" href="/api/curso-verano/evaluaciones-export.xlsx">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 2V13M10 13L5.8 8.8M10 13L14.2 8.8M3 16.5H17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Descargar Excel</span>
        </a>
      </header>

      <section v-if="data" class="reviews-summary">
        <article class="summary-card summary-average">
          <span class="summary-label">Promedio</span>
          <strong>{{ formattedAverage }}</strong>
          <div class="summary-stars" aria-hidden="true">
            <span v-for="star in 5" :key="star" :class="{ 'is-filled': star <= roundedAverage }">★</span>
          </div>
        </article>

        <article class="summary-card">
          <span class="summary-label">Evaluaciones</span>
          <strong>{{ data.stats.total.toLocaleString('es-MX') }}</strong>
        </article>

        <article class="summary-card summary-distribution">
          <div v-for="star in distributionRows" :key="star.rating" class="distribution-row">
            <span>{{ star.rating }} ★</span>
            <div class="distribution-track">
              <div class="distribution-fill" :style="{ width: `${star.percent}%` }"></div>
            </div>
            <strong>{{ star.count }}</strong>
          </div>
        </article>
      </section>

      <section class="reviews-panel">
        <div class="reviews-toolbar">
          <div class="program-filters">
            <button type="button" :class="{ active: programFilter === 'all' }" @click="programFilter = 'all'">Todas</button>
            <button type="button" :class="{ active: programFilter === 'curso' }" @click="programFilter = 'curso'">Curso de Verano</button>
            <button type="button" :class="{ active: programFilter === 'clinica' }" @click="programFilter = 'clinica'">Clínica de Fútbol</button>
          </div>

          <div class="reviews-search">
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="8.7" cy="8.7" r="5.8" stroke="currentColor" stroke-width="1.6" />
              <path d="M13.2 13.2L17.2 17.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
            <input v-model="searchTerm" type="search" aria-label="Buscar" placeholder="Buscar" />
          </div>
        </div>

        <div v-if="pending" class="reviews-state">
          <span class="dashboard-spinner" aria-hidden="true"></span>
        </div>

        <div v-else-if="error" class="reviews-state">No se pudieron cargar las evaluaciones.</div>

        <div v-else-if="filteredReviews.length === 0" class="reviews-state">Sin evaluaciones.</div>

        <div v-else class="reviews-table-wrap">
          <table class="reviews-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Programa</th>
                <th>Alumno</th>
                <th>Evaluación</th>
                <th>Comentario</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="review in filteredReviews" :key="review.id">
                <td class="date-cell">{{ formatDate(review.createdAt) }}</td>
                <td><span class="program-pill" :class="`is-${review.program}`">{{ programLabel(review.program) }}</span></td>
                <td class="student-cell">{{ review.studentName }}</td>
                <td>
                  <span class="rating-value">{{ review.rating }}</span>
                  <span class="rating-stars" aria-hidden="true">{{ '★'.repeat(review.rating) }}</span>
                </td>
                <td class="comment-cell">{{ review.comment || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type ReviewProgram = 'curso' | 'clinica'

interface ReviewRow {
  id: number
  studentName: string
  program: ReviewProgram
  rating: number
  comment: string
  createdAt: string
}

interface ReviewResponse {
  cycleYear: number
  stats: {
    total: number
    average: number
    distribution: Record<1 | 2 | 3 | 4 | 5, number>
  }
  reviews: ReviewRow[]
}

definePageMeta({ layout: false })

const requestHeaders = import.meta.server ? useRequestHeaders(['authorization']) : undefined
const { data, pending, error } = await useFetch<ReviewResponse>('/api/curso-verano/evaluaciones-admin', {
  headers: requestHeaders,
  cache: 'no-store',
})

const programFilter = ref<'all' | ReviewProgram>('all')
const searchTerm = ref('')

const normalize = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()

const filteredReviews = computed(() => {
  const term = normalize(searchTerm.value)
  const rows = data.value?.reviews || []

  return rows.filter((review) => {
    if (programFilter.value !== 'all' && review.program !== programFilter.value) return false
    if (!term) return true
    return normalize(`${review.studentName} ${review.comment}`).includes(term)
  })
})

const formattedAverage = computed(() => Number(data.value?.stats.average || 0).toFixed(2))
const roundedAverage = computed(() => Math.round(data.value?.stats.average || 0))

const distributionRows = computed(() => {
  const stats = data.value?.stats
  const total = Math.max(stats?.total || 0, 1)

  return [5, 4, 3, 2, 1].map((rating) => {
    const count = stats?.distribution[rating as 1 | 2 | 3 | 4 | 5] || 0
    return {
      rating,
      count,
      percent: Math.round((count / total) * 1000) / 10,
    }
  })
})

const programLabel = (program: ReviewProgram) => program === 'clinica' ? 'Clínica de Fútbol' : 'Curso de Verano'

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  }).format(date)
}

useHead({
  title: 'Evaluaciones Curso de Verano 2026 | IECS-IEDIS',
  meta: [{ name: 'robots', content: 'noindex, nofollow, noarchive' }],
})
</script>

<style scoped>
.reviews-dashboard {
  min-height: 100vh;
  padding: 46px 24px 72px;
  background: #f4f7fa;
  color: #162235;
  font-family: 'Montserrat', sans-serif;
}

.reviews-shell {
  width: min(1480px, 100%);
  margin: 0 auto;
}

.reviews-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.reviews-kicker,
.summary-label {
  display: block;
  color: #6c7a8d;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.reviews-header h1 {
  margin: 7px 0 0;
  color: #073d7d;
  font-size: clamp(36px, 4vw, 58px);
  line-height: 1;
  letter-spacing: -0.045em;
}

.excel-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 46px;
  border-radius: 999px;
  padding: 0 20px;
  background: #073d7d;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 12px 26px rgba(7, 61, 125, 0.16);
}

.excel-button:hover {
  color: #fff;
  background: #062f62;
}

.reviews-summary {
  display: grid;
  grid-template-columns: 1fr 1fr minmax(360px, 1.35fr);
  gap: 16px;
  margin-bottom: 16px;
}

.summary-card,
.reviews-panel {
  border: 1px solid rgba(15, 41, 70, 0.06);
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 12px 34px rgba(15, 41, 70, 0.045);
}

.summary-card {
  min-height: 150px;
  padding: 25px 27px;
}

.summary-card strong {
  display: block;
  margin-top: 10px;
  font-size: 42px;
  line-height: 1;
  letter-spacing: -0.04em;
}

.summary-stars {
  margin-top: 10px;
  color: #d9dee5;
  font-size: 18px;
  letter-spacing: 2px;
}

.summary-stars .is-filled {
  color: #f5ad18;
}

.summary-distribution {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.distribution-row {
  display: grid;
  grid-template-columns: 32px minmax(100px, 1fr) 38px;
  align-items: center;
  gap: 10px;
  color: #728095;
  font-size: 11px;
  font-weight: 700;
}

.distribution-row strong {
  margin: 0;
  color: #314156;
  font-size: 11px;
  letter-spacing: 0;
  text-align: right;
}

.distribution-track {
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: #edf1f5;
}

.distribution-fill {
  height: 100%;
  border-radius: inherit;
  background: #f5ad18;
}

.reviews-panel {
  overflow: hidden;
}

.reviews-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 20px;
  border-bottom: 1px solid #edf0f4;
}

.program-filters {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: #f3f6f9;
}

.program-filters button {
  border: 0;
  border-radius: 9px;
  padding: 9px 13px;
  background: transparent;
  color: #748196;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.program-filters button.active {
  background: #fff;
  color: #073d7d;
  box-shadow: 0 2px 8px rgba(15, 41, 70, 0.07);
}

.reviews-search {
  width: min(300px, 100%);
  display: flex;
  align-items: center;
  gap: 9px;
  border: 1px solid #e5eaf0;
  border-radius: 12px;
  padding: 0 13px;
  color: #8a96a6;
  background: #fff;
}

.reviews-search input {
  width: 100%;
  min-height: 40px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #233148;
  font-family: inherit;
  font-size: 12px;
}

.reviews-table-wrap {
  overflow-x: auto;
}

.reviews-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 980px;
}

.reviews-table th,
.reviews-table td {
  padding: 15px 18px;
  border-bottom: 1px solid #edf0f4;
  text-align: left;
  vertical-align: top;
}

.reviews-table th {
  color: #778497;
  background: #fbfcfd;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.reviews-table td {
  color: #37465a;
  font-size: 12px;
  line-height: 1.5;
}

.reviews-table tbody tr:hover td {
  background: #fbfdff;
}

.date-cell {
  width: 175px;
  color: #718095 !important;
}

.student-cell {
  width: 260px;
  color: #1f2d41 !important;
  font-weight: 700;
}

.comment-cell {
  min-width: 300px;
  max-width: 620px;
  white-space: pre-wrap;
}

.program-pill {
  display: inline-flex;
  border-radius: 999px;
  padding: 5px 9px;
  color: #073d7d;
  background: #eaf4fb;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.program-pill.is-clinica {
  color: #a65300;
  background: #fff1df;
}

.rating-value {
  margin-right: 8px;
  color: #17253a;
  font-size: 14px;
  font-weight: 800;
}

.rating-stars {
  color: #f5ad18;
  letter-spacing: 1px;
  white-space: nowrap;
}

.reviews-state {
  min-height: 240px;
  display: grid;
  place-items: center;
  color: #778497;
  font-size: 13px;
}

.dashboard-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #dce3eb;
  border-top-color: #073d7d;
  border-radius: 50%;
  animation: dashboard-spin 0.8s linear infinite;
}

@keyframes dashboard-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 980px) {
  .reviews-summary {
    grid-template-columns: 1fr 1fr;
  }

  .summary-distribution {
    grid-column: 1 / -1;
  }

  .reviews-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .reviews-search {
    width: 100%;
  }
}

@media (max-width: 680px) {
  .reviews-dashboard {
    padding: 28px 14px 54px;
  }

  .reviews-header {
    align-items: stretch;
    flex-direction: column;
  }

  .excel-button {
    align-self: flex-start;
  }

  .reviews-summary {
    grid-template-columns: 1fr;
  }

  .summary-distribution {
    grid-column: auto;
  }

  .program-filters {
    overflow-x: auto;
  }

  .program-filters button {
    white-space: nowrap;
  }
}
</style>
