import Rol from "../models/roles.model.js";

export const seedRoles = async () => {
  try {
    await Rol.bulkCreate([
      { nombre: "admin" },
      { nombre: "editor" },
      { nombre: "usuario" },
    ]);
    console.log("Roles creados exitosamente");
  } catch (error) {
    console.error("Error al crear roles:", error);
  }
};
