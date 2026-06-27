/* ============================================
   Course Metadata — Antigravity Courses
   ============================================ */

import type { CourseMeta } from './types';

export const categories: Record<string, string> = {
  foundations: '🚀 Fundamentos',
  intermediate: '⚙️ Intermedio',
  advanced: '🔬 Avanzado',
  mastery: '🏆 Maestría',
};

export const courseMeta: CourseMeta[] = [
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
