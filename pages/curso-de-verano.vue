<template>
  <main class="summer-page" :class="`is-${selectedProgram}`">
    <section class="summer-hero">
      <div class="summer-hero-shape summer-hero-shape-a" aria-hidden="true"></div>
      <div class="summer-hero-shape summer-hero-shape-b" aria-hidden="true"></div>
      <div class="summer-ribbon" aria-hidden="true"></div>

      <div class="summer-container summer-hero-grid">
        <div class="summer-hero-copy">
          <h1>Curso de Verano</h1>

          <a class="summer-primary-cta" href="#certificado" @click="focusCertificateFlow">
            <span>Obten tu Certificado de Curso de Verano / Clínica de Futból</span>
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" aria-hidden="true">
              <path d="M1 16L17 1M17 1H5.5M17 1V12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>

        <div class="summer-hero-certificate" aria-hidden="true">
          <div class="summer-certificate-shadow"></div>
          <img src="/assets/img/curso-verano/certificado-base.webp" alt="" />
        </div>
      </div>
    </section>

    <section class="summer-programs" aria-label="Curso de Verano">
      <div class="summer-container summer-program-grid">
        <button
          type="button"
          class="summer-program-card summer-program-card-course"
          :class="{ 'is-active': selectedProgram === 'curso' }"
          @click="chooseProgram('curso')"
        >
          <div class="summer-course-collage" aria-hidden="true">
            <img src="/assets/img/IECS-IEDIS IMAGES/504x644-brave.webp" alt="" />
            <img src="/assets/img/IECS-IEDIS IMAGES/504x644-joy.webp" alt="" />
            <img src="/assets/img/IECS-IEDIS IMAGES/504x644-sunny.webp" alt="" />
            <img src="/assets/img/IECS-IEDIS IMAGES/504x644-hope.webp" alt="" />
          </div>
          <span>Curso de Verano</span>
        </button>

        <button
          type="button"
          class="summer-program-card summer-program-card-clinic"
          :class="{ 'is-active': selectedProgram === 'clinica' }"
          @click="chooseProgram('clinica')"
        >
          <img src="/assets/img/IECS-IEDIS IMAGES/TALLER-FUTBOL.png" alt="" />
          <span>Clínica de Fútbol</span>
        </button>
      </div>
    </section>

    <section id="certificado" ref="certificateSectionRef" class="summer-certificate-section">
      <div class="summer-container">
        <div class="summer-generator">
          <div class="summer-generator-controls">
            <div class="summer-program-select-wrap">
              <select
                v-model="selectedProgram"
                class="summer-program-select"
                aria-label="Curso de Verano / Clínica de Fútbol"
                @change="handleProgramChange"
              >
                <option value="curso">Curso de Verano</option>
                <option value="clinica">Clínica de Fútbol</option>
              </select>
              <svg width="15" height="9" viewBox="0 0 15 9" fill="none" aria-hidden="true">
                <path d="M1 1L7.5 7.5L14 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <div class="summer-name-combobox" @focusin="nameFieldFocused = true" @focusout="handleComboboxBlur">
              <span class="summer-name-prefix" aria-hidden="true">A:</span>

              <div class="summer-name-field">
                <input
                  ref="nameInputRef"
                  v-model="searchTerm"
                  type="text"
                  autocomplete="off"
                  spellcheck="false"
                  maxlength="90"
                  role="combobox"
                  aria-label="Nombre"
                  aria-autocomplete="list"
                  aria-controls="summer-student-suggestions"
                  :aria-expanded="dropdownVisible ? 'true' : 'false'"
                  :aria-activedescendant="activeSuggestionId"
                  @input="scheduleStudentSearch"
                  @keydown.down.prevent="moveSuggestion(1)"
                  @keydown.up.prevent="moveSuggestion(-1)"
                  @keydown.enter.prevent="activateCurrentChoice"
                  @keydown.esc="closeSuggestions"
                />
                <span class="summer-name-line" aria-hidden="true"></span>

                <span v-if="isSearching" class="summer-search-spinner" aria-hidden="true"></span>

                <div
                  v-if="dropdownVisible"
                  id="summer-student-suggestions"
                  class="summer-suggestions"
                  role="listbox"
                >
                  <button
                    v-for="(student, index) in suggestions"
                    :id="suggestionId(index)"
                    :key="student"
                    type="button"
                    role="option"
                    class="summer-suggestion"
                    :class="{ 'is-active': activeSuggestionIndex === index }"
                    :aria-selected="activeSuggestionIndex === index ? 'true' : 'false'"
                    @mousedown.prevent="downloadForName(student)"
                    @mouseenter="activeSuggestionIndex = index"
                  >
                    {{ student }}
                  </button>

                  <button
                    v-if="manualCertificateReady"
                    type="button"
                    class="summer-suggestion summer-manual-certificate"
                    :class="{ 'is-active': activeSuggestionIndex === suggestions.length }"
                    @mousedown.prevent="downloadForName(searchTerm)"
                    @mouseenter="activeSuggestionIndex = suggestions.length"
                  >
                    <span>Obtener certificado</span>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" aria-hidden="true">
                      <path d="M1 13L14 1M14 1H4.65M14 1V10.35" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <Transition name="summer-review">
              <div v-if="evaluationVisible" ref="evaluationRef" class="summer-evaluation" tabindex="-1">
                <div class="summer-evaluation-heading">
                  <span>{{ evaluationQuestion }}</span>
                  <svg
                    v-if="evaluationSaved"
                    class="summer-evaluation-saved"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5" />
                    <path d="M5.3 9.1L7.8 11.6L12.9 6.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>

                <div class="summer-stars" role="radiogroup" :aria-label="evaluationQuestion" @mouseleave="hoverRating = 0">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    class="summer-star"
                    :class="{ 'is-filled': star <= displayedRating }"
                    role="radio"
                    :aria-checked="selectedRating === star ? 'true' : 'false'"
                    :aria-label="String(star)"
                    @mouseenter="hoverRating = star"
                    @focus="hoverRating = star"
                    @blur="hoverRating = 0"
                    @click="selectRating(star)"
                  >
                    <svg viewBox="0 0 32 31" aria-hidden="true">
                      <path d="M16 1.8L20.15 10.2L29.42 11.55L22.71 18.08L24.3 27.32L16 22.96L7.7 27.32L9.29 18.08L2.58 11.55L11.85 10.2L16 1.8Z" />
                    </svg>
                  </button>
                </div>

                <button
                  v-if="selectedRating"
                  type="button"
                  class="summer-comment-toggle"
                  :aria-expanded="commentOpen ? 'true' : 'false'"
                  @click="commentOpen = !commentOpen"
                >
                  <span>Comentario</span>
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true" :class="{ 'is-open': commentOpen }">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>

                <div v-if="selectedRating && commentOpen" class="summer-comment-field">
                  <textarea
                    v-model="evaluationComment"
                    maxlength="2000"
                    rows="3"
                    aria-label="Comentario"
                    @input="scheduleEvaluationSave"
                    @blur="flushEvaluationSave"
                  ></textarea>
                </div>
              </div>
            </Transition>
          </div>

          <div class="summer-live-certificate">
            <img src="/assets/img/curso-verano/certificado-base.webp" alt="" />
            <div v-if="previewName" class="summer-live-name" :style="previewNameStyle">
              {{ previewName }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  downloadSummerCertificate,
  preloadSummerCertificateTemplate,
  type SummerCertificateProgram,
} from '~/utils/certificatePdf'

