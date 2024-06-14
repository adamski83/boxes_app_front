import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import './sideMenu.css';

const SideMenu = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [collapse, setCollapse] = useState(false);

	function getSize() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', getSize);
		if (width < 250) {
			setCollapse(true);
		} else {
			setCollapse(false);
		}

		return () => {
			window.removeEventListener('resize', getSize);
		};
	}, [window.innerWidth]);

	return (
		<div className='box'>
			<h2 className='titel'>SACS Boxe's</h2>
			<Sidebar collapsed={collapse}>
				<Menu
					menuItemStyles={{
						button: ({ level, active }) => {
							// only apply styles on first level elements of the tree
							if (level === 0)
								return {
									color: '#ba951c',
									backgroundColor: active
										? '#6512b8'
										: undefined,
								};
						},
					}}>
					<MenuItem component={<Link to='/documentation' />}>
						<Icon>
							<InventoryIcon />
						</Icon>{' '}
						Cartons
					</MenuItem>
					<MenuItem component={<Link to='/calendar' />}>
						<Icon>
							<AddIcon />
						</Icon>
						Incomme
					</MenuItem>
					<MenuItem component={<Link to='/e-commerce' />}>
						{' '}
						E-commerce
					</MenuItem>
				</Menu>
			</Sidebar>
		</div>
	);
};

export default SideMenu;
