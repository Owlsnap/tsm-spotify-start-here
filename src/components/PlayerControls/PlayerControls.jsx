import { Stack, Typography, Slider, Box, IconButton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const playerControls = ({ player, isPaused, progress, duration }) => {
	const [currentProgress, setCurrentProgress] = useState(progress);
	const skipStyle = { width: 28, height: 28 };
	const playStyle = { width: 38, height: 38 };

	useEffect(() => {
		const intervalId = setInterval(() => {
            if (!isPaused && player) {
                setCurrentProgress((prev) => prev + 1);
            }
        }, 1000);
		return () => clearInterval(intervalId);
	}, [isPaused, player]);

	useEffect(() => {
		setCurrentProgress(progress);
	}, [progress]);

	return (
		<Stack direction={'column'} spacing={2} justify="center" alignItems="center" sx={{ width: '100%' }}>
			<Stack spacing={1} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrentProgress(0);
						player.previousTrack();
					}}
				>
					<SkipPrevious sx={skipStyle} />
				</IconButton>
				{isPaused ? (
					<IconButton
						size="small"
						sx={{ color: 'text.primary' }}
						onClick={() => {
							player.togglePlay();
						}}
					>
						<PlayArrow sx={playStyle} />
					</IconButton>
				) : (
					<IconButton
						size="small"
						sx={{ color: 'text.primary' }}
						onClick={() => {
							player.togglePlay();
						}}
					>
						<Pause sx={playStyle} />
					</IconButton>
				)}
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrentProgress(0);
						player.nextTrack();
					}}
				>
					<SkipNext sx={skipStyle} />
				</IconButton>
			</Stack>
			<Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ width: '75%' }}>
				<Typography variant="subtitle1" sx={{ color: 'text.secondary', fontSize: 12 }}>
					{formatTime(currentProgress)}
				</Typography>
				<Slider
					aria-label="progress"
					value={currentProgress}
					max={duration}
					min={0}
					size="medium"
					sx={{ color: 'primary.main' }}
					onChange={(event, value) => {
						setCurrentProgress(value);
					}}
					onChangeCommitted={(event, value) => {
						player.seek(value * 1000);
					}}
				/>
				<Typography variant="subtitle1" sx={{ color: 'text.secondary', fontSize: 12 }}>
					{formatTime(duration)}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default playerControls;
