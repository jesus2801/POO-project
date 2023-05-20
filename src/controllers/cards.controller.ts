import { Request, Response } from "express";
import cardsModel from "../models/cards.model";
import { handleHttp } from "../utils/error.handle";
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
      res.status(201).send(Card);
    } catch (e: any) {
      handleHttp(res, e);
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
      await cardsModel.deleteCard(IdCard);
      return res.status(200).send({ error: false });
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
}

export default new CardController();
