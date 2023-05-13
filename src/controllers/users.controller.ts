import { Request, Response } from 'express';
import usersModel from '../models/users.model';
import { handleHttp } from '../utils/error.handle';

class UsersController {
    public async createUser(req: Request, res: Response) {
        try {
            const user = await usersModel.createUser(req.body);
            res.status(201).send(user);
        } catch (e:any) {
            handleHttp(res,e);
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await usersModel.getUser(id);
            res.status(200).send(user);
        } catch (e:any) {
            handleHttp(res,e);
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await usersModel.updateUser(req.body, id);
            res.status(200).send(user);
        } catch (e:any) {
            handleHttp(res,e);
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await usersModel.deleteUser(id);
            res.status(200).send({ error: false });
        } catch (e:any) {
            handleHttp(res,e);
        }
    }
}

export default new UsersController();