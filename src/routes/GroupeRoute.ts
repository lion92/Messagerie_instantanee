import { AuthController } from '../controller/AuthController';
import { Router } from 'express';
import {Request, Response} from 'express';
import { loginMidd, registerMidd, authMidd} from '../middlewares/auth.middleware';
import { creer} from '../middlewares/creergroupe.middleware';
import { GroupeController } from '../controller/GroupeController';

const route: Router = Router();

route.post('/creer', creer,  GroupeController.creer_groupe)
export { route as GroupeRoute }