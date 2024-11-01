import type { TBloodGroup, TBoard } from './types';

export interface IErrorObject extends Error {
	status?: number;
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
		ward: number;
		union: string;
		postOffice: string;
		upazila: string;
		district: string;
	};
	bloodGroup: TBloodGroup;
	NID: number | null;
	studentMobile: number;
	guardianMobile: number | null;
	studentEmail: string;
	minimumEducation: {
		roll: number | string;
		registration: number | string;
		GPA: number;
		board: TBoard;
	} | null;
}
