import { Box, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/PhoneAndroidTwoTone';

const Home = () => {
	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 5
			}}
		>
			<img
				src="/Alex-headshot-img.jpg"
				alt="alexBlom"
				style={{ maxwidth: '50%', maxHeight: '50%', width: 300, height: 400 }}
			/>
			<Button variant="contained" size="medium" href="tel:0704375199">
				<p>Kontakta mig!</p>
				<PhoneIcon sx={{ fontSize: 16, marginLeft: 1 }} />
			</Button>
		</Box>
	);
};

export default Home;
