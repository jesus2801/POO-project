import { db_path } from "../config/db.config";
import { Session } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import { v4 } from "uuid";

//model for handling the session csv file
class SessionModel {
  //csv file information
  file_name: string;
  file_path: string;
  headers: string[];

  //create the file if it doesn't exist and set headers
  constructor() {
    this.file_name = "sessions.csv";
    this.file_path = db_path;
    this.headers = [
      "id",
      "userId",
      "duration",
      "reviewed_cards",
      "reached_goals",
      "initDate",
      "endDate",
    ];
    this.startFile();
  }

  //create the file
  private startFile(overwrite: boolean = false){
    fileUtils.createEmptyFile(this.file_name, this.file_path, this.headers, overwrite);
  }

  //this functions returns all sessions from a user id
  public async getUserSessions(userId: string): Promise<Session[]> {
    //filters the sessions by userId
    const sessions: Session[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { userId },
      false
    );
    return sessions;
  }

  //this function creates a session and returns it with the new setted values
  public async createSession(session: Omit<Session, "id">): Promise<Session> {
    //creates the new session with a unique id
    const newSession: Session = { ...session, id: v4() };
    //append the new sessions to the csv
    await fileUtils.append(
      [newSession],
      this.file_path + this.file_name,
      this.headers
    );
    return newSession;
  }

  //this function deletes a session
  public async deleteSession(id: string): Promise<void> {
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
    else
        //if there is only 1 column, we start the file as empty
        this.startFile(true);
  }
}

export default new SessionModel();
