/* ==========================================
   SISTEMA DE IDIOMAS — CAPTIONAI
   ========================================== */

let idiomaActual = localStorage.getItem("captionAI_idioma") || "en";

const traducciones = {
    en: {
        subtitle: "Create content people want to watch.",
        whatCreate: "What do you want to create?",
        topicPlaceholder: "E.g. Minecraft PvP",
        contentType: "Content type",
        audience: "Target audience",
        focus: "Video angle",
        platform: "Platform",
        objective: "Video goal",
        duration: "Duration",
        style: "Style",
        generate: "GENERATE 🚀",
        history: "🕘 History",
        all: "All",
        favorites: "⭐ Favorites",
        clearHistory: "Clear history",
        login: "Log in",
        register: "Create account",
        emptyHistory: "Your history is empty.",
        copy: "Copy",
        regenerate: "Generate again",
        seconds: "seconds",
        general: "General audience",
        teens: "Teenagers",
        youngAdults: "Young adults",
        adults: "Adults",
        gamers: "Gamers",
        beginners: "Beginners",
        automatic: "Automatic 🧠",
        viral: "Viral",
        curiosity: "Curiosity",
        story: "Story",
        challenge: "Challenge",
        educational: "Educational",
        debate: "Debate",
        views: "Get views",
        followers: "Get followers",
        interaction: "Get engagement",
        completion: "Make people watch the full video",
        fun: "Fun",
        professional: "Professional",
        exciting: "Exciting",
        curious: "Curious"
    },

    es: {
        subtitle: "Crea contenido que la gente quiera ver.",
        whatCreate: "¿Qué quieres crear?",
        topicPlaceholder: "Ej: Minecraft PvP",
        contentType: "Tipo de contenido",
        audience: "Público objetivo",
        focus: "Enfoque del vídeo",
        platform: "Plataforma",
        objective: "Objetivo del vídeo",
        duration: "Duración",
        style: "Estilo",
        generate: "GENERAR 🚀",
        history: "🕘 Historial",
        all: "Todas",
        favorites: "⭐ Favoritos",
        clearHistory: "Borrar historial",
        login: "Iniciar sesión",
        register: "Crear cuenta",
        emptyHistory: "Tu historial está vacío.",
        copy: "Copiar",
        regenerate: "Generar de nuevo",
        seconds: "segundos",
        general: "Público general",
        teens: "Adolescentes",
        youngAdults: "Jóvenes",
        adults: "Adultos",
        gamers: "Gamers",
        beginners: "Principiantes",
        automatic: "Automático 🧠",
        viral: "Viral",
        curiosity: "Curiosidad",
        story: "Historia",
        challenge: "Reto",
        educational: "Educativo",
        debate: "Debate",
        views: "Conseguir visitas",
        followers: "Conseguir seguidores",
        interaction: "Conseguir interacción",
        completion: "Hacer que la gente vea el vídeo completo",
        fun: "Divertido",
        professional: "Profesional",
        exciting: "Emocionante",
        curious: "Curioso"
    }
};

function cambiarIdioma(idioma) {
    idiomaActual = idioma;
    localStorage.setItem("captionAI_idioma", idioma);

    document.documentElement.lang = idioma;

    const t = traducciones[idioma];

    const textos = {
        ".subtitle": t.subtitle,
        "label:nth-of-type(1)": t.whatCreate,
        "label:nth-of-type(2)": t.contentType,
        "label:nth-of-type(3)": t.audience,
        "label:nth-of-type(4)": t.focus,
        "label:nth-of-type(5)": t.platform,
        "label:nth-of-type(6)": t.objective,
        "label:nth-of-type(7)": t.duration,
        "label:nth-of-type(8)": t.style,
        "#auth-buttons button:nth-child(1)": t.login,
        "#auth-buttons button:nth-child(2)": t.register,
        ".historial-header h2": t.history,
        ".filtro-historial:nth-child(1)": t.all,
        ".filtro-historial:nth-child(2)": t.favorites,
        ".limpiar-historial": t.clearHistory
    };

    Object.entries(textos).forEach(([selector, texto]) => {
        const elemento = document.querySelector(selector);
        if (elemento) elemento.textContent = texto;
    });

    const tema = document.getElementById("tema");
    if (tema) tema.placeholder = t.topicPlaceholder;

    const botonGenerar = document.querySelector('button[onclick="generar()"]');
    if (botonGenerar) botonGenerar.textContent = t.generate;

    traducirOpciones();

    // Si ya existe una generación, la volvemos a renderizar con el mismo
    // conjunto de decisiones aleatorias, pero en el nuevo idioma.
    if (window.captionAIHasGeneration) {
        window.captionAIRerender = true;
        try {
            generar();
        } finally {
            window.captionAIRerender = false;
        }
    }
}

