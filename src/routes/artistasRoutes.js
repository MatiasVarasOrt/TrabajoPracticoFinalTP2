import { Router } from "express";
import { artistaController } from "../container/container.js";


const artistasRoutes = Router();

artistasRoutes.get("/search", artistaController.searchArtistas);
artistasRoutes.get("/", artistaController.getAllArtistas);
artistasRoutes.get("/:id", artistaController.getArtistaById);
artistasRoutes.post("/", artistaController.createArtista);
artistasRoutes.put("/:id", artistaController.updateArtista);
artistasRoutes.delete("/:id", artistaController.deleteArtista);

export default artistasRoutes;
