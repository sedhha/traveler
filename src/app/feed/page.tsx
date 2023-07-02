'use client';
import dummyPosts from '@/constants/dummy-posts.json';
import { FilterBox } from '@/app/feed/Filters';
import classes from './Feed.module.css';
import { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';
import { TripCard } from './TripCard';
import axios from 'axios';
import Spinner from '../common/Spinner';
const Feed = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [applied, setApplied] = useState(false);
	const [customPrompt, setCustomPrompt] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [location, setLocation] = useState('');
	const [customResults, setCustomResults] = useState<typeof dummyPosts>([]);
	const [loading, setLoading] = useState(false);

	const updateCustomPrompt = (value: string) => setCustomPrompt(value);
	const onApply = () => {
		setCustomResults([]);
		setApplied(true);
		setShowFilter(false);
	};
	const onUnApply = () => setApplied(false);

	const toggleFilter = () => {
		setShowFilter((prev) => !prev);
	};

	const filteredPosts = customResults.length
		? [...customResults]
		: dummyPosts.filter((item) => {
				const greaterThanEqualToStartDate = !!startDate
					? new Date(item.startDate) >= new Date(startDate)
					: true;
				const lessThanEqualToEndDate = !!endDate
					? new Date(item.endDate) <= new Date(endDate)
					: true;
				const locationMatch = !!location
					? item.city.toLowerCase().includes(location.toLowerCase()) ||
					  item.country.toLowerCase().includes(location.toLowerCase())
					: true;
				return (
					(applied &&
						greaterThanEqualToStartDate &&
						lessThanEqualToEndDate &&
						locationMatch) ||
					!applied
				);
		  });

	const onCustomPromptFilter = async () => {
		setLoading(true);
		setShowFilter(false);
		axios
			.get(`/api/travel?promptText=${customPrompt.slice(0, 50)}`)
			.then((res) => setCustomResults([...res.data]))
			.catch((err) => {
				console.error('Error occured while trying to get data = ', err.message);
				setCustomResults([]);
			})
			.finally(() => setLoading(false));
	};
	return loading ? (
		<div className={classes.Spinner}>
			<Spinner />.
		</div>
	) : (
		<>
			<div className={classes.Filter}>
				{applied ? (
					<FaFilter
						className={classes.FilterIcon}
						onClick={toggleFilter}
					/>
				) : (
					<FiFilter
						className={classes.FilterIcon}
						onClick={toggleFilter}
					/>
				)}
			</div>
			{showFilter && (
				<FilterBox
					apply={applied}
					startDate={startDate}
					endDate={endDate}
					customPrompt={customPrompt}
					location={location}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					onApply={onApply}
					onUnApply={onUnApply}
					updateCustomPrompt={updateCustomPrompt}
					setLocation={setLocation}
					onCustomPrompRequest={onCustomPromptFilter}
				/>
			)}
			<div className={classes.TravelPosts}>
				{filteredPosts.map((post) => (
					<TripCard
						key={post.tripId}
						title={post.tripName}
						startDate={post.startDate}
						endDate={post.endDate}
						description={post.description}
						city={post.city}
						country={post.country}
					/>
				))}
			</div>
		</>
	);
};
export default Feed;
