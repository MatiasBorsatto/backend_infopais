import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Buscar usuario
      const usuario = await authService.login(email);

      if (!usuario) {
        return res.status(401).json({ error: "El usuario no existe" });
      }

      // Comparar contraseña
      const match = await bcrypt.compare(password, usuario.password_hash);

      if (!match) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Generar token
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        JWT_SECRET
      );

      // Responder con token
      res.cookie("token", token, {
        maxAge: 3600000, //tiempo de expiracion de la cookie expresado en ms
        httpOnly: true, //true si se quiere que solo se pueda acceder a la cookie por peticiones http
        secure: false, //true si se quiere que la cookie solo se pueda utilizar en sitios https
        sameSite: "lax", //lax si se quiere poder acceder a las cookies si el backend esta en un servidor distinto al del front
      });
      res.json({ message: "Login correcto!", token, rol: usuario.rol_id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }

  async register(req, res) {
    try {
      let { nombre, fecha_nac, email, password } = req.body;

      fecha_nac = new Date(fecha_nac).toISOString();

      console.log(nombre, fecha_nac, email, password);

      // Verificar si el email ya existe
      const usuarioExistente = await authService.login(email);
      if (usuarioExistente) {
        return res.status(409).json({
          error: "El email ya se encuentra registrado. Intente con otro.",
        });
      }

      // Hashear la contraseña
      const password_hash = await bcrypt.hash(password, 10);

      // Registrar usuario nuevo
      const nuevoUsuario = await authService.register({
        nombre,
        fecha_nac,
        email,
        password_hash,
      });

      return res.status(201).json({
        mensaje: "Usuario registrado correctamente",
        usuario: nuevoUsuario,
      });
    } catch (error) {
      console.error("Error registrando usuario:", error);
      return res.status(500).json({
        error: "Error interno al registrar el usuario",
        detalles: error.message,
      });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true, //true si se quiere que solo se pueda acceder a la cookie por peticiones http
        secure: false, //true si se quiere que la cookie solo se pueda utilizar en sitios https
        sameSite: "lax", //lax si se quiere poder acceder a las cookies si el backend esta en un servidor distinto al del front
      });
      return res.status(200).json({
        mensaje: "Sesión cerrada correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error interno al eliminar cookie",
        detalles: error.message,
      });
    }
  }
}

export default new AuthController();
