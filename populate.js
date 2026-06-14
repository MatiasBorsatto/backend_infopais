import db from "./models/index.js";

const categoriesToCreate = [
  "Mundo", "Política", "Negocios", "Opinión", "Tecnología", 
  "Ciencia", "Salud", "Deportes", "Entretenimiento"
];

const demoNews = [
  {
    titulo: "La cumbre del clima cierra con un acuerdo histórico para reducir emisiones",
    subtitulo: "Más de 190 países se comprometen a eliminar los combustibles fósiles para 2050.",
    cat: "Mundo",
    by: "Redacción Mundo",
    contenido: "<p>En un giro inesperado, los líderes mundiales reunidos en la cumbre climática de este año han logrado firmar un acuerdo calificado de 'histórico'. El tratado establece una hoja de ruta vinculante para la eliminación progresiva del carbón y otros combustibles fósiles.</p><h2>Próximos pasos</h2><p>Las naciones desarrolladas destinarán fondos adicionales para ayudar a las economías emergentes a realizar la transición energética. Expertos señalan que ahora el reto será la implementación de estas metas en las leyes locales de cada país.</p>",
    multimedia: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1000",
    slug: "cumbre-clima-acuerdo-historico-2026"
  },
  {
    titulo: "Tensiones en el parlamento por el nuevo paquete de medidas fiscales",
    subtitulo: "La oposición amenaza con bloquear la iniciativa del gobierno.",
    cat: "Política",
    by: "Analía Gómez",
    contenido: "<p>El clima político se ha tensado al máximo tras la presentación del nuevo paquete de reformas fiscales por parte del ministerio de economía. Los bloques opositores han anunciado que no darán el quórum necesario para iniciar el debate.</p><p>Se esperan intensas negociaciones durante el fin de semana para destrabar el conflicto y evitar una crisis legislativa.</p>",
    multimedia: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1000",
    slug: "tensiones-parlamento-medidas-fiscales"
  },
  {
    titulo: "La inflación interanual muestra signos de desaceleración",
    subtitulo: "Los mercados reaccionan de manera positiva ante los datos del último trimestre.",
    cat: "Negocios",
    by: "Carlos Ruiz",
    contenido: "<p>El índice de precios al consumidor registró una subida menor a la esperada este mes, marcando la primera desaceleración consecutiva en casi un año. Esto ha traído alivio a los inversores, impulsando los índices bursátiles a nuevos máximos.</p><p>Los analistas creen que el Banco Central podría pausar las subidas de tasas de interés en la próxima reunión.</p>",
    multimedia: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
    slug: "inflacion-interanual-desaceleracion-mercados"
  },
  {
    titulo: "Inteligencia Artificial: ¿La nueva revolución industrial o una amenaza laboral?",
    subtitulo: "Un análisis profundo sobre el impacto de la IA en los empleos tradicionales.",
    cat: "Opinión",
    by: "Martín López",
    contenido: "<p>Cada gran salto tecnológico trae consigo temores y promesas. Hoy, la Inteligencia Artificial ocupa ese lugar. Mientras algunos ven en ella la herramienta definitiva para aumentar la productividad, otros temen una ola de desempleo masivo.</p><p>La historia nos enseña que la tecnología suele crear más empleos de los que destruye, pero la velocidad de adopción de la IA es lo que marca la diferencia en esta ocasión.</p>",
    multimedia: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    slug: "inteligencia-artificial-revolucion-amenaza-opinion"
  },
  {
    titulo: "Lanzan nuevo procesador cuántico que desafía los límites actuales",
    subtitulo: "La nueva arquitectura promete realizar cálculos en minutos que tomarían milenios.",
    cat: "Tecnología",
    by: "Tech News",
    contenido: "<p>Una reconocida empresa tecnológica ha develado su más reciente avance en computación cuántica: un procesador de más de 1000 qubits con una tasa de error sin precedentes.</p><h2>Aplicaciones prácticas</h2><p>Esta tecnología podría revolucionar desde el descubrimiento de nuevos fármacos hasta la criptografía global. Sin embargo, su uso comercial masivo aún está a varios años de distancia.</p>",
    multimedia: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    slug: "lanzan-nuevo-procesador-cuantico"
  },
  {
    titulo: "Descubren exoplaneta con condiciones similares a la Tierra",
    subtitulo: "El telescopio espacial ha captado firmas de vapor de agua en la atmósfera del planeta.",
    cat: "Ciencia",
    by: "Dra. Sofía Mendes",
    contenido: "<p>En un hallazgo que emociona a la comunidad científica, un nuevo planeta ha sido detectado a 120 años luz de nuestro sistema solar. Se encuentra en la 'zona habitable' de su estrella, lo que significa que el agua podría existir en estado líquido en su superficie.</p><p>Los próximos análisis espectroscópicos determinarán si la atmósfera contiene otros gases compatibles con la vida.</p>",
    multimedia: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1000",
    slug: "descubren-exoplaneta-similar-tierra"
  },
  {
    titulo: "Nuevo tratamiento genético muestra resultados prometedores contra enfermedades raras",
    subtitulo: "Ensayos clínicos de fase II reportan una mejora del 80% en pacientes.",
    cat: "Salud",
    by: "Redacción Salud",
    contenido: "<p>Un equipo de investigadores médicos ha publicado los resultados de un innovador ensayo de terapia génica. La técnica de edición de precisión ha logrado revertir los síntomas de una rara enfermedad hereditaria en la gran mayoría de los pacientes tratados.</p><p>La comunidad médica es optimista, aunque advierten que se requieren estudios a más largo plazo para descartar efectos secundarios adversos.</p>",
    multimedia: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000",
    slug: "nuevo-tratamiento-genetico-enfermedades"
  },
  {
    titulo: "Victoria épica en el clásico: un partido para la historia",
    subtitulo: "El equipo local remonta un 0-2 adverso en los últimos diez minutos.",
    cat: "Deportes",
    by: "Juan Carlos Pérez",
    contenido: "<p>Nadie en el estadio podía creer lo que presenciaba. A falta de diez minutos para el pitazo final y con un marcador 0-2, el equipo local sacó fuerzas y empuje para lograr una remontada histórica que sella su pase a la final del campeonato.</p><p>El gol definitivo, anotado de tijera en el minuto 94, será recordado por generaciones de aficionados.</p>",
    multimedia: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000",
    slug: "victoria-epica-clasico-remontada"
  },
  {
    titulo: "La esperada secuela rompe récords de taquilla en su primer fin de semana",
    subtitulo: "El film se convierte en el mayor estreno del año.",
    cat: "Entretenimiento",
    by: "Cultura Pop",
    contenido: "<p>La continuación de la saga más exitosa de la década ha llegado a los cines superando todas las expectativas. En su primer fin de semana, ha recaudado más de 300 millones a nivel global.</p><p>Los críticos alaban los efectos visuales y la profunda evolución de los personajes, asegurando que es una digna sucesora de la primera entrega.</p>",
    multimedia: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1000",
    slug: "secuela-rompe-records-taquilla"
  },
  {
    titulo: "Startup local desarrolla un plástico 100% biodegradable",
    subtitulo: "Fabricado a partir de algas marinas, el material se disuelve en agua en meses.",
    cat: "Tecnología",
    by: "Innovación al día",
    contenido: "<p>Un grupo de emprendedores ha presentado un nuevo material que tiene las mismas propiedades mecánicas que el plástico PET, pero que está fabricado a base de biopolímeros extraídos de algas marinas.</p><p>El invento promete reducir drásticamente la contaminación oceánica. Empresas multinacionales ya han mostrado interés en adquirir la patente para envases comerciales.</p>",
    multimedia: "https://images.unsplash.com/photo-1605600659936-a664687bb3c0?auto=format&fit=crop&q=80&w=1000",
    slug: "startup-plastico-biodegradable-algas"
  },
  {
    titulo: "El campeón mundial retiene su título por nocaut",
    subtitulo: "En el quinto asalto, el árbitro tuvo que detener el combate.",
    cat: "Deportes",
    by: "Deportes Action",
    contenido: "<p>En una pelea que mantuvo al público al borde del asiento, el actual campeón de los pesos pesados demostró por qué es considerado el mejor libra por libra del momento. Tras dominar los primeros rounds, logró conectar un poderoso derechazo en el quinto asalto que puso fin a la contienda.</p><p>Con esta victoria, su récord se mantiene invicto y se perfila para una unificación de cinturones el próximo año.</p>",
    multimedia: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=1000",
    slug: "campeon-mundial-retiene-titulo-nocaut"
  },
  {
    titulo: "Fuerte caída en el precio del petróleo afecta a los mercados emergentes",
    subtitulo: "Las monedas locales sufren devaluaciones frente al dólar.",
    cat: "Negocios",
    by: "Carlos Ruiz",
    contenido: "<p>Un sorpresivo aumento en las reservas globales de crudo ha provocado una caída del 5% en el precio del barril. Esta situación está golpeando duramente a las economías dependientes de la exportación de hidrocarburos, cuyas monedas han perdido valor significativo en las últimas horas.</p><p>Se espera que la OPEP anuncie medidas extraordinarias para estabilizar el mercado a corto plazo.</p>",
    multimedia: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000",
    slug: "caida-precio-petroleo-mercados-emergentes"
  }
];

