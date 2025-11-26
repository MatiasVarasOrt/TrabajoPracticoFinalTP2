import { generateToken } from "../utils/jwt.js";
import { Op } from "sequelize";
import Role from "../models/Role.js";

class UserService {
  constructor(user, role) {
    this.user = user;
    this.role = role;
  }

  // GET /users
  getAllUsers = async () => {
    const users = await this.user.findAll({
      attributes: ["id", "name", "mail", "roleId"],
      include: {
        model: this.role,
        as: "Role",
        attributes: ["id", "roleName"],
      },
      order: [["id", "ASC"]],
    });
    return users;
  };

  // POST /users/register
  createUser = async (data) => {
    const newUser = await this.user.create(data);

    // Solo devolvemos info básica, nunca la contraseña
    return {
      id: newUser.id,
      name: newUser.name,
      mail: newUser.mail,
    };
  };

  // POST /users/login
  login = async (data) => {
    const user = await this.user.findOne({ where: { mail: data.mail } });

    if (!user) throw new Error("User not found");

    // comparación usando método estático del modelo
    const comparePass = await this.user.compare(data.pass, user.pass);
    if (!comparePass) throw new Error("Invalid credentials");

    const payload = {
      id: user.id,
      name: user.name,
      mail: user.mail,
      roleId: user.roleId,
    };

    const token = generateToken(payload);
    return token;
  };

  // GET /users/me
  me = async (user) => {
    return user; // viene del middleware de autenticación
  };

  async getUserById(id) {
    const user = await this.user.findByPk(id, {
      attributes: ["id", "name", "mail", "roleId"],
      include: {
        model: this.role,
        as: "Role",
        attributes: ["id", "roleName"],
      },
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }

  async updateUser(id, data) {
    const user = await this.getUserById(id);

    const { name, mail } = data;

    if (name !== undefined) user.name = name;
    if (mail !== undefined) user.mail = mail;

    await user.save();

    return user;
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);

    await user.destroy();

    return true;
  }

  async searchUsers(query) {
    if (!query) {
      const error = new Error("El parámetro 'query' es requerido");
      error.name = "ValidationError";
      throw error;
    }

    return await this.user.findAll({
      attributes: ["id", "name", "mail", "roleId"],
      where: {
        name: { [Op.like]: `%${query}%` },
      },
      include: {
        model: this.role,
        as: "Role",
        attributes: ["id", "roleName"],
      },
      order: [["name", "ASC"]],
    });
  }
}

export default UserService;
