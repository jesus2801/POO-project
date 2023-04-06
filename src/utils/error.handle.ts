import { Response } from "express"
import logger from "../config/logger";
const handleHttp = (res: Response, error: Error) => {
    res.status(500).send({ error });
    logger(error)
};
export { handleHttp };