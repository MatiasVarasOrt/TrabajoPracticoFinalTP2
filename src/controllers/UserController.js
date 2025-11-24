import UserService from "../services/UserService.js";

class UserController {
  constructor(service) {
    this.userService = service;
  }

  // GET /users
  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).send({
        success: true,
        message: users,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // POST /users/register
  createUser = async (req, res) => {   
    try {
      const { name, mail, pass, roleId } = req.body;

      const user = await this.userService.createUser({
        name,
        mail,
        pass,
      });

      res.status(200).send({
        success: true,
        message: user,
      });

    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // POST /users/login
  login = async (req, res) => {
    try {
      const { mail, pass } = req.body;

      const user = await this.userService.login({ mail, pass });

      // El prof usa cookies, así que lo respetamos
      res.cookie("payload", user);

      res.status(200).send({
        success: true,
        message: "User logged",
      });

    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  // GET /users/me
  me = async (req, res) => {
    try {
      const { user } = req;

      const data = await this.userService.me(user);

      res.status(200).send({
        success: true,
        message: data,
      });

    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      return res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      return res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      await this.userService.deleteUser(req.params.id);
      return res.json({
        success: true,
        message: "Usuario eliminado",
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };

  searchUsers = async (req, res) => {
    try {
      const { query } = req.query;
      const users = await this.userService.searchUsers(query);

      return res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };
}

export default UserController;
