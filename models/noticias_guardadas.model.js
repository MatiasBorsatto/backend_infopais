import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Noticia_guardada = sequelize.define(
  "Noticia_guardada",
  {
    noticia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "noticias_guardadas",
    timestamps: true,
  }
);

export default Noticia_guardada;
