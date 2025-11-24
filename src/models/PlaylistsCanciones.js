import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const PlaylistsCanciones = sequelize.define(
  "PlaylistsCanciones",
  {
    IdPlaylist: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "IdPlaylist",
      references: {
        model: "Playlists",
        key: "IdPlaylist",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    IdCancion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "IdCancion",
      references: {
        model: "Canciones",
        key: "IdCancion",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "PlaylistsCanciones",
    timestamps: false,
  }
);

export default PlaylistsCanciones;
