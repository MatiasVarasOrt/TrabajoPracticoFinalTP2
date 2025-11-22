import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Artista = sequelize.define(
  "Artista",
  {
    IdArtista: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "IdArtista",
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "Name",
      validate: {
        notEmpty: {
          msg: "El nombre del artista no puede estar vacío",
        },
        len: {
          args: [1, 100],
          msg: "El nombre debe tener entre 1 y 100 caracteres",
        },
      },
    },
  },
  {
    tableName: "Artistas",
    timestamps: false,
  }
);

export default Artista;
