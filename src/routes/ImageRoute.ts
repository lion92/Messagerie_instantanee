import { Router } from 'express';
import { ImageController } from '../controller/ImageController';
import { image } from '../middlewares/image.middleware';

const route: Router = Router();

route.post('/creer', image,  ImageController.creer_image)
export { route as ImageRoute }