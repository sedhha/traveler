import classes from './Feed.module.css';

type Props = {
	apply: boolean;
	customPrompt: string;
	startDate: string;
	endDate: string;
	location: string;
	setStartDate: (date: string) => void;
	setEndDate: (date: string) => void;
	onUnApply: () => void;
	onApply: () => void;
	updateCustomPrompt: (value: string) => void;
	setLocation: (value: string) => void;
};

const FilterBox = ({
	customPrompt,
	startDate,
	endDate,
	location,
	setLocation,
	setStartDate,
	setEndDate,
	updateCustomPrompt,
	onUnApply,
	onApply,
}: Props) => (
	<div className={classes['container']}>
		<div className={classes['form-group']}>
			<label
				className={classes.label}
				htmlFor='date'
			>
				Start Date
			</label>
			<input
				type='date'
				className={classes.Input}
				placeholder='Select Start date'
				onChange={(e) => setStartDate(e.target.value)}
				value={startDate}
			/>
		</div>
		<div className={classes['form-group']}>
			<label
				className={classes.label}
				htmlFor='date'
			>
				End Date
			</label>
			<input
				type='date'
				className={classes.Input}
				placeholder='Select End date'
				onChange={(e) => setEndDate(e.target.value)}
				value={endDate}
			/>
		</div>
		<div className={classes['form-group']}>
			<label
				className={classes.label}
				htmlFor='date'
			>
				Travel Destination
			</label>
			<input
				type='text'
				className={classes.Input}
				placeholder='Start typing location...'
				value={location}
				onChange={(e) => setLocation(e.target.value)}
			/>
		</div>
		<div className={classes['form-group']}>
			<label
				className={classes.label}
				htmlFor='prompt'
			>
				Summarize your search in not more than 50 characters
			</label>
			<textarea
				id='prompt'
				className={classes.textarea}
				placeholder='Enter any specific requirements or preferences'
				value={customPrompt}
				onChange={(e) => updateCustomPrompt(e.target.value)}
			></textarea>
		</div>
		<button
			className={classes.button}
			type='submit'
			onClick={onApply}
		>
			Apply Filters
		</button>
		<button
			id='filterBtn'
			className={[classes['btn-secondary'], classes.button].join(' ')}
			onClick={onUnApply}
		>
			Clear Filters
		</button>
	</div>
);

export { FilterBox };
