import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Noticia_etiqueta = sequelize.define(
  "Noticia_etiqueta",
  {
    etiqueta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    noticia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "noticias_etiquetas",
    timestamps: true,
  }
);

export default Noticia_etiqueta;
