import { Box, Typography, List } from '@mui/material';
import { useEffect, useState } from 'react';
import PlaylistItem from '../components/PlaylistItem/PlaylistItem';

const Library = ({ spotifyApi, token }) => {
    const [albumList, setAlbumList] = useState(null);
	const [loading, setloading] = useState(true);


    useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;

			const data = await spotifyApi.getUserPlaylists();

            setloading(false);
			setAlbumList(data.body.items);
		}

		getPlaylists();
	}, [spotifyApi, token]);

    const renderPlayListItems = () => {
        if(loading) {
            return [1,2,3,4,5,6,7].map((_, i) => <PlaylistItem key={i} loading={loading} />);
        }


        return albumList.map((playlist, i) => <PlaylistItem key={i} {...playlist} loading={loading} />);
        
    };



	return (
		<Box
			id="Library"
			px={3}
			sx={{
				display: { xs: 'flex', md: 'none' },
				backgroundColor: 'background.paper',
				flex: 1,
                flexDirection: 'column',
				overFlowY: 'auto'
			}}
		>
            <Typography py={3} sx={{ color: 'text.primary', fontSize: 30 }}>
                Ditt bibliotek
            </Typography>
            <List>{renderPlayListItems()}</List>
        </Box>
	);
};

export default Library;
