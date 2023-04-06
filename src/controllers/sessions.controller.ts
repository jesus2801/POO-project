import { Request, Response } from "express";
import sessionsModel from "../models/sessions.model";

class SessionsController {
  public async createSession(req: Request, res: Response) {
    try {
      const session = await sessionsModel.createSession(req.body) 
      res.status(201).send(session)
    } catch (e) {
      //error handling
    }
  }
}

export default new SessionsController();