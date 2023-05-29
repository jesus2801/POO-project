import { v4 } from "uuid";
import { db_path } from "../config/db.config";
import { Habit } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import Model from "./index.model";

class HabitModel extends Model {
  //create the file if it doesn't exist
  constructor() {
    super();
    this.file_name = "habits.csv";
    this.headers = ["name", "id", "userId", "fullfilled"];
    this.startFile();
  }

  //this functions returns all habits from a user id
  //@ts-ignore
  public async getUserhabits(userId: string): Promise<Habit[]> {
    const habits: Habit[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { userId },
      false
    );
    return habits.map((habit) => {
      return {
        ...habit,
        //@ts-ignore
        fullfilled: habit.fullfilled.split(",").map((h) => h === "true"),
      };
    });
  }

  //this function creates a habit and returns it with the new setted values
  //@ts-ignore
  public async createhabit(
    habit: Omit<Habit, "id" | "Fullfilled">
  ): Promise<Habit> {
    if (!habit || !habit.userId || !habit.name) {
      const error = new Error("Datos del usuario inválidos");
      (error as any).statusCode = 400;
      throw error;
    }
    const newHabit: Habit = {
      ...habit,
      id: v4(),
      fullfilled: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    };

    await fileUtils.append(
      [newHabit],
      this.file_path + this.file_name,
      this.headers
    );
    return newHabit;
  }

  //this function updates a habit and returns it with the new setted values
  //@ts-ignore
  public async updatehabit(
    habit: Omit<Habit, "name" | "id" | "userId">,
    id: string
  ): Promise<Habit> {
    const habits: Habit[] = await fileUtils.filter(
      this.file_path + this.file_name,
      { id },
      false
    );
    const newHabit: Habit = {
      ...habit,
      id: id,
      userId: habits[0].userId,
      name: habits[0].name,
    };

    const newRows = await fileUtils.update(
      this.file_path + this.file_name,
      "id",
      id,
      newHabit
    );

    await fileUtils.create(
      this.file_path + this.file_name,
      newRows,
      this.headers
    );

    return newHabit;
  }
}

export default new HabitModel();
