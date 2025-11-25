import express from "express";
import { cancionController } from "../container/container.js";

const router = express.Router();

router.get("/search", cancionController.searchCanciones);
router.get("/", cancionController.getAllCanciones);
router.get("/:id", cancionController.getCancionById);
router.post("/", cancionController.createCancion);
router.put("/:id", cancionController.updateCancion);
router.delete("/:id", cancionController.deleteCancion);

export default router;
