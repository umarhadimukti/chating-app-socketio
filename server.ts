import express, { Express } from 'express';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const server: http.Server = http.createServer(app);

const PORT: number = Number(process.env.PORT) || 3000;

// built-in middleware
app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));