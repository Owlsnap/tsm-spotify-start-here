import { Box, Divider, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SongRow from '../SongRow/SongRow';

const SongTable = ({ songs, loading, spotifyApi }) => {

    const renderSongs = () => {
        if (loading) {
            return [1,2,3,4,5].map((e, i) => <SongRow loading={loading} key={e} i={i} images={null} />)
        }
        return songs.map((song, i) => <SongRow 
        title={song.name} 
        album={song.album.name} 
        artist={song.artists.name}
        duration={song.duration_ms / 1000}
        i={i}
        images={song.album.images}
        key={i}
        position={song.position}
        contextUri={song.contextUri}
        spotifyApi={spotifyApi}
        />)
    }


	return (
		<Box
			p={{ xs: 3, md: 4 }}
			sx={{
				flex: 1,
				overflowY: 'auto',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Grid container px={2} py={1} sx={{ width: '100%', color: 'text-secondary', fontSize: 14 }}>
				<Grid item sx={{ width: 35, display: 'flex', alignItems: 'center' }}>
					#
				</Grid>
				<Grid item sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
					Title
				</Grid>
				<Grid item xs={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
					Album
				</Grid>
				<Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<AccessTimeIcon sx={{ width: 20, height: 20 }} />
				</Grid>
			</Grid>
			<Box pb={2}>
				<Divider sx={{ width: '100%', height: 1 }} />
			</Box>
			{renderSongs()}
		</Box>
	);
};

export default SongTable;
