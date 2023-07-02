import Link from 'next/link';
import classes from './Intro.module.css';
const Intro = () => (
	<section className={classes.Intro}>
		<h1 className={classes.IntroHeader}>Meet new people</h1>
		<h1 className={classes.IntroHeader}>Discover new places</h1>
		<h1 className={classes.IntroHeader}>Make unforgettable memories</h1>
		<Link href='/login'>
			<button className={'btn ' + classes.ButtonPosition}>Get Started</button>
		</Link>
	</section>
);

export default Intro;
