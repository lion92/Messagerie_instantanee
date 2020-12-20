import { MessageController } from '../controller/MessageController';
import { Router } from 'express';
import {Request, Response} from 'express';
import {envoyer_messageMidd} from '../middlewares/message.middleware';

const route: Router = Router();

route.post('/creer', envoyer_messageMidd, MessageController.envoyer_message)

export { route as MessageRoute }