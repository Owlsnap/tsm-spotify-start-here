import { Grid, Avatar, Box, Typography, Skeleton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';

const SongRow = ({ images, title, artist, album, duration, i, loading, position, contextUri, spotifyApi }) => {
	const image = images?.length > 0 ? images[0].url : null;

    const onRowClick = async () => {
        const song = {context_uri: contextUri, offset: {position: position}, position_ms: 0}
        await spotifyApi.play(song)
    }

	return (
		<Grid
        onClick={onRowClick}
			container
			px={2}
			py={1}
			sx={{
				width: '100%',
				color: 'text-secondary',
				fontSize: 14,
				cursor: 'pointer',
				'&:hover': { backgroundColor: '#ffffff10' }
			}}
		>
			<Grid item sx={{ width: 35, display: 'flex', alignItems: 'center', fontSize: 16 }}>
				{i + 1}
			</Grid>
			{/* AVATAR TITLE ARTIST */}
			<Grid item sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
				{loading ? (
					<Skeleton variant="square" width={40} height={40} />
				) : (
					<Avatar src={image} alt={null} variant="square" />
				)}
				<Box>
					<Typography sx={{ fontSize: 16, color: 'text.primary' }}>
						{loading ? <Skeleton variant="text" width={150} /> : title}
					</Typography>
					<Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
						{loading ? <Skeleton variant="text" width={60} /> : artist}
					</Typography>
				</Box>
			</Grid>
			{/* ALBUM */}
			<Grid item xs={3} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
				{loading ? <Skeleton variant="text" width={100} /> : album}
			</Grid>
			{/* DURATION */}
			<Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
				{loading ? <Skeleton variant="text" width={30} /> : formatTime(duration)}
			</Grid>
		</Grid>
	);
};

export default SongRow;
