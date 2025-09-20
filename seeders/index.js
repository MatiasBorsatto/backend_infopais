import { seedRoles } from "./roles.seeder.js";
import { seedEstados } from "./estados.seeder.js";
import { seedCategorias } from "./categorias.seeder.js";

export const runSeeders = async () => {
  try {
    // Ejecutar seeders en orden
    await seedRoles();
    await seedEstados();
    await seedCategorias();

    console.log("Todos los seeders se ejecutaron correctamente");
  } catch (error) {
    console.error("Error al ejecutar los seeders:", error);
  }
};
