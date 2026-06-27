/* ============================================
   Course Detail Page — Antigravity Courses
   ============================================ */

import type { CourseContent, QuizQuestion } from './types';
import { courseMeta } from './courseData';
import Router from './router';

// Lazy-loaded course content registry
let contentRegistry: Record<number, CourseContent> = {};
let contentLoaded = false;

export async function loadAllCourseContent(): Promise<void> {
  if (contentLoaded) return;
  const [m1, m2, m3] = await Promise.all([
    import('./courses/courses01to05'),
    import('./courses/courses06to09'),
    import('./courses/courses10to13'),
  ]);
  contentRegistry = {
    ...m1.courses01to05,
    ...m2.courses06to09,
    ...m3.courses10to13,
  };
  contentLoaded = true;
}

// ─── View mode state ───────────────────────────────────────────
type ViewMode = 'simple' | 'technical';

function getViewMode(): ViewMode {
  return (localStorage.getItem('agy-view-mode') as ViewMode) || 'simple';
}

function setViewMode(mode: ViewMode): void {
  localStorage.setItem('agy-view-mode', mode);
}

// ─── Quiz state ────────────────────────────────────────────────
function getQuizState(courseId: number): Record<number, number> {
  const raw = localStorage.getItem(`agy-quiz-${courseId}`);
  return raw ? JSON.parse(raw) : {};
}

function setQuizAnswer(courseId: number, questionIndex: number, answerIndex: number): void {
  const state = getQuizState(courseId);
  state[questionIndex] = answerIndex;
  localStorage.setItem(`agy-quiz-${courseId}`, JSON.stringify(state));
}

// ─── SVG icons ─────────────────────────────────────────────────
function svg(d: string, size = 20): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
}

const icons = {
  back: svg('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'),
  clock: svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 16),
  signal: svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', 16),
  target: svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', 16),
  check: svg('<polyline points="20 6 9 17 4 12"/>', 16),
  prev: svg('<polyline points="15 18 9 12 15 6"/>'),
  next: svg('<polyline points="9 18 15 12 9 6"/>'),
  tip: svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>', 16),
  warn: svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', 16),
  bookmark: svg('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>', 16),
  simple: svg('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>', 16),
  code: svg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>', 16),
  play: svg('<polygon points="5 3 19 12 5 21 5 3"/>', 16),
  clipboard: svg('<rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>', 16),
};

const difficultyColors: Record<string, string> = {
  'Principiante': '#22c55e',
  'Intermedio': '#f59e0b',
  'Avanzado': '#f56d52',
  'Experto': '#ef3800',
};

