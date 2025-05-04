interface IUserJoin {
    socketId: string;
    username: string;
    room: string;
}

let users: IUserJoin[] = [];

// handle when a user joins (add to array)
export const userJoin = (socketId: string, username: string, room: string) => {
    const user = { socketId, username, room };
    users.push(user);
    return user;
}

// get current user
export const getCurrentUser = (socketId: string) => {
    return users.find(user => user.socketId === socketId);
}

// runs when client disconnects
export const userLeave = (socketId: string) => {
    const index = users.findIndex(user => user.socketId === socketId);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// get room users
export const getRoomUsers = (room: string) => {
    return users.filter(user => user.room === room);
}