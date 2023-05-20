import { Router } from "express";
import goalController from "../controllers/goals.controller";

const router = Router();

router.get("/:iDUser", goalController.GetUserGoals);
router.post("/", goalController.CreateGoal);
router.delete("/:IdGoal", goalController.DeleteGoal);

export { router };