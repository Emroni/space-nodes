import { Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function Home() {

    const [connected, setConnected] = useState(false);

    useEffect(() => {
        let socket: Socket;

        fetch('/api/server').then(() => {
            socket = io(`${window.location.hostname}:${process.env.NEXT_PUBLIC_SOCKET_PORT}`, {
                transports: ['websocket'],
            });

            socket.on('connect', () => {
                setConnected(true);
            });

            socket.on('disconnect', () => {
                setConnected(false);
            });
        });

        return () => {
            socket?.disconnect();
        };
    }, [])

    return <>
        <Head>
            <title>Space Nodes</title>
        </Head>
        <Typography align="center" color="primary" component="h1" fontSize={40} textTransform="uppercase">
            Space Nodes
        </Typography>
        {!connected && (
            <Typography align="center">
                Connecting
            </Typography>
        )}
    </>;

}