const run = async () => {
  try {
    console.log("Iniciando poblamiento de la BD...");

    // 1. Obtener/Crear subcategoría por defecto
    let subcategoria = await db.Subcategoria.findOne();
    if (!subcategoria) {
      subcategoria = await db.Subcategoria.create({
        nombre: "General",
        categoria_id: 1 // temporal, se ignora o se ajusta luego
      });
    }
    const defaultSubcat = subcategoria.id_subcategoria;

    // 2. Limpiar noticias basura o de pruebas
    // Vamos a borrar TODAS las noticias actuales para dejar el sistema limpio
    // El usuario pidió "reemplazarlas"
    await db.Noticia.destroy({ where: {} });
    console.log("Noticias anteriores eliminadas.");

    // 3. Crear las categorías faltantes
    const categoriasIds = {};
    for (const catName of categoriesToCreate) {
      let cat = await db.Categoria.findOne({ where: { nombre: catName } });
      if (!cat) {
        cat = await db.Categoria.create({ nombre: catName });
      }
      categoriasIds[catName] = cat.id_categoria;
    }
    console.log("Categorías aseguradas.");

    // 4. Insertar las noticias reales
    for (const noticia of demoNews) {
      const catId = categoriasIds[noticia.cat];
      
      await db.Noticia.create({
        titulo: noticia.titulo,
        subtitulo: noticia.subtitulo,
        by: noticia.by,
        contenido: noticia.contenido,
        estado_id: 1, // Activo
        categoria_id: catId,
        subcategoria_id: defaultSubcat,
        multimedia: noticia.multimedia,
        slug: noticia.slug,
        vistas: Math.floor(Math.random() * 1500),
        likes: Math.floor(Math.random() * 300),
        dislikes: Math.floor(Math.random() * 20)
      });
    }

    console.log("Nuevas noticias demo insertadas con éxito.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

run();
