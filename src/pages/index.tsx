import { Box } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function Home() {

    const [status, setStatus] = useState('');

    useEffect(() => {
        let socket: Socket;
        setStatus('Fetching');

        fetch('/api/server').then(() => {
            setStatus('Connecting');

            socket = io(`${window.location.hostname}:${process.env.NEXT_PUBLIC_SOCKET_PORT}`, {
                transports: ['websocket'],
            });

            socket.on('connect', () => {
                setStatus('Connected to server');
            });

            socket.on('disconnect', () => {
                setStatus('Disconnected from server');
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
        <Box>
            {status}
        </Box>
    </>;

}
