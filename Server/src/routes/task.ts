import { Router } from 'express';
import { TaskController } from '../controllers/task';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', TaskController.getTasks);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.patch('/:id/complete', TaskController.completeTask);

export default router;