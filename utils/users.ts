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