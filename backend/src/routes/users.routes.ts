import { Router } from 'express';
import usersController from '../controllers/users.controller';

const router = Router();

router.post('/', usersController.createUser);
router.get('/:id', usersController.getUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

export { router };