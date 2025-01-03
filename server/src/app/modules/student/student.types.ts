import type { Document, Types } from 'mongoose';
import type {
	BLOOD_GROUPS,
	COURSE,
	EDUCATION_BOARDS,
	EXAMINATION_NAMES,
} from './student.constants';
import type { IUser } from '../user/user.types';

export type TCourse = keyof typeof COURSE;

export type TCourseCode = (typeof COURSE)[keyof typeof COURSE];

export type TBloodGroup = (typeof BLOOD_GROUPS)[number];

export type TExamination = (typeof EXAMINATION_NAMES)[number];

export type TBoard = (typeof EDUCATION_BOARDS)[number];

export interface IStudentData {
	user: Types.ObjectId;
	courseName: TCourse;
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
	bloodGroup: TBloodGroup | null;
	NID: string | null;
	studentMobile: string;
	guardianMobile: string | null;
	minimumEducation?: {
		roll: string | string | null;
		registration: string | string | null;
		examination: TExamination | null;
		GPA: number | null;
		board: TBoard | null;
		passingYear: string | null;
	};
}

export interface IStudent extends Omit<IStudentData, 'user'>, Document {
	_id: Types.ObjectId;
	user: Types.ObjectId | IUser;
	trainingLocation: 'Guler Mor, Natuarpara, Kazipur, Sirajganj';
	courseDuration: '6 months';
	registrationID: string;
}

export interface IStudentMinimal {
	_id: Types.ObjectId;
	studentName: string;
	studentEmail: string;
	studentImage: string;
	courseName: TCourse;
	registrationID: string;
}
