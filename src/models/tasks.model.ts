import { db_path } from "../config/db.config";
import { Task } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import { v4 } from "uuid";

class TaskModel {
    file_name: string;
    file_path: string;
    headers: string[];
    overwrite: boolean

    //create the file if it doesn't exist
    constructor() {
        this.file_name = "tasks.csv";
        this.file_path = db_path;
        this.headers = [
            "id",
            "userId",
            "content",
            "category",
            "done",
            "date",
        
          ];
        
    }

    private startFile(overwrite: boolean = false){
        fileUtils.createEmptyFile(this.file_name, this.file_path, this.headers, overwrite);
      }

    //USE THROW FOR ERROR HANDLING

    //this functions returns all tasks from a user id
    //@ts-ignore
    public async getUserTasks(userId: number): Promise<Task[]> {
        //filters the tasks by userId
    const tasks: Task[] = await fileUtils.filter(
        this.file_path + this.file_name,
        { userId },
        false
      );
      return tasks;
    }

    //this function creates a task and returns it with the new setted values
    //@ts-ignore
    public async createTask(task: Omit<Task, "id" | "done">): Promise<Task> {
        //creates the new session with a unique id
    const newTask: Task = {
        ...task, id: v4(),
        done: false
    };
    //append the new sessions to the csv
    await fileUtils.append(
      [newTask],
      this.file_path + this.file_name,
      this.headers
    );
    return newTask;
    }

    //this function updates a task and returns it with the new setted values
    //@ts-ignore
    public async updateTask(task: Omit<Task, "id" | "userId" | "date">): Promise<Task> {}

    //this function deletes a task
    public async deleteTask(id: number): Promise<void> {}
}

export default new TaskModel();