import request from 'supertest';
import app from '../app';
import { pool } from '../models/db';

describe('Auth Routes', () => {
  beforeAll(async () => {
    // Clear test database
    await pool.query('DELETE FROM users');
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /auth/signup', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'Test123!@#',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.email).toBe('test@example.com');
    });

    it('should reject invalid email', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({
          email: 'invalid-email',
          password: 'Test123!@#',
        });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /auth/signin', () => {
    it('should login existing user', async () => {
      const res = await request(app)
        .post('/auth/signin')
        .send({
          email: 'test@example.com',
          password: 'Test123!@#',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });
});