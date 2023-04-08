import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box component="main" minHeight="100vh" padding={4} sx={{ backgroundImage: 'url(/assets/space.png)' }}>
            <Component {...pageProps} />
        </Box>
    </ThemeProvider>;

}
