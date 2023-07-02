'use client';
import dummyPosts from '@/constants/dummy-posts.json';
import { FilterBox } from '@/app/feed/Filters';
import classes from './Feed.module.css';
import { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';
import { TripCard } from './TripCard';
const Feed = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [applied, setApplied] = useState(false);
    const [customPrompt, setCustomPrompt] = useState('');
		const [startDate, setStartDate] = useState('');
		const [endDate, setEndDate] = useState('');
		const [location, setLocation] = useState('');

		const updateCustomPrompt = (value: string) => setCustomPrompt(value);
		const onApply = () => {
			setApplied(true);
			setShowFilter(false);
		};
		const onUnApply = () => setApplied(false);

		const toggleFilter = () => {
			setShowFilter((prev) => !prev);
		};

		const filteredPosts = dummyPosts.filter((item) => {
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
		return (
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
