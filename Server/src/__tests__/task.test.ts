import request from 'supertest';
import app from '../app';
import { pool } from '../models/db';

describe('Task Routes', () => {
  let authToken: string;

  beforeAll(async () => {
    // Get auth token
    const res = await request(app)
      .post('/auth/signin')
      .send({
        email: 'test@example.com',
        password: 'Test123!@#',
      });

    authToken = res.body.token;
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Task',
          description: 'Test Description',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Test Task');
    });
  });
});