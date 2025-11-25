import User from "../models/User.js";
import UserService from "../services/UserService.js";
import Artista from "../models/Artista.js";
import UserController from "../controllers/UserController.js";
import CancionService from "../services/cancionService.js";
import CancionController from "../controllers/cancionController.js";
import ArtistaService from "../services/artistaService.js";
import ArtistaController from "../controllers/ArtistaController.js";
import Cancion from "../models/Cancion.js";

const userService = new UserService(User);
const userController = new UserController(userService);

const cancionService = new CancionService(Cancion);
const cancionController = new CancionController(cancionService);

const artistaService = new ArtistaService(Artista);
const artistaController = new ArtistaController(artistaService);


export { cancionController, userController, artistaController };
