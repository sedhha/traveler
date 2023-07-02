import classes from './Feed.module.css';

type Props = {
	title: string;
	startDate: string;
	endDate: string;
	city: string;
	country: string;
	description: string;
};

function formatDate(dateString?: string) {
	if (!dateString) return 'NA';
	const date = new Date(dateString);

	//@ts-ignore
	if (date == 'Invalid Date') {
		return 'NA';
	}

	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};
	//@ts-ignore
	return date.toLocaleDateString('en-US', options);
}
const TripCard = ({
	title,
	startDate,
	endDate,
	city,
	country,
	description,
}: Props) => {
	return (
		<div className={classes.TripCard}>
			<h1 className={classes.Title}>{title}</h1>
			<div className={classes.First}>
				<div className={classes.LabelWithValue}>
					<h2>Start Date: </h2>
					<h3>{formatDate(startDate)}</h3>
				</div>
				<div className={classes.LabelWithValue}>
					<h2>End Date: </h2>
					<h3>{formatDate(endDate)}</h3>
				</div>
			</div>
			<div className={classes.First}>
				<div className={classes.LabelWithValue}>
					<h2>Location: </h2>
					<h3>{`${city}, ${country}`}</h3>
				</div>
				<div className={classes.LabelWithValue}>
					<h2>Contact: </h2>
					<h3>+XX-XXXX-XXXX</h3>
				</div>
			</div>
			<p className={classes.Description}>{description}</p>
		</div>
	);
};

export { TripCard };
