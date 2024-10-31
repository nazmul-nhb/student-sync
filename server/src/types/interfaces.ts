export interface IErrorObject extends Error {
	status?: number;
}

export interface IUserDetails {
	name: string;
	email: string;
	image: string;
	password: string;
}

export interface ICredentials {
	email: string;
	password: string;
}

export interface IValidationResult {
	validPassword: string | null;
	validationError: string | null;
}
