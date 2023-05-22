import { Response } from "express"
import logger from "../config/logger";
const handleHttp = (res: Response, error: Error) => {;
    console.log(Object.prototype.toString.call(res))
    console.log(error)
    res.status(500).send({ error });
    logger(error)
};
export { handleHttp };
