import '@fontsource/press-start-2p';
import { createTheme } from '@mui/material';

export default createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#41A5EB',
        },
        secondary: {
            main: '#B34949',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#FFFF00'
        },
    },
    typography: {
        fontFamily: '"Press Start 2P", sans-serif',
    },
});