// ─── Render ────────────────────────────────────────────────────
export async function renderCourseDetail(id: number): Promise<void> {
  const app = document.getElementById('app')!;

  // Loading state
  app.innerHTML = `
    <div class="container">
      <div class="course-detail__loading">
        <div class="loading-spinner"></div>
        <p>Cargando contenido del curso...</p>
      </div>
    </div>
  `;

  await loadAllCourseContent();

  const meta = courseMeta.find((c) => c.id === id);
  const content = contentRegistry[id];

  if (!meta || !content) {
    app.innerHTML = `
      <div class="container">
        <div class="course-detail__404">
          <h2>Curso no encontrado</h2>
          <p>El curso #${id} no existe o aún no está disponible.</p>
          <button class="btn btn--primary" onclick="window.location.hash='/'">← Volver al inicio</button>
        </div>
      </div>
    `;
    return;
  }

  const prevCourse = courseMeta.find((c) => c.id === id - 1);
  const nextCourse = courseMeta.find((c) => c.id === id + 1);
  const completedSet = new Set<number>(JSON.parse(localStorage.getItem('agy-completed') || '[]'));
  const isCompleted = completedSet.has(id);
  const currentMode = getViewMode();

  app.innerHTML = `
    <div class="container course-detail">
      <!-- Top Nav -->
      <nav class="course-detail__nav">
        <button class="course-detail__back" id="btn-back">
          ${icons.back}
          <span>Todos los cursos</span>
        </button>
        <div class="course-detail__nav-right">
          <span class="course-detail__counter">${id} / ${courseMeta.length}</span>
        </div>
      </nav>

      <!-- Hero -->
      <header class="course-detail__hero">
        <div class="course-detail__number-badge">
          <span>${String(id).padStart(2, '0')}</span>
        </div>
        <h1 class="course-detail__title">${meta.title}</h1>
        <p class="course-detail__desc">${meta.description}</p>

        <div class="course-detail__meta">
          <div class="course-detail__meta-pill">
            ${icons.clock}
            <span>${content.estimatedTime}</span>
          </div>
          <div class="course-detail__meta-pill" style="border-color: ${difficultyColors[content.difficulty]}40; color: ${difficultyColors[content.difficulty]}">
            ${icons.signal}
            <span>${content.difficulty}</span>
          </div>
          <div class="course-detail__meta-pill">
            ${icons.target}
            <span>${content.sections.length} secciones</span>
          </div>
          <button class="course-detail__meta-pill course-detail__complete-btn ${isCompleted ? 'is-completed' : ''}" id="btn-complete-course">
            ${icons.check}
            <span>${isCompleted ? 'Completado ✓' : 'Marcar completado'}</span>
          </button>
        </div>
      </header>

      <!-- View Mode Toggle -->
      <div class="view-toggle" id="view-toggle">
        <button class="view-toggle__btn ${currentMode === 'simple' ? 'active' : ''}" data-mode="simple">
          ${icons.simple}
          <span>Modo Simple</span>
        </button>
        <button class="view-toggle__btn ${currentMode === 'technical' ? 'active' : ''}" data-mode="technical">
          ${icons.code}
          <span>Modo Técnico</span>
        </button>
        <div class="view-toggle__slider"></div>
      </div>

      <!-- Simple Summary (visible in simple mode) -->
      ${content.simpleSummary ? `
      <div class="simple-summary ${currentMode === 'simple' ? 'is-visible' : ''}" id="simple-summary">
        <div class="simple-summary__icon">💡</div>
        <div>
          <strong>¿De qué va este curso?</strong>
          <p>${content.simpleSummary}</p>
        </div>
      </div>
      ` : ''}

      <!-- Objectives -->
      <section class="course-detail__objectives">
        <h2 class="course-detail__section-label">
          ${icons.target}
          Objetivos de aprendizaje
        </h2>
        <ul class="course-detail__obj-list">
          ${content.objectives.map((o) => `<li>${o}</li>`).join('')}
        </ul>
      </section>

      ${content.prerequisites && content.prerequisites.length > 0 ? `
      <section class="course-detail__prereqs">
        <h2 class="course-detail__section-label">
          ${icons.bookmark}
          Prerequisitos
        </h2>
        <ul class="course-detail__obj-list course-detail__obj-list--prereq">
          ${content.prerequisites.map((p) => `<li>${p}</li>`).join('')}
        </ul>
      </section>
      ` : ''}

      <!-- Table of Contents -->
      <nav class="course-detail__toc">
        <h2 class="course-detail__section-label">Contenido del curso</h2>
        <ol class="course-detail__toc-list">
          ${content.sections.map((s, i) => `
            <li>
              <a href="#section-${s.id}" class="course-detail__toc-link">
                <span class="course-detail__toc-num">${String(i + 1).padStart(2, '0')}</span>
                <span>${s.title}</span>
              </a>
            </li>
          `).join('')}
          <li>
            <a href="#section-quiz" class="course-detail__toc-link course-detail__toc-link--quiz">
              <span class="course-detail__toc-num">📝</span>
              <span>Quiz de comprensión</span>
            </a>
          </li>
        </ol>
      </nav>

      <!-- Sections -->
      <div class="course-detail__sections">
        ${content.sections.map((section, i) => `
          <section class="course-detail__section" id="section-${section.id}">
            <div class="course-detail__section-header">
              <span class="course-detail__section-num">${String(i + 1).padStart(2, '0')}</span>
              <h2 class="course-detail__section-title">${section.title}</h2>
            </div>

            <!-- Technical content -->
            <div class="course-detail__section-body section-content--technical ${currentMode === 'technical' ? 'is-visible' : ''}">
              ${section.content}
            </div>

            <!-- Simple content -->
            ${section.simpleContent ? `
            <div class="course-detail__section-body section-content--simple ${currentMode === 'simple' ? 'is-visible' : ''}">
              ${section.simpleContent}
            </div>
            ` : `
            <div class="course-detail__section-body section-content--simple ${currentMode === 'simple' ? 'is-visible' : ''}">
              ${section.content}
            </div>
            `}

            ${section.tip ? `
              <div class="course-detail__callout course-detail__callout--tip">
                <div class="course-detail__callout-icon">${icons.tip}</div>
                <div>
                  <strong>Tip</strong>
                  <p>${section.tip}</p>
                </div>
              </div>
            ` : ''}

            ${section.warning ? `
              <div class="course-detail__callout course-detail__callout--warning">
                <div class="course-detail__callout-icon">${icons.warn}</div>
                <div>
                  <strong>Advertencia</strong>
                  <p>${section.warning}</p>
                </div>
              </div>
            ` : ''}

            ${section.exercise ? `
              <div class="exercise-block">
                <div class="exercise-block__header">
                  ${icons.play}
                  <strong>Inténtalo tú</strong>
                </div>
                <div class="exercise-block__body">
                  ${section.exercise}
                </div>
              </div>
            ` : ''}
          </section>
        `).join('')}
      </div>

      <!-- Quiz Section -->
      ${content.quiz && content.quiz.length > 0 ? renderQuizSection(id, content.quiz) : ''}

      <!-- Key Takeaways -->
      <section class="course-detail__takeaways">
        <h2 class="course-detail__section-label">
          ${icons.check}
          Conclusiones Clave
        </h2>
        <ul class="course-detail__takeaway-list">
          ${content.keyTakeaways.map((t) => `<li>${t}</li>`).join('')}
        </ul>
      </section>

      <!-- Prev/Next Navigation -->
      <nav class="course-detail__pagination">
        ${prevCourse ? `
          <a class="course-detail__page-btn course-detail__page-btn--prev" href="#/course/${prevCourse.id}">
            ${icons.prev}
            <div>
              <span class="course-detail__page-label">Anterior</span>
              <span class="course-detail__page-title">${prevCourse.title}</span>
            </div>
          </a>
        ` : '<div></div>'}
        ${nextCourse ? `
          <a class="course-detail__page-btn course-detail__page-btn--next" href="#/course/${nextCourse.id}">
            <div>
              <span class="course-detail__page-label">Siguiente</span>
              <span class="course-detail__page-title">${nextCourse.title}</span>
            </div>
            ${icons.next}
          </a>
        ` : '<div></div>'}
      </nav>

      <!-- Footer -->
      <footer class="footer" style="animation-delay: 0.2s">
        <p class="footer__credit">
          Diseñado por <strong>Cristian Avila Cisternas</strong> · by <strong>Tecknologia Spa</strong> · Powered by Google Antigravity
        </p>
      </footer>
    </div>
  `;

  // ─── Event Handlers ───────────────────────
  setupDetailEvents(id, content);
}

