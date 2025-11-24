import { Router } from "express";
import {
  createPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistById,
  getPlaylistsByUserId,
  updatePlaylistName,
} from "../controllers/PlayListController.js";

const router = Router();

router.get("/", getAllPlaylists);
router.get("/user/:userId", getPlaylistsByUserId);
router.get("/:id", getPlaylistById);
router.post("/", createPlaylist);
router.put("/:id", updatePlaylistName);
router.delete("/:id", deletePlaylist);

export default router;
