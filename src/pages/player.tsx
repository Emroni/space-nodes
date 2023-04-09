import { Joystick } from '@/components';
import { withSocket } from '@/contexts/Socket/Socket';
import { Box, Button } from '@mui/material';
import { Component } from 'react';

class Player extends Component<any, any> {

    timer: NodeJS.Timer;

    angle = 0;
    connected = false;
    force = 0;
    velocityX = 0;
    velocityY = 0;
    x = 0.5;
    y = 0.5;

    componentDidUpdate() {
        if (!this.connected && this.props.socket.connected) {
            this.connected = true;
            this.props.socket.emit('playerConnect');
            this.props.socket.on('playerConnected', this.init);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    init = () => {
        this.timer = setInterval(this.move, 1000 / 30);
        this.update();
    }

    handleJoystickChange = (amount?: number, angle?: number) => {
        this.angle = angle !== undefined ? angle : this.angle;
        this.force = amount !== undefined ? amount : this.force;
        if (angle !== undefined) {
            this.update();
        }
    }

    handleShoot = () => {
        this.props.socket.emit('playerShoot', {
            angle: this.angle,
            velocityX: 0.005 * Math.sin(this.angle + Math.PI / 2),
            velocityY: 0.005 * Math.cos(this.angle - Math.PI / 2),
            x: this.x,
            y: this.y,
        });
    }

    move = () => {
        // Update velocity
        if (this.force) {
            this.velocityX += ((Math.sin(this.angle + Math.PI / 2) * this.force * 0.01) - this.velocityX) * 0.02;
            this.velocityY += ((-Math.cos(this.angle + Math.PI / 2) * this.force * 0.01) - this.velocityY) * 0.02;
        } else {
            this.velocityX *= 0.96;
            this.velocityY *= 0.96;
        }

        // Get position
        const x = Math.round(((this.x + this.velocityX + 1) % 1) * 1000) / 1000;
        const y = Math.round(((this.y + this.velocityY + 1) % 1) * 1000) / 1000;

        // Update angle and position
        if (this.x != x || this.y != y) {
            this.x = x;
            this.y = y;
            this.update();
        }
    }

    update = () => {
        this.props.socket.emit('playerMove', {
            angle: this.angle,
            x: this.x,
            y: this.y,
        });
    }

    render() {
        return <Box display="flex" gap="20vw" height="100%" justifyContent="space-between">
            <Box flex={1} sx={{ touchAction: 'none' }}>
                <Joystick onChange={this.handleJoystickChange} />
            </Box>
            <Box alignItems="center" display="flex" flex={1} flexDirection="column" justifyContent="center">
                <Button size="large" variant="contained" onClick={this.handleShoot}>
                    Shoot
                </Button>
            </Box>
        </Box>;
    }

}

const ComposedPlayer = withSocket(Player);
export default ComposedPlayer;