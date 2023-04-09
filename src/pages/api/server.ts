import { NextApiRequest, NextApiResponse } from 'next';
import { Server, Socket } from 'socket.io';

let io: Server;
const bullets: any[] = [];
const displays: Socket[] = [];
const players: any = {};

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    if (!io) {
        // Create server
        io = new Server((res.socket as any).server);
        if (process.env.NEXT_PUBLIC_SOCKET_PORT) {
            io.listen(parseInt(process.env.NEXT_PUBLIC_SOCKET_PORT));
            console.log(`Server listening on port ${process.env.NEXT_PUBLIC_SOCKET_PORT}`);
        }

        // Add listeners
        io.on('connection', socket => {
            socket.on('disconnect', () => disconnect(socket));
            socket.on('displayConnect', () => displayConnect(socket));
            socket.on('playerConnect', () => playerConnect(socket));
            socket.on('playerMove', (data: any) => playerMove(socket, data));
            socket.on('playerShoot', (data: any) => playerShoot(socket, data));
        });

        // Set timer
        setInterval(tick, 1000 / 30);
    }

    res.end();
};

function disconnect(socket: Socket) {
    // Remove player
    if (players[socket.id]) {
        console.log(`Player ${socket.id} disconnected`);
        delete players[socket.id];
        return;
    }

    // Remove display
    const displayIndex = displays.indexOf(socket);
    if (displayIndex !== -1) {
        console.log(`Display ${socket.id} disconnected`);
        displays.splice(displayIndex, 1);
    }
}

function displayConnect(socket: Socket) {
    console.log(`Display ${socket.id} connected`);
    displays.push(socket);
    tick();
}

function playerConnect(socket: Socket) {
    console.log(`Player ${socket.id} connected`);
    players[socket.id] = {
        angle: 0,
        id: socket.id,
        x: 0.5,
        y: 0.5,
    };
    socket.emit('playerConnected');
}

function playerMove(socket: Socket, data: any) {
    const player = players[socket.id];
    player.angle = data.angle;
    player.x = data.x;
    player.y = data.y;
}

function playerShoot(socket: Socket, data: any) {
    bullets.push({
        ...data,
        playerId: socket.id,
    });
}

function tick() {
    // Update bullets
    bullets.forEach(bullet => {
        bullet.x += bullet.velocityX;
        bullet.y += bullet.velocityY;
    });

    // Push to displays
    displays.forEach(socket => {
        socket.emit('displayTick', {
            bullets,
            players,
        });
    });
}