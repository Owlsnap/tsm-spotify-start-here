import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from '@mui/system'
import { themeOptions } from './theme/material-theme'
import SpotifyWebApi from 'spotify-web-api-node'
import { redirectUrl } from './config/config'

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  redirectUri: redirectUrl
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <App spotifyApi={spotifyApi} />
    </ThemeProvider>
  </React.StrictMode>,
)
