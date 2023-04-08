import { useSocket } from '@/contexts/Socket/Socket';
import { Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {

    const socket = useSocket();

    useEffect(() => {
        socket.on('disconnect', () => {
            console.log('Disconnected');
        });
    });

    return <>
        <Head>
            <title>Space Nodes</title>
        </Head>
        <Typography align="center" color="primary" component="h1" fontSize={40} textTransform="uppercase">
            Space Nodes
        </Typography>
        {!socket.connected && (
            <Typography align="center">
                Connecting
            </Typography>
        )}
    </>;

}
