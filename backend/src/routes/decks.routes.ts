import { Router } from "express";
import decksController from "../controllers/decks.controller";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.post("/", checkJwt, decksController.createDeck);
router.get("/:userId", checkJwt, decksController.getDecks);
router.put("/:id", checkJwt, decksController.updateDeck);
router.delete("/:id", checkJwt, decksController.deleteDeck);

export { router };
