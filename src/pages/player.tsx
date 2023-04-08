import { Joystick } from '@/components';
import { Box, Button } from '@mui/material';
import { Component } from 'react';

export default class Player extends Component {

    handleJoystickChange = (amount: number, angle: number) => {
        console.log(amount, angle);
    }

    handleShoot = () => {
        console.log('shoot');
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