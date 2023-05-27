import { Router } from "express";
import tasksController from "../controllers/tasks.controller";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.post("/", checkJwt, tasksController.createTask);
router.get("/", checkJwt, tasksController.getTasks);
router.put("/:id", checkJwt, tasksController.updateTask);
router.delete("/:id", checkJwt, tasksController.deleteTask);

export { router };
