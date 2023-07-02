import classes from './Spinner.module.css';
const Spinner = () => (
	<section className={classes.Section}>
		<div className={classes['lds-dual-ring']}></div>
	</section>
);
export default Spinner;
