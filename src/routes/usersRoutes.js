import express from "express";
import userController from "../container/container.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/me", authenticate, userController.me);
router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/search", userController.searchUsers);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
