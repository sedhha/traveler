import { auth } from '@/backend/supabase';
import { IRegisterFormData } from '@/be-interfaces/signup';
import { IResponse } from '@/be-interfaces/response';
import { ZodIssue, z } from 'zod';
import { HttpStatusCodes } from '@/backend/response';
import { User, UserResponse } from '@supabase/supabase-js';

export const signUp = async (
	payload: IRegisterFormData
): Promise<IResponse<{ user: User }>> => {
	const { errored, message } = verifySignupPayload(payload);
	if (errored)
		return {
			init: { status: HttpStatusCodes.BAD_REQUEST, statusText: message },
		};
	else {
		const {
			emailAddress,
			password,
			number: { countryCode, phoneNumber } = {},
			name,
		} = payload;
		return auth.admin
			.createUser({
				email: emailAddress,
				password,
				...(countryCode &&
					phoneNumber && { phone: `+${countryCode}${phoneNumber}` }),
				user_metadata: {
					name,
				},
				app_metadata: {
					APP_NAME: 'bagpacker',
				},
			})
			.catch((error) => {
				console.log('Error = ', error);
				return {
					init: {
						status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
						statusText: error.message,
					},
				};
			})
			.then((res) => {
				const { data: { user } = {}, error } = res as UserResponse;
				if (!user)
					return {
						init: {
							status: error?.status ?? HttpStatusCodes.INTERNAL_SERVER_ERROR,
							statusText: error?.message,
						},
					};
				return {
					body: { user },
					init: { status: 201, statusText: 'User Created successfully' },
				};
			});
	}
};

const errorFormatter = (err: ZodIssue[]): string =>
	err.reduce((acc, curr) => {
		const { path, message } = curr;
		return acc + `For ${path}: ${message} ||`;
	}, 'Invalid form fields:');

const verifySignupPayload = (
	payload: IRegisterFormData
): { errored: boolean; message?: string } => {
	const parsed = z
		.object({
			name: z.string().min(2, 'Name must have at least 2 characters'),
			emailAddress: z.string().email('Invalid email address'),
			password: z
				.string()
				.min(8, 'Password must be at least 8 characters long')
				.regex(
					/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_\-+=]).{8,}$/,
					'Password must have at least one uppercase letter, one lowercase letter, one digit, and one special symbol'
				),
			reEnterPassword: z.string(),
			number: z
				.object({
					countryCode: z.number().min(1, 'Invalid country code'),
					phoneNumber: z.number().min(1, 'Invalid phone number'),
				})
				.optional(),
		})
		.refine(({ password, reEnterPassword }) => password === reEnterPassword, {
			message: "The passwords doesn't match",
			path: ['password', 'reEnterPassword'],
		})
		.safeParse(payload);
	if (parsed.success) return { errored: false };
	const { error: { errors = [] } = {} } = parsed;
	return { errored: true, message: errorFormatter(errors) };
};
