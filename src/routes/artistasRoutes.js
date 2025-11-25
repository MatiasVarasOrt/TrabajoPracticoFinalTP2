import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { artistaController } from "../container/container.js";

const artistasRoutes = Router();

artistasRoutes.get("/search", authenticate, artistaController.searchArtistas);
artistasRoutes.get("/", authenticate, artistaController.getAllArtistas);
artistasRoutes.get("/:id", authenticate, artistaController.getArtistaById);
artistasRoutes.post("/", authenticate, artistaController.createArtista);
artistasRoutes.put("/:id", authenticate, artistaController.updateArtista);
artistasRoutes.delete("/:id", authenticate, artistaController.deleteArtista);
export default artistasRoutes;
