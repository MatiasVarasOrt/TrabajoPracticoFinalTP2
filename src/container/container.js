import User from "../models/User.js";
import Role from "../models/Role.js";
import UserService from "../services/UserService.js";
import UserController from "../controllers/UserController.js";
import CancionService from "../services/cancionService.js";
import CancionController from "../controllers/cancionController.js";
import Cancion from "../models/Cancion.js";

const userService = new UserService(User, Role);
const userController = new UserController(userService);

const cancionService = new CancionService(Cancion);
const cancionController = new CancionController(cancionService);

export { cancionController, userController };
