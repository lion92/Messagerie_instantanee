import { AuthController } from '../controller/AuthController';
import { Router } from 'express';
import {Request, Response} from 'express';
import { loginMidd, registerMidd, authMidd, groupe3} from '../middlewares/auth.middleware';
import { GroupeController } from '../controller/GroupeController';

const route: Router = Router();

route.get('/', authMidd, (req: Request, res: Response) => {
    return res.end('<h1>You are logged</h1>')
})
route.post('/login', loginMidd, AuthController.login)
route.post('/register', registerMidd, AuthController.register)


route.post('/groupe', groupe3,  GroupeController.creer_groupe)
export { route as AuthentificationRoute }