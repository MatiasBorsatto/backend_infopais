import { runSeeders } from "../seeders/index.js";

const execute = async () => {
  console.log("Iniciando carga de datos (Seeders)...");
  await runSeeders();
  console.log("Carga de datos finalizada.");
  process.exit(0);
};

execute();
