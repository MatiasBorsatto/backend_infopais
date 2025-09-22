import express from "express";
import Noticia from "../controllers/noticia.controller.js";

const router = express.Router();

//Acciones noticias
router.post("/guardar", Noticia.guardar);
router.delete("/eliminar", Noticia.eliminar);
router.put("/actualizar", Noticia.actualizar);
router.get("/obtener", Noticia.obtener);
router.get("/obtenerId", Noticia.obtenerPorId);

export default router;
