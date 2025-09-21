import Subcategoria from "../models/subcategorias.model.js";

export const seedSubcategorias = async () => {
  try {
    await Subcategoria.bulkCreate([
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
