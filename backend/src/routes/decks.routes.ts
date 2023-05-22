import { Router } from "express";
import decksController from "../controllers/decks.controller";

const router = Router();

router.post("/", decksController.createDeck);
router.get("/:userId", decksController.getDecks);
router.put("/:id", decksController.updateDeck);
router.delete("/:id", decksController.deleteDeck);

export { router };
