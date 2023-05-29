import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import decksModel from "../models/decks.model";
import { isEmpty } from "../utils/validation.utils";

/**
   * @class DecksController
   * @description this class is the controller for the decks route
   * @public
   */
class DecksController {
  public async createDeck(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ["name", "userId"])) {
        return res.status(500).send({ error: true, message: "Missing required fields" });
      }
      const user = await decksModel.createDeck({
        ...req.body,
        userId: req.body.user.id,
      });
      res.status(201).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  /**
   * this function is the controller for the get decks route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */

  public async getDecks(req: Request, res: Response) {
    try {
      const user = await decksModel.getUserDecks(req.body.user.id);
      res.status(200).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  /**
   * this function is the controller for the update decks route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */

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

  /**
   * this function is the controller for the delete decks route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */

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
