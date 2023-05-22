import { Router } from "express";
import goalController from "../controllers/goals.controller";

const router = Router();

router.get("/:userId", goalController.GetUserGoals);
router.post("/", goalController.CreateGoal);
router.delete("/:id", goalController.DeleteGoal);

export { router };
