export const authEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = import.meta.env.VITE_CLIENT_ID;
export const liveUrl = import.meta.env.VITE_CLIENT_SECRET;
export const devUrl = 'http://localhost:5173/';
export const redirectUrl = import.meta.env.PROD  ? liveUrl : devUrl;
export const scopes = [
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'app-remote-control',
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'ugc-image-upload',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-follow-modify',
    'user-follow-read',
    'user-read-recently-played'
];

export const accessUrl = 
`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;