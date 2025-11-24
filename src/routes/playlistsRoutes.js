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

const router = Router();

router.get("/", getAllPlaylists);
router.get("/user/:userId", getPlaylistsByUserId);
router.get("/:id", getPlaylistById);
router.get("/:id/followers", getPlaylistFollowers);
router.post("/", createPlaylist);
router.put("/:id", updatePlaylistName);
router.delete("/:id", deletePlaylist);

export default router;
