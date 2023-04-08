import { Typography } from '@mui/material';
import Head from 'next/head';
import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket as SocketClient } from 'socket.io-client';

const SocketContext = createContext<SocketState>({} as SocketState);

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: SocketProviderProps) {

    const [connected, setConnected] = useState(false);

    useEffect(() => {
        let socket: SocketClient;

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


    const state = {
        connected,
    };

    return <SocketContext.Provider value={state}>
        {children}
    </SocketContext.Provider>;

}
