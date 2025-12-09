import noticiaService from "../services/noticiaService.js";
import slugify from "slugify";

class NoticiaController {
  async guardar(req, res) {
    try {
      const {
        by,
        categoria_id,
        contenido,
        estado_id,
        multimedia,
        subcategoria_id,
        subtitulo,
        titulo,
      } = req.body;

      const slug = slugify(titulo, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "es", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });

      const noticia = await noticiaService.guardar({
        by,
        categoria_id,
        contenido,
        estado_id,
        multimedia,
        subcategoria_id,
        subtitulo,
        titulo,
        slug,
      });

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
      const { id } = req.params;
      const noticia = await noticiaService.eliminar(id);

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

  async obtenerCategorias(req, res) {
    try {
      const obtenerCategorias = await noticiaService.obtenerCategorias();

      res.status(200).json({
        mensaje: "Las categorias se obtuvieron correctamente",
        obtenerCategorias,
      });
    } catch (error) {
      console.error("Error al obtener las categorias:", error);

      if (error.message === "Categorias no encontradas") {
        res.status(404).json({ error: error.message });
      }

      res.status(400).json({ error: error.message });
    }
  }

  async obtenerSubcategorias(req, res) {
    try {
      const obtenerSubcategorias = await noticiaService.obtenerSubcategorias();

      res.status(200).json({
        mensaje: "Las subcategorias se obtuvieron correctamente",
        obtenerSubcategorias,
      });
    } catch (error) {
      console.error("Error al obtener las subcategorias:", error);

      if (error.message === "Subcategorias no encontradas") {
        res.status(404).json({ error: error.message });
      }

      res.status(400).json({ error: error.message });
    }
  }
}

export default new NoticiaController();
