import { join } from "path";

//database path
export const db_path: string = join(
  __dirname,
  process.env.NODE_ENV === "production" ? "../../../db/" : "../../db/"
);

//fast-csv configuration
export const csvOptions = {
  objectMode: true,
  delimiter: ";",
  quote: null,
  headers: true,
  renameHeaders: false,
};
