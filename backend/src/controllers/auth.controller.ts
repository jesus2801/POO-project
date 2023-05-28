import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";


const registerCtrl = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body);
  if (responseUser === "ALREADY_USER") {
    res.status(401);
    res.send(responseUser);
  } else {
    res.send(responseUser);
  }
};

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
