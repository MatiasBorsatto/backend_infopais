import UsuarioService from "../services/usuario.service.js";

class UsuarioController {
  async obtenerUsuarios(req, res) {
    try {
      const obtenerUsuarios = await UsuarioService.obtenerUsuarios();

      res.status(200).json({
        mensaje: "Los usuarios se obtuvieron correctamente",
        obtenerUsuarios,
      });
    } catch (error) {
      console.error("Error al obtener la noticia:", error);

      if (error.message === "Noticia no encontrada") {
        res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UsuarioController();
