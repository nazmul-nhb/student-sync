import type { NextFunction, Request, Response } from 'express';
import type {
	IStatusResponse,
	IRegResponse,
	IStudentData,
} from '../types/interfaces';
import { Student } from '../models/studentModel';

// Create Student Data from Form
export const createStudent = async (
	req: Request<{}, {}, IStudentData>,
	res: Response<IStatusResponse | IRegResponse>,
	next: NextFunction,
) => {
	try {
		const student = req.body;

		const newStudent = new Student(student);
		const savedStudent = await newStudent.save();

		if (savedStudent._id) {
			return res.status(201).send({
				success: true,
				message: `Successfully Enrolled in ${savedStudent.courseName}!`,
				registrationID: savedStudent.registrationID,
			});
		} else {
			throw new Error('Cannot Enroll New Student!');
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);

			return res.status(400).send({
				success: false,
				message: error.message,
			});
		}
		next(error);
	}
};

export const getStudentData = async (
	req: Request<{ registrationID: string }, { email: string }, {}>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { registrationID } = req.params;

		const studentData = await Student.findOne({ registrationID });

		if (studentData) {
			return res.status(200).send({
				success: true,
				message: `${studentData.studentName}'s Data`,
				studentData,
			});
		} else {
			throw new Error('Student Data Not Found!');
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);

			return res.status(400).send({
				success: false,
				message: error.message,
			});
		}
		next(error);
	}
};
