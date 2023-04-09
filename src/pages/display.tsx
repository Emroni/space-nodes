import { withSocket } from '@/contexts/Socket/Socket';
import { Box } from '@mui/material';
import { Component } from 'react';

class Display extends Component<any, any> {

    connected = false;

    state = {
        players: [] as any[],
    };

    componentDidUpdate() {
        if (!this.connected && this.props.socket.connected) {
            this.connected = true;
            this.props.socket.emit('displayConnect');
            this.props.socket.on('displayConnected', this.init);
            this.props.socket.on('displayTick', this.tick);
        }
    }

    init = (data: any) => {
        this.setState({
            players: Object.values(data.players),
        });
    }

    tick = (data: any) => {
        this.setState({
            players: Object.values(data.players),
        });
    }

    render() {
        return <Box height="100%" left={0} overflow="hidden" position="absolute" top={0} width="100%">
            {this.state.players.map(player => (
                <Box key={player.id} sx={{
                    backgroundColor: '#FFFFFF',
                    height: '10px',
                    left: `${100 * player.x}%`,
                    position: 'absolute',
                    top: `${100 * player.y}%`,
                    transform: `rotate(${player.angle}rad)`,
                    width: '20px',
                }} />
            ))}
        </Box>;
    }

}

const ComposedDisplay = withSocket(Display);
export default ComposedDisplay;