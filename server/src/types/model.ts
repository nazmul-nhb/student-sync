import { Document } from 'mongoose';
import type { TBloodGroup, TBoard } from './types';
export interface IUser extends Document {
	name: string;
	email: string;
	image: string;
	password: string;
	created: Date;
}

export interface IStudent extends Document {
	courseName: string;
	trainingLocation: 'Guler Mor, Natuarpara, Kazipur, Sirajganj';
	courseDuration: '6 months';
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
