import express from 'express';
import { initializeDatabase } from './models/db';
import { errorHandler, notFoundHandler } from './middlewares/error';
import authRoutes from './routes/auth';
import taskRoutes from './routes/task';
import allRouteList from './routes/allRouteList';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors({ origin: 'http://localhost:3000' }));


// Middleware
app.use(express.json());

// Initialize database
initializeDatabase();

// Routes
app.use('/', allRouteList);
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Error handling - must be after all other middleware and routes
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;