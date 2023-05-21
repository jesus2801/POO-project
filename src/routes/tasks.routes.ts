import { Router } from "express";
import tasksController from "../controllers/tasks.controller";

const router = Router();

router.post("/", tasksController.createTask);
router.get("/:userId", tasksController.getTasks);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

export { router };
