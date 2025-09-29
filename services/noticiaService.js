import db from "../models/index.js";

class NoticiaService {
  async guardar(noticia) {
    return await db.Noticia.create(noticia);
  }

  async eliminar(noticia) {
    const noticiaExistente = await db.Noticia.findByPk(noticia.id_noticia);
    if (!noticiaExistente) {
      throw new Error("Noticia no encontrada");
    }
    return await noticiaExistente.destroy();
  }

  async actualizar(noticia_id) {
    const noticiaAModificar = await db.Noticia.findByPk(noticia_id.id_noticia);
    if (!noticiaAModificar) {
      throw new Error("Noticia no encontrada");
    }
    return await noticiaAModificar.update(noticia_id.contenido);
  }

  async obtenerId(noticia_id) {
    const noticiaAObtener = await db.Noticia.findByPk(noticia_id.id_noticia);
    if (!noticiaAObtener) {
      throw new Error("Noticia no encontrada");
    }
    return await noticiaAObtener.get();
  }

  async obtener() {
    return await db.Noticia.findAll({ order: [["createdAt", "DESC"]] });
  }

  async obtenerPorEtiqueta(body) {
    const NoticiasEtiqueta = await db.Noticia_etiqueta.findAll({
      where: { etiqueta_id: body },
    });

    if (NoticiasEtiqueta.length === 0) {
      throw new Error("No hay noticias que contengan esta etiqueta");
    }

    const idNoticias = NoticiasEtiqueta.map((a) => a.noticia_id);

    const NoticiasContenido = await db.Noticia.findAll({
      where: {
        id_noticia: idNoticias, // Sequelize automáticamente usa operador IN
      },
    });

    return NoticiasContenido;
  }
}

export default new NoticiaService();
