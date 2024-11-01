import { Schema, model } from 'mongoose';
import { IStudent } from '../types/model';

export const StudentSchema = new Schema<IStudent>(
	{
		courseName: {
			type: String,
			required: [true, 'Course name is required'],
			trim: true,
		},
		trainingLocation: {
			type: String,
			default: 'Guler Mor, Natuarpara, Kazipur, Sirajganj',
		},
		courseDuration: {
			type: String,
			default: '6 months',
		},
		studentName: {
			type: String,
			required: [true, 'Student name is required'],
			trim: true,
		},
		fatherName: {
			type: String,
			required: [true, 'Father’s name is required'],
			trim: true,
		},
		motherName: {
			type: String,
			required: [true, 'Mother’s name is required'],
			trim: true,
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
			default: null,
		},
		occupation: {
			type: String,
			default: null,
		},
		instituteName: {
			type: String,
			default: null,
		},
		address: {
			village: { type: String, required: true },
			ward: { type: Number, required: true },
			union: { type: String, required: true },
			postOffice: { type: String, required: true },
			upazila: { type: String, required: true },
			district: { type: String, required: true },
		},
		bloodGroup: {
			type: String,
			enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', null],
			default: null,
		},
		NID: {
			type: Number,
			default: null,
		},
		studentMobile: {
			type: Number,
			required: [true, 'Student mobile is required'],
		},
		guardianMobile: {
			type: Number,
			default: null,
		},
		studentEmail: {
			type: String,
			required: [true, 'Student email is required'],
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
				type: Schema.Types.Mixed,
				default: null,
				validate: {
					validator: (value: any) =>
						typeof value === 'string' || typeof value === 'number',
					message: 'Roll must be either a string or a number',
				},
			},
			registration: {
				type: Schema.Types.Mixed,
				default: null,
				validate: {
					validator: (value: any) =>
						typeof value === 'string' || typeof value === 'number',
					message: 'Registration must be either a string or a number',
				},
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
				],
				default: null,
			},
		},
	},
	{ timestamps: true },
);

export const Student = model<IStudent>('Student', StudentSchema);
