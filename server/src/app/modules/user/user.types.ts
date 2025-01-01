import type { Document } from 'mongoose';
import type { Model, Types } from 'mongoose';

export type TCourse =
	| 'Basic Computer'
	| 'Web Development'
	| 'Data Entry'
	| 'Digital Marketing';

export type TBloodGroup =
	| 'A+'
	| 'A-'
	| 'B+'
	| 'B-'
	| 'AB+'
	| 'AB-'
	| 'O+'
	| 'O-'
	| '';

export type TBoard =
	| 'Barisal'
	| 'Chattagram'
	| 'Cumilla'
	| 'Dhaka'
	| 'Dinajpur'
	| 'Jessore'
	| 'Mymensingh'
	| 'Rajshahi'
	| 'Sylhet'
	| 'Technical'
	| 'Madrasah'
	| 'DIBS(Dhaka)'
	| '';

export type TUserRole = 'user' | 'admin';

export interface ICredentials {
	email: string;
	password: string;
}

export interface IUserData extends ICredentials {
	name: string;
	image: string;
}

export interface IUser extends IUserData {
	role: 'user' | 'admin';
}

export interface IUser extends Document {
	_id: Types.ObjectId;
}

export interface IStudentData {
	courseName: TCourse;
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
	bloodGroup: TBloodGroup | null;
	NID: string | null;
	studentMobile: string;
	guardianMobile: string | null;
	studentEmail: string;
	minimumEducation: {
		roll: string | string | null;
		registration: string | string | null;
		examination: 'JSC' | 'SSC' | 'HSC' | null;
		GPA: number | null;
		board: TBoard | null;
		passingYear: string | null;
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

export interface IStudent extends IStudentData {
	trainingLocation: 'Guler Mor, Natuarpara, Kazipur, Sirajganj';
	courseDuration: '6 months';
	registrationID: string;
}

export interface IStudent extends Document {
	_id: Types.ObjectId;
}

export interface IStudentResponse extends IStatusResponse {
	studentData: IStudent;
}

export interface IStudentMinimal {
	_id: string;
	courseName: TCourse;
	studentName: string;
	registrationID: string;
	studentImage?: string;
}

export interface IStudentsResponse extends IStatusResponse {
	studentData: IStudentMinimal[];
}

export interface IUserModel extends Model<IUser> {
	validateUser(email?: string): Promise<IUser>;
}
