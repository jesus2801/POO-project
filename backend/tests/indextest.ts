import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "../src/routes";
import infoLogger from "../src/config/logger";
import { type } from "os";
const logger=infoLogger


var PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => logger(`Server is running at port: ${PORT}`));

export default app;