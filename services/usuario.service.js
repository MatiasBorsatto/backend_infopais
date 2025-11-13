import Usuario from "../models/usuarios.model.js";

class UsuarioService {
  async obtenerUsuarios() {
    try {
      return await Usuario.findAll();
    } catch (error) {
      console.error("Error al loguearse:", error);
      throw error;
    }
  }
}

export default new UsuarioService();
