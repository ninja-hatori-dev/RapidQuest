import { Request } from 'express';

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
}



export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}
