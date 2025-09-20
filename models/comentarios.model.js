import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Comentario = sequelize.define(
  "Comentario",
  {
    id_comentario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    noticia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "comentarios",
    timestamps: true,
  }
);

export default Comentario;
