interface IUserJoin {
    socketId: string;
    username: string;
    room: string;
}

let users: IUserJoin[] = [];

export const userJoin = (socketId: string, username: string, room: string) => {
    const user = { socketId, username, room };
    users.push(user);
    return user;
}

export const getCurrentUser = (socketId: string) => {
    return users.find(user => user.socketId === socketId);
}

export const userLeave = (socketId: string) => {
    const index = users.findIndex(user => user.socketId === socketId);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

export const getRoomUsers = (room: string) => {
    return users.filter(user => user.room === room);
}