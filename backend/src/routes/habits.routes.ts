import { Router } from "express";
import habitController  from "../controllers/habits.controller";

const router = Router();

router.get("/:userId", habitController.GetUserHabits);
router.post("/", habitController.CreateHabit);
router.put("/:id", habitController.UpdateHabit);
router.delete("/:id", habitController.DeleteHabit);

export { router };
