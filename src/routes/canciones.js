import express from "express";
import {
  getAllCanciones,
  getCancionById,
  createCancion,
  updateCancion,
  deleteCancion,
  searchCanciones,
} from "../controllers/cancionController.js";

const router = express.Router();

// Definir las rutas y asociarlas con los controladores
router.get("/search", searchCanciones); // GET /api/canciones/search?query=nombre
router.get("/", getAllCanciones); // GET /api/canciones
router.get("/:id", getCancionById); // GET /api/canciones/:id
router.post("/", createCancion); // POST /api/canciones
router.put("/:id", updateCancion); // PUT /api/canciones/:id
router.delete("/:id", deleteCancion); // DELETE /api/canciones/:id

export default router;
