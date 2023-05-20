import { v4 } from "uuid";
import { db_path } from "../config/db.config";
import { Goal } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";

class GoalModel {
  file_name: string;
  file_path: string;
  headers: string[] = ["id", "userId", "title", "description", "done"];

  //create the file if it doesn't exist
  constructor() {
    this.file_name = "goals.csv";
    this.file_path = db_path;
    this.startFile();
  }
  private startFile(overwrite: boolean = false) {
    fileUtils.createEmptyFile(
      this.file_name,
      this.file_path,
      this.headers,
      overwrite
    );
  }  

  //USE THROW FOR ERROR HANDLING

  //this functions returns all goals from a user id
  //@ts-ignore
  public async getUserGoals(userId: string): Promise<Goal[]> {
    const goals: Goal[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { userId },
      false
    );
    return goals;
  }

  //this function creates a goal and returns it with the new setted values
  //@ts-ignore
  public async createGoal(goal: Omit<Goal, "id" | "done">): Promise<Goal> {
    const newGoal: Goal = {
      ...goal,
      id: v4(),
      done: false,
    };
    await fileUtils.append([goal],
      this.file_path + this.file_name,
      this.headers);
    return newGoal;
  }

  //this function deletes a goal
  public async deleteGoal(id: string): Promise<void> {
    const data = await fileUtils.filter(
    this.file_path + this.file_name,
    { id },
    true
  );

  if (data.length > 0)
    await fileUtils.create(
      this.file_path + this.file_name,
      data,
      this.headers
    );
  else this.startFile(true);

  }
}

export default new GoalModel();
