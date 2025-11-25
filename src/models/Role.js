import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class Role extends Model {}

Role.init({
    roleName:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
},{
    sequelize,
    modelName: "Role",
    tableName: "Roles",
})

export default Role;