// ─── Quiz Renderer ─────────────────────────────────────────────
function renderQuizSection(courseId: number, questions: QuizQuestion[]): string {
  const quizState = getQuizState(courseId);

  return `
    <section class="quiz-section" id="section-quiz">
      <div class="quiz-section__header">
        <h2 class="course-detail__section-label">
          📝 Quiz de comprensión
        </h2>
        <p class="quiz-section__subtitle">Valida que has entendido los conceptos clave del curso.</p>
      </div>

      <div class="quiz-section__questions">
        ${questions.map((q, qi) => {
          const answered = quizState[qi] !== undefined;
          const selectedIdx = quizState[qi];
          const isCorrect = answered && selectedIdx === q.correctIndex;

          return `
            <div class="quiz-card ${answered ? (isCorrect ? 'quiz-card--correct' : 'quiz-card--wrong') : ''}" data-question="${qi}">
              <div class="quiz-card__number">${qi + 1}</div>
              <p class="quiz-card__question">${q.question}</p>
              <div class="quiz-card__options">
                ${q.options.map((opt, oi) => `
                  <button class="quiz-option ${answered && oi === q.correctIndex ? 'quiz-option--correct' : ''} ${answered && oi === selectedIdx && oi !== q.correctIndex ? 'quiz-option--wrong' : ''} ${answered ? 'quiz-option--disabled' : ''}"
                    data-question="${qi}" data-option="${oi}" ${answered ? 'disabled' : ''}>
                    <span class="quiz-option__letter">${String.fromCharCode(65 + oi)}</span>
                    <span>${opt}</span>
                  </button>
                `).join('')}
              </div>
              ${answered ? `
                <div class="quiz-card__explanation ${isCorrect ? 'quiz-card__explanation--correct' : 'quiz-card__explanation--wrong'}">
                  <strong>${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}</strong>
                  <p>${q.explanation}</p>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>

      <div class="quiz-section__score" id="quiz-score">
        ${Object.keys(quizState).length === questions.length ? `
          <div class="quiz-score-card">
            <span class="quiz-score-card__emoji">${Object.values(quizState).filter((v, i) => v === questions[i].correctIndex).length === questions.length ? '🏆' : '📊'}</span>
            <span class="quiz-score-card__text">
              ${Object.values(quizState).filter((v, i) => v === questions[i].correctIndex).length} / ${questions.length} respuestas correctas
            </span>
          </div>
        ` : ''}
      </div>
    </section>
  `;
}

// ─── Event Setup ───────────────────────────────────────────────
function setupDetailEvents(id: number, content: CourseContent): void {
  // Back button
  document.getElementById('btn-back')?.addEventListener('click', () => Router.navigate('/'));

  // Complete button
  const completedSet = new Set<number>(JSON.parse(localStorage.getItem('agy-completed') || '[]'));
  document.getElementById('btn-complete-course')?.addEventListener('click', () => {
    const btn = document.getElementById('btn-complete-course')!;
    if (completedSet.has(id)) {
      completedSet.delete(id);
      btn.classList.remove('is-completed');
      btn.querySelector('span')!.textContent = 'Marcar completado';
    } else {
      completedSet.add(id);
      btn.classList.add('is-completed');
      btn.querySelector('span')!.textContent = 'Completado ✓';
    }
    localStorage.setItem('agy-completed', JSON.stringify([...completedSet]));
  });

  // View mode toggle
  document.querySelectorAll('.view-toggle__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = (btn as HTMLElement).dataset.mode as ViewMode;
      setViewMode(mode);

      // Update toggle active state
      document.querySelectorAll('.view-toggle__btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Toggle content visibility
      document.querySelectorAll('.section-content--technical').forEach((el) => {
        el.classList.toggle('is-visible', mode === 'technical');
      });
      document.querySelectorAll('.section-content--simple').forEach((el) => {
        el.classList.toggle('is-visible', mode === 'simple');
      });

      // Toggle simple summary
      const summary = document.getElementById('simple-summary');
      if (summary) summary.classList.toggle('is-visible', mode === 'simple');
    });
  });

  // TOC smooth scroll
  document.querySelectorAll('.course-detail__toc-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (link as HTMLAnchorElement).getAttribute('href')!;
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Quiz options
  document.querySelectorAll('.quiz-option:not(.quiz-option--disabled)').forEach((btn) => {
    btn.addEventListener('click', () => {
      const el = btn as HTMLElement;
      const qi = parseInt(el.dataset.question!, 10);
      const oi = parseInt(el.dataset.option!, 10);

      setQuizAnswer(id, qi, oi);

      // Re-render the quiz section to show results
      const quizSection = document.getElementById('section-quiz');
      if (quizSection) {
        quizSection.outerHTML = renderQuizSection(id, content.quiz);
        // Re-attach quiz listeners
        attachQuizListeners(id, content);
      }
    });
  });

  // Copy exercise prompts
  document.querySelectorAll('.exercise-code').forEach((block) => {
    block.addEventListener('click', async () => {
      const text = block.textContent?.replace(/^"|"$/g, '').trim() || '';
      try {
        await navigator.clipboard.writeText(text);
        block.classList.add('copied');
        setTimeout(() => block.classList.remove('copied'), 1500);
      } catch {
        // Fallback — select the text
        const range = document.createRange();
        range.selectNodeContents(block);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    });
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Scroll-reveal sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.course-detail__section, .quiz-card').forEach((s) => observer.observe(s));
}

function attachQuizListeners(id: number, content: CourseContent): void {
  document.querySelectorAll('.quiz-option:not(.quiz-option--disabled)').forEach((btn) => {
    btn.addEventListener('click', () => {
      const el = btn as HTMLElement;
      const qi = parseInt(el.dataset.question!, 10);
      const oi = parseInt(el.dataset.option!, 10);
      setQuizAnswer(id, qi, oi);
      const quizSection = document.getElementById('section-quiz');
      if (quizSection) {
        quizSection.outerHTML = renderQuizSection(id, content.quiz);
        attachQuizListeners(id, content);
      }
    });
  });
}
