import { UserController } from './../controller/UserController';
import { Router } from 'express';
import {Request, Response} from 'express';
import { messageMidd} from '../middlewares/user.middleware';

const route: Router = Router();

route.post('/message', messageMidd, UserController.envoyer_message)

export { route as UserRoute }