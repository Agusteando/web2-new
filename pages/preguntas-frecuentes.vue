<template>
  <main>
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1">
       <div class="container pt-80 pb-40 text-center">
          <h1 class="tp-ff-familjen fs-70 tp-text-common-black-5 mb-20">Preguntas Frecuentes</h1>
          <p class="tp-ff-dm fs-20 tp-text-grey-7 mx-auto" style="max-width: 800px;">
             Encuentra respuestas rápidas a las dudas más comunes sobre inscripciones, metodologías, servicios y niveles educativos.
          </p>
       </div>
    </div>

    <div class="tp-faq-area pb-100">
       <div class="container">
          <div class="row justify-content-center">
             <div class="col-lg-10">
                
                <!-- Category: Guardería -->
                <div class="mb-60">
                   <h3 class="tp-ff-familjen fs-36 mb-30" style="color: #8EC152;">Guardería / Desarrollo Infantil</h3>
                   <div class="tp-faq-wrap tp-faq-cst-tab-content tp-faq-md-tab-content">
                      <div class="accordion" id="faqGuarderia">
                         <div v-for="(faq, i) in guarderiaFaqs" :key="'g'+i" class="accordion-item tp_fade_anim" :data-delay="0.1 * i">
                            <h2 class="accordion-header p-relative" :id="'h_g_'+i">
                               <button class="collapsed tp-faq-btn" type="button" data-bs-toggle="collapse" :data-bs-target="'#c_g_'+i" aria-expanded="false">
                                  {{ faq.q }}
                                  <span class="accordion-btn"></span>
                               </button>
                            </h2>
                            <div :id="'c_g_'+i" class="accordion-collapse collapse" data-bs-parent="#faqGuarderia">
                               <div class="accordion-body tp-faq-details-para">
                                  <p>{{ faq.a }}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <!-- Category: Preescolar -->
                <div class="mb-60">
                   <h3 class="tp-ff-familjen fs-36 mb-30" style="color: #E83F4B;">Preescolar</h3>
                   <div class="tp-faq-wrap tp-faq-cst-tab-content tp-faq-md-tab-content">
                      <div class="accordion" id="faqPreescolar">
                         <div v-for="(faq, i) in preescolarFaqs" :key="'p'+i" class="accordion-item tp_fade_anim" :data-delay="0.1 * i">
                            <h2 class="accordion-header p-relative" :id="'h_p_'+i">
                               <button class="collapsed tp-faq-btn" type="button" data-bs-toggle="collapse" :data-bs-target="'#c_p_'+i" aria-expanded="false">
                                  {{ faq.q }}
                                  <span class="accordion-btn"></span>
                               </button>
                            </h2>
                            <div :id="'c_p_'+i" class="accordion-collapse collapse" data-bs-parent="#faqPreescolar">
                               <div class="accordion-body tp-faq-details-para" style="white-space: pre-wrap;">
                                  <p>{{ faq.a }}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <!-- Category: Primaria -->
                <div class="mb-60">
                   <h3 class="tp-ff-familjen fs-36 mb-30" style="color: #FCBF2C;">Primaria</h3>
                   <div class="tp-faq-wrap tp-faq-cst-tab-content tp-faq-md-tab-content">
                      <div class="accordion" id="faqPrimaria">
                         <div v-for="(faq, i) in primariaFaqs" :key="'pr'+i" class="accordion-item tp_fade_anim" :data-delay="0.1 * i">
                            <h2 class="accordion-header p-relative" :id="'h_pr_'+i">
                               <button class="collapsed tp-faq-btn" type="button" data-bs-toggle="collapse" :data-bs-target="'#c_pr_'+i" aria-expanded="false">
                                  {{ faq.q }}
                                  <span class="accordion-btn"></span>
                               </button>
                            </h2>
                            <div :id="'c_pr_'+i" class="accordion-collapse collapse" data-bs-parent="#faqPrimaria">
                               <div class="accordion-body tp-faq-details-para" style="white-space: pre-wrap;">
                                  <p>{{ faq.a }}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

             </div>
          </div>
       </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const guarderiaFaqs = ref([
  { q: "¿Cuentan con horario extendido?", a: "Sí, hasta las 7:00 de la tarde." },
  { q: "¿El servicio gratuito de IMSS cubre todos los niveles?", a: "Solo cubre de los 43 días de nacido a los 4 años de edad." },
  { q: "¿Cuál es el número de alumnos por grupos?", a: "Grupos máximo de 20 alumnos para mantener atención personalizada." },
  { q: "¿Cuántas maestras hay por sala en guardería?", a: "Una maestra titular y maestras auxiliares dependiendo el número de alumnos que asisten por día." },
  { q: "¿En caso de una emergencia a dónde los llevan?", a: "Los alumnos están asegurados en clínicas certificadas para su pronta atención." },
  { q: "¿El seguro escolar cubre enfermedades básicas?", a: "No, el seguro cubre incidencias mayores o accidentes ocurridos dentro de la institución." }
]);

const preescolarFaqs = ref([
  { q: "¿Cuántos años debe tener mi hijo para ingresar a Kínder 1?", a: "3 años cumplidos a diciembre del ciclo de ingreso." },
  { q: "¿La escuela es bilingüe?", a: "Somos un Colegio Bicultural en donde las clases se imparten medio día en español y medio día en inglés, por lo que los grupos cuentan con su docente de inglés y su docente de español." },
  { q: "¿Si trae lunch mi hijo(a) qué alimentos son los idóneos?", a: "Les recomendamos que sean alimentos elaborados en casa, evitar comida chatarra. También pueden contratar nuestro servicio de comedor, elaborado bajo supervisión nutricional." },
  { q: "¿De cuantos alumnos son los grupos?", a: "Los grupos son reducidos de 17 a 20 alumnos para tener mejor atención personalizada." },
  { q: "¿Cómo se cuida el equilibrio entre el uso de tecnología y la vida real?", a: "El uso de la tecnología está controlado y dosificado, y se utiliza de manera significativa. Nuestro modelo tiene un compromiso permanente con escenarios del mundo real para fomentar curiosidad y motricidad, no solo el uso de pantallas." }
]);

const primariaFaqs = ref([
  { q: "¿Cuántos alumnos son por salón?", a: "Los salones están adecuados hasta para un máximo de 25 alumnos." },
  { q: "¿Es necesario realizar examen de admisión?", a: "Sí, el examen de admisión incluye áreas académicas en español, inglés y evaluación psicométrica. El costo está incluido en la inscripción." },
  { q: "¿El Instituto cuenta con becas?", a: "Estamos incorporados a la SEP, por lo cual pueden aplicar para las becas que otorga el Gobierno y, al ser beneficiados, se realizan los descuentos sobre las colegiaturas." },
  { q: "Si tengo un hijo en primaria y otro en secundaria, ¿los puedo dejar a la misma hora?", a: "Sí, a la hora que ingresa el alumno de Secundaria, las instalaciones de primaria ya se encuentran habilitadas y bajo supervisión." },
  { q: "¿En qué grados se aplican las certificaciones de inglés?", a: "En 3º, 4º y 5º grado se les invita a realizar la certificación correspondiente. En 6º grado, todos los alumnos realizan su certificación con Cambridge Assessment English." }
]);

useHead({
  title: 'Preguntas Frecuentes | Colegios IECS-IEDIS',
  meta: [{ name: 'description', content: 'Encuentra las respuestas a las dudas más comunes sobre admisiones, horarios, metodologías y servicios.' }]
});
</script>