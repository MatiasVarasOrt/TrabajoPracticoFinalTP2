import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { artistaController } from "../container/container.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { ROLES } from "../models/rolesEnum.js";

const artistasRoutes = Router();

artistasRoutes.get("/search", authenticate, authorizeRole([ROLES.ADMIN, ROLES.USER]), artistaController.searchArtistas);
artistasRoutes.get("/", authenticate, authorizeRole([ROLES.ADMIN, ROLES.USER]), artistaController.getAllArtistas);
artistasRoutes.get("/:id", authenticate, authorizeRole([ROLES.ADMIN]), artistaController.getArtistaById);
artistasRoutes.post("/", authenticate, authorizeRole([ROLES.ADMIN]), artistaController.createArtista);
artistasRoutes.put("/:id", authenticate, authorizeRole([ROLES.ADMIN]), artistaController.updateArtista);
artistasRoutes.delete("/:id", authenticate, authorizeRole([ROLES.ADMIN]), artistaController.deleteArtista);
export default artistasRoutes;
