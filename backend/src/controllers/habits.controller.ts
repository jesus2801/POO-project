import { Request, Response } from "express";
import habitsModel from "../models/habits.model";
import { handleHttp } from "../utils/error.handle";

class HabitController {
  public async GetUserHabits(req: Request, res: Response) {
    try {
      const userHabits = await habitsModel.getUserhabits(req.body.user.id);
      res.status(200).send(userHabits);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  public async CreateHabit(req: Request, res: Response) {
    try {
      const habit = await habitsModel.createhabit({
        ...req.body,
        userId: req.body.user.id,
      });
      res.status(201).send(habit);
    } catch (e: any) {
      res.status(400).send({ error: true, message: e.message });
    }
  }

  public async UpdateHabit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const habit = await habitsModel.updatehabit(req.body, id);
      res.status(200).send(habit);
    } catch (e: any) {
      res.status(400).send({ error: true, message: e.message });
    }
  }

  public async DeleteHabit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await habitsModel.deleteRegister(id);
      return res.status(200).send({ error: false });
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
}

export default new HabitController();
