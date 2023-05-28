import { Request, Response } from "express";
import sessionsModel from "../models/sessions.model";
import { handleHttp } from "../utils/error.handle";

/**
 * @class SessionsController
 * @description this class is the controller for the sessions route
 * @public
 */
class SessionsController {
  /**
   * @description this function is the controller for the create session route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
   */
  public async createSession(req: Request, res: Response) {
    try {
      const session = await sessionsModel.createSession({
        ...req.body,
        userId: req.body.user.id,
      });
      res.status(201).send(session);
    } catch (e: any) {
      res.status(400).send({ error: true, message: e.message });
    }
  }

  /**
   * @description this function is the controller for the get user sessions route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
     */
  public async getUserSessions(req: Request, res: Response) {
    try {
      const sessions = await sessionsModel.getUserSessions(req.body.user.id);
      res.status(200).send(sessions);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
  /**
   * @description this function is the controller for the delete session route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */


  public async deleteSession(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await sessionsModel.deleteRegister(id);
      return res.status(200).send({ error: false });
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
}

export default new SessionsController();
