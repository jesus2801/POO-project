import { Router } from "express";
import sessionsController from "../controllers/sessions.controller";

const router = Router();

router.post("/", sessionsController.createSession);

router.get("/:id", sessionsController.getUserSessions)

router.delete("/:id", sessionsController.deleteSession);

export { router };
