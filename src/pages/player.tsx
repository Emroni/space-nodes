import { Joystick } from '@/components';
import { Box } from '@mui/material';

export default function Player() {

    function handleJoystickChange(amount: number, angle: number) {
        console.log(amount, angle);
    }

    return <Box display="flex" gap="20vw" height="100%" justifyContent="space-between" sx={{ touchAction: 'none' }}>
        <Box flex={1}>
            <Joystick onChange={handleJoystickChange} />
        </Box>
        <Box flex={1}>
            Buttons
        </Box>
    </Box>;

}