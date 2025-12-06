import cors from "cors";
import express from "express";
import router from "./router/router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.16:4000"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api", router);

export default app;
