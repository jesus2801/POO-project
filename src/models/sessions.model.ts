import { db_path } from "../config/db.config";
import { Session } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";

class SessionModel {
    file_name: string;
    file_path: string;

    //create the file if it doesn't exist
    constructor() {
        this.file_name = "sessions.csv";
        this.file_path = db_path;
        fileUtils.createEmptyFile(this.file_name, this.file_path)
    }

    //USE THROW FOR ERROR HANDLING

    //this functions returns all sessions from a user id
    //@ts-ignore
    public async getUserSessions(userId: number): Promise<Session[]> {}

    //this function creates a session and returns it with the new setted values
    //@ts-ignore
    public async createSession(session: Omit<Session, "id">): Promise<Session> {}

    //this function deletes a session
    public async deleteSession(id: number): Promise<void> {}
}

export default new SessionModel();