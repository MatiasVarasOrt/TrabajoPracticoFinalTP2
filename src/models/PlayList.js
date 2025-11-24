import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const PlayList = sequelize.define(
  "PlayList",
  {
    IdPlaylist: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "IdPlaylist",
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UserId",
      references: {
        model: "Users",
        key: "IdUser",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "Name",
      validate: {
        notEmpty: {
          msg: "El nombre de la playlist es obligatorio",
        },
      },
    },
    Followers: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      field: "Followers",
      comment: "Lista de usuarios que siguen la playlist",
    },
  },
  {
    tableName: "Playlists",
    timestamps: false,
  }
);

PlayList.associate = (models) => {
  if (models.User) {
    PlayList.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "Owner",
    });
  }

  if (models.Cancion) {
    PlayList.belongsToMany(models.Cancion, {
      through: models.PlaylistsCanciones || "PlaylistsCanciones",
      foreignKey: "IdPlaylist",
      otherKey: "IdCancion",
      as: "Canciones",
    });
  }
};

export default PlayList;
