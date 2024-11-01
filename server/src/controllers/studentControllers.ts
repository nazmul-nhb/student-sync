import type { NextFunction, Request, Response } from 'express';
import { IStudentData } from '../types/interfaces';
import { Student } from '../models/studentModel';

// Create Student Data from Form
export const createStudent = async (
	req: Request<{}, {}, IStudentData>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const student = req.body;

		const newStudent = new Student(student);
		const savedStudent = await newStudent.save();

		if (savedStudent?._id) {
			return res.status(201).send({
				success: true,
				message: `${savedStudent.studentName} is Enrolled Successfully!`,
			});
		} else {
			throw new Error('Cannot Enroll New Student!');
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);

			if ((error as any).code === 11000) {
				return res.status(400).send({
					success: false,
					message: 'Already enrolled with this email!',
				});
			}
		}

		next(error);
	}
};
