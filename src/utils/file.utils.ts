import { existsSync, writeFileSync, createWriteStream } from "fs";
import { join } from "path";
import logger from "../config/logger";
import { FormatterOptionsArgs, Row, writeToStream } from "@fast-csv/format";
import { csvOptions } from "../config/db.config";
import { parse } from "fast-csv";
import { createReadStream } from "fs";

class FileUtils {
  //some write options
  private readonly writeOpts: FormatterOptionsArgs<Row, Row>;

  constructor() {
    //basic write options
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

    //create the file if it doesn't exist, or overwrite it if overwrite value is setted as true
    if (!existsSync(path) || (existsSync(path) && overwrite)) {
      //create the empty file (only with headers)
      try {
        writeFileSync(path, headers.join(";") + "\n");
        logger(`File ${file_name} created at ${file_path}`);
      } catch {
        logger(`There was an error creating ${file_name} at ${file_path}`);
      }
    }
  }

  //write stream with the rows and options
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

  //creates a new file with some data and headers
  public create(path: string, rows: Row[], headers: string[]): Promise<void> {
    return this.write(createWriteStream(path), rows, {
      ...this.writeOpts,
      //set the headers
      headers,
    });
  }

  //appends a row to the final of the csv
  public append(rows: Row[], path: string, headers: string[]): Promise<void> {
    return this.write(createWriteStream(path, { flags: "a" }), rows, {
      ...this.writeOpts,
      // dont write the headers when appending
      writeHeaders: false,
      headers,
    } as FormatterOptionsArgs<Row, Row>);
  }

  //filter data from csv
  //the filters are an object like this: {filter1: 'filterValue1'}
  //ex: {id: 'eskeikd039iiekd'}
  //if inverse is setted as true the function returns values that do not fit in the filters
  public filter(path: string, filters: any, inverse: boolean): Promise<any[]> {
    //data
    const rows: any[] = [];

    return new Promise((res, rej) => {
      createReadStream(path)
        .pipe(parse(csvOptions))
        .on("error", (err) => {
          rej(new Error("unexpected error"));
        })
        .on("data", (data) => {
          //check if the row matches the filters
          let correct = true;
          for (let filter in filters)
            if (data[filter] != filters[filter]) correct = false;

          //pushs the data according to inverse value
          if ((correct && !inverse) || (!correct && inverse)) rows.push(data);
        })
        .on("end", () => {
          //returns data
          res(rows);
        });
    });
  }

  //returns csv data with a row updated
  public update(
    path: string,
    filter: string,
    value: string,
    newRow: any
  ): Promise<any[]> {
    //data
    const rows: any[] = [];

    return new Promise((res, rej) => {
      createReadStream(path)
        .pipe(parse(csvOptions))
        .on("error", (err) => {
          rej(new Error("unexpected error"));
        })
        .on("data", (data) => {
          //check if the row matches the filter
          if (data[filter] == value) {
            rows.push(newRow);
          } else {
            rows.push(data);
          }
        })
        .on("end", () => {
          //returns data
          res(rows);
        });
    });
  }
}

export default new FileUtils();
