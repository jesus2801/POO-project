import { Response } from "express";
import logger from "../config/logger";
const handleHttp = (res: Response, error: Error) => {
  let status = 500;
  if ((error as any).statusCode) status = (error as any).statusCode;
  res.status(status).send({ error });
  logger(error);
};
export { handleHttp };
