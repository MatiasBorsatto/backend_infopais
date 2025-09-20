import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subcategoria = sequelize.define(
  "Subcategoria",
  {
    id_subcategoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "subcategorias",
    timestamps: true,
  }
);

export default Subcategoria;
