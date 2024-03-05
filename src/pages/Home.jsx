import { Box, Button } from '@mui/material';



const Home = () => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5
        }}
        >
            <img src="/Alex-headshot-img.jpg" alt="alexBlom" style={{ maxwidth: '50%', maxHeight: '50%', width: 300 }} />
            <Button variant='contained' size='large' href="tel:0704375199"> 
                Kontakta mig via telefon
            </Button>
        </Box>
    );
};

export default Home;