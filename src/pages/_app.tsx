import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box component="main" padding={4}>
            <Component {...pageProps} />
        </Box>
    </ThemeProvider>;

}
