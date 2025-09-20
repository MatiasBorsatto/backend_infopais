import Estado from "../models/estados.model.js";

export const seedEstados = async () => {
  try {
    await Estado.bulkCreate([
      { nombre: "borrador" },
      { nombre: "publicado" },
      { nombre: "archivado" },
      { nombre: "eliminado" },
    ]);
    console.log("Estados creados exitosamente");
  } catch (error) {
    console.error("Error al crear estados:", error);
  }
};
