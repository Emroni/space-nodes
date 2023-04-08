import '@fontsource/press-start-2p';
import { createTheme } from '@mui/material';

export default createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'outlined',
            },
            styleOverrides: {
                outlined: {
                    border: '2px dashed #FFFFFF',
                    padding: '16px 24px',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                },
                sizeLarge: {
                    borderRadius: 24,
                    fontSize: 20,
                    padding: '24px 32px',
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
