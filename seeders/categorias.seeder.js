import Categoria from "../models/categorias.model.js";

export const seedCategorias = async () => {
  try {
    await Categoria.bulkCreate([{ nombre: "Noticias" }]);
    console.log("Categorías creadas exitosamente");
  } catch (error) {
    console.error("Error al crear categorías:", error);
  }
};
