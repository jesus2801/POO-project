import { NextFunction, Request, Response } from "express";
import { RequestExt } from "../interfaces/db.interface";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwt = req.headers.authorization || "";
    const isUser = verifyToken(`${jwt}`) as { id: string };
    if (!isUser) {
      res.status(401);
      res.send("NO_TIENES_UN_JWT_VALIDO");
    } else {
      req.body.user = isUser;
      next();
    }
  } catch (e) {
    res.status(400);
    res.send("SESSION_NO_VALIDAD");
  }
};

export { checkJwt };
