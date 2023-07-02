'use client';
import classes from './Login.module.css';
import { RiAccountCircleFill } from 'react-icons/ri';
import { useState } from 'react';
import NewUser from './NewUser';
import ExistingUser from './ExistingUser';
import usePopupStore from '@/store/popup';
import Popup from '@/common/Popup';
const Login = () => {
	const [newUser, setNewUser] = useState(true);
	const { type, message, showMessage, title, hideMessage } = usePopupStore();
	return (
		<>
			<section className={classes.Container}>
				<div className={classes.Row}>
					<RiAccountCircleFill className={classes.Icon} />
					<h1 className='heading'>Create an Account</h1>
				</div>
				<h2 className='infoText'>
					Login or Signup to become a bagpacker and enjoy all benefits!
				</h2>
				<div className={classes.FullWidthRow}>
					<button
						className={!newUser ? classes.active : undefined}
						onClick={() => setNewUser(false)}
					>
						Existing User
					</button>
					<button
						className={newUser ? classes.active : undefined}
						onClick={() => setNewUser(true)}
					>
						New User
					</button>
				</div>
				<br />
				{newUser ? <NewUser /> : <ExistingUser />}
			</section>
			<Popup
				type={type}
				message={message ?? 'Process was completed successfully'}
				show={showMessage}
				title={title ?? 'Processing...'}
				hideShow={hideMessage}
			/>
		</>
	);
};
export default Login;
