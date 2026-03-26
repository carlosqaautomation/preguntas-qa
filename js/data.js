// ── Definición de temas ────────────────────────────────────────
const topics = {
  functional: {
    name: "Testing Funcional",
    icon: "🧪",
    color: "#6366f1"
  },
  agile: {
    name: "Metodología Agile",
    icon: "🔄",
    color: "#0ea5e9"
  },
  automation: {
    name: "Automatización",
    icon: "🤖",
    color: "#10b981"
  },
  performance: {
    name: "Performance",
    icon: "⚡",
    color: "#f59e0b"
  },
  cicd: {
    name: "CI/CD",
    icon: "🚀",
    color: "#ef4444"
  }
};

// ── Banco de preguntas con multi-tema ──────────────────────────
// Cada pregunta puede pertenecer a más de un tema via el array "topics"
const questions = [
  {
    id: 1,
    q: "¿Cuál es la diferencia entre verificación y validación en QA?",
    a: "Verificación responde '¿Estamos construyendo el producto correctamente?' — asegura que el software cumple las especificaciones (revisiones, inspecciones, walkthroughs). Validación responde '¿Estamos construyendo el producto correcto?' — asegura que el software satisface las necesidades reales del usuario (testing funcional, UAT). Ambas son parte fundamental del proceso de aseguramiento de calidad.",
    topics: ["functional"]
  },
  {
    id: 2,
    q: "¿Qué es un caso de prueba y qué debe contener?",
    a: "Un caso de prueba es un conjunto de condiciones e instrucciones para verificar una funcionalidad específica. Debe contener: ID único, título descriptivo, precondiciones, pasos detallados paso a paso, datos de prueba, resultado esperado, resultado actual (se completa al ejecutar) y estado (pass/fail). También puede incluir prioridad, severidad y referencias al requerimiento.",
    topics: ["functional"]
  },
  {
    id: 3,
    q: "¿Cuál es la diferencia entre smoke testing y sanity testing?",
    a: "Smoke testing (prueba de humo) verifica las funcionalidades más críticas del sistema para decidir si vale la pena continuar con pruebas más profundas. Se ejecuta en un nuevo build. Sanity testing es más foco y se hace después de un cambio pequeño para verificar que esa área específica funciona correctamente. Ambos son subconjuntos del regression testing pero con diferente alcance.",
    topics: ["functional"]
  },
  {
    id: 4,
    q: "¿Qué es el testing exploratorio?",
    a: "Es un enfoque donde el tester diseña y ejecuta pruebas simultáneamente, aprendiendo sobre el sistema mientras lo prueba, sin scripts predefinidos. Se basa en la heurística, experiencia e intuición del tester. Es muy efectivo para descubrir bugs no previstos en los casos de prueba formales. Técnicas como session-based testing ayudan a estructurarlo con charters de tiempo fijo.",
    topics: ["functional"]
  },
  {
    id: 5,
    q: "¿Qué es boundary value analysis y equivalence partitioning?",
    a: "Equivalence Partitioning divide el dominio de entrada en particiones donde se asume que todos los valores se comportan igual — solo se prueba un valor representativo por partición. Boundary Value Analysis (BVA) complementa esto probando los valores en los límites de cada partición (bordes), donde los defectos son más frecuentes. Por ejemplo, para una edad de 18-65: probar 17, 18, 19, 64, 65, 66.",
    topics: ["functional"]
  },
  {
    id: 6,
    q: "¿Cuál es la diferencia entre un bug, defecto y falla?",
    a: "Error: equivocación humana (programador escribe código incorrecto). Defecto/Bug: resultado del error en el código fuente — es el problema en el código. Falla/Failure: manifestación del defecto en tiempo de ejecución — lo que el usuario experimenta. Un defecto puede existir en el código sin causar falla si ese camino nunca se ejecuta. La severidad y prioridad del bug son conceptos independientes.",
    topics: ["functional"]
  },
  {
    id: 7,
    q: "¿Qué es regression testing y cuándo se ejecuta?",
    a: "El regression testing verifica que los cambios recientes (bugfixes, nuevas features) no hayan roto funcionalidad que antes trabajaba correctamente. Se ejecuta: después de cada cambio de código, antes de un release, después de resolver un bug crítico. Idealmente se automatiza ya que se repite frecuentemente. La suite de regresión crece con el tiempo y debe mantenerse.",
    topics: ["functional", "automation", "cicd"]
  },
  {
    id: 8,
    q: "¿Qué es un sprint en Scrum?",
    a: "Un sprint es una iteración de tiempo fijo (generalmente 1-4 semanas) en Scrum donde el equipo construye un incremento de producto potencialmente entregable. Tiene una duración fija que no cambia. Incluye: Sprint Planning, Daily Scrum, Sprint Review y Sprint Retrospective. Durante el sprint el backlog no se modifica, aunque urgencias pueden tratarse con el Product Owner.",
    topics: ["agile"]
  },
  {
    id: 9,
    q: "¿Cuál es el rol del QA en un equipo Agile/Scrum?",
    a: "En Agile, QA no es una fase final sino parte integral durante todo el sprint: participa en refinamiento para cuestionar requerimientos ambiguos, en Sprint Planning para estimar esfuerzo de testing, escribe criterios de aceptación con el PO, realiza testing continuo del código que va entregando desarrollo, y en Retrospectivas propone mejoras al proceso de calidad. El QA colabora, no es un guardián bloqueador.",
    topics: ["agile", "functional"]
  },
  {
    id: 10,
    q: "¿Qué es Definition of Done (DoD) y Definition of Ready (DoR)?",
    a: "Definition of Done es el acuerdo del equipo de qué criterios debe cumplir una historia de usuario para considerarse completada (ej: código revisado, unit tests pasando, testing funcional hecho, sin bugs críticos, documentado). Definition of Ready define cuándo una historia está lista para entrar al sprint (criterios de aceptación claros, estimada, sin dependencias bloqueantes). Ambas reducen ambigüedad y mejoran calidad.",
    topics: ["agile"]
  },
  {
    id: 11,
    q: "¿Qué son los criterios de aceptación y cómo se escriben?",
    a: "Los criterios de aceptación definen las condiciones que debe cumplir una historia de usuario para ser aceptada por el Product Owner. Se escriben en formato Given-When-Then (Gherkin): Given (contexto/precondición), When (acción del usuario), Then (resultado esperado). Son la base para el testing y deben ser: específicos, medibles, sin ambigüedad técnica y validables. QA colabora en su definición para detectar gaps.",
    topics: ["agile", "functional", "automation"]
  },
  {
    id: 12,
    q: "¿Cuál es la diferencia entre Scrum y Kanban?",
    a: "Scrum usa sprints de duración fija, roles definidos (PO, Scrum Master, Dev Team), ceremonias formales y entrega al final del sprint. Kanban es un sistema de flujo continuo sin iteraciones fijas, usa un tablero con límites WIP (Work in Progress) para controlar el flujo y se mejora continuamente. Kanbanflow es más flexible. Para QA: en Scrum las pruebas se planifican por sprint; en Kanban se prueba a medida que las tarjetas fluyen.",
    topics: ["agile"]
  },
  {
    id: 13,
    q: "¿Qué es una retrospectiva y qué formatos existen?",
    a: "La retrospectiva es la ceremonia Scrum donde el equipo reflexiona sobre su proceso de trabajo para mejorar continuamente (no sobre el producto). Formatos populares: Start/Stop/Continue (qué empezar, dejar y continuar haciendo), Mad/Sad/Glad (emociones), 4Ls (Liked/Learned/Lacked/Longed for), Sailboat (viento=lo que impulsa, ancla=lo que frena). El Scrum Master facilita para crear un ambiente seguro.",
    topics: ["agile"]
  },
  {
    id: 14,
    q: "¿Qué es Selenium y para qué se usa?",
    a: "Selenium es un framework open-source para automatizar navegadores web. Sus componentes: Selenium WebDriver (API para controlar browsers), Selenium Grid (ejecución en paralelo en múltiples máquinas/browsers), Selenium IDE (herramienta de record & playback). Se usa para automatizar pruebas funcionales/regresión de aplicaciones web. Soporta múltiples lenguajes (Java, Python, JavaScript, C#) y browsers (Chrome, Firefox, Edge, Safari).",
    topics: ["automation"]
  },
  {
    id: 15,
    q: "¿Cuál es la diferencia entre Selenium y Playwright/Cypress?",
    a: "Selenium: maduro, soporta más browsers/lenguajes, requiere WebDriver externo, puede ser más lento y flaky. Cypress: solo JavaScript, corre en el mismo proceso que el browser (más confiable), excelente DX, solo Chrome-based + Firefox. Playwright: Microsoft, soporta Chromium/Firefox/WebKit, multi-lenguaje, auto-waits, captura de trazas. Playwright y Cypress tienen mejor manejo de asincronía y son más modernos. Selenium sigue siendo el más usado en empresas legacy.",
    topics: ["automation"]
  },
  {
    id: 16,
    q: "¿Qué es el Page Object Model (POM)?",
    a: "Page Object Model es un patrón de diseño para organizar código de automatización donde cada página (o componente) de la aplicación tiene una clase correspondiente que encapsula sus elementos y acciones. Beneficios: reutilización de código, mantenibilidad (si cambia el selector, solo se modifica en un lugar), legibilidad de los tests (los tests llaman métodos descriptivos como loginPage.enterCredentials()). Es el patrón estándar de la industria.",
    topics: ["automation"]
  },
  {
    id: 17,
    q: "¿Qué es BDD y herramientas como Cucumber?",
    a: "BDD (Behavior-Driven Development) es una práctica donde los tests se escriben en lenguaje natural (Gherkin: Given/When/Then) accesible a negocio, QA y desarrollo. Cucumber parsea archivos .feature y conecta los pasos con código de automatización (step definitions). Beneficios: documentación viva, comunicación entre roles, tests como especificación ejecutable. SpecFlow (C#), Behave (Python), JBehave (Java) son alternativas.",
    topics: ["automation", "agile"]
  },
  {
    id: 18,
    q: "¿Qué es el testing de API y herramientas para hacerlo?",
    a: "El testing de API verifica contratos, respuestas, códigos de estado HTTP, headers, payloads JSON/XML, autenticación y manejo de errores directamente a nivel de servicio (sin UI). Herramientas: Postman/Newman (manual y colecciones automatizadas), RestAssured (Java), Supertest (Node.js), requests+pytest (Python), Insomnia. Ventajas sobre UI testing: más rápido, más estable, detecta bugs antes de que lleguen a la interfaz.",
    topics: ["automation", "functional"]
  },
  {
    id: 19,
    q: "¿Cómo manejas los datos de prueba en automatización?",
    a: "Estrategias: Data-driven testing (leer datos de CSV/Excel/JSON para ejecutar el mismo test con múltiples datasets), fixtures predefinidas, factory patterns para generar datos dinámicos, bases de datos de test separadas, mocking/stubbing de servicios externos. Buenas prácticas: tests independientes que no comparten estado, limpiar datos después de cada test, no hardcodear datos sensibles (usar variables de entorno). El manejo de datos es uno de los mayores desafíos de la automatización.",
    topics: ["automation"]
  },
  {
    id: 20,
    q: "¿Qué es el testing de carga y cuándo aplicarlo?",
    a: "El testing de carga verifica el comportamiento del sistema bajo una carga esperada de usuarios/transacciones simultáneas. Tipos: Load test (carga normal esperada), Stress test (más allá del límite para encontrar punto de quiebre), Spike test (aumento repentino de carga), Soak/Endurance test (carga sostenida por horas para detectar memory leaks). Se aplica antes de releases importantes, Black Friday, lanzamientos de campañas. Herramientas: JMeter, k6, Gatling, Locust.",
    topics: ["performance"]
  },
  {
    id: 21,
    q: "¿Qué métricas son importantes en performance testing?",
    a: "Response Time: tiempo que tarda en responder (p50, p90, p95, p99 percentiles). Throughput: requests por segundo que el sistema procesa. Error Rate: porcentaje de requests fallidos. Concurrent Users: usuarios simultáneos activos. CPU/Memory/Disk utilization del servidor. TTFB (Time To First Byte). Apdex score (Application Performance Index): métrica 0-1 que combina tiempos satisfactorios, tolerables y frustrantes.",
    topics: ["performance"]
  },
  {
    id: 22,
    q: "¿Qué es k6 y cómo se diferencia de JMeter?",
    a: "k6 es una herramienta moderna de load testing open-source (Grafana Labs) donde los scripts se escriben en JavaScript, es developer-friendly, se integra fácilmente en CI/CD con CLI, y genera métricas limpias. JMeter es más maduro, con GUI visual, soporta más protocolos (JDBC, LDAP, FTP), pero los scripts XML son difíciles de mantener en control de versiones. k6 es preferido para equipos modernos y pipelines CI/CD; JMeter en entornos enterprise legacy.",
    topics: ["performance", "cicd"]
  },
  {
    id: 23,
    q: "¿Qué es un bottleneck y cómo se identifica?",
    a: "Un bottleneck (cuello de botella) es el componente que limita el rendimiento global del sistema: puede ser CPU saturado, memoria insuficiente, I/O de disco lento, queries de base de datos sin índices, conexiones de red, o código ineficiente. Se identifica con: profiling de la aplicación, monitoreo de métricas de infraestructura durante la prueba (APM tools como New Relic, Datadog, Dynatrace), análisis de logs y queries lentas. El primer paso es medir, no asumir.",
    topics: ["performance"]
  },
  {
    id: 24,
    q: "¿Qué es CI/CD y cuál es su relación con QA?",
    a: "CI (Continuous Integration) integra cambios frecuentemente al repositorio principal, ejecutando builds y tests automáticos en cada push para detectar errores rápido. CD puede ser Continuous Delivery (artefacto siempre listo para deploy manual) o Continuous Deployment (deploy automático a producción). QA es clave: define qué tests corren en cada stage del pipeline, los automatiza, analiza resultados y mantiene el pipeline verde. Un buen pipeline incluye: unit tests, integration tests, API tests, smoke tests.",
    topics: ["cicd"]
  },
  {
    id: 25,
    q: "¿Qué herramientas de CI/CD conoces?",
    a: "Jenkins: open-source, muy configurable, gran ecosistema de plugins, requiere mantenimiento de infraestructura. GitHub Actions: integrado en GitHub, YAML, gratis para repos públicos, excelente DX. GitLab CI/CD: integrado en GitLab, potente y bien documentado. Azure DevOps Pipelines: ecosistema Microsoft, integración con Azure. CircleCI, Bitbucket Pipelines, Travis CI. Para QA: lo importante es saber escribir pipelines en YAML y entender cómo integrar suites de tests.",
    topics: ["cicd"]
  },
  {
    id: 26,
    q: "¿Qué es un pipeline de testing y qué stages debe tener?",
    a: "Un pipeline de testing define las etapas que corre automáticamente en cada cambio. Stages recomendados: 1) Lint/análisis estático, 2) Unit tests (rápidos, <5 min), 3) Build/compilación, 4) Integration tests, 5) API/contract tests, 6) Deploy a staging, 7) Smoke tests en staging, 8) Regression/E2E tests (paralelos), 9) Performance tests (en horarios específicos), 10) Deploy a producción (manual o automático). Fail fast: los tests más rápidos primero.",
    topics: ["cicd", "automation"]
  },
  {
    id: 27,
    q: "¿Qué es shift-left testing?",
    a: "Shift-left testing es el enfoque de mover las actividades de testing lo más temprano posible en el ciclo de desarrollo (hacia la izquierda en la línea de tiempo del proyecto). Incluye: QA en refinamiento de requerimientos, revisión de criterios de aceptación antes de desarrollar, TDD/BDD, revisión de código con perspectiva de calidad, unit/integration tests escritos por developers. Principio: más barato y rápido encontrar defectos antes.",
    topics: ["functional", "agile", "cicd"]
  },
  {
    id: 28,
    q: "¿Cómo se integran los tests de performance en CI/CD?",
    a: "Se integran con umbrales (thresholds) definidos: si el p95 de response time supera X ms o el error rate supera Y%, el pipeline falla. No se corren en cada commit (muy costosos) sino en schedules nocturnos o antes de releases. Herramientas como k6 tienen integración nativa con CI/CD. Se recomienda separar ambientes de performance para no afectar otros pipelines. Dashboards con histórico de métricas permiten detectar degradaciones graduales (performance regression).",
    topics: ["performance", "cicd"]
  },
  {
    id: 29,
    q: "¿Qué es el testing de regresión visual?",
    a: "El testing de regresión visual verifica que los cambios de código no introduzcan diferencias visuales no deseadas en la UI, comparando screenshots pixel a pixel o por componentes. Herramientas: Percy (integra con CI), Applitools (AI-based, más inteligente con cambios dinámicos), BackstopJS, Chromatic (para Storybook). Se captura una línea base (baseline) y se comparan runs posteriores. Útil para detectar regresiones CSS, cambios de layout y problemas cross-browser.",
    topics: ["functional", "automation"]
  },
  {
    id: 30,
    q: "¿Qué es mocking y stubbing en el contexto de testing?",
    a: "Un stub reemplaza un componente real con una versión simplificada que retorna respuestas predefinidas (simula estado). Un mock además verifica que fue llamado correctamente (verifica comportamiento/interacción). Un fake es una implementación funcional simplificada (ej: base de datos en memoria). En testing de API: mockear servicios externos con WireMock, MSW (Mock Service Worker) o nock. Permiten tests aislados, deterministas y sin dependencias externas.",
    topics: ["automation", "functional"]
  },
  {
    id: 31,
    q: "¿Cómo priorizas qué automatizar en un proyecto?",
    a: "Se prioriza según: frecuencia de ejecución (tests que se ejecutan muchas veces), riesgo (áreas críticas del negocio), estabilidad de los requerimientos (no automatizar features en cambio constante), esfuerzo vs retorno (casos repetitivos que toman mucho tiempo manual), smoke tests de las funcionalidades core. La pirámide de testing guía: muchos unit tests, menos integration, pocos E2E. No todo debe automatizarse — testing exploratorio sigue siendo valioso.",
    topics: ["automation", "agile"]
  },
  {
    id: 32,
    q: "¿Qué es la pirámide de testing?",
    a: "La pirámide de testing (Mike Cohn) describe la distribución ideal de tipos de test: Base (más grande): Unit tests — rápidos, aislados, económicos, deben ser la mayoría. Medio: Integration/API tests — verifican interacción entre componentes. Cima (menos): E2E/UI tests — lentos, costosos de mantener, frágiles. El antipatrón es el 'cono de helado': muchos E2E manuales y pocos unit tests. En contexto moderno también se habla del 'trofeo de testing' de Kent C. Dodds.",
    topics: ["automation", "functional"]
  },
  {
    id: 33,
    q: "¿Cómo gestiones un bug encontrado en producción?",
    a: "Proceso: 1) Reportar inmediatamente con toda la información (logs, screenshots, pasos para reproducir, ambiente, severidad). 2) Triaje con el equipo para determinar impacto y prioridad. 3) Hotfix si es crítico (con regression test para ese escenario). 4) Análisis de causa raíz (root cause analysis) para entender por qué pasó y qué falló en el proceso de QA. 5) Agregar caso de prueba a la suite de regresión. 6) Retrospectiva del proceso para prevenir similares.",
    topics: ["functional", "agile"]
  },
  {
    id: 34,
    q: "¿Qué es contract testing y por qué es importante en microservicios?",
    a: "Contract testing verifica que dos servicios (consumer y provider) cumplen un contrato acordado de la API — sin necesidad de un ambiente con todos los servicios corriendo. Herramienta principal: Pact. El consumer define las interacciones esperadas (contract), el provider las verifica contra su implementación. Es fundamental en microservicios para detectar breaking changes antes de deploy. Reemplaza los costosos y frágiles integration tests end-to-end entre servicios.",
    topics: ["automation", "cicd"]
  },
  {
    id: 35,
    q: "¿Qué métricas de calidad reportarías en un equipo Agile?",
    a: "Métricas de proceso: defect escape rate (bugs encontrados en prod vs QA), test coverage (cobertura de código), pass/fail rate de la suite de regresión, tiempo promedio de ejecución del pipeline. Métricas de producto: densidad de defectos (bugs por feature/KLOC), severidad de bugs, tiempo de resolución de bugs. Métricas de flujo: cycle time de las historias. Importante: las métricas deben motivar calidad real, no gaming (evitar 'más tests' solo para subir coverage).",
    topics: ["agile", "functional", "cicd"]
  }
];
