import { Request, Response } from "express";
import cardsModel from "../models/cards.model";
import { handleHttp } from "../utils/error.handle";
import { isEmpty } from "../utils/validation.utils";

/**
 * 
 * @class CardController
 * @description this class is the controller for the cards route
 */
class CardController {
  public async GetDeck(req: Request, res: Response) {
    try {
      const { iDDeck } = req.params;
      const DeckCards = await cardsModel.getDeckCards(iDDeck);
      res.status(200).send(DeckCards);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  /**
   * this function is the controller for the create card route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async CreateCard(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ["userId", "deckId","front", "back" ])) {
        return res.status(400).send({ error: true, message: "Missing required fields" });
      }
      const Card = await cardsModel.createCard(req.body);
      res.status(201).json(Card);
    } catch (e: any) {
      console.log(typeof Object.prototype.toString.call(res));
      res.status(400).send({ error: true, message: e.message });
    }
  }

  /**
   * this function is the controller for the update card route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async UpdateCard(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ["userId", "deckId","front", "back" ])) {
        return res.status(500).send({ error: true, message: "No existe" });
      }
      const { IdCard } = req.params;
      const newCard = await cardsModel.updateCard(req.body, IdCard);
      res.status(200).send(newCard);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  /**
   * this function is the controller for the delete card route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async DeleteCard(req: Request, res: Response) {
    try {
      const { IdCard } = req.params;
      await cardsModel.deleteRegister(IdCard);
      return res.status(200).send({ error: false });
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
}

export default new CardController();
