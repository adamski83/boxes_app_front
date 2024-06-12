import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Header = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100vw',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			{' '}
			<Stack spacing={2} direction='row'>
				<Button variant='contained' onClick={() => console.log('buu')}>
					Text
				</Button>
				<Button variant='contained' onClick={() => console.log('sdf')}>
					Contained
				</Button>
				<Button variant='contained' onClick={() => console.log('ghh')}>
					Outlined
				</Button>
			</Stack>
		</Box>
	);
};

export default Header;
