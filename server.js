import app from "./app.js";
import dotenv from "dotenv";
import os from "os";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Obtener IP local real
const interfaces = os.networkInterfaces();
let ip = "localhost";

for (const name in interfaces) {
  for (const iface of interfaces[name]) {
    if (iface.family === "IPv4" && !iface.internal) {
      ip = iface.address;
    }
  }
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor activo en http://${ip}:${PORT}`);
});
