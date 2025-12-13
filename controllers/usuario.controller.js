import UsuarioService from "../services/usuario.service.js";
import bcrypt from "bcrypt";

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

  async obtenerUsuario(req, res) {
    try {
      const { id } = req.params;
      const obtenerUsuario = await UsuarioService.obtenerUsuario(id);

      res.status(200).json({
        mensaje: "El usuario se obtuvo correctamente",
        obtenerUsuario,
      });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);

      if (error.message === "Usuario no encontrada") {
        res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const { nombre, email, rol_id, password } = req.body;
      const { id } = req.params;

      const password_hash = await bcrypt.hash(password, 10);

      const actualizarUsuario = await UsuarioService.actualizarUsuario(id, {
        nombre,
        email,
        rol_id,
        password_hash,
      });

      res.status(200).json({
        mensaje: "El usuario se actualizo correctamente",
        actualizarUsuario,
      });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async eliminarUsuario(req, res) {
    try {
      const { id } = req.params;

      const eliminarUsuario = await UsuarioService.eliminarUsuario(id);

      res.status(200).json({
        mensaje: "El usuario se elimino correctamente",
        eliminarUsuario,
      });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UsuarioController();
