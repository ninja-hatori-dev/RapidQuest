  

  import { Pool } from 'pg';
  import dotenv from 'dotenv';


dotenv.config();


const pool = new Pool({
  user: process.env.POSTGRES_USER ,
  host: process.env.DB_HOST ,
  database: process.env.POSTGRES_DB ,
  password: process.env.POSTGRES_PASSWORD ,
  port: parseInt(process.env.PORT || '5432'), 
});
  export async function initializeDatabase(): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          title VARCHAR(255) NOT NULL,
          description TEXT,
          completed BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
  
      console.log('Database initialized successfully');
    } catch (err) {
      console.error('Error initializing database:', err);
    } finally {
      client.release();
    }
  }
  
  export { pool };