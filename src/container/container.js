import User from "../models/User.js";
import UserService from "../services/UserService.js";
import UserController from "../controllers/UserController.js";

const userService = new UserService(User);
const userController = new UserController(userService);

export default userController;
