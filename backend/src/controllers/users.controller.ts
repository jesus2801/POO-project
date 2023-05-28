import { Request, Response } from "express";
import usersModel from "../models/users.model";
import { handleHttp } from "../utils/error.handle";
import { isEmpty } from "../utils/validation.utils";

class UsersController {
  public async createUser(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ["name", "password"])) {
        return res.status(400).send({ error: true, message: "Missing required fields" });
      }
      const user = await usersModel.createUser(req.body);
      res.status(201).send(user);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  }

  public async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await usersModel.getUser(id);
      res.status(200).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      if (isEmpty(req.body, ["name", "password"])) {
        return res.status(500).send({ error: true, message: "Missing required fields" });
      }
      const { id } = req.params;
      const user = await usersModel.updateUser(req.body, id);
      res.status(200).send(user);
    } catch (e: any) {
      handleHttp(res, e);
    }
  }

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
