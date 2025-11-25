import User from "../models/User.js";
import Role from "../models/Role.js";
import UserService from "../services/UserService.js";
import UserController from "../controllers/UserController.js";
import CancionService from "../services/cancionService.js";
import CancionController from "../controllers/cancionController.js";
import Cancion from "../models/Cancion.js";
import artistaService from "../services/artistaService.js";
import ArtistaController from "../controllers/ArtistaController.js";
import Artista from "../models/Artista.js";

const userService = new UserService(User, Role);
const userController = new UserController(userService);

//Canciones
const cancionService = new CancionService(Cancion);
const cancionController = new CancionController(cancionService);

//Artistas
const artistaServiceInstance = new artistaService(Artista);
const artistaController = new ArtistaController(artistaServiceInstance);

export { cancionController, userController, artistaController };
