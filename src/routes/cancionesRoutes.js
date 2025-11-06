import { Router } from "express";
import {
  getAllCanciones,
  getCancionById,
  createCancion,
  updateCancion,
  deleteCancion,
  searchCanciones,
} from "../controllers/cancionController.js";

const cancionesRoutes = Router();

cancionesRoutes.get("/search", searchCanciones);
cancionesRoutes.get("/", getAllCanciones);
cancionesRoutes.get("/:id", getCancionById);
cancionesRoutes.post("/", createCancion);
cancionesRoutes.put("/:id", updateCancion);
cancionesRoutes.delete("/:id", deleteCancion);

export default cancionesRoutes;
