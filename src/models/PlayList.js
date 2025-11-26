import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class PlayList extends Model {}

PlayList.init(
  {
    IdPlaylist: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false,
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
    },
  },
  {
    sequelize,
    modelName: "PlayList",
    tableName: "Playlists",
    timestamps: false,
  }
);

export default PlayList;
