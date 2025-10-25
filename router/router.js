import express from "express";
import Noticia from "../controllers/noticia.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

//Manejo de rutas para registro / login de usuarios
router.post("/login", authController.login);
router.post("/register", authController.register);

//Acciones noticias
router.post("/guardar", Noticia.guardar); //Funcionando ok
router.delete("/eliminar", Noticia.eliminar); //Funcionando ok
router.put("/actualizar", Noticia.actualizar); //Funcionando ok
router.get("/obtener", Noticia.obtener); //Funcionando ok
router.get("/obtenerId", Noticia.obtenerPorId); //Funcionando ok
router.get("/obtenerPorEtiqueta", Noticia.obtenerNoticiasPorEtiqueta); //Funcionando ok

export default router;
