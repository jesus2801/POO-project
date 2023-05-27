import { Router } from "express";
import usersController from "../controllers/users.controller";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.post("/", checkJwt, usersController.createUser);
router.get("/:id", checkJwt, usersController.getUser);
router.put("/:id", checkJwt, usersController.updateUser);
router.delete("/:id", checkJwt, usersController.deleteUser);

export { router };
