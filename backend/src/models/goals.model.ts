import { v4 } from "uuid";
import { db_path } from "../config/db.config";
import { Goal } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import Model from "./index.model";

class GoalModel extends Model {
  //create the file if it doesn't exist
  constructor() {
    super();
    this.file_name = "goals.csv";
    this.headers = ["id", "userId", "title", "description", "done"];
    this.startFile();
  }

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

    await fileUtils.append(
      [newGoal],
      this.file_path + this.file_name,
      this.headers
    );
    return newGoal;
  }
}

export default new GoalModel();
