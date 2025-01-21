export interface User {
    id: number;
    email: string;
    password: string;
    created_at: Date;
  }
  
  export interface Task {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    completed: boolean;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface JwtPayload {
    id: number;
    email: string;
  }