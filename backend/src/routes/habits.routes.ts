import { Router } from "express";
import habitController from "../controllers/habits.controller";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get("/:userId", checkJwt, habitController.GetUserHabits);
router.post("/", checkJwt, habitController.CreateHabit);
router.put("/:id", checkJwt, habitController.UpdateHabit);
router.delete("/:id", checkJwt, habitController.DeleteHabit);

export { router };
