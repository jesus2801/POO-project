import { Router } from "express";
import goalController from "../controllers/goals.controller";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get("/:userId", checkJwt, goalController.GetUserGoals);
router.post("/", checkJwt, goalController.CreateGoal);
router.delete("/:id", checkJwt, goalController.DeleteGoal);

export { router };
