import { Router } from "express";
import cardsController from "../controllers/cards.controller";

const router = Router();

router.get("/:iDDeck", cardsController.GetDeck);
router.post("/", cardsController.CreateCard);
router.put("/:IdCard", cardsController.UpdateCard);
router.delete("/:IdCard", cardsController.DeleteCard);

export { router };
