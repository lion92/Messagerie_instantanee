import { AuthController } from '../controller/AuthController';
import { Router } from 'express';
import {Request, Response} from 'express';
import { loginMidd, registerMidd, authMidd } from '../middlewares/auth.middleware';

const route: Router = Router();

route.get('/', authMidd, (req: Request, res: Response) => {
    return res.end('<h1>You are logged</h1>')
})
route.post('/login', loginMidd, AuthController.login)
route.post('/register', registerMidd, AuthController.register)

export { route as AuthentificationRoute }