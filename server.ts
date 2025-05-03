import express, { Express } from 'express';
import { Server as HttpServer, createServer } from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import { formatMessage } from './utils/messages';

dotenv.config();

const app: Express = express();
const server: HttpServer = createServer(app);
const io: Server = new Server(server);

// run when client connects to the server
io.on('connection', (socket: Socket) => {
    console.log('connected.');

    const botName: string = 'Socket Bot';

    // welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to the chat 💬.'));

    // broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    // listen for chat message
    socket.on('chatMessage', (msg: string) => {
        io.emit('message', formatMessage(`User`, msg));
    });

    // runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    })
});

const PORT: number = Number(process.env.DEFAULT_PORT) || 3004;

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));