/* ============================================
   Home Page — Antigravity Courses
   ============================================ */

import { courseMeta, categories } from './courseData';
import Router from './router';

// ─── State ─────────────────────────────────────────────────────
const completedSet = new Set<number>(
  JSON.parse(localStorage.getItem('agy-completed') || '[]')
);

// ─── SVG Helper ────────────────────────────────────────────────
function svgIcon(innerSvg: string, size = 20): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${innerSvg}</svg>`;
}

const checkSvg = svgIcon('<polyline points="20 6 9 17 4 12"/>');

// ─── Toggle Completion ─────────────────────────────────────────
function toggleComplete(id: number, card: HTMLElement): void {
  if (completedSet.has(id)) {
    completedSet.delete(id);
    card.classList.remove('completed');
  } else {
    completedSet.add(id);
    card.classList.add('completed');
  }
  localStorage.setItem('agy-completed', JSON.stringify([...completedSet]));
  updateProgress();
}

// ─── Progress Bar ──────────────────────────────────────────────
function updateProgress(): void {
  const fill = document.getElementById('progress-fill') as HTMLElement;
  const label = document.getElementById('progress-label') as HTMLElement;
  if (!fill || !label) return;
  const pct = (completedSet.size / courseMeta.length) * 100;
  fill.style.width = `${pct}%`;
  label.textContent = `${completedSet.size} / ${courseMeta.length} completados`;
}

// ─── Render ────────────────────────────────────────────────────
export function renderHome(): void {
  const app = document.getElementById('app')!;

  app.innerHTML = `
    <canvas id="particles-canvas"></canvas>
    <div class="container">
      <!-- Header -->
      <header class="header" id="header">
        <div class="header__badge">
          ${svgIcon('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>')}
          <span>Guía de Estudio 2026</span>
        </div>
        <h1 class="header__title">
          <span class="header__title-accent">13 cursos</span> de Google Antigravity<br/>
          para aprender <span class="header__title-highlight">Desarrollo Agéntico</span>
        </h1>
        <p class="header__subtitle">
          Domina la plataforma Agent-First de Google — desde la configuración inicial hasta la orquestación multi-agente avanzada.
        </p>
        <div class="header__stats">
          <div class="stat-pill">
            ${svgIcon('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 16)}
            <span>~40 horas</span>
          </div>
          <div class="stat-pill">
            ${svgIcon('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 12 3 12 0v-5"/>', 16)}
            <span>13 módulos</span>
          </div>
          <div class="stat-pill">
            ${svgIcon('<path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>', 16)}
            <span>Hands-on Labs</span>
          </div>
        </div>
      </header>

      <!-- Progress Bar -->
      <div class="progress-bar" id="progress-bar">
        <div class="progress-bar__fill" id="progress-fill"></div>
        <span class="progress-bar__label" id="progress-label">0 / 13 completados</span>
      </div>

      <!-- Course List -->
      <!-- Learning Path Visual -->
      <div class="learning-path" id="learning-path">
        <img src="/images/learning-path-hero.png" alt="Ruta de Aprendizaje" class="learning-path__hero-img" loading="lazy" />
        <h2 class="learning-path__title">Ruta de Aprendizaje</h2>
        <div class="learning-path__track">
          ${courseMeta.map((c, i) => {
            const isComplete = completedSet.has(c.id);
            const catColors: Record<string, string> = {
              foundations: '#22c55e',
              intermediate: '#f59e0b',
              advanced: '#f56d52',
              mastery: '#ef3800',
            };
            const color = catColors[c.category] || '#345eae';
            const isLast = i === courseMeta.length - 1;
            return `
              <a href="#/course/${c.id}" class="learning-path__node ${isComplete ? 'is-complete' : ''}" style="--node-color: ${color}" title="${c.title}">
                <span class="learning-path__node-num">${isComplete ? '✓' : c.id}</span>
              </a>
              ${!isLast ? '<div class="learning-path__connector"></div>' : ''}
            `;
          }).join('')}
        </div>
        <div class="learning-path__legend">
          <span class="learning-path__legend-item"><span class="learning-path__dot" style="background:#22c55e"></span> Fundamentos</span>
          <span class="learning-path__legend-item"><span class="learning-path__dot" style="background:#f59e0b"></span> Intermedio</span>
          <span class="learning-path__legend-item"><span class="learning-path__dot" style="background:#f56d52"></span> Avanzado</span>
          <span class="learning-path__legend-item"><span class="learning-path__dot" style="background:#ef3800"></span> Maestría</span>
        </div>
      </div>

      <!-- Course List -->
      <main class="course-list" id="course-list"></main>

      <!-- Footer -->
      <footer class="footer" id="footer">
        <div class="footer__cta">
          <button class="btn btn--primary" id="btn-save">
            ${svgIcon('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>', 18)}
            <span>Guardar Roadmap</span>
          </button>
          <button class="btn btn--secondary" id="btn-share">
            ${svgIcon('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>', 18)}
            <span>Compartir</span>
          </button>
        </div>
        <p class="footer__credit">
          Diseñado por <strong>Carlos Ávila Elgueta</strong> · Powered by Google Antigravity
        </p>
      </footer>
    </div>

    <!-- Toast -->
    <div class="toast" id="toast">
      ${svgIcon('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', 18)}
      <span id="toast-message">Guardado con éxito</span>
    </div>
  `;

  renderCourseCards();
  updateProgress();
  setupScrollReveal();
  setupButtons();
  setupParticles();
}

// ─── Course Cards ──────────────────────────────────────────────
function renderCourseCards(): void {
  const list = document.getElementById('course-list')!;
  let currentCategory = '';

  courseMeta.forEach((course, index) => {
    // Category divider
    if (course.category !== currentCategory) {
      currentCategory = course.category;
      const divider = document.createElement('div');
      divider.className = 'category-divider';
      divider.style.animationDelay = `${0.6 + index * 0.06}s`;
      const catLabel = categories[currentCategory] || currentCategory;
      const [emoji, ...textParts] = catLabel.split(' ');
      divider.innerHTML = `
        <div class="category-divider__icon">${emoji}</div>
        <span class="category-divider__text">${textParts.join(' ')}</span>
        <div class="category-divider__line"></div>
      `;
      list.appendChild(divider);
    }

    // Card
    const card = document.createElement('div');
    card.className = `course-card${completedSet.has(course.id) ? ' completed' : ''}`;
    card.dataset.id = String(course.id);
    card.dataset.index = String(index);

    card.innerHTML = `
      <div class="course-card__number">
        <span>${String(course.id).padStart(2, '0')}</span>
        ${checkSvg}
      </div>
      <div class="course-card__content">
        <h3 class="course-card__title">${course.title}</h3>
        <p class="course-card__desc">${course.description}</p>
      </div>
      <div class="course-card__action">
        <div class="course-card__icon">
          ${svgIcon(course.icon)}
        </div>
        <span class="course-card__link">Ver curso →</span>
      </div>
    `;

    // Navigate to course on click
    card.addEventListener('click', (e) => {
      // Check if clicking on checkbox area (number)
      const target = e.target as HTMLElement;
      if (target.closest('.course-card__number')) {
        e.stopPropagation();
        toggleComplete(course.id, card);
        return;
      }
      Router.navigate(`/course/${course.id}`);
    });

    list.appendChild(card);
  });
}

// ─── Scroll Reveal ─────────────────────────────────────────────
function setupScrollReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const index = Number(el.dataset.index || 0);
          setTimeout(() => el.classList.add('visible'), index * 60);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.course-card').forEach((card) => observer.observe(card));
}

// ─── Toast ─────────────────────────────────────────────────────
function showToast(message: string): void {
  const toast = document.getElementById('toast')!;
  const msg = document.getElementById('toast-message')!;
  msg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── Buttons ───────────────────────────────────────────────────
function setupButtons(): void {
  document.getElementById('btn-save')?.addEventListener('click', () => {
    showToast('✨ Roadmap guardado en tu navegador');
  });

  document.getElementById('btn-share')?.addEventListener('click', async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '13 Cursos de Google Antigravity',
          text: 'Domina el desarrollo agéntico con estos 13 cursos esenciales',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('🔗 URL copiada al portapapeles');
      }
    } catch {
      showToast('🔗 URL copiada al portapapeles');
    }
  });
}

// ─── Particle Background ───────────────────────────────────────
function setupParticles(): void {
  const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;
  let animId: number;

  interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    size: number; opacity: number;
    color: string;
  }

  const particles: Particle[] = [];
  const colors = ['rgba(52, 94, 174, ', 'rgba(28, 66, 148, ', 'rgba(245, 109, 82, '];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(Math.floor(window.innerWidth / 15), 80);
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(52, 94, 174, ${(1 - dist / 120) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    createParticles();
    draw();
  });
}
