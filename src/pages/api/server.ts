import { NextApiRequest, NextApiResponse } from 'next';
import { Server, Socket } from 'socket.io';

let io: Server;
const players: any = {};

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    if (!io) {
        io = new Server((res.socket as any).server);

        io.on('connection', socket => {
            console.log(`User ${socket.id} connected`);

            socket.on('disconnect', () => disconnect(socket));
            socket.on('playerConnect', () => playerConnect(socket));
            socket.on('playerMove', (data: any) => playerMove(socket, data));
        });

        if (process.env.NEXT_PUBLIC_SOCKET_PORT) {
            io.listen(parseInt(process.env.NEXT_PUBLIC_SOCKET_PORT));
            console.log(`Server listening on port ${process.env.NEXT_PUBLIC_SOCKET_PORT}`);
        }
    }

    res.end();
};

function disconnect(socket: Socket) {
    if (players[socket.id]) {
        console.log(`Player ${socket.id} disconnected`);
        delete players[socket.id];

    } else {
        console.log(`User ${socket.id} disconnected`);
    }
}

function playerConnect(socket: Socket) {
    console.log(`Player ${socket.id} connected`);
    players[socket.id] = {
        angle: 0,
        x: 0,
        y: 0,
    };
}

function playerMove (socket: Socket, data: any) {
    console.log(`Player move ${socket.id} ${data.angle}, ${data.x}, ${data.y}`);
}