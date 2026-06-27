import './style.css';

/* ============================================
   Antigravity Courses — Interactive Infographic
   Author: Carlos Ávila Elgueta
   ============================================ */

// ─── Course Data ───────────────────────────────────────────────
interface Course {
  id: number;
  title: string;
  description: string;
  icon: string; // SVG path
  category: string;
  link: string;
}

const categories = {
  foundations: '🚀 Fundamentos',
  intermediate: '⚙️ Intermedio',
  advanced: '🔬 Avanzado',
  mastery: '🏆 Maestría',
};

const courses: Course[] = [
  {
    id: 1,
    title: 'Antigravity 2.0: Introducción a la plataforma Agent-First',
    description: 'Configuración inicial y migración del flujo clásico a la autonomía agéntica.',
    icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    category: 'foundations',
    link: 'https://lnk.in/agy-intro',
  },
  {
    id: 2,
    title: 'Editor View vs Manager View: Domina las dos superficies',
    description: 'Diferencias operativas entre escribir código directamente y delegar tareas en segundo plano.',
    icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    category: 'foundations',
    link: 'https://lnk.in/agy-views',
  },
  {
    id: 3,
    title: 'Orquestación y paralelización con Multi-Agent',
    description: 'Gestión de múltiples agentes concurrentes en diferentes ramas del repositorio.',
    icon: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/>',
    category: 'foundations',
    link: 'https://lnk.in/agy-multi',
  },
  {
    id: 4,
    title: 'Verificación con Artefactos: Planes de implementación',
    description: 'Uso de Task Lists y flujos de revisión previos a la ejecución de código.',
    icon: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
    category: 'intermediate',
    link: 'https://lnk.in/agy-artifacts',
  },
  {
    id: 5,
    title: 'Browser-in-the-Loop: Pruebas con Chrome nativo',
    description: 'Configuración del navegador embebido para pruebas visuales automáticas y grabación de logs.',
    icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/>',
    category: 'intermediate',
    link: 'https://lnk.in/agy-browser',
  },
  {
    id: 6,
    title: 'Gestión del Contexto: Evitando el Tool Bloat',
    description: 'Optimización de tokens, límites de lectura de archivos y mitigación de latencia.',
    icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    category: 'intermediate',
    link: 'https://lnk.in/agy-context',
  },
  {
    id: 7,
    title: 'Creación de Agent Skills: Especialización y directrices',
    description: 'Desarrollo de módulos de entrenamiento ligeros para estandarizar la arquitectura y seguridad.',
    icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    category: 'intermediate',
    link: 'https://lnk.in/agy-skills',
  },
  {
    id: 8,
    title: 'Antigravity CLI (agy): Automatización desde la terminal',
    description: 'Control total de agentes de mantenimiento y refactoring vía scripts locales.',
    icon: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    category: 'advanced',
    link: 'https://lnk.in/agy-cli',
  },
  {
    id: 9,
    title: 'Conexión de servidores externos mediante MCP',
    description: 'Integración de bases de datos y herramientas externas usando el Model Context Protocol.',
    icon: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    category: 'advanced',
    link: 'https://lnk.in/agy-mcp',
  },
  {
    id: 10,
    title: 'Configuración de modelos híbridos: Flexibilidad de LLMs',
    description: 'Orquestación de diferentes modelos según la complejidad o costo de la tarea.',
    icon: '<path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/><path d="m15 5 3 3"/>',
    category: 'advanced',
    link: 'https://lnk.in/agy-models',
  },
  {
    id: 11,
    title: 'Flujos de depuración agéntica: Resolución de Bugs en bucle',
    description: 'Diagnóstico autónomo, parches en sandbox y verificación cíclica de errores.',
    icon: '<path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>',
    category: 'advanced',
    link: 'https://lnk.in/agy-debug',
  },
  {
    id: 12,
    title: 'Vibe Coding: Desarrollo End-to-End',
    description: 'El flujo de trabajo actuando puramente como supervisor/arquitecto de la IA.',
    icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    category: 'mastery',
    link: 'https://lnk.in/agy-vibe',
  },
  {
    id: 13,
    title: 'Antigravity SDK & Codelabs Hub',
    description: 'Repositorio central de documentación técnica oficial de Google Developers.',
    icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    category: 'mastery',
    link: 'https://lnk.in/agy-sdk',
  },
];

// ─── State ─────────────────────────────────────────────────────
const completedSet = new Set<number>(
  JSON.parse(localStorage.getItem('agy-completed') || '[]')
);

// ─── SVG Helper ────────────────────────────────────────────────
function svgIcon(innerSvg: string, size = 20): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${innerSvg}</svg>`;
}

const checkSvg = svgIcon('<polyline points="20 6 9 17 4 12"/>');

// ─── Render Course Cards ───────────────────────────────────────
function renderCourses(): void {
  const list = document.getElementById('course-list')!;
  let currentCategory = '';

  courses.forEach((course, index) => {
    // Category divider
    if (course.category !== currentCategory) {
      currentCategory = course.category;
      const divider = document.createElement('div');
      divider.className = 'category-divider';
      divider.style.animationDelay = `${0.6 + index * 0.06}s`;
      const catLabel = categories[currentCategory as keyof typeof categories] || currentCategory;
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
        <a class="course-card__link" href="${course.link}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
          ${course.link.replace('https://', '')}
        </a>
      </div>
    `;

    // Toggle complete on click
    card.addEventListener('click', () => toggleComplete(course.id, card));

    list.appendChild(card);
  });
}

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
  const pct = (completedSet.size / courses.length) * 100;
  fill.style.width = `${pct}%`;
  label.textContent = `${completedSet.size} / ${courses.length} completados`;
}

// ─── Intersection Observer (staggered reveal) ──────────────────
function setupScrollReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const index = Number(el.dataset.index || 0);
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 60);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.course-card').forEach((card) => {
    observer.observe(card);
  });
}

// ─── Toast Notification ────────────────────────────────────────
function showToast(message: string): void {
  const toast = document.getElementById('toast')!;
  const msg = document.getElementById('toast-message')!;
  msg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── Button Handlers ───────────────────────────────────────────
function setupButtons(): void {
  document.getElementById('btn-save')?.addEventListener('click', () => {
    showToast('✨ Roadmap guardado en tu navegador');
  });

  document.getElementById('btn-share')?.addEventListener('click', async () => {
    const shareData = {
      title: '13 Cursos de Google Antigravity',
      text: 'Domina el desarrollo agéntico con estos 13 cursos esenciales de Google Antigravity',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
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
  const ctx = canvas.getContext('2d')!;
  let animId: number;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
  }

  const particles: Particle[] = [];
  const colors = [
    'rgba(52, 94, 174, ',   // primary-500
    'rgba(28, 66, 148, ',   // primary-800
    'rgba(245, 109, 82, ',  // accent-500
  ];

  function resize(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles(): void {
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

  function draw(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.fill();
    }

    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(52, 94, 174, ${alpha})`;
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

// ─── Init ──────────────────────────────────────────────────────
function init(): void {
  renderCourses();
  updateProgress();
  setupScrollReveal();
  setupButtons();
  setupParticles();
}

document.addEventListener('DOMContentLoaded', init);
