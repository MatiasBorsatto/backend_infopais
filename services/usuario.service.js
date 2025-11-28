import Usuario from "../models/usuarios.model.js";

class UsuarioService {
  async obtenerUsuarios() {
    try {
      return await Usuario.findAll({ where: { estado: 1 } });
    } catch (error) {
      console.error("Error al loguearse:", error);
      throw error;
    }
  }

  async actualizarUsuario(id, datos) {
    try {
      return await Usuario.update(datos, {
        where: { id_usuario: id },
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  }

  async eliminarUsuario(id_usuario) {
    try {
      return await Usuario.update({ estado: 2 }, { where: { id_usuario } });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  }
}

export default new UsuarioService();
