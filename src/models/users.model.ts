import fileUtils from "../utils/file.utils";
import { User } from "../interfaces/db.interface";
import { db_path } from "../config/db.config";

class UserModel {
    file_name: string;
    file_path: string;

    //create the file if it doesn't exist
    constructor() {
        this.file_name = "users.csv";
        this.file_path = db_path;
        fileUtils.createEmptyFile(this.file_name, this.file_path)
    }

    //USE THROW FOR ERROR HANDLING

    //this function returns the user information from a user id
    //@ts-ignore
    public async getUser(id: string): Promise<User> {}

    //this function creates a user and returns it with the created id
    //@ts-ignore
    public async createUser(user: Omit<User, "id">): Promise<User> {}

    //this functions updates a user and returns it with the updated information
    //@ts-ignore
    public async updateUser(user: User): Promise<User> {}

    //this function deletes a user
    public async deleteUser(id: string): Promise<void> {}
}

export default new UserModel();