import { existsSync, writeFileSync, createWriteStream } from "fs";
import { join } from "path";
import logger from "../config/logger";
import { FormatterOptionsArgs, Row, writeToStream } from "@fast-csv/format";
import { csvOptions } from "../config/db.config";
import { parse } from "fast-csv";
import { createReadStream } from "fs";

class FileUtils {
  private readonly writeOpts: FormatterOptionsArgs<Row, Row>;

  constructor() {
    this.writeOpts = { includeEndRowDelimiter: true, delimiter: ";" };
  }

  //create a file
  public async createEmptyFile(
    file_name: string,
    file_path: string,
    headers: string[],
    overwrite: boolean
  ) {
    //get the file path
    const path = join(file_path, file_name);

    //check if the file exists
    if (!existsSync(path) || (existsSync(path) && overwrite)) {
      //create the file
      try {
        writeFileSync(path, headers.join(";") + "\n");
        logger(`File ${file_name} created at ${file_path}`);
      } catch {
        logger(`There was an error creating ${file_name} at ${file_path}`);
      }
    }
  }

  private write(
    stream: NodeJS.WritableStream,
    rows: Row[],
    options: FormatterOptionsArgs<Row, Row>
  ): Promise<void> {
    return new Promise((res, rej) => {
      writeToStream(stream, rows, options)
        .on("error", (err: Error) => rej(err))
        .on("finish", () => res());
    });
  }

  public create(path: string, rows: Row[], headers: string[]): Promise<void> {
    return this.write(createWriteStream(path), rows, {
      ...this.writeOpts,
      headers,
    });
  }

  public append(rows: Row[], path: string, headers: string[]): Promise<void> {
    return this.write(createWriteStream(path, { flags: "a" }), rows, {
      ...this.writeOpts,
      // dont write the headers when appending
      writeHeaders: false,
      headers,
    } as FormatterOptionsArgs<Row, Row>);
  }

  public filter(path: string, filters: any, inverse: boolean): Promise<any[]> {
    const rows: any[] = [];

    return new Promise((res, rej) => {
      createReadStream(path)
        .pipe(parse(csvOptions))
        .on("error", (err) => {
          rej(new Error("unexpected error"));
        })
        .on("data", (data) => {
          let correct = true;
          for (let filter in filters)
            if (data[filter] != filters[filter]) correct = false;

          if ((correct && !inverse) || (!correct && inverse)) rows.push(data);
        })
        .on("end", () => {
          res(rows);
        });
    });
  }

  public update(
    path: string,
    filter: string,
    value: string,
    newRow: any
  ): Promise<any[]> {
    const rows: any[] = [];

    return new Promise((res, rej) => {
      createReadStream(path)
        .pipe(parse(csvOptions))
        .on("error", (err) => {
          rej(new Error("unexpected error"));
        })
        .on("data", (data) => {
          if (data[filter] == value) {
            rows.push(newRow);
          } else {
            rows.push(data);
          }

        })
        .on("end", () => {
          res(rows);
        });
    });
  }
}

export default new FileUtils();
