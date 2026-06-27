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
    simpleSummary: 'Imagina que el agente tiene un escritorio con espacio limitado. Cada vez que le pides algo, pone documentos sobre el escritorio: tus instrucciones, archivos que lee, resultados de búsquedas. Si el escritorio se llena, los documentos más viejos se caen al piso y el agente los olvida. Este curso te enseña a ser ordenado: pedir solo lo necesario, buscar antes de leer, y mantener el escritorio despejado para que el agente trabaje mejor y más rápido.',
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
        simpleContent: `<p>Piensa en el agente como un chef con una mesa de trabajo pequeña 🍳. Cada vez que le pides algo, pone ingredientes (información) sobre la mesa. Si la mesa se llena de cosas innecesarias, no tiene espacio para cocinar bien.</p>
<ul>
  <li><strong>Saturación</strong>: la mesa se llena y los ingredientes importantes se pierden entre el desorden</li>
  <li><strong>Lentitud</strong>: más cosas en la mesa = más tiempo buscando lo que necesita</li>
  <li><strong>Confusión</strong>: el chef ya no recuerda qué le pediste al principio</li>
</ul>
<p>La solución es ser preciso: pedir exactamente lo que necesitas, ni más ni menos.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Lee solo las líneas 1 a 20 del archivo package.json de este proyecto"</div>
<div class="exercise-success">✅ Si el agente lee solo esas líneas en vez del archivo completo — ¡completaste el ejercicio!</div>`,
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
        simpleContent: `<p>Imagina que el agente tiene una pizarra blanca dividida en secciones 📋. Una parte es para las reglas del sistema, otra para la conversación, otra para tu pregunta actual, y otra para escribir la respuesta.</p>
<ul>
  <li>Las <strong>reglas del sistema</strong> ocupan ~20% (como las instrucciones permanentes)</li>
  <li>La <strong>conversación anterior</strong> ocupa ~50% (todo lo que han hablado)</li>
  <li>Tu <strong>pregunta actual</strong> ocupa ~5%</li>
  <li>La <strong>respuesta</strong> necesita ~25% de espacio libre</li>
</ul>
<p>Cuando la pizarra se llena, el agente borra lo más antiguo. Si le diste instrucciones importantes al inicio, ¡podrían desaparecer!</p>`,
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
        simpleContent: `<p>Hay 4 trucos para mantener al agente eficiente, como organizar una oficina 🗂️:</p>
<ul>
  <li><strong>Pedir solo lo necesario</strong>: en vez de pedir "todo el expediente", pide "las páginas 5 a 10"</li>
  <li><strong>Buscar antes de leer</strong>: primero pregunta "¿en qué página está el dato?" y luego lee solo esa página</li>
  <li><strong>Conocer la estructura</strong>: revisa el índice de carpetas antes de buscar por todo el archivo</li>
  <li><strong>Delegar</strong>: para investigaciones largas, envía un asistente separado con su propia mesa limpia</li>
</ul>
<p>Cada truco ahorra espacio en la "pizarra" del agente y lo hace responder más rápido.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Busca dónde está la función 'main' en el proyecto y luego lee solo esas líneas específicas"</div>
<div class="exercise-success">✅ Si el agente usa grep_search primero y luego view_file con rangos — ¡completaste el ejercicio!</div>`,
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
        simpleContent: `<p>Cuando un archivo es muy largo (como un libro de 800 páginas 📖), no lo leas completo. Usa esta estrategia en tres pasos:</p>
<ul>
  <li><strong>Paso 1</strong>: Lee solo el índice (las primeras líneas) para entender la estructura</li>
  <li><strong>Paso 2</strong>: Busca la palabra clave específica que necesitas (como buscar en el índice del libro)</li>
  <li><strong>Paso 3</strong>: Lee solo el capítulo relevante</li>
</ul>
<p>Para archivos pequeños (como una nota adhesiva), está bien leerlos completos. El truco está en saber cuándo un archivo es "grande" y necesita la estrategia de bloques.</p>`,
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
        simpleContent: `<p>La velocidad del agente depende de dos cosas: cuánta información procesa y cuántas tareas ejecuta. Para hacerlo más rápido ⚡:</p>
<ul>
  <li><strong>Menos información por turno</strong>: pide solo lo que necesitas, como pedir un resumen en vez del informe completo</li>
  <li><strong>Tareas en paralelo</strong>: si necesitas dos cosas que no dependen entre sí, pídelas al mismo tiempo</li>
  <li><strong>Delegar</strong>: para investigaciones largas, envía un "asistente" separado que trabaja independientemente y te entrega solo el resultado</li>
</ul>
<p>Es como en un restaurante: un buen gerente no cocina todo solo, delega a su equipo y coordina.</p>`,
        tip: 'Si una sesión se vuelve lenta, considera iniciar una nueva conversación con instrucciones claras de lo que necesitas. Un contexto limpio = respuestas más rápidas.',
      },
    ],
    quiz: [
      {
        question: '¿Qué sucede cuando la ventana de contexto del agente se llena completamente?',
        options: [
          'El agente deja de funcionar y muestra un error',
          'Los pasos más antiguos se comprimen o eliminan automáticamente',
          'El agente pide al usuario que borre mensajes manualmente',
          'Se abre una nueva ventana de contexto adicional',
        ],
        correctIndex: 1,
        explanation: 'Antigravity aplica truncamiento automático: los pasos más antiguos se comprimen o eliminan, lo que puede hacer que instrucciones importantes del inicio se pierdan.',
      },
      {
        question: '¿Cuál es la forma más eficiente de encontrar una función específica en un archivo de 2000 líneas?',
        options: [
          'Leer el archivo completo con view_file y buscar visualmente',
          'Usar grep_search para localizar la línea exacta y luego leer solo ese rango',
          'Pedir al agente que adivine en qué línea está',
          'Abrir el archivo en un editor externo y decirle al agente el número de línea',
        ],
        correctIndex: 1,
        explanation: 'El patrón correcto es "buscar antes de leer": usar grep_search para encontrar la ubicación exacta y luego view_file con StartLine/EndLine para leer solo el rango necesario.',
      },
      {
        question: '¿Por qué los subagentes ayudan a reducir problemas de contexto?',
        options: [
          'Porque usan un modelo de IA más pequeño y eficiente',
          'Porque comparten la ventana de contexto del agente principal',
          'Porque cada uno tiene su propia ventana de contexto limpia y solo devuelven el resultado',
          'Porque pueden leer archivos más rápido que el agente principal',
        ],
        correctIndex: 2,
        explanation: 'Cada subagente obtiene una ventana de contexto limpia e independiente. Solo el resultado final se envía al agente principal, ahorrando tokens significativos en investigaciones extensas.',
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
    simpleSummary: 'Los Skills son como "recetas especializadas" que le enseñas al agente. Imagina que tienes un empleado nuevo muy inteligente pero que no sabe las reglas específicas de tu empresa. Los Skills son los manuales que le entregas: "cuando alguien pida X, sigue estos pasos". En este curso aprenderás a crear esos manuales para que el agente trabaje exactamente como tú necesitas, automatizando tareas repetitivas con instrucciones precisas.',
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
        simpleContent: `<p>Un Skill es como una receta de cocina para el agente 📝. Le dice exactamente qué hacer cuando enfrenta una tarea específica.</p>
<ul>
  <li><strong>Estructura mínima</strong>: solo necesitas un archivo con instrucciones (como una receta de una página)</li>
  <li><strong>Estructura completa</strong>: puede incluir scripts auxiliares, ejemplos y documentación extra (como un libro de cocina completo)</li>
  <li><strong>Dos ubicaciones</strong>: puedes guardar recetas globales (para todos los proyectos) o recetas específicas (solo para este proyecto)</li>
</ul>
<p>El agente lee el título y la descripción de cada receta para decidir cuándo usarla, como un chef que elige la receta correcta según el plato que le piden.</p>`,
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
        simpleContent: `<p>El archivo SKILL.md es como la portada y el contenido de un manual de instrucciones 📖. Tiene dos partes:</p>
<ul>
  <li><strong>Encabezado (frontmatter)</strong>: el título y la descripción — es lo que el agente lee primero para decidir si este manual le sirve</li>
  <li><strong>Cuerpo (instrucciones)</strong>: los pasos detallados, reglas obligatorias, ejemplos y checklists que el agente debe seguir</li>
</ul>
<p>Piénsalo como la ficha técnica de un producto: primero el nombre y para qué sirve, luego las instrucciones de uso detalladas. Si el manual es muy largo (más de 500 líneas), guarda las secciones extras en una carpeta aparte.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Crea un skill llamado 'mi-primer-skill' en .agents/skills/ con un SKILL.md que tenga name, description y una regla simple"</div>
<div class="exercise-success">✅ Si el agente crea la carpeta y el archivo SKILL.md con frontmatter YAML válido — ¡completaste el ejercicio!</div>`,
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
        simpleContent: `<p>El "trigger" de un skill funciona como las etiquetas de un libro en una biblioteca 🏷️. Cuando alguien busca un tema, el bibliotecario lee las etiquetas para encontrar el libro correcto.</p>
<ul>
  <li><strong>Nombre específico</strong>: "Guía de seguridad para Firebase" es mejor que "Seguridad" (como etiquetar "Novela de misterio" vs solo "Libro")</li>
  <li><strong>Palabras clave claras</strong>: incluye las tecnologías exactas que el skill cubre</li>
  <li><strong>Indicador "LEER cuando"</strong>: termina la descripción diciendo en qué situaciones usar el skill</li>
</ul>
<p>Un trigger bien escrito hace que el agente active automáticamente el skill correcto en el momento correcto.</p>`,
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
        simpleContent: `<p>Un skill bien organizado es como una oficina ordenada con cajones etiquetados 🗄️:</p>
<ul>
  <li><strong>SKILL.md</strong>: el manual principal (obligatorio, máximo 500 líneas)</li>
  <li><strong>scripts/</strong>: herramientas automatizadas que el agente puede ejecutar</li>
  <li><strong>examples/</strong>: ejemplos listos para copiar y usar como plantilla</li>
  <li><strong>resources/</strong>: archivos de apoyo (como plantillas o configuraciones)</li>
  <li><strong>references/</strong>: documentación extra para casos especiales</li>
</ul>
<p>Si tu skill está en una ubicación no estándar, puedes crear un archivo de registro para que el agente sepa dónde encontrarlo.</p>`,
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
        simpleContent: `<p>Los skills avanzados combinan instrucciones con herramientas automáticas, como un manual que incluye un robot que ejecuta los pasos por ti 🤖.</p>
<ul>
  <li><strong>Instrucciones + Scripts</strong>: el manual dice "qué hacer" y los scripts lo hacen automáticamente</li>
  <li><strong>Validación automática</strong>: después de ejecutar, el skill puede verificar que todo salió bien</li>
  <li><strong>Reglas para scripts</strong>: siempre incluir manejo de errores, mensajes de progreso y validación de entradas</li>
</ul>
<p>Puedes hacer que ciertos skills se carguen siempre (como las reglas de seguridad) registrándolos en el archivo de configuración principal del proyecto.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Crea un skill avanzado en .agents/skills/lint-checker/ con SKILL.md y un script en scripts/check.sh que ejecute el linter del proyecto"</div>
<div class="exercise-success">✅ Si el agente crea la carpeta con SKILL.md (con frontmatter) y el script check.sh con set -euo pipefail — ¡completaste el ejercicio!</div>`,
        tip: 'Los skills con scripts son especialmente útiles para tareas repetitivas como setup de proyectos, auditorías de seguridad, y deployments. Automatiza todo lo que hagas más de dos veces.',
      },
    ],
    quiz: [
      {
        question: '¿Qué parte del SKILL.md usa el agente para decidir si activar un skill?',
        options: [
          'El cuerpo completo del Markdown',
          'Solo los campos name y description del frontmatter YAML',
          'Los scripts dentro del directorio scripts/',
          'Los ejemplos dentro del directorio examples/',
        ],
        correctIndex: 1,
        explanation: 'El agente evalúa únicamente el name y description del frontmatter YAML para hacer matching semántico con la tarea del usuario. El cuerpo del Markdown solo se lee después de que el skill se activa.',
      },
      {
        question: '¿Cuál es la diferencia entre un skill global y un skill de workspace?',
        options: [
          'Los globales son más rápidos y los de workspace más lentos',
          'Los globales se aplican a todos los proyectos; los de workspace solo al proyecto actual',
          'Los globales son solo de lectura y los de workspace son editables',
          'No hay diferencia, son sinónimos',
        ],
        correctIndex: 1,
        explanation: 'Los skills globales (en ~/.gemini/config/skills/) se aplican a todos los workspaces del usuario, mientras que los de workspace (en .agents/skills/) son específicos del proyecto actual.',
      },
      {
        question: '¿Por qué se recomienda mantener el SKILL.md por debajo de 500 líneas?',
        options: [
          'Porque el sistema no soporta archivos más grandes',
          'Para reducir el consumo de tokens cuando el agente carga el skill',
          'Porque YAML tiene un límite técnico de 500 líneas',
          'Es solo una sugerencia estética sin impacto real',
        ],
        correctIndex: 1,
        explanation: 'Cada vez que el agente activa un skill, carga todo el SKILL.md en su contexto. Un archivo muy largo consume muchos tokens valiosos. La documentación extensa debe guardarse en references/ y leerse bajo demanda.',
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
    simpleSummary: 'El CLI (línea de comandos) de Antigravity es como tener un control remoto para tu agente de IA. En vez de chatear con él en una ventana, puedes darle instrucciones desde la terminal y dejarlo trabajando solo, incluso mientras duermes. Este curso te enseña a programar tareas automáticas: como un vigilante nocturno que revisa tu proyecto cada noche, actualiza lo necesario y te deja un reporte en la mañana.',
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
        simpleContent: `<p>El CLI es como un control remoto para tu agente 🎮. En vez de chatear con él en una ventana visual, le das instrucciones directamente desde la terminal.</p>
<ul>
  <li><strong>Modo interactivo</strong>: como una llamada telefónica — hablan ida y vuelta</li>
  <li><strong>Modo headless</strong>: como enviar un email con instrucciones — el agente las ejecuta solo y te avisa cuando termina</li>
</ul>
<p>El modo headless es perfecto para tareas automáticas: le dejas una tarea antes de dormir y la encuentras resuelta al despertar. Es como tener un empleado nocturno que trabaja mientras descansas.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Explícame la diferencia entre agy run en modo interactivo y modo headless, con un ejemplo de cada uno"</div>
<div class="exercise-success">✅ Si el agente te explica ambos modos con ejemplos claros — ¡completaste el ejercicio!</div>`,
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
        simpleContent: `<p>El CLI tiene 4 comandos principales, como los botones de un control remoto 📱:</p>
<ul>
  <li><strong>agy run</strong>: "Haz esto" — ejecuta una tarea. Puedes darle el texto directamente o un archivo con instrucciones</li>
  <li><strong>agy prompt</strong>: "Guarda esta instrucción" — guarda prompts que usas frecuentemente para reutilizarlos</li>
  <li><strong>agy session</strong>: "¿Qué estabas haciendo?" — ve las sesiones activas y continúa donde lo dejaste</li>
  <li><strong>agy config</strong>: "Configúrate así" — ajusta opciones como el modelo de IA o el tiempo máximo de ejecución</li>
</ul>
<p>Es como tener una agenda de tareas automatizadas: guardas las instrucciones y las ejecutas cuando las necesites.</p>`,
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
    2>&1) || true

  echo "$result" >> "$LOG_FILE"
  REPORT+="## $project_name\n$result\n\n"
done

# Generar reporte consolidado
echo -e "$REPORT" > "$HOME/reports/weekly-$(date +%Y%m%d).md"
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
        simpleContent: `<p>La magia del CLI aparece cuando lo combinas con scripts automatizados 🪄. Es como programar una cadena de tareas:</p>
<ul>
  <li><strong>Mantenimiento semanal</strong>: un script que recorre todos tus proyectos, revisa dependencias, ejecuta tests y genera un reporte</li>
  <li><strong>Ejecución condicional</strong>: "si alguien cambió las dependencias, ejecuta una auditoría automática"</li>
  <li><strong>Pipelines</strong>: encadenar tareas en secuencia — primero analiza, luego corrige, luego verifica</li>
</ul>
<p>Es como programar una lavadora: pones la ropa, seleccionas el ciclo, y la máquina hace todo sola mientras tú haces otra cosa.</p>`,
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
npm run build 2>&1 || {
  agy run "El build falló. Diagnostica y corrige el error. \
    Haz commit con mensaje descriptivo."
}

# 3. Ejecutar tests
npm test 2>&1 || {
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
        simpleContent: `<p>Puedes programar al agente para que trabaje en horarios fijos, como un vigilante nocturno 🌙:</p>
<ul>
  <li><strong>Diario a las 2 AM</strong>: limpia ramas viejas, verifica que el proyecto compila, ejecuta tests</li>
  <li><strong>Semanal (domingos)</strong>: auditoría de seguridad completa</li>
  <li><strong>Mensual</strong>: reporte completo del estado del código</li>
</ul>
<p>Si algo falla (el proyecto no compila o los tests fallan), el agente automáticamente intenta corregirlo. Es como tener un mecánico que revisa tu auto todas las noches y repara lo que encuentre.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Crea un script bash llamado maintenance.sh que use agy run para verificar que el proyecto compila y ejecutar los tests"</div>
<div class="exercise-success">✅ Si el agente crea un script con set -euo pipefail, verificación de build y tests — ¡completaste el ejercicio!</div>`,
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
        simpleContent: `<p>CI/CD es como una línea de ensamblaje en una fábrica 🏭. Cada vez que alguien propone cambios al código, el agente automáticamente:</p>
<ul>
  <li><strong>Revisa el código</strong>: como un supervisor que verifica la calidad antes de aprobar</li>
  <li><strong>Genera documentación</strong>: crea un resumen de los cambios automáticamente</li>
  <li><strong>Busca problemas</strong>: evalúa seguridad, rendimiento y mejores prácticas</li>
</ul>
<p>Todo esto sucede automáticamente en GitHub cada vez que alguien envía código nuevo. El agente deja comentarios con sus hallazgos, como un revisor incansable que nunca se cansa. ⚠️ Nunca pongas contraseñas directamente en la configuración.</p>`,
        tip: 'Configura el workflow para que solo se ejecute en PRs que modifiquen código fuente (no docs ni configs). Usa paths-filter para optimizar.',
      },
    ],
    quiz: [
      {
        question: '¿Cuál es la diferencia principal entre el modo interactivo y el modo headless del CLI?',
        options: [
          'El modo interactivo es más rápido que el headless',
          'El modo headless permite interacción humana durante la ejecución',
          'El modo headless ejecuta un prompt y termina sin interacción humana, ideal para automatización',
          'El modo interactivo no puede ejecutar herramientas',
        ],
        correctIndex: 2,
        explanation: 'En modo headless, el agente recibe el prompt, ejecuta las acciones necesarias y termina automáticamente. No hay interacción humana durante la ejecución, lo que lo hace ideal para scripts y automatización.',
      },
      {
        question: '¿Cuál es una buena práctica al usar agy run dentro de un script bash con múltiples proyectos?',
        options: [
          'Usar set -euo pipefail y detener el script al primer error',
          'Agregar || true después de agy run para que el script continúe aunque un proyecto falle',
          'Ejecutar todos los proyectos en paralelo sin manejo de errores',
          'Ignorar los errores y solo revisar el reporte final',
        ],
        correctIndex: 1,
        explanation: 'Agregar || true después de agy run permite que el script continúe procesando los demás proyectos aunque uno individual falle, evitando que un error detenga todo el mantenimiento.',
      },
      {
        question: '¿Qué consideración de seguridad es CRÍTICA al integrar agy en GitHub Actions?',
        options: [
          'Usar el modelo más caro disponible',
          'Nunca exponer API keys en los logs — usar GitHub Secrets',
          'Ejecutar el agente con permisos de administrador completos',
          'Permitir merge automático sin revisión humana',
        ],
        correctIndex: 1,
        explanation: 'Las API keys y credenciales nunca deben aparecer en los logs del workflow. Deben almacenarse como GitHub Secrets y referenciarse mediante variables de entorno seguras.',
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
    simpleSummary: 'MCP es como un adaptador universal que le permite al agente conectarse con servicios externos: bases de datos, plataformas cloud, navegadores y más. Sin MCP, el agente solo puede trabajar con archivos locales. Con MCP, es como darle un teléfono con el que puede llamar a cualquier servicio: Firebase, PostgreSQL, Chrome DevTools, etc. Este curso te enseña a configurar esas conexiones y a elegir qué herramientas cargar para no desperdiciar recursos.',
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
        simpleContent: `<p>MCP es como un adaptador universal de enchufes 🔌. Sin él, el agente solo puede trabajar con lo que tiene en su computadora. Con MCP, puede conectarse a servicios externos:</p>
<ul>
  <li><strong>Bases de datos</strong>: consultar información directamente sin comandos complicados</li>
  <li><strong>Servicios en la nube</strong>: gestionar Firebase, servidores, almacenamiento</li>
  <li><strong>Herramientas especiales</strong>: controlar un navegador, analizar mapas, etc.</li>
</ul>
<p>La ventaja es que cada "enchufe" viene con instrucciones claras de uso, así el agente sabe exactamente cómo conectarse sin adivinar. Es un estándar abierto, como USB: funciona con cualquier plataforma compatible.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Lista todos los servidores MCP que tengo configurados actualmente y dime qué herramientas ofrece cada uno"</div>
<div class="exercise-success">✅ Si el agente lista los servidores MCP con sus herramientas eager y lazy — ¡completaste el ejercicio!</div>`,
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
        simpleContent: `<p>La arquitectura MCP funciona como un servicio de delivery en tres capas 🏗️:</p>
<ul>
  <li><strong>Capa 1 - El cliente (Antigravity)</strong>: tú haces el pedido — el agente envía la solicitud</li>
  <li><strong>Capa 2 - El servidor MCP</strong>: el repartidor — recibe tu pedido y lo traduce al restaurante correcto</li>
  <li><strong>Capa 3 - El recurso real</strong>: el restaurante — la base de datos o servicio que tiene la información</li>
</ul>
<p>Cada servidor MCP viene con un "menú" (schemas) que describe qué puede hacer y cómo pedirlo. También puede incluir un manual de mejores prácticas para que el agente lo use correctamente.</p>`,
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
        simpleContent: `<p>Configurar un servidor MCP es como agregar un nuevo contacto a la agenda del agente 📇. Le dices:</p>
<ul>
  <li><strong>Cómo llamarlo</strong>: qué comando ejecutar para iniciar el servidor</li>
  <li><strong>Qué credenciales usar</strong>: las llaves de acceso (guardadas en variables de entorno, nunca en el código)</li>
  <li><strong>Qué puede hacer</strong>: la lista de herramientas disponibles</li>
</ul>
<p>Una vez configurado, puedes verificar que funciona revisando la lista de servidores activos. Cada servidor también puede tener un manual de mejores prácticas para que el agente lo use correctamente.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Muéstrame la configuración MCP actual del proyecto y explícame qué hace cada servidor configurado"</div>
<div class="exercise-success">✅ Si el agente lee la configuración y te explica cada servidor — ¡completaste el ejercicio!</div>`,
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
        simpleContent: `<p>Las herramientas MCP se dividen en dos tipos, como las apps de tu teléfono 📱:</p>
<ul>
  <li><strong>Eager (siempre abiertas)</strong>: como las apps que dejas abiertas en segundo plano — están listas al instante pero consumen batería (tokens) todo el tiempo</li>
  <li><strong>Lazy (bajo demanda)</strong>: como las apps que abres solo cuando las necesitas — tardan un segundo extra en cargar pero no gastan recursos mientras no las usas</li>
</ul>
<p>La regla general: si usas una herramienta constantemente, ponla como eager. Si la usas ocasionalmente, déjala como lazy. Si un servidor tiene más de 5 herramientas, solo las 2-3 más usadas deberían ser eager.</p>`,
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
        simpleContent: `<p>Las integraciones MCP más populares cubren los servicios que los desarrolladores usan todos los días 🌐:</p>
<ul>
  <li><strong>Firebase</strong>: gestiona usuarios, bases de datos y hosting directamente desde el agente</li>
  <li><strong>Bases de datos</strong>: PostgreSQL, SQLite — el agente puede hacer consultas sin que escribas SQL</li>
  <li><strong>Chrome DevTools</strong>: el agente puede abrir un navegador, inspeccionar páginas y depurar problemas visuales</li>
</ul>
<p>Cada herramienta viene con un "formulario" (schema) que describe exactamente qué información necesita. Es como pedir comida por una app: seleccionas opciones de un menú estructurado en vez de gritar tu pedido al aire.</p>`,
        tip: 'Explora los servidores MCP de la comunidad en npmjs.com buscando "@modelcontextprotocol/server-". Hay adaptadores para casi cualquier servicio popular.',
      },
    ],
    quiz: [
      {
        question: '¿Cuál es la ventaja principal de MCP sobre ejecutar comandos directos como gcloud o firebase en la terminal?',
        options: [
          'MCP es más rápido que los comandos de terminal',
          'MCP proporciona tipificación y descubrimiento — cada herramienta tiene un schema que describe sus parámetros',
          'MCP no requiere autenticación',
          'MCP funciona sin conexión a internet',
        ],
        correctIndex: 1,
        explanation: 'La ventaja clave de MCP es la tipificación y descubrimiento: cada herramienta tiene un schema JSON que describe exactamente qué parámetros acepta y qué retorna, permitiendo al agente usarla correctamente sin adivinanzas.',
      },
      {
        question: '¿Por qué es mejor marcar la mayoría de herramientas como "lazy" cuando un servidor tiene muchas?',
        options: [
          'Porque las herramientas lazy son más seguras',
          'Porque las herramientas eager consumen tokens del system prompt incluso cuando no se usan',
          'Porque las herramientas lazy son más rápidas de ejecutar',
          'Porque solo se permite tener 3 herramientas eager por servidor',
        ],
        correctIndex: 1,
        explanation: 'Las herramientas eager se cargan al inicio de la sesión y consumen tokens del system prompt permanentemente, incluso si nunca se usan. Con muchas herramientas, esto desperdicia contexto valioso. Las lazy solo consumen tokens cuando se necesitan.',
      },
      {
        question: '¿Qué componentes tiene la arquitectura MCP en Antigravity?',
        options: [
          'Solo el agente y la base de datos',
          'Cliente MCP (agente), Servidor MCP (proceso externo), y Capa de recursos (backend real)',
          'Un servidor central que controla todos los agentes',
          'Solo servidores MCP sin cliente',
        ],
        correctIndex: 1,
        explanation: 'La arquitectura MCP tiene tres capas: el Cliente MCP (el agente Antigravity que envía solicitudes), el Servidor MCP (proceso externo que traduce solicitudes), y la Capa de recursos (el servicio real como Firebase o PostgreSQL).',
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
