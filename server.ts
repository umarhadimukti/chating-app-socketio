import express, { Express } from 'express';
import { Server as HttpServer, createServer } from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import { formatMessage } from './utils/messages';
import { getRoomUsers, userJoin, userLeave } from './utils/users';

dotenv.config();

const app: Express = express();
const server: HttpServer = createServer(app);
const io: Server = new Server(server);

// run when client connects to the server
io.on('connection', (socket: Socket) => {

    const botName: string = 'Socket Bot';

    socket.on('join', ({ username, room }: { username: string; room: string }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to the chat 💬.'));

        // broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        socket.emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room),
        });

        console.log(getRoomUsers(user.room));

    });

    // listen for chat message
    socket.on('chatMessage', (msg: string) => {
        io.emit('message', formatMessage(`User`, msg));
    });

    // runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
        }
    })
});

const PORT: number = Number(process.env.DEFAULT_PORT) || 3004;

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));