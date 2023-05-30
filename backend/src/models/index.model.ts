import { db_path } from "../config/db.config";
import fileUtils from "../utils/file.utils";

class Model {
  //csv file information
  file_name: string;
  file_path: string;
  headers: string[];

  constructor() {
    this.file_path = db_path;
    this.file_name = "";
    this.headers = [];
  }

  //create the file
  protected startFile(overwrite: boolean = false) {
    fileUtils.createEmptyFile(
      this.file_name,
      this.file_path,
      this.headers,
      overwrite
    );
  }

  //this function deletes a session
  public async deleteRegister(id: string): Promise<void> {
    //gets all the sessions without the session we want to delete
    const data = await fileUtils.filter(
      this.file_path + this.file_name,
      { id },
      true
    );

    //rewrites the file with the new data
    if (data.length > 0)
      //if there are more than 1 column, we rewrite the file
      await fileUtils.create(
        this.file_path + this.file_name,
        data,
        this.headers
      );
    //if there is only 1 column, we start the file as empty
    else this.startFile(true);
  }
}

export default Model;
