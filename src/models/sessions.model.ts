import { db_path } from "../config/db.config";
import { Session } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import { v4 } from "uuid";

class SessionModel {
  file_name: string;
  file_path: string;
  headers: string[];

  //create the file if it doesn't exist
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

  private startFile(overwrite: boolean = false){
    fileUtils.createEmptyFile(this.file_name, this.file_path, this.headers, overwrite);
  }

  //USE THROW FOR ERROR HANDLING

  //this functions returns all sessions from a user id
  //@ts-ignore
  public async getUserSessions(userId: string): Promise<Session[]> {
    const sessions: Session[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { userId },
      false
    );
    return sessions;
  }

  //this function creates a session and returns it with the new setted values
  //@ts-ignore
  public async createSession(session: Omit<Session, "id">): Promise<Session> {
    const newSession: Session = { ...session, id: v4() };
    await fileUtils.append(
      [newSession],
      this.file_path + this.file_name,
      this.headers
    );
    return newSession;
  }

  //this function deletes a session
  public async deleteSession(id: string): Promise<void> {
    const data = await fileUtils.filter(
      this.file_path + this.file_name,
      { id },
      true
    );

    console.log(data)

    if (data.length > 0)
      await fileUtils.create(
        this.file_path + this.file_name,
        data,
        this.headers
      );
    else
        this.startFile(true);
  }
}

export default new SessionModel();
