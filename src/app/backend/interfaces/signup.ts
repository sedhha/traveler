export interface IRegisterFormData {
	name: string;
	emailAddress: string;
	password: string;
	reEnterPassword: string;
	number?: {
		countryCode: number;
		phoneNumber: number;
	};
}
