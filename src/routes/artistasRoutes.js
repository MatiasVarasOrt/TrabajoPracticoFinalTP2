import { Router } from "express";
import {
  getAllArtistas,
  getArtistaById,
  createArtista,
  updateArtista,
  deleteArtista,
  searchArtistas,
} from "../controllers/ArtistaController.js";

const artistasRoutes = Router();

cancionesRoutes.get("/search", searchArtistas);
cancionesRoutes.get("/", getAllArtistas);
cancionesRoutes.get("/:id", getArtistaById);
cancionesRoutes.post("/", createArtista);
cancionesRoutes.put("/:id", updateArtista);
cancionesRoutes.delete("/:id", deleteArtista);

export default artistasRoutes;
