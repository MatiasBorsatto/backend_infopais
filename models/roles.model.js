import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Rol = sequelize.define(
  "Rol",
  {
    id_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: true,
  }
);

export default Rol;
