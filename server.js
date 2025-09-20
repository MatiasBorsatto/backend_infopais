import app from "./app.js";
import dotenv from "dotenv";
import os from "os";
import sequelize from "./config/db.js";

import { runSeeders } from "./seeders/index.js";

dotenv.config();

const PORT = process.env.PORT;

await sequelize.sync({ alter: true });
//await runSeeders();

const interfaces = os.networkInterfaces();
let ip = "localhost";
for (const iface of Object.values(interfaces).flat()) {
  if (iface.family === "IPv4" && !iface.internal) {
    ip = iface.address;
    break;
  }
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor activo en http://${ip}:${PORT}`);
});
