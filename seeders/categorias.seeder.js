import Categoria from "../models/categorias.model.js";

export const seedCategorias = async () => {
  try {
    await Categoria.bulkCreate([
      { nombre: "Política" },
      { nombre: "Deportes" },
      { nombre: "Tecnología" },
      { nombre: "Entretenimiento" },
      { nombre: "Economía" },
    ]);
    console.log("Categorías creadas exitosamente");
  } catch (error) {
    console.error("Error al crear categorías:", error);
  }
};
