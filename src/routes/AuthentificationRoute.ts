import { AuthController } from '../controller/AuthController';
import { Router } from 'express';
import {Request, Response} from 'express';
import { loginMidd, registerMidd, authMidd , messageMidd} from '../middlewares/auth.middleware';

const route: Router = Router();

route.get('/', authMidd, (req: Request, res: Response) => {
    return res.end('<h1>You are logged</h1>')
})
route.post('/login', loginMidd, AuthController.login)
route.post('/register', registerMidd, AuthController.register)
//route.post('/conversation', converMidd, AuthController.conversation)
route.post('/message', messageMidd, AuthController.message)

export { route as AuthentificationRoute }