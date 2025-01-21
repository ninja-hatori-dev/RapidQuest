// src/controllers/task.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../utils/types';
import { TaskService } from '../services/task.service';

export class TaskController {
  static async getTasks(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tasks = await TaskService.getTasks(req.user!.id);
      res.json(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createTask(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      console.log(req.user!.id);
      const task = await TaskService.createTask(req.user!.id, title, description);
      res.status(201).json(task);
    } catch (err) {
      console.error('Error creating task:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateTask(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const task = await TaskService.updateTask(Number(id), req.user!.id, {
        title,
        description,
      });

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.json(task);
    } catch (err) {
      console.error('Error updating task:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async completeTask(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const task = await TaskService.completeTask(Number(id), req.user!.id);

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.json(task);
    } catch (err) {
      console.error('Error completing task:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}