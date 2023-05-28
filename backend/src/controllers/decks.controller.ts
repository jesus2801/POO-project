import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import decksModel from "../models/decks.model";
import { isEmpty } from "../utils/validation.utils";

class DecksController {
  public async createDeck(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ["name", "userId"])) {
        return res.status(500).send({ error: true, message: "Missing required fields" });
      }
      const user = await decksModel.createDeck(req.body);
      res.status(201).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  public async getDecks(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await decksModel.getUserDecks(userId);
      res.status(200).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  public async updateDeck(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ["name", "userId"])) {
        return res.status(500).send({ error: true, message: "No exist" });
      }
      const { id } = req.params;
      const user = await decksModel.updateDeck(req.body, id);
      res.status(200).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  public async deleteDeck(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await decksModel.deleteRegister(id);
      res.status(200).send({ error: false });
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
}

export default new DecksController();
