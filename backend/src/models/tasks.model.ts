import { Task } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import { v4 } from "uuid";
import Model from "./index.model";

class TaskModel extends Model {
  //create the file if it doesn't exist
  constructor() {
    super();
    this.file_name = "tasks.csv";
    this.headers = ["id", "userId", "content", "category", "done", "date"];
    this.startFile();
  }

  //this functions returns all tasks from a user id
  //@ts-ignore
  public async getUserTasks(userId: string): Promise<Task[]> {
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
    //creates the new task with a unique id
    const newTask: Task = {
      ...task,
      id: v4(),
      done: false,
    };

    //appends the new task to the csv
    await fileUtils.append(
      [newTask],
      this.file_path + this.file_name,
      this.headers
    );
    return newTask;
  }

  //this function updates a task and returns it with the new setted values
  //@ts-ignore
  public async updateTask(
    task: Omit<Task, "id" | "userId">,
    id: string
  ): Promise<Task> {
    const tasks: Task[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { id },
      false
    );
    const newTask: Task = { ...task, id: id, userId: tasks[0].userId };

    const newRows = await fileUtils.update(
      this.file_path + this.file_name,
      "id",
      id,
      newTask
    );

    await fileUtils.create(
      this.file_path + this.file_name,
      newRows,
      this.headers
    );

    return newTask;
  }
}

export default new TaskModel();
