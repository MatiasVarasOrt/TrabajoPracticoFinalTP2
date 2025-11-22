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

artistasRoutes.get("/search", searchArtistas);
artistasRoutes.get("/", getAllArtistas);
artistasRoutes.get("/:id", getArtistaById);
artistasRoutes.post("/", createArtista);
artistasRoutes.put("/:id", updateArtista);
artistasRoutes.delete("/:id", deleteArtista);

export default artistasRoutes;
