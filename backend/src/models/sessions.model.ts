import { Session } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import { v4 } from "uuid";
import Model from "./index.model";

//model for handling the session csv file
class SessionModel extends Model {
  //create the file if it doesn't exist and set headers
  constructor() {
    super();
    this.file_name = "sessions.csv";
    this.headers = [
      "id",
      "userId",
      "duration",
      "reviewed_cards",
      "reached_goals",
      "initDate",
      "endDate",
    ];
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
}

export default new SessionModel();
