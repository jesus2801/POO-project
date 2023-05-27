import { Router } from "express";
import sessionsController from "../controllers/sessions.controller";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.post("/", checkJwt, sessionsController.createSession);
router.get("/", checkJwt, sessionsController.getUserSessions);
router.delete("/:id", checkJwt, sessionsController.deleteSession);

export { router };
