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
	const onApply = () => {
		setApplied(true);
		setShowFilter(false);
	};
	const onUnApply = () => setApplied(false);

	const toggleFilter = () => {
		setShowFilter((prev) => !prev);
	};
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
					onApply={onApply}
					onUnApply={onUnApply}
				/>
			)}
			<div className={classes.TravelPosts}>
				{dummyPosts.map((post) => (
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
