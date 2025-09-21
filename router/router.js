import express from "express";
import Noticia from "../controller/noticia.controller.js";

const router = express.Router();

router.post("/guardar", Noticia.guardar);
router.delete("/eliminar", Noticia.eliminar);

export default router;
