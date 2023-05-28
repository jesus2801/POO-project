import { Request, Response } from "express";
import sessionsModel from "../models/sessions.model";
import { handleHttp } from "../utils/error.handle";
import { isEmpty } from "../utils/validation.utils";

class SessionsController {
  public async createSession(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ["userId", "initDate", "endDate"] )) {
        return res.status(400).send({ error: true, message: "Missing required fields" });
      }
      const session = await sessionsModel.createSession({
        ...req.body,
        userId: req.body.user.id,
      });
      res.status(201).send(session);
    } catch (e: any) {
      res.status(400).send({ error: true, message: e.message });
    }
  }

  public async getUserSessions(req: Request, res: Response) {
    try {
      const sessions = await sessionsModel.getUserSessions(req.body.user.id);
      res.status(200).send(sessions);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

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
