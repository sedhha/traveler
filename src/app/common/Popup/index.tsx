'use client';
import classes from './Popup.module.css';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiFillApi } from 'react-icons/ai';
import dynamic from 'next/dynamic';

const MdOutlineCloudDone = dynamic(() =>
	import('react-icons/md').then((result) => result.MdOutlineCloudDone)
);

const MdSmsFailed = dynamic(() =>
	import('react-icons/md').then((result) => result.MdSmsFailed)
);
interface IPopup {
	message: string;
	title: string;
	type: 'neutral' | 'success' | 'error';
	show: boolean;
	timeoutInSeconds?: number;
	hideShow: () => void;
}
const colorClass = (type: 'neutral' | 'success' | 'error'): string => {
	switch (type) {
		case 'success':
			return classes.SuccessClass;
		case 'error':
			return classes.ErrorClass;
		case 'neutral':
			return classes.NeutralClass;
	}
};

const Icon = ({ type }: { type: 'neutral' | 'success' | 'error' }) => {
	switch (type) {
		case 'success':
			return (
				<MdOutlineCloudDone
					className={`${classes.BigIcon} ${colorClass(type)}`}
				/>
			);
		case 'error':
			return (
				<MdSmsFailed className={`${classes.BigIcon} ${colorClass(type)}`} />
			);
		default:
			return <AiFillApi className={`${classes.BigIcon} ${colorClass(type)}`} />;
	}
};
const Popup = ({
	message,
	type,
	show,
	title,
	timeoutInSeconds,
	hideShow,
}: IPopup) => {
	useEffect(() => {
		setTimeout(() => {
			hideShow();
		}, (timeoutInSeconds ?? 10) * 1000);
	}, [timeoutInSeconds, hideShow]);
	return show ? (
		<dialog
			className={classes.Popup}
			open={show}
		>
			<div className={classes.AlertBanner}>
				<section className={classes.CloseItem}>
					<AiOutlineClose
						className={`${classes.CloseIcon} ${colorClass(type)}`}
						onClick={() => hideShow()}
					/>
				</section>
				<section className={classes.AlertBannerInfo}>
					<h1 className={`${classes.Title} ${colorClass(type)}`}>
						{title ?? 'Error'}
					</h1>
					<Icon type={type} />
					<p className={classes.Message}>{message}</p>
				</section>
			</div>
		</dialog>
	) : null;
};

export default Popup;
