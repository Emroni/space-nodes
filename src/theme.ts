import '@fontsource/press-start-2p';
import { createTheme } from '@mui/material';

export default createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    border: '2px dashed #FFFFFF',
                    padding: '16px 24px',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                },
            },
        },
    },
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
