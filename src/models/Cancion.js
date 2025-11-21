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
    ArtistaId: {
     type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Artista",
      key: "IdArtista"
    },
    },
  },
  {
    tableName: "Canciones",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);
Cancion.associate = (models) => {
  Cancion.belongsTo(models.Artista, {
    foreignKey: "ArtistaId",
    as: "Artista"
  });
};
export default Cancion;
