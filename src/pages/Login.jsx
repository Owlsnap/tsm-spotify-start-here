import { Box, Button } from '@mui/material';
import { accessUrl } from '../config/config';

 const Login = () => {
    return <Box sx={{
        backgroundColor: 'background.paper',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }}
    >
        <img src="/Spotify_Logo.png" 
            alt="Spotify logo" 
            style={{ marginBottom: 300, width: '70%', maxWidth: 500}} 
        />
        <Button size='large' color='primary' variant='contained' href={accessUrl}>
            Login to Spotify
        </Button>
    </Box>
}

export default Login;