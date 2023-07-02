import classes from './Feed.module.css';

type Props = {
	apply: boolean;
	onUnApply: () => void;
	onApply: () => void;
};

const FilterBox = ({ apply, onUnApply, onApply }: Props) => (
	<div className={classes['container']}>
		<form>
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
					placeholder='Select travel date'
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
					placeholder='Select travel date'
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
				></textarea>
			</div>
			<button
				className={classes.button}
				type='submit'
			>
				Plan My Trip
			</button>
		</form>
		<button
			id='filterBtn'
			className={[classes['btn-secondary'], classes.button].join(' ')}
			onClick={apply ? onUnApply : onApply}
		>
			{apply ? 'Clear Filters' : 'Apply Filters'}
		</button>
	</div>
);

export { FilterBox };
