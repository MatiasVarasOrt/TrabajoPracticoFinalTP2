import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Cancion = sequelize.define(
  "Cancion",
  {
    IdCancion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "IdCancion",
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "Name",
      validate: {
        notEmpty: {
          msg: "El nombre de la canción no puede estar vacío",
        },
        len: {
          args: [1, 200],
          msg: "El nombre debe tener entre 1 y 200 caracteres",
        },
      },
    },
    IdArtista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "IdArtista",
      validate: {
        isInt: {
          msg: "El IdArtista debe ser un número entero",
        },
      },
    },
  },
  {
    tableName: "Canciones",
  }
);

export default Cancion;
