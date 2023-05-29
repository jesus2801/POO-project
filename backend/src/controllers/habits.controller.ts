import { Request, Response } from 'express';
import habitsModel from '../models/habits.model';
import { handleHttp } from '../utils/error.handle';
import { isEmpty } from '../utils/validation.utils';

/**
   * @class HabitController
   * @description this class is the controller for the habits route
   */
class HabitController {
   /**
     * this function is the controller for the get habits route
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
  public async GetUserHabits(req: Request, res: Response) {
    try {
      const userHabits = await habitsModel.getUserhabits(req.body.user.id);
      res.status(200).send(userHabits);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

    /**
     * this function is the controller for the create habit route
     * @param {Request} req
     * @param  {Response} res
     * @returns {Promise<void>}
     * @public
     */
  public async CreateHabit(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ['name', 'userId'])) {
          return res.status(400).send({ error: true, message: 'Missing required fields' });
      }
      const habit = await habitsModel.createhabit({
        ...req.body,
        userId: req.body.user.id,
      });
      res.status(201).send(habit);
    } catch (e: any) {
      res.status(400).send({ error: true, message: e.message });
    }
  }
    /**
     * this function is the controller for the update habit route
     * @param {Request} req
     * @param  {Response} res
     * @returns {Promise<void>}
     * @public
     */
  public async UpdateHabit(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ['name', 'userId'])) {
           return res.status(400).send({ error: true, message: 'Missing required fields' });
      }
      const { id } = req.params;
      const habit = await habitsModel.updatehabit(req.body, id);
      res.status(200).send(habit);
    } catch (e: any) {
      res.status(400).send({ error: true, message: e.message });
    }
  }

    /**
     * this function is the controller for the delete habit route
     * @param {Request} req
     * @param  {Response} res
     * @returns {Promise<void>}
     * @public
     */
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
