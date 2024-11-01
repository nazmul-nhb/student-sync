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
				message: `Successfully Enrolled in ${savedStudent.courseName}!`,
			});
		} else {
			throw new Error('Cannot Enroll New Student!');
		}
	} catch (error) {
		next(error);
	}
};
