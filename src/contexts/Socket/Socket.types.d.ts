type SocketListener = (...args: any[]) => void;

interface SocketProviderProps {
    children: any;
}

interface SocketState {
    connected: boolean;
    emit(type: string, data: any): void;
    on(type: string, listener: SocketListener): void;
}
