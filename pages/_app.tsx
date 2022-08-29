import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {  CssBaseline, ThemeProvider } from '@mui/material'
import { ligthTheme ,darkTheme } from '../themes'
import { UIProvider } from '../context/ui'
import { EntiresProvider } from '../context/entries'
import { SnackbarProvider } from 'notistack';
function MyApp({ Component, pageProps }: AppProps) {
  return(
    <SnackbarProvider maxSnack={3}>
      <EntiresProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme} >
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntiresProvider>
    </SnackbarProvider>
    
    
  )
}

export default MyApp
