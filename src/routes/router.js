import { Router } from "express";
import cancionesRoutes from "./cancionesRoutes.js";

const router = Router();

router.use("/canciones", cancionesRoutes);

export default router;