function traducirOpciones() {
    const t = traducciones[idiomaActual];

    const opciones = {
        publico: {
            "Público general": t.general,
            "Adolescentes": t.teens,
            "Jóvenes": t.youngAdults,
            "Adultos": t.adults,
            "Gamers": t.gamers,
            "Principiantes": t.beginners
        },
        enfoque: {
            "Automático 🧠": t.automatic,
            "Viral": t.viral,
            "Curiosidad": t.curiosity,
            "Historia": t.story,
            "Reto": t.challenge,
            "Educativo": t.educational,
            "Debate": t.debate
        },
        objetivo: {
            "Conseguir visitas": t.views,
            "Conseguir seguidores": t.followers,
            "Conseguir interacción": t.interaction,
            "Hacer que la gente vea el vídeo completo": t.completion
        },
        duracion: {
            "15 segundos": `15 ${t.seconds}`,
            "30 segundos": `30 ${t.seconds}`,
            "60 segundos": `60 ${t.seconds}`
        },
        tipoContenido: {
            "Gaming": "Gaming",
            "Entretenimiento": idiomaActual === "en" ? "Entertainment" : "Entretenimiento",
            "Educativo": idiomaActual === "en" ? "Educational" : "Educativo",
            "Negocios": idiomaActual === "en" ? "Business" : "Negocios",
            "Curiosidades": idiomaActual === "en" ? "Curiosities" : "Curiosidades",
            "Storytelling": "Storytelling",
            "Experimentos": idiomaActual === "en" ? "Experiments" : "Experimentos",
            "Lifestyle": "Lifestyle"
        },
        estilo: {
            "Divertido": t.fun,
            "Profesional": t.professional,
            "Emocionante": t.exciting,
            "Curioso": t.curious
        }
    };

    Object.entries(opciones).forEach(([id, mapa]) => {
        const select = document.getElementById(id);
        if (!select) return;

        Array.from(select.options).forEach(option => {
            const valorOriginal = option.dataset.captionaiValue || option.value;
            option.dataset.captionaiValue = valorOriginal;
            if (mapa[valorOriginal]) {
                option.textContent = mapa[valorOriginal];
            }

            // El texto visible puede estar traducido, pero el generador
            // siempre debe recibir el valor interno original.
            option.value = valorOriginal;
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("selectorIdioma");

    if (selector) {
        selector.value = idiomaActual;
    }

    cambiarIdioma(idiomaActual);
});
const formatos = {
    Gaming: ["Reto", "Experimento", "Comparación", "Ranking", "Historia"],
    Entretenimiento: ["Reto", "Experimento", "Pregunta", "Ranking", "Historia"],
    Educativo: ["Pregunta", "Lista", "Comparación", "Descubrimiento", "Historia"],
    Negocios: ["Lista", "Comparación", "Pregunta", "Historia", "Descubrimiento"],
    Curiosidades: ["Pregunta", "Descubrimiento", "Comparación", "Lista", "Historia"],
    Storytelling: ["Historia", "Descubrimiento", "Pregunta", "Comparación", "Reto"],
    Experimentos: ["Experimento", "Reto", "Comparación", "Pregunta", "Descubrimiento"],
    Lifestyle: ["Historia", "Reto", "Experimento", "Lista", "Comparación"]
};


/* =========================
   MOTOR DE GENERACIÓN
   ========================= */

const formatosPorEnfoque = {
    Viral: ["Reto", "Comparación", "Ranking", "Experimento"],
    Curiosidad: ["Descubrimiento", "Pregunta", "Comparación", "Experimento"],
    Historia: ["Historia", "Reto", "Experimento", "Descubrimiento"],
    Reto: ["Reto", "Experimento", "Comparación"],
    Educativo: ["Pregunta", "Lista", "Comparación", "Descubrimiento"],
    Debate: ["Pregunta", "Comparación", "Ranking"]
};

const estrategiaEnfoque = {
    Viral: {
        hook: "haz que el inicio sea directo, fuerte y fácil de entender",
        titulo: "usa una promesa clara que genere interés inmediato"
    },
    Curiosidad: {
        hook: "plantea una incógnita que el espectador quiera resolver",
        titulo: "deja una pregunta abierta que despierte curiosidad"
    },
    Historia: {
        hook: "presenta rápidamente el problema o situación inicial",
        titulo: "plantea una historia con progresión y resultado"
    },
    Reto: {
        hook: "presenta inmediatamente el desafío y lo que está en juego",
        titulo: "deja claro cuál es el objetivo del reto"
    },
    Educativo: {
        hook: "promete explicar o demostrar algo útil rápidamente",
        titulo: "deja claro qué aprenderá el espectador"
    },
    Debate: {
        hook: "plantea una cuestión que pueda dividir opiniones",
        titulo: "presenta claramente el dilema o comparación"
    }
};

const perfilesPublico = {
    Gamers: "Utiliza referencias y situaciones propias del mundo gaming, manteniendo un ritmo dinámico.",
    Principiantes: "Explica los conceptos de forma sencilla y evita asumir conocimientos previos.",
    Adolescentes: "Mantén un tono dinámico, directo y entretenido, evitando explicaciones innecesariamente largas.",
    Jóvenes: "Utiliza un lenguaje natural, directo y fácil de consumir.",
    Adultos: "Prioriza claridad, utilidad y una explicación estructurada.",
    Creadores: "Enfoca el contenido en ideas prácticas, resultados y elementos que puedan mejorar su contenido.",
    "Público general": "Haz que la propuesta sea fácil de entender incluso para alguien que no conozca el tema."
};

const ajustesPublico = {
    Gamers: {
        idea: texto => texto,
        hook: texto => texto,
        titulo: texto => texto
    },
    Principiantes: {
        idea: texto => texto,
        hook: texto => texto,
        titulo: texto => texto
    },
    Adolescentes: {
        idea: texto => texto,
        hook: texto => texto,
        titulo: texto => texto
    },
    Jóvenes: {
        idea: texto => texto,
        hook: texto => texto,
        titulo: texto => texto
    },
    Adultos: {
        idea: texto => texto,
        hook: texto => texto,
        titulo: texto => texto
    },
    Creadores: {
        idea: texto => texto,
        hook: texto => texto,
        titulo: texto => texto
    },
    "Público general": {
        idea: texto => texto,
        hook: texto => texto,
        titulo: texto => texto
    }
};

const estructuras = {
    Reto: [
        tema => `Intenta conseguir un objetivo concreto relacionado con ${tema}, pero con una regla que haga el desafío mucho más difícil.`,
        tema => `Completa un desafío relacionado con ${tema} antes de que se acabe el tiempo.`,
        tema => `Intenta superar ${tema} teniendo una única oportunidad para conseguirlo.`,
        tema => `Pon a prueba tus habilidades con ${tema} mientras la dificultad aumenta progresivamente.`
    ],

    Experimento: [
        tema => `Prueba qué ocurre cuando ${tema} se lleva al límite y descubre el resultado.`,
        tema => `Experimenta con ${tema} bajo una condición inesperada y comprueba qué sucede.`,
        tema => `Pon a prueba ${tema} y descubre si realmente funciona como esperas.`,
        tema => `Cambia una condición de ${tema} y comprueba cómo afecta al resultado.`
    ],

    Comparación: [
        tema => `Compara diferentes opciones relacionadas con ${tema} y descubre cuál consigue el mejor resultado.`,
        tema => `Enfrenta dos alternativas de ${tema} para descubrir cuál funciona mejor.`,
        tema => `Prueba las principales opciones de ${tema} y determina cuál gana.`,
        tema => `¿Cuál es realmente la mejor opción cuando se trata de ${tema}?`
    ],

    Ranking: [
        tema => `Ordena varias opciones relacionadas con ${tema} desde la peor hasta la mejor.`,
        tema => `Haz un ranking de las opciones más interesantes de ${tema}.`,
        tema => `Clasifica diferentes elementos de ${tema} y descubre cuál queda en primer lugar.`,
        tema => `¿Cuál es la mejor opción de ${tema}? Ordénalas todas de peor a mejor.`
    ],

    Historia: [
        tema => `Cuenta una historia relacionada con ${tema}, empezando por el problema y terminando con el resultado.`,
        tema => `Descubre qué ocurre cuando te enfrentas a ${tema} y sigue todo el proceso hasta el final.`,
        tema => `Comienza con una situación inesperada relacionada con ${tema} y descubre cómo termina.`,
        tema => `Vive una experiencia relacionada con ${tema} y muestra cómo cambia la situación hasta el final.`
    ],

    Pregunta: [
        tema => `¿Qué ocurre realmente cuando pruebas ${tema}?`,
        tema => `¿Cuál es la mejor forma de enfrentarse a ${tema}?`,
        tema => `¿Qué pasaría si llevamos ${tema} al límite?`,
        tema => `¿Realmente funciona ${tema} como todo el mundo cree?`
    ],

    Lista: [
        tema => `Descubre las opciones más interesantes relacionadas con ${tema}.`,
        tema => `Estas son algunas de las mejores opciones relacionadas con ${tema}.`,
        tema => `Descubre los elementos de ${tema} que más merece la pena conocer.`,
        tema => `Una lista de las opciones más destacadas de ${tema}.`
    ],

    Descubrimiento: [
        tema => `Descubre algo inesperado relacionado con ${tema} y averigua por qué ocurre.`,
        tema => `Investiga ${tema} y descubre algo que probablemente no esperabas encontrar.`,
        tema => `Explora ${tema} hasta encontrar el resultado más sorprendente.`,
        tema => `Descubre qué se esconde detrás de ${tema}.`
    ]
};

const hooks = {
    Gaming: [
        tema => `Hoy voy a poner a prueba ${tema} de una forma que puede salir muy mal.`,
        tema => `Pensaba que ${tema} sería fácil, pero hay un problema.`,
        tema => `Solo tengo una oportunidad para conseguirlo con ${tema}.`,
        tema => `¿Seré capaz de superar este desafío de ${tema}?`
    ],
    Entretenimiento: [
        tema => `Hoy vamos a descubrir qué ocurre cuando ${tema}.`,
        tema => `Esto parecía una buena idea hasta que empezamos con ${tema}.`,
        tema => `No esperaba que ${tema} terminara así.`,
        tema => `¿Qué pasaría si llevamos ${tema} al límite?`
    ],
    Educativo: [
        tema => `Hoy vas a descubrir algo importante sobre ${tema}.`,
        tema => `Si quieres entender ${tema}, empieza por esto.`,
        tema => `La mayoría de personas entiende mal ${tema}.`,
        tema => `En pocos minutos vas a entender cómo funciona ${tema}.`
    ],
    Negocios: [
        tema => `Hay algo importante que debes saber sobre ${tema}.`,
        tema => `Antes de intentar ${tema}, necesitas conocer esto.`,
        tema => `¿Realmente funciona ${tema}?`,
        tema => `Vamos a comprobar qué ocurre con ${tema}.`
    ],
    Curiosidades: [
        tema => `Hay algo sobre ${tema} que probablemente no conocías.`,
        tema => `¿Sabías que ${tema} puede funcionar de una forma muy diferente a lo que parece?`,
        tema => `Hoy vamos a descubrir qué hay detrás de ${tema}.`,
        tema => `La respuesta sobre ${tema} es más curiosa de lo que parece.`
    ],
    Storytelling: [
        tema => `Todo comenzó cuando decidí enfrentarme a ${tema}.`,
        tema => `No sabía cómo iba a terminar esta historia de ${tema}.`,
        tema => `Al principio parecía sencillo, pero ${tema} cambió todo.`,
        tema => `Esta historia empezó con una decisión relacionada con ${tema}.`
    ],
    Experimentos: [
        tema => `Hoy vamos a comprobar qué ocurre realmente con ${tema}.`,
        tema => `¿Qué pasará si llevamos ${tema} al límite?`,
        tema => `Voy a poner a prueba ${tema} para descubrir la respuesta.`,
        tema => `Tenemos una teoría sobre ${tema}. Ahora toca comprobarla.`
    ],
    Lifestyle: [
        tema => `Hoy voy a probar algo diferente relacionado con ${tema}.`,
        tema => `No sabía si esto funcionaría, pero decidí probar ${tema}.`,
        tema => `Vamos a descubrir qué ocurre cuando pruebas ${tema}.`,
        tema => `Esta experiencia con ${tema} terminó siendo muy diferente de lo esperado.`
    ]
};

const titulos = {
    Gaming: [
        tema => `El reto más difícil de ${tema}`,
        tema => `¿Podré conseguirlo con ${tema}?`,
        tema => `Probando ${tema} al límite`,
        tema => `La mejor forma de ${tema}`,
        tema => `Esto cambió por completo ${tema}`
    ],
    Entretenimiento: [
        tema => `¿Qué pasa si hacemos esto con ${tema}?`,
        tema => `No esperaba este resultado con ${tema}`,
        tema => `Probando ${tema} al límite`,
        tema => `El resultado fue inesperado`,
        tema => `Esto salió completamente diferente`
    ],
    Educativo: [
        tema => `Cómo entender ${tema}`,
        tema => `La verdad sobre ${tema}`,
        tema => `Todo lo que necesitas saber sobre ${tema}`,
        tema => `${tema} explicado fácilmente`,
        tema => `El error que todos cometen con ${tema}`
    ],
    Negocios: [
        `¿Realmente funciona ${tema}?`,
        `La verdad sobre ${tema}`,
        `Lo que debes saber sobre ${tema}`,
        `Antes de intentar ${tema}, mira esto`,
        `El error que debes evitar con ${tema}`
    ].map((texto, i) => tema => typeof texto === "string" ? texto.replace(/\$\{tema\}/g, tema) : texto(tema)),
    Curiosidades: [
        tema => `El dato sobre ${tema} que casi nadie conoce`,
        tema => `La curiosidad más sorprendente sobre ${tema}`,
        tema => `¿Sabías esto sobre ${tema}?`,
        tema => `La verdad detrás de ${tema}`,
        tema => `Esto es más extraño de lo que parece`
    ],
    Storytelling: [
        tema => `La historia que empezó con ${tema}`,
        tema => `No esperaba que esta historia terminara así`,
        tema => `Todo cambió por culpa de ${tema}`,
        tema => `La historia completa de ${tema}`,
        tema => `Así empezó todo`
    ],
    Experimentos: [
        tema => `¿Qué pasa si llevamos ${tema} al límite?`,
        tema => `Poniendo a prueba ${tema}`,
        tema => `El experimento de ${tema}`,
        tema => `Probé ${tema} para descubrir la verdad`,
        tema => `El resultado fue inesperado`
    ],
    Lifestyle: [
        tema => `Probando ${tema} por primera vez`,
        tema => `Mi experiencia con ${tema}`,
        tema => `¿Realmente merece la pena ${tema}?`,
        tema => `Lo que pasó cuando probé ${tema}`,
        tema => `Esto no salió como esperaba`
    ]
};

function elegir(lista) {
    if (!Array.isArray(lista) || lista.length === 0) {
        return null;
    }

    return lista[Math.floor(Math.random() * lista.length)];
}

function mezclar(lista) {
    if (!Array.isArray(lista)) {
        return [];
    }

    return [...lista].sort(() => Math.random() - 0.5);
}

function limpiarIdea(idea) {
    let texto = String(idea)
        .replace(/\s+/g, " ")
        .trim();

    const instrucciones = [
        /Prioriza una idea que pueda despertar interés inmediato[^.]*\./gi,
        /Haz que cualquier persona pueda entender la propuesta rápidamente\./gi,
        /Ve al punto rápidamente[^.]*\./gi,
        /Deja claro rápidamente[^.]*\./gi,
        /Haz que genere curiosidad desde el primer segundo\./gi,
        /Deja claro desde el principio[^.]*\./gi,
        /La idea debe entenderse aunque el espectador no conozca el tema\./gi,
        /Construye el contenido alrededor de[^.]*\./gi,
        /Convierte el tema en un desafío[^.]*\./gi,
        /Prioriza preguntas[^.]*\./gi,
        /Prioriza claridad[^.]*\./gi,
        /Presenta una cuestión[^.]*\./gi
    ];

    instrucciones.forEach(regex => {
        texto = texto.replace(regex, "");
    });

    texto = texto
        .replace(/\s{2,}/g, " ")
        .replace(/\s+\./g, ".")
        .trim();

    if (!texto) {
        return String(idea).trim();
    }

    return texto;
}

function limpiarHashtag(texto) {
    return String(texto)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase()
        .trim() || "contenido";
}

function elegirEnfoqueAutomatico(tipo, publico, plataforma, objetivo, duracion, estilo) {
    if (tipo === "Educativo") return "Educativo";
    if (tipo === "Storytelling") return "Historia";
    if (tipo === "Experimentos") return "Reto";
    if (tipo === "Curiosidades") return "Curiosidad";
    if (objetivo === "Conseguir visitas") return "Viral";
    if (objetivo === "Generar interacción") return "Debate";
    if (tipo === "Gaming") return "Reto";
    if (plataforma === "TikTok" || plataforma === "Instagram Reels" || plataforma === "YouTube Shorts") return "Viral";
    return "Curiosidad";
}

function analizarIdea(idea, enfoque, tipo, publico, plataforma, objetivo, estilo) {
    const texto = String(idea || "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    const palabras = texto.split(/\s+/).filter(Boolean);
    const longitud = palabras.length;

    /*
     * ==========================================================
     * SEÑALES ESTRUCTURALES
     * ==========================================================
     */

    const tienePregunta =
        /\?|qué pasaría|que pasaria|cuál|cual|cómo|como|crees que/.test(texto);

    const tieneObjetivo =
        /\b(conseguir|ganar|lograr|superar|vencer|completar|alcanzar|llegar|terminar|clasificar|ordenar|comparar|descubrir|averiguar|comprobar)\b/.test(texto);

    const tieneResultado =
        /al final|resultado|descubre|descubrir|averigua|averiguar|comprueba|comprobar|cuál gana|cual gana|cuál queda|cual queda|primer puesto|primer lugar|número uno|numero uno/.test(texto);

    const tieneRiesgo =
        /una oportunidad|una sola vez|solo una vez|última oportunidad|ultima oportunidad|si fallo|si pierdo|si no lo consigo|sin poder|antes de que/.test(texto);

    const tieneTiempo =
        /\ben \d+\s*(segundos?|minutos?|horas?)\b|antes de que se acabe|contra el tiempo|en tiempo límite|tiempo límite/.test(texto);

    const tieneRestriccion =
        /\bsin\b|\bsolo\b|únicamente|unicamente|una regla|condición|condicion|limitación|limitacion|prohibido|no puedo/.test(texto);

    const tieneProgresion =
        /cada vez más difícil|cada vez mas dificil|aumenta la dificultad|aumentando la dificultad|progresivamente|cada fase|cada ronda|hasta el final|de peor a mejor|de mejor a peor|una a una|paso a paso/.test(texto);

    const tieneComparacion =
        /compara|comparación|comparacion|enfrenta|frente a|contra|versus|\bvs\b|mejor que|cuál es mejor|cual es mejor/.test(texto);

    const tieneRanking =
        /ranking|clasifica|clasificación|clasificacion|ordena|top |primer puesto|primer lugar|de peor a mejor|de mejor a peor/.test(texto);

    const tieneInteraccionDecision =
        /el público (elige|elija|decide|decida|escoge|escoja)|los espectadores (eligen|elijan|deciden|decidan|escogen|escojan)|deja que el público|deja que los espectadores|elige (una|qué|que|cuál|cual)|elija (una|qué|que|cuál|cual)/.test(texto);

    const tieneInteraccionPrediccion =
        /predice|predigan|predicción|prediccion|adivina|adivinen|antes de descubrir|antes de revelar|crees que|cuál crees|cual crees|quién ganará|quien ganara|qué crees|que crees/.test(texto);

    const tieneInteraccionOpinion =
        /qué harías|que harias|qué elegirías|que elegirias|cuál elegirías|cual elegirias|opinas|comenta|vota|tu elección|tu eleccion|tu favorita/.test(texto);

    const tieneInteraccion =
        tieneInteraccionDecision ||
        tieneInteraccionPrediccion ||
        tieneInteraccionOpinion;

    /*
     * ==========================================================
     * VALORES BASE
     * ==========================================================
     */

    let hook = 48;
    let curiosidad = 45;
    let interaccion = 30;
    let publicoScore = 50;
    let plataformaScore = 50;
    let enfoqueScore = 45;
    let claridad = 48;
    let retencion = 42;

    /*
     * ==========================================================
     * HOOK
     * ==========================================================
     */

    if (tienePregunta) hook += 13;
    if (tieneRiesgo) hook += 9;
    if (tieneTiempo) hook += 8;
    if (tieneObjetivo) hook += 5;
    if (tieneComparacion) hook += 7;
    if (tieneRanking) hook += 5;
    if (/sorprendente|inesperado|nunca|nadie|solo uno|solo una/.test(texto)) {
        hook += 8;
    }

    /*
     * Penalizaciones de hook
     */

    if (longitud < 6) hook -= 8;
    if (longitud > 45) hook -= 8;
    if (/hoy voy a|en este video voy a|en este vídeo voy a|hola chicos/.test(texto)) {
        hook -= 7;
    }

    /*
     * ==========================================================
     * CURIOSIDAD
     * ==========================================================
     */

    if (tieneResultado) curiosidad += 13;
    if (tieneRiesgo) curiosidad += 10;
    if (tieneTiempo) curiosidad += 7;
    if (tieneProgresion) curiosidad += 9;
    if (tienePregunta) curiosidad += 7;
    if (tieneComparacion) curiosidad += 7;
    if (/descubre|averigua|qué ocurre|que ocurre|qué pasará|que pasara|resultado/.test(texto)) {
        curiosidad += 8;
    }

    /*
     * Evitar curiosidad artificial:
     * revelar demasiado pronto el resultado reduce tensión.
     */

    if (/el resultado es|el ganador es|la respuesta es/.test(texto)) {
        curiosidad -= 7;
    }

    /*
     * ==========================================================
     * INTERACCIÓN
     * ==========================================================
     */

    if (tieneInteraccionDecision) interaccion += 30;
    if (tieneInteraccionPrediccion) interaccion += 23;
    if (tieneInteraccionOpinion) interaccion += 24;

    if (tienePregunta) interaccion += 6;
    if (tieneComparacion) interaccion += 6;
    if (tieneRanking) interaccion += 4;

    /*
     * Una pregunta sola no equivale a participación real.
     */

    if (tienePregunta && !tieneInteraccion) {
        interaccion -= 2;
    }

    /*
     * ==========================================================
     * PÚBLICO
     * ==========================================================
     */

    if (publico === "Gamers") {
        if (tipo === "Gaming") publicoScore += 28;
        if (/minecraft|roblox|fortnite|valorant|fifa|gaming|juego|videojuego/.test(texto)) {
            publicoScore += 10;
        }
    }

    if (publico === "Principiantes") {
        if (tipo === "Educativo") publicoScore += 25;
        if (/cómo|como|guía|guia|tutorial|explica|paso a paso|fácil|facil/.test(texto)) {
            publicoScore += 8;
        }
    }

    if (publico === "Adolescentes") {
        if (/reto|desafío|desafio|viral|juego|minecraft|roblox|trend/.test(texto)) {
            publicoScore += 12;
        }
    }

    if (publico === "Jóvenes") {
        if (/reto|desafío|desafio|experimenta|negocio|dinero|gaming|tecnología|tecnologia/.test(texto)) {
            publicoScore += 10;
        }
    }

    if (publico === "Adultos") {
        if (tipo === "Negocios" || tipo === "Educativo") publicoScore += 20;
    }

    if (publico === "Público general") {
        if (longitud >= 8 && longitud <= 32) publicoScore += 8;
        if (!/\bsolo para\b|\bexclusivo para\b/.test(texto)) publicoScore += 5;
    }

    /*
     * ==========================================================
     * PLATAFORMA
     * ==========================================================
     */

    if (plataforma === "TikTok") {
        plataformaScore += 10;

        if (tienePregunta || tieneRiesgo || tieneComparacion || tieneRanking) {
            plataformaScore += 10;
        }

        if (longitud <= 30) {
            plataformaScore += 7;
        }
    }

    if (plataforma === "Instagram Reels") {
        plataformaScore += 9;

        if (tienePregunta || tieneComparacion || tieneRanking) {
            plataformaScore += 9;
        }

        if (longitud <= 32) {
            plataformaScore += 6;
        }
    }

    if (plataforma === "YouTube Shorts") {
        plataformaScore += 10;

        if (tienePregunta || tieneRiesgo || tieneRanking) {
            plataformaScore += 9;
        }

        if (longitud <= 35) {
            plataformaScore += 6;
        }
    }

    /*
     * ==========================================================
     * ENFOQUE
     * ==========================================================
     */

    if (enfoque === "Viral") {
        enfoqueScore += 12;

        if (tieneComparacion || tieneRanking || tieneRiesgo || tienePregunta) {
            enfoqueScore += 12;
        }

        if (/sorprendente|inesperado|nadie|solo uno|solo una|límite|limite/.test(texto)) {
            enfoqueScore += 7;
        }
    }

    if (enfoque === "Curiosidad") {
        enfoqueScore += 8;

        if (tieneResultado || tienePregunta || tieneProgresion) {
            enfoqueScore += 17;
        }
    }

    if (enfoque === "Historia") {
        enfoqueScore += 8;

        if (/historia|pasó|paso|ocurrió|ocurrio|terminó|termino|empezó|empezo|después|despues|al final/.test(texto)) {
            enfoqueScore += 24;
        }
    }

    if (enfoque === "Reto") {
        enfoqueScore += 8;

        if (/reto|desafío|desafio|intenta|supera|conseguir|completar|límite|limite/.test(texto)) {
            enfoqueScore += 24;
        }

        if (tieneRiesgo || tieneTiempo || tieneRestriccion) {
            enfoqueScore += 7;
        }
    }

    if (enfoque === "Educativo") {
        enfoqueScore += 8;

        if (/cómo|como|aprender|explica|consejo|tutorial|guía|guia|paso a paso/.test(texto)) {
            enfoqueScore += 24;
        }
    }

    if (enfoque === "Debate") {
        enfoqueScore += 8;

        if (tieneInteraccionOpinion || tienePregunta || /opciones|mejor|debería|deberia/.test(texto)) {
            enfoqueScore += 24;
        }
    }

    /*
     * ==========================================================
     * CLARIDAD
     * ==========================================================
     */

    if (longitud >= 8 && longitud <= 30) claridad += 20;
    else if (longitud >= 31 && longitud <= 45) claridad += 10;
    else if (longitud > 55) claridad -= 18;
    else if (longitud < 5) claridad -= 12;

    if (tieneObjetivo) claridad += 7;
    if (tieneRestriccion) claridad += 5;

    if (tieneComparacion || tieneRanking) claridad += 4;

    /*
     * Frases excesivamente vagas.
     */

    if (/cosas|algo|contenido|varias cosas|diferentes cosas/.test(texto)) {
        claridad -= 7;
    }

    /*
     * ==========================================================
     * RETENCIÓN
     * ==========================================================
     */

    if (tieneResultado) retencion += 13;
    if (tieneRiesgo) retencion += 11;
    if (tieneTiempo) retencion += 8;
    if (tieneProgresion) retencion += 12;
    if (tieneInteraccionDecision) retencion += 5;
    if (tieneInteraccionPrediccion) retencion += 5;
    if (/hasta el final|al final|revelar|descubrir|una a una|paso a paso/.test(texto)) {
        retencion += 8;
    }

    if (tieneObjetivo && (tieneTiempo || tieneRiesgo || tieneRestriccion)) {
        retencion += 5;
    }

    /*
     * ==========================================================
     * OBJETIVO
     * ==========================================================
     */

    if (objetivo === "Conseguir visitas") {
        hook += 4;
        curiosidad += 4;
    }

    if (objetivo === "Conseguir seguidores") {
        claridad += 3;
        publicoScore += 4;
    }

    if (objetivo === "Conseguir interacción") {
        interaccion += 8;

        if (tieneInteraccion) {
            interaccion += 5;
        }
    }

    if (objetivo === "Hacer que la gente vea el vídeo completo") {
        retencion += 9;

        if (tieneResultado || tieneProgresion) {
            retencion += 6;
        }
    }

    /*
     * ==========================================================
     * DURACIÓN
     * ==========================================================
     */

    const duracionTexto =
        document.getElementById("duracion")?.value || "";

    if (duracionTexto === "15 segundos") {
        if (longitud <= 25) plataformaScore += 5;
        if (longitud > 35) claridad -= 5;
    }

    if (duracionTexto === "30 segundos") {
        if (longitud >= 8 && longitud <= 35) plataformaScore += 5;
    }

    if (duracionTexto === "60 segundos") {
        if (longitud >= 12) retencion += 3;
    }

    /*
     * ==========================================================
     * ESTILO
     * ==========================================================
     */

    if (estilo === "Divertido") {
        if (/reto|desafío|desafio|absurdo|inesperado|sorprendente|límite|limite/.test(texto)) {
            hook += 5;
        }
    }

    if (estilo === "Emocionante") {
        if (tieneRiesgo || tieneTiempo || tieneProgresion) {
            hook += 5;
            retencion += 4;
        }
    }

    if (estilo === "Curioso") {
        if (tienePregunta || tieneResultado) {
            curiosidad += 5;
        }
    }

    if (estilo === "Profesional") {
        if (longitud >= 8 && longitud <= 35) {
            claridad += 4;
        }
    }

    /*
     * ==========================================================
     * SINERGIA ESTRUCTURAL
     * ==========================================================
     */

    if (tieneObjetivo && tieneResultado) {
        claridad += 4;
        retencion += 4;
    }

    if (tienePregunta && tieneResultado) {
        hook += 3;
        curiosidad += 4;
    }

    if (tieneComparacion && tieneResultado) {
        curiosidad += 4;
        retencion += 4;
    }

    if (tieneRanking && tieneResultado) {
        curiosidad += 4;
        retencion += 4;
    }

    if (tieneRestriccion && tieneObjetivo) {
        hook += 3;
        claridad += 3;
    }

    /*
     * ==========================================================
     * LIMITAR TODO A 0-100
     * ==========================================================
     */

    hook = Math.max(0, Math.min(100, Math.round(hook)));
    curiosidad = Math.max(0, Math.min(100, Math.round(curiosidad)));
    interaccion = Math.max(0, Math.min(100, Math.round(interaccion)));
    publicoScore = Math.max(0, Math.min(100, Math.round(publicoScore)));
    plataformaScore = Math.max(0, Math.min(100, Math.round(plataformaScore)));
    enfoqueScore = Math.max(0, Math.min(100, Math.round(enfoqueScore)));
    claridad = Math.max(0, Math.min(100, Math.round(claridad)));
    retencion = Math.max(0, Math.min(100, Math.round(retencion)));

    /*
     * ==========================================================
     * PUNTUACIÓN FINAL
     * ==========================================================
     */

    const puntuacion = Math.round(
        hook * 0.18 +
        curiosidad * 0.18 +
        interaccion * 0.12 +
        publicoScore * 0.10 +
        plataformaScore * 0.08 +
        enfoqueScore * 0.14 +
        claridad * 0.10 +
        retencion * 0.10
    );

    return {
        puntuacion,
        hook,
        curiosidad,
        interaccion,
        publico: publicoScore,
        plataforma: plataformaScore,
        enfoque: enfoqueScore,
        claridad,
        retencion
    };
}
function encontrarMejorIdea(analisisIdeas) {

    let mejorIndice = 0;

    for (let i = 1; i < analisisIdeas.length; i++) {
        if (analisisIdeas[i].puntuacion > analisisIdeas[mejorIndice].puntuacion) {
            mejorIndice = i;
        }
    }

    return mejorIndice;
}

function detectarDebilidadIdea(analisis) {
    const metricas = [
        { nombre: "hook", valor: analisis.hook, etiqueta: "Hook" },
        { nombre: "curiosidad", valor: analisis.curiosidad, etiqueta: "Curiosidad" },
        { nombre: "interaccion", valor: analisis.interaccion, etiqueta: "Interacción" },
        { nombre: "publico", valor: analisis.publico, etiqueta: "Público" },
        { nombre: "plataforma", valor: analisis.plataforma, etiqueta: "Plataforma" },
        { nombre: "enfoque", valor: analisis.enfoque, etiqueta: "Enfoque" },
        { nombre: "claridad", valor: analisis.claridad, etiqueta: "Claridad" },
        { nombre: "retencion", valor: analisis.retencion, etiqueta: "Retención" }
    ];

    return metricas.reduce((peor, actual) =>
        actual.valor < peor.valor ? actual : peor
    );
}


function extraerTemaIdea(texto) {
    let tema = String(texto || "")
        .replace(/\.$/, "")
        .trim();

    const patrones = [
        /^.*?\brelacionado con\s+/i,
        /^.*?\bcon\s+/i,
        /^.*?\bde\s+/i,
        /^.*?\bsobre\s+/i
    ];

    // Intentamos detectar primero el núcleo del tema después de verbos comunes.
    const coincidencias = [
        tema.match(/(?:minecraft\s+pvp)/i),
        tema.match(/(?:minecraft|roblox|fortnite|valorant|fifa|youtube|tiktok|instagram)(?:\s+[a-z0-9áéíóúñ_-]+){0,3}/i)
    ];

    for (const coincidencia of coincidencias) {
        if (coincidencia && coincidencia[0]) {
            return coincidencia[0].trim();
        }
    }

    // Limpieza de estructuras habituales si no encontramos un tema conocido.
    tema = tema
        .replace(/^intenta\s+/i, "")
        .replace(/^plantea\s+/i, "")
        .replace(/^crea\s+/i, "")
        .replace(/^haz\s+/i, "")
        .replace(/^convierte\s+/i, "")
        .replace(/^compara\s+/i, "")
        .replace(/^prueba\s+/i, "")
        .replace(/^experimenta\s+con\s+/i, "")
        .replace(/^cambia\s+/i, "")
        .replace(/^descubre\s+/i, "")
        .replace(/^pon\s+a\s+prueba\s+/i, "")
        .trim();

    // Elimina finales que pertenecen a la estructura de la idea.
    tema = tema
        .replace(/\s+(y\s+)?descubre.*$/i, "")
        .replace(/\s+(y\s+)?comprueba.*$/i, "")
        .replace(/\s+(y\s+)?averigua.*$/i, "")
        .replace(/\s+(y\s+)?mira.*$/i, "")
        .replace(/\s+para\s+descubrir.*$/i, "")
        .replace(/\s+bajo\s+una\s+condición.*$/i, "")
        .replace(/\s+mientras\s+la\s+dificultad.*$/i, "")
        .replace(/\s+antes\s+de\s+que.*$/i, "")
        .trim();

    return tema || "el tema elegido";
}

function detectarFormatoIdea(texto) {
    const t = String(texto || "").toLowerCase();

    if (/ranking|top |ordena|de peor a mejor|de mejor a peor/.test(t)) {
        return "Ranking";
    }

    if (/compara|comparación|cual es mejor|cuál es mejor|dos opciones|varias opciones/.test(t)) {
        return "Comparación";
    }

    if (/experimenta|experimento|pon a prueba|comprueba qué|comprueba si|prueba qué/.test(t)) {
        return "Experimento";
    }

    if (/reto|desafío|desafio|intenta conseguir|intenta superar|antes de que se acabe/.test(t)) {
        return "Reto";
    }

    if (/historia|terminó|pasó|ocurrió|cómo llegué/.test(t)) {
        return "Historia";
    }

    if (/cómo|como |explica|aprende|consejo|tutorial/.test(t)) {
        return "Pregunta";
    }

    if (/descubre|qué ocurre|que ocurre|averigua/.test(t)) {
        return "Descubrimiento";
    }

    if (/lista|las mejores|los mejores|opciones más/.test(t)) {
        return "Lista";
    }

    return "Reto";
}


function capitalizarIdea(texto) {
    const t = String(texto || "").trim();
    return t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
}

function minusculaInicial(texto) {
    const t = String(texto || "").trim();
    return t ? t.charAt(0).toLowerCase() + t.slice(1) : t;
}

function extraerComponentesIdea(texto, formato) {
    const original = String(texto || "")
        .replace(/\s+/g, " ")
        .trim();

    const base = original.replace(/[.!?]+$/, "").trim();

    let principal = base;
    let verboResultado = "";
    let resultado = "";

    const patronesResultado = [
        /\s+y\s+(descubre)\s+(.+)$/i,
        /\s+y\s+(comprueba)\s+(.+)$/i,
        /\s+y\s+(averigua)\s+(.+)$/i,
        /\s+y\s+(determina)\s+(.+)$/i,
        /\s+para\s+(descubrir)\s+(.+)$/i,
        /\s+hasta\s+(descubrir)\s+(.+)$/i
    ];

    for (const patron of patronesResultado) {
        const match = base.match(patron);

        if (match) {
            principal = base.slice(0, match.index).trim();
            verboResultado = match[1];
            resultado = match[2].trim();
            break;
        }
    }

    return {
        original,
        base,
        principal,
        verboResultado,
        resultado,
        formato
    };
}

function palabrasImportantesIdea(texto) {
    const stopwords = new Set([
        "de","la","el","los","las","un","una","unos","unas",
        "y","o","que","con","sin","por","para","del","al",
        "en","se","su","sus","tu","tus","es","son","como",
        "más","menos","muy","desde","hasta","a","lo","le",
        "te","mi","mis","esta","este","estas","estos","qué",
        "cuál","cual","cuando","cómo"
    ]);

    return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9ñ\s]/g, " ")
        .split(/\s+/)
        .filter(p => p.length > 2 && !stopwords.has(p));
}

function preservaConcepto(original, candidata, formato) {
    const originales = [...new Set(palabrasImportantesIdea(original))];
    const nuevas = new Set(palabrasImportantesIdea(candidata));

    if (!originales.length) {
        return true;
    }

    const conservadas = originales.filter(p => nuevas.has(p)).length;
    const proporcion = conservadas / originales.length;

    if (proporcion < 0.5) {
        return false;
    }

    const t = candidata.toLowerCase();

    if (formato === "Ranking" &&
        !/ranking|clasifica|ordena|primer puesto|primer lugar|de peor a mejor/.test(t)) {
        return false;
    }

    if (formato === "Comparación" &&
        !/compara|enfrenta|mejor|gana|alternativas|opciones/.test(t)) {
        return false;
    }

    if (formato === "Reto" &&
        !/reto|desafío|desafio|intenta|supera|completa|habilidades/.test(t)) {
        return false;
    }

    if (formato === "Experimento" &&
        !/prueba|experimenta|experimento|condición|condicion|resultado/.test(t)) {
        return false;
    }

    return true;
}

function generarCandidatasOptimizacion(idea, debilidad, ...contexto) {
    const texto = String(idea || "").trim();
    const t = texto.toLowerCase();

    const candidatas = [];

    const añadir = (valor) => {
        const limpio = String(valor || "")
            .replace(/\s+/g, " ")
            .replace(/\.\s+y\b/gi, " y")
            .trim();

        if (
            limpio &&
            limpio.toLowerCase() !== texto.toLowerCase() &&
            !candidatas.some(x => x.toLowerCase() === limpio.toLowerCase())
        ) {
            candidatas.push(limpio);
        }
    };

    const esRanking =
        /ranking|clasifica|clasificar|ordena|ordenar|de peor a mejor|de mejor a peor|top \d+|cuál queda|cuál es mejor/.test(t);

    const esComparacion =
        /compara|comparar|enfrenta|enfrentar|versus|\bvs\b|mejor que|peor que|gana/.test(t);

    const esReto =
        /reto|desafío|desafio|intenta|superar|completar|conseguir|alcanzar|vencer/.test(t);

    const esTiempo =
        /antes de que se acabe|contra el tiempo|en \d+\s*(segundos?|minutos?)|tiempo límite|tiempo limite/.test(t);

    const esUnaOportunidad =
        /una única oportunidad|una sola oportunidad|una oportunidad|única oportunidad|solo una vez|una sola vez/.test(t);

    const esDescubrimiento =
        /descubre|averigua|comprueba|qué pasaría|que pasaria|qué ocurre|que ocurre/.test(t);

    const esExperimento =
        /experimenta|experimento|prueba|probar|qué sucede|que sucede/.test(t);

    const esLista =
        /varias opciones|diferentes opciones|lista|elementos|formas|maneras/.test(t);

    /*
     * RANKING
     */
    if (esRanking) {
        añadir(
            `Antes de ver el resultado, predice cuál debería quedar en primer lugar y después ${texto.charAt(0).toLowerCase() + texto.slice(1)}`
        );

        añadir(
            `Elige cuál crees que quedará en primer lugar y después ${texto.charAt(0).toLowerCase() + texto.slice(1)}`
        );

        añadir(
            `Intenta acertar el primer puesto antes de descubrir el resultado y después ${texto.charAt(0).toLowerCase() + texto.slice(1)}`
        );
    }

    /*
     * COMPARACIÓN
     */
    if (esComparacion) {
        añadir(
            `Antes de descubrir el resultado, elige quién crees que ganará y después ${texto.charAt(0).toLowerCase() + texto.slice(1)}`
        );

        añadir(
            `Predice el ganador antes de empezar y después ${texto.charAt(0).toLowerCase() + texto.slice(1)}`
        );

        añadir(
            `El público elige su favorito antes de que ${texto.charAt(0).toLowerCase() + texto.slice(1)}`
        );
    }

    /*
     * RETO + TIEMPO
     */
    if (esReto && esTiempo) {
        añadir(
            `${texto}, pero cada error te hará perder tiempo y tendrás que conseguirlo antes de que el contador llegue a cero`
        );

        añadir(
            `${texto} mientras el tiempo se agota y cualquier error puede hacerte fracasar`
        );

        añadir(
            `${texto} con el tiempo en contra y sin margen para cometer errores`
        );
    }

    /*
     * RETO + UNA OPORTUNIDAD
     */
    if (esReto && esUnaOportunidad) {
        añadir(
            `${texto}, pero no podrás volver a intentarlo si cometes un error`
        );

        añadir(
            `${texto} sabiendo que cualquier error acabará con tu única oportunidad`
        );

        añadir(
            `Solo tienes una oportunidad: ${texto.charAt(0).toLowerCase() + texto.slice(1)}`
        );
    }

    /*
     * RETO NORMAL
     */
    if (esReto && !esTiempo && !esUnaOportunidad) {
        añadir(
            `${texto}, pero una condición inesperada hará que sea mucho más difícil conseguirlo`
        );

        añadir(
            `${texto} con una regla que cambia por completo la dificultad del desafío`
        );

        añadir(
            `${texto} mientras una restricción adicional aumenta la dificultad progresivamente`
        );
    }

    /*
     * DESCUBRIMIENTO
     */
    if (esDescubrimiento || debilidad === "curiosidad") {
        añadir(
            `${texto} y guarda el resultado hasta el final para descubrir qué ocurre`
        );

        añadir(
            `${texto} sin revelar el resultado hasta el momento decisivo`
        );
    }

    /*
     * EXPERIMENTO
     */
    if (esExperimento) {
        añadir(
            `Primero predice qué ocurrirá y después ${texto.charAt(0).toLowerCase() + texto.slice(1)} para comprobarlo`
        );

        añadir(
            `${texto} y comprueba si el resultado coincide con lo que esperabas`
        );
    }

    /*
     * LISTAS
     */
    if (esLista && !esRanking) {
        añadir(
            `Elige cuál crees que será la mejor opción antes de descubrir el resultado: ${texto.charAt(0).toLowerCase() + texto.slice(1)}`
        );

        añadir(
            `${texto} y descubre cuál termina siendo la favorita del público`
        );
    }

    /*
     * INTERACCIÓN GENÉRICA
     */
    if (debilidad === "interaccion" && candidatas.length === 0) {
        añadir(
            `Antes de descubrir el resultado, predice qué ocurrirá: ${texto}`
        );

        añadir(
            `${texto} y decide qué resultado crees que ocurrirá antes de verlo`
        );
    }

    /*
     * FALLBACK
     */
    if (candidatas.length === 0) {
        añadir(
            `${texto} y descubre al final si consigues cumplir el objetivo`
        );

        añadir(
            `Antes de empezar, predice el resultado y después ${texto.charAt(0).toLowerCase() + texto.slice(1)}`
        );
    }

    return candidatas;
}
function optimizarIdea(idea, analisis) {
    const texto = String(idea || "").trim();

    if (!texto || !analisis) {
        return texto;
    }

    const debilidad = detectarDebilidadIdea(analisis);
    const formato = detectarFormatoIdea(texto);

    /*
     * V4:
     * ya NO reconstruimos desde extraerTemaIdea().
     * Conservamos la idea original y sus componentes.
     */
    const componentes = extraerComponentesIdea(texto, formato);

    const tipo = document.getElementById("tipoContenido")?.value || "";
    const publico = document.getElementById("publico")?.value || "";
    const plataforma = document.getElementById("plataforma")?.value || "";
    const objetivo = document.getElementById("objetivo")?.value || "";
    const estilo = document.getElementById("estilo")?.value || "";
    const enfoque = window.enfoqueReal || "";

    const candidatas = generarCandidatasOptimizacion(
        texto,
        formato,
        componentes,
        debilidad.nombre
    );

    let mejor = null;

    for (const candidata of candidatas) {
        const resultado = analizarIdea(
            candidata,
            enfoque,
            tipo,
            publico,
            plataforma,
            objetivo,
            estilo
        );

        const mejoraTotal =
            resultado.puntuacion - analisis.puntuacion;

        const mejoraDebilidad =
            resultado[debilidad.nombre] - analisis[debilidad.nombre];

        /*
         * Reglas V4:
         * 1. La puntuación total debe subir.
         * 2. La métrica débil no puede empeorar.
         * 3. El concepto original debe conservarse.
         */
        if (
            mejoraTotal > 0 &&
            mejoraDebilidad >= 0 &&
            preservaConcepto(texto, candidata, formato)
        ) {
            const valor =
                (mejoraTotal * 100) +
                (mejoraDebilidad * 4);

            if (!mejor || valor > mejor.valor) {
                mejor = {
                    idea: candidata,
                    valor,
                    analisis: resultado
                };
            }
        }
    }

    return mejor ? mejor.idea : texto;
}
function obtenerMejoraHTML(idea, analisis, index) {
    const ideaOriginal = String(idea || "").trim();

    if (!ideaOriginal) {
        return "";
    }

    const optimizada = optimizarIdea(ideaOriginal, analisis);

    if (!optimizada || optimizada === ideaOriginal) {
        return `
            <div class="opcion mejora-idea">
                <strong>✨ OPTIMIZACIÓN</strong>

                <p class="mejor-idea-titulo">
                    Esta idea ya tiene una estructura sólida. No se ha aplicado una modificación porque ninguna variante mejoraba de forma fiable su puntuación.
                </p>

                <div class="mejora-info">
                    <span>Sin mejora fiable</span>
                    <span>${analisis.puntuacion}/100</span>
                </div>
            </div>
        `;
    }

    const analisisMejora = analizarIdea(
        optimizada,
        window.enfoqueReal || "",
        document.getElementById("tipoContenido")?.value || "",
        document.getElementById("publico")?.value || "",
        document.getElementById("plataforma")?.value || "",
        document.getElementById("objetivo")?.value || "",
        document.getElementById("estilo")?.value || ""
    );

    const mejora = analisisMejora.puntuacion - analisis.puntuacion;

    if (mejora <= 0) {
        return `
            <div class="opcion mejora-idea">
                <strong>✨ OPTIMIZACIÓN</strong>

                <p class="mejor-idea-titulo">
                    No se encontró una mejora suficientemente fiable para esta idea.
                </p>

                <div class="mejora-info">
                    <span>${analisis.puntuacion}/100</span>
                </div>
            </div>
        `;
    }

    const debilidad = detectarDebilidadIdea(analisis);

    let explicacion = "Se reforzó la estructura de la idea para aumentar su potencial.";

    if (debilidad.nombre === "hook") {
        explicacion = "Se reforzó el inicio para captar la atención más rápidamente.";
    } else if (debilidad.nombre === "curiosidad") {
        explicacion = "Se añadió incertidumbre y un resultado pendiente de descubrir.";
    } else if (debilidad.nombre === "interaccion") {
        explicacion = "Se añadió una decisión o predicción para aumentar la participación.";
    } else if (debilidad.nombre === "claridad") {
        explicacion = "Se hizo más claro el objetivo y la estructura de la idea.";
    } else if (debilidad.nombre === "retencion") {
        explicacion = "Se añadió progresión para mantener el interés hasta el resultado.";
    } else if (debilidad.nombre === "enfoque") {
        explicacion = "Se reforzó la estructura para adaptarla mejor al enfoque seleccionado.";
    }

    return `
        <div class="opcion mejora-idea">
            <strong>✨ IDEA OPTIMIZADA</strong>

            <p class="mejor-idea-titulo">
                ${optimizada.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </p>

            <div class="mejora-info">
                <span>Debilidad: ${debilidad.etiqueta}</span>
                <span>${analisis.puntuacion} → ${analisisMejora.puntuacion}</span>
                <span>+${mejora} puntos</span>
            </div>

            <p class="mejora-explicacion">
                ${explicacion}
            </p>

            <button class="copiar" onclick="copiarTexto(${JSON.stringify(optimizada)})">
                📋 Copiar idea
            </button>
        </div>
    `;
}


/* ==========================================
   GENERACIÓN MULTIIDIOMA
   Los valores internos siguen en español para no romper la lógica.
   Solo cambia el texto que se genera al usuario.
   ========================================== */

const estructurasEN = {
    Reto: [
        tema => `Try to achieve a specific goal related to ${tema}, but with a rule that makes the challenge much harder.`,
        tema => `Complete a challenge related to ${tema} before time runs out.`,
        tema => `Try to beat ${tema} with only one chance to succeed.`,
        tema => `Put your ${tema} skills to the test while the difficulty increases progressively.`
    ],
    Experimento: [
        tema => `Test what happens when ${tema} is pushed to the limit and discover the result.`,
        tema => `Experiment with ${tema} under an unexpected condition and see what happens.`,
        tema => `Put ${tema} to the test and find out whether it really works as expected.`,
        tema => `Change one condition of ${tema} and see how it affects the result.`
    ],
    Comparación: [
        tema => `Compare different options related to ${tema} and discover which one gets the best result.`,
        tema => `Put two ${tema} alternatives against each other to find out which works better.`,
        tema => `Test the main ${tema} options and determine which one wins.`,
        tema => `Which is actually the best option when it comes to ${tema}?`
    ],
    Ranking: [
        tema => `Rank several options related to ${tema} from worst to best.`,
        tema => `Create a ranking of the most interesting ${tema} options.`,
        tema => `Rank different elements of ${tema} and discover which one takes first place.`,
        tema => `What is the best ${tema} option? Rank them all from worst to best.`
    ],
    Historia: [
        tema => `Tell a story related to ${tema}, starting with the problem and ending with the result.`,
        tema => `Find out what happens when you face ${tema} and follow the entire process to the end.`,
        tema => `Start with an unexpected situation related to ${tema} and discover how it ends.`,
        tema => `Experience something related to ${tema} and show how the situation changes until the end.`
    ],
    Pregunta: [
        tema => `What really happens when you try ${tema}?`,
        tema => `What is the best way to deal with ${tema}?`,
        tema => `What would happen if we pushed ${tema} to the limit?`,
        tema => `Does ${tema} really work the way everyone thinks?`
    ],
    Lista: [
        tema => `Discover the most interesting options related to ${tema}.`,
        tema => `Here are some of the best options related to ${tema}.`,
        tema => `Discover the ${tema} elements that are most worth knowing about.`,
        tema => `A list of the most notable options related to ${tema}.`
    ],
    Descubrimiento: [
        tema => `Discover something unexpected about ${tema} and find out why it happens.`,
        tema => `Investigate ${tema} and discover something you probably did not expect to find.`,
        tema => `Explore ${tema} until you find the most surprising result.`,
        tema => `Discover what is really behind ${tema}.`
    ]
};

const hooksEN = {
    Gaming: [
        tema => `Today I am putting ${tema} to the test in a way that could go very wrong.`,
        tema => `I thought ${tema} would be easy, but there is a problem.`,
        tema => `I only have one chance to pull this off with ${tema}.`,
        tema => `Can I actually beat this ${tema} challenge?`
    ],
    Entretenimiento: [
        tema => `Today we are finding out what happens when ${tema}.`,
        tema => `This seemed like a good idea until we started with ${tema}.`,
        tema => `I did not expect ${tema} to end like this.`,
        tema => `What would happen if we pushed ${tema} to the limit?`
    ],
    Educativo: [
        tema => `Today you are going to discover something important about ${tema}.`,
        tema => `If you want to understand ${tema}, start here.`,
        tema => `Most people misunderstand ${tema}.`,
        tema => `In just a few minutes, you will understand how ${tema} works.`
    ],
    Negocios: [
        tema => `There is something important you need to know about ${tema}.`,
        tema => `Before you try ${tema}, you need to know this.`,
        tema => `Does ${tema} actually work?`,
        tema => `Let us find out what really happens with ${tema}.`
    ],
    Curiosidades: [
        tema => `There is something about ${tema} you probably did not know.`,
        tema => `Did you know ${tema} can work very differently from what it seems?`,
        tema => `Today we are discovering what is really behind ${tema}.`,
        tema => `The answer about ${tema} is more surprising than it seems.`
    ],
    Storytelling: [
        tema => `It all started when I decided to take on ${tema}.`,
        tema => `I had no idea how this ${tema} story would end.`,
        tema => `At first it seemed simple, but ${tema} changed everything.`,
        tema => `This story started with a decision involving ${tema}.`
    ],
    Experimentos: [
        tema => `Today we are finding out what really happens with ${tema}.`,
        tema => `What happens if we push ${tema} to the limit?`,
        tema => `I am putting ${tema} to the test to find the answer.`,
        tema => `We have a theory about ${tema}. Now it is time to test it.`
    ],
    Lifestyle: [
        tema => `Today I am trying something different with ${tema}.`,
        tema => `I did not know if this would work, but I decided to try ${tema}.`,
        tema => `Let us find out what happens when you try ${tema}.`,
        tema => `This experience with ${tema} turned out very differently than expected.`
    ]
};

const titulosEN = {
    Gaming: [
        tema => `The hardest ${tema} challenge`,
        tema => `Can I actually do it with ${tema}?`,
        tema => `Testing ${tema} to the limit`,
        tema => `The best way to ${tema}`,
        tema => `This completely changed ${tema}`
    ],
    Entretenimiento: [
        tema => `What happens if we do this with ${tema}?`,
        tema => `I did not expect this result with ${tema}`,
        tema => `Testing ${tema} to the limit`,
        tema => `The result was unexpected`,
        tema => `This went completely differently`
    ],
    Educativo: [
        tema => `How to understand ${tema}`,
        tema => `The truth about ${tema}`,
        tema => `Everything you need to know about ${tema}`,
        tema => `${tema} explained simply`,
        tema => `The mistake everyone makes with ${tema}`
    ],
    Negocios: [
        tema => `Does ${tema} actually work?`,
        tema => `The truth about ${tema}`,
        tema => `What you need to know about ${tema}`,
        tema => `Before you try ${tema}, watch this`,
        tema => `The mistake you should avoid with ${tema}`
    ],
    Curiosidades: [
        tema => `The ${tema} fact almost nobody knows`,
        tema => `The most surprising thing about ${tema}`,
        tema => `Did you know this about ${tema}?`,
        tema => `The truth behind ${tema}`,
        tema => `This is stranger than it looks`
    ],
    Storytelling: [
        tema => `The story that started with ${tema}`,
        tema => `I did not expect this story to end like this`,
        tema => `Everything changed because of ${tema}`,
        tema => `The full story of ${tema}`,
        tema => `This is how it all started`
    ],
    Experimentos: [
        tema => `What happens if we push ${tema} to the limit?`,
        tema => `Putting ${tema} to the test`,
        tema => `The ${tema} experiment`,
        tema => `I tested ${tema} to find out the truth`,
        tema => `The result was unexpected`
    ],
    Lifestyle: [
        tema => `Trying ${tema} for the first time`,
        tema => `My experience with ${tema}`,
        tema => `Is ${tema} actually worth it?`,
        tema => `What happened when I tried ${tema}`,
        tema => `This did not go as expected`
    ]
};

const enfoquesEN = {
    Viral: "Prioritize an idea that creates immediate interest, starts strong and is easy to consume.",
    Curiosidad: "Prioritize questions, unexpected information and elements that make viewers want to discover the answer.",
    Historia: "Build the content around a clear progression: beginning, problem, development and result.",
    Reto: "Turn the topic into a challenge with difficulty, a clear goal and a result to discover at the end.",
    Educativo: "Prioritize clarity, learning and simple explanations that provide value to the viewer.",
    Debate: "Present a question that can create different opinions and arguments that invite participation."
};

const estrategiaEnfoqueEN = {
    Viral: { hook: "make the opening direct, strong and easy to understand", titulo: "use a clear promise that creates immediate interest" },
    Curiosidad: { hook: "create an unanswered question the viewer wants to solve", titulo: "leave an open question that creates curiosity" },
    Historia: { hook: "quickly present the initial problem or situation", titulo: "build a story with progression and a result" },
    Reto: { hook: "immediately present the challenge and what is at stake", titulo: "make the goal of the challenge clear" },
    Educativo: { hook: "promise to explain or demonstrate something useful quickly", titulo: "make it clear what the viewer will learn" },
    Debate: { hook: "raise a question that can divide opinions", titulo: "clearly present the dilemma or comparison" }
};

const perfilesPublicoEN = {
    Gamers: "Use references and situations from gaming while keeping a dynamic pace.",
    Principiantes: "Explain concepts simply and do not assume prior knowledge.",
    Adolescentes: "Keep the tone dynamic, direct and entertaining without unnecessarily long explanations.",
    Jóvenes: "Use natural, direct language that is easy to consume.",
    Adultos: "Prioritize clarity, usefulness and a structured explanation.",
    Creadores: "Focus on practical ideas, results and elements that can improve content.",
    "Público general": "Make the idea easy to understand even for someone unfamiliar with the topic."
};

function generar() {
    const tema = document.getElementById("tema").value.trim();
    const tipo = document.getElementById("tipoContenido").value;
    const publico = document.getElementById("publico").value;
    const plataforma = document.getElementById("plataforma").value;
    const objetivo = document.getElementById("objetivo").value;
    const duracion = document.getElementById("duracion").value;
    const estilo = document.getElementById("estilo").value;
    let enfoque = document.getElementById("enfoque").value;
    window.enfoqueReal = enfoque;

    if (enfoque === "Automático 🧠") {
        enfoque = elegirEnfoqueAutomatico(
            tipo,
            publico,
            plataforma,
            objetivo,
            duracion,
            estilo
        );

        window.enfoqueReal = enfoque;
    }

    const resultado = document.getElementById("resultado");

    if (!tema) {
        resultado.innerHTML = `
            <div class="error">
                ${idiomaActual === "en" ? "Enter a topic first to generate content." : "Escribe primero un tema para generar contenido."}
            </div>
        `;
        return;
    }

    const formatosPreferidos = formatosPorEnfoque[enfoque] || formatos[tipo];
    const formatosDisponibles = formatos[tipo].filter(f => formatosPreferidos.includes(f));
    const formato = elegir(formatosDisponibles.length ? formatosDisponibles : formatos[tipo]);
    const generacionEN = idiomaActual === "en";
    const estructurasActivas = generacionEN ? estructurasEN : estructuras;
    const hooksActivos = generacionEN ? hooksEN : hooks;
    const titulosActivos = generacionEN ? titulosEN : titulos;
    const instruccionEnfoque = (generacionEN ? enfoquesEN : enfoques)[enfoque] || "";
    const estrategia = (generacionEN ? estrategiaEnfoqueEN : estrategiaEnfoque)[enfoque] || {
        hook: "haz que el inicio sea interesante",
        titulo: "haz que el título sea claro y atractivo"
    };
    const perfil = (generacionEN ? perfilesPublicoEN : perfilesPublico)[publico] || "";
    const ajuste = ajustesPublico[publico] || {
        idea: texto => texto,
        hook: texto => texto,
        titulo: texto => texto
    };

    const ideas = mezclar(estructurasActivas[formato])
        .slice(0, 3)
        .map(funcion => limpiarIdea(ajuste.idea(funcion(tema) + " " + instruccionEnfoque)));

    const analisisIdeas = ideas.map(idea =>
        analizarIdea(
            idea,
            enfoque,
            tipo,
            publico,
            plataforma,
            objetivo,
            estilo
        )
    );

    const puntuacionesIdeas = analisisIdeas.map(analisis => analisis.puntuacion);

    const mejorIdeaIndex = encontrarMejorIdea(analisisIdeas);
    const mejorIdea = ideas[mejorIdeaIndex];
    const mejorPuntuacion = analisisIdeas[mejorIdeaIndex].puntuacion;

    const hooksGenerados = mezclar(hooksActivos[tipo])
        .slice(0, 3)
        .map(funcion => ajuste.hook(funcion(tema) + " " + instruccionEnfoque + " " + estrategia.hook));

    const titulosGenerados = mezclar(titulosActivos[tipo])
        .slice(0, 5)
        .map(funcion => ajuste.titulo(funcion(tema) + " " + instruccionEnfoque + " " + estrategia.titulo));

    const hookPrincipal = ajuste.hook(elegir(hooksActivos[tipo])(tema + " " + instruccionEnfoque + " " + estrategia.hook));
    const estructuraPrincipal = ajuste.idea(elegir(estructurasActivas[formato])(tema + " " + instruccionEnfoque + " " + estrategia.titulo));

    const guion = generacionEN
        ? `HOOK:
"${hookPrincipal}"

INTRODUCTION:
Quickly introduce ${tema} and make it clear what the viewer will discover or achieve.

AUDIENCE:
${publico}

ADAPTATION:
${perfil}

FORMAT:
${formato}

DEVELOPMENT:
${estructuraPrincipal}

Keep a ${estilo.toLowerCase()} pace and adapt the explanation to the selected audience.

KEY MOMENT:
Take the video to its most interesting point and reveal the information, test or result the viewer has been waiting for.

ENDING:
Clearly show the result and explain what you discovered.

CALL TO ACTION:
Finish by focusing on ${objetivo.toLowerCase()}.

DURATION:
Adapt the pace to approximately ${duracion}.`
        : `HOOK:
"${hookPrincipal}"

INTRODUCCIÓN:
Presenta rápidamente ${tema} y deja claro qué va a descubrir o conseguir el espectador.

PÚBLICO:
${publico}

ADAPTACIÓN:
${perfil}

FORMATO:
${formato}

DESARROLLO:
${estructuraPrincipal}

Mantén un ritmo ${estilo.toLowerCase()} y adapta la explicación al público seleccionado.

MOMENTO CLAVE:
Lleva el vídeo hasta el punto de mayor interés y revela la información, prueba o resultado que el espectador estaba esperando.

FINAL:
Muestra claramente el resultado y explica qué has descubierto.

CIERRE:
Termina buscando ${objetivo.toLowerCase()}.

DURACIÓN:
Adapta el ritmo para aproximadamente ${duracion}.`;

    const hashtags = [
        `#${limpiarHashtag(tema)}`,
        `#${limpiarHashtag(tipo)}`,
        `#${limpiarHashtag(plataforma)}`,
        generacionEN ? "#content" : "#contenido",
        generacionEN ? "#creators" : "#creadores",
        "#viral",
        generacionEN ? "#ideas" : "#ideas"
    ].join(" ");

    const textoIdeas = ideas
        .map((idea, index) => `IDEA ${index + 1}\n${idea}`)
        .join("\n\n");

    const textoHooks = hooksGenerados
        .map((hook, index) => `HOOK ${index + 1}\n${hook}`)
        .join("\n\n");

    const textoTitulos = titulosGenerados
        .map((titulo, index) => `${generacionEN ? "TITLE" : "TÍTULO"} ${index + 1}\n${titulo}`)
        .join("\n\n");

    resultado.innerHTML = `
        <div class="resultado-header">
            <h2>✨ ${generacionEN ? "Your content" : "Tu contenido"}</h2>
            <span>${plataforma} · ${tipo}</span>
        </div>

        <div class="resultado-card">
            <div class="card-top">
                <h3>💡 3 ${generacionEN ? "IDEAS" : "IDEAS"} · ${formato}</h3>
                ${botonCopiar(textoIdeas)}
            </div>

            ${ideas.map((idea, index) => `
                <div class="opcion">
                    <strong class="${index === mejorIdeaIndex ? "mejor-idea-titulo" : ""}">${index === mejorIdeaIndex ? generacionEN ? "🏆 BEST IDEA" : "🏆 MEJOR IDEA" : "Idea " + (index + 1)}</strong>
                    <p>${idea}</p>
                    <small class="puntuacion-idea">⭐ ${generacionEN ? "Potential" : "Potencial"}: ${puntuacionesIdeas[index]}/100</small>

                    <div class="analisis-idea">
                        <span>⚡ Hook: ${analisisIdeas[index].hook}</span>
                        <span>👀 ${generacionEN ? "Curiosity" : "Curiosidad"}: ${analisisIdeas[index].curiosidad}</span>
                        <span>💬 ${generacionEN ? "Engagement" : "Interacción"}: ${analisisIdeas[index].interaccion}</span>
                        <span>🎯 ${generacionEN ? "Audience" : "Público"}: ${analisisIdeas[index].publico}</span>
                        <span>📱 ${generacionEN ? "Platform" : "Plataforma"}: ${analisisIdeas[index].plataforma}</span>
                        <span>🔥 ${generacionEN ? "Angle" : "Enfoque"}: ${analisisIdeas[index].enfoque}</span>
                    </div>

                    ${obtenerMejoraHTML(idea, analisisIdeas[index], index)}

                    <div class="recomendacion-idea">
                        <p>🟢 <strong>${generacionEN ? "Strength" : "Fortaleza"}:</strong> ${
                            analisisIdeas[index].curiosidad >= analisisIdeas[index].hook
                                ? generacionEN ? "It has strong potential to create curiosity." : "Tiene un buen potencial para generar curiosidad."
                                : generacionEN ? "It has a strong hook capable of grabbing attention." : "Tiene un hook fuerte capaz de captar atención."
                        }</p>

                        <p>🔴 <strong>${generacionEN ? "Weakness" : "Debilidad"}:</strong> ${
                            Math.min(
                                analisisIdeas[index].hook,
                                analisisIdeas[index].curiosidad,
                                analisisIdeas[index].interaccion,
                                analisisIdeas[index].publico,
                                analisisIdeas[index].plataforma,
                                analisisIdeas[index].enfoque
                            ) < 55
                                ? generacionEN ? "An important aspect is limiting its potential." : "Hay un aspecto importante que limita su potencial."
                                : generacionEN ? "It can still become stronger in engagement or differentiation." : "Todavía puede ganar fuerza en interacción o diferenciación."
                        }</p>

                        <p>💡 <strong>${generacionEN ? "Improvement" : "Mejora"}:</strong> ${
                            analisisIdeas[index].interaccion < 60
                                ? generacionEN ? "Add a decision, conflict or element that invites viewers to participate." : "Añade una decisión, conflicto o elemento que invite al espectador a participar."
                                : analisisIdeas[index].curiosidad < 70
                                    ? generacionEN ? "Introduce a clearer unknown that makes viewers want to discover the result." : "Introduce una incógnita más clara que haga querer descubrir el resultado."
                                    : generacionEN ? "Make the result or consequences even more important." : "Haz que el resultado o las consecuencias sean todavía más importantes."
                        }</p>

                        <p>🎯 <strong>${generacionEN ? "Assessment" : "Veredicto"}:</strong> ${
                            analisisIdeas[index].puntuacion >= 75
                                ? generacionEN ? "Very solid idea with high potential." : "Idea muy sólida con potencial alto."
                                : analisisIdeas[index].puntuacion >= 60
                                    ? generacionEN ? "Good foundation, but it needs a small twist to stand out." : "Buena base, pero necesita un pequeño giro para destacar."
                                    : generacionEN ? "Interesting concept, although it needs a significant improvement." : "Concepto interesante, aunque necesita una mejora importante."
                        }</p>
                    </div>
                </div>
            `).join("")}
        </div>

        <div class="resultado-card">
            <div class="card-top">
                <h3>🎣 3 HOOKS</h3>
                ${botonCopiar(textoHooks)}
            </div>

            ${hooksGenerados.map((hook, index) => `
                <div class="opcion">
                    <strong>Hook ${index + 1}</strong>
                    <p>${hook}</p>
                </div>
            `).join("")}
        </div>

        <div class="resultado-card">
            <div class="card-top">
                <h3>📝 ${generacionEN ? "FULL SCRIPT" : "GUION COMPLETO"}</h3>
                ${botonCopiar(guion)}
            </div>

            <p>${guion}</p>
        </div>

        <div class="resultado-card">
            <div class="card-top">
                <h3>🏷️ 5 ${generacionEN ? "TITLES" : "TÍTULOS"}</h3>
                ${botonCopiar(textoTitulos)}
            </div>

            ${titulosGenerados.map((titulo, index) => `
                <div class="opcion">
                    <strong>${generacionEN ? "Title" : "Título"} ${index + 1}</strong>
                    <p>${titulo}</p>
                </div>
            `).join("")}
        </div>

        <div class="resultado-card">
            <div class="card-top">
                <h3>#️⃣ HASHTAGS</h3>
                ${botonCopiar(hashtags)}
            </div>

            <p>${hashtags}</p>
        </div>

        <button class="regenerar" onclick="generar()">
            🔄 ${generacionEN ? "Generate new options" : "Generar nuevas opciones"}
        </button>
    `;
}

function botonCopiar(texto) {
    texto = String(texto);

    const textoSeguro = texto
        .replace(/\\/g, "\\\\")
        .replace(/`/g, "\\`")
        .replace(/\$/g, "\\$");

    return `
        <button class="copiar" onclick="copiarTexto(\`${textoSeguro}\`, this)">
            Copiar todo
        </button>
    `;
}

async function copiarTexto(texto, boton) {
    try {
        await navigator.clipboard.writeText(String(texto));

        const original = boton.textContent;
        boton.textContent = "✓ Copiado";

        setTimeout(() => {
            boton.textContent = original;
        }, 1500);

    } catch (error) {
        boton.textContent = "Error";
    }
}

/* =========================
   HISTORIAL LOCAL
   ========================= */

const generarOriginal = generar;

/* ==========================================
   RENDERIZADO MULTIIDIOMA SIN CAMBIAR LA IDEA
   ========================================== */

generar = function() {
    const mathRandomOriginal = Math.random;

    // Cada generación recibe una semilla propia. Al cambiar de idioma
    // reutilizamos esa semilla para obtener exactamente las mismas
    // decisiones de estructura/hook/título, cambiando solo el idioma.
    if (!window.captionAIRenderSeed || !window.captionAIRerender) {
        window.captionAIRenderSeed = Math.floor(mathRandomOriginal() * 4294967296) >>> 0;
    }

    let seed = window.captionAIRenderSeed >>> 0;

    Math.random = function() {
        seed = (1664525 * seed + 1013904223) >>> 0;
        return seed / 4294967296;
    };

    try {
        generarOriginal();
    } finally {
        Math.random = mathRandomOriginal;
    }

    const tema = document.getElementById("tema").value.trim();
    const resultado = document.getElementById("resultado");

    if (!tema || resultado.querySelector(".error")) {
        return;
    }

    window.captionAIHasGeneration = true;

    let historial = JSON.parse(
        localStorage.getItem("captionAI_historial") || "[]"
    );

    if (window.captionAIRerender && window.captionAIHistoryId) {
        // Actualizar la misma entrada: no creamos duplicados al cambiar idioma.
        const entradaExistente = historial.find(
            entrada => entrada.id === window.captionAIHistoryId
        );

        if (entradaExistente) {
            entradaExistente.contenido = resultado.innerHTML;
            entradaExistente.idioma = idiomaActual;
            entradaExistente.seed = window.captionAIRenderSeed;

            localStorage.setItem(
                "captionAI_historial",
                JSON.stringify(historial)
            );

            mostrarHistorial();
            return;
        }
    }

    const entrada = {
        id: Date.now(),
        tema: tema,
        tipo: document.getElementById("tipoContenido").value,
        publico: document.getElementById("publico").value,
        plataforma: document.getElementById("plataforma").value,
        fecha: new Date().toLocaleString("es-ES"),
        idioma: idiomaActual,
        seed: window.captionAIRenderSeed,
        contenido: resultado.innerHTML
    };

    window.captionAIHistoryId = entrada.id;

    historial.unshift(entrada);
    historial = historial.slice(0, 10);

    localStorage.setItem(
        "captionAI_historial",
        JSON.stringify(historial)
    );

    mostrarHistorial();
};

function mostrarHistorial() {
    const lista = document.getElementById("listaHistorial");

    if (!lista) {
        return;
    }

    const historial = JSON.parse(
        localStorage.getItem("captionAI_historial") || "[]"
    );

    if (historial.length === 0) {
        lista.innerHTML = `
            <p class="historial-vacio">
                Tus generaciones aparecerán aquí.
            </p>
        `;
        return;
    }

    lista.innerHTML = historial.map(entrada => `
        <div class="historial-item">
            <div>
                <strong>${escaparHTML(entrada.tema)}</strong>
                <span>${escaparHTML(entrada.tipo)} · ${escaparHTML(entrada.plataforma)}</span>
                <small>${escaparHTML(entrada.fecha)}</small>
            </div>

            <div class="historial-acciones">
                <button
                    class="favorito-historial"
                    onclick="alternarFavorito(${entrada.id})"
                    title="Marcar como favorito">
                    ${entrada.favorito ? "⭐" : "☆"}
                </button>

                <button
                    class="abrir-historial"
                    onclick="abrirHistorial(${entrada.id})">
                    Abrir
                </button>
            </div>
        </div>
    `).join("");
}

function abrirHistorial(id) {
    const historial = JSON.parse(
        localStorage.getItem("captionAI_historial") || "[]"
    );

    const entrada = historial.find(item => item.id === id);

    if (!entrada) {
        return;
    }

    document.getElementById("tema").value = entrada.tema;
    document.getElementById("tipoContenido").value = entrada.tipo;
    document.getElementById("publico").value = entrada.publico;
    document.getElementById("plataforma").value = entrada.plataforma;

    // Las entradas nuevas guardan la semilla. Esto permite abrirlas
    // directamente en el idioma seleccionado sin perder la generación.
    if (entrada.seed !== undefined && entrada.seed !== null) {
        window.captionAIRenderSeed = Number(entrada.seed) >>> 0;
        window.captionAIHistoryId = entrada.id;
        window.captionAIHasGeneration = true;
        window.captionAIRerender = true;

        try {
            generar();
        } finally {
            window.captionAIRerender = false;
        }
    } else {
        // Compatibilidad con generaciones antiguas que no tenían semilla.
        document.getElementById("resultado").innerHTML = entrada.contenido;
        window.captionAIHistoryId = entrada.id;
        window.captionAIHasGeneration = true;
    }

    window.scrollTo({
        top: document.getElementById("resultado").offsetTop - 30,
        behavior: "smooth"
    });
}

function limpiarHistorial() {
    localStorage.removeItem("captionAI_historial");
    mostrarHistorial();
}

function escaparHTML(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

mostrarHistorial();


/* =========================
   FAVORITOS
   ========================= */

function alternarFavorito(id) {
    let historial = JSON.parse(
        localStorage.getItem("captionAI_historial") || "[]"
    );

    const entrada = historial.find(item => item.id === id);

    if (!entrada) {
        return;
    }

    entrada.favorito = !entrada.favorito;

    localStorage.setItem(
        "captionAI_historial",
        JSON.stringify(historial)
    );

    mostrarHistorial();
}



function filtrarHistorial(filtro, boton) {
    document.querySelectorAll(".filtro-historial").forEach(elemento => {
        elemento.classList.remove("activo");
    });

    boton.classList.add("activo");

    const lista = document.getElementById("listaHistorial");

    const historial = JSON.parse(
        localStorage.getItem("captionAI_historial") || "[]"
    );

    const resultados = filtro === "favoritos"
        ? historial.filter(entrada => entrada.favorito)
        : historial;

    if (resultados.length === 0) {
        lista.innerHTML = `
            <p class="historial-vacio">
                No tienes generaciones favoritas todavía.
            </p>
        `;
        return;
    }

    lista.innerHTML = resultados.map(entrada => `
        <div class="historial-item">
            <div>
                <strong>${escaparHTML(entrada.tema)}</strong>
                <span>${escaparHTML(entrada.tipo)} · ${escaparHTML(entrada.plataforma)}</span>
                <small>${escaparHTML(entrada.fecha)}</small>
            </div>

            <div class="historial-acciones">
                <button
                    class="favorito-historial"
                    onclick="alternarFavorito(${entrada.id})"
                    title="Marcar como favorito">
                    ${entrada.favorito ? "⭐" : "☆"}
                </button>

                <button
                    class="abrir-historial"
                    onclick="abrirHistorial(${entrada.id})">
                    Abrir
                </button>
            </div>
        </div>
    `).join("");
}


/* =========================
   ENFOQUE DEL VÍDEO
   ========================= */

const enfoques = {
    Viral: "Prioriza una idea que pueda despertar interés inmediato, tenga un inicio fuerte y sea fácil de consumir.",
    Curiosidad: "Prioriza preguntas, información inesperada y elementos que hagan querer descubrir la respuesta.",
    Historia: "Construye el contenido alrededor de una progresión clara: inicio, problema, desarrollo y resultado.",
    Reto: "Convierte el tema en un desafío con dificultad, objetivo y resultado que descubrir al final.",
    Educativo: "Prioriza claridad, aprendizaje y explicaciones sencillas que aporten valor al espectador.",
    Debate: "Presenta una cuestión que pueda generar opiniones diferentes y plantea argumentos que inviten a participar."
};

const generarConEnfoqueOriginal = generar;

generar = function() {
    generarConEnfoqueOriginal();

    const enfoqueSeleccionado = document.getElementById("enfoque")?.value;

    if (!enfoqueSeleccionado) {
        return;
    }

    const resultado = document.getElementById("resultado");

    const indicador = document.createElement("div");
    indicador.className = "enfoque-indicador";
    indicador.textContent = `🎯 Enfoque: ${window.enfoqueReal || enfoqueSeleccionado}`;

    const cabecera = resultado.querySelector(".resultado-header");

    if (cabecera) {
        cabecera.appendChild(indicador);
    }
};





























































/* ==========================================
   CAPTIONAI AUTH
   ========================================== */

const API_URL = "https://captionai-api.besq-studio.workers.dev";


function mostrarRegistro() {

    const modal = document.createElement("div");

    modal.className = "auth-modal";

    modal.innerHTML = `
        <div class="auth-box">

            <button class="cerrar-auth"
                onclick="cerrarAuth()">
                ✕
            </button>

            <h2>Crear cuenta 🚀</h2>

            <input
                type="email"
                id="registro-email"
                placeholder="Tu email"
            >

            <input
                type="password"
                id="registro-password"
                placeholder="Contraseña"
            >

            <button onclick="registrarUsuario()">
                Crear cuenta
            </button>

            <p id="auth-mensaje"></p>

        </div>
    `;

    document.body.appendChild(modal);
}


function mostrarLogin() {

    const modal = document.createElement("div");

    modal.className = "auth-modal";

    modal.innerHTML = `
        <div class="auth-box">

            <button class="cerrar-auth"
                onclick="cerrarAuth()">
                ✕
            </button>

            <h2>Iniciar sesión</h2>

            <input
                type="email"
                id="login-email"
                placeholder="Tu email"
            >

            <input
                type="password"
                id="login-password"
                placeholder="Contraseña"
            >

            <button onclick="iniciarSesion()">
                Iniciar sesión
            </button>

            <p id="auth-mensaje"></p>

        </div>
    `;

    document.body.appendChild(modal);
}


function cerrarAuth() {

    const modal = document.querySelector(".auth-modal");

    if (modal) {
        modal.remove();
    }
}


async function registrarUsuario() {

    const email =
        document.getElementById("registro-email").value.trim();

    const password =
        document.getElementById("registro-password").value;


    const mensaje =
        document.getElementById("auth-mensaje");


    if (!email || !password) {

        mensaje.textContent =
            "Completa todos los campos.";

        return;
    }


    mensaje.textContent =
        "Creando cuenta...";


    try {

        const respuesta = await fetch(
            API_URL + "/register",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );


        const datos =
            await respuesta.json();


        if (!respuesta.ok) {

            mensaje.textContent =
                datos.error ||
                "No se pudo crear la cuenta.";

            return;
        }


        mensaje.textContent =
            "¡Cuenta creada correctamente! 🚀";


        setTimeout(() => {

            cerrarAuth();

            comprobarSesion();

        }, 1000);


    } catch (error) {

        mensaje.textContent =
            "Error al conectar con el servidor.";

    }
}


async function iniciarSesion() {

    const email =
        document.getElementById("login-email").value.trim();

    const password =
        document.getElementById("login-password").value;


    const mensaje =
        document.getElementById("auth-mensaje");


    if (!email || !password) {

        mensaje.textContent =
            "Completa todos los campos.";

        return;
    }


    mensaje.textContent =
        "Iniciando sesión...";


    try {

        const respuesta = await fetch(
            API_URL + "/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );


        const datos =
            await respuesta.json();


        if (!respuesta.ok) {

            mensaje.textContent =
                datos.error ||
                "Email o contraseña incorrectos.";

            return;
        }


        mensaje.textContent =
            "¡Sesión iniciada! 🚀";


        setTimeout(() => {

            cerrarAuth();

            comprobarSesion();

        }, 1000);


    } catch (error) {

        mensaje.textContent =
            "Error al conectar con el servidor.";

    }
}


async function comprobarSesion() {

    try {

        const respuesta = await fetch(
            API_URL + "/me",
            {
                credentials: "include"
            }
        );


        const datos =
            await respuesta.json();


        const authButtons =
            document.getElementById("auth-buttons");


        if (!authButtons) {
            return;
        }


        if (
            datos.authenticated &&
            datos.user
        ) {

            authButtons.innerHTML = `

                <span class="usuario-nombre">
                    👤 ${datos.user.email}
                </span>

                <button onclick="cerrarSesion()">
                    Cerrar sesión
                </button>

            `;

        }


    } catch (error) {

        console.log(
            "No hay sesión iniciada."
        );

    }
}


async function cerrarSesion() {

    try {

        await fetch(
            API_URL + "/logout",
            {
                method: "POST",

                credentials: "include"
            }
        );

    } catch (error) {

        console.log(error);

    }


    location.reload();
}


comprobarSesion();

/* ==========================================
   CAPTIONAI CLOUD HISTORY
   ========================================== */

let historialCloud = [];


/* CARGAR HISTORIAL */

async function cargarHistorialCloud() {

    try {

        const respuesta = await fetch(
            `${API_URL}/history`,
            {
                credentials: "include"
            }
        );

        if (!respuesta.ok) {
            return false;
        }

        const datos = await respuesta.json();

        historialCloud = datos.history || [];

        return true;

    } catch (error) {

        console.error(
            "Error cargando historial:",
            error
        );

        return false;
    }
}


/* GUARDAR EN CLOUD */

async function guardarHistorialCloud(data) {

    try {

        const respuesta = await fetch(
            `${API_URL}/history`,
            {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    data
                })
            }
        );

        if (!respuesta.ok) {
            return null;
        }

        const datos = await respuesta.json();

        return {
            id: datos.id,
            createdAt: datos.createdAt
        };

    } catch (error) {

        console.error(
            "Error guardando historial:",
            error
        );

        return null;
    }
}


/* FAVORITO */

async function cambiarFavoritoCloud(
    historyId,
    esFavorito
) {

    try {

        const url = esFavorito
            ? `${API_URL}/favorites/${historyId}`
            : `${API_URL}/favorites`;

        const opciones = esFavorito
            ? {
                method: "DELETE",
                credentials: "include"
            }
            : {
                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    historyId
                })
            };


        const respuesta =
            await fetch(url, opciones);


        return respuesta.ok;

    } catch (error) {

        console.error(
            "Error cambiando favorito:",
            error
        );

        return false;
    }
}


/* BORRAR ELEMENTO */

async function borrarHistorialCloud(id) {

    try {

        const respuesta = await fetch(
            `${API_URL}/history/${id}`,
            {
                method: "DELETE",

                credentials: "include"
            }
        );

        return respuesta.ok;

    } catch (error) {

        console.error(
            "Error borrando historial:",
            error
        );

        return false;
    }
}


/* COMPROBAR SESIÓN Y CARGAR */

async function iniciarHistorialCloud() {

    const cargado =
        await cargarHistorialCloud();

    if (cargado) {

        console.log(
            "☁️ Historial Cloud cargado:",
            historialCloud.length
        );

    }
}


iniciarHistorialCloud();
