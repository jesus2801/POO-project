import fileUtils from "../utils/file.utils";
import { User } from "../interfaces/db.interface";
import { v4 } from "uuid";
import Model from "./index.model";

class UserModel extends Model {
  //create the file if it doesn't exist
  constructor() {
    super();
    this.file_name = "users.csv";
    this.headers = ["id", "name", "password"];
  }

  //this function returns the user information from a user id
  //@ts-ignore
  public async getUser(id: string): Promise<{ exists: boolean; user: User }> {
    const user: User[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { id },
      false
    );
    return { exists: user.length > 0, user: user[0] };
  }

  //this function creates a user and returns it with the created id
  //@ts-ignore
  public async createUser(user: Omit<User, "id">): Promise<User> {
    const newUser: User = {
      ...user,
      id: v4(),
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
  public async updateUser(user: Omit<User, "id">, id: string): Promise<User> {
    const data = await fileUtils.filter(
      this.file_path + this.file_name,
      { id },
      false
    );

    if (data.length > 0) {
      const newUser: User = { ...user, id };
      const newRows = await fileUtils.update(
        this.file_path + this.file_name,
        "id",
        id,
        newUser
      );
      await fileUtils.create(
        this.file_path + this.file_name,
        newRows,
        this.headers
      );
      return newUser;
    } else throw new Error("User not found");
  }
}

export default new UserModel();
