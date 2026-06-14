import db from "../models/index.js";

const noticiasDemo = [
  {
    titulo: "Aprobada la nueva ley de tecnología",
    subtitulo: "El congreso ha aprobado el proyecto de forma unánime.",
    by: "Juan Pérez",
    contenido: "<p>El congreso ha decidido <b>aprobar</b> la nueva ley de tecnología que busca fomentar el desarrollo de software local.</p><p>Se esperan grandes inversiones en el sector, lo cual potenciará el mercado laboral para desarrolladores.</p><h2>Impacto económico</h2><p>Diversos analistas coinciden en que esta medida atraerá capital extranjero.</p>",
    estado_id: 1,
    categoria_id: 1,
    subcategoria_id: 3,
    multimedia: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    slug: "aprobada-nueva-ley-tecnologia"
  },
  {
    titulo: "Descubren nueva especie en el Amazonas",
    subtitulo: "Científicos hallan un anfibio nunca antes visto.",
    by: "María Gómez",
    contenido: "<p>Un equipo de investigadores internacionales ha encontrado una nueva especie de rana que brilla en la oscuridad.</p><p>El hallazgo ocurrió durante una expedición de dos semanas en la selva profunda.</p>",
    estado_id: 1,
    categoria_id: 1, 
    subcategoria_id: 1, // Política/General (fallback)
    multimedia: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000",
    slug: "descubren-nueva-especie-amazonas"
  },
  {
    titulo: "El mercado financiero experimenta una subida histórica",
    subtitulo: "Las acciones de las principales tecnológicas alcanzan valores récord.",
    by: "Carlos Ruiz",
    contenido: "<p>Hoy ha sido un día histórico para Wall Street.</p><p>Las acciones de diversas compañías subieron más del 15% en una sola jornada, impulsadas por buenos resultados trimestrales.</p>",
    estado_id: 1,
    categoria_id: 1,
    subcategoria_id: 5,
    multimedia: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
    slug: "mercado-financiero-subida-historica"
  },
  {
    titulo: "Victoria agónica en el clásico",
    subtitulo: "Un gol en el último minuto define el campeonato.",
    by: "Redacción Deportes",
    contenido: "<p>El partido parecía destinado al empate, pero un cabezazo en el minuto 93 cambió la historia del torneo.</p>",
    estado_id: 1,
    categoria_id: 1,
    subcategoria_id: 2,
    multimedia: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000",
    slug: "victoria-agonica-clasico"
  }
];

export const seedNoticias = async () => {
  try {
    const categorias = await db.Categoria.findAll();
    const subcategorias = await db.Subcategoria.findAll();

    if (categorias.length === 0 || subcategorias.length === 0) {
      console.log("No hay categorías o subcategorías, asegúrate de correr sus seeders primero.");
      return;
    }

    const defaultCat = categorias[0].id_categoria;
    const defaultSubcat = subcategorias[0].id_subcategoria;

    for (const noticia of noticiasDemo) {
      const existe = await db.Noticia.findOne({ where: { slug: noticia.slug } });
      if (!existe) {
        await db.Noticia.create({
          ...noticia,
          categoria_id: defaultCat,
          subcategoria_id: defaultSubcat
        });
        console.log(`Noticia creada: ${noticia.titulo}`);
      }
    }
  } catch (error) {
    console.error("Error al poblar noticias:", error);
  }
};
