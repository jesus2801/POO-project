import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import cluster from "cluster";
import os from "os";
import Master from "./config/clusters.config";
import infoLogger from "./config/logger";
import logger2 from "./config/logger2";
const cpusLength = os.cpus().length;
const logger=infoLogger

if (cluster.isPrimary) {
    const master = new Master({ cluster: cluster });
  
    for (let i = 0; i < cpusLength; i++) master.levantarWorker();
  
    cluster.on('exit', worker => {
      logger2(`Cluster number: ${worker.id} is dead`);
  
      master.levantarWorkerMuerto();
    });
  } else {
    const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => logger(`Server is running at port: ${PORT}`));



      }
    







