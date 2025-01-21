# Project Setup Instructions


## Server Setup

1.Navigate to the server directory:

cd server
2. npm i
3. Create a .env file in the src directory with the following content:

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=spendsmart_db

PORT=5431
JWT_SECRET=secretkey
NODE_ENV=production

4.ts-node app.ts

## Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
2. npm i
3. Create a .env file in the client directory and add the following content:

NEXT_PUBLIC_API_URL=http://localhost:5431
4. npm run dev
