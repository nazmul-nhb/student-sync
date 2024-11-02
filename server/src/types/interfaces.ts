import type { IStudent } from './model';
import type { TBloodGroup, TBoard } from './types';

export interface IErrorObject extends Error {
	status?: number;
}

export interface IMongoDuplicateKeyError {
	code: number;
	keyValue: Record<string, unknown>;
}

export interface ICredentials {
	email: string;
	password: string;
}

export interface IUserData extends ICredentials {
	name: string;
	image: string;
}

export interface IValidationResult {
	validPassword: string | null;
	validationError: string | null;
}

export interface IStudentData {
	courseName: string;
	studentName: string;
	fatherName: string;
	motherName: string;
	dateOfBirth: Date;
	maritalStatus: 'married' | 'unmarried';
	gender: 'male' | 'female' | 'others';
	highestEducation: string | null;
	occupation: string | null;
	instituteName: string | null;
	address: {
		village: string;
		ward: string;
		union: string;
		postOffice: string;
		upazila: string;
		district: string;
	};
	bloodGroup: TBloodGroup;
	NID: string | null;
	studentMobile: string;
	guardianMobile: string | '';
	studentEmail: string;
	minimumEducation: {
		roll: string | string | null;
		registration: string | string | null;
		GPA: number | null;
		board: TBoard | null;
	};
}

export interface IStatusResponse {
	success: boolean;
	message: string;
}

export interface ILoginResponse extends IStatusResponse {
	accessToken: string;
}

export interface IRegResponse extends IStatusResponse {
	registrationID: string;
}

export interface IStudentResponse extends IStatusResponse {
	studentData: IStudent;
}

export interface IStudentsResponse extends IStatusResponse {
	studentData: IStudent[];
}
