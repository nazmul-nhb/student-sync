import { Schema, model } from 'mongoose';
import { IStudent } from '../types/model';
import { generateID } from '@nazmul-nhb/id-generator';

export const StudentSchema = new Schema<IStudent>(
	{
		courseName: {
			type: String,
			trim: true,
			required: [true, 'Course name is required'],
		},
		trainingLocation: {
			type: String,
			default: 'Guler Mor, Natuarpara, Kazipur, Sirajganj',
		},
		courseDuration: {
			type: String,
			default: '6 months',
		},
		registrationID: {
			type: String,
			default: () =>
				generateID({
					prefix: 'rainbow',
					caseOption: 'upper',
					separator: '',
					length: 4,
				}),
		},
		studentName: {
			type: String,
			trim: true,
			required: [true, 'Student name is required'],
		},
		fatherName: {
			type: String,
			trim: true,
			required: [true, 'Father’s name is required'],
		},
		motherName: {
			type: String,
			trim: true,
			required: [true, 'Mother’s name is required'],
		},
		dateOfBirth: {
			type: Date,
			required: [true, 'Date of birth is required'],
		},
		maritalStatus: {
			type: String,
			enum: ['married', 'unmarried'],
			required: [true, 'Marital status is required'],
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'others'],
			required: [true, 'Provide your marital status'],
		},
		highestEducation: {
			type: String,
			trim: true,
			default: null,
		},
		occupation: {
			type: String,
			trim: true,
			default: null,
		},
		instituteName: {
			type: String,
			trim: true,
			default: null,
		},
		address: {
			village: { type: String, trim: true, required: true },
			ward: { type: String, trim: true, required: true },
			union: { type: String, trim: true, required: true },
			postOffice: { type: String, trim: true, required: true },
			upazila: { type: String, trim: true, required: true },
			district: { type: String, trim: true, required: true },
		},
		bloodGroup: {
			type: String,
			enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
			default: '',
		},
		NID: {
			type: String,
			default: null,
		},
		studentMobile: {
			type: String,
			required: [true, 'Student mobile is required'],
		},
		guardianMobile: {
			type: String,
			default: '',
		},
		studentEmail: {
			type: String,
			required: [true, 'Student email is required'],
			// unique: true,
			trim: true,
			validate: {
				validator: (value: string) => {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					return emailRegex.test(value);
				},
				message: 'Provide a valid email address!',
			},
		},
		minimumEducation: {
			roll: {
				type: String,
				trim: true,
				default: null,
			},
			registration: {
				type: String,
				trim: true,
				default: null,
			},
			GPA: { type: Number, default: null },
			board: {
				type: String,
				enum: [
					'Barisal',
					'Chattagram',
					'Cumilla',
					'Dhaka',
					'Dinajpur',
					'Jessore',
					'Mymensingh',
					'Rajshahi',
					'Sylhet',
					'Technical',
					'Madrasah',
					'DIBS(Dhaka)',
					'',
				],
				default: null,
			},
		},
	},
	{ timestamps: true },
);

export const Student = model<IStudent>('Student', StudentSchema);
