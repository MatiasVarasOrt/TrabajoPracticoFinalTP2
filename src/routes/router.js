import { Router } from "express";
import cancionesRoutes from "./cancionesRoutes.js";
import artistasRoutes from "./artistasRoutes.js";
import playlistsRoutes from "./playlistsRoutes.js";

const router = Router();

router.use("/canciones", cancionesRoutes);
router.use("/artistas", artistasRoutes);
router.use("/playlists", playlistsRoutes);

export default router;
