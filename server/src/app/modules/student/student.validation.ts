import { z } from 'zod';
import {
	BLOOD_GROUPS,
	COURSE,
	EDUCATION_BOARDS,
	EXAMINATION_NAMES,
} from './student.constants';
import { isMoreThan14 } from '../../utilities/validationUtils';

const creationSchema = z.object({
	courseName: z.enum(Object.keys(COURSE) as [keyof typeof COURSE]),
	studentName: z.string().trim().min(1, 'Student name is required'),
	fatherName: z.string().trim().min(1, 'Father’s name is required'),
	motherName: z.string().trim().min(1, 'Mother’s name is required'),
	dateOfBirth: z
		.preprocess(
			(value) => (typeof value === 'string' ? new Date(value) : value),
			z.date(),
		)
		.refine((date) => isMoreThan14(date), {
			message: 'Student must be at least 14 years old',
		}),
	maritalStatus: z.enum(['married', 'unmarried']),
	gender: z.enum(['male', 'female', 'others']),
	highestEducation: z.string().nullable().optional(),
	occupation: z.string().nullable().optional(),
	instituteName: z.string().nullable().optional(),
	address: z.object({
		village: z.string().trim().min(1, 'Village is required'),
		ward: z.string().trim().min(1, 'Ward is required'),
		union: z.string().trim().min(1, 'Union is required'),
		postOffice: z.string().trim().min(1, 'Post Office is required'),
		upazila: z.string().trim().min(1, 'Upazila is required'),
		district: z.string().trim().min(1, 'District is required'),
	}),
	bloodGroup: z.enum(BLOOD_GROUPS).nullable().optional(),
	NID: z.string().nullable().optional(),
	studentMobile: z.string().trim().min(1, 'Student mobile is required'),
	guardianMobile: z.string().trim().nullable().optional(),
	studentEmail: z.string().email('Invalid email address!'),
	minimumEducation: z
		.object({
			roll: z.string().nullable().optional(),
			registration: z.string().nullable().optional(),
			examination: z.enum(EXAMINATION_NAMES).nullable().optional(),
			GPA: z.number().nullable().optional(),
			board: z.enum(EDUCATION_BOARDS).nullable(),
			passingYear: z.string().nullable().optional(),
		})
		.optional(),
});

export const studentValidation = { creationSchema };
