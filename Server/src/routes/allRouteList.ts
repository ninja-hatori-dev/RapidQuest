import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TODO API',
    routes: {
      unprotected: {
        home: 'GET /',
        signup: 'POST /auth/signup',
        login: 'POST /auth/login',
      },
      protected: {
        profile: 'GET /auth/profile',
        logout: 'POST /auth/logout',
        todos: {
          list: 'GET /tasks',
          create: 'POST /tasks',
          get: 'GET /tasks/:id',
          update: 'PUT /tasks/:id',
          delete: 'DELETE /tasks/:id',
          complete: 'PATCH /tasks/:id/complete',
        },
      },
    },
  });
});

export default router;