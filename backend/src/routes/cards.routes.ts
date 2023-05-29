import { Router } from "express";
import cardsController from "../controllers/cards.controller";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get("/:iDDeck", checkJwt, cardsController.GetDeckCards);
router.post("/", checkJwt, cardsController.CreateCard);
router.put("/:IdCard", checkJwt, cardsController.UpdateCard);
router.delete("/:IdCard", checkJwt, cardsController.DeleteCard);

export { router };
