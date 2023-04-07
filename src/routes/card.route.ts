import { Router } from "express";
import cardsController from "../controllers/cards.controller";

const routerCard =Router()

routerCard.get("/:iDDeck", cardsController.GetDeck)
routerCard.post("/",cardsController.CreateCard)
routerCard.put("/:IdCard", cardsController.UpdateCard)
routerCard.delete("/:IdCard",cardsController.DeleteCard)

export{routerCard}