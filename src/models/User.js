import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import bcrypt from "bcrypt";

class User extends Model {
  static async compare(passPlainText, hashPass) {
    return await bcrypt.compare(passPlainText, hashPass);
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.pass = await bcrypt.hash(user.pass, salt);
});

export default User;
