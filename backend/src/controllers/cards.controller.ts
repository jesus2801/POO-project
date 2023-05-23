import { Request, Response } from "express";
import cardsModel from "../models/cards.model";
import { handleHttp } from "../utils/error.handle";
import { type } from "os";
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

  public async CreateCard(req: Request, res: Response) {
    try {
      const Card = await cardsModel.createCard(req.body);
      res.status(201).json(Card);
    } catch (e: any) {
      console.log(typeof Object.prototype.toString.call(res));
      res.status(400).send({ error: true, message: e.message });
    }
  }

  public async UpdateCard(req: Request, res: Response) {
    try {
      const { IdCard } = req.params;
      const newCard = await cardsModel.updateCard(req.body, IdCard);
      res.status(200).send(newCard);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

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
