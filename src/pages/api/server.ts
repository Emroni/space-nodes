import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

let io: Server;

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    if (!io) {
        io = new Server((res.socket as any).server);

        io.on('connection', socket => {
            console.log(`Socket ${socket.id} connected`);

            socket.on('disconnect', () => {
                console.log(`Socket ${socket.id} connected`);
            });

            socket.on('player.angle', angle => {
                console.log(`Angle ${socket.id} ${angle}`);
            });

            socket.on('player.position', ({ x, y }) => {
                console.log(`Position ${socket.id} ${x}, ${y}`);
            });
        });

        if (process.env.NEXT_PUBLIC_SOCKET_PORT) {
            io.listen(parseInt(process.env.NEXT_PUBLIC_SOCKET_PORT));
            console.log(`Server listening on port ${process.env.NEXT_PUBLIC_SOCKET_PORT}`);
        }
    }

    res.end();
};
