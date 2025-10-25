import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

async function agregarColumnaMultimedia() {
  const queryInterface = sequelize.getQueryInterface();

  const table = await queryInterface.describeTable("noticias");

  if (!table.multimedia) {
    await queryInterface.addColumn("noticias", "multimedia", {
      type: DataTypes.STRING,
      allowNull: true,
    });
    console.log("Columna 'multimedia' agregada correctamente.");
  } else {
    console.log("La columna 'multimedia' ya existe.");
  }
  await sequelize.close();
}

agregarColumnaMultimedia();
