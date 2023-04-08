type SocketListener = (...args: any[]) => void;

interface SocketProviderProps {
    children: any;
}

interface SocketState {
    connected: boolean;
    on(type: string, listener: SocketListener): void;
}
