import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../models/db';
import { User } from '../models/types';

interface AuthResponse {
  user: Partial<User>;
  token: string;
}

export class AuthService {
  static async createUser(email: string, password: string): Promise<Partial<User>> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query<User>(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );
    return result.rows[0];
  }

  static async validateUser(email: string, password: string): Promise<AuthResponse> {
    const result = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', {
      expiresIn: '24h',
    });

    return {
      user: {
        id: user.id,
        email: user.email
      },
      token
    };
  }

  static async getUserById(id: number): Promise<User | null> {
    const result = await pool.query<User>('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }
}