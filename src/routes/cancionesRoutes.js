import express from "express";
import { cancionController } from "../container/container.js";
import authenticate from "../middlewares/authenticate.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { ROLES } from "../models/rolesEnum.js";

const router = express.Router();

router.get(
  "/search",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  cancionController.searchCanciones
);
router.get(
  "/",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  cancionController.getAllCanciones
);
router.get(
  "/:id",
  authenticate,
  authorizeRole([ROLES.ADMIN, ROLES.USER]),
  cancionController.getCancionById
);
router.post(
  "/",
  authenticate,
  authorizeRole([ROLES.ADMIN]),
  cancionController.createCancion
);
router.put(
  "/:id",
  authenticate,
  authorizeRole([ROLES.ADMIN]),
  cancionController.updateCancion
);
router.delete(
  "/:id",
  authenticate,
  authorizeRole([ROLES.ADMIN]),
  cancionController.deleteCancion
);
export default router;
