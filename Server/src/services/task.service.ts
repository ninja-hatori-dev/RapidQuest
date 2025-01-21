// src/services/task.service.ts
import { pool } from '../models/db';
import { Task } from '../models/types';

export class TaskService {
  static async getTasks(userId: number): Promise<Task[]> {
    const result = await pool.query<Task>(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async createTask(
    userId: number,
    title: string,
    description?: string
  ): Promise<Task> {
    const result = await pool.query<Task>(
      'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, description]
    );
    return result.rows[0];
  }

  static async updateTask(
    taskId: number,
    userId: number,
    updates: Partial<Task>
  ): Promise<Task | null> {
    const result = await pool.query<Task>(
      `UPDATE tasks 
       SET title = COALESCE($1, title), 
           description = COALESCE($2, description),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [updates.title, updates.description, taskId, userId]
    );
    return result.rows[0] || null;
  }

  static async completeTask(taskId: number, userId: number): Promise<Task | null> {
    const result = await pool.query<Task>(
      `UPDATE tasks 
       SET completed = true,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [taskId, userId]
    );
    return result.rows[0] || null;
  }
}