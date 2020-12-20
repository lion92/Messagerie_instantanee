import { AuthController } from '../controller/AuthController';
import { Router } from 'express';
import {Request, Response} from 'express';
import { loginMidd, registerMidd, authMidd} from '../middlewares/auth.middleware';
import { asset} from '../middlewares/asset.middleware';
import { AssetController } from '../controller/AssetController';

const route: Router = Router();

route.post('/creer', asset,  AssetController.creer_asset)
export { route as ImageRoute }