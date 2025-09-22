import Noticia from "../models/noticias.model.js";

class NoticiaService {
  async guardar(noticia) {
    return await Noticia.create(noticia);
  }

  async eliminar(noticia) {
    const noticiaExistente = await Noticia.findByPk(noticia.id_noticia);
    if (!noticiaExistente) {
      throw new Error("Noticia no encontrada");
    }
    return await noticiaExistente.destroy();
  }

  async actualizar(noticia_id) {
    const noticiaAModificar = await Noticia.findByPk(noticia_id.id_noticia);
    if (!noticiaAModificar) {
      throw new Error("Noticia no encontrada");
    }
    return await noticiaAModificar.update(noticia_id.contenido);
  }

  async obtenerId(noticia_id) {
    const noticiaAObtener = await Noticia.findByPk(noticia_id.id_noticia);
    if (!noticiaAObtener) {
      throw new Error("Noticia no encontrada");
    }
    return await noticiaAObtener.get();
  }

  async obtener() {
    return await Noticia.get();
  }
}

export default new NoticiaService();
