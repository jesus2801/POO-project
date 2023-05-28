import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";

/**
 * this function is the controller for the register route
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */

const registerCtrl = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body);
  if (responseUser === "ALREADY_USER") {
    res.status(401);
    res.send(responseUser);
  } else {
    res.send(responseUser);
  }
};

/**
 * this function is the controller for the login route
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @public
 */

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { name, password } = body;
  const responseUser = await loginUser({ name, password });

  if (typeof responseUser === "string") {
    res.status(401);
    res.send(responseUser);
  } else {
    res.send(responseUser);
  }
};

export { loginCtrl, registerCtrl };
