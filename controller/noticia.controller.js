import noticiaService from "../services/noticiaService.js";

class NoticiaController {
  async guardar(req, res) {
    try {
      const noticia = await noticiaService.guardar(req.body);

      res.status(201).json({
        mensaje: "Se guardo la noticia correctamente",
        noticia,
      });
    } catch (error) {
      console.error("Error guardando noticia:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      const noticia = await noticiaService.eliminar(req.body);

      res.status(200).json({
        mensaje: "La noticia se eliminó correctamente",
        noticia,
      });
    } catch (error) {
      console.error("Error guardando noticia:", error);

      if (error.message === "Noticia no encontrada") {
        res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }
}

export default new NoticiaController();
