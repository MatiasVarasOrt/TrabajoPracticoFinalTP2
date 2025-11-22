import { Router } from "express";
import cancionesRoutes from "./cancionesRoutes.js";
import artistasRoutes from "./artistasRoutes.js";

const router = Router();

router.use("/canciones", cancionesRoutes);
router.use("/artistas", artistasRoutes);

export default router;
