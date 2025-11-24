import { Router } from "express";
import cancionesRoutes from "./cancionesRoutes.js";
import artistasRoutes from "./artistasRoutes.js";
import usersRoutes from "./usersRoutes.js";

const router = Router();

router.use("/canciones", cancionesRoutes);
router.use("/artistas", artistasRoutes);
router.use("/users", usersRoutes);

export default router;
