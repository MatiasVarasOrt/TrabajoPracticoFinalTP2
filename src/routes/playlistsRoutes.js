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

const router = Router();

router.get("/", authenticate, getAllPlaylists);
router.get("/user/:userId", authenticate, getPlaylistsByUserId);
router.get("/:id", authenticate, getPlaylistById);
router.get("/:id/followers", authenticate, getPlaylistFollowers);
router.post("/", authenticate, createPlaylist);
router.put("/:id", authenticate, updatePlaylistName);
router.delete("/:id", authenticate, deletePlaylist);

export default router;