const selectedProgram = ref<SummerCertificateProgram>('curso')
const searchTerm = ref('')
const suggestions = ref<string[]>([])
const isSearching = ref(false)
const nameFieldFocused = ref(false)
const activeSuggestionIndex = ref(-1)
const nameInputRef = ref<HTMLInputElement | null>(null)
const certificateSectionRef = ref<HTMLElement | null>(null)
const evaluationRef = ref<HTMLElement | null>(null)
const evaluationVisible = ref(false)
const selectedRating = ref(0)
const hoverRating = ref(0)
const commentOpen = ref(false)
const evaluationComment = ref('')
const evaluationSaved = ref(false)
const reviewSubmissionId = ref('')
const reviewStudentName = ref('')
const reviewProgram = ref<SummerCertificateProgram>('curso')

let evaluationSaveTimer: ReturnType<typeof setTimeout> | null = null
let evaluationSaveSequence = 0
let evaluationSession = 0
let evaluationSaveChain: Promise<void> = Promise.resolve()
let searchTimer: ReturnType<typeof setTimeout> | null = null
let searchSequence = 0
let blurTimer: ReturnType<typeof setTimeout> | null = null

const cleanName = (value: string) => value.replace(/\s+/g, ' ').trim()

const previewName = computed(() => cleanName(searchTerm.value).slice(0, 90))
const manualCertificateReady = computed(() => previewName.value.length >= 2)
const displayedRating = computed(() => hoverRating.value || selectedRating.value)
const evaluationQuestion = computed(() =>
  reviewProgram.value === 'clinica'
    ? '¿Qué tan satisfecho estás con nuestra Clínica de Fútbol?'
    : '¿Qué tan satisfecho estás con nuestro Curso de Verano?',
)
const dropdownVisible = computed(() => {
  return nameFieldFocused.value && manualCertificateReady.value && (suggestions.value.length > 0 || manualCertificateReady.value)
})

