import express from "express";
import { userController } from "../container/container.js";
import authenticate from "../middlewares/authenticate.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { ROLES } from "../models/rolesEnum.js";

const router = express.Router();

router.post("/register", authenticate, authorizeRole([ROLES.ADMIN]), userController.createUser);
router.post("/login", userController.login);
router.get("/me", authenticate, authorizeRole([ROLES.ADMIN, ROLES.USER]), userController.me);
router.get("/search", authenticate, authorizeRole([ROLES.ADMIN]), userController.searchUsers);
router.get("/", authenticate, authorizeRole([ROLES.ADMIN]), userController.getAllUsers);
router.get("/:id", authenticate, authorizeRole([ROLES.ADMIN]), userController.getUserById);
router.put("/:id", authenticate, authorizeRole([ROLES.ADMIN]), userController.updateUser);
router.delete("/:id", authenticate, authorizeRole([ROLES.ADMIN]), userController.deleteUser);

export default router;
