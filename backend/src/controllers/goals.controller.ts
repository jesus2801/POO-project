import { Request, Response } from "express";
import goalsModel from "../models/goals.model";
import { handleHttp } from "../utils/error.handle";

/**
   * @class GoalController
   * @description this class is the controller for the goals route
   */

class GoalController {
  public async GetUserGoals(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const userGoals = await goalsModel.getUserGoals(userId);
      res.status(200).send(userGoals);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  /**
   * this function is the controller for the create goal route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */

  public async CreateGoal(req: Request, res: Response) {
    try {
      const goal = await goalsModel.createGoal(req.body);
      res.status(201).send(goal);
    } catch (e: any) {
      res.status(400).send({ error: true, message: e.message });
    }
  }

  /**
   * this function is the controller for the delete goal route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */

  public async DeleteGoal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await goalsModel.deleteRegister(id);
      return res.status(200).send({ error: false });
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
}

export default new GoalController();
