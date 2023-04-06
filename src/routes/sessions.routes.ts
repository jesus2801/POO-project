import { Router } from "express";
import sessionsController from "../controllers/sessions.controller";

const router = Router();

router.post("/", sessionsController.createSession);

export { router };
