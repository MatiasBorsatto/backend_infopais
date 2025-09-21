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
}

export default new NoticiaService();
