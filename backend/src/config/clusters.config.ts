import { MasterConfig } from "../interfaces/db.interface";
import  logger  from "./logger";


class Master {
  private config: any;
  private  cluster: any;
  constructor(config: MasterConfig) {
    this.config = config || {};
    this.cluster = this.config.cluster;
  }

  levantarWorker() {
    const worker = this.cluster.fork();
    logger(`Worker ${worker.id} is running`);
  }

  levantarWorkerMuerto() {
    // Esperamos unos milisegundos para levantar de nuevo un worker
    setTimeout(() => {
      this.levantarWorker();
    }, 300);
  }
}

export default Master;
