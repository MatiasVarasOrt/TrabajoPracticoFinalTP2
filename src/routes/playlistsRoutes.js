import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { ROLES } from "../models/rolesEnum.js";
import { playlistController } from "../container/container.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRole([ROLES.ADMIN]),
  playlistController.getAllPlaylists
);
router.get(
  "/user/:userId",
  authenticate,
  authorizeRole([ROLES.ADMIN]),
  playlistController.getPlaylistsByUserId
);
router.get(
  "/:id",
  authenticate,
  authorizeRole([ROLES.ADMIN]),
  playlistController.getPlaylistById
);
router.get(
  "/:id/followers",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  playlistController.getPlaylistFollowers
);
router.post(
  "/:id/follow",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  playlistController.followPlaylist
);
router.post(
  "/",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  playlistController.createPlaylist
);
router.put(
  "/:id",
  authenticate,
  authorizeRole([ROLES.ADMIN]),
  playlistController.updatePlaylistName
);
router.delete(
  "/:id",
  authenticate,
  authorizeRole([ROLES.ADMIN]),
  playlistController.deletePlaylist
);

router.post(
  "/:id/canciones",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  playlistController.addCancion
);

router.get(
  "/:id/canciones",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  playlistController.getCanciones
);

router.delete(
  "/:id/canciones/:cancionId",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  playlistController.removeCancion
);

router.get(
  "/:id/canciones/count",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  playlistController.getCancionesCount
);

export default router;
