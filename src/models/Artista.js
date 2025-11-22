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
            type: DataTypes.STRING(200),
            allowNull: false,
            field: "Name",
    }
}
);
Artista.associate = (models) => {
  Artista.hasMany(models.Cancion, {
    foreignKey: "ArtistaId",
    as: "Canciones"
  });
};


export default Artista;