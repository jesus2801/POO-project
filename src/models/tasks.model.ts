import { db_path } from "../config/db.config";
import { Task } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";

class TaskModel {
    file_name: string;
    file_path: string;

    //create the file if it doesn't exist
    constructor() {
        this.file_name = "tasks.csv";
        this.file_path = db_path;
        fileUtils.createEmptyFile(this.file_name, this.file_path)
    }

    //USE THROW FOR ERROR HANDLING

    //this functions returns all tasks from a user id
    //@ts-ignore
    public async getUserTasks(userId: number): Promise<Task[]> {}

    //this function creates a task and returns it with the new setted values
    //@ts-ignore
    public async createTask(task: Omit<Task, "id" | "done">): Promise<Task> {}

    //this function updates a task and returns it with the new setted values
    //@ts-ignore
    public async updateTask(task: Omit<Task, "id" | "userId" | "date">): Promise<Task> {}

    //this function deletes a task
    public async deleteTask(id: number): Promise<void> {}
}

export default new TaskModel();