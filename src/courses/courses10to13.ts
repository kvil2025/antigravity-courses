/* ============================================
   Course Content 10–13 — Antigravity Courses
   Modelos Híbridos · Depuración Agéntica ·
   Vibe Coding · SDK & Codelabs
   ============================================ */

import type { CourseContent } from '../types';

export const courses10to13: Record<number, CourseContent> = {

  /* ──────────────────────────────────────────────
     CURSO 10 — Configuración de Modelos Híbridos
     ────────────────────────────────────────────── */
  10: {
    id: 10,
    objectives: [
      'Comprender el ecosistema de modelos LLM disponibles en Antigravity',
      'Seleccionar el modelo adecuado según la complejidad de cada tarea',
      'Configurar enrutamiento multi-modelo con fallback chains',
      'Implementar estrategias de optimización de costos por token',
      'Evaluar y comparar resultados con benchmarks estandarizados',
    ],
    prerequisites: [
      'Curso 8: Antigravity CLI (agy)',
      'Curso 9: Conexión de servidores externos mediante MCP',
      'Conocimiento básico de APIs de modelos de lenguaje',
    ],
    estimatedTime: '3 horas',
    difficulty: 'Avanzado',
    sections: [
      /* ── 10.1 ── */
      {
        id: 'c10-s1',
        title: 'El ecosistema de modelos',
        content: `
<p>
  Google Antigravity no está atado a un único modelo de lenguaje. La plataforma
  soporta una familia completa de LLMs que incluye Gemini 2.5 Pro, Gemini 2.5
  Flash, y modelos de terceros conectados vía MCP. Cada modelo presenta un
  perfil distinto de latencia, capacidad de razonamiento y costo por token.
</p>
<p>
  El concepto clave es <strong>model diversity</strong>: usar el modelo correcto
  para la tarea correcta. Un refactoring complejo de arquitectura puede
  justificar Gemini 2.5 Pro con su ventana de contexto extendida, mientras que
  una corrección de lint trivial puede resolverse con Flash en una fracción del
  costo.
</p>
<pre><code class="language-typescript">// Modelos disponibles en la configuración de Antigravity
const modelRegistry = {
  reasoning: {
    id: 'gemini-2.5-pro',
    contextWindow: 1_000_000,
    costPer1kTokens: 0.00125,
    strengths: ['arquitectura', 'debugging complejo', 'refactoring'],
  },
  fast: {
    id: 'gemini-2.5-flash',
    contextWindow: 1_000_000,
    costPer1kTokens: 0.00015,
    strengths: ['lint', 'formateo', 'ediciones simples'],
  },
  specialist: {
    id: 'custom-mcp-model',
    contextWindow: 128_000,
    costPer1kTokens: 0.002,
    strengths: ['dominio específico', 'datos privados'],
  },
};
</code></pre>
<ul>
  <li><strong>Gemini 2.5 Pro:</strong> Máxima capacidad de razonamiento, ideal para tareas complejas.</li>
  <li><strong>Gemini 2.5 Flash:</strong> Velocidad y bajo costo, perfecto para operaciones repetitivas.</li>
  <li><strong>Modelos MCP:</strong> Modelos especializados conectados vía Model Context Protocol.</li>
</ul>`,
        tip: 'Usa el comando "agy model list" en la terminal para ver todos los modelos disponibles y su estado actual de cuota.',
      },
      /* ── 10.2 ── */
      {
        id: 'c10-s2',
        title: 'Selección por tarea',
        content: `
<p>
  La selección inteligente de modelos se basa en clasificar cada tarea por su
  complejidad cognitiva. Antigravity implementa internamente un sistema de
  <strong>task routing</strong> que analiza el prompt del usuario y decide qué
  modelo asignar según heurísticas configurables.
</p>
<p>
  El routing puede ser <em>estático</em> (reglas fijas) o <em>dinámico</em>
  (basado en análisis del prompt). En la práctica, la mayoría de equipos
  comienzan con routing estático y migran a dinámico una vez que tienen datos
  suficientes sobre sus patrones de uso.
</p>
<pre><code class="language-typescript">// Routing estático por tipo de tarea
interface TaskRoute {
  pattern: RegExp;
  model: string;
  maxTokens: number;
}

const taskRoutes: TaskRoute[] = [
  {
    pattern: /refactor|architect|design/i,
    model: 'gemini-2.5-pro',
    maxTokens: 8192,
  },
  {
    pattern: /fix lint|format|rename/i,
    model: 'gemini-2.5-flash',
    maxTokens: 2048,
  },
  {
    pattern: /security audit|penetration/i,
    model: 'gemini-2.5-pro',
    maxTokens: 16384,
  },
];

function selectModel(taskDescription: string): TaskRoute {
  const match = taskRoutes.find(r =&gt; r.pattern.test(taskDescription));
  return match ?? taskRoutes[0]; // fallback a Pro
}
</code></pre>
<ul>
  <li>Las tareas de <strong>alta complejidad</strong> (arquitectura, seguridad) usan Pro.</li>
  <li>Las tareas de <strong>baja complejidad</strong> (formato, renombrado) usan Flash.</li>
  <li>El <strong>fallback</strong> siempre apunta al modelo más capaz para evitar fallos.</li>
</ul>`,
        warning: 'No asignes tareas de seguridad o auditoría a modelos rápidos. Un error en el análisis de vulnerabilidades puede ser costoso.',
      },
      /* ── 10.3 ── */
      {
        id: 'c10-s3',
        title: 'Configuración multi-modelo',
        content: `
<p>
  La configuración multi-modelo en Antigravity se gestiona a través de archivos
  de configuración en el directorio <code>.agents/</code> del proyecto. Aquí
  puedes definir qué modelos estarán disponibles, sus límites de tokens y las
  reglas de enrutamiento.
</p>
<p>
  El patrón más poderoso es la <strong>fallback chain</strong>: una cadena de
  modelos que se intentan secuencialmente cuando uno falla o excede su cuota.
  Esto garantiza que el agente nunca se detenga por indisponibilidad de un
  modelo específico.
</p>
<pre><code class="language-json">// .agents/model-config.json
{
  "defaultModel": "gemini-2.5-pro",
  "fallbackChain": [
    "gemini-2.5-pro",
    "gemini-2.5-flash",
    "custom-mcp-model"
  ],
  "routing": {
    "strategy": "task-complexity",
    "thresholds": {
      "simple": { "maxTokens": 500, "model": "gemini-2.5-flash" },
      "medium": { "maxTokens": 2000, "model": "gemini-2.5-pro" },
      "complex": { "maxTokens": 8000, "model": "gemini-2.5-pro" }
    }
  },
  "quotaLimits": {
    "gemini-2.5-pro": { "requestsPerMinute": 60 },
    "gemini-2.5-flash": { "requestsPerMinute": 200 }
  }
}
</code></pre>
<p>
  Cuando defines una fallback chain, Antigravity intentará el primer modelo.
  Si recibe un error 429 (rate limit) o un timeout, avanza automáticamente al
  siguiente modelo en la cadena. Este mecanismo es transparente para el
  usuario y el agente continúa trabajando sin interrupción.
</p>
<ul>
  <li><strong>defaultModel:</strong> Modelo usado cuando no hay regla de routing específica.</li>
  <li><strong>fallbackChain:</strong> Orden de prioridad cuando un modelo no está disponible.</li>
  <li><strong>quotaLimits:</strong> Previene exceder los límites de la API.</li>
</ul>`,
        tip: 'Configura alertas de cuota en tu proyecto de Google Cloud para recibir notificaciones antes de alcanzar el límite de requests.',
      },
      /* ── 10.4 ── */
      {
        id: 'c10-s4',
        title: 'Estrategias de costo',
        content: `
<p>
  El costo de operación de agentes autónomos puede escalar rápidamente si
  no se gestiona. Antigravity ofrece herramientas de monitoreo y control
  que permiten establecer presupuestos diarios, semanales y por proyecto.
</p>
<p>
  La estrategia más efectiva es el <strong>modelo escalonado</strong>: comenzar
  con el modelo más barato y escalar al más potente solo cuando la tarea lo
  requiere. Esto puede reducir costos entre un 40% y un 70% sin impacto
  significativo en la calidad.
</p>
<pre><code class="language-typescript">// Análisis de costo por sesión de trabajo
interface CostReport {
  session: string;
  models: Record&lt;string, {
    requests: number;
    inputTokens: number;
    outputTokens: number;
    cost: number;
  }&gt;;
  totalCost: number;
}

function analyzeCost(logs: SessionLog[]): CostReport {
  const report: CostReport = {
    session: new Date().toISOString(),
    models: {},
    totalCost: 0,
  };

  for (const log of logs) {
    const model = report.models[log.model] ??= {
      requests: 0, inputTokens: 0,
      outputTokens: 0, cost: 0,
    };
    model.requests++;
    model.inputTokens += log.inputTokens;
    model.outputTokens += log.outputTokens;
    model.cost += calculateCost(log);
    report.totalCost += model.cost;
  }

  return report;
}
</code></pre>
<ul>
  <li><strong>Presupuesto por proyecto:</strong> Establece un límite diario en dólares.</li>
  <li><strong>Modelo escalonado:</strong> Flash primero, Pro solo si Flash falla.</li>
  <li><strong>Monitoreo continuo:</strong> Revisa reportes de costo después de cada sesión.</li>
  <li><strong>Cache de respuestas:</strong> Reutiliza resultados para prompts repetidos.</li>
</ul>`,
        warning: 'Sin control de costos, un agente autónomo ejecutando tareas en bucle puede consumir cientos de dólares en pocas horas. Siempre configura límites.',
      },
      /* ── 10.5 ── */
      {
        id: 'c10-s5',
        title: 'Benchmarking de resultados',
        content: `
<p>
  Comparar modelos no es solo cuestión de costo. La calidad del código generado,
  la precisión del debugging y la adherencia a convenciones del proyecto son
  métricas igualmente importantes. Antigravity permite configurar
  <strong>benchmark suites</strong> personalizadas para tu equipo.
</p>
<p>
  Un benchmark efectivo incluye tareas representativas de tu proyecto real:
  corrección de bugs conocidos, implementación de features con spec definido,
  y refactoring de código existente. Cada tarea se ejecuta con múltiples modelos
  y los resultados se comparan automáticamente.
</p>
<pre><code class="language-typescript">// Benchmark suite para comparar modelos
interface BenchmarkTask {
  name: string;
  prompt: string;
  expectedFiles: string[];
  validationScript: string;
}

interface BenchmarkResult {
  model: string;
  task: string;
  passed: boolean;
  executionTimeMs: number;
  tokensUsed: number;
  cost: number;
}

const benchmarkSuite: BenchmarkTask[] = [
  {
    name: 'fix-auth-bug',
    prompt: 'Corrige el bug de autenticación en src/auth/login.ts',
    expectedFiles: ['src/auth/login.ts', 'src/auth/__tests__/login.test.ts'],
    validationScript: 'npm run test -- --filter auth',
  },
  {
    name: 'add-dark-mode',
    prompt: 'Implementa dark mode toggle en el componente Header',
    expectedFiles: ['src/components/Header.tsx', 'src/styles/theme.css'],
    validationScript: 'npm run build &amp;&amp; npm run test',
  },
];

// Ejecutar benchmark comparando modelos
async function runBenchmark(
  tasks: BenchmarkTask[],
  models: string[],
): Promise&lt;BenchmarkResult[]&gt; {
  const results: BenchmarkResult[] = [];
  for (const model of models) {
    for (const task of tasks) {
      const result = await executeWithModel(model, task);
      results.push(result);
    }
  }
  return results;
}
</code></pre>
<ul>
  <li>Ejecuta el mismo prompt con distintos modelos para comparar objetivamente.</li>
  <li>Mide <strong>calidad</strong> (tests pasados), <strong>velocidad</strong> y <strong>costo</strong>.</li>
  <li>Automatiza benchmarks en CI/CD para detectar regresiones de calidad.</li>
</ul>`,
        tip: 'Crea un directorio benchmarks/ en tu proyecto con tareas reales. Ejecuta "agy benchmark run" para obtener un reporte comparativo automático.',
      },
    ],
    keyTakeaways: [
      'No existe un modelo único perfecto — cada tarea tiene su modelo ideal',
      'El routing por complejidad puede reducir costos un 40-70% sin perder calidad',
      'Las fallback chains garantizan disponibilidad continua del agente',
      'Monitorea costos activamente: un agente sin límites puede ser costoso',
      'Usa benchmarks con tareas reales de tu proyecto, no benchmarks genéricos',
    ],
  },

  /* ──────────────────────────────────────────────
     CURSO 11 — Flujos de Depuración Agéntica
     ────────────────────────────────────────────── */
  11: {
    id: 11,
    objectives: [
      'Comprender el ciclo completo de depuración autónoma en Antigravity',
      'Implementar detección automática de errores con grep_search y run_command',
      'Configurar el loop test-fix-verify para corrección iterativa',
      'Aplicar patching en sandbox para aislar cambios experimentales',
      'Prevenir regresiones con patrones de verificación automatizada',
    ],
    prerequisites: [
      'Curso 7: Creación de Agent Skills',
      'Curso 8: Antigravity CLI (agy)',
      'Experiencia escribiendo tests unitarios',
    ],
    estimatedTime: '4 horas',
    difficulty: 'Avanzado',
    sections: [
      /* ── 11.1 ── */
      {
        id: 'c11-s1',
        title: 'El loop de depuración',
        content: `
<p>
  La depuración agéntica redefine el flujo tradicional de debugging. En lugar de
  que un humano inspeccione manualmente cada error, el agente Antigravity
  ejecuta un <strong>loop autónomo</strong> que detecta el error, analiza la
  causa raíz, propone un fix, lo aplica y verifica que el test pasa.
</p>
<p>
  Este ciclo se repite automáticamente hasta que todos los tests pasan o se
  alcanza un límite de iteraciones configurado. El loop sigue el patrón
  <strong>Red → Fix → Green</strong>, inspirado en TDD pero ejecutado por
  el agente sin intervención humana.
</p>
<pre><code class="language-typescript">// El loop fundamental de depuración agéntica
interface DebugIteration {
  iteration: number;
  errorDetected: string | null;
  fixApplied: string | null;
  testsPassed: boolean;
}

async function debugLoop(
  maxIterations: number = 5,
): Promise&lt;DebugIteration[]&gt; {
  const history: DebugIteration[] = [];

  for (let i = 1; i &lt;= maxIterations; i++) {
    // 1. Ejecutar tests
    const testResult = await runCommand('npm run test 2&gt;&amp;1');

    // 2. Verificar resultado
    if (testResult.exitCode === 0) {
      history.push({
        iteration: i, errorDetected: null,
        fixApplied: null, testsPassed: true,
      });
      break; // ¡Todos los tests pasan!
    }

    // 3. Analizar error
    const error = parseTestError(testResult.stdout);

    // 4. Generar y aplicar fix
    const fix = await generateFix(error);
    await applyFix(fix);

    history.push({
      iteration: i, errorDetected: error.message,
      fixApplied: fix.description, testsPassed: false,
    });
  }

  return history;
}
</code></pre>
<ul>
  <li><strong>Detección:</strong> El agente ejecuta tests y captura la salida de error.</li>
  <li><strong>Análisis:</strong> Parsea el stack trace para identificar el archivo y línea exacta.</li>
  <li><strong>Fix:</strong> Genera un parche usando el contexto del código fuente.</li>
  <li><strong>Verificación:</strong> Re-ejecuta los tests para confirmar la corrección.</li>
</ul>`,
        tip: 'Configura maxIterations entre 3 y 7. Menos de 3 puede ser insuficiente para bugs complejos; más de 7 indica que el agente necesita intervención humana.',
      },
      /* ── 11.2 ── */
      {
        id: 'c11-s2',
        title: 'Diagnóstico autónomo',
        content: `
<p>
  El diagnóstico autónomo es la capacidad del agente de localizar la causa raíz
  de un error sin asistencia humana. Antigravity combina múltiples herramientas
  para lograr esto: <code>grep_search</code> para encontrar patrones en el
  código, <code>view_file</code> para inspeccionar el contexto, y
  <code>run_command</code> para ejecutar diagnósticos.
</p>
<p>
  La clave es enseñarle al agente a pensar como un detective: seguir las pistas
  del stack trace, buscar patrones similares en el codebase, y verificar
  hipótesis antes de aplicar cambios. Las skills de debugging que definas en
  <code>.agents/skills/</code> pueden codificar estos patrones de investigación.
</p>
<pre><code class="language-typescript">// Flujo de diagnóstico autónomo
async function diagnoseError(error: ParsedError): Promise&lt;Diagnosis&gt; {
  // Paso 1: Buscar el error en el código fuente
  const occurrences = await grepSearch({
    query: error.functionName,
    searchPath: '/src',
    matchPerLine: true,
  });

  // Paso 2: Inspeccionar el archivo del stack trace
  const sourceContext = await viewFile({
    absolutePath: error.filePath,
    startLine: Math.max(1, error.line - 10),
    endLine: error.line + 10,
  });

  // Paso 3: Buscar cambios recientes en el archivo
  const recentChanges = await runCommand(
    \`git log --oneline -5 -- \${error.filePath}\`,
  );

  // Paso 4: Verificar si hay tests existentes
  const testFile = error.filePath
    .replace('/src/', '/src/__tests__/')
    .replace('.ts', '.test.ts');
  const hasTests = await fileExists(testFile);

  return {
    rootCause: analyzeContext(sourceContext, occurrences),
    recentChanges: recentChanges.stdout,
    hasExistingTests: hasTests,
    suggestedFix: generateFixSuggestion(sourceContext, error),
  };
}
</code></pre>
<ul>
  <li><strong>grep_search:</strong> Localiza todas las ocurrencias del símbolo problemático.</li>
  <li><strong>git log:</strong> Identifica commits recientes que podrían haber introducido el bug.</li>
  <li><strong>Contexto expandido:</strong> Lee 10 líneas antes y después del error para entender el flujo.</li>
</ul>`,
        warning: 'El diagnóstico autónomo funciona mejor en codebases con buena cobertura de tests. Sin tests, el agente no tiene señal clara de qué está roto.',
      },
      /* ── 11.3 ── */
      {
        id: 'c11-s3',
        title: 'Sandbox patching',
        content: `
<p>
  El <strong>sandbox patching</strong> es una técnica donde el agente aplica sus
  fixes en un workspace aislado (branch) antes de integrarlos al código
  principal. Antigravity soporta esto nativamente con el parámetro
  <code>Workspace: 'branch'</code> al invocar subagentes.
</p>
<p>
  Este aislamiento permite que el agente experimente con múltiples soluciones en
  paralelo sin contaminar el workspace principal. Cada subagente trabaja en su
  propia copia del repositorio y solo los cambios verificados se propagan de
  vuelta.
</p>
<pre><code class="language-typescript">// Patching en sandbox con subagentes
async function sandboxPatch(error: ParsedError): Promise&lt;PatchResult&gt; {
  // Crear subagente en workspace aislado
  const agent = await invokeSubagent({
    typeName: 'self',
    role: 'Bug Fixer',
    workspace: 'branch', // workspace aislado
    prompt: \`
      Corrige el siguiente error sin romper otros tests:
      Error: \${error.message}
      Archivo: \${error.filePath}:\${error.line}

      Pasos:
      1. Lee el archivo y entiende el contexto
      2. Aplica el fix mínimo necesario
      3. Ejecuta "npm run test" para verificar
      4. Si falla, intenta un enfoque alternativo
      5. Reporta el resultado final
    \`,
  });

  // El subagente trabaja de forma aislada
  // Sus cambios no afectan al workspace principal
  // hasta que se hace merge explícito
  return await waitForResult(agent.conversationId);
}
</code></pre>
<p>
  La ventaja del sandbox es que si el fix del agente introduce nuevos problemas,
  simplemente se descarta el branch sin impacto. Esto es especialmente valioso
  cuando el agente está experimentando con fixes para bugs complejos donde la
  primera solución no siempre es la correcta.
</p>
<ul>
  <li><strong>Aislamiento total:</strong> Cada intento de fix vive en su propio branch.</li>
  <li><strong>Paralelismo:</strong> Múltiples estrategias de fix se prueban simultáneamente.</li>
  <li><strong>Rollback gratuito:</strong> Descartar un branch fallido no tiene costo.</li>
</ul>`,
        tip: 'Usa workspace: "branch" para bugs críticos y workspace: "inherit" para fixes triviales donde el riesgo de regresión es bajo.',
      },
      /* ── 11.4 ── */
      {
        id: 'c11-s4',
        title: 'Verificación cíclica',
        content: `
<p>
  La verificación cíclica asegura que cada fix no solo resuelve el error
  original sino que no introduce nuevos problemas. Antigravity implementa un
  pipeline de verificación de múltiples etapas que va desde tests unitarios
  hasta build completo del proyecto.
</p>
<p>
  El pipeline de verificación sigue un orden estricto: primero los tests
  directamente relacionados con el fix, luego los tests del módulo afectado,
  después la suite completa, y finalmente el build de producción. Si cualquier
  etapa falla, el agente vuelve al paso de diagnóstico.
</p>
<pre><code class="language-typescript">// Pipeline de verificación multinivel
interface VerificationStage {
  name: string;
  command: string;
  required: boolean;
}

const verificationPipeline: VerificationStage[] = [
  {
    name: 'Tests relacionados',
    command: 'npm run test -- --filter \${affectedModule}',
    required: true,
  },
  {
    name: 'Suite completa',
    command: 'npm run test',
    required: true,
  },
  {
    name: 'Lint y tipos',
    command: 'npm run lint &amp;&amp; npx tsc --noEmit',
    required: true,
  },
  {
    name: 'Build de producción',
    command: 'npm run build',
    required: false, // advertencia, no bloqueo
  },
];

async function verifyCyclically(
  fix: AppliedFix,
  pipeline: VerificationStage[],
): Promise&lt;VerificationReport&gt; {
  const results: StageResult[] = [];

  for (const stage of pipeline) {
    const result = await runCommand(stage.command);
    results.push({
      stage: stage.name,
      passed: result.exitCode === 0,
      output: result.stdout,
    });

    if (!result.exitCode === 0 &amp;&amp; stage.required) {
      return { passed: false, failedAt: stage.name, results };
    }
  }

  return { passed: true, failedAt: null, results };
}
</code></pre>
<ul>
  <li><strong>Etapas incrementales:</strong> De lo específico a lo general.</li>
  <li><strong>Etapas opcionales:</strong> El build de producción advierte pero no bloquea.</li>
  <li><strong>Reporte detallado:</strong> Cada etapa registra su resultado para análisis posterior.</li>
</ul>`,
      },
      /* ── 11.5 ── */
      {
        id: 'c11-s5',
        title: 'Patrones anti-regresión',
        content: `
<p>
  El peor escenario en debugging agéntico es cuando el agente "arregla" un bug
  e introduce otro. Los patrones anti-regresión son estrategias diseñadas para
  prevenir este ciclo destructivo y garantizar que la calidad del código solo
  puede mejorar, nunca empeorar.
</p>
<p>
  El patrón más efectivo es el <strong>snapshot testing</strong>: antes de
  cualquier fix, el agente captura el estado actual de todos los tests. Después
  del fix, verifica que ningún test que antes pasaba ahora falle. Si detecta
  una regresión, revierte automáticamente los cambios.
</p>
<pre><code class="language-typescript">// Patrón anti-regresión con snapshot
interface TestSnapshot {
  timestamp: string;
  results: Record&lt;string, 'pass' | 'fail' | 'skip'&gt;;
}

async function antiRegressionGuard(
  fix: () =&gt; Promise&lt;void&gt;,
): Promise&lt;{ success: boolean; regressions: string[] }&gt; {
  // 1. Capturar estado antes del fix
  const before = await captureTestSnapshot();

  // 2. Aplicar el fix
  await fix();

  // 3. Capturar estado después del fix
  const after = await captureTestSnapshot();

  // 4. Detectar regresiones
  const regressions: string[] = [];
  for (const [test, status] of Object.entries(before.results)) {
    if (status === 'pass' &amp;&amp; after.results[test] === 'fail') {
      regressions.push(test);
    }
  }

  // 5. Revertir si hay regresiones
  if (regressions.length &gt; 0) {
    await runCommand('git checkout -- .');
    return { success: false, regressions };
  }

  // 6. Commit si todo está bien
  await runCommand('git add -A &amp;&amp; git commit -m "fix: auto-patch"');
  return { success: true, regressions: [] };
}
</code></pre>
<ul>
  <li><strong>Snapshot antes/después:</strong> Compara el estado exacto de cada test.</li>
  <li><strong>Rollback automático:</strong> Si un test que pasaba ahora falla, se revierte todo.</li>
  <li><strong>Commit solo en verde:</strong> Los cambios solo se persisten si mejoran el estado.</li>
  <li><strong>Log de regresiones:</strong> Registra qué tests regresaron para análisis humano.</li>
</ul>`,
        warning: 'El rollback automático con "git checkout -- ." descarta TODOS los cambios no commiteados. Asegúrate de hacer commits parciales antes de experimentar.',
      },
    ],
    keyTakeaways: [
      'El loop Red → Fix → Green automatiza el 80% del debugging rutinario',
      'grep_search y git log son las herramientas clave para diagnóstico autónomo',
      'El sandbox patching elimina el riesgo de contaminar el workspace principal',
      'La verificación cíclica multinivel previene fixes que crean nuevos bugs',
      'Los snapshots de tests antes/después son la mejor defensa anti-regresión',
    ],
  },

  /* ──────────────────────────────────────────────
     CURSO 12 — Vibe Coding: Desarrollo End-to-End
     ────────────────────────────────────────────── */
  12: {
    id: 12,
    objectives: [
      'Comprender la filosofía y principios del Vibe Coding',
      'Dominar el rol de arquitecto humano en el desarrollo asistido por IA',
      'Utilizar el comando /goal para delegar proyectos completos',
      'Implementar gates de calidad y revisión durante la ejecución',
      'Analizar casos de estudio reales de desarrollo end-to-end con Antigravity',
    ],
    prerequisites: [
      'Cursos 1-11 completados',
      'Experiencia liderando proyectos de software',
      'Familiaridad con arquitectura de aplicaciones web modernas',
    ],
    estimatedTime: '5 horas',
    difficulty: 'Experto',
    sections: [
      /* ── 12.1 ── */
      {
        id: 'c12-s1',
        title: 'Filosofía del Vibe Coding',
        content: `
<p>
  El <strong>Vibe Coding</strong> es un paradigma de desarrollo donde el
  programador actúa exclusivamente como <em>director</em> y <em>revisor</em>,
  delegando toda la implementación al agente de IA. El término, acuñado por
  Andrej Karpathy, describe el flujo donde "te rindes al vibe" y dejas que la
  IA escriba todo el código mientras tú supervisas la dirección.
</p>
<p>
  En el contexto de Antigravity, Vibe Coding no es "ser perezoso" — es un skill
  avanzado que requiere dominio profundo de arquitectura para poder describir
  exactamente lo que quieres sin escribir una sola línea de código. El humano se
  convierte en el <strong>cerebro estratégico</strong> mientras el agente es el
  <strong>ejecutor táctico</strong>.
</p>
<pre><code class="language-markdown">## Los 5 principios del Vibe Coding con Antigravity

1. **Intención clara, ejecución delegada**
   Describe el QUÉ y el POR QUÉ, nunca el CÓMO.

2. **Confianza verificada**
   Confía en el agente, pero verifica cada entrega.

3. **Iteración rápida**
   Prefiere ciclos cortos de feedback sobre planes largos.

4. **Contexto es rey**
   Mientras más contexto des, mejor será el resultado.

5. **El humano decide, la IA ejecuta**
   Las decisiones de diseño siempre son tuyas.
</code></pre>
<p>
  La diferencia entre un principiante y un experto en Vibe Coding es la
  <strong>calidad de los prompts</strong>. Un experto sabe exactamente qué
  información incluir, qué restricciones establecer y qué nivel de autonomía
  otorgar al agente para cada tipo de tarea.
</p>
<ul>
  <li>El Vibe Coding es un <strong>skill avanzado</strong>, no un atajo para principiantes.</li>
  <li>Requiere conocimiento profundo de arquitectura y mejores prácticas.</li>
  <li>El objetivo es maximizar la productividad sin sacrificar la calidad.</li>
</ul>`,
        tip: 'El Vibe Coding funciona mejor cuando ya dominas el stack tecnológico. No delegues lo que no puedes revisar.',
      },
      /* ── 12.2 ── */
      {
        id: 'c12-s2',
        title: 'El rol del arquitecto humano',
        content: `
<p>
  En el flujo de Vibe Coding, el humano asume el rol de <strong>arquitecto de
  software</strong> y <strong>product owner</strong> simultáneamente. Tu trabajo
  no es escribir código sino tomar las decisiones de alto nivel que definen la
  calidad del producto final.
</p>
<p>
  Las decisiones que siempre deben ser humanas incluyen: selección de stack
  tecnológico, diseño de la base de datos, definición de la API pública,
  estrategia de seguridad y experiencia de usuario. El agente ejecuta estas
  decisiones, pero no las toma por ti.
</p>
<pre><code class="language-typescript">// Ejemplo: Prompt de nivel arquitecto
const architectPrompt = \`
Crea una aplicación de gestión de inventarios con:

## Stack
- Frontend: React + Vite + TypeScript
- Backend: FastAPI + Python 3.12
- Database: Firestore
- Auth: Firebase Authentication (Google Sign-In)
- Hosting: Firebase Hosting + Cloud Run

## Arquitectura
- Clean Architecture con separación de capas
- Repository pattern para acceso a datos
- Error handling centralizado con tipos discriminados

## Seguridad
- Validación de inputs con Zod (frontend) y Pydantic (backend)
- CORS configurado solo para el dominio de producción
- Firebase Security Rules deny-by-default
- Rate limiting en endpoints públicos

## UX
- Dark mode como default
- Responsive mobile-first
- Skeleton loaders en lugar de spinners
- Notificaciones toast para feedback de acciones
\`;
</code></pre>
<ul>
  <li><strong>Define el stack</strong> con versiones específicas para evitar ambigüedad.</li>
  <li><strong>Especifica patrones</strong> de arquitectura que el agente debe seguir.</li>
  <li><strong>Establece restricciones</strong> de seguridad como requisitos no negociables.</li>
  <li><strong>Describe la UX</strong> con suficiente detalle para que el agente implemente sin preguntar.</li>
</ul>`,
        warning: 'Nunca delegues decisiones de seguridad al agente sin restricciones explícitas. Siempre define reglas de seguridad como requisitos obligatorios.',
      },
      /* ── 12.3 ── */
      {
        id: 'c12-s3',
        title: 'Flujo /goal para proyectos completos',
        content: `
<p>
  El comando <code>/goal</code> de Antigravity es la herramienta definitiva para
  Vibe Coding. A diferencia de un prompt normal, <code>/goal</code> indica al
  agente que debe trabajar de forma <strong>autónoma y exhaustiva</strong> hasta
  completar el objetivo, sin detenerse a pedir confirmación en cada paso.
</p>
<p>
  Un buen goal combina la visión de alto nivel con restricciones técnicas
  específicas. El agente interpretará el goal, creará un plan de implementación,
  y lo ejecutará paso a paso, haciendo commits después de cada milestone
  significativo.
</p>
<pre><code class="language-markdown">## Ejemplo de /goal efectivo

/goal Crea un dashboard de analytics para la app de inventarios.

### Requisitos funcionales
- Página /dashboard con métricas clave (items totales, valor,
  movimientos del mes)
- Gráficos interactivos con Chart.js: línea (tendencia), barras
  (categorías), dona (distribución)
- Filtros por rango de fecha y categoría
- Exportar datos a CSV
- Responsive: cards apiladas en móvil, grid en desktop

### Requisitos técnicos
- Componentes React reutilizables con TypeScript estricto
- Custom hooks para data fetching con loading/error states
- Tests unitarios para cada componente con Vitest
- Tests de integración para los endpoints de datos
- Seguir el Design System existente (ver .agents/skills/design-system/)

### Lo que NO hacer
- No instalar librerías de UI pesadas (no Material UI, no Ant Design)
- No crear endpoints nuevos si ya existen equivalentes
- No modificar la estructura de la base de datos existente
</code></pre>
<p>
  Los goals más efectivos incluyen una sección "Lo que NO hacer" que establece
  límites claros. Sin estas restricciones, el agente podría tomar decisiones
  válidas pero no alineadas con tu visión del proyecto.
</p>
<ul>
  <li><strong>/goal</strong> activa el modo autónomo extendido del agente.</li>
  <li>Incluye requisitos funcionales Y técnicos en el mismo prompt.</li>
  <li>La sección "Lo que NO hacer" previene decisiones no deseadas.</li>
  <li>El agente hará commits incrementales para facilitar la revisión.</li>
</ul>`,
        tip: 'Usa /goal para tareas que tomarían más de 2 horas manualmente. Para tareas cortas, un prompt normal es más eficiente.',
      },
      /* ── 12.4 ── */
      {
        id: 'c12-s4',
        title: 'Revisión y control de calidad',
        content: `
<p>
  El Vibe Coding sin revisión es negligencia profesional. Aunque el agente
  escriba todo el código, el humano es responsable de la calidad final. Un
  flujo de revisión efectivo incluye <strong>quality gates</strong> automáticos
  y revisión humana en puntos críticos.
</p>
<p>
  Los quality gates son verificaciones automatizadas que el agente ejecuta
  después de cada milestone. Si un gate falla, el agente debe corregir el
  problema antes de avanzar. Los gates típicos incluyen: compilación exitosa,
  tests pasando, lint sin errores, y build de producción exitoso.
</p>
<pre><code class="language-typescript">// Quality gates para Vibe Coding
interface QualityGate {
  name: string;
  check: string;
  blocking: boolean;
  autofix: boolean;
}

const qualityGates: QualityGate[] = [
  {
    name: 'TypeScript compila',
    check: 'npx tsc --noEmit',
    blocking: true,
    autofix: true,  // el agente corrige errores de tipo
  },
  {
    name: 'Tests pasan',
    check: 'npm run test',
    blocking: true,
    autofix: true,
  },
  {
    name: 'Sin errores de lint',
    check: 'npm run lint',
    blocking: false, // advertencia, no bloqueo
    autofix: true,
  },
  {
    name: 'Build exitoso',
    check: 'npm run build',
    blocking: true,
    autofix: false, // requiere revisión humana
  },
  {
    name: 'Sin secretos expuestos',
    check: 'npx secretlint "**/*"',
    blocking: true,
    autofix: false, // NUNCA auto-fix secretos
  },
];

// El agente ejecuta gates después de cada milestone
async function runQualityGates(
  gates: QualityGate[],
): Promise&lt;GateReport&gt; {
  for (const gate of gates) {
    const result = await runCommand(gate.check);
    if (result.exitCode !== 0 &amp;&amp; gate.blocking) {
      if (gate.autofix) {
        await autoFixIssue(gate, result.stderr);
      } else {
        throw new Error(
          \`Gate "\${gate.name}" falló y requiere revisión humana\`,
        );
      }
    }
  }
  return { allPassed: true };
}
</code></pre>
<ul>
  <li><strong>Gates bloqueantes:</strong> El agente no puede avanzar si fallan.</li>
  <li><strong>Autofix selectivo:</strong> Solo para problemas seguros de resolver automáticamente.</li>
  <li><strong>Revisión humana obligatoria:</strong> Secretos y builds nunca se auto-corrigen.</li>
</ul>`,
        warning: 'Nunca confíes ciegamente en el código generado por IA. Revisa especialmente: manejo de autenticación, queries a la base de datos, y lógica de negocio.',
      },
      /* ── 12.5 ── */
      {
        id: 'c12-s5',
        title: 'Casos de estudio reales',
        content: `
<p>
  El Vibe Coding no es teoría — es un flujo de trabajo probado en proyectos
  reales de producción. A continuación presentamos tres casos donde el enfoque
  de desarrollo end-to-end con Antigravity transformó la productividad de
  equipos reales.
</p>

<h4>Caso 1: Landing Page Premium en 45 minutos</h4>
<p>
  Un desarrollador usó un solo <code>/goal</code> para crear una landing page
  completa con starfield 3D, glassmorphism, scroll reveal, y responsive design.
  El agente generó HTML, CSS, y JavaScript en una sola sesión, incluyendo
  micro-animaciones y optimización de rendimiento. Tiempo total: 45 minutos
  desde el prompt hasta el deploy en Firebase Hosting.
</p>

<h4>Caso 2: Dashboard de Datos con 6 endpoints</h4>
<p>
  Un equipo delegó la creación de un dashboard de analytics con React + FastAPI.
  El agente implementó 6 endpoints REST, componentes React con Chart.js,
  integración con Firestore, y tests unitarios. El proceso tomó 3 horas con
  el humano revisando cada milestone antes de aprobar el avance.
</p>

<h4>Caso 3: Migración de Codebase Legacy</h4>
<pre><code class="language-markdown">## Prompt real usado para la migración

/goal Migra el módulo de autenticación de JavaScript vanilla a
TypeScript + Firebase Auth.

### Estado actual
- 12 archivos JS en src/auth/
- Tests en Jest con cobertura del 60%
- Sin tipos definidos
- Usa localStorage para tokens (inseguro)

### Objetivo
- Convertir todos los archivos a TypeScript estricto
- Reemplazar localStorage con Firebase Auth session
- Mantener todos los tests existentes pasando
- Agregar tests para los nuevos flujos de Firebase Auth
- Documentar los cambios en un MIGRATION.md

### Restricciones
- No cambiar la interfaz pública de las funciones
- No modificar componentes que usan el módulo
- Migración incremental: un archivo a la vez con commit
</code></pre>
<p>
  La migración se completó en 4 horas con 12 commits incrementales. El agente
  migró cada archivo individualmente, mantuvo la compatibilidad hacia atrás,
  y generó documentación automática del proceso.
</p>
<ul>
  <li>Los mejores resultados requieren <strong>prompts detallados</strong> con contexto del estado actual.</li>
  <li>Los <strong>commits incrementales</strong> permiten revertir problemas sin perder progreso.</li>
  <li>Las <strong>restricciones claras</strong> previenen que el agente tome atajos.</li>
</ul>`,
        tip: 'Documenta tus mejores prompts de /goal en un directorio prompts/ del proyecto. Los buenos prompts son reutilizables y mejoran con el tiempo.',
      },
    ],
    keyTakeaways: [
      'Vibe Coding es un skill avanzado que requiere dominio de arquitectura, no un atajo',
      'El humano es el arquitecto y product owner; el agente es el ejecutor táctico',
      'El comando /goal es la herramienta más poderosa para delegación end-to-end',
      'Los quality gates automáticos son obligatorios — nunca confíes ciegamente en el código generado',
      'Documenta y reutiliza tus mejores prompts como activos del equipo',
    ],
  },

  /* ──────────────────────────────────────────────
     CURSO 13 — Antigravity SDK & Codelabs Hub
     ────────────────────────────────────────────── */
  13: {
    id: 13,
    objectives: [
      'Instalar y configurar el Google Antigravity SDK en un proyecto',
      'Comprender la Agent API para definir agentes programáticos',
      'Construir sistemas multi-agente con orquestación personalizada',
      'Crear pipelines de deployment para agentes en producción',
      'Explorar los codelabs oficiales y la documentación de referencia',
    ],
    prerequisites: [
      'Todos los cursos anteriores (1-12)',
      'Experiencia con Node.js/TypeScript en producción',
      'Conocimiento de Google Cloud Platform (Cloud Run, IAM)',
    ],
    estimatedTime: '5 horas',
    difficulty: 'Experto',
    sections: [
      /* ── 13.1 ── */
      {
        id: 'c13-s1',
        title: 'Introducción al SDK',
        content: `
<p>
  El <strong>Google Antigravity SDK</strong> (AGY SDK) es la biblioteca oficial
  que permite crear, configurar y desplegar agentes de IA programáticamente.
  A diferencia de usar Antigravity desde el editor, el SDK te da control total
  sobre el ciclo de vida del agente desde tu propio código.
</p>
<p>
  El SDK está diseñado para TypeScript/Node.js y expone una API declarativa
  para definir agentes, sus herramientas, modelos y comportamiento. Con el SDK,
  puedes construir aplicaciones que usen agentes como componentes internos de
  tu arquitectura, no solo como asistentes de desarrollo.
</p>
<pre><code class="language-bash"># Instalación del SDK
npm install @anthropic-ai/sdk @google/antigravity-sdk

# Verificar instalación
npx agy --version
</code></pre>
<pre><code class="language-typescript">// Configuración inicial del SDK
import { AntigravitySDK, AgentConfig } from '@google/antigravity-sdk';

// Inicializar con credenciales de Google Cloud
const agy = new AntigravitySDK({
  projectId: 'mi-proyecto-gcp',
  region: 'us-central1',
  credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Verificar conexión
const status = await agy.healthCheck();
console.log('SDK Status:', status);
// { connected: true, version: '2.5.0', model: 'gemini-2.5-pro' }
</code></pre>
<p>
  El SDK maneja automáticamente la autenticación con Google Cloud, la selección
  de modelos y el routing de herramientas. Tu trabajo es definir la lógica de
  negocio y las capacidades específicas de cada agente.
</p>
<ul>
  <li><strong>TypeScript-first:</strong> Tipos estrictos para toda la API.</li>
  <li><strong>Google Cloud nativo:</strong> Autenticación y despliegue integrados.</li>
  <li><strong>Declarativo:</strong> Define qué hace el agente, no cómo lo hace.</li>
</ul>`,
        tip: 'Usa Application Default Credentials (ADC) para desarrollo local: ejecuta "gcloud auth application-default login" antes de usar el SDK.',
      },
      /* ── 13.2 ── */
      {
        id: 'c13-s2',
        title: 'Google Antigravity Agent API',
        content: `
<p>
  La <strong>Agent API</strong> es el corazón del SDK. Proporciona primitivas
  para crear agentes con personalidad, herramientas y comportamiento definidos
  programáticamente. Cada agente se define como un objeto de configuración que
  el SDK convierte en una instancia ejecutable.
</p>
<p>
  A diferencia de un chatbot simple, un agente definido con la Agent API puede
  usar herramientas del sistema (leer archivos, ejecutar comandos, buscar en la
  web), mantener estado entre interacciones, y coordinarse con otros agentes
  en un sistema multi-agente.
</p>
<pre><code class="language-typescript">import {
  defineAgent,
  Tool,
  AgentResponse,
} from '@google/antigravity-sdk';

// Definir un agente especializado
const codeReviewer = defineAgent({
  name: 'CodeReviewer',
  description: 'Revisa código TypeScript según estándares del equipo',
  model: 'gemini-2.5-pro',

  systemPrompt: \`
    Eres un revisor de código senior. Analiza cada archivo
    buscando:
    - Errores de tipo y null safety
    - Violaciones de Clean Architecture
    - Problemas de rendimiento
    - Vulnerabilidades de seguridad
    Da feedback constructivo y específico.
  \`,

  tools: [
    Tool.readFile(),
    Tool.grepSearch(),
    Tool.runCommand({ allowList: ['npm run lint', 'npx tsc'] }),
  ],

  maxIterations: 10,
  temperature: 0.2, // baja creatividad para análisis
});

// Ejecutar el agente
const review: AgentResponse = await codeReviewer.run({
  prompt: 'Revisa los cambios en el último commit',
  workspace: '/path/to/project',
});

console.log(review.summary);
console.log(review.findings); // lista de issues encontrados
</code></pre>
<ul>
  <li><strong>defineAgent:</strong> Crea una definición reutilizable de agente.</li>
  <li><strong>Tools:</strong> Herramientas que el agente puede usar durante su ejecución.</li>
  <li><strong>maxIterations:</strong> Límite de ciclos para prevenir loops infinitos.</li>
  <li><strong>temperature:</strong> Control de creatividad vs. precisión en respuestas.</li>
</ul>`,
        warning: 'Siempre configura maxIterations para agentes en producción. Sin límite, un agente puede entrar en un loop infinito que consume recursos indefinidamente.',
      },
      /* ── 13.3 ── */
      {
        id: 'c13-s3',
        title: 'Definición de agentes programáticos',
        content: `
<p>
  Los agentes programáticos van más allá de la configuración básica. Permiten
  definir <strong>lógica de negocio personalizada</strong> que el agente ejecuta
  como parte de su flujo de trabajo. Puedes crear hooks para antes/después de
  cada acción, validadores de output, y transformadores de contexto.
</p>
<p>
  Un patrón poderoso es el <strong>agente con memoria</strong>: un agente que
  persiste conocimiento entre sesiones usando Firestore o un archivo local.
  Esto permite que el agente "recuerde" decisiones pasadas, preferencias del
  equipo y lecciones aprendidas.
</p>
<pre><code class="language-typescript">import {
  defineAgent,
  Tool,
  Middleware,
  MemoryStore,
} from '@google/antigravity-sdk';

// Middleware personalizado para logging
const auditMiddleware: Middleware = {
  beforeAction: async (action) =&gt; {
    console.log(\`[AUDIT] Ejecutando: \${action.tool} en \${action.target}\`);
    return action; // permitir la acción
  },
  afterAction: async (action, result) =&gt; {
    await logToFirestore('agent-audit', {
      tool: action.tool,
      target: action.target,
      success: result.success,
      timestamp: new Date(),
    });
    return result;
  },
};

// Agente con memoria persistente
const smartAssistant = defineAgent({
  name: 'SmartAssistant',
  description: 'Asistente con memoria y logging de auditoría',
  model: 'gemini-2.5-pro',

  memory: new MemoryStore({
    backend: 'firestore',
    collection: 'agent-memory',
    maxEntries: 1000,
  }),

  middleware: [auditMiddleware],

  tools: [
    Tool.readFile(),
    Tool.writeFile(),
    Tool.grepSearch(),
    Tool.runCommand(),
    Tool.searchWeb(),
  ],

  hooks: {
    onError: async (error) =&gt; {
      await notifySlack(\`Agent error: \${error.message}\`);
    },
    onComplete: async (result) =&gt; {
      await saveMetrics(result.tokensUsed, result.cost);
    },
  },
});
</code></pre>
<ul>
  <li><strong>Middleware:</strong> Intercepta cada acción para logging, validación o transformación.</li>
  <li><strong>MemoryStore:</strong> Persistencia entre sesiones con Firestore como backend.</li>
  <li><strong>Hooks:</strong> Callbacks para errores, completitud y eventos del ciclo de vida.</li>
  <li><strong>Auditoría:</strong> Registro completo de cada acción para compliance.</li>
</ul>`,
        tip: 'Usa el middleware de auditoría en producción para mantener un log de todo lo que hace cada agente. Esto es esencial para debugging y compliance.',
      },
      /* ── 13.4 ── */
      {
        id: 'c13-s4',
        title: 'Multi-agent systems',
        content: `
<p>
  Los sistemas multi-agente son la frontera más avanzada de Antigravity. En
  lugar de un solo agente que hace todo, puedes diseñar un
  <strong>equipo de agentes especializados</strong> que colaboran para resolver
  problemas complejos, cada uno con su propio rol y conjunto de herramientas.
</p>
<p>
  El patrón de orquestación más común es el <strong>supervisor-worker</strong>:
  un agente supervisor que analiza la tarea, la descompone en subtareas, y
  asigna cada una a un agente worker especializado. Los workers reportan
  resultados al supervisor, que los consolida en la respuesta final.
</p>
<pre><code class="language-typescript">import {
  defineAgent,
  defineOrchestrator,
  Tool,
} from '@google/antigravity-sdk';

// Definir agentes especializados
const frontendDev = defineAgent({
  name: 'FrontendDev',
  description: 'Desarrollador frontend React + TypeScript',
  model: 'gemini-2.5-pro',
  tools: [Tool.readFile(), Tool.writeFile(), Tool.runCommand()],
  systemPrompt: 'Eres un experto en React, TypeScript y CSS moderno.',
});

const backendDev = defineAgent({
  name: 'BackendDev',
  description: 'Desarrollador backend FastAPI + Python',
  model: 'gemini-2.5-pro',
  tools: [Tool.readFile(), Tool.writeFile(), Tool.runCommand()],
  systemPrompt: 'Eres un experto en FastAPI, Python y bases de datos.',
});

const qaEngineer = defineAgent({
  name: 'QAEngineer',
  description: 'Ingeniero de calidad y testing',
  model: 'gemini-2.5-flash', // Flash es suficiente para testing
  tools: [Tool.readFile(), Tool.runCommand(), Tool.grepSearch()],
  systemPrompt: 'Eres un QA engineer. Ejecuta y valida tests.',
});

// Orquestador que coordina los agentes
const teamOrchestrator = defineOrchestrator({
  name: 'DevTeamLead',
  agents: [frontendDev, backendDev, qaEngineer],
  strategy: 'supervisor', // supervisor-worker pattern

  planningPrompt: \`
    Descompón la tarea en subtareas para cada agente:
    - FrontendDev: cambios en UI/componentes React
    - BackendDev: cambios en API/endpoints Python
    - QAEngineer: ejecutar tests después de cada cambio
    Asigna tareas en paralelo cuando sea posible.
  \`,
});

// Ejecutar el equipo completo
const result = await teamOrchestrator.run({
  prompt: 'Agrega un módulo de notificaciones push al proyecto',
  workspace: '/path/to/project',
});
</code></pre>
<ul>
  <li><strong>Supervisor-Worker:</strong> Un líder descompone y asigna tareas a agentes especializados.</li>
  <li><strong>Paralelismo:</strong> Frontend y Backend trabajan simultáneamente en sus respectivas áreas.</li>
  <li><strong>QA integrado:</strong> El agente QA valida cada entrega antes de integrar al proyecto.</li>
  <li><strong>Modelos mixtos:</strong> Cada agente usa el modelo más adecuado para su rol.</li>
</ul>`,
        warning: 'Los sistemas multi-agente multiplican los costos. Un equipo de 3 agentes consume 3x tokens. Monitorea costos activamente en producción.',
      },
      /* ── 13.5 ── */
      {
        id: 'c13-s5',
        title: 'Codelabs y recursos oficiales',
        content: `
<p>
  Google Developers ofrece una colección de <strong>Codelabs</strong> oficiales
  para profundizar en cada aspecto del Antigravity SDK. Los codelabs son guías
  paso a paso con código funcional que puedes ejecutar en tu entorno local.
</p>
<p>
  Además de los codelabs, la documentación oficial incluye guías de referencia
  de la API, ejemplos de arquitectura, y un repositorio de templates que puedes
  usar como punto de partida para tus propios agentes.
</p>
<pre><code class="language-markdown">## Codelabs Recomendados

### Nivel 1: Fundamentals
- AGY-101: Tu primer agente con el SDK
- AGY-102: Herramientas personalizadas
- AGY-103: Memoria y estado persistente

### Nivel 2: Intermediate
- AGY-201: Middleware y hooks avanzados
- AGY-202: Integración con Firebase
- AGY-203: Testing de agentes con mocks

### Nivel 3: Advanced
- AGY-301: Orquestación multi-agente
- AGY-302: Deploy a Cloud Run
- AGY-303: Monitoreo y observabilidad

### Nivel 4: Expert
- AGY-401: Agentes con RAG (Retrieval-Augmented Generation)
- AGY-402: Fine-tuning de modelos para agentes
- AGY-403: Agentes en producción a escala
</code></pre>
<pre><code class="language-typescript">// Template rápido para iniciar un proyecto con el SDK
import { AntigravitySDK, defineAgent, Tool } from '@google/antigravity-sdk';

// 1. Inicializar SDK
const agy = new AntigravitySDK({
  projectId: process.env.GCP_PROJECT_ID!,
  region: 'us-central1',
});

// 2. Definir agente
const myAgent = defineAgent({
  name: 'MiAgente',
  description: 'Agente personalizado para mi proyecto',
  model: 'gemini-2.5-flash',
  tools: [Tool.readFile(), Tool.writeFile()],
  systemPrompt: 'Eres un asistente útil y preciso.',
});

// 3. Ejecutar
const response = await myAgent.run({
  prompt: 'Analiza el archivo README.md y sugiere mejoras',
  workspace: process.cwd(),
});

// 4. Procesar resultado
console.log(response.summary);
for (const action of response.actions) {
  console.log(\`- \${action.tool}: \${action.description}\`);
}
</code></pre>
<p>
  Cada codelab incluye un repositorio de referencia en GitHub con el código
  completo y las instrucciones para ejecutarlo localmente. Los codelabs se
  actualizan regularmente para reflejar las últimas versiones del SDK.
</p>
<ul>
  <li><strong>Codelabs:</strong> Guías prácticas paso a paso en codelabs.developers.google.com.</li>
  <li><strong>API Reference:</strong> Documentación técnica completa de cada método del SDK.</li>
  <li><strong>Templates:</strong> Proyectos base listos para clonar y personalizar.</li>
  <li><strong>Community:</strong> Foro de desarrolladores para preguntas y mejores prácticas.</li>
</ul>`,
        tip: 'Empieza con el codelab AGY-101 aunque seas experto. Cada codelab introduce patrones que se reutilizan en los niveles avanzados.',
      },
    ],
    keyTakeaways: [
      'El SDK de Antigravity permite crear agentes programáticos con control total',
      'La Agent API es declarativa: define qué hace el agente, no cómo lo hace',
      'Middleware y hooks permiten auditoría, logging y personalización del ciclo de vida',
      'Los sistemas multi-agente multiplican la capacidad pero requieren monitoreo de costos',
      'Los Codelabs oficiales son el mejor recurso para aprender de forma práctica',
    ],
  },
};
