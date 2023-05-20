import { Request, Response } from "express";
import goalsModel from "../models/goals.model";
import { handleHttp } from "../utils/error.handle";

class GoalController {
    public async GetUserGoals(req: Request, res: Response) {
        try {
        const { userId } = req.params;
        const userGoals = await goalsModel.getUserGoals(userId);
        res.status(200).send(userGoals);
        } catch (e: any) {
        handleHttp(res, e);
        }
    }
    
    public async CreateGoal(req: Request, res: Response) {
        try {
        const goal = await goalsModel.createGoal(req.body);
        res.status(201).send(goal);
        } catch (e: any) {
        handleHttp(res, e);
        }
    }
    
    public async DeleteGoal(req: Request, res: Response) {
        try {
        const { id } = req.params;
        await goalsModel.deleteGoal(id);
        return res.status(200).send({ error: false });
        } catch (e: any) {
        handleHttp(res, e);
        }
    }
    }

export default new GoalController();