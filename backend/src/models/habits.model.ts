import { v4 } from "uuid";
import { db_path } from "../config/db.config";
import { habit } from "../interfaces/db.interface";
import fileUtils from "../utils/file.utils";
import Model from "./index.model";

class habitModel extends Model {
    //create the file if it doesn't exist
    constructor() {
        super();
        this.file_name = "habits.csv";
        this.headers = ["name","id","userId","fullfilled"];
        this.startFile();
    }

    //this functions returns all habits from a user id
    //@ts-ignore
    public async getUserhabits(userId: string): Promise<habit[]> {
        const habits: habit[] = await fileUtils.filter(
            this.file_path + this.file_name,
            { userId },
            false
        );
        return habits;
    }

    //this function creates a habit and returns it with the new setted values
    //@ts-ignore
    public async createhabit(habit: Omit<habit,"id" | "Fullfilled">): Promise<habit> {
        if (!habit || !habit.userId || !habit.name) {
            const error = new Error("Datos del usuario inválidos");
            (error as any).statusCode = 400;
            throw error;
        }
        const newhabit: habit = {
            ...habit,
            id: v4(),
            fullfilled: [
                false,false,false,false,false,
                false,false,false,false,false,
                false,false,false,false,false,
                false,false,false,false,false,
                false,false,false,false,false,
                false,false,false,false,false,
                false,
            ],
        };

        await fileUtils.append(
            [newhabit],
            this.file_path + this.file_name,
            this.headers
        );
        return newhabit;
    }

    //this function updates a habit and returns it with the new setted values
    //@ts-ignore
    public async updatehabit(
        habit: Omit<habit, "id" | "userId">,
        id: string
    ): Promise<habit> {
        const habits: habit[] = await fileUtils.filter(
            this.file_path + this.file_name,
            { id },
            false
    );
    const newhabit: habit = { ...habit, id: id, userId: habits[0].userId };

    const newRows = await fileUtils.update(
        this.file_path + this.file_name,
        "id",
        id,
        newhabit,
    );

    await fileUtils.create(
        this.file_path + this.file_name,
        newRows,
        this.headers
    );
    return newhabit;
    }            
}

export default new habitModel();