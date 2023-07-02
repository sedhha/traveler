'use client';
import classes from './AppUsage.module.css';
import { useState } from 'react';
import InfoComponent from './InfoComponent';

const stages = [
	{
		title: 'Bagpackers',
		description: 'Traveling solo? Discover like minded travelers.',
		src: '/illustrations/bagpackers.svg',
		alt: 'bagpackers-around',
		activeStageNumber: 0,
	},
	{
		title: 'Locals',
		description: 'Discover the ideal residents to enhance your trip.',
		src: '/illustrations/locals.svg',
		alt: 'locals-around',
		activeStageNumber: 1,
	},
	{
		title: 'Plan',
		description: 'Engage and prepare your best travel iternary together!',
		src: '/illustrations/plan.svg',
		alt: 'plan-trips',
		activeStageNumber: 2,
	},
	{
		title: 'Filter',
		description: 'Narrow your search that fits the best of your needs.',
		src: '/illustrations/filter.svg',
		alt: 'filter-users',
		activeStageNumber: 3,
	},
	{
		title: 'Chat',
		description: 'Communicate and engage in personal or group chats',
		src: '/illustrations/chat.svg',
		alt: 'chat-with-teams',
		activeStageNumber: 4,
	},
];

const HowItWorks = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<section className={classes.Container}>
			<h2 className={classes.WhatsInHeader}>What&apos;s in Bagpacker?</h2>
			<InfoComponent
				{...stages[activeIndex]}
				onChange={(index) => setActiveIndex(index)}
				totalStages={stages.length}
			/>
		</section>
	);
};

export default HowItWorks;
