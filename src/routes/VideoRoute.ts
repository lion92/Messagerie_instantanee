import { Router } from 'express';
import { VideoController } from '../controller/VideoController';
import { video } from '../middlewares/video.middleware';

const route: Router = Router();

route.post('/creer', video,  VideoController.creer_video)
export { route as VideoRoute }