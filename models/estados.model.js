import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Estado = sequelize.define(
  "Estado",
  {
    id_estado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "estados",
    timestamps: true,
  }
);

export default Estado;
