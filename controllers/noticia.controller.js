import noticiaService from "../services/noticiaService.js";
import slugify from "slugify";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const uploadImage = multer({ storage: storage }).single("imagen");

const processImage = async (fileBuffer, noticiaId) => {
  const filename = `${noticiaId}-${Date.now()}.webp`;
  const uploadPath = path.join(__dirname, "../public/uploads", filename);
  
  await sharp(fileBuffer)
    .webp({ quality: 90 })
    .toFile(uploadPath);
    
  return `http://localhost:3000/uploads/${filename}`;
};

class NoticiaController {
  async guardar(req, res) {
    uploadImage(req, res, async (err) => {
      if (err) return res.status(400).json({ error: "Error subiendo imagen" });
      
      try {
        const { by, contenido, multimedia, id_subcategoria, subtitulo, titulo } = req.body;
        const categoria_id = req.body.id_categoria;
        const estado_id = req.body.id_estado;
        const subcategoria_id = req.body.id_subcategoria;

        const slug = slugify(titulo, { lower: true, locale: "es", trim: true });

        // Guardar sin multimedia temporalmente o usar la de string
        const noticia = await noticiaService.guardar({
          by, categoria_id, contenido, estado_id, 
          multimedia: multimedia || "", 
          subcategoria_id, subtitulo, titulo, slug
        });

        // Si viene un archivo, procesarlo con el ID de la noticia recién creada
        if (req.file) {
          const finalUrl = await processImage(req.file.buffer, noticia.id_noticia);
          noticia.multimedia = finalUrl;
          await noticiaService.actualizar(noticia.id_noticia, { multimedia: finalUrl });
        }

        res.status(201).json({
          mensaje: "Se guardo la noticia correctamente",
          noticia,
        });
      } catch (error) {
        console.error("Error guardando noticia:", error);
        res.status(400).json({ error: error.message });
      }
    });
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
    uploadImage(req, res, async (err) => {
      if (err) return res.status(400).json({ error: "Error subiendo imagen" });

      try {
        const { id } = req.params;
        let noticiaData = req.body;
        
        // Si la petición viene anidada como {noticia: ...} por el frontend antiguo
        if (req.body.noticia && typeof req.body.noticia === 'string') {
           noticiaData = JSON.parse(req.body.noticia);
        } else if (req.body.noticia) {
           noticiaData = req.body.noticia;
        }

        if (req.file) {
          const finalUrl = await processImage(req.file.buffer, id);
          noticiaData.multimedia = finalUrl;
        }

        const actualizarNoticia = await noticiaService.actualizar(id, noticiaData);

        res.status(200).json({
          mensaje: "La noticia se actualizó correctamente",
          actualizarNoticia,
        });
      } catch (error) {
        console.error("Error actualizando la noticia:", error);
        if (error.message === "Noticia no encontrada") {
          return res.status(404).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
      }
    });
  }

  async subirArchivos(req, res) {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.error("Error al procesar el archivo:", err);
          return res.status(500).json({ error: "Error al procesar el archivo" });
        }

        // Verificar si el archivo se cargó correctamente
        if (!req.file) {
          return res.status(400).json({ error: "No se recibió ningún archivo." });
        }

        // Mostrar en consola la información del archivo
        console.log("Archivo recibido:");
        console.log("Nombre del archivo:", req.file.originalname); // Nombre original del archivo
        console.log("Tipo MIME:", req.file.mimetype); // Tipo MIME del archivo
        console.log("Tamaño en bytes:", req.file.size); // Tamaño del archivo en bytes

        try {
          await fetch("http://170.239.50.165/remote.php/dav");
        } catch (fetchError) {
          console.error("Error en la petición remota:", fetchError);
        }

        // Aquí puedes hacer lo que necesites con el archivo, como guardarlo en la base de datos o en el sistema de archivos

        // Responder con la información del archivo recibido
        res.status(200).json({
          mensaje: "El archivo se cargó correctamente",
          imagen: req.file, // Información completa del archivo
        });
      });
    } catch (error) {
      console.error("Error en el controlador al subir archivo:", error);
      res.status(500).json({ error: "Error interno del servidor" });
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

  async obtenerPorSlug(req, res) {
    try {
      const { slug } = req.params;
      const noticia = await noticiaService.obtenerPorSlug(slug);

      res.status(200).json({
        mensaje: "La noticia se obtuvo correctamente",
        noticia,
      });
    } catch (error) {
      console.error("Error al obtener la noticia por slug:", error);

      if (error.message === "Noticia no encontrada") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
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

  async obtenerByCat(req, res) {
    try {
      const { id } = req.params;

      const obtenerNoticiasByCat = await noticiaService.obtenerByCat(id);

      res.status(200).json({
        mensaje: "Las noticias se obtuvieron correctamente",
        obtenerNoticiasByCat,
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
