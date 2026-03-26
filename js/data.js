// ── Definición de temas ────────────────────────────────────────
const topics = {
  presentation: {
    name: "Presentación",
    icon: "🎤",
    color: "#8b5cf6"
  },
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

// ── Banco de preguntas — entrevistas reales ───────────────────
// Cada pregunta puede pertenecer a más de un tema via el array "topics"
const questions = [
  {
    id: 1,
    q: "¿Cómo te presentarías en una entrevista QA?",
    a: "Hola, mi nombre es Walter. Soy QA con experiencia en pruebas funcionales, automatización y pruebas de performance. He trabajado validando aplicaciones web y APIs, enfocándome en automatización para reducir el tiempo de regresión y mejorar la calidad antes de los despliegues. He trabajado automatizando pruebas web con Selenium y Playwright, y para pruebas de APIs he usado Karate DSL. Normalmente aplico buenas prácticas como Page Object Model para que el framework sea más mantenible. También he trabajado con pruebas de performance usando Apache JMeter, simulando usuarios concurrentes para validar cómo responde la aplicación bajo carga. Adicionalmente he integrado pruebas automatizadas dentro de pipelines de Azure DevOps, lo que permite ejecutar pruebas automáticamente en cada cambio y detectar errores antes de llegar a producción. En general me gusta enfocarme en automatizar flujos críticos del negocio y construir pruebas que realmente aporten valor al equipo.",
    topics: ["presentation"]
  },
  {
    id: 2,
    q: "¿Qué pruebas de performance has ejecutado?",
    a: "He trabajado principalmente con pruebas de carga, estrés y picos. Las de carga sirven para validar cómo se comporta la aplicación con la cantidad esperada de usuarios. Las de estrés se usan para encontrar el punto donde el sistema empieza a fallar. También he hecho pruebas de pico para ver cómo responde cuando hay incrementos repentinos de usuarios.",
    topics: ["performance"]
  },
  {
    id: 3,
    q: "¿Utilizaste algún plugin para JMeter?",
    a: "Sí, utilicé plugins a través de JMeter Plugins Manager para agregar visualizadores de métricas y manejar mejor los thread groups.",
    topics: ["performance"]
  },
  {
    id: 4,
    q: "¿Cuántos usuarios concurrentes usaste en las pruebas?",
    a: "Depende del proyecto. En aplicaciones pequeñas trabajé con escenarios entre 100 y 300 usuarios concurrentes. En algunas pruebas más grandes llegamos a simular cerca de 1000 usuarios.",
    topics: ["performance"]
  },
  {
    id: 5,
    q: "¿Cómo estructuras tu proyecto de performance?",
    a: "Normalmente separo los scripts por flujo de negocio, por ejemplo login, búsqueda o compra. También manejo datos de prueba en archivos CSV y parametrizo los ambientes para ejecutar los scripts en distintos entornos.",
    topics: ["performance"]
  },
  {
    id: 6,
    q: "¿Qué sabes de BlazeMeter?",
    a: "Es una plataforma en la nube que permite ejecutar pruebas de JMeter a gran escala generando carga desde diferentes ubicaciones.",
    topics: ["performance"]
  },
  {
    id: 7,
    q: "¿Cómo estresas una aplicación?",
    a: "Empiezo con la carga esperada y luego aumento progresivamente los usuarios mientras monitoreo tiempos de respuesta y errores hasta encontrar el punto donde el sistema se degrada.",
    topics: ["performance"]
  },
  {
    id: 8,
    q: "¿Cómo haces pruebas de pico (spike testing)?",
    a: "Simulo incrementos repentinos de usuarios. Por ejemplo, si normalmente hay 100 usuarios puedo subir rápidamente a 400 o 500 para observar la reacción del sistema.",
    topics: ["performance"]
  },
  {
    id: 9,
    q: "¿Dónde ejecutas las pruebas de performance?",
    a: "Normalmente en ambientes de staging o preproducción porque son los más parecidos a producción.",
    topics: ["performance"]
  },
  {
    id: 10,
    q: "¿Cómo creas tu estrategia de performance testing?",
    a: "Primero identifico los flujos críticos del negocio, luego defino los escenarios de carga basados en la cantidad esperada de usuarios y finalmente ejecuto las pruebas y analizo los resultados.",
    topics: ["performance"]
  },
  {
    id: 11,
    q: "¿Con qué herramientas has automatizado pruebas?",
    a: "Principalmente con Selenium, Playwright y Karate DSL.",
    topics: ["automation"]
  },
  {
    id: 12,
    q: "Háblame de tu experiencia con Selenium.",
    a: "He trabajado con Selenium automatizando pruebas end-to-end en aplicaciones web usando Java y aplicando Page Object Model.",
    topics: ["automation"]
  },
  {
    id: 13,
    q: "¿Por qué usas Playwright?",
    a: "Porque es más moderno, tiene esperas automáticas y maneja muy bien aplicaciones web modernas.",
    topics: ["automation"]
  },
  {
    id: 14,
    q: "¿Qué herramienta usas para testing de APIs?",
    a: "He trabajado bastante con Karate DSL porque permite validar respuestas JSON fácilmente.",
    topics: ["automation", "functional"]
  },
  {
    id: 15,
    q: "¿Qué tipos de pruebas automatizas?",
    a: "Principalmente regresión, smoke tests y flujos críticos del negocio.",
    topics: ["automation", "functional"]
  },
  {
    id: 16,
    q: "¿Qué patrón de diseño usas en automatización?",
    a: "Uso Page Object Model porque ayuda a separar la lógica de la interfaz y facilita el mantenimiento.",
    topics: ["automation"]
  },
  {
    id: 17,
    q: "¿Cuál es la mejor forma de obtener un selector?",
    a: "Trato de usar selectores estables como id o atributos específicos del sistema y evito XPaths muy largos.",
    topics: ["automation"]
  },
  {
    id: 18,
    q: "¿Conoces herramientas de automatización para móviles?",
    a: "Conozco Appium para automatizar aplicaciones móviles.",
    topics: ["automation"]
  },
  {
    id: 19,
    q: "¿Has probado aplicaciones mainframe?",
    a: "No directamente, pero sé que normalmente se prueban mediante emuladores de terminal o integraciones con servicios backend.",
    topics: ["automation"]
  },
  {
    id: 20,
    q: "¿Con qué lenguajes de programación has trabajado?",
    a: "Principalmente con Java para automatización, algo de JavaScript y scripting básico.",
    topics: ["automation"]
  },
  {
    id: 21,
    q: "¿Cuáles son las diferencias entre Selenium y Playwright?",
    a: "Selenium es más antiguo y ampliamente usado, mientras que Playwright es más moderno, rápido y maneja mejor la sincronización.",
    topics: ["automation"]
  },
  {
    id: 22,
    q: "¿Conoces Git? ¿Cómo lo usas?",
    a: "Sí, lo uso para manejar versiones del código, trabajar con ramas y hacer pull requests.",
    topics: ["cicd"]
  },
  {
    id: 23,
    q: "¿Cuál es tu proceso de pruebas?",
    a: "Analizo requerimientos, diseño casos de prueba, ejecuto pruebas, reporto defectos y finalmente hago regresión.",
    topics: ["functional"]
  },
  {
    id: 24,
    q: "¿Qué técnicas de diseño de pruebas usas?",
    a: "Partición de equivalencia, valores límite y pruebas basadas en riesgo.",
    topics: ["functional"]
  },
  {
    id: 25,
    q: "¿Cómo decides qué automatizar?",
    a: "Automatizo pruebas repetitivas y críticas del negocio. No automatizo pruebas exploratorias o funcionalidades que cambian constantemente.",
    topics: ["automation", "functional"]
  },
  {
    id: 26,
    q: "¿Has integrado automatización en pipelines de CI/CD?",
    a: "Sí, he integrado pruebas en pipelines para que se ejecuten automáticamente con cada cambio.",
    topics: ["cicd", "automation"]
  },
  {
    id: 27,
    q: "¿Utilizas IA en tu trabajo de QA?",
    a: "Sí, la uso para generar ideas de casos de prueba, mejorar scripts y acelerar tareas repetitivas.",
    topics: ["automation", "functional"]
  },
  {
    id: 28,
    q: "¿Dónde gestionas las pruebas y defectos?",
    a: "Normalmente en herramientas como Jira y Xray.",
    topics: ["functional", "agile"]
  },
  {
    id: 29,
    q: "¿Cómo redactas casos de prueba?",
    a: "Intento que sean claros y simples, incluyendo precondiciones, pasos y resultados esperados.",
    topics: ["functional"]
  },
  {
    id: 30,
    q: "¿Realizas pruebas de API? ¿Cómo las haces?",
    a: "Sí, validando códigos de respuesta, estructura del JSON y tiempos de respuesta.",
    topics: ["automation", "functional"]
  },
  {
    id: 31,
    q: "¿Qué son las pruebas de regresión y para qué sirven?",
    a: "Sirven para asegurar que los cambios nuevos no rompan funcionalidades existentes.",
    topics: ["functional", "automation"]
  },
  {
    id: 32,
    q: "¿Cuál es un logro destacado en tu carrera QA?",
    a: "Automatizar una regresión que antes tomaba dos días manualmente y reducirla a menos de una hora dentro del pipeline.",
    topics: ["automation", "cicd"]
  },
  {
    id: 33,
    q: "¿Cómo diseñarías un framework de automatización desde cero?",
    a: "Primero trataría de entender qué tipo de aplicación vamos a probar y qué tecnología usa el equipo. Luego elegiría el lenguaje y la herramienta de automatización. Después definiría una estructura clara del proyecto, por ejemplo separando tests, páginas, utilidades y datos de prueba. Normalmente aplicaría Page Object Model para mantener el código organizado. Finalmente integraría el framework con CI/CD para que las pruebas se ejecuten automáticamente.",
    topics: ["automation", "cicd"]
  },
  {
    id: 34,
    q: "¿Cómo haces que tus pruebas sean mantenibles?",
    a: "Principalmente organizando bien el código. Uso patrones como Page Object Model para separar la lógica de las páginas de los tests. También intento reutilizar funciones comunes como login o navegación, y uso selectores estables.",
    topics: ["automation"]
  },
  {
    id: 35,
    q: "¿Qué harías si una prueba automatizada falla de forma aleatoria (flaky test)?",
    a: "Primero revisaría los logs para entender qué está pasando. Muchas veces es un problema de sincronización o un selector frágil. También intento reproducir el problema manualmente. Si veo que el test es inestable, reviso las esperas o el selector.",
    topics: ["automation"]
  },
  {
    id: 36,
    q: "¿Cómo manejas datos de prueba en automatización?",
    a: "Depende del caso. A veces uso archivos CSV o JSON para manejar diferentes datos. En otros casos genero datos dinámicamente o utilizo APIs para crear la información necesaria antes de ejecutar la prueba.",
    topics: ["automation"]
  },
  {
    id: 37,
    q: "¿Cómo reduces el tiempo de ejecución de pruebas automatizadas?",
    a: "Una forma es ejecutar pruebas en paralelo. También trato de separar los smoke tests de la regresión completa. Los smoke tests se pueden ejecutar en cada pipeline y la regresión completa puede ejecutarse en horarios programados.",
    topics: ["automation", "cicd"]
  },
  {
    id: 38,
    q: "¿Cómo pruebas APIs en automatización?",
    a: "Primero reviso la documentación o el swagger. Luego valido el status code, la estructura del JSON, los datos que devuelve y también los tiempos de respuesta.",
    topics: ["automation", "functional"]
  },
  {
    id: 39,
    q: "¿Cómo integrarías automatización en un pipeline de CI/CD?",
    a: "La idea es que cada vez que alguien haga un cambio en el repositorio se ejecute un pipeline. Ese pipeline compila el proyecto, ejecuta los tests automáticos y si algo falla se detiene el proceso de despliegue.",
    topics: ["automation", "cicd"]
  },
  {
    id: 40,
    q: "¿Cómo manejarías pruebas dependientes entre sí?",
    a: "Trato de evitar dependencias entre pruebas. Cada test debería poder ejecutarse de forma independiente para evitar que un fallo afecte otros tests.",
    topics: ["automation"]
  },
  {
    id: 41,
    q: "¿Cómo manejas cambios frecuentes en la interfaz?",
    a: "Para eso ayuda mucho usar Page Object Model. Si cambia algo en la interfaz solo modifico el archivo de la página y no todos los tests.",
    topics: ["automation"]
  },
  {
    id: 42,
    q: "¿Cómo pruebas microservicios?",
    a: "Generalmente probando las APIs de cada servicio. También se pueden hacer pruebas de integración entre servicios para validar que la comunicación funcione correctamente.",
    topics: ["automation", "functional"]
  },
  {
    id: 43,
    q: "¿Qué es testing shift-left?",
    a: "Es una práctica donde las pruebas se realizan lo más temprano posible en el ciclo de desarrollo, por ejemplo probando APIs antes de que la interfaz esté lista.",
    topics: ["functional", "agile", "cicd"]
  },
  {
    id: 44,
    q: "¿Qué métricas usas en automatización?",
    a: "Algunas métricas importantes son el tiempo de ejecución de pruebas, el porcentaje de pruebas automatizadas y la cantidad de defectos detectados antes de producción.",
    topics: ["automation", "agile"]
  },
  {
    id: 45,
    q: "¿Qué haces si el ambiente de pruebas falla?",
    a: "Primero reviso si el problema es del ambiente o de la prueba. Verifico logs, servicios y base de datos. Muchas veces el problema no está en el test sino en el ambiente.",
    topics: ["automation", "functional"]
  },
  {
    id: 46,
    q: "¿Cómo validarías la performance de una API?",
    a: "Simulando múltiples usuarios concurrentes para ver cómo responde el sistema. Se revisan tiempos de respuesta, throughput y errores.",
    topics: ["performance", "automation"]
  },
  {
    id: 47,
    q: "¿Cómo manejas datos sensibles en pruebas?",
    a: "Normalmente se usan variables de entorno o herramientas seguras para manejar credenciales. Nunca es buena práctica dejar contraseñas en el código.",
    topics: ["automation"]
  },
  {
    id: 48,
    q: "¿Cómo haces debugging de una prueba fallida?",
    a: "Primero reviso los logs y el reporte del test. Luego intento reproducir el problema manualmente. Si logro reproducirlo, reviso el script para ver dónde está fallando.",
    topics: ["automation"]
  },
  {
    id: 49,
    q: "¿Cómo automatizarías pruebas de login?",
    a: "En algunos casos se puede hacer login directamente usando APIs o tokens para evitar depender de la interfaz gráfica en cada prueba.",
    topics: ["automation"]
  },
  {
    id: 50,
    q: "¿Cómo validarías un sistema de alta concurrencia?",
    a: "Usando herramientas de pruebas de performance para simular muchos usuarios concurrentes y analizar cómo responde el sistema.",
    topics: ["performance"]
  },
  {
    id: 51,
    q: "¿Cómo organizarías pruebas dentro de un pipeline?",
    a: "Normalmente primero se ejecuta el build, luego smoke tests y después pruebas más completas como regresión.",
    topics: ["cicd", "automation"]
  },
  {
    id: 52,
    q: "¿Qué harías si un desarrollador dice que un bug no es bug?",
    a: "Primero revisaría el requerimiento o la historia de usuario. Si el comportamiento no coincide con lo esperado, muestro evidencia como logs o capturas para discutirlo con el equipo.",
    topics: ["functional", "agile"]
  },
  {
    id: 53,
    q: "¿Cómo validas que tu automatización aporta valor?",
    a: "Si reduce el tiempo de regresión, detecta errores antes de producción o ayuda a acelerar el ciclo de desarrollo, entonces claramente está aportando valor.",
    topics: ["automation", "agile"]
  },
  {
    id: 54,
    q: "¿Cómo automatizarías pruebas visuales?",
    a: "Se pueden usar herramientas que comparan capturas de pantalla para detectar cambios visuales en la interfaz.",
    topics: ["automation", "functional"]
  },
  {
    id: 55,
    q: "¿Cómo probarías un sistema sin documentación?",
    a: "Primero exploraría la aplicación para entender su funcionamiento. También revisaría APIs, logs y hablaría con desarrolladores o product owners para entender mejor el sistema.",
    topics: ["functional", "agile"]
  },
  {
    id: 56,
    q: "¿Cómo manejas pruebas en sistemas distribuidos?",
    a: "Normalmente se prueban los servicios de forma individual y luego se hacen pruebas de integración para validar cómo interactúan entre sí.",
    topics: ["automation", "functional"]
  }
];
