'use client';
import classes from './Login.module.css';
import { AiOutlineMail, AiFillPhone, AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { axiosInstance } from '@/frontend/apiClient/axiosClient';
import { END_POINTS } from '@/frontend/apiClient/endpoints';
import { IRegisterFormData } from '@/backend/interfaces/signup';
import { useState } from 'react';
import usePopupStore from '@/store/popup';
import { User } from '@supabase/supabase-js';
import Spinner from '@/common/Spinner';

function formatNumber(number: string) {
	const numberString = number.toString();
	let formattedNumber = '';

	if (numberString.length <= 2) {
		formattedNumber = numberString;
	} else if (numberString.length <= 4) {
		formattedNumber = `${numberString.slice(0, 2)}-${numberString.slice(2)}`;
	} else {
		formattedNumber = `${numberString.slice(0, 2)}-${numberString.slice(
			2,
			-4
		)}-${numberString.slice(-4)}`;
	}

	return formattedNumber;
}

const NewUser = () => {
	const { setMessageAndType } = usePopupStore();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(process.env.NEXT_PUBLIC_NAME ?? '');
	const [email, setEmail] = useState(
		process.env.NEXT_PUBLIC_EMAIL_ADDRESS ?? ''
	);
	const [password, setPassword] = useState(
		process.env.NEXT_PUBLIC_PASSWORD ?? ''
	);
	const [reEnterPassword, setReEnterPassword] = useState(
		process.env.NEXT_PUBLIC_PASSWORD ?? ''
	);
	const [countryCode, setCountryCode] = useState(
		process.env.NEXT_PUBLIC_CODE ?? ''
	);
	const [phoneNumber, setPhoneNumber] = useState(
		process.env.NEXT_PUBLIC_NUMBER ?? ''
	);
	const createUser = async () => {
		const registerData: IRegisterFormData = {
			name,
			emailAddress: email,
			password,
			reEnterPassword,
			...(!isNaN(+countryCode) &&
				!isNaN(+phoneNumber) &&
				countryCode.length &&
				phoneNumber.length === 10 && {
					countryCode: +countryCode,
					phoneNumber: +phoneNumber,
				}),
		};
		setLoading(true);
		axiosInstance
			.post<{ user: User } | undefined>(END_POINTS.CREATE_USER, registerData)
			.then(({ data: { user } = {} }) => {
				/*
					res.data = FIND IN COMMENTS
				*/
				if (!user)
					setMessageAndType(
						`Hello ${name} Something unexpected happened. Please try again`,
						'Signup Failure',
						'error'
					);
				else
					setMessageAndType(
						`Hello ${name} Check your email address to complete sign up!`,
						'Signup Pending',
						'success'
					);
			})
			.catch((err) => {
				console.log('Error = ', err);
				setMessageAndType(
					`Failed to complete sign up process (${
						err?.response?.status ?? 400
					}): ${err?.response?.statusText ?? err.message}`,
					'Signup Failed',
					'error'
				);
			})
			.finally(() => setLoading(false));
	};
	return (
		<div className={classes.FormData}>
			<div className={classes.FormFieldWithLabel}>
				<AiOutlineUser className={classes.FormIcon} />
				<input
					className={classes.InputField}
					placeholder='Name'
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
			</div>
			<div className={classes.FormFieldWithLabel}>
				<AiOutlineMail className={classes.FormIcon} />
				<input
					className={classes.InputField}
					placeholder='Email Address'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</div>
			<div className={classes.FormFieldWithLabel}>
				<RiLockPasswordFill className={classes.FormIcon} />
				<input
					className={classes.InputField}
					placeholder='Password'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className={classes.FormFieldWithLabel}>
				<RiLockPasswordFill className={classes.FormIcon} />
				<input
					className={classes.InputField}
					placeholder='Re-enter Password'
					type='password'
					value={reEnterPassword}
					onChange={(e) => setReEnterPassword(e.target.value)}
				/>
			</div>

			<div className={classes.FormFieldWithLabel}>
				<AiFillPhone className={classes.FormIcon} />
				<div className={classes.NumberRow}>
					<div>
						<label>+</label>
						<input
							className={`${classes.InputField} ${classes.CountryCodeField}`}
							type='number'
							placeholder='1'
							value={countryCode}
							onChange={(e) => setCountryCode(e.target.value)}
						/>
					</div>
					<input
						className={classes.InputField}
						placeholder='XX-XXXX-XXXX (Optional)'
						type='number'
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
				</div>
			</div>
			<p className={classes.NumberFieldPlaceholder}>
				Your phone number is {`+${countryCode} ${formatNumber(phoneNumber)}`}
			</p>
			{loading ? (
				<Spinner />
			) : (
				<button
					className='standard-button'
					onClick={createUser}
				>
					Signup
				</button>
			)}
		</div>
	);
};
export default NewUser;
