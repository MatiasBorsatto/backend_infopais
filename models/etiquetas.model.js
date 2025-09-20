import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Etiqueta = sequelize.define(
  "Etiqueta",
  {
    id_etiqueta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_etiqueta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "etiquetas",
    timestamps: true,
  }
);

export default Etiqueta;
