import { db_path } from "../config/db.config";
import { Goal } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";

class GoalModel {
    file_name: string;
    file_path: string;

    //create the file if it doesn't exist
    constructor() {
        this.file_name = "goals.csv";
        this.file_path = db_path;
        fileUtils.createEmptyFile(this.file_name, this.file_path)
    }

    //USE THROW FOR ERROR HANDLING

    //this functions returns all goals from a user id
    //@ts-ignore
    public async getUserGoals(userId: number): Promise<Goal[]> {}

    //this function creates a goal and returns it with the new setted values
    //@ts-ignore
    public async createGoal(goal: Omit<Goal, "id" | "done">): Promise<Goal> {}

    //this function deletes a goal
    public async deleteGoal(id: number): Promise<void> {}
}

export default new GoalModel();