import db from "./models/index.js";

const run = async () => {
  try {
    const noticias = await db.Noticia.findAll();
    for (const n of noticias) {
      // Usamos picsum.photos con seed (el slug) para que cada noticia tenga una imagen distinta pero constante
      n.multimedia = `https://picsum.photos/seed/${n.slug}/1000/600`;
      await n.save();
    }
    console.log("Todas las imágenes multimedia han sido corregidas.");
    process.exit(0);
  } catch (error) {
    console.error("Error corrigiendo imágenes:", error);
    process.exit(1);
  }
};

run();
