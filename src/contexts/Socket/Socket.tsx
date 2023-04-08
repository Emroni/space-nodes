import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket as SocketClient } from 'socket.io-client';

let connecting = false;
let socket: SocketClient;

const SocketContext = createContext<SocketState>({} as SocketState);

export const useSocket = () => useContext(SocketContext);

export function withSocket(WrappedComponent: any) {
    return function SocketWrappedComponent(props: any) {
        return <SocketContext.Consumer>
            {state => (
                <WrappedComponent {...props} socket={state} />
            )}
        </SocketContext.Consumer>;
    }
}

export default function SocketProvider({ children }: SocketProviderProps) {

    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!connecting && !socket) {
            connecting = true;
            
            fetch('/api/server').then(() => {
                socket = io(`${window.location.hostname}:${process.env.NEXT_PUBLIC_SOCKET_PORT}`, {
                    transports: ['websocket'],
                });

                socket.on('connect', () => {
                    console.log('Connected', socket.id)
                    setConnected(true);
                });

                socket.on('disconnect', () => {
                    console.log('Disconnected', socket.id)
                    setConnected(false);
                });
            });
        }

        return () => {
            socket?.disconnect();
        };
    }, []);

    const state = {
        connected,
        emit: (type: string, data: any) => socket?.emit(type, data),
        on: (type: string, listener: SocketListener) => socket?.on(type, listener),
    };

    return <SocketContext.Provider value={state}>
        {children}
    </SocketContext.Provider>;

}
