import { Router } from "express";
import {
  getAllArtistas,
  getArtistaById,
  createArtista,
  updateArtista,
  deleteArtista,
  searchArtistas,
} from "../controllers/ArtistaController.js";
import authenticate from "../middlewares/authenticate.js";

const artistasRoutes = Router();

artistasRoutes.get("/search", authenticate, searchArtistas);
artistasRoutes.get("/", authenticate, getAllArtistas);
artistasRoutes.get("/:id", authenticate, getArtistaById);
artistasRoutes.post("/", authenticate, createArtista);
artistasRoutes.put("/:id", authenticate, updateArtista);
artistasRoutes.delete("/:id", authenticate, deleteArtista);
export default artistasRoutes;
