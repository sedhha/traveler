'use client';
import Image from 'next/image';
import classes from './AppUsage.module.css';
import useStore from '@/store';

type InfoCardProps = {
	src: string;
	alt?: string;
	activeStageNumber: number;
	title: string;
	description: string;
	totalStages?: number;
	onChange: (index: number) => void;
};

const InfoComponent = ({
	src,
	alt,
	title,
	description,
	activeStageNumber,
	totalStages = 3,
	onChange,
}: InfoCardProps) => {
	const { menuOpen } = useStore();
	return (
		<div className={classes.Illustrations}>
			<div className={classes.ImageContainer}>
				<Image
					src={src ?? '/illustrations/bagpackers.svg'}
					alt={alt ?? 'Bagpackers.svg'}
					fill={menuOpen ? false : true}
					height={menuOpen ? 0 : undefined}
					width={menuOpen ? 0 : undefined}
					className={classes.IllustrationImage}
					priority
				/>
			</div>
			<div className={classes.Stages}>
				{Array(totalStages)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className={`${classes.Stage}${
								activeStageNumber === i ? ' ' + classes.Active : ''
							}`}
							onClick={() => onChange(i)}
						/>
					))}
			</div>
			<h2 className={classes.Title}>{title ?? 'Bagpackers'}</h2>
			<h3 className={classes.Description}>
				{description ?? 'Traveling solo? Discover like minded travelers.'}
			</h3>
		</div>
	);
};

export default InfoComponent;
