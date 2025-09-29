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

  async actualizar(req, res) {
    try {
      const actualizarNoticia = await noticiaService.actualizar(req.body);

      res.status(200).json({
        mensaje: "La noticia se actualizó correctamente",
        actualizarNoticia,
      });
    } catch (error) {
      console.error("Error actualizando la noticia:", error);

      if (error.message === "Noticia no encontrada") {
        res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const obtenerNoticiaId = await noticiaService.obtenerId(req.body);

      res.status(200).json({
        mensaje: "La noticia se obtuvo correctamente",
        obtenerNoticiaId,
      });
    } catch (error) {
      console.error("Error al obtener la noticia:", error);

      if (error.message === "Noticia no encontrada") {
        res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  async obtener(req, res) {
    try {
      const obtenerNoticias = await noticiaService.obtener();

      res.status(200).json({
        mensaje: "Las noticias se obtuvieron correctamente",
        obtenerNoticias,
      });
    } catch (error) {
      console.error("Error al obtener las noticias:", error);

      if (error.message === "Noticia no encontrada") {
        res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  async obtenerNoticiasPorEtiqueta(req, res) {
    try {
      const obtenerNoticiasPorEtiqueta =
        await noticiaService.obtenerPorEtiqueta(req.body.etiqueta_id);

      res.status(200).json({
        mensaje: "Las noticias se obtuvieron correctamente",
        obtenerNoticiasPorEtiqueta,
      });
    } catch (error) {
      console.error("Error al obtener las noticias:", error);

      if (error.message === "Noticias no encontradas") {
        res.status(404).json({ error: error.message });
      }

      res.status(400).json({ error: error.message });
    }
  }
}

export default new NoticiaController();
