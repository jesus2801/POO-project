import fileUtils from "../utils/file.utils";
import { User } from "../interfaces/db.interface";
import { db_path } from "../config/db.config";
import { v4 } from "uuid";

class UserModel {

    file_name: string;
    file_path: string;
    headers: string[];
    //create the file if it doesn't exist
    constructor() {
        this.file_name = "users.csv";
        this.file_path = db_path;
        this.headers = [
            "id",
            "name",
            "password"
        ];
        this.startFile(); 
    }

    //USE THROW FOR ERROR HANDLING
    //create the file
    private startFile(overwrite: boolean = false){
        fileUtils.createEmptyFile(this.file_name, this.file_path, this.headers, overwrite);
    }
    //this function returns the user information from a user id
    //@ts-ignore
    public async getUser(id: string): Promise<{exists: boolean, user: User}> {
        const user: User[]= await fileUtils.filter(
            this.file_path + this.file_name, 
            {id}, 
            false
        );
        return {exists: user.length > 0, user: user[0]};
    }

    //this function creates a user and returns it with the created id
    //@ts-ignore
    public async createUser(
        user: Omit<User, 
        "id">
    ): Promise<User> {
        const newUser: User = {
            ...user, 
            id: v4()
        };
        await fileUtils.append(
            [newUser], 
            this.file_path + this.file_name, 
            this.headers
        );
        return newUser;
    }

    //this functions updates a user and returns it with the updated information
    //@ts-ignore
    public async updateUser(
        user: Omit<User, "id">, id: string
    ): Promise<User> {
        const data = await fileUtils.filter(
            this.file_path + this.file_name, 
            {id}, 
            false
        );

        if(data.length > 0){
            const newUser: User = {...user, id};
            const newRows = await fileUtils.update(
                this.file_path + this.file_name, 
                "id",
                 id , 
                newUser
            );
            await fileUtils.create(
                this.file_path + this.file_name,
                newRows,
                this.headers
            );
            return newUser;
        }
        else throw new Error("User not found");
    }

    //this function deletes a user
    public async deleteUser(id: string): Promise<void> {
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

export default new UserModel();
