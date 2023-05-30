import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import tasksModel from "../models/tasks.model";
import { User } from "../interfaces/db.interface";
import { isEmpty } from "../utils/validation.utils";

/**
 * @class TasksController
 * @description this class is the controller for the tasks route
 */
class TasksController {
  /**
   * @description this function is the controller for the create task route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
   */
  public async createTask(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, [ "content", "category", "date"])) {
        return res.status(500).send({ error: true, message: "Missing required fields" });
      }
      const user = await tasksModel.createTask({
        ...req.body,
        userId: req.body.user.id,
      });
      res.status(201).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
  /**
   * @description this function is the controller for the get user tasks route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
   */

  public async getTasks(req: Request<{}, {}, { user: User }>, res: Response) {
    try {
      const user = await tasksModel.getUserTasks(req.body.user.id);
      res.status(200).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
  /**
   * @description this function is the controller for the update task route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
   */

  public async updateTask(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ["content", "category", "date"])) {
        return res.status(500).send({ error: true, message: "Missing required fields" });
      }
      const { id } = req.params;
      const user = await tasksModel.updateTask(req.body, id);
      res.status(200).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
  /**
   * @description this function is the controller for the delete task route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
   */

  public async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await tasksModel.deleteRegister(id);
      res.status(200).send({ error: false });
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
}

export default new TasksController();
