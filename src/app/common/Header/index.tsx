'use client';
import Logo from '@/common/Logo';
import classes from './Header.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import useStore from '@/store';
const Header = () => {
	const { menuOpen, setMenu } = useStore();
	return (
		<header className={classes.header}>
			<div className={classes.container}>
				<AiOutlineMenu
					className={classes.Menu}
					onClick={() => setMenu(!menuOpen)}
				/>
				<Logo />
			</div>
		</header>
	);
};
export default Header;
