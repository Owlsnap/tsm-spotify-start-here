import { Box, Grid, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVolume from '../PlayerVolume/PlayerVolume';
import PlayerOverlay from '../PlayerOverlay/PlayerOverlay';

const Player = ({ spotifyApi, token }) => {
	const [localPlayer, setLocalPlayer] = useState(null);
	const [isPaused, setIsPaused] = useState(false);
	const [current_track, setCurrentTrack] = useState(null);
	const [device, setDevice] = useState(null);
	const [duration, setDuration] = useState(null);
	const [progress, setProgress] = useState(null);
	const [active, setActive] = useState();
	const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Alex SpotPlayer2',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5
			});

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				setDevice(device_id);
				setLocalPlayer(player);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			player.addListener('player_state_changed', (state) => {
				if (!state || !state.track_window?.current_track) {
					return;
				}

				const duration = state.track_window.current_track.duration_ms / 1000;
				const progress = state.position / 1000;
				setDuration(duration);
				setProgress(progress);
				setIsPaused(state.paused);
				setCurrentTrack(state.track_window.current_track);

				player.getCurrentState().then((state) => {
					!state ? setActive(false) : setActive(true);
				});
			});

			player.connect();
		};
	}, []);

	useEffect(() => {
		if (!localPlayer) return;
		async function connect() {
			await localPlayer.connect();
		}

		connect();
		return () => {
			localPlayer.disconnect();
		};
	}, [localPlayer]);

	// useEffect(() => {
	// 	const transferPlayback = async () => {
	// 		if (device) {
	// 			const res = await spotifyApi.getMyDevices();
	// 			await spotifyApi.transferMyPlayback([device], false);
	// 		}
	// 	};

	// 	transferPlayback();
	// }, [device, spotifyApi]);

	return (
		<Box>
			<Grid
				container
				px={3}
				sx={{
					backgroundColor: 'background.paper',
					height: 100,
					cursor: { xs: 'pointer', md: 'auto' },
					width: '100%',
					borderTop: '1px solid #292929'
				}}
				onClick={() => setPlayerOverlayIsOpen((prev) => !prev)}
			>
				<Grid xs={12} md={4} item sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
					<Avatar
						src={current_track?.album.images[0].url}
						alt={current_track?.album.name}
						variant="square"
						sx={{ width: 56, height: 56, marginRight: 2 }}
					/>
					<Box>
						<Typography variant="h6" sx={{ color: 'text.primary', fontSize: 14 }}>
							{current_track?.name}
						</Typography>
						<Typography variant="subtitle1" sx={{ color: 'text.secondary', fontSize: 10 }}>
							{current_track?.artists.map((artist) => artist.name).join(', ')}
						</Typography>
					</Box>
				</Grid>
				<Grid
					sx={{
						display: { xs: 'none', md: 'flex' },
						justifyContent: 'center',
						alignItems: 'center'
					}}
					md={4}
					item
				>
					{active ? (
						<PlayerControls
							progress={progress}
							isPaused={isPaused}
							duration={duration}
							player={localPlayer}
						/>
					) : (
						<Typography variant="subtitle1" sx={{ color: 'text.secondary', fontSize: 12 }}>
							No active device
						</Typography>
					)}
				</Grid>
				<Grid
					xs={6}
					md={4}
					item
					sx={{
						display: { xs: 'none', md: 'flex' },
						alignItems: 'center',
						justifyContent: 'flex-end'
					}}
				>
					<PlayerVolume player={localPlayer} />
				</Grid>
			</Grid>
			<PlayerOverlay
				playerOverlayIsOpen={playerOverlayIsOpen}
				closeOverlay={() => setPlayerOverlayIsOpen(false)}
				progress={progress}
				isPaused={isPaused}
				duration={duration}
				player={localPlayer}
				current_track={current_track}
				active={active}
			/>
		</Box>
	);
};

export default Player;
