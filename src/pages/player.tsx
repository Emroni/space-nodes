import { Joystick } from '@/components';
import { withSocket } from '@/contexts/Socket/Socket';
import { Box, Button } from '@mui/material';
import { Component } from 'react';

class Player extends Component<any, any> {

    timer: NodeJS.Timer;

    angle = 0;
    force = 0;
    velocityX = 0;
    velocityY = 0;
    x = 0;
    y = 0;

    componentDidMount() {
        this.reset();
        this.timer = setInterval(this.move, 1000 / 30);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleJoystickChange = (amount: number, angle: number) => {
        // Update values
        this.angle = angle;
        this.force = amount;

        // Push to server
        if (angle) {
            this.props.socket.emit('player.angle', angle);
        }
    }

    handleShoot = () => {
        console.log('shoot');
    }

    reset = () => {
        this.angle = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.x = 0;
        this.y = 0;
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
            this.props.socket.emit('player.position', {
                x: this.x,
                y: this.y,
            });
        }
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