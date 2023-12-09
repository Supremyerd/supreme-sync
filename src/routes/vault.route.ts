import { Router } from 'express';
import uploadController from '../controllers/upload.persist';
import syncController from '../controllers/sync.retrieve';

const route = Router();


route.post('/vault/:name', uploadController);
route.patch('/vault/:name', syncController);

export default route;