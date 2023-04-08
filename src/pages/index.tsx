import { useSocket } from '@/contexts/Socket/Socket';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';

export default function Home() {

    const socket = useSocket();

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
        <Box display="flex" gap={3} justifyContent="center" marginTop={5}>
            <Button href="/player" LinkComponent={NextLink}>
                Player
            </Button>
            <Button href="/display" LinkComponent={NextLink}>
                Display
            </Button>
        </Box>
    </>;

}
