import app from "./app.js";
import dotenv from "dotenv";
import os from "os";
import sequelize from "./config/db.js";
import db from "./models/index.js";

import { runSeeders } from "./seeders/index.js";

dotenv.config();

const PORT = process.env.PORT;

await db.sequelize.sync();
//await runSeeders();

const interfaces = os.networkInterfaces();
let ip = "localhost";

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor activo en http://${ip}:${PORT}`);
});
