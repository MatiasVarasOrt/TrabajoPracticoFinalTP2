import express from "express";
import { userController } from "../container/container.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/me", authenticate, userController.me);
router.get("/search", authenticate, userController.searchUsers);
router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

export default router;
