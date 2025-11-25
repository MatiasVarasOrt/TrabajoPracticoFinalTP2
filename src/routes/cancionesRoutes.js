import express from "express";
import { cancionController } from "../container/container.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/search", authenticate, cancionController.searchCanciones);
router.get("/", authenticate, cancionController.getAllCanciones);
router.get("/:id", authenticate, cancionController.getCancionById);
router.post("/", authenticate, cancionController.createCancion);
router.put("/:id", authenticate, cancionController.updateCancion);
router.delete("/:id", authenticate, cancionController.deleteCancion);
export default router;
