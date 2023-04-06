import { Request, Response } from "express";
import sessionsModel from "../models/sessions.model";

class SessionsController {
  public async createSession(req: Request, res: Response) {
    try {
      const session = await sessionsModel.createSession(req.body);
      res.status(201).send(session);
    } catch (e) {
      //error handling
    }
  }

  public async getUserSessions(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const sessions = await sessionsModel.getUserSessions(id);
      res.status(200).send(sessions);
    } catch (e) {
      //error handling
    }
  }

  public async deleteSession(req: Request, res: Response) {
    try{
      const { id } = req.params 
      await sessionsModel.deleteSession(id)
      return res.status(200).send({error: false})
    }catch {
      //error handling
    }
  }
}

export default new SessionsController();
