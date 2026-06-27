/* ============================================
   Courses 06–09 — Detailed Educational Content
   Google Antigravity Academy
   ============================================ */

import type { CourseContent } from '../types';

export const courses06to09: Record<number, CourseContent> = {
  /* ──────────────────────────────────────────────
     Course 6 — Gestión del Contexto
     ────────────────────────────────────────────── */
  6: {
    id: 6,
    objectives: [
      'Comprender cómo funciona la ventana de contexto y sus límites prácticos',
      'Aplicar estrategias de lectura eficiente para minimizar tokens consumidos',
      'Diagnosticar y mitigar problemas de latencia por sobrecarga de herramientas',
      'Implementar patrones de chunked reading para archivos grandes',
    ],
    prerequisites: [
      'Curso 1: Introducción a la plataforma Agent-First',
      'Curso 2: Editor View vs Manager View',
    ],
    estimatedTime: '3 horas',
    difficulty: 'Intermedio',
    sections: [
      {
        id: 'ctx-problem',
        title: 'El problema del contexto',
        content: `
<p>Cada interacción con un agente de Antigravity consume <strong>tokens de contexto</strong>. Estos tokens representan tanto las instrucciones del sistema, el historial de la conversación, los resultados de herramientas, como tu propio prompt. A medida que una sesión avanza, el contexto crece y puede saturar la <em>ventana de tokens</em> disponible.</p>

<p>El <strong>tool bloat</strong> ocurre cuando un agente invoca herramientas de forma indiscriminada — por ejemplo, leyendo archivos completos de miles de líneas cuando solo necesita unas pocas, o ejecutando búsquedas amplias que retornan decenas de resultados irrelevantes. Esto consume tokens valiosos y degrada la calidad de las respuestas.</p>

<ul>
  <li><strong>Saturación de contexto</strong>: el agente pierde de vista instrucciones anteriores al llenarse la ventana.</li>
  <li><strong>Latencia excesiva</strong>: más tokens = más tiempo de procesamiento por turno.</li>
  <li><strong>Pérdida de coherencia</strong>: la información relevante queda "enterrada" entre datos irrelevantes.</li>
  <li><strong>Costos incrementados</strong>: cada token procesado tiene un costo computacional real.</li>
</ul>

<p>La clave es ser <strong>quirúrgico</strong>: obtener exactamente la información necesaria, en la cantidad mínima, con la herramienta más precisa disponible.</p>
`,
        warning: 'Un solo archivo de 2000 líneas puede consumir el 40% de tu ventana de contexto. Siempre usa rangos de líneas específicos.',
      },
      {
        id: 'ctx-window',
        title: 'Ventana de tokens y su gestión',
        content: `
<p>La <strong>ventana de contexto</strong> de Antigravity es el espacio total de tokens que el modelo puede procesar en una sola invocación. Este espacio es compartido entre:</p>

<ol>
  <li><strong>System prompt</strong>: instrucciones base, skills cargados, reglas del usuario (~15-25% del total).</li>
  <li><strong>Historial de conversación</strong>: mensajes previos, resultados de herramientas (~40-60%).</li>
  <li><strong>Prompt actual</strong>: tu solicitud y metadatos adjuntos (~5-10%).</li>
  <li><strong>Respuesta del modelo</strong>: espacio reservado para la generación (~20-30%).</li>
</ol>

<p>Cuando el historial excede la capacidad, Antigravity aplica <strong>truncamiento automático</strong>: los pasos más antiguos se comprimen o eliminan. Esto significa que instrucciones importantes dadas al inicio pueden perderse.</p>

<pre><code class="language-text">┌─────────────────────────────────────────────┐
│           Ventana de Contexto Total          │
├──────────┬──────────────┬──────┬─────────────┤
│  System  │  Historial   │Prompt│  Respuesta  │
│  ~20%    │    ~50%      │ ~5%  │    ~25%     │
└──────────┴──────────────┴──────┴─────────────┘
</code></pre>

<p>Para gestionar esto eficientemente, debes <strong>minimizar el tamaño del historial</strong> usando herramientas de lectura con rangos específicos y evitando operaciones que devuelvan grandes volúmenes de texto innecesario.</p>
`,
        tip: 'Puedes verificar si tu contexto se está truncando revisando los transcripts en ~/.gemini/antigravity/brain/<conversation-id>/.system_generated/logs/transcript.jsonl — busca campos is_truncated: true.',
      },
      {
        id: 'ctx-strategies',
        title: 'Estrategias de optimización',
        content: `
<p>Las siguientes estrategias te ayudarán a mantener un uso eficiente del contexto en sesiones largas:</p>

<h4>1. Lectura con rangos específicos</h4>
<p>Nunca leas un archivo completo si solo necesitas una función o bloque específico. Usa <code>StartLine</code> y <code>EndLine</code> para extraer solo lo necesario:</p>

<pre><code class="language-typescript">// ❌ MAL: Lee las primeras 800 líneas del archivo
view_file({ AbsolutePath: "/src/main.ts" })

// ✅ BIEN: Lee solo la función que necesitas (líneas 45-72)
view_file({
  AbsolutePath: "/src/main.ts",
  StartLine: 45,
  EndLine: 72
})
</code></pre>

<h4>2. Búsqueda antes de lectura</h4>
<p>Usa <code>grep_search</code> para localizar exactamente dónde está lo que buscas antes de leer:</p>

<pre><code class="language-typescript">// Primero: encuentra dónde está la función
grep_search({
  Query: "function renderCourse",
  SearchPath: "/src",
  MatchPerLine: true
})
// Resultado: /src/main.ts:156 → ahora lee solo ese rango
view_file({ AbsolutePath: "/src/main.ts", StartLine: 150, EndLine: 190 })
</code></pre>

<h4>3. Descubrimiento con list_dir</h4>
<p>Antes de buscar en todo el proyecto, usa <code>list_dir</code> para entender la estructura:</p>

<pre><code class="language-typescript">list_dir({ DirectoryPath: "/src" })
// Output: main.ts (15KB), types.ts (800B), router.ts (1.5KB)
// → Ahora sabes exactamente en qué archivo buscar
</code></pre>

<h4>4. Subagentes para tareas largas</h4>
<p>Delega investigaciones extensas a subagentes. Cada subagente tiene su propia ventana de contexto limpia.</p>
`,
        tip: 'La regla de oro: si no necesitas ver más de 50 líneas, probablemente no necesitas leer más de 50 líneas.',
      },
      {
        id: 'ctx-file-reading',
        title: 'Lectura eficiente de archivos',
        content: `
<p>La herramienta <code>view_file</code> permite leer hasta 800 líneas por invocación. Para archivos más grandes, necesitas un patrón de <strong>lectura chunked</strong> (por bloques):</p>

<pre><code class="language-typescript">// Patrón de lectura chunked para archivos grandes
// Paso 1: Lee el inicio para entender la estructura
view_file({
  AbsolutePath: "/src/components/Dashboard.tsx",
  StartLine: 1,
  EndLine: 50  // Solo imports y declaraciones
})

// Paso 2: Busca el bloque específico que necesitas
grep_search({
  Query: "export function Dashboard",
  SearchPath: "/src/components/Dashboard.tsx",
  MatchPerLine: true
})

// Paso 3: Lee solo el componente relevante
view_file({
  AbsolutePath: "/src/components/Dashboard.tsx",
  StartLine: 127,
  EndLine: 210
})
</code></pre>

<p>Para archivos de configuración o datos, el patrón es diferente — generalmente son más pequeños y se pueden leer completos:</p>

<pre><code class="language-typescript">// Archivos pequeños: lectura completa es aceptable
view_file({ AbsolutePath: "/tsconfig.json" })       // ~25 líneas
view_file({ AbsolutePath: "/package.json" })         // ~40 líneas
view_file({ AbsolutePath: "/.env.example" })         // ~15 líneas
</code></pre>

<p>También puedes usar <code>grep_search</code> con el parámetro <code>Includes</code> para filtrar por tipo de archivo, evitando buscar en directorios como <code>node_modules</code> o <code>dist</code>:</p>

<pre><code class="language-typescript">grep_search({
  Query: "CourseContent",
  SearchPath: "/src",
  Includes: ["*.ts", "*.tsx"],  // Solo TypeScript
  MatchPerLine: true
})
</code></pre>
`,
        warning: 'Nunca leas node_modules, dist, o .git. Estos directorios pueden contener miles de archivos y saturarán tu contexto instantáneamente.',
      },
      {
        id: 'ctx-latency',
        title: 'Mitigación de latencia',
        content: `
<p>La latencia en Antigravity tiene dos componentes principales: el <strong>tiempo de inferencia</strong> del modelo (proporcional a los tokens) y el <strong>tiempo de ejecución</strong> de herramientas. Ambos se pueden optimizar:</p>

<h4>Reducción de tokens por turno</h4>
<ul>
  <li>Usa <code>grep_search</code> con <code>MatchPerLine: false</code> cuando solo necesitas saber <em>en qué archivo</em> está algo, sin ver el contenido.</li>
  <li>Prefiere <code>list_dir</code> sobre búsquedas recursivas para descubrir la estructura del proyecto.</li>
  <li>Evita leer el mismo archivo múltiples veces — extrae toda la información necesaria en una sola lectura con un rango amplio.</li>
</ul>

<h4>Paralelización de llamadas</h4>
<p>Cuando las herramientas no dependen entre sí, invócalas en paralelo:</p>

<pre><code class="language-typescript">// ✅ BIEN: Llamadas independientes en paralelo
// (Antigravity ejecuta ambas simultáneamente)
view_file({ AbsolutePath: "/src/types.ts" })
view_file({ AbsolutePath: "/src/router.ts" })

// ❌ MAL: Llamadas secuenciales innecesarias
// Turno 1: view_file({ AbsolutePath: "/src/types.ts" })
// Turno 2: view_file({ AbsolutePath: "/src/router.ts" })
</code></pre>

<h4>Delegación a subagentes</h4>
<p>Para tareas de investigación extensas, los subagentes son ideales porque:</p>
<ul>
  <li>Cada subagente obtiene una ventana de contexto <strong>limpia</strong>.</li>
  <li>Múltiples subagentes pueden trabajar en <strong>paralelo</strong>.</li>
  <li>Solo el <strong>resultado final</strong> se envía al agente principal, ahorrando tokens.</li>
</ul>

<pre><code class="language-typescript">invoke_subagent({
  Subagents: [{
    TypeName: "self",
    Role: "Investigador de dependencias",
    Prompt: "Analiza package.json y lista todas las dependencias \
             que están desactualizadas. Reporta solo las que tienen \
             actualizaciones de seguridad pendientes."
  }]
})
</code></pre>
`,
        tip: 'Si una sesión se vuelve lenta, considera iniciar una nueva conversación con instrucciones claras de lo que necesitas. Un contexto limpio = respuestas más rápidas.',
      },
    ],
    keyTakeaways: [
      'El tool bloat es el enemigo #1 de la productividad agéntica — siempre sé quirúrgico con las herramientas',
      'Usa grep_search + view_file con rangos para minimizar tokens consumidos',
      'Delega investigaciones extensas a subagentes con contexto limpio',
      'Paraleliza llamadas de herramientas independientes para reducir latencia',
      'Nunca leas archivos completos a menos que sean configuraciones pequeñas (<50 líneas)',
    ],
  },

  /* ──────────────────────────────────────────────
     Course 7 — Creación de Agent Skills
     ────────────────────────────────────────────── */
  7: {
    id: 7,
    objectives: [
      'Entender la anatomía completa de un Agent Skill y su ciclo de vida',
      'Crear archivos SKILL.md con frontmatter YAML válido y triggers precisos',
      'Organizar directorios de skills con scripts, ejemplos y recursos',
      'Registrar skills en ubicaciones no estándar mediante skills.json',
      'Desarrollar skills avanzados con scripts de automatización',
    ],
    prerequisites: [
      'Curso 1: Introducción a la plataforma Agent-First',
      'Curso 6: Gestión del Contexto',
    ],
    estimatedTime: '4 horas',
    difficulty: 'Avanzado',
    sections: [
      {
        id: 'skill-anatomy',
        title: 'Anatomía de un Skill',
        content: `
<p>Un <strong>Agent Skill</strong> en Antigravity es un módulo de instrucciones especializadas que extiende las capacidades del agente para tareas específicas. A diferencia de un plugin o extensión de código, un skill es un <strong>paquete de conocimiento declarativo</strong> que el agente carga dinámicamente cuando detecta que es relevante para la tarea actual.</p>

<p>La estructura mínima de un skill es:</p>

<pre><code class="language-text">.agents/skills/mi-skill/
└── SKILL.md          # Archivo principal (obligatorio)
</code></pre>

<p>Un skill más complejo puede incluir directorios adicionales:</p>

<pre><code class="language-text">.agents/skills/deploy-automation/
├── SKILL.md              # Instrucciones principales
├── scripts/
│   ├── validate.sh       # Script de validación
│   └── deploy.py         # Script de deployment
├── examples/
│   └── production.yaml   # Ejemplo de configuración
├── resources/
│   └── template.json     # Templates reutilizables
└── references/
    └── api-docs.md       # Documentación extendida
</code></pre>

<p>Los skills se descubren automáticamente desde dos raíces de personalización:</p>
<ul>
  <li><strong>Global</strong>: <code>~/.gemini/config/skills/</code> — se aplican a todos los workspaces.</li>
  <li><strong>Workspace</strong>: <code>.agents/skills/</code> — específicos del proyecto actual.</li>
</ul>

<p>El agente evalúa el <code>name</code> y <code>description</code> del frontmatter para decidir si un skill es relevante. Si lo es, lee el contenido completo del SKILL.md y sigue sus instrucciones.</p>
`,
        tip: 'Coloca skills genéricos (seguridad, design system, convenciones de código) en la raíz global, y skills específicos del proyecto en .agents/skills/.',
      },
      {
        id: 'skill-md-structure',
        title: 'Estructura del SKILL.md',
        content: `
<p>El archivo <code>SKILL.md</code> es el corazón de todo skill. Combina <strong>frontmatter YAML</strong> para metadatos con <strong>instrucciones en Markdown</strong> para el agente:</p>

<pre><code class="language-yaml">---
name: "Firebase Security Hardening"
description: >
  Guía de seguridad para aplicaciones Firebase.
  Cubre Firestore rules, Authentication, y Storage.
  LEER cuando se trabaje con Firebase o seguridad.
---

# Firebase Security Hardening

## Reglas Obligatorias

1. **Deny-by-default**: Todas las reglas de Firestore deben
   comenzar con \`match /{document=**} { allow read, write: if false; }\`

2. **Validación de inputs**: Todo dato del usuario debe
   validarse en las security rules, no solo en el cliente.

## Ejemplo de Reglas Seguras

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Deny all by default
    match /{document=**} {
      allow read, write: if false;
    }
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null
        &amp;&amp; request.auth.uid == userId;
    }
  }
}
\`\`\`

## Checklist Pre-Deploy
- [ ] Rules testeadas con emulador
- [ ] No hay \`allow read, write: if true\`
- [ ] Validación de tipos en rules
</code></pre>

<p>Mantén el SKILL.md por debajo de <strong>500 líneas</strong>. Para documentación extensa, usa el directorio <code>references/</code> y referencia los archivos desde el SKILL.md.</p>
`,
        warning: 'El frontmatter YAML es lo ÚNICO que el agente evalúa para decidir si activar el skill. Si el name o description son vagos, el skill podría no activarse cuando se necesita.',
      },
      {
        id: 'skill-frontmatter',
        title: 'Frontmatter y triggers de activación',
        content: `
<p>El <strong>frontmatter YAML</strong> tiene dos campos obligatorios que actúan como disparadores (<em>triggers</em>) del skill:</p>

<pre><code class="language-yaml">---
name: "Docker DevOps Cloud-Native"     # Nombre descriptivo
description: >                          # Descripción detallada
  Skill maestra para crear contenedores listos para producción
  (ultra-livianos) e integrar CI/CD automatizado en Google Cloud.
  LEER cuando se trabaje con Docker, Cloud Run, o CI/CD.
---
</code></pre>

<p>Las mejores prácticas para triggers efectivos son:</p>

<ul>
  <li><strong>name</strong>: Usa un nombre específico y descriptivo. "Deploy Helper" es malo; "Docker &amp; DevOps Cloud-Native" es bueno.</li>
  <li><strong>description</strong>: Incluye palabras clave que el agente pueda matchear contra la tarea del usuario.</li>
  <li><strong>Indicador LEER</strong>: Termina la descripción con "LEER cuando..." seguido de los escenarios de activación.</li>
</ul>

<p>Ejemplos de triggers bien diseñados:</p>

<pre><code class="language-yaml"># ✅ BUENO: Específico, con keywords y escenarios claros
---
name: "FastAPI + React Security &amp; Production Hardening"
description: >
  Guía de seguridad y producción para apps FastAPI + React/Vite
  + Firebase Hosting + Cloud Run. Basada en auditoría OWASP Top 10.
  Incluye security headers, CORS, upload limits, filename sanitization.
  LEER SIEMPRE al crear o deployar apps con este stack.
---

# ❌ MALO: Genérico, sin keywords
---
name: "Security"
description: "Guía de seguridad general."
---
</code></pre>

<p>El agente realiza un <strong>matching semántico</strong> entre la tarea del usuario y el name/description. Cuanto más específico seas, mejor será la activación selectiva del skill.</p>
`,
        tip: 'Incluye el nombre de las tecnologías exactas en la descripción (Firebase, FastAPI, Docker, etc.). El matching semántico funciona mejor con términos técnicos específicos.',
      },
      {
        id: 'skill-directories',
        title: 'Organización de directorios',
        content: `
<p>La estructura de directorios de un skill sigue una convención clara. Cada directorio tiene un propósito específico:</p>

<pre><code class="language-text">.agents/skills/gcp-cloudrun-deploy/
├── SKILL.md                    # Instrucciones (obligatorio, &lt;500 líneas)
├── scripts/
│   ├── build-and-push.sh       # Build &amp; push a Artifact Registry
│   ├── deploy-service.sh       # Deploy a Cloud Run
│   └── health-check.py         # Verificación post-deploy
├── examples/
│   ├── Dockerfile.production   # Dockerfile optimizado
│   ├── cloudbuild.yaml         # Config de Cloud Build
│   └── service.yaml            # Service descriptor
├── resources/
│   ├── nginx.conf              # Config de reverse proxy
│   └── .dockerignore           # Template de dockerignore
└── references/
    ├── cloud-run-limits.md     # Límites y quotas
    └── troubleshooting.md      # Errores comunes
</code></pre>

<p>Las convenciones para cada directorio:</p>

<ul>
  <li><strong>scripts/</strong>: Scripts ejecutables que el agente puede invocar con <code>run_command</code>. Siempre incluye shebang y permisos de ejecución.</li>
  <li><strong>examples/</strong>: Implementaciones de referencia que el agente usa como plantilla. Son archivos completos y funcionales.</li>
  <li><strong>resources/</strong>: Assets, templates, o archivos de configuración que el skill necesita durante la ejecución.</li>
  <li><strong>references/</strong>: Documentación extendida que el agente lee <em>bajo demanda</em> cuando el SKILL.md no cubre un caso.</li>
</ul>

<p>Para registrar skills en ubicaciones no estándar, crea un archivo <code>skills.json</code>:</p>

<pre><code class="language-json">{
  "entries": [
    { "path": "../shared-team-skills" },
    { "path": "/absolute/path/to/org-skills" }
  ],
  "inherits": [
    { "path": "../team-config/skills.json" }
  ],
  "exclude": ["deprecated-skill", "experimental-feature"]
}
</code></pre>
`,
        warning: 'Siempre obtén confirmación explícita del usuario antes de modificar skills compartidos (team skills). Cambios accidentales pueden afectar a todo el equipo.',
      },
      {
        id: 'skill-advanced',
        title: 'Skills avanzados con scripts',
        content: `
<p>Los skills más poderosos combinan instrucciones declarativas con <strong>scripts ejecutables</strong> que el agente puede invocar automáticamente. Veamos un ejemplo completo de un skill de setup de proyecto:</p>

<pre><code class="language-markdown">---
name: "Project Bootstrap Scaffolder"
description: >
  Skill de ejecución para arrancar un proyecto desde CERO.
  Automatiza la creación de la base, lectura del Token Vault
  e inyección de secretos al .env.local.
  LEER cuando se inicie un proyecto nuevo.
---

# Project Bootstrap Scaffolder

## Flujo de Ejecución

1. Leer \`scripts/scaffold.sh\` y ejecutarlo
2. Verificar que el proyecto compila
3. Inyectar variables de entorno desde Token Vault

## Verificación Post-Setup

Ejecutar el script de validación:
\`\`\`bash
bash scripts/validate.sh
\`\`\`
</code></pre>

<p>El script asociado <code>scripts/scaffold.sh</code>:</p>

<pre><code class="language-bash">#!/bin/bash
set -euo pipefail

PROJECT_NAME="\${1:?Uso: scaffold.sh &lt;nombre-proyecto&gt;}"

echo "🚀 Creando proyecto: $PROJECT_NAME"

# Crear estructura base
mkdir -p src/{components,hooks,services,types,utils}
mkdir -p public/assets

# Inicializar package.json
cat &gt; package.json &lt;&lt;EOF
{
  "name": "$PROJECT_NAME",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc &amp;&amp; vite build",
    "preview": "vite preview"
  }
}
EOF

echo "✅ Proyecto $PROJECT_NAME creado exitosamente"
</code></pre>

<p>Las reglas para scripts dentro de skills:</p>
<ul>
  <li>Siempre usa <code>set -euo pipefail</code> en scripts bash para fallar temprano.</li>
  <li>Incluye mensajes de progreso con emojis para feedback visual.</li>
  <li>Valida parámetros de entrada con mensajes de uso claros.</li>
  <li>Los scripts Python deben incluir un <code>requirements.txt</code> en el directorio del skill.</li>
</ul>

<p>Referencia el skill desde <code>AGENTS.md</code> para que siempre esté disponible:</p>

<pre><code class="language-markdown"># AGENTS.md

## Skills Obligatorios
- Siempre leer el skill \`design-system\` antes de crear interfaces.
- Siempre leer el skill \`security-hardening\` antes de deployar.
</code></pre>
`,
        tip: 'Los skills con scripts son especialmente útiles para tareas repetitivas como setup de proyectos, auditorías de seguridad, y deployments. Automatiza todo lo que hagas más de dos veces.',
      },
    ],
    keyTakeaways: [
      'Un skill es un paquete de conocimiento declarativo — instrucciones, no código ejecutable (los scripts son opcionales)',
      'El SKILL.md debe tener frontmatter YAML con name y description específicos para activar triggers correctos',
      'Usa la convención de directorios: scripts/, examples/, resources/, references/',
      'Registra skills de ubicaciones no estándar con skills.json',
      'Mantén el SKILL.md bajo 500 líneas y delega documentación extensa a references/',
    ],
  },

  /* ──────────────────────────────────────────────
     Course 8 — Antigravity CLI (agy)
     ────────────────────────────────────────────── */
  8: {
    id: 8,
    objectives: [
      'Dominar los comandos principales del CLI agy para automatización',
      'Crear scripts de shell que integren agy para tareas repetitivas',
      'Configurar tareas de mantenimiento automatizadas con cron',
      'Integrar agy en pipelines de CI/CD con GitHub Actions',
    ],
    prerequisites: [
      'Curso 1: Introducción a la plataforma Agent-First',
      'Curso 6: Gestión del Contexto',
      'Experiencia básica con terminal y shell scripting',
    ],
    estimatedTime: '3.5 horas',
    difficulty: 'Avanzado',
    sections: [
      {
        id: 'cli-intro',
        title: 'Introducción al CLI',
        content: `
<p>El <strong>Antigravity CLI</strong> (<code>agy</code>) es la interfaz de línea de comandos que permite controlar agentes de Antigravity directamente desde tu terminal. A diferencia de la interfaz visual del editor, el CLI está diseñado para <strong>automatización</strong>, <strong>scripting</strong>, y <strong>ejecución headless</strong> (sin interfaz gráfica).</p>

<p>Casos de uso principales del CLI:</p>

<ul>
  <li><strong>Mantenimiento automatizado</strong>: actualización de dependencias, limpieza de código, auditorías de seguridad programadas.</li>
  <li><strong>Scripting</strong>: integrar capacidades agénticas en scripts bash/Python existentes.</li>
  <li><strong>CI/CD</strong>: ejecutar agentes como parte de pipelines de integración continua.</li>
  <li><strong>Batch processing</strong>: procesar múltiples archivos o proyectos en secuencia.</li>
</ul>

<p>Instalación y verificación:</p>

<pre><code class="language-bash"># Verificar que agy está disponible
agy --version
# Output: agy v2.x.x (Antigravity CLI)

# Ver ayuda general
agy --help

# Ver ayuda de un comando específico
agy run --help
</code></pre>

<p>El CLI opera en dos modos principales:</p>
<ol>
  <li><strong>Modo interactivo</strong>: abre una sesión conversacional en la terminal (similar al editor).</li>
  <li><strong>Modo headless</strong>: ejecuta un prompt único y retorna el resultado, ideal para scripts.</li>
</ol>

<p>En el modo headless, el agente recibe el prompt, ejecuta las acciones necesarias, y termina. No hay interacción humana durante la ejecución — es completamente autónomo.</p>
`,
        tip: 'El modo headless es perfecto para tareas nocturnas. Combínalo con el comando /goal del editor para tareas extra-exhaustivas.',
      },
      {
        id: 'cli-commands',
        title: 'Comandos principales',
        content: `
<p>Los comandos fundamentales del CLI de Antigravity cubren desde ejecución de prompts hasta gestión de sesiones:</p>

<h4>agy run — Ejecución de prompts</h4>
<pre><code class="language-bash"># Ejecutar un prompt simple
agy run "Revisa el package.json y actualiza las dependencias \
  que tengan vulnerabilidades de seguridad"

# Ejecutar con archivo de prompt
agy run --prompt-file ./prompts/security-audit.md

# Ejecutar en un directorio específico
agy run --cwd /path/to/project "Ejecuta los tests y corrige los que fallen"

# Ejecutar con modelo específico
agy run --model gemini-2.5-pro "Analiza la arquitectura del proyecto"
</code></pre>

<h4>agy prompt — Gestión de prompts</h4>
<pre><code class="language-bash"># Listar prompts guardados
agy prompt list

# Guardar un prompt reutilizable
agy prompt save "security-audit" \
  "Ejecuta una auditoría OWASP Top 10 completa del proyecto"

# Ejecutar un prompt guardado
agy prompt run "security-audit"
</code></pre>

<h4>agy session — Gestión de sesiones</h4>
<pre><code class="language-bash"># Listar sesiones activas
agy session list

# Continuar una sesión existente
agy session resume &lt;session-id&gt;

# Ver el log de una sesión
agy session log &lt;session-id&gt; --tail 50
</code></pre>

<h4>agy config — Configuración</h4>
<pre><code class="language-bash"># Ver configuración actual
agy config show

# Establecer modelo predeterminado
agy config set default-model gemini-2.5-pro

# Configurar timeout para ejecuciones headless
agy config set headless-timeout 300  # 5 minutos
</code></pre>
`,
        warning: 'El timeout por defecto en modo headless puede no ser suficiente para tareas complejas. Configura headless-timeout según la complejidad esperada de la tarea.',
      },
      {
        id: 'cli-scripting',
        title: 'Scripting con agy',
        content: `
<p>La verdadera potencia del CLI emerge cuando lo integras en <strong>scripts de shell</strong>. Esto te permite crear flujos de trabajo automatizados que combinan la inteligencia del agente con la flexibilidad del scripting:</p>

<pre><code class="language-bash">#!/bin/bash
# maintenance.sh — Script de mantenimiento semanal
set -euo pipefail

PROJECTS_DIR="$HOME/projects"
LOG_FILE="$HOME/logs/maintenance-$(date +%Y%m%d).log"
REPORT=""

echo "🔧 Iniciando mantenimiento semanal..." | tee "$LOG_FILE"

# Iterar sobre todos los proyectos
for project in "$PROJECTS_DIR"/*/; do
  project_name=$(basename "$project")
  echo "━━━ Procesando: $project_name ━━━" | tee -a "$LOG_FILE"

  # Ejecutar auditoría con agy
  result=$(agy run --cwd "$project" \
    "Revisa las dependencias del proyecto. \
     Actualiza las que tengan parches de seguridad. \
     Ejecuta los tests después de actualizar. \
     Reporta un resumen de cambios realizados." \
    2&gt;&amp;1) || true

  echo "$result" &gt;&gt; "$LOG_FILE"
  REPORT+="## $project_name\n$result\n\n"
done

# Generar reporte consolidado
echo -e "$REPORT" &gt; "$HOME/reports/weekly-$(date +%Y%m%d).md"
echo "✅ Mantenimiento completado. Ver: $LOG_FILE"
</code></pre>

<p>Patrones avanzados de scripting:</p>

<pre><code class="language-bash"># Ejecución condicional basada en cambios git
if git diff --name-only HEAD~1 | grep -q "package.json"; then
  echo "📦 Dependencias modificadas — ejecutando auditoría..."
  agy run "Las dependencias fueron modificadas. \
    Verifica compatibilidad y ejecuta tests de integración."
fi

# Pipeline: análisis → corrección → verificación
agy run "Paso 1: Analiza el código en /src y lista todos los \
  TODO y FIXME pendientes. Guarda la lista en /tmp/todos.md"

agy run "Paso 2: Lee /tmp/todos.md y resuelve los 3 más \
  críticos. Ejecuta tests después de cada corrección."
</code></pre>
`,
        tip: 'Usa || true después de agy run en scripts para que el script continúe incluso si un proyecto individual falla.',
      },
      {
        id: 'cli-maintenance',
        title: 'Automatización de mantenimiento',
        content: `
<p>Combinar <code>agy</code> con <strong>cron</strong> (o launchd en macOS) permite crear rutinas de mantenimiento completamente automatizadas:</p>

<pre><code class="language-bash"># Editar crontab
crontab -e

# Mantenimiento diario a las 2:00 AM
0 2 * * * /Users/cavila/scripts/daily-maintenance.sh

# Auditoría de seguridad semanal (domingos a las 3:00 AM)
0 3 * * 0 /Users/cavila/scripts/weekly-security.sh

# Reporte mensual de código (primer día del mes)
0 4 1 * * /Users/cavila/scripts/monthly-report.sh
</code></pre>

<p>Ejemplo de script de mantenimiento diario:</p>

<pre><code class="language-bash">#!/bin/bash
# daily-maintenance.sh
set -euo pipefail

export PATH="/usr/local/bin:$PATH"
WORKSPACE="$HOME/Documents/antigravity/current-project"

cd "$WORKSPACE"

# 1. Limpiar ramas git mergeadas
git branch --merged main | grep -v "main" | xargs -r git branch -d

# 2. Verificar que el proyecto compila
npm run build 2&gt;&amp;1 || {
  agy run "El build falló. Diagnostica y corrige el error. \
    Haz commit con mensaje descriptivo."
}

# 3. Ejecutar tests
npm test 2&gt;&amp;1 || {
  agy run "Hay tests fallando. Analiza los errores y corrígelos. \
    No modifiques la lógica del test a menos que sea incorrecto."
}

# 4. Verificar dependencias desactualizadas
agy run "Ejecuta npm outdated y actualiza las dependencias \
  que tengan parches de seguridad (patch/minor). No actualices \
  dependencias major sin crear una rama separada."

echo "✅ Mantenimiento diario completado: $(date)"
</code></pre>

<p>Para macOS, puedes usar <code>launchd</code> como alternativa más robusta a cron, especialmente si necesitas que la tarea se ejecute incluso cuando la máquina está en sleep.</p>
`,
        warning: 'Asegúrate de que las variables de entorno (PATH, HOME, tokens) estén disponibles en el entorno de cron. Cron usa un entorno mínimo por defecto.',
      },
      {
        id: 'cli-cicd',
        title: 'Integración CI/CD',
        content: `
<p>Integrar <code>agy</code> en pipelines de CI/CD lleva la automatización agéntica al siguiente nivel. El agente puede actuar como un <strong>revisor de código automatizado</strong>, <strong>corrector de bugs</strong>, o <strong>generador de documentación</strong>:</p>

<pre><code class="language-yaml"># .github/workflows/agy-review.yml
name: Antigravity Code Review

on:
  pull_request:
    branches: [main, develop]

jobs:
  agy-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Antigravity CLI
        uses: google/setup-agy@v1
        with:
          version: 'latest'

      - name: Run Code Review
        env:
          GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}
        run: |
          # Obtener archivos modificados
          FILES=$(git diff --name-only origin/main...HEAD)

          # Ejecutar revisión agéntica
          agy run --output review.md \
            "Revisa los siguientes archivos modificados en este PR: \
             $FILES. \
             Evalúa: seguridad, rendimiento, mejores prácticas, \
             y posibles bugs. Genera un reporte en formato markdown."

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '## 🤖 Antigravity Review\\n\\n' + review
            });
</code></pre>

<p>Otro caso de uso común es la <strong>generación automática de changelogs</strong>:</p>

<pre><code class="language-yaml">      - name: Generate Changelog
        run: |
          COMMITS=$(git log --oneline origin/main...HEAD)
          agy run --output CHANGELOG_ENTRY.md \
            "Genera una entrada de changelog profesional basada en \
             estos commits: $COMMITS. Usa formato Keep a Changelog. \
             Categoriza en: Added, Changed, Fixed, Security."
</code></pre>

<p>Consideraciones de seguridad para CI/CD:</p>
<ul>
  <li>Nunca expongas API keys en los logs del workflow — usa GitHub Secrets.</li>
  <li>Limita los permisos del token de GitHub al mínimo necesario.</li>
  <li>Configura timeouts para evitar que el agente quede ejecutándose indefinidamente.</li>
  <li>Revisa los cambios del agente antes de merge automático.</li>
</ul>
`,
        tip: 'Configura el workflow para que solo se ejecute en PRs que modifiquen código fuente (no docs ni configs). Usa paths-filter para optimizar.',
      },
    ],
    keyTakeaways: [
      'El CLI agy permite ejecutar agentes en modo headless para automatización completa',
      'Combina agy con scripts bash para crear flujos de mantenimiento automatizado',
      'Usa cron/launchd para programar tareas de mantenimiento recurrentes',
      'Integra agy en GitHub Actions para code review y changelog automático',
      'Siempre configura timeouts y manejo de errores en scripts automatizados',
    ],
  },

  /* ──────────────────────────────────────────────
     Course 9 — Conexión de servidores MCP
     ────────────────────────────────────────────── */
  9: {
    id: 9,
    objectives: [
      'Comprender la arquitectura del Model Context Protocol (MCP) y su rol en Antigravity',
      'Configurar servidores MCP para conectar herramientas externas',
      'Diferenciar entre herramientas eager y lazy y cuándo usar cada una',
      'Integrar bases de datos, APIs y servicios de Firebase mediante MCP',
      'Crear schemas de herramientas personalizadas para servidores MCP',
    ],
    prerequisites: [
      'Curso 1: Introducción a la plataforma Agent-First',
      'Curso 6: Gestión del Contexto',
      'Conocimiento básico de JSON Schema',
    ],
    estimatedTime: '4 horas',
    difficulty: 'Avanzado',
    sections: [
      {
        id: 'mcp-what',
        title: 'Qué es MCP',
        content: `
<p>El <strong>Model Context Protocol (MCP)</strong> es un protocolo abierto que permite a los modelos de lenguaje conectarse con <strong>herramientas externas</strong> de manera estandarizada. En Antigravity, MCP actúa como un puente entre el agente y servicios como bases de datos, APIs, herramientas de desarrollo, y plataformas cloud.</p>

<p>Sin MCP, el agente solo puede interactuar con el sistema de archivos local y ejecutar comandos en la terminal. Con MCP, sus capacidades se expanden a:</p>

<ul>
  <li><strong>Bases de datos</strong>: consultas directas a PostgreSQL, MongoDB, Firestore, BigQuery.</li>
  <li><strong>Servicios cloud</strong>: gestión de Firebase, Cloud Run, Cloud Storage.</li>
  <li><strong>Herramientas de desarrollo</strong>: Chrome DevTools, QGIS, NotebookLM.</li>
  <li><strong>APIs externas</strong>: cualquier API REST o GraphQL mediante adaptadores MCP.</li>
</ul>

<p>La ventaja clave de MCP sobre ejecutar comandos directos (como <code>gcloud</code> o <code>firebase</code>) es la <strong>tipificación y descubrimiento</strong>: cada herramienta MCP tiene un schema JSON que describe exactamente qué parámetros acepta y qué retorna, permitiendo al agente usarla correctamente sin adivinanzas.</p>

<pre><code class="language-text">┌──────────────┐     MCP Protocol     ┌──────────────────┐
│  Antigravity │ ◄──────────────────► │  MCP Server      │
│  Agent       │   JSON-RPC 2.0       │  (Firebase,      │
│              │   over stdio/HTTP    │   Postgres, etc) │
└──────────────┘                       └──────────────────┘
</code></pre>

<p>MCP usa el protocolo <strong>JSON-RPC 2.0</strong> para comunicación bidireccional. Los servidores MCP pueden ejecutarse como procesos locales (comunicación via stdio) o como servicios remotos (comunicación via HTTP/SSE).</p>
`,
        tip: 'MCP es un estándar abierto creado por Anthropic y adoptado por Google en Antigravity. Los servidores MCP son reutilizables entre diferentes plataformas compatibles.',
      },
      {
        id: 'mcp-architecture',
        title: 'Arquitectura del protocolo',
        content: `
<p>La arquitectura MCP en Antigravity se compone de tres capas:</p>

<h4>1. Cliente MCP (dentro de Antigravity)</h4>
<p>El agente actúa como <strong>cliente MCP</strong>. Cuando necesita usar una herramienta externa, envía una solicitud JSON-RPC al servidor correspondiente y procesa la respuesta.</p>

<h4>2. Servidor MCP (proceso externo)</h4>
<p>Cada servidor MCP es un proceso independiente que expone un conjunto de <strong>herramientas</strong> (tools). El servidor puede estar escrito en cualquier lenguaje (TypeScript, Python, Go) y se comunica con el agente mediante stdio o HTTP.</p>

<h4>3. Capa de recursos (backend real)</h4>
<p>El servidor MCP se conecta al recurso real (base de datos, API, servicio cloud) y traduce las solicitudes del agente en operaciones concretas.</p>

<pre><code class="language-text">┌─────────────────────────────────────────────────────────┐
│                    Antigravity Agent                     │
├─────────────────────────────────────────────────────────┤
│  Tool: mcp_firebase_getUser()                           │
│    → JSON-RPC: { method: "tools/call", params: {...} }  │
└────────────┬────────────────────────────────────────────┘
             │ stdio / HTTP+SSE
┌────────────▼────────────────────────────────────────────┐
│               Firebase MCP Server                        │
├─────────────────────────────────────────────────────────┤
│  Tool Schemas:                                           │
│    - getUser.json                                        │
│    - listCollections.json                                │
│    - queryDocuments.json                                 │
│  instructions.md (mejores prácticas)                    │
└────────────┬────────────────────────────────────────────┘
             │ Firebase Admin SDK
┌────────────▼────────────────────────────────────────────┐
│               Firebase / Firestore                       │
└─────────────────────────────────────────────────────────┘
</code></pre>

<p>Cada servidor MCP tiene un directorio en <code>~/.gemini/antigravity/mcp/&lt;serverName&gt;/</code> que contiene:</p>
<ul>
  <li><strong>Tool schemas</strong> (<code>&lt;toolName&gt;.json</code>): definen parámetros, tipos y descripciones de cada herramienta.</li>
  <li><strong>instructions.md</strong> (opcional): directrices de uso y mejores prácticas que el agente lee antes de usar las herramientas.</li>
</ul>
`,
      },
      {
        id: 'mcp-config',
        title: 'Configuración de servidores',
        content: `
<p>Los servidores MCP se configuran en el archivo de settings de Antigravity. La configuración especifica cómo iniciar cada servidor y qué herramientas expone:</p>

<pre><code class="language-json">{
  "mcpServers": {
    "firebase-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic/firebase-mcp-server",
        "--project-id", "my-firebase-project"
      ],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account.json"
      }
    },
    "postgres-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:pass@localhost:5432/mydb"
      ]
    },
    "cloudrun": {
      "command": "npx",
      "args": ["-y", "@anthropic/cloudrun-mcp-server"],
      "env": {
        "GCLOUD_PROJECT": "my-gcp-project",
        "GCLOUD_REGION": "us-central1"
      }
    }
  }
}
</code></pre>

<p>Para verificar que un servidor está configurado correctamente, observa la sección <code>mcp_servers</code> en el system prompt del agente. Los servidores activos aparecerán listados con sus herramientas:</p>

<pre><code class="language-text"># firebase-mcp-server
Eager:
  getUser
  listCollections
Lazy:
  queryDocuments
  updateDocument

# cloudrun
Eager:
  listServices
Lazy:
  deployService
  getServiceLogs
</code></pre>

<p>Cada servidor puede tener un archivo <code>instructions.md</code> con directrices específicas:</p>

<pre><code class="language-markdown"># Firebase MCP — Instrucciones

## Mejores Prácticas
1. Siempre verifica que el proyecto Firebase esté activo
   antes de ejecutar consultas.
2. Usa filtros en queryDocuments para limitar resultados.
3. Nunca modifiques documentos en producción sin confirmación.

## Límites
- Máximo 100 documentos por consulta
- Timeout: 30 segundos por operación
</code></pre>
`,
        warning: 'Nunca incluyas credenciales directamente en la configuración de servidores MCP. Usa variables de entorno o archivos de service account excluidos del control de versiones.',
      },
      {
        id: 'mcp-eager-lazy',
        title: 'Herramientas eager vs lazy',
        content: `
<p>Antigravity clasifica las herramientas MCP en dos categorías según su <strong>estrategia de carga</strong>:</p>

<h4>Herramientas Eager (carga inmediata)</h4>
<p>Se registran como herramientas nativas del agente al inicio de la sesión. Están disponibles inmediatamente con el prefijo <code>mcp_&lt;serverName&gt;_&lt;toolName&gt;</code>:</p>

<pre><code class="language-typescript">// Herramienta eager: se invoca directamente
mcp_firebase_getUser({
  uid: "abc123"
})

// Otra herramienta eager
mcp_cloudrun_listServices({
  project: "my-project",
  region: "us-central1"
})
</code></pre>

<p><strong>Ventajas</strong>: disponibles instantáneamente, sin overhead de carga.<br>
<strong>Desventajas</strong>: consumen espacio en el system prompt (tokens), incluso si no se usan.</p>

<h4>Herramientas Lazy (carga bajo demanda)</h4>
<p>No se cargan hasta que el agente las necesita explícitamente. Para usarlas, el agente primero lee el schema JSON y luego invoca la herramienta:</p>

<pre><code class="language-typescript">// Paso 1: Leer el schema de la herramienta lazy
view_file({
  AbsolutePath: "~/.gemini/antigravity/mcp/firebase-mcp-server/queryDocuments.json"
})

// Paso 2: Invocar la herramienta con los parámetros del schema
call_mcp_tool({
  serverName: "firebase-mcp-server",
  toolName: "queryDocuments",
  args: {
    collection: "users",
    where: { field: "role", op: "==", value: "admin" },
    limit: 10
  }
})
</code></pre>

<p><strong>Ventajas</strong>: no consumen tokens hasta que se usan, ideales para herramientas de uso esporádico.<br>
<strong>Desventajas</strong>: requieren un paso extra de descubrimiento del schema.</p>

<h4>¿Cuándo usar cada una?</h4>
<table>
  <thead><tr><th>Criterio</th><th>Eager</th><th>Lazy</th></tr></thead>
  <tbody>
    <tr><td>Uso frecuente</td><td>✅</td><td>❌</td></tr>
    <tr><td>Schema simple</td><td>✅</td><td>✅</td></tr>
    <tr><td>Muchas herramientas</td><td>❌</td><td>✅</td></tr>
    <tr><td>Optimización de tokens</td><td>❌</td><td>✅</td></tr>
  </tbody>
</table>
`,
        tip: 'Si un servidor MCP tiene más de 5 herramientas, marca la mayoría como lazy y solo las 2-3 más usadas como eager. Esto optimiza significativamente el consumo de tokens del system prompt.',
      },
      {
        id: 'mcp-integrations',
        title: 'Integraciones comunes',
        content: `
<p>Las integraciones MCP más utilizadas en el ecosistema Antigravity cubren los principales servicios de desarrollo:</p>

<h4>Firebase MCP Server</h4>
<p>Proporciona acceso directo a Firestore, Authentication, y Hosting:</p>

<pre><code class="language-json">{
  "firebase-mcp-server": {
    "command": "npx",
    "args": ["-y", "firebase-tools@latest", "mcp", "serve"],
    "env": {
      "FIREBASE_PROJECT": "mi-proyecto-prod"
    }
  }
}
</code></pre>

<p>Herramientas típicas: <code>getUser</code>, <code>listCollections</code>, <code>queryDocuments</code>, <code>deployHosting</code>.</p>

<h4>Database MCP Servers</h4>
<p>Para bases de datos relacionales y NoSQL:</p>

<pre><code class="language-json">{
  "postgres-mcp": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-postgres",
      "postgresql://localhost:5432/analytics"
    ]
  },
  "sqlite-mcp": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-sqlite",
      "--db-path", "./data/local.db"
    ]
  }
}
</code></pre>

<h4>Chrome DevTools MCP</h4>
<p>Permite al agente interactuar con un navegador Chrome para debugging visual:</p>

<pre><code class="language-json">{
  "chrome-devtools": {
    "command": "npx",
    "args": ["-y", "@anthropic/chrome-devtools-mcp-server"],
    "env": {
      "CHROME_DEBUG_PORT": "9222"
    }
  }
}
</code></pre>

<h4>Ejemplo de schema de herramienta personalizada</h4>
<p>Cada herramienta MCP se define con un schema JSON que describe sus parámetros:</p>

<pre><code class="language-json">{
  "name": "queryDocuments",
  "description": "Consulta documentos de una colección Firestore con filtros",
  "inputSchema": {
    "type": "object",
    "properties": {
      "collection": {
        "type": "string",
        "description": "Nombre de la colección Firestore"
      },
      "where": {
        "type": "object",
        "description": "Filtro de consulta con field, op, y value"
      },
      "limit": {
        "type": "number",
        "description": "Máximo de documentos a retornar",
        "default": 25
      }
    },
    "required": ["collection"]
  }
}
</code></pre>

<p>Para crear un servidor MCP personalizado, necesitas implementar el protocolo JSON-RPC 2.0 con los métodos estándar: <code>tools/list</code> y <code>tools/call</code>.</p>
`,
        tip: 'Explora los servidores MCP de la comunidad en npmjs.com buscando "@modelcontextprotocol/server-". Hay adaptadores para casi cualquier servicio popular.',
      },
    ],
    keyTakeaways: [
      'MCP estandariza la conexión entre agentes y herramientas externas mediante JSON-RPC 2.0',
      'Los servidores MCP se configuran en settings con command, args, y variables de entorno',
      'Herramientas eager se cargan al inicio (rápidas, pero consumen tokens); lazy se cargan bajo demanda (eficientes)',
      'Firebase, PostgreSQL, y Chrome DevTools son las integraciones MCP más comunes',
      'Cada herramienta MCP tiene un schema JSON que describe sus parámetros — el agente lo lee para usarla correctamente',
    ],
  },
};
