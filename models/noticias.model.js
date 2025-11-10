import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Noticia = sequelize.define(
  "Noticia",
  {
    id_noticia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subcategoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vistas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    multimedia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "noticias",
    timestamps: true,
  }
);

export default Noticia;