const previewNameStyle = computed(() => {
  const length = previewName.value.length
  const scale = length > 48 ? 0.66 : length > 38 ? 0.76 : length > 28 ? 0.86 : 1
  return { '--name-scale': String(scale) }
})

const activeSuggestionId = computed(() => {
  if (!dropdownVisible.value || activeSuggestionIndex.value < 0 || activeSuggestionIndex.value >= suggestions.value.length) {
    return undefined
  }

  return suggestionId(activeSuggestionIndex.value)
})

const suggestionId = (index: number) => `summer-student-option-${index}`

const createSubmissionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`
}

const clearEvaluation = () => {
  evaluationSession += 1
  evaluationSaveSequence += 1
  evaluationSaveChain = Promise.resolve()
  evaluationVisible.value = false
  selectedRating.value = 0
  hoverRating.value = 0
  commentOpen.value = false
  evaluationComment.value = ''
  evaluationSaved.value = false
  reviewSubmissionId.value = ''
  reviewStudentName.value = ''

  if (evaluationSaveTimer) {
    clearTimeout(evaluationSaveTimer)
    evaluationSaveTimer = null
  }
}

const startEvaluation = async (studentName: string, program: SummerCertificateProgram) => {
  clearEvaluation()
  reviewSubmissionId.value = createSubmissionId()
  reviewStudentName.value = studentName
  reviewProgram.value = program
  evaluationVisible.value = true

  await nextTick()
  window.requestAnimationFrame(() => {
    evaluationRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  })
}

const persistEvaluation = () => {
  if (!reviewSubmissionId.value || !reviewStudentName.value || selectedRating.value < 1) {
    return Promise.resolve()
  }

  const session = evaluationSession
  const sequence = ++evaluationSaveSequence
  const payload = {
    submissionId: reviewSubmissionId.value,
    studentName: reviewStudentName.value,
    program: reviewProgram.value,
    rating: selectedRating.value,
    comment: evaluationComment.value,
  }

  evaluationSaved.value = false

  const saveTask = evaluationSaveChain.then(async () => {
    if (session !== evaluationSession) return

    try {
      await $fetch('/api/curso-verano/evaluaciones', {
        method: 'POST',
        body: payload,
      })

      if (session === evaluationSession && sequence === evaluationSaveSequence) {
        evaluationSaved.value = true
      }
    } catch {
      if (session === evaluationSession && sequence === evaluationSaveSequence) {
        evaluationSaved.value = false
      }
    }
  })

  evaluationSaveChain = saveTask
  return saveTask
}

const selectRating = (rating: number) => {
  selectedRating.value = rating
  hoverRating.value = 0
  void persistEvaluation()
}

const scheduleEvaluationSave = () => {
  evaluationSaveSequence += 1
  evaluationSaved.value = false
  if (evaluationSaveTimer) clearTimeout(evaluationSaveTimer)
  evaluationSaveTimer = setTimeout(() => {
    evaluationSaveTimer = null
    void persistEvaluation()
  }, 700)
}

const flushEvaluationSave = () => {
  if (!evaluationSaveTimer) return
  clearTimeout(evaluationSaveTimer)
  evaluationSaveTimer = null
  void persistEvaluation()
}

const closeSuggestions = () => {
  nameFieldFocused.value = false
  activeSuggestionIndex.value = -1
}

const resetSearchState = () => {
  searchSequence += 1
  suggestions.value = []
  activeSuggestionIndex.value = -1
  isSearching.value = false

  if (searchTimer) {
    clearTimeout(searchTimer)
    searchTimer = null
  }
}

const fetchStudentSuggestions = async () => {
  const term = cleanName(searchTerm.value)
  const sequence = ++searchSequence

  if (term.length < 2) {
    suggestions.value = []
    activeSuggestionIndex.value = -1
    isSearching.value = false
    return
  }

  isSearching.value = true

  try {
    const response = await $fetch<{ students?: string[] }>('/api/curso-verano/estudiantes', {
      query: {
        q: term,
        tipo: selectedProgram.value,
      },
    })

    if (sequence !== searchSequence) return

    suggestions.value = Array.isArray(response.students) ? response.students : []
    activeSuggestionIndex.value = -1
  } catch {
    if (sequence === searchSequence) {
      suggestions.value = []
      activeSuggestionIndex.value = -1
    }
  } finally {
    if (sequence === searchSequence) {
      isSearching.value = false
    }
  }
}

const scheduleStudentSearch = () => {
  if (evaluationVisible.value && cleanName(searchTerm.value) !== reviewStudentName.value) {
    clearEvaluation()
  }

  nameFieldFocused.value = true
  activeSuggestionIndex.value = -1

  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    void fetchStudentSuggestions()
  }, 180)
}

const handleProgramChange = () => {
  clearEvaluation()
  resetSearchState()
  if (cleanName(searchTerm.value).length >= 2) {
    scheduleStudentSearch()
  }
}

const chooseProgram = async (program: SummerCertificateProgram) => {
  selectedProgram.value = program
  handleProgramChange()
  certificateSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  await nextTick()
  window.setTimeout(() => nameInputRef.value?.focus({ preventScroll: true }), 450)
}

const focusCertificateFlow = () => {
  window.setTimeout(() => nameInputRef.value?.focus({ preventScroll: true }), 650)
}

const downloadForName = async (value: string) => {
  const name = cleanName(value)
  if (name.length < 2) return

  const program = selectedProgram.value
  searchTerm.value = name
  suggestions.value = []
  activeSuggestionIndex.value = -1
  nameFieldFocused.value = false

  try {
    await downloadSummerCertificate(name, program)
    await startEvaluation(name, program)
  } catch {
    // The interaction intentionally remains visually silent; the parent-facing UI
    // contains no infrastructure or transport status messaging.
  }
}

const moveSuggestion = (direction: 1 | -1) => {
  if (!dropdownVisible.value) return

  const choiceCount = suggestions.value.length + (manualCertificateReady.value ? 1 : 0)
  if (!choiceCount) return

  if (activeSuggestionIndex.value < 0) {
    activeSuggestionIndex.value = direction > 0 ? 0 : choiceCount - 1
    return
  }

  activeSuggestionIndex.value = (activeSuggestionIndex.value + direction + choiceCount) % choiceCount
}

const activateCurrentChoice = () => {
  if (!manualCertificateReady.value) return

  if (activeSuggestionIndex.value >= 0 && activeSuggestionIndex.value < suggestions.value.length) {
    void downloadForName(suggestions.value[activeSuggestionIndex.value])
    return
  }

  void downloadForName(searchTerm.value)
}

const handleComboboxBlur = () => {
  if (blurTimer) clearTimeout(blurTimer)
  blurTimer = setTimeout(() => {
    nameFieldFocused.value = false
    activeSuggestionIndex.value = -1
  }, 120)
}

watch(selectedProgram, () => {
  activeSuggestionIndex.value = -1
})

onMounted(() => {
  void preloadSummerCertificateTemplate().catch(() => undefined)
})

onBeforeUnmount(() => {
  if (searchTimer) clearTimeout(searchTimer)
  if (blurTimer) clearTimeout(blurTimer)
  if (evaluationSaveTimer) clearTimeout(evaluationSaveTimer)
})

useHead({
  title: 'Curso de Verano | Colegios IECS-IEDIS',
  meta: [
    {
      name: 'description',
      content: 'Curso de Verano y Clínica de Fútbol IECS-IEDIS.',
    },
  ],
})
</script>

<style scoped>
.summer-page {
  --summer-navy: #073d7d;
  --summer-navy-deep: #062b59;
  --summer-sky: #5dc2e7;
  --summer-cyan: #aeeff0;
  --summer-orange: #d66d00;
  --summer-green: #668e32;
  --summer-ink: #111827;
  --summer-paper: #f8fbfd;
  overflow: clip;
  background: #fff;
  color: var(--summer-ink);
}

.summer-container {
  width: min(1524px, calc(100% - 48px));
  margin: 0 auto;
}

.summer-hero {
  position: relative;
  min-height: 720px;
  display: flex;
  align-items: center;
  margin-top: -10px;
  padding: 92px 0 88px;
  background:
    radial-gradient(circle at 12% 12%, rgba(93, 194, 231, 0.20), transparent 27%),
    linear-gradient(135deg, #ffffff 0%, #f9fcfd 58%, #eef8fb 100%);
  isolation: isolate;
}

.summer-hero::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 8px;
  background: linear-gradient(90deg, #7dc9df 0 24%, #668e32 24% 47%, #d66d00 47% 69%, #f9b52c 69% 83%, #7dc9df 83% 100%);
  z-index: 5;
}

.summer-hero-shape {
  position: absolute;
  pointer-events: none;
  z-index: -1;
}

.summer-hero-shape-a {
  width: 560px;
  height: 520px;
  left: -210px;
  top: -120px;
  background: linear-gradient(145deg, rgba(28, 146, 211, 0.62), rgba(107, 213, 230, 0.18));
  clip-path: polygon(0 0, 100% 0, 78% 38%, 58% 76%, 0 100%);
  transform: rotate(-2deg);
}

.summer-hero-shape-b {
  width: 360px;
  height: 430px;
  right: -120px;
  bottom: -170px;
  background: linear-gradient(150deg, rgba(129, 228, 231, 0.7), rgba(59, 161, 217, 0.4));
  clip-path: polygon(45% 0, 100% 14%, 100% 100%, 0 100%, 14% 54%);
}

.summer-ribbon {
  position: absolute;
  top: 0;
  right: clamp(46px, 8vw, 150px);
  width: clamp(112px, 11vw, 170px);
  height: clamp(180px, 22vw, 310px);
  background: #254f80;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%);
  z-index: -1;
}

.summer-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(540px, 1.22fr);
  gap: clamp(48px, 7vw, 118px);
  align-items: center;
}

.summer-hero-copy {
  position: relative;
  z-index: 2;
}

.summer-hero-copy h1 {
  margin: 0 0 40px;
  max-width: 670px;
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(72px, 7.4vw, 126px);
  line-height: 0.88;
  letter-spacing: -0.075em;
  font-weight: 800;
  color: var(--summer-navy);
}

.summer-primary-cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 34px;
  width: min(100%, 620px);
  padding: 24px 28px 24px 32px;
  border-radius: 999px;
  background: var(--summer-orange);
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(15px, 1.2vw, 18px);
  font-weight: 800;
  line-height: 1.25;
  text-decoration: none;
  box-shadow: 0 20px 45px rgba(214, 109, 0, 0.19);
  transition: transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease;
}

.summer-primary-cta svg {
  flex: 0 0 auto;
  transition: transform 220ms ease;
}

.summer-primary-cta:hover {
  color: #fff;
  background: #bc5f00;
  transform: translateY(-3px);
  box-shadow: 0 24px 52px rgba(214, 109, 0, 0.25);
}

.summer-primary-cta:hover svg {
  transform: translate(3px, -3px);
}

.summer-hero-certificate {
  position: relative;
  z-index: 1;
  perspective: 1200px;
}

.summer-hero-certificate img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 40px 90px rgba(7, 61, 125, 0.20);
  transform: rotate(2.1deg) rotateY(-4deg);
  transform-origin: center;
}

.summer-certificate-shadow {
  position: absolute;
  inset: 8% -4% -5% 5%;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(7, 61, 125, 0.11), rgba(93, 194, 231, 0.22));
  filter: blur(22px);
  transform: rotate(-3deg);
  z-index: -1;
}

.summer-programs {
  position: relative;
  padding: 116px 0 72px;
  background: #fff;
}

.summer-program-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.summer-program-card {
  position: relative;
  min-height: 430px;
  overflow: hidden;
  border: 0;
  border-radius: 32px;
  padding: 0;
  background: var(--summer-navy);
  cursor: pointer;
  isolation: isolate;
  box-shadow: 0 20px 52px rgba(22, 46, 77, 0.08);
  text-align: left;
  transition: transform 240ms ease, box-shadow 240ms ease;
}

.summer-program-card::before,
.summer-program-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.summer-program-card::before {
  background: linear-gradient(180deg, rgba(3, 28, 58, 0.03) 26%, rgba(3, 28, 58, 0.82) 100%);
}

.summer-program-card::after {
  inset: 16px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 23px;
  opacity: 0;
  transition: opacity 240ms ease;
}

.summer-program-card > img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms cubic-bezier(0.2, 0.72, 0, 1);
}

.summer-course-collage {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;
  background: #eaf4f7;
}

.summer-course-collage img {
  width: 100%;
  height: 100%;
  min-width: 0;
  object-fit: cover;
  object-position: center;
  filter: saturate(1.04) contrast(1.02);
  transition: transform 500ms cubic-bezier(0.2, 0.72, 0, 1);
}

.summer-program-card-clinic > img {
  object-position: center 44%;
}

.summer-program-card span {
  position: absolute;
  left: clamp(28px, 3.4vw, 54px);
  right: 28px;
  bottom: clamp(28px, 3.5vw, 50px);
  z-index: 2;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(34px, 3.7vw, 62px);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.05em;
}

.summer-program-card:hover,
.summer-program-card.is-active {
  transform: translateY(-7px);
  box-shadow: 0 30px 70px rgba(22, 46, 77, 0.16);
}

.summer-program-card:hover::after,
.summer-program-card.is-active::after {
  opacity: 1;
}

.summer-program-card:hover > img,
.summer-program-card.is-active > img,
.summer-program-card:hover .summer-course-collage img,
.summer-program-card.is-active .summer-course-collage img {
  transform: scale(1.045);
}

.summer-certificate-section {
  position: relative;
  padding: 72px 0 138px;
  scroll-margin-top: 130px;
  background:
    linear-gradient(145deg, rgba(205, 244, 246, 0.35), transparent 27%),
    linear-gradient(320deg, rgba(105, 195, 231, 0.14), transparent 34%),
    #f8fbfd;
}

.summer-certificate-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 24vw;
  height: 27vw;
  max-width: 420px;
  max-height: 470px;
  min-width: 230px;
  min-height: 260px;
  background: linear-gradient(145deg, rgba(46, 161, 217, 0.25), rgba(107, 219, 226, 0.08));
  clip-path: polygon(0 0, 100% 0, 76% 38%, 52% 100%, 0 78%);
  pointer-events: none;
}

.summer-generator {
  position: relative;
  display: grid;
  grid-template-columns: minmax(330px, 0.62fr) minmax(0, 1.38fr);
  gap: clamp(38px, 5vw, 78px);
  align-items: center;
  padding: clamp(34px, 4.5vw, 72px);
  border-radius: 38px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 28px 80px rgba(7, 61, 125, 0.10);
  backdrop-filter: blur(12px);
  z-index: 1;
}

.summer-generator-controls {
  position: relative;
  z-index: 12;
}

.summer-program-select-wrap {
  position: relative;
  margin-bottom: 46px;
  color: #fff;
}

.summer-program-select {
  width: 100%;
  min-height: 62px;
  appearance: none;
  border: 0;
  outline: 0;
  border-radius: 999px;
  padding: 0 58px 0 25px;
  background: var(--summer-navy);
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 750;
  cursor: pointer;
  box-shadow: 0 14px 34px rgba(7, 61, 125, 0.16);
}

.is-clinica .summer-program-select {
  background: var(--summer-orange);
  box-shadow: 0 14px 34px rgba(214, 109, 0, 0.17);
}

.summer-program-select-wrap svg {
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  pointer-events: none;
}

.summer-name-combobox {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: end;
  gap: 14px;
}

.summer-name-prefix {
  position: relative;
  top: 4px;
  font-family: 'Times New Roman', serif;
  font-size: 58px;
  line-height: 0.8;
  font-style: italic;
  color: #080808;
}

.summer-name-field {
  position: relative;
  min-width: 0;
}

.summer-name-field input {
  width: 100%;
  height: 58px;
  border: 0;
  outline: 0;
  background: transparent;
  padding: 0 46px 7px 4px;
  color: #111;
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(18px, 1.6vw, 24px);
  font-weight: 700;
  line-height: 1.1;
  caret-color: var(--summer-navy);
}

.summer-name-line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #151515;
  transform-origin: left;
}

.summer-name-field:focus-within .summer-name-line {
  height: 2px;
  background: var(--summer-navy);
}

.is-clinica .summer-name-field:focus-within .summer-name-line {
  background: var(--summer-orange);
}

.summer-search-spinner {
  position: absolute;
  top: 19px;
  right: 8px;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(7, 61, 125, 0.16);
  border-top-color: var(--summer-navy);
  border-radius: 50%;
  animation: summer-spin 0.8s linear infinite;
}

.is-clinica .summer-search-spinner {
  border-color: rgba(214, 109, 0, 0.16);
  border-top-color: var(--summer-orange);
}

@keyframes summer-spin {
  to { transform: rotate(360deg); }
}

.summer-suggestions {
  position: absolute;
  top: calc(100% + 14px);
  left: 0;
  right: 0;
  overflow: hidden;
  border: 1px solid rgba(7, 61, 125, 0.09);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 22px 60px rgba(7, 61, 125, 0.18);
  z-index: 50;
}

.summer-suggestion {
  width: 100%;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border: 0;
  border-bottom: 1px solid rgba(7, 61, 125, 0.07);
  padding: 12px 18px;
  background: #fff;
  color: #1d2a3a;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 620;
  line-height: 1.25;
  text-align: left;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, padding-left 150ms ease;
}

.summer-suggestion:last-child {
  border-bottom: 0;
}

.summer-suggestion:hover,
.summer-suggestion.is-active {
  background: #edf7fb;
  color: var(--summer-navy);
  padding-left: 22px;
}

.summer-manual-certificate {
  min-height: 58px;
  background: var(--summer-navy);
  color: #fff;
  font-weight: 800;
}

.summer-manual-certificate:hover,
.summer-manual-certificate.is-active {
  background: var(--summer-navy-deep);
  color: #fff;
}

.is-clinica .summer-manual-certificate {
  background: var(--summer-orange);
}

.is-clinica .summer-manual-certificate:hover,
.is-clinica .summer-manual-certificate.is-active {
  background: #b75d00;
}

.summer-evaluation {
  position: relative;
  margin-top: 34px;
  border: 1px solid rgba(7, 61, 125, 0.1);
  border-radius: 20px;
  outline: 0;
  padding: 23px 24px 21px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 14px 34px rgba(7, 61, 125, 0.07);
  overflow: hidden;
}

.summer-evaluation::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: var(--summer-navy);
}

.is-clinica .summer-evaluation::before {
  background: var(--summer-orange);
}

.summer-evaluation-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
  color: #27394e;
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(14px, 1.35vw, 16px);
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.015em;
}

.summer-evaluation-heading span {
  max-width: 440px;
}

.summer-evaluation-saved {
  color: var(--summer-green);
}

.summer-stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}


.summer-star {
  display: grid;
  place-items: center;
  width: clamp(40px, 4vw, 48px);
  height: clamp(40px, 4vw, 48px);
  border: 0;
  padding: 3px;
  background: transparent;
  color: #d4dae0;
  cursor: pointer;
  transition: transform 120ms ease, color 120ms ease;
}

.summer-star svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.summer-star path {
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 1.1;
  stroke-linejoin: round;
}

.summer-star.is-filled {
  color: #f5ad18;
}

.summer-star:hover,
.summer-star:focus-visible {
  transform: translateY(-2px) scale(1.07);
  outline: 0;
}

.summer-comment-toggle {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
  border: 0;
  padding: 3px 0;
  background: transparent;
  color: rgba(39, 57, 78, 0.56);
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: color 150ms ease;
}

.summer-comment-toggle:hover,
.summer-comment-toggle:focus-visible {
  color: var(--summer-navy);
  outline: 0;
}

.is-clinica .summer-comment-toggle:hover,
.is-clinica .summer-comment-toggle:focus-visible {
  color: var(--summer-orange);
}

.summer-comment-toggle svg {
  transition: transform 180ms ease;
}

.summer-comment-toggle svg.is-open {
  transform: rotate(180deg);
}

.summer-comment-field {
  margin-top: 10px;
}

.summer-comment-field textarea {
  display: block;
  width: 100%;
  min-height: 82px;
  resize: vertical;
  border: 1px solid rgba(7, 61, 125, 0.12);
  border-radius: 15px;
  outline: 0;
  padding: 13px 14px;
  background: rgba(248, 251, 253, 0.8);
  color: #1d2a3a;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  line-height: 1.55;
  transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
}

.summer-comment-field textarea:focus {
  border-color: rgba(7, 61, 125, 0.35);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(7, 61, 125, 0.06);
}

.is-clinica .summer-comment-field textarea:focus {
  border-color: rgba(214, 109, 0, 0.38);
  box-shadow: 0 0 0 3px rgba(214, 109, 0, 0.06);
}

.summer-review-enter-active,
.summer-review-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.summer-review-enter-from,
.summer-review-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.summer-live-certificate {
  position: relative;
  min-width: 0;
  border-radius: 7px;
  box-shadow: 0 26px 70px rgba(7, 61, 125, 0.16);
  transform: translateZ(0);
  overflow: hidden;
  container-type: inline-size;
  background: #fff;
}

.summer-live-certificate img {
  display: block;
  width: 100%;
  height: auto;
}

.summer-live-name {
  --name-scale: 1;
  position: absolute;
  left: 24.35%;
  top: 39.8%;
  width: 51.25%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  white-space: nowrap;
  color: #111;
  font-family: 'Montserrat', sans-serif;
  font-size: calc(clamp(10px, 1.55vw, 24px) * var(--name-scale));
  font-size: calc(3.05cqw * var(--name-scale));
  font-weight: 800;
  line-height: 1;
  text-align: center;
  pointer-events: none;
}

@media (max-width: 1199px) {
  .summer-hero {
    min-height: 640px;
  }

  .summer-hero-grid {
    grid-template-columns: minmax(0, 0.82fr) minmax(470px, 1.18fr);
    gap: 44px;
  }

  .summer-generator {
    grid-template-columns: 1fr;
  }

  .summer-generator-controls {
    width: min(620px, 100%);
    margin: 0 auto;
  }

  .summer-live-certificate {
    width: min(980px, 100%);
    margin: 0 auto;
  }

}

@media (max-width: 991px) {
  .summer-container {
    width: min(100% - 34px, 920px);
  }

  .summer-hero {
    min-height: 0;
    padding: 100px 0 96px;
  }

  .summer-hero-grid {
    grid-template-columns: 1fr;
    gap: 70px;
  }

  .summer-hero-copy {
    max-width: 720px;
  }

  .summer-hero-copy h1 {
    max-width: 560px;
  }

  .summer-hero-certificate {
    width: min(820px, 92%);
    margin: 0 auto;
  }

  .summer-program-card {
    min-height: 360px;
  }
}

@media (max-width: 767px) {
  .summer-container {
    width: calc(100% - 28px);
  }

  .summer-hero {
    padding: 82px 0 74px;
  }

  .summer-hero-copy h1 {
    margin-bottom: 30px;
    font-size: clamp(58px, 18vw, 86px);
  }

  .summer-primary-cta {
    gap: 18px;
    padding: 20px 23px;
    border-radius: 26px;
    font-size: 14px;
  }

  .summer-ribbon {
    right: 22px;
    width: 86px;
    height: 155px;
  }

  .summer-hero-shape-a {
    width: 330px;
    height: 320px;
    left: -150px;
    top: -120px;
  }

  .summer-hero-shape-b {
    width: 250px;
    height: 300px;
  }

  .summer-hero-certificate {
    width: 100%;
  }

  .summer-programs {
    padding: 74px 0 48px;
  }

  .summer-program-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .summer-program-card {
    min-height: 320px;
    border-radius: 24px;
  }

  .summer-program-card span {
    font-size: clamp(38px, 11vw, 54px);
  }

  .summer-course-collage {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }

  .summer-certificate-section {
    padding: 48px 0 90px;
  }

  .summer-generator {
    gap: 42px;
    padding: 28px 18px 22px;
    border-radius: 28px;
  }

  .summer-program-select-wrap {
    margin-bottom: 35px;
  }

  .summer-program-select {
    min-height: 58px;
    font-size: 15px;
  }

  .summer-name-prefix {
    font-size: 48px;
  }

  .summer-name-field input {
    height: 52px;
    padding-right: 38px;
    font-size: 18px;
  }

  .summer-suggestions {
    left: -57px;
    border-radius: 18px;
  }

  .summer-suggestion {
    font-size: 14px;
  }

  .summer-evaluation {
    margin-top: 28px;
    padding: 20px 20px 18px;
  }

  .summer-star {
    width: 37px;
    height: 37px;
  }

  .summer-live-certificate {
    border-radius: 4px;
    box-shadow: 0 18px 46px rgba(7, 61, 125, 0.16);
  }

}

@media (prefers-reduced-motion: reduce) {
  .summer-primary-cta,
  .summer-primary-cta svg,
  .summer-program-card,
  .summer-program-card img,
  .summer-suggestion,
  .summer-star,
  .summer-comment-toggle,
  .summer-comment-toggle svg,
  .summer-comment-field textarea {
    transition: none;
  }

  .summer-search-spinner {
    animation-duration: 1.6s;
  }
}
</style>
