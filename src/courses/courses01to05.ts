/* ============================================
   Courses 01–05 — Detailed Educational Content
   Google Antigravity Platform
   ============================================ */

import type { CourseContent } from '../types';

export const courses01to05: Record<number, CourseContent> = {
  /* ──────────────────────────────────────────────
     COURSE 1 — Introducción a la plataforma Agent-First
     ────────────────────────────────────────────── */
  1: {
    id: 1,
    objectives: [
      'Comprender qué es Google Antigravity y por qué redefine el desarrollo de software',
      'Instalar y configurar la CLI de Gemini en tu entorno de desarrollo',
      'Ejecutar tu primera conversación agéntica con herramientas reales',
      'Interpretar la anatomía de una respuesta del agente',
      'Migrar tu flujo de trabajo del IDE clásico al paradigma Agent-First',
    ],
    estimatedTime: '2 horas',
    difficulty: 'Principiante',
    simpleSummary: 'Imagina que tienes un asistente super inteligente que puede escribir código por ti. Este curso te enseña a instalarlo, configurarlo y darle tus primeras instrucciones. Al final, sabrás cómo pedirle cosas en lenguaje natural y él se encargará de crear archivos, ejecutar programas y verificar que todo funcione.',
    quiz: [
      {
        question: '¿Cuál es la principal diferencia entre Antigravity y un autocompletado de código tradicional?',
        options: [
          'Antigravity solo sugiere líneas de código más largas',
          'Antigravity ejecuta acciones reales como crear archivos, correr comandos y verificar resultados',
          'Antigravity requiere que escribas el código manualmente y solo lo revisa',
          'Antigravity funciona solo con Python, no con otros lenguajes',
        ],
        correctIndex: 1,
        explanation: 'Antigravity es un agente autónomo que va mucho más allá de sugerir código. Puede leer archivos, ejecutar comandos, crear ramas y desplegar aplicaciones — todo desde una conversación en lenguaje natural.',
      },
      {
        question: '¿Para qué sirve el archivo AGENTS.md en un proyecto?',
        options: [
          'Para guardar las contraseñas del proyecto de forma segura',
          'Para definir las rutas de navegación de la aplicación web',
          'Para personalizar el comportamiento del agente con reglas persistentes del proyecto',
          'Para compilar el código TypeScript automáticamente',
        ],
        correctIndex: 2,
        explanation: 'El archivo AGENTS.md contiene reglas que el agente siempre respeta: stack tecnológico, convenciones de código, restricciones, etc. Es tu mecanismo principal de personalización a nivel de proyecto.',
      },
      {
        question: '¿Qué rol adopta el desarrollador en el paradigma Agent-First?',
        options: [
          'Sigue escribiendo todo el código manualmente',
          'Se convierte en arquitecto y supervisor, describiendo intención en vez de implementar',
          'Solo puede usar el agente para tareas de testing',
          'Debe aprender un nuevo lenguaje de programación especial',
        ],
        correctIndex: 1,
        explanation: 'En el paradigma Agent-First, tu rol evoluciona de implementador a arquitecto y supervisor. Describes qué quieres lograr y el agente se encarga de la implementación.',
      },
    ],
    sections: [
      {
        id: 'c1s1',
        title: 'Qué es Antigravity',
        content: `
<p>
  <strong>Google Antigravity</strong> es una plataforma de desarrollo <em>Agent-First</em>
  creada por Google DeepMind. A diferencia de los asistentes de código tradicionales que
  completan líneas o sugieren snippets, Antigravity opera como un <strong>agente autónomo</strong>
  capaz de leer archivos, ejecutar comandos, crear ramas, instalar dependencias y desplegar
  aplicaciones — todo desde una conversación en lenguaje natural.
</p>
<p>
  El paradigma Agent-First invierte la relación desarrollador-herramienta: en vez de que tú
  escribas código y la IA sugiera, tú <strong>describes la intención</strong> y el agente
  ejecuta. Tu rol evoluciona de <em>implementador</em> a <strong>arquitecto y supervisor</strong>.
</p>
<p>Conceptos fundamentales de la plataforma:</p>
<ul>
  <li><strong>Agente principal (root agent):</strong> La instancia que recibe tus instrucciones y orquesta todo el trabajo.</li>
  <li><strong>Subagentes:</strong> Instancias especializadas que el agente principal puede invocar para tareas paralelas.</li>
  <li><strong>Herramientas (tools):</strong> Capacidades concretas como <code>view_file</code>, <code>run_command</code>, <code>write_to_file</code>, etc.</li>
  <li><strong>Artefactos:</strong> Documentos Markdown estructurados que el agente genera para comunicar planes y resultados.</li>
  <li><strong>Skills:</strong> Módulos de instrucciones reutilizables que especializan al agente en dominios concretos.</li>
</ul>
<p>
  La plataforma soporta múltiples modelos de lenguaje (Gemini 2.5 Pro, Flash, etc.) y se
  integra nativamente con VS Code, terminales y navegadores Chrome.
</p>`,
        simpleContent: `<p>Piensa en Antigravity como un <strong>compañero de trabajo que sabe programar</strong>. Tú le dices <strong>qué</strong> quieres lograr — como "necesito una página web para mi negocio" — y él se encarga de escribir todo el código necesario.</p>
<p>A diferencia de un buscador como Google que solo te da información, Antigravity <strong>hace el trabajo por ti</strong>: crea archivos, instala programas, y prueba que todo funcione.</p>
<ul>
  <li>Es como tener un <strong>programador junior muy rápido</strong> al que tú le das instrucciones</li>
  <li>Tú te conviertes en el <strong>jefe del proyecto</strong> — decides qué hacer, él lo ejecuta</li>
  <li>Funciona con una simple conversación, como hablar por chat con un colega</li>
</ul>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Explícame qué herramientas tienes disponibles y dame un ejemplo de cada una"</div>
<div class="exercise-success">✅ Si el agente te lista herramientas como view_file, run_command, write_to_file y te explica para qué sirve cada una — ¡completaste el ejercicio!</div>`,
        tip: 'Antigravity no es solo un autocompletado avanzado — es un compañero de desarrollo que ejecuta. Piensa en él como un desarrollador junior muy rápido al que puedes supervisar.',
      },
      {
        id: 'c1s2',
        title: 'Instalación y Configuración',
        content: `
<p>
  Para comenzar con Antigravity necesitas instalar la <strong>Gemini CLI</strong>,
  la interfaz de línea de comandos que conecta tu terminal con el agente. El proceso
  es sencillo y funciona en macOS, Linux y Windows (vía WSL).
</p>
<h4>Paso 1: Instalar la CLI</h4>
<pre><code class="language-bash"># Instalar Gemini CLI globalmente
npm install -g @anthropic-ai/gemini-cli

# Verificar la instalación
gemini --version
# Salida esperada: gemini-cli v2.x.x

# Autenticarse con tu cuenta de Google
gemini auth login</code></pre>

<h4>Paso 2: Configurar el proyecto</h4>
<p>
  Crea un directorio <code>.gemini</code> en la raíz de tu proyecto. Este directorio
  contiene toda la configuración del agente para ese workspace.
</p>
<pre><code class="language-bash"># Inicializar configuración en tu proyecto
mkdir -p .gemini
touch .gemini/settings.json</code></pre>

<h4>Paso 3: Archivo de configuración</h4>
<pre><code class="language-json">{
  "model": "gemini-2.5-pro",
  "temperature": 0.2,
  "thinkingBudget": 16384,
  "tools": {
    "allowedCommands": ["npm", "git", "npx", "node"],
    "blockedCommands": ["rm -rf /", "sudo"]
  },
  "sandbox": {
    "enabled": true,
    "networkAccess": false
  }
}</code></pre>
<p>
  El archivo <code>settings.json</code> controla el modelo predeterminado, los comandos
  permitidos en el sandbox, y las restricciones de red. Siempre activa el sandbox en
  proyectos de producción para evitar ejecuciones accidentales.
</p>`,
        simpleContent: `<p>Instalar Antigravity es como <strong>instalar cualquier aplicación</strong> — solo necesitas una línea en la terminal y listo. Piensa en la terminal como la "ventana de comandos" de tu computador.</p>
<p>Después de instalar, creas una <strong>carpeta de configuración</strong> dentro de tu proyecto. Es como crear una "carpeta de preferencias" donde le dices al agente:</p>
<ul>
  <li>Qué modelo de IA usar (como elegir entre un asistente junior o senior)</li>
  <li>Qué comandos tiene permitido ejecutar (como darle permisos limitados a un empleado nuevo)</li>
  <li>Qué restricciones de seguridad aplicar (para que no haga nada peligroso)</li>
</ul>
<p>Una vez configurado, ya puedes empezar a darle instrucciones al agente.</p>`,
        tip: 'Configura allowedCommands con los comandos específicos de tu stack. Esto acelera la ejecución porque el agente no necesita pedir permiso cada vez.',
        warning: 'Nunca desactives el sandbox en proyectos con datos sensibles. El agente puede ejecutar comandos destructivos si se lo pides.',
      },
      {
        id: 'c1s3',
        title: 'Tu primera conversación agéntica',
        content: `
<p>
  Una <strong>conversación agéntica</strong> es diferente a un simple prompt de chat.
  Cuando le das una instrucción al agente, este <em>planifica</em>, <em>investiga</em> el
  contexto del proyecto, <em>ejecuta</em> acciones y <em>verifica</em> el resultado — todo
  en un ciclo autónomo.
</p>
<h4>Ejemplo: Crear un componente React</h4>
<pre><code class="language-text">USER: Crea un componente Button reutilizable con variantes
      primary, secondary y danger. Incluye tests unitarios.

AGENTE (internamente):
  1. grep_search → busca patrones existentes en el proyecto
  2. view_file → lee el design system actual
  3. write_to_file → crea src/components/Button.tsx
  4. write_to_file → crea src/components/Button.test.tsx
  5. run_command → ejecuta "npm test -- Button"
  6. Verifica que los 4 tests pasen ✓</code></pre>

<p>
  Observa que el agente no solo genera código — <strong>ejecuta los tests</strong> y
  verifica que pasen. Si algún test falla, corrige automáticamente sin pedirte intervención.
</p>
<h4>Usando tool calls</h4>
<p>
  Las herramientas son la forma en que el agente interactúa con tu sistema. Cada acción
  es una <em>tool call</em> con parámetros específicos:
</p>
<pre><code class="language-typescript">// Ejemplo conceptual de una tool call interna
{
  tool: "write_to_file",
  params: {
    TargetFile: "/src/components/Button.tsx",
    CodeContent: "export const Button = ({ variant = 'primary' }) =&gt; ...",
    Overwrite: false
  }
}</code></pre>
<p>
  Como usuario, no necesitas escribir tool calls manualmente — el agente las genera
  automáticamente basándose en tu instrucción en lenguaje natural.
</p>`,
        simpleContent: `<p>Hablar con Antigravity es como <strong>darle instrucciones a un asistente por chat</strong>. Pero a diferencia de ChatGPT que solo te responde con texto, Antigravity <strong>realmente hace las cosas</strong>.</p>
<p>Imagina que le dices: "Crea un botón para mi página web". El agente:</p>
<ul>
  <li>Primero <strong>investiga</strong> tu proyecto para entender el contexto</li>
  <li>Luego <strong>crea los archivos</strong> necesarios</li>
  <li>Después <strong>prueba</strong> que el botón funcione correctamente</li>
  <li>Si algo falla, lo <strong>corrige solo</strong> sin pedirte ayuda</li>
</ul>
<p>Es como enviar un mensaje de WhatsApp a un colega diciendo "hazme esto" y que te responda "listo, ya está hecho y funcionando".</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Crea un archivo llamado hola-mundo.html con una página web que diga 'Hola Mundo' con un diseño bonito y moderno"</div>
<div class="exercise-success">✅ Si el agente crea el archivo y puedes abrirlo en tu navegador viendo una página web con el texto — ¡completaste el ejercicio!</div>`,
        tip: 'Sé específico en tus instrucciones iniciales. En lugar de "crea un botón", di "crea un componente Button con variantes, tipos TypeScript estrictos y tests con Vitest".',
      },
      {
        id: 'c1s4',
        title: 'Anatomía de una respuesta',
        content: `
<p>
  Cada respuesta del agente tiene una estructura predecible que debes aprender a leer
  para supervisar su trabajo eficientemente. Una respuesta típica contiene:
</p>
<ol>
  <li><strong>Razonamiento interno (thinking):</strong> El agente analiza la solicitud y planifica su enfoque.</li>
  <li><strong>Tool calls:</strong> Acciones concretas ejecutadas contra tu sistema de archivos o terminal.</li>
  <li><strong>Resultados:</strong> Output de cada herramienta (contenido de archivos, salida de comandos, etc.).</li>
  <li><strong>Resumen:</strong> Texto en lenguaje natural explicando qué hizo y por qué.</li>
</ol>
<h4>Estructura de una tool call</h4>
<pre><code class="language-xml">&lt;antml:function_calls&gt;
  &lt;antml:invoke name="run_command"&gt;
    &lt;antml:parameter name="CommandLine"&gt;npm test&lt;/antml:parameter&gt;
    &lt;antml:parameter name="Cwd"&gt;/proyecto&lt;/antml:parameter&gt;
    &lt;antml:parameter name="WaitMsBeforeAsync"&gt;10000&lt;/antml:parameter&gt;
  &lt;/antml:invoke&gt;
&lt;/antml:function_calls&gt;</code></pre>
<p>
  Los parámetros clave son: <code>CommandLine</code> (el comando exacto),
  <code>Cwd</code> (directorio de trabajo) y <code>WaitMsBeforeAsync</code>
  (tiempo máximo antes de enviar el comando al background).
</p>
<p>
  Cuando el agente hace múltiples tool calls <strong>independientes</strong>, las ejecuta
  en paralelo dentro del mismo bloque. Si hay dependencias entre ellas, las ejecuta
  secuencialmente esperando el resultado de cada una.
</p>
<p>
  <strong>Artefactos</strong> son documentos Markdown especiales que el agente genera
  para presentarte información estructurada: planes de implementación, resultados de
  análisis, o reportes de errores. Se guardan en un directorio dedicado y aparecen
  como documentos navegables en la interfaz.
</p>`,
        simpleContent: `<p>Cuando el agente te responde, su respuesta tiene <strong>4 partes</strong>, como un informe de trabajo:</p>
<ul>
  <li><strong>Pensamiento:</strong> El agente analiza tu pedido (como cuando un empleado lee un email y piensa cómo resolver el tema)</li>
  <li><strong>Acciones:</strong> Lo que realmente hizo — crear archivos, ejecutar programas, etc.</li>
  <li><strong>Resultados:</strong> Qué pasó con cada acción — si funcionó o si hubo problemas</li>
  <li><strong>Resumen:</strong> Una explicación en español de todo lo que hizo y por qué</li>
</ul>
<p>No necesitas entender todos los detalles técnicos. El <strong>resumen final</strong> es lo más importante — ahí el agente te cuenta en lenguaje simple qué logró.</p>`,
        warning: 'Si el agente ejecuta un comando que parece incorrecto, puedes rechazarlo en la UI antes de que se ejecute. Siempre revisa los run_command en proyectos de producción.',
      },
      {
        id: 'c1s5',
        title: 'Del IDE clásico al Agent-First',
        content: `
<p>
  La transición del desarrollo clásico al paradigma Agent-First requiere un
  <strong>cambio de mentalidad</strong> fundamental. No se trata de usar una
  herramienta más, sino de redefinir tu rol en el proceso de desarrollo.
</p>
<table>
  <thead>
    <tr>
      <th>Aspecto</th>
      <th>IDE Clásico</th>
      <th>Agent-First</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tu rol</td>
      <td>Escribir código línea a línea</td>
      <td>Describir intención y supervisar</td>
    </tr>
    <tr>
      <td>Debugging</td>
      <td>Leer stack traces manualmente</td>
      <td>El agente diagnostica y corrige en bucle</td>
    </tr>
    <tr>
      <td>Testing</td>
      <td>Escribir tests después del código</td>
      <td>Tests generados y ejecutados automáticamente</td>
    </tr>
    <tr>
      <td>Refactoring</td>
      <td>Búsqueda manual de dependencias</td>
      <td>Refactoring multi-archivo orquestado</td>
    </tr>
  </tbody>
</table>
<h4>Archivo AGENTS.md</h4>
<p>
  El archivo <code>AGENTS.md</code> es tu mecanismo principal para personalizar el
  comportamiento del agente a nivel de proyecto. Funciona como un conjunto de reglas
  persistentes que el agente siempre respeta:
</p>
<pre><code class="language-markdown"># AGENTS.md — Reglas del proyecto

## Stack tecnológico
- Frontend: React + Vite + TypeScript
- Backend: FastAPI (Python 3.12)
- Base de datos: Firestore

## Convenciones
- Usar camelCase para variables y funciones
- Componentes React en PascalCase
- Tests con Vitest, coverage mínimo 80%

## Restricciones
- NO usar any en TypeScript
- NO instalar dependencias sin justificación
- Siempre verificar que compila antes de terminar</code></pre>
<p>
  Coloca este archivo en la raíz del proyecto (<code>.agents/AGENTS.md</code>) para
  reglas específicas del proyecto, o en <code>~/.gemini/config/AGENTS.md</code> para
  reglas globales que aplican a todos tus proyectos.
</p>`,
        simpleContent: `<p>Pasar del desarrollo tradicional a Agent-First es como pasar de <strong>cocinar tú mismo a ser el chef que dirige la cocina</strong>. Antes hacías todo manualmente; ahora le dices a tu equipo (el agente) qué platos preparar.</p>
<ul>
  <li><strong>Antes:</strong> Tú escribías cada línea de código, buscabas errores uno por uno, y probabas todo manualmente</li>
  <li><strong>Ahora:</strong> Tú describes qué necesitas, el agente programa, prueba y corrige automáticamente</li>
</ul>
<p>El archivo <strong>AGENTS.md</strong> es como un "manual de la casa" — le dice al agente las reglas de tu proyecto: qué tecnologías usar, qué convenciones seguir, y qué tiene prohibido hacer.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Crea un archivo AGENTS.md en la raíz del proyecto con reglas básicas: usar TypeScript, no usar 'any', y siempre verificar que compile antes de terminar"</div>
<div class="exercise-success">✅ Si el agente crea el archivo AGENTS.md con las reglas especificadas — ¡completaste el ejercicio!</div>`,
        tip: 'Invierte tiempo en escribir un AGENTS.md detallado. Es la inversión con mayor retorno — cada instrucción que pongas ahí se aplica automáticamente a todas las conversaciones futuras.',
      },
    ],
    keyTakeaways: [
      'Antigravity es un agente autónomo, no un autocompletado — ejecuta, verifica y corrige',
      'La CLI de Gemini se instala con npm y se configura por proyecto en .gemini/settings.json',
      'Las tool calls son el mecanismo fundamental de interacción agente-sistema',
      'AGENTS.md personaliza el comportamiento del agente de forma persistente',
      'Tu rol evoluciona de implementador a arquitecto y supervisor',
    ],
  },

  /* ──────────────────────────────────────────────
     COURSE 2 — Editor View vs Manager View
     ────────────────────────────────────────────── */
  2: {
    id: 2,
    objectives: [
      'Distinguir las dos superficies de interacción del agente: Editor View y Manager View',
      'Dominar el flujo inline de Editor View para ediciones quirúrgicas de código',
      'Utilizar Manager View para delegar tareas complejas en segundo plano',
      'Elegir la superficie correcta según el tipo y complejidad de la tarea',
      'Combinar ambas vistas en un workflow profesional integrado',
    ],
    prerequisites: [
      'Curso 1: Antigravity 2.0 — Introducción a la plataforma Agent-First',
    ],
    estimatedTime: '2.5 horas',
    difficulty: 'Principiante',
    simpleSummary: 'Antigravity tiene dos modos de trabajo: uno donde ves todo lo que hace en tiempo real (como mirar por encima del hombro de un colega) y otro donde le delegas una tarea grande y él trabaja solo en segundo plano (como enviar a alguien a hacer un encargo). Este curso te enseña cuándo usar cada uno para ser más productivo.',
    quiz: [
      {
        question: '¿Cuándo es más apropiado usar Editor View en vez de Manager View?',
        options: [
          'Cuando necesitas implementar una feature completa con más de 10 archivos',
          'Cuando quieres corregir un bug específico y ver cada cambio en tiempo real',
          'Cuando necesitas generar documentación completa del proyecto',
          'Cuando la tarea va a tomar más de 30 minutos',
        ],
        correctIndex: 1,
        explanation: 'Editor View es ideal para cambios quirúrgicos y localizados donde necesitas supervisión visual en tiempo real. Para tareas grandes o de larga duración, Manager View es más apropiado.',
      },
      {
        question: '¿Qué comando activa Manager View con máxima exhaustividad?',
        options: [
          '/edit',
          '/background',
          '/goal',
          '/manager',
        ],
        correctIndex: 2,
        explanation: 'El comando /goal es la forma principal de activar Manager View. Le indica al agente que debe ser exhaustivo y no detenerse hasta completar todo el objetivo.',
      },
      {
        question: '¿Cuál es el ciclo de trabajo recomendado combinando ambas vistas?',
        options: [
          'Implementar → Testear → Documentar → Deployar',
          'Plan → Implementar → Revisar → Validar',
          'Diseñar → Codificar → Compilar → Publicar',
          'Analizar → Escribir → Ejecutar → Borrar',
        ],
        correctIndex: 1,
        explanation: 'El ciclo recomendado es Plan (Editor View) → Implementar (Manager View) → Revisar (Editor View) → Validar (Manager View). Esto aprovecha las fortalezas de cada superficie.',
      },
    ],
    sections: [
      {
        id: 'c2s1',
        title: 'Las dos superficies',
        content: `
<p>
  Google Antigravity ofrece dos modos de interacción fundamentalmente diferentes,
  diseñados para cubrir el espectro completo de tareas de desarrollo:
</p>
<ul>
  <li>
    <strong>Editor View (inline):</strong> El agente trabaja <em>dentro</em> de tu editor,
    editando archivos directamente con tu supervisión en tiempo real. Ideal para cambios
    quirúrgicos, refactoring localizado y pair programming.
  </li>
  <li>
    <strong>Manager View (background):</strong> El agente trabaja en <em>segundo plano</em>
    como un proceso autónomo. Puede crear ramas, ejecutar tests, generar múltiples archivos
    y reportar resultados cuando termina. Ideal para tareas complejas y de larga duración.
  </li>
</ul>
<p>
  La diferencia clave no es solo visual — es <strong>operativa</strong>. En Editor View
  tienes control granular sobre cada cambio; en Manager View delegas completamente y
  revisas el resultado final. Ambos modos acceden a las mismas herramientas, pero el
  nivel de autonomía es diferente.
</p>
<p>
  Piensa en esta analogía: Editor View es como tener un copiloto que te sugiere maniobras
  mientras tú conduces. Manager View es como enviar un vehículo autónomo a hacer un
  recado — defines el destino y recibes confirmación cuando llega.
</p>
<p>
  La mayoría de los desarrolladores profesionales usan <strong>ambas superficies
  simultáneamente</strong>, alternando según el contexto de la tarea.
</p>`,
        simpleContent: `<p>Antigravity tiene <strong>dos formas de trabajar</strong>, como dos modos de un asistente:</p>
<ul>
  <li><strong>Modo "a tu lado" (Editor View):</strong> Es como tener a alguien sentado junto a ti, mostrándote cada cambio antes de hacerlo. Tú ves todo y puedes decir "sí" o "no" a cada paso.</li>
  <li><strong>Modo "delegado" (Manager View):</strong> Es como enviar a alguien a hacer un encargo completo. Le dices qué necesitas y te avisa cuando termina, con un reporte de todo lo que hizo.</li>
</ul>
<p>La mayoría de los profesionales usan <strong>ambos modos</strong> según la situación — el modo "a tu lado" para cosas pequeñas y el modo "delegado" para proyectos grandes.</p>`,
      },
      {
        id: 'c2s2',
        title: 'Editor View (inline)',
        content: `
<p>
  En <strong>Editor View</strong>, el agente opera dentro del contexto de tu editor de
  código. Puede ver los archivos que tienes abiertos, la posición de tu cursor, y
  responder en tiempo real a tus solicitudes.
</p>
<h4>Capacidades principales</h4>
<ul>
  <li>Edición quirúrgica de bloques de código específicos</li>
  <li>Refactoring con <code>replace_file_content</code> y <code>multi_replace_file_content</code></li>
  <li>Búsqueda de patrones con <code>grep_search</code> contextual</li>
  <li>Generación de código inline basada en el archivo actual</li>
</ul>
<h4>Ejemplo: Refactoring inline</h4>
<pre><code class="language-text">USER: Renombra la función fetchData a fetchUserProfile
      en todos los archivos que la usen.

AGENTE (Editor View):
  1. grep_search "fetchData" → encuentra 8 archivos
  2. replace_file_content en cada archivo:
     - src/api/users.ts (definición)
     - src/hooks/useUser.ts (importación)
     - src/pages/Profile.tsx (uso)
     - ... 5 archivos más
  3. run_command "npx tsc --noEmit" → verifica compilación ✓
  4. Reporta: "Renombrado fetchData → fetchUserProfile en 8 archivos"</code></pre>

<p>
  Editor View es perfecto para cambios que necesitas <strong>revisar en tiempo real</strong>.
  Puedes ver cada edición propuesta antes de aceptarla, rechazar cambios individuales, o
  pedir ajustes al instante.
</p>
<p>
  <strong>Limitación:</strong> Editor View procesa las tareas secuencialmente. Si necesitas
  que el agente trabaje en múltiples tareas simultáneamente, usa Manager View.
</p>`,
        simpleContent: `<p>El <strong>Editor View</strong> es como tener un asistente sentado a tu lado que te <strong>muestra cada cambio</strong> antes de hacerlo.</p>
<ul>
  <li>Ves exactamente qué archivos está tocando</li>
  <li>Puedes <strong>aceptar o rechazar</strong> cada cambio individual</li>
  <li>Es perfecto para correcciones pequeñas y precisas</li>
  <li>Funciona como un "pair programming" con IA</li>
</ul>
<p>Piensa en ello como revisar un documento de Google Docs donde tu colega hace cambios en tiempo real y tú puedes aceptar o rechazar cada sugerencia.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity en modo Editor View y escribe:</div>
<div class="exercise-code">"Busca todas las funciones en este proyecto que no tengan comentarios de documentación y agrégales un comentario descriptivo"</div>
<div class="exercise-success">✅ Si el agente encuentra funciones sin documentar y te muestra los cambios propuestos para cada una — ¡completaste el ejercicio!</div>`,
        tip: 'Usa Editor View cuando necesites entender cada cambio que el agente hace. Es especialmente útil para código crítico de producción donde quieres revisar línea por línea.',
      },
      {
        id: 'c2s3',
        title: 'Manager View (background)',
        content: `
<p>
  <strong>Manager View</strong> transforma al agente en un trabajador autónomo de fondo.
  Tú defines el objetivo de alto nivel y el agente planifica, ejecuta y verifica todo
  sin necesitar tu atención constante.
</p>
<h4>Activación con /goal</h4>
<p>
  El comando <code>/goal</code> es la forma principal de activar Manager View. Le indica
  al agente que debe ser exhaustivo y no detenerse hasta completar todo el objetivo:
</p>
<pre><code class="language-text">USER: /goal Implementa un sistema de autenticación completo con
      Google Sign-In usando Firebase Auth. Incluye:
      - Componente LoginButton
      - AuthContext con estado persistente
      - Middleware de protección de rutas
      - Tests para cada componente
      - Documentación en README</code></pre>

<h4>Monitoreo de tareas en background</h4>
<p>
  Mientras el agente trabaja en background, puedes monitorear su progreso:
</p>
<pre><code class="language-typescript">// El agente usa manage_task internamente
{
  tool: "manage_task",
  params: {
    Action: "status",
    TaskId: "task-auth-implementation"
  }
}
// Respuesta: "Running — 3/5 archivos creados, ejecutando tests..."</code></pre>

<p>
  Manager View puede <strong>invocar subagentes</strong> para paralelizar el trabajo.
  Por ejemplo, un subagente puede escribir el componente mientras otro genera los tests
  simultáneamente.
</p>
<p>
  Al terminar, el agente genera un <strong>artefacto resumen</strong> con todo lo que
  hizo: archivos creados, tests ejecutados, errores encontrados y decisiones tomadas.
  Revisa este documento para validar el trabajo antes de hacer merge.
</p>`,
        simpleContent: `<p>El <strong>Manager View</strong> es como <strong>enviar a alguien a hacer un proyecto completo</strong> sin necesidad de supervisarlo paso a paso.</p>
<ul>
  <li>Tú defines el objetivo general: "necesito un sistema de login completo"</li>
  <li>El agente trabaja <strong>en segundo plano</strong> — puedes hacer otras cosas mientras tanto</li>
  <li>Al terminar, te entrega un <strong>reporte completo</strong> de todo lo que hizo</li>
  <li>Puede trabajar por 20-30 minutos sin necesitar tu atención</li>
</ul>
<p>Es como enviar un email a un colega con un pedido detallado y recibir la respuesta "Listo, te adjunto todo terminado y testeado".</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"/goal Crea una página web simple con un formulario de contacto que tenga campos para nombre, email y mensaje. Incluye validación de campos y un diseño moderno con CSS. Verifica que funcione abriendo el archivo."</div>
<div class="exercise-success">✅ Si el agente trabaja de forma autónoma, crea los archivos, y al final te muestra un reporte de lo que hizo — ¡completaste el ejercicio!</div>`,
        warning: 'Manager View ejecuta tareas sin pedir confirmación intermedia. Asegúrate de que tu AGENTS.md tenga restricciones claras para evitar cambios no deseados.',
      },
      {
        id: 'c2s4',
        title: 'Cuándo usar cada una',
        content: `
<p>
  Elegir la superficie correcta es una habilidad que se desarrolla con la práctica.
  Aquí tienes una guía basada en escenarios comunes:
</p>
<table>
  <thead>
    <tr>
      <th>Escenario</th>
      <th>Superficie</th>
      <th>Razón</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Corregir un bug específico</td>
      <td>Editor View</td>
      <td>Cambio localizado, necesitas ver el fix</td>
    </tr>
    <tr>
      <td>Implementar feature completa</td>
      <td>Manager View</td>
      <td>Múltiples archivos, tests, documentación</td>
    </tr>
    <tr>
      <td>Refactoring de nombres</td>
      <td>Editor View</td>
      <td>Quieres verificar cada renombrado</td>
    </tr>
    <tr>
      <td>Migración de dependencias</td>
      <td>Manager View</td>
      <td>Tarea larga con muchos cambios en cadena</td>
    </tr>
    <tr>
      <td>Revisar y entender código</td>
      <td>Editor View</td>
      <td>Interacción conversacional e iterativa</td>
    </tr>
    <tr>
      <td>Generar documentación completa</td>
      <td>Manager View</td>
      <td>Tarea autónoma sin dependencia de contexto visual</td>
    </tr>
  </tbody>
</table>
<h4>Regla general</h4>
<p>
  <strong>Usa Editor View</strong> cuando el cambio afecta menos de 5 archivos y
  necesitas supervisión visual. <strong>Usa Manager View</strong> cuando la tarea
  toma más de 10 minutos o genera más de 5 archivos nuevos.
</p>
<p>
  Si no estás seguro, empieza con Editor View. Siempre puedes escalar a Manager View
  si la tarea resulta más compleja de lo esperado.
</p>`,
        simpleContent: `<p>Elegir el modo correcto es como decidir entre <strong>cocinar tú mismo o pedir delivery</strong>:</p>
<ul>
  <li><strong>Editor View</strong> (cocinar tú): Para cosas pequeñas donde quieres controlar cada detalle — corregir un error, cambiar un nombre, revisar código</li>
  <li><strong>Manager View</strong> (pedir delivery): Para proyectos grandes donde solo necesitas el resultado final — crear una feature completa, migrar tecnología, generar documentación</li>
</ul>
<p><strong>Regla simple:</strong> Si el cambio toca menos de 5 archivos, usa Editor View. Si toca más de 5 o toma más de 10 minutos, usa Manager View.</p>
<p>¿No estás seguro? Empieza con Editor View — siempre puedes cambiar al otro modo si la tarea crece.</p>`,
        tip: 'Manager View es ideal para tareas que harías "overnight" — implementaciones grandes que no necesitas supervisar en tiempo real.',
      },
      {
        id: 'c2s5',
        title: 'Workflow combinado',
        content: `
<p>
  El flujo de trabajo más productivo combina ambas superficies en un ciclo iterativo.
  Aquí mostramos un ejemplo real de desarrollo de una feature usando ambas vistas:
</p>
<h4>Fase 1: Planificación (Editor View)</h4>
<pre><code class="language-text">USER: Analiza la arquitectura actual del módulo de pagos
      y propón un plan para agregar soporte de Stripe.

AGENTE: [Investiga el código, genera un artefacto con el plan]
→ Artefacto: implementation_plan.md</code></pre>

<h4>Fase 2: Implementación (Manager View)</h4>
<pre><code class="language-text">USER: /goal Ejecuta el plan de implementation_plan.md
      para integrar Stripe en el módulo de pagos.

AGENTE: [Trabaja en background ~25 minutos]
→ Crea 12 archivos, ejecuta 34 tests, genera walkthrough.md</code></pre>

<h4>Fase 3: Revisión (Editor View)</h4>
<pre><code class="language-text">USER: Revisa el archivo src/payments/stripe.ts y mejora
      el manejo de errores en la función processPayment.

AGENTE: [Edición quirúrgica inline con tu supervisión]</code></pre>

<h4>Fase 4: Validación final (Manager View)</h4>
<pre><code class="language-text">USER: /goal Ejecuta la suite completa de tests,
      verifica el build de producción y genera un
      reporte de coverage.

AGENTE: [Ejecuta en background, reporta resultados]</code></pre>

<p>
  Este ciclo de <strong>Plan → Implementar → Revisar → Validar</strong> aprovecha
  las fortalezas de cada superficie: Editor View para la precisión y Manager View
  para la escala. Dominar esta alternancia es lo que distingue a un usuario
  avanzado de Antigravity.
</p>`,
        simpleContent: `<p>Los profesionales combinan ambos modos en un <strong>ciclo de 4 pasos</strong>, como dirigir un equipo de trabajo:</p>
<ul>
  <li><strong>Paso 1 — Planificar</strong> (Editor View): Le pides al agente que analice la situación y proponga un plan</li>
  <li><strong>Paso 2 — Implementar</strong> (Manager View): Le das luz verde y trabaja en segundo plano creando todo</li>
  <li><strong>Paso 3 — Revisar</strong> (Editor View): Revisas los detalles importantes y pides ajustes puntuales</li>
  <li><strong>Paso 4 — Validar</strong> (Manager View): Le pides que ejecute todas las pruebas y verifique que todo funciona</li>
</ul>
<p>Es como un director de proyecto que: planifica → delega → revisa → aprueba.</p>`,
        tip: 'Guarda tus prompts más efectivos en un archivo prompts.md dentro del proyecto. Así puedes reutilizarlos y refinarlos con el tiempo.',
      },
    ],
    keyTakeaways: [
      'Editor View es para cambios quirúrgicos con supervisión en tiempo real',
      'Manager View es para tareas autónomas complejas ejecutadas en background',
      'El comando /goal activa Manager View con máxima exhaustividad',
      'Combina ambas vistas en un ciclo Plan → Implementar → Revisar → Validar',
      'Elige la superficie según la complejidad y tu necesidad de supervisión',
    ],
  },

  /* ──────────────────────────────────────────────
     COURSE 3 — Orquestación y paralelización con Multi-Agent
     ────────────────────────────────────────────── */
  3: {
    id: 3,
    objectives: [
      'Comprender la arquitectura Multi-Agent de Antigravity y sus componentes',
      'Diferenciar los tres modos de workspace: inherit, branch y share',
      'Invocar subagentes especializados para tareas concurrentes',
      'Diseñar estrategias de paralelización efectivas para proyectos grandes',
      'Implementar patrones de comunicación entre agentes con send_message',
    ],
    prerequisites: [
      'Curso 1: Antigravity 2.0 — Introducción a la plataforma Agent-First',
      'Curso 2: Editor View vs Manager View',
    ],
    estimatedTime: '3.5 horas',
    difficulty: 'Intermedio',
    simpleSummary: 'Imagina que en vez de tener un solo asistente, puedes tener un equipo completo trabajando al mismo tiempo. Uno diseña la interfaz, otro programa el servidor, y otro escribe las pruebas — todos en paralelo. Este curso te enseña a orquestar ese equipo de agentes IA para multiplicar tu productividad.',
    quiz: [
      {
        question: '¿Cuál es la diferencia entre los modos de workspace "inherit" y "branch"?',
        options: [
          'inherit usa más memoria que branch',
          'branch permite que el subagente trabaje en una copia aislada sin afectar al agente padre',
          'inherit es más lento que branch',
          'branch solo funciona con subagentes de tipo "self"',
        ],
        correctIndex: 1,
        explanation: 'Con "branch", el subagente trabaja en una copia aislada del workspace. Los cambios no afectan al padre hasta que se haga merge. "inherit" comparte el mismo directorio y los cambios son inmediatamente visibles para ambos.',
      },
      {
        question: '¿Cuándo es mejor definir un subagente personalizado en vez de usar el tipo "self"?',
        options: [
          'Siempre — los subagentes personalizados son más rápidos',
          'Solo cuando necesitas que el subagente use un lenguaje de programación diferente',
          'Cuando necesitas restricciones específicas (como solo lectura) o un system prompt especializado',
          'Nunca — el tipo "self" es suficiente para todas las tareas',
        ],
        correctIndex: 2,
        explanation: 'Los subagentes personalizados son útiles cuando necesitas restricciones específicas (como deshabilitar herramientas de escritura para auditorías) o un system prompt que enfoque al agente en una tarea concreta.',
      },
      {
        question: '¿Necesitas hacer polling para saber cuándo termina un subagente?',
        options: [
          'Sí, debes verificar el estado cada 30 segundos',
          'No, el sistema te notifica automáticamente cuando el subagente termina',
          'Sí, pero solo en Manager View',
          'Depende del tipo de workspace que uses',
        ],
        correctIndex: 1,
        explanation: 'El sistema notifica automáticamente cuando un subagente termina. No necesitas hacer polling — simplemente continúa con otras tareas y recibirás la notificación cuando el subagente reporte sus resultados.',
      },
    ],
    sections: [
      {
        id: 'c3s1',
        title: 'Arquitectura Multi-Agent',
        content: `
<p>
  La <strong>arquitectura Multi-Agent</strong> de Antigravity permite que un agente
  principal orqueste múltiples <em>subagentes</em> que trabajan en paralelo, cada uno
  con su propio contexto de conversación, herramientas y workspace.
</p>
<p>
  El modelo sigue una <strong>jerarquía padre-hijo</strong>: el agente principal (root)
  define las tareas, invoca subagentes, y estos reportan resultados de vuelta. Cada
  subagente puede, a su vez, invocar sus propios subagentes, creando un árbol de
  ejecución.
</p>
<h4>Componentes de la arquitectura</h4>
<ul>
  <li><strong>Root Agent:</strong> La conversación principal que el usuario inicia. Tiene acceso completo a herramientas y puede definir/invocar subagentes.</li>
  <li><strong>Subagentes:</strong> Instancias independientes con su propio contexto. Pueden ser de tipo predefinido o definido dinámicamente.</li>
  <li><strong>Conversation ID:</strong> Identificador único de cada agente. Se usa para enviar mensajes y gestionar el ciclo de vida.</li>
  <li><strong>Workspaces:</strong> El directorio de trabajo del agente, que puede ser compartido, heredado o aislado (branch).</li>
</ul>
<pre><code class="language-text">Root Agent (tu conversación)
├── Subagente A — "Frontend Developer" (branch)
│   ├── Escribe componentes React
│   └── Ejecuta tests de UI
├── Subagente B — "Backend Developer" (branch)
│   ├── Implementa endpoints FastAPI
│   └── Ejecuta tests de integración
└── Subagente C — "Documentation Writer" (inherit)
    └── Genera README y API docs</code></pre>
<p>
  La principal ventaja es la <strong>paralelización real</strong>: mientras un subagente
  implementa el frontend, otro puede trabajar en el backend simultáneamente, reduciendo
  el tiempo total de desarrollo.
</p>`,
        simpleContent: `<p>Imagina que eres el <strong>director de una empresa</strong> y puedes contratar asistentes especializados para diferentes tareas:</p>
<ul>
  <li>Uno se dedica al <strong>diseño visual</strong> de tu aplicación</li>
  <li>Otro se encarga de la <strong>parte técnica del servidor</strong></li>
  <li>Un tercero escribe la <strong>documentación</strong></li>
</ul>
<p>Todos trabajan <strong>al mismo tiempo</strong>, cada uno en su propia mesa de trabajo, y te reportan cuando terminan. El agente principal es como el gerente que coordina a todo el equipo.</p>
<p>El resultado: un proyecto que tomaría 3 horas con un solo asistente se puede completar en 1 hora con tres trabajando en paralelo.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Lista todos los subagentes activos en este momento y explícame qué tipos de subagentes puedo invocar"</div>
<div class="exercise-success">✅ Si el agente te explica la diferencia entre subagentes tipo 'self' y personalizados, y te muestra cómo invocarlos — ¡completaste el ejercicio!</div>`,
        tip: 'La arquitectura Multi-Agent es especialmente poderosa para proyectos con separación clara de responsabilidades (frontend/backend, features independientes).',
      },
      {
        id: 'c3s2',
        title: 'Tipos de workspace',
        content: `
<p>
  El <strong>workspace</strong> define el entorno de archivos con el que trabaja cada
  subagente. Antigravity ofrece tres modos que controlan el nivel de aislamiento:
</p>
<h4>1. inherit (por defecto)</h4>
<p>
  El subagente trabaja en el <strong>mismo directorio</strong> que el agente padre.
  Los cambios de uno son inmediatamente visibles para el otro.
</p>
<pre><code class="language-typescript">// Subagente con workspace heredado
{
  TypeName: "self",
  Role: "Code Reviewer",
  Prompt: "Revisa src/auth/ y reporta problemas de seguridad",
  Workspace: "inherit" // Mismo directorio que el padre
}</code></pre>

<h4>2. branch (aislado)</h4>
<p>
  Crea una <strong>copia aislada</strong> del workspace. El subagente trabaja en su
  propia rama sin afectar al padre. Ideal para cambios experimentales o cuando
  múltiples agentes podrían crear conflictos de archivos.
</p>
<pre><code class="language-typescript">// Subagente con workspace aislado
{
  TypeName: "self",
  Role: "Feature Developer",
  Prompt: "Implementa el módulo de notificaciones push",
  Workspace: "branch" // Copia aislada, sin conflictos
}</code></pre>

<h4>3. share (worktree compartido)</h4>
<p>
  Crea un workspace que <strong>comparte el repositorio subyacente</strong> pero
  permite ramas independientes, similar a <code>git worktree</code>. Usa menos
  almacenamiento que <code>branch</code> pero permite ramas diferentes.
</p>
<pre><code class="language-typescript">// Subagente con worktree compartido
{
  TypeName: "self",
  Role: "Hotfix Developer",
  Prompt: "Aplica el hotfix en la rama release/2.1",
  Workspace: "share" // Worktree compartido, rama independiente
}</code></pre>

<p>
  La elección del workspace depende del <strong>riesgo de conflicto</strong>: usa
  <code>inherit</code> para tareas de solo lectura, <code>branch</code> para
  implementaciones paralelas, y <code>share</code> para trabajo en ramas diferentes.
</p>`,
        simpleContent: `<p>El "workspace" es el <strong>escritorio de trabajo</strong> de cada asistente. Hay tres opciones:</p>
<ul>
  <li><strong>Compartido (inherit):</strong> Todos trabajan en la misma mesa. Si uno mueve algo, los demás lo ven inmediatamente. Útil cuando solo necesitan leer archivos.</li>
  <li><strong>Aislado (branch):</strong> Cada uno tiene su propia copia del escritorio. Trabajan sin molestarse mutuamente. Perfecto cuando varios modifican archivos al mismo tiempo.</li>
  <li><strong>Semi-compartido (share):</strong> Comparten el mismo archivador pero cada uno tiene su propio cajón. Ahorra espacio pero mantiene la independencia.</li>
</ul>
<p>La regla simple: si solo van a <strong>leer</strong>, usa compartido. Si van a <strong>modificar archivos</strong>, usa aislado para evitar conflictos.</p>`,
        warning: 'Cuando usas workspace "branch", los cambios del subagente NO se fusionan automáticamente. Debes revisar y hacer merge manualmente o indicar al agente padre que lo haga.',
      },
      {
        id: 'c3s3',
        title: 'Invocando subagentes',
        content: `
<p>
  Hay dos formas de trabajar con subagentes: usar el tipo predefinido <code>self</code>
  (que hereda toda la configuración del padre) o <strong>definir un tipo personalizado</strong>
  con capacidades específicas.
</p>
<h4>Invocación básica con invoke_subagent</h4>
<pre><code class="language-typescript">// Invocar un subagente de tipo "self"
invoke_subagent({
  Subagents: [
    {
      TypeName: "self",
      Role: "Test Runner",
      Prompt: "Ejecuta todos los tests del proyecto, " +
              "identifica los que fallan y genera un " +
              "reporte con la causa raíz de cada fallo."
    }
  ]
})</code></pre>

<h4>Definir un tipo de subagente personalizado</h4>
<pre><code class="language-typescript">// Primero, definir el tipo
define_subagent({
  name: "security_auditor",
  description: "Auditor de seguridad especializado en OWASP Top 10",
  system_prompt: \`Eres un experto en seguridad web.
    Analiza el código buscando vulnerabilidades OWASP Top 10.
    Reporta cada hallazgo con: severidad, ubicación,
    descripción y remediación sugerida.
    NO modifiques archivos — solo reporta.\`,
  enable_write_tools: false, // Solo lectura
  enable_mcp_tools: false
})

// Luego, invocarlo
invoke_subagent({
  Subagents: [{
    TypeName: "security_auditor",
    Role: "OWASP Auditor",
    Prompt: "Audita todo el directorio src/api/"
  }]
})</code></pre>

<p>
  Los subagentes personalizados son útiles cuando necesitas <strong>restricciones
  específicas</strong> (como solo lectura) o un <strong>system prompt especializado</strong>
  que enfoque al agente en una tarea concreta.
</p>`,
        simpleContent: `<p>Hay dos formas de crear asistentes especializados:</p>
<ul>
  <li><strong>Clon genérico (self):</strong> Es como contratar a alguien con las mismas habilidades que tú. Puede hacer de todo — leer, escribir, ejecutar. Es la opción rápida.</li>
  <li><strong>Especialista personalizado:</strong> Es como contratar a un experto con un perfil específico. Por ejemplo, un "auditor de seguridad" que solo puede <strong>leer y reportar</strong>, no modificar nada.</li>
</ul>
<p>Los especialistas son útiles cuando quieres que alguien analice tu trabajo sin riesgo de que lo modifique accidentalmente — como contratar a un inspector que solo revisa pero no toca.</p>`,
        tip: 'Define subagentes de solo lectura (enable_write_tools: false) para tareas de análisis y auditoría. Esto garantiza que no modificarán tu código accidentalmente.',
      },
      {
        id: 'c3s4',
        title: 'Paralelización de tareas',
        content: `
<p>
  La paralelización permite que <strong>múltiples subagentes trabajen simultáneamente</strong>
  en diferentes aspectos de un proyecto. La clave es identificar tareas que sean
  <em>independientes entre sí</em> y puedan ejecutarse sin conflictos.
</p>
<h4>Ejemplo: Paralelización de una feature completa</h4>
<pre><code class="language-typescript">// Invocar 3 subagentes en paralelo
invoke_subagent({
  Subagents: [
    {
      TypeName: "self",
      Role: "Frontend Developer",
      Prompt: "Implementa los componentes React para " +
              "el dashboard de analytics: gráficos, " +
              "tablas y filtros. Usa Recharts.",
      Workspace: "branch"
    },
    {
      TypeName: "self",
      Role: "API Developer",
      Prompt: "Implementa los endpoints FastAPI para " +
              "servir datos de analytics: GET /metrics, " +
              "GET /reports, POST /filters.",
      Workspace: "branch"
    },
    {
      TypeName: "self",
      Role: "Test Engineer",
      Prompt: "Genera el plan de tests para el módulo " +
              "de analytics: unit tests, integration " +
              "tests y fixtures de datos de ejemplo.",
      Workspace: "inherit"
    }
  ]
})</code></pre>

<h4>Estrategias de paralelización</h4>
<ul>
  <li><strong>Por capa:</strong> Frontend, Backend y Tests en paralelo (como el ejemplo).</li>
  <li><strong>Por feature:</strong> Cada subagente implementa una feature independiente completa.</li>
  <li><strong>Por fase:</strong> Un subagente investiga mientras otro prepara el scaffolding.</li>
  <li><strong>Fan-out/Fan-in:</strong> Múltiples subagentes analizan, el padre consolida resultados.</li>
</ul>
<p>
  Después de invocar subagentes, el sistema te notifica automáticamente cuando cada uno
  termina. <strong>No necesitas hacer polling</strong> — simplemente continúa con otras
  tareas o espera las notificaciones.
</p>`,
        simpleContent: `<p>La paralelización es como <strong>dividir un proyecto entre varios miembros del equipo</strong> para que todo se haga más rápido:</p>
<ul>
  <li>Un asistente diseña la <strong>interfaz visual</strong></li>
  <li>Otro construye la <strong>parte del servidor</strong></li>
  <li>Un tercero prepara las <strong>pruebas de calidad</strong></li>
</ul>
<p>Todos trabajan <strong>al mismo tiempo</strong>. Lo importante es que las tareas sean independientes — si una depende de la otra, no se pueden paralelizar.</p>
<p>Cuando cada uno termina, el sistema te avisa automáticamente. No necesitas estar preguntando "¿ya terminaste?" — es como recibir una notificación en el celular.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Invoca dos subagentes en paralelo: uno que analice la estructura de este proyecto y otro que cuente cuántos archivos hay por tipo (ts, tsx, css, etc.). Ambos en modo inherit."</div>
<div class="exercise-success">✅ Si el agente crea dos subagentes, ambos trabajan simultáneamente, y recibes los reportes de cada uno — ¡completaste el ejercicio!</div>`,
        warning: 'No paralelices tareas que modifican los mismos archivos. Usa workspace "branch" si hay riesgo de conflicto y revisa los merges cuidadosamente.',
      },
      {
        id: 'c3s5',
        title: 'Patrones de comunicación',
        content: `
<p>
  Los subagentes se comunican con su agente padre (y entre sí, si tienen el ID)
  mediante <code>send_message</code>. Este mecanismo permite coordinación en tiempo
  real y transferencia de resultados.
</p>
<h4>Comunicación padre ↔ hijo</h4>
<pre><code class="language-typescript">// Desde el subagente, reportar al padre
send_message({
  Recipient: "efc3a1b7-62c6-4036-...", // ID del padre
  Message: "Frontend completado. Archivos creados:\\n" +
           "- src/components/Dashboard.tsx\\n" +
           "- src/components/MetricsChart.tsx\\n" +
           "- src/hooks/useAnalytics.ts\\n" +
           "Tests: 12/12 passing ✓"
})

// Desde el padre, enviar instrucciones adicionales
send_message({
  Recipient: "abc123-subagent-id",
  Message: "Agrega soporte para exportar gráficos a PDF"
})</code></pre>

<h4>Patrones comunes</h4>
<ul>
  <li>
    <strong>Report-back:</strong> El subagente trabaja y envía un resumen al terminar.
    Es el patrón más común y el que usa el tipo <code>self</code> por defecto.
  </li>
  <li>
    <strong>Checkpoint:</strong> El subagente envía actualizaciones periódicas de
    progreso durante tareas largas.
  </li>
  <li>
    <strong>Request-response:</strong> El padre envía una pregunta específica a un
    subagente que ya terminó para obtener más detalles.
  </li>
  <li>
    <strong>Pipeline:</strong> El resultado de un subagente se pasa como input al
    siguiente en una cadena secuencial.
  </li>
</ul>
<h4>Gestión del ciclo de vida</h4>
<pre><code class="language-typescript">// Listar subagentes activos
manage_subagents({ Action: "list" })

// Terminar un subagente específico
manage_subagents({
  Action: "kill",
  ConversationIds: ["abc123-subagent-id"]
})

// Terminar todos los subagentes
manage_subagents({ Action: "kill_all" })</code></pre>
<p>
  Cuando un subagente es terminado, sus workspaces <code>branch</code> se eliminan
  automáticamente, pero los logs y artefactos se preservan para referencia futura.
</p>`,
        simpleContent: `<p>Los subagentes se comunican con el agente principal usando <strong>mensajes</strong>, como un equipo que usa Slack o WhatsApp grupal:</p>
<ul>
  <li><strong>Reporte final:</strong> Cada asistente envía un resumen cuando termina — "Listo, creé estos 3 archivos y todas las pruebas pasaron"</li>
  <li><strong>Actualizaciones de progreso:</strong> En tareas largas, envían avisos periódicos — "Voy por la mitad, todo bien"</li>
  <li><strong>Instrucciones adicionales:</strong> El jefe puede enviar nuevas instrucciones a un asistente que ya está trabajando</li>
  <li><strong>Cadena de trabajo:</strong> Un asistente termina y pasa su resultado al siguiente para que continúe</li>
</ul>
<p>También puedes <strong>despedir</strong> (terminar) subagentes que ya no necesitas. Sus archivos de trabajo se borran pero los reportes se guardan.</p>`,
        tip: 'Usa el patrón Pipeline cuando las tareas tienen dependencias secuenciales: investigar → diseñar → implementar → testear. Cada fase la ejecuta un subagente diferente.',
      },
    ],
    keyTakeaways: [
      'La arquitectura Multi-Agent permite paralelización real con subagentes independientes',
      'Tres modos de workspace: inherit (compartido), branch (aislado) y share (worktree)',
      'define_subagent permite crear tipos especializados con restricciones de herramientas',
      'send_message es el mecanismo de comunicación entre agentes — soporta varios patrones',
      'No necesitas hacer polling: el sistema notifica automáticamente cuando un subagente termina',
    ],
  },

  /* ──────────────────────────────────────────────
     COURSE 4 — Verificación con Artefactos: Planes de implementación
     ────────────────────────────────────────────── */
  4: {
    id: 4,
    objectives: [
      'Entender qué son los artefactos y cómo el agente los usa para comunicar trabajo estructurado',
      'Crear y revisar Implementation Plans antes de ejecutar cambios complejos',
      'Usar Task Lists para rastrear progreso de implementaciones multi-paso',
      'Dominar el flujo de aprobación con RequestFeedback para validación humana',
      'Generar Walkthrough documents como documentación automática post-implementación',
    ],
    prerequisites: [
      'Curso 1: Antigravity 2.0 — Introducción a la plataforma Agent-First',
      'Curso 2: Editor View vs Manager View',
    ],
    estimatedTime: '3 horas',
    difficulty: 'Intermedio',
    simpleSummary: 'Antes de que un arquitecto construya un edificio, primero muestra los planos al cliente. Este curso te enseña a usar los "artefactos" de Antigravity — documentos donde el agente te muestra su plan antes de ejecutarlo. Así puedes revisar, aprobar o pedir cambios antes de que toque una sola línea de código.',
    quiz: [
      {
        question: '¿Qué propiedad del artefacto activa el botón "Proceed" para aprobación humana?',
        options: [
          'UserFacing: true',
          'RequestFeedback: true',
          'ApprovalRequired: true',
          'WaitForUser: true',
        ],
        correctIndex: 1,
        explanation: 'La propiedad RequestFeedback: true en el metadata del artefacto hace que aparezca un botón "Proceed" que el usuario debe presionar para autorizar la ejecución del plan.',
      },
      {
        question: '¿Cuál es la principal ventaja de una Task List sobre un Implementation Plan?',
        options: [
          'La Task List es más corta y fácil de leer',
          'La Task List permite rastrear el progreso paso a paso con checkboxes actualizados automáticamente',
          'La Task List se genera más rápido',
          'La Task List no necesita aprobación del usuario',
        ],
        correctIndex: 1,
        explanation: 'Las Task Lists están diseñadas para rastrear progreso con checkboxes que el agente actualiza automáticamente. Ofrecen visibilidad, reanudabilidad y trazabilidad durante implementaciones multi-paso.',
      },
      {
        question: '¿Qué contiene un Walkthrough document?',
        options: [
          'Solo el código fuente de los archivos creados',
          'Un resumen de lo implementado, decisiones técnicas, errores resueltos y cómo verificar el resultado',
          'Las instrucciones originales del usuario sin cambios',
          'Una lista de bugs pendientes sin resolver',
        ],
        correctIndex: 1,
        explanation: 'Un Walkthrough es documentación automática post-implementación que incluye: resumen ejecutivo, archivos creados/modificados, decisiones técnicas, errores encontrados y resueltos, y comandos para verificar el resultado.',
      },
    ],
    sections: [
      {
        id: 'c4s1',
        title: 'Qué son los artefactos',
        content: `
<p>
  Los <strong>artefactos</strong> en Antigravity son documentos Markdown estructurados
  que el agente genera para presentar información de forma organizada. A diferencia de
  las respuestas en texto plano, los artefactos se guardan como archivos persistentes
  y pueden incluir tablas, diagramas Mermaid, bloques de código y alertas con formato
  especial.
</p>
<h4>Características de los artefactos</h4>
<ul>
  <li><strong>Persistencia:</strong> Se guardan en <code>appDataDir/brain/&lt;conversation-id&gt;/</code> y persisten entre sesiones.</li>
  <li><strong>Metadata:</strong> Cada artefacto tiene propiedades como <code>Summary</code>, <code>UserFacing</code> y <code>RequestFeedback</code>.</li>
  <li><strong>Formato rico:</strong> Soportan Markdown extendido con alertas GitHub, diagramas Mermaid, carruseles y links a archivos.</li>
  <li><strong>Interactivos:</strong> Cuando <code>RequestFeedback</code> es <code>true</code>, el usuario ve un botón "Proceed" para aprobar la ejecución.</li>
</ul>
<h4>Metadata de un artefacto</h4>
<pre><code class="language-typescript">// Configuración al crear un artefacto
{
  ArtifactMetadata: {
    Summary: "Plan de implementación para el módulo de pagos " +
             "con Stripe. Incluye 4 fases, 12 tareas y " +
             "estimación de 3 horas.",
    UserFacing: true,   // Visible para el usuario
    RequestFeedback: true // Muestra botón "Proceed"
  }
}</code></pre>
<p>
  Los artefactos son el puente entre la autonomía del agente y tu supervisión.
  Permiten que el agente <strong>proponga antes de ejecutar</strong>, dándote la
  oportunidad de revisar, ajustar y aprobar planes antes de que se materialicen
  en cambios de código.
</p>`,
        simpleContent: `<p>Los <strong>artefactos</strong> son como <strong>documentos formales</strong> que el agente genera para mostrarte información importante de forma organizada.</p>
<p>Piensa en ellos como los <strong>entregables de un consultor</strong>: informes bonitos con tablas, diagramas y secciones bien estructuradas que se guardan permanentemente.</p>
<ul>
  <li>Se guardan como archivos que puedes consultar cuando quieras</li>
  <li>Pueden incluir tablas, diagramas, código y alertas con colores</li>
  <li>Algunos tienen un <strong>botón "Proceed"</strong> que te permite aprobar un plan antes de que se ejecute</li>
</ul>
<p>Es la forma que tiene el agente de decirte: "Esto es lo que pienso hacer — ¿te parece bien?"</p>`,
        tip: 'Pide al agente que genere artefactos cuando necesites una visión general antes de ejecutar: "Genera un plan como artefacto antes de implementar".',
      },
      {
        id: 'c4s2',
        title: 'Implementation Plans',
        content: `
<p>
  Un <strong>Implementation Plan</strong> es un artefacto estructurado que describe
  exactamente qué va a hacer el agente antes de hacerlo. Es la herramienta más
  poderosa para mantener el control sobre implementaciones complejas.
</p>
<h4>Estructura de un Implementation Plan</h4>
<pre><code class="language-markdown"># Plan de Implementación: Sistema de Notificaciones

## Resumen
Implementar un sistema de notificaciones push con Firebase
Cloud Messaging (FCM) integrado al frontend React existente.

## Fases

### Fase 1: Infraestructura (45 min)
- [ ] Configurar FCM en Firebase Console
- [ ] Agregar firebase-messaging al package.json
- [ ] Crear service worker para notificaciones

### Fase 2: Backend (1 hora)
- [ ] Endpoint POST /api/notifications/send
- [ ] Modelo de datos en Firestore: notifications collection
- [ ] Cloud Function trigger para envío masivo

### Fase 3: Frontend (1 hora)
- [ ] Componente NotificationBell con badge
- [ ] Hook useNotifications con suscripción real-time
- [ ] Panel de notificaciones con infinite scroll

### Fase 4: Testing (30 min)
- [ ] Tests unitarios para hook y componente
- [ ] Test de integración del endpoint
- [ ] Test E2E del flujo completo

## Archivos a crear/modificar
| Archivo | Acción | Descripción |
|---------|--------|-------------|
| src/notifications/service-worker.js | Crear | SW para FCM |
| src/hooks/useNotifications.ts | Crear | Hook React |
| src/components/NotificationBell.tsx | Crear | Componente UI |
| api/notifications.py | Crear | Endpoint FastAPI |

## Riesgos
&gt; [!WARNING]
&gt; FCM requiere HTTPS en producción. Verificar certificados.</code></pre>
<p>
  Un buen plan incluye: fases con estimaciones de tiempo, lista de archivos afectados,
  dependencias entre tareas, y riesgos identificados. Esto te permite <strong>detectar
  problemas antes de escribir una sola línea de código</strong>.
</p>`,
        simpleContent: `<p>Un <strong>Implementation Plan</strong> es como los <strong>planos de un arquitecto</strong> — muestra exactamente qué se va a construir antes de poner un solo ladrillo.</p>
<p>Incluye:</p>
<ul>
  <li><strong>Fases del trabajo</strong> con tiempos estimados (como un cronograma de obra)</li>
  <li><strong>Lista de archivos</strong> que se van a crear o modificar</li>
  <li><strong>Riesgos identificados</strong> que podrían causar problemas</li>
</ul>
<p>La ventaja es que puedes detectar errores en el plan <strong>antes de que se escriba una sola línea de código</strong>. Es mucho más barato cambiar un plano que demoler una pared.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Genera un Implementation Plan como artefacto con RequestFeedback: true para agregar un modo oscuro a este proyecto. NO lo implementes todavía — solo muestra el plan."</div>
<div class="exercise-success">✅ Si el agente genera un artefacto con fases, archivos a modificar, y un botón "Proceed" — ¡completaste el ejercicio!</div>`,
        warning: 'No saltes la fase de planificación en features que afectan más de 10 archivos. Un plan de 5 minutos puede ahorrarte horas de refactoring.',
      },
      {
        id: 'c4s3',
        title: 'Task Lists',
        content: `
<p>
  Las <strong>Task Lists</strong> son artefactos diseñados para rastrear el progreso
  de implementaciones paso a paso. Cada tarea tiene un checkbox que el agente actualiza
  automáticamente a medida que completa cada paso.
</p>
<h4>Formato de una Task List</h4>
<pre><code class="language-markdown"># Task List: Migración a TypeScript Strict

## Progreso: 3/8 completadas ███░░░░░ 37%

### Configuración
- [x] Activar strict: true en tsconfig.json
- [x] Activar noImplicitAny: true
- [ ] Activar strictNullChecks: true

### Archivos a migrar
- [x] src/utils/helpers.ts — 0 errores
- [ ] src/api/client.ts — 12 errores pendientes
- [ ] src/hooks/useAuth.ts — 5 errores pendientes
- [ ] src/components/Form.tsx — 8 errores pendientes

### Validación
- [ ] npm run build sin errores
- [ ] npm test — todos los tests pasan

## Notas
&gt; [!NOTE]
&gt; Los errores más comunes son: parámetros implícitamente any
&gt; y acceso a propiedades posiblemente undefined.</code></pre>

<h4>Beneficios de las Task Lists</h4>
<ul>
  <li><strong>Visibilidad:</strong> Sabes exactamente en qué paso está el agente.</li>
  <li><strong>Reanudabilidad:</strong> Si la conversación se interrumpe, el agente puede retomar desde la última tarea completada.</li>
  <li><strong>Trazabilidad:</strong> Cada checkbox marcado queda como registro de lo que se hizo.</li>
  <li><strong>Control:</strong> Puedes pedir que se detenga después de una fase específica para revisar.</li>
</ul>
<p>
  Las Task Lists funcionan especialmente bien con <strong>Manager View</strong>: el
  agente trabaja autónomamente y tú puedes consultar el progreso en cualquier momento
  revisando el artefacto actualizado.
</p>`,
        simpleContent: `<p>Las <strong>Task Lists</strong> son como una <strong>lista de tareas con checkboxes</strong> que el agente va marcando automáticamente a medida que avanza.</p>
<p>Imagina un tablero Trello o una lista de tareas donde ves:</p>
<ul>
  <li>✅ Tareas completadas (con palomita verde)</li>
  <li>⬜ Tareas pendientes (sin marcar)</li>
  <li>📊 Barra de progreso (ej: "3 de 8 completadas — 37%")</li>
</ul>
<p>La mejor parte: si la conversación se interrumpe, el agente puede <strong>retomar exactamente donde quedó</strong> leyendo la Task List. Es como guardar la partida en un videojuego.</p>`,
        tip: 'Pide al agente que cree una Task List antes de empezar: "Antes de implementar, genera una task list y actualiza los checkboxes a medida que completes cada paso".',
      },
      {
        id: 'c4s4',
        title: 'Flujo de aprobación',
        content: `
<p>
  El <strong>flujo de aprobación</strong> es un mecanismo de control que permite al
  agente proponer un plan y esperar tu aprobación explícita antes de ejecutarlo.
  Se activa configurando <code>RequestFeedback: true</code> en el metadata del artefacto.
</p>
<h4>Cómo funciona</h4>
<ol>
  <li>El agente genera un artefacto con el plan detallado.</li>
  <li>Configura <code>RequestFeedback: true</code> — aparece un botón <strong>"Proceed"</strong>.</li>
  <li>Tú revisas el plan, puedes hacer preguntas o pedir cambios.</li>
  <li>Al presionar "Proceed", el agente ejecuta el plan tal como fue aprobado.</li>
</ol>
<h4>Ejemplo de configuración</h4>
<pre><code class="language-typescript">// El agente crea el artefacto con feedback habilitado
write_to_file({
  TargetFile: "artifacts/migration_plan.md",
  CodeContent: planContent,
  ArtifactMetadata: {
    Summary: "Plan de migración de base de datos de " +
             "MongoDB a Firestore con 6 fases.",
    UserFacing: true,
    RequestFeedback: true  // ← Activa el botón "Proceed"
  }
})</code></pre>

<h4>Cuándo usar flujo de aprobación</h4>
<ul>
  <li><strong>Migraciones de datos:</strong> Cambios irreversibles que necesitan confirmación.</li>
  <li><strong>Cambios de arquitectura:</strong> Reestructuración de directorios o patrones.</li>
  <li><strong>Deploys a producción:</strong> Cualquier acción que afecte entornos live.</li>
  <li><strong>Eliminación de archivos:</strong> Para evitar borrados accidentales.</li>
</ul>
<p>
  El flujo de aprobación es tu <strong>red de seguridad</strong> contra cambios
  no deseados. Úsalo siempre que el impacto de un error sea alto o los cambios
  sean difíciles de revertir.
</p>
<p>
  Puedes configurar tu <code>AGENTS.md</code> para que el agente siempre genere
  un plan con aprobación antes de ejecutar cambios que afecten más de cierto
  número de archivos.
</p>`,
        simpleContent: `<p>El <strong>flujo de aprobación</strong> es como cuando un contratista te muestra los planos y te dice: <strong>"¿Apruebas esto antes de que empecemos a construir?"</strong></p>
<ol>
  <li>El agente genera un documento con su plan detallado</li>
  <li>Te aparece un <strong>botón "Proceed"</strong> (continuar)</li>
  <li>Tú revisas, haces preguntas o pides cambios</li>
  <li>Cuando presionas el botón, el agente ejecuta el plan aprobado</li>
</ol>
<p>Úsalo para cosas <strong>importantes o difíciles de revertir</strong>: migraciones de datos, cambios de arquitectura, o cualquier cosa que afecte la producción. Es tu seguro contra errores costosos.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Quiero que analices todos los archivos CSS de este proyecto y propongas mejoras de organización como artefacto con RequestFeedback: true. NO ejecutes los cambios hasta que yo apruebe."</div>
<div class="exercise-success">✅ Si el agente genera un plan con el botón "Proceed" y espera tu aprobación sin ejecutar cambios — ¡completaste el ejercicio!</div>`,
        warning: 'El flujo de aprobación NO es un sustituto de code review. Siempre revisa los cambios en un PR antes de hacer merge a main.',
      },
      {
        id: 'c4s5',
        title: 'Walkthrough documents',
        content: `
<p>
  Un <strong>Walkthrough document</strong> es un artefacto que el agente genera
  <em>después</em> de completar una implementación. Funciona como documentación
  automática que describe todo lo que se hizo, por qué, y cómo verificarlo.
</p>
<h4>Estructura típica de un Walkthrough</h4>
<pre><code class="language-markdown"># Walkthrough: Sistema de Autenticación con Firebase

## Resumen ejecutivo
Se implementó un sistema completo de autenticación usando
Firebase Auth con Google Sign-In y protección de rutas.
Tiempo total: 28 minutos. Archivos creados: 7. Tests: 15/15 ✓.

## Cambios realizados

### Nuevos archivos
- \`src/contexts/AuthContext.tsx\` — Context provider con
  estado de sesión persistente y Google Sign-In.
- \`src/components/LoginButton.tsx\` — Botón con diseño
  glassmorphism y animación de loading.
- \`src/middleware/authGuard.ts\` — HOC para proteger rutas.

### Archivos modificados
- \`src/App.tsx\` — Envuelto con AuthProvider.
- \`src/router.ts\` — Rutas protegidas con authGuard.

## Decisiones técnicas
1. **Context API vs Redux:** Se eligió Context API por ser
   suficiente para estado de auth y evitar dependencias extra.
2. **Persistencia:** Se usa \`onAuthStateChanged\` de Firebase
   en vez de localStorage para mayor seguridad.

## Cómo verificar
\`\`\`bash
npm run dev    # Abrir http://localhost:5173
npm test       # Ejecutar 15 tests
\`\`\`

## Errores encontrados y resueltos
- **Error:** Firebase no inicializado al montar AuthProvider.
- **Causa:** Import order incorrecto en main.tsx.
- **Fix:** Mover firebase.init() antes de ReactDOM.render().</code></pre>
<p>
  Los Walkthroughs son invaluables para la <strong>transferencia de conocimiento</strong>:
  cuando otro desarrollador (o tú mismo en el futuro) necesite entender qué se hizo y
  por qué, el Walkthrough tiene toda la información.
</p>
<p>
  Configura tu <code>AGENTS.md</code> con la regla <em>"Haz commits descriptivos con
  git después de cada milestone significativo"</em> para que el agente genere
  Walkthroughs automáticamente al final de cada tarea compleja.
</p>`,
        simpleContent: `<p>Un <strong>Walkthrough</strong> es como un <strong>informe de obra terminada</strong> que el agente genera automáticamente después de completar un trabajo. Incluye:</p>
<ul>
  <li><strong>Qué se hizo:</strong> Lista de archivos creados y modificados</li>
  <li><strong>Por qué:</strong> Las decisiones técnicas que tomó y su justificación</li>
  <li><strong>Cómo verificar:</strong> Comandos para comprobar que todo funciona</li>
  <li><strong>Problemas resueltos:</strong> Errores que encontró y cómo los solucionó</li>
</ul>
<p>Es invaluable para el futuro: cuando dentro de 6 meses te preguntes "¿por qué se hizo así?", el Walkthrough tiene la respuesta.</p>`,
        tip: 'Pide al agente que incluya una sección "Errores encontrados y resueltos" en cada Walkthrough. Esta información es oro para debugging futuro.',
      },
    ],
    keyTakeaways: [
      'Los artefactos son documentos Markdown persistentes que el agente usa para comunicar trabajo estructurado',
      'Implementation Plans detallan el "qué" y "cómo" antes de ejecutar — son tu primera línea de defensa',
      'Task Lists rastrean progreso con checkboxes actualizados automáticamente',
      'RequestFeedback: true activa el botón "Proceed" para aprobación humana explícita',
      'Walkthrough documents son documentación automática post-implementación — configúralos en AGENTS.md',
    ],
  },

  /* ──────────────────────────────────────────────
     COURSE 5 — Browser-in-the-Loop: Pruebas con Chrome nativo
     ────────────────────────────────────────────── */
  5: {
    id: 5,
    objectives: [
      'Comprender el concepto Browser-in-the-Loop y su rol en el desarrollo agéntico',
      'Configurar Chrome DevTools MCP para conectar el agente con un navegador real',
      'Automatizar navegación, clics y formularios desde conversaciones con el agente',
      'Implementar testing visual con capturas de pantalla automatizadas',
      'Capturar logs de consola y realizar auditorías de accesibilidad programáticas',
    ],
    prerequisites: [
      'Curso 1: Antigravity 2.0 — Introducción a la plataforma Agent-First',
      'Curso 2: Editor View vs Manager View',
    ],
    estimatedTime: '3 horas',
    difficulty: 'Intermedio',
    simpleSummary: 'Imagina que tu asistente IA no solo escribe código, sino que también abre un navegador real, navega tu aplicación, hace clic en botones y verifica que todo se vea bien — como un tester de calidad automatizado. Este curso te enseña a conectar Antigravity con Chrome para que pruebe tu aplicación visualmente.',
    quiz: [
      {
        question: '¿Qué significa "Browser-in-the-Loop" en el contexto de Antigravity?',
        options: [
          'Que el agente solo funciona dentro del navegador Chrome',
          'Que el agente puede abrir un navegador real, navegar la app, y verificar visualmente que el código funciona',
          'Que necesitas un navegador especial para usar Antigravity',
          'Que el agente genera código HTML sin verificarlo',
        ],
        correctIndex: 1,
        explanation: 'Browser-in-the-Loop significa que el agente cierra el ciclo de desarrollo: escribe código, abre Chrome, verifica visualmente que funciona, y corrige si algo se ve mal — todo automáticamente.',
      },
      {
        question: '¿Qué puerto se usa por defecto para la depuración remota de Chrome?',
        options: [
          '3000',
          '8080',
          '9222',
          '5173',
        ],
        correctIndex: 2,
        explanation: 'Chrome DevTools usa el puerto 9222 por defecto para la depuración remota. Este puerto se configura con el flag --remote-debugging-port=9222 al lanzar Chrome.',
      },
      {
        question: '¿Qué tipo de problemas puede detectar el testing visual automatizado?',
        options: [
          'Solo errores de JavaScript en la consola',
          'Problemas de layout, CSS roto, elementos no visibles, contraste de colores y accesibilidad',
          'Solo si los botones funcionan o no',
          'Únicamente problemas de rendimiento del servidor',
        ],
        correctIndex: 1,
        explanation: 'El testing visual automatizado puede detectar problemas de layout, CSS roto, elementos no visibles, overlaps, contraste de colores insuficiente, imágenes sin alt text, y otros problemas de accesibilidad.',
      },
    ],
    sections: [
      {
        id: 'c5s1',
        title: 'Concepto Browser-in-the-Loop',
        content: `
<p>
  <strong>Browser-in-the-Loop</strong> (BIL) es un paradigma donde el agente no solo
  genera código, sino que <em>verifica visualmente</em> el resultado abriendo un
  navegador Chrome real, navegando la aplicación, y evaluando lo que ve.
</p>
<p>
  En el desarrollo tradicional, el ciclo es: <em>escribir código → abrir el navegador
  → verificar manualmente → volver al editor</em>. Con BIL, el agente cierra este
  ciclo automáticamente: escribe el código, abre Chrome, verifica que funciona, y
  corrige si algo se ve mal.
</p>
<h4>¿Por qué es importante?</h4>
<ul>
  <li><strong>Verificación real:</strong> El agente no asume que el código funciona — lo comprueba en un navegador real.</li>
  <li><strong>Detección visual:</strong> Puede detectar problemas de layout, CSS roto, elementos no visibles o overlaps.</li>
  <li><strong>Testing automático:</strong> Simula interacciones de usuario: clics, formularios, scroll, navegación.</li>
  <li><strong>Debugging en contexto:</strong> Lee los logs de consola y errores JavaScript directamente.</li>
</ul>
<p>
  El mecanismo técnico detrás de BIL es el <strong>Model Context Protocol (MCP)</strong>
  aplicado a Chrome DevTools. El agente se conecta al protocolo de depuración de Chrome
  y puede controlar el navegador de la misma manera que un desarrollador usando las
  DevTools.
</p>
<p>
  BIL es especialmente valioso para desarrollo frontend, donde la salida visual es tan
  importante como la lógica del código. El agente puede iterar sobre el diseño hasta
  que coincida con las especificaciones, reduciendo los ciclos de revisión humana.
</p>`,
        simpleContent: `<p>Normalmente, un programador escribe código y luego <strong>abre el navegador para ver si funciona</strong>. Con Browser-in-the-Loop, el agente hace esto <strong>automáticamente</strong>.</p>
<p>Es como si tu asistente no solo escribiera el informe, sino que también lo <strong>imprimiera, lo revisara visualmente</strong>, y corrigiera errores de formato antes de entregártelo.</p>
<ul>
  <li>El agente escribe el código de tu página web</li>
  <li>Abre Chrome y navega a tu aplicación</li>
  <li>Verifica que todo se <strong>vea bien</strong> — colores, botones, textos en su lugar</li>
  <li>Si algo está mal, lo <strong>corrige y vuelve a verificar</strong></li>
</ul>
<p>Es como tener un <strong>inspector de calidad automático</strong> que revisa tu trabajo visualmente.</p>`,
        tip: 'Browser-in-the-Loop convierte al agente en un QA automatizado. Úsalo después de cada cambio visual significativo para detectar regresiones.',
      },
      {
        id: 'c5s2',
        title: 'Configuración de Chrome DevTools MCP',
        content: `
<p>
  Para habilitar Browser-in-the-Loop, necesitas configurar el servidor MCP de
  <strong>Chrome DevTools</strong>. Este servidor actúa como puente entre el agente
  y una instancia de Chrome con depuración remota activada.
</p>
<h4>Paso 1: Configurar el servidor MCP</h4>
<p>
  Agrega la configuración del servidor en tu archivo de settings de MCP:
</p>
<pre><code class="language-json">{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/chrome-devtools-mcp@latest"
      ],
      "env": {
        "CHROME_PATH": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      }
    }
  }
}</code></pre>

<h4>Paso 2: Lanzar Chrome con depuración remota</h4>
<pre><code class="language-bash"># macOS
/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome \\
  --remote-debugging-port=9222 \\
  --user-data-dir=/tmp/chrome-debug

# Linux
google-chrome \\
  --remote-debugging-port=9222 \\
  --user-data-dir=/tmp/chrome-debug</code></pre>

<h4>Paso 3: Verificar la conexión</h4>
<p>
  Una vez configurado, el agente puede listar las páginas abiertas en Chrome
  y conectarse a cualquiera de ellas:
</p>
<pre><code class="language-typescript">// El agente verifica la conexión
mcp_chrome_devtools_list_pages()
// Respuesta: [{ id: "ABC123", title: "Mi App", url: "http://localhost:5173" }]</code></pre>

<p>
  Si la conexión falla, verifica que Chrome está corriendo con el flag
  <code>--remote-debugging-port=9222</code> y que no hay otra instancia de
  Chrome usando el mismo puerto.
</p>`,
        simpleContent: `<p>Para que el agente pueda usar Chrome, necesitas <strong>configurar un "puente"</strong> entre Antigravity y el navegador. Es como conectar un control remoto a tu televisor.</p>
<p>El proceso tiene 3 pasos simples:</p>
<ul>
  <li><strong>Paso 1:</strong> Agregar la configuración del puente (un archivo JSON con la ubicación de Chrome)</li>
  <li><strong>Paso 2:</strong> Abrir Chrome en un modo especial llamado "depuración remota" — como abrir la puerta trasera para que el agente pueda entrar</li>
  <li><strong>Paso 3:</strong> Verificar que la conexión funciona — el agente lista las páginas abiertas en tu Chrome</li>
</ul>
<p>Una vez configurado, el agente puede <strong>controlar Chrome como si fuera un usuario humano</strong>.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Explícame paso a paso cómo configurar Chrome DevTools MCP en mi Mac, incluyendo el comando exacto para lanzar Chrome con depuración remota"</div>
<div class="exercise-success">✅ Si el agente te da los comandos exactos y la configuración JSON necesaria — ¡completaste el ejercicio!</div>`,
        warning: 'El puerto de depuración remota (9222) expone control total sobre el navegador. Nunca lo uses con Chrome en sesiones con datos sensibles (banking, email personal).',
      },
      {
        id: 'c5s3',
        title: 'Navegación automatizada',
        content: `
<p>
  Una vez conectado a Chrome, el agente puede <strong>navegar páginas, hacer clic
  en elementos, llenar formularios y simular interacciones de usuario</strong>
  como si fuera un tester manual — pero de forma automática y programática.
</p>
<h4>Navegación básica</h4>
<pre><code class="language-typescript">// Navegar a una URL
mcp_chrome_devtools_navigate_page({
  url: "http://localhost:5173/dashboard"
})

// Abrir una nueva pestaña
mcp_chrome_devtools_new_page({
  url: "http://localhost:5173/login"
})</code></pre>

<h4>Interacción con elementos</h4>
<pre><code class="language-typescript">// Hacer clic en un botón por selector CSS
mcp_chrome_devtools_click({
  selector: "#btn-login"
})

// Escribir en un campo de formulario
mcp_chrome_devtools_type({
  selector: "input[name='email']",
  text: "test@example.com"
})

// Hacer clic y esperar navegación
mcp_chrome_devtools_click({
  selector: "button[type='submit']",
  waitForNavigation: true
})</code></pre>

<h4>Ejemplo: Test de flujo de login</h4>
<pre><code class="language-text">AGENTE (secuencia de acciones):
  1. navigate_page → http://localhost:5173/login
  2. type → email: "test@example.com"
  3. type → password: "Test1234!"
  4. click → button[type="submit"]
  5. Esperar navegación a /dashboard
  6. Verificar que el elemento #welcome-message existe
  7. screenshot → Capturar evidencia visual</code></pre>

<p>
  La navegación automatizada es determinista y reproducible. El agente puede
  ejecutar el mismo flujo múltiples veces para verificar que los cambios no
  rompen funcionalidad existente — esencialmente un <strong>test de regresión
  visual automatizado</strong>.
</p>`,
        simpleContent: `<p>Una vez conectado a Chrome, el agente puede hacer <strong>todo lo que haría un usuario humano</strong>:</p>
<ul>
  <li>Abrir páginas web y navegar entre ellas</li>
  <li>Hacer <strong>clic en botones</strong> y enlaces</li>
  <li>Escribir texto en <strong>formularios</strong> (nombre, email, contraseña)</li>
  <li>Tomar <strong>capturas de pantalla</strong> como evidencia</li>
</ul>
<p>Es como tener un <strong>robot que prueba tu aplicación</strong> haciendo clic en todo y verificando que funcione. Si algo falla, te avisa y lo corrige automáticamente.</p>
<p>Puede repetir las mismas pruebas una y otra vez para asegurarse de que los cambios nuevos no rompen lo que ya funcionaba.</p>`,
        tip: 'Asigna IDs únicos y descriptivos a todos los elementos interactivos de tu UI. Esto facilita enormemente la automatización con selectores CSS simples.',
      },
      {
        id: 'c5s4',
        title: 'Testing visual',
        content: `
<p>
  El <strong>testing visual</strong> consiste en capturar screenshots de la aplicación
  y verificar que la interfaz se renderiza correctamente. El agente puede tomar
  capturas, analizarlas visualmente, y detectar problemas de layout o diseño.
</p>
<h4>Captura de screenshots</h4>
<pre><code class="language-typescript">// Capturar screenshot de la página completa
mcp_chrome_devtools_screenshot({
  fullPage: true,
  format: "png",
  savePath: "/artifacts/screenshots/dashboard_full.png"
})

// Capturar solo un elemento específico
mcp_chrome_devtools_screenshot({
  selector: "#main-chart",
  format: "png",
  savePath: "/artifacts/screenshots/chart_component.png"
})</code></pre>

<h4>Flujo de testing visual</h4>
<ol>
  <li>El agente implementa un cambio de CSS o un nuevo componente.</li>
  <li>Navega a la página afectada en Chrome.</li>
  <li>Toma un screenshot de la sección modificada.</li>
  <li>Analiza visualmente el resultado verificando alineación, espaciado y colores.</li>
  <li>Si detecta un problema, corrige el CSS y repite desde el paso 2.</li>
</ol>
<h4>Ejemplo de verificación responsive</h4>
<pre><code class="language-typescript">// Verificar diseño en diferentes viewports
const viewports = [
  { width: 375, height: 812, name: "iPhone_SE" },
  { width: 768, height: 1024, name: "iPad" },
  { width: 1920, height: 1080, name: "Desktop" }
];

for (const vp of viewports) {
  // Cambiar tamaño del viewport
  mcp_chrome_devtools_set_viewport({
    width: vp.width,
    height: vp.height
  });
  // Capturar screenshot
  mcp_chrome_devtools_screenshot({
    savePath: \`/artifacts/screenshots/\${vp.name}.png\`
  });
}</code></pre>
<p>
  Este flujo garantiza que tu aplicación se ve correctamente en los tres breakpoints
  principales sin necesidad de verificación manual en cada dispositivo.
</p>`,
        simpleContent: `<p>El <strong>testing visual</strong> es como sacarle <strong>fotos a tu aplicación</strong> para verificar que se vea bien en diferentes dispositivos:</p>
<ul>
  <li>El agente toma <strong>capturas de pantalla</strong> de tu app</li>
  <li>Verifica que los botones, textos e imágenes estén en su lugar</li>
  <li>Prueba en diferentes tamaños: <strong>celular, tablet y computador</strong></li>
  <li>Si algo se ve mal, lo corrige y vuelve a tomar la foto</li>
</ul>
<p>Es como enviar a un fotógrafo a revisar tu tienda — si un letrero está torcido o un color no combina, te avisa y lo arregla.</p>`,
        exercise: `<div class="exercise-prompt">Abre Antigravity y escribe este prompt:</div>
<div class="exercise-code">"Si tuvieras acceso a Chrome DevTools MCP, ¿cómo verificarías que esta aplicación se ve correctamente en móvil (375px), tablet (768px) y desktop (1920px)? Explícame el flujo paso a paso."</div>
<div class="exercise-success">✅ Si el agente te explica el flujo de cambiar viewport, capturar screenshots y comparar resultados — ¡completaste el ejercicio!</div>`,
        tip: 'Crea una carpeta screenshots/ en tu proyecto y pide al agente que capture evidencia visual después de cada cambio de UI. Es excelente para documentar PRs.',
      },
      {
        id: 'c5s5',
        title: 'Captura de logs y auditoría de accesibilidad',
        content: `
<p>
  Más allá de la navegación y screenshots, el agente puede <strong>leer los logs
  de la consola de Chrome</strong> en tiempo real y ejecutar <strong>auditorías
  de accesibilidad</strong> automatizadas usando las herramientas de DevTools.
</p>
<h4>Captura de logs de consola</h4>
<pre><code class="language-typescript">// Obtener todos los logs de consola
mcp_chrome_devtools_get_console_logs()
// Respuesta:
// [
//   { level: "error", text: "TypeError: Cannot read property 'map' of undefined",
//     source: "app.tsx:45" },
//   { level: "warn", text: "React key warning in component List" },
//   { level: "log", text: "Auth state changed: user logged in" }
// ]</code></pre>

<p>
  El agente puede filtrar los logs por nivel (error, warn, info) y usar los
  errores detectados para <strong>diagnosticar y corregir problemas automáticamente</strong>.
  Si encuentra un TypeError, puede ir al archivo fuente, entender el bug, y aplicar
  un fix — todo sin intervención humana.
</p>
<h4>Auditoría de accesibilidad</h4>
<pre><code class="language-typescript">// Ejecutar auditoría de accesibilidad (a11y)
mcp_chrome_devtools_accessibility_audit()
// Respuesta:
// {
//   score: 87,
//   issues: [
//     {
//       rule: "color-contrast",
//       severity: "serious",
//       element: "button.secondary",
//       description: "El contraste de color es 3.2:1, " +
//                    "se requiere mínimo 4.5:1"
//     },
//     {
//       rule: "missing-alt",
//       severity: "critical",
//       element: "img.hero-banner",
//       description: "Imagen sin atributo alt"
//     }
//   ]
// }</code></pre>

<h4>Flujo completo de debugging con BIL</h4>
<pre><code class="language-text">AGENTE:
  1. navigate_page → http://localhost:5173
  2. get_console_logs → Detecta 2 errores JavaScript
  3. Analiza el error: "Cannot read property 'map' of undefined"
  4. view_file → src/components/UserList.tsx:45
  5. Identifica: users puede ser undefined en el primer render
  6. replace_file_content → Agrega optional chaining: users?.map(...)
  7. Recarga la página y verifica: 0 errores en consola ✓
  8. accessibility_audit → Score 87, 2 issues
  9. Corrige contraste de color y alt faltante
  10. Re-audita → Score 98 ✓</code></pre>
<p>
  Este ciclo de <strong>detectar → diagnosticar → corregir → verificar</strong> es
  lo que hace a Browser-in-the-Loop tan poderoso: el agente no solo genera código,
  sino que lo prueba en condiciones reales y corrige hasta que todo funciona.
</p>`,
        simpleContent: `<p>El agente también puede leer los <strong>"mensajes internos"</strong> del navegador (logs de consola) para detectar errores invisibles al usuario:</p>
<ul>
  <li><strong>Errores de JavaScript:</strong> Encuentra bugs que hacen que la página falle</li>
  <li><strong>Advertencias:</strong> Detecta problemas menores que podrían crecer</li>
  <li><strong>Accesibilidad:</strong> Verifica que personas con discapacidad visual puedan usar tu app (contraste de colores, textos alternativos en imágenes)</li>
</ul>
<p>Es como tener un <strong>doctor que le hace un chequeo completo</strong> a tu aplicación: revisa lo visible (diseño) y lo invisible (errores internos), y te da un reporte de salud con puntuación.</p>`,
        warning: 'La auditoría de accesibilidad automatizada cubre ~60% de los problemas. Siempre complementa con testing manual usando lectores de pantalla para aplicaciones de producción.',
      },
    ],
    keyTakeaways: [
      'Browser-in-the-Loop permite al agente verificar visualmente su propio código en Chrome real',
      'Chrome DevTools MCP se configura como servidor MCP y requiere Chrome con depuración remota (puerto 9222)',
      'El agente puede navegar, hacer clic, llenar formularios y simular interacciones de usuario completas',
      'Los screenshots automatizados en múltiples viewports validan diseño responsive sin testing manual',
      'La captura de console logs y auditorías a11y permiten debugging y mejora de accesibilidad automatizados',
    ],
  },
};
