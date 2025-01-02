import { model, Schema } from "mongoose";
import type { IStudent } from "./student.types";
import { BLOOD_GROUPS, EDUCATION_BOARDS, EXAMINATION_NAMES } from './student.constants';

export const studentSchema = new Schema<IStudent>(
	{
		courseName: {
			type: String,
			enum: [
				'Basic Computer',
				'Web Development',
				'Data Entry',
				'Digital Marketing',
			],
			required: [true, 'Course name is required!'],
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
			required: [true, 'Registration id is required!'],
		},
		studentName: {
			type: String,
			trim: true,
			required: [true, 'Student name is required!'],
		},
		fatherName: {
			type: String,
			trim: true,
			required: [true, 'Father’s name is required!'],
		},
		motherName: {
			type: String,
			trim: true,
			required: [true, 'Mother’s name is required!'],
		},
		dateOfBirth: {
			type: Date,
			required: [true, 'Date of birth is required!'],
		},
		maritalStatus: {
			type: String,
			enum: ['married', 'unmarried'],
			required: [true, 'Marital status is required!'],
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
			enum: BLOOD_GROUPS,
			default: "",
		},
		NID: {
			type: String,
			trim: true,
			default: null,
		},
		studentMobile: {
			type: String,
			trim: true,
			required: [true, 'Student mobile is required!'],
		},
		guardianMobile: {
			type: String,
			trim: true,
			default: '',
		},
		studentEmail: {
			type: String,
			required: [true, 'Student email is required!'],
			trim: true,
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
			examination: {
				type: String,
				enum: EXAMINATION_NAMES,
				default: null,
			},
			GPA: { type: Number, default: null },
			board: {
				type: String,
				enum: EDUCATION_BOARDS,
				default: "",
			},
			passingYear: {
				type: String,
				trim: true,
				default: null,
			},
		},
	},
	{ timestamps: true },
);

export const Student = model<IStudent>('Student', studentSchema);
