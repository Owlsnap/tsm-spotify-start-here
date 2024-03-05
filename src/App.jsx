import './App.css';
import { Box } from '@mui/material';
import Dashboard from './components/Dashboard';

function App( spotifyApi ) {

	return (
		<Box className="App">
			<Dashboard spotifyApi={spotifyApi} />
		</Box>
	);
}

export default App;
