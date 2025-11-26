import { Router } from "express";
import {
  createPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistById,
  getPlaylistFollowers,
  getPlaylistsByUserId,
  updatePlaylistName,
} from "../controllers/PlayListController.js";
import authenticate from "../middlewares/authenticate.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { ROLES } from "../models/rolesEnum.js";

const router = Router();

router.get("/", authenticate, authorizeRole([ROLES.ADMIN]), getAllPlaylists);
router.get("/user/:userId", authenticate, authorizeRole([ROLES.ADMIN]), getPlaylistsByUserId);
router.get("/:id", authenticate, authorizeRole([ROLES.ADMIN]), getPlaylistById);
router.get("/:id/followers", authenticate, authorizeRole([ROLES.ADMIN, ROLES.USER]), getPlaylistFollowers);
router.post("/", authenticate, authorizeRole([ROLES.ADMIN, ROLES.USER]), createPlaylist);
router.put("/:id", authenticate, authorizeRole([ROLES.ADMIN]), updatePlaylistName);
router.delete("/:id", authenticate, authorizeRole([ROLES.ADMIN]), deletePlaylist);

export default router;
