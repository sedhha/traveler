import Link from 'next/link';
import classes from './Login.module.css';
import { AiOutlineMail, AiFillPhone, AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
const ExistingUser = () => {
	return (
		<div className={classes.FormData}>
			<div className={classes.FormFieldWithLabel}>
				<AiOutlineMail className={classes.FormIcon} />
				<input
					className={classes.InputField}
					placeholder='Email Address'
				/>
			</div>
			<div className={classes.FormFieldWithLabel}>
				<RiLockPasswordFill className={classes.FormIcon} />
				<input
					className={classes.InputField}
					placeholder='Password'
					type='password'
				/>
			</div>
			<p className={classes.GenericMessage}>
				Forgot Password? <Link href='/forgot-password'>Recover here</Link>
			</p>
			<br />
			<button className='standard-button'>Login</button>
		</div>
	);
};
export default ExistingUser;
