import { Request, Response } from "express";
import usersModel from "../models/users.model";
import { handleHttp } from "../utils/error.handle";

/**
 * @class UsersController
 * @description this class is the controller for the users route
 * 
 */
class UsersController {
  /**
   * @description this function is the controller for the create user route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
   */
  public async createUser(req: Request, res: Response) {
    try {
      const user = await usersModel.createUser(req.body);
      res.status(201).send(user);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  }
  /**
   * @description this function is the controller for the get user route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
   */

  public async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await usersModel.getUser(id);
      res.status(200).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  /**
   * @description this function is the controller for the update user route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
   */

  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await usersModel.updateUser(req.body, id);
      res.status(200).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
  /**
   * @description this function is the controller for the delete user route
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * 
   */
  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await usersModel.deleteRegister(id);
      res.status(200).send({ error: false });
    } catch (e: any) {
      handleHttp(res, e);
    }
  }
}

export default new UsersController();
