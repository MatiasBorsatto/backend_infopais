import cors from "cors";
import express from "express";
import router from "./router/router.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.16:4000"],
    credentials: true,
  })
);

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api", router);

export default app;
