'use client';
import classes from './common.module.css';
import useStore from '@/store';
import { MdClose } from 'react-icons/md';
import Logo from './Logo';
import { usePathname, useRouter } from 'next/navigation';

const Redirector = ({ children, href }: { children: string; href: string }) => {
	const { setMenu } = useStore();
	const router = useRouter();
	const pathName = usePathname();
	return (
		<h1
			className={href === pathName ? classes.ActiveMenuItwm : undefined}
			onClick={() => {
				router.push(href);
				setTimeout(() => setMenu(false), 200);
			}}
		>
			{children}
		</h1>
	);
};
const MobileMenu = () => {
	const { menuOpen, setMenu } = useStore();
	return menuOpen ? (
		<nav className={classes.MobileMenu}>
			<div className={classes.NavHead}>
				<MdClose
					className={classes.CloseIcon}
					onClick={() => setMenu(!menuOpen)}
				/>
				<Logo />
			</div>
			<div className={classes.MenuItem}>
				<Redirector href='/'>Home</Redirector>
				<Redirector href='/feed'>Discover Bagpackers</Redirector>
				<Redirector href='/locals'>Discover Locals</Redirector>
				<Redirector href='/about'>About</Redirector>
				<Redirector href='/login'>Sign Up</Redirector>
			</div>
		</nav>
	) : null;
};
export default MobileMenu;
