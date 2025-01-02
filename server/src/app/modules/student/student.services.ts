import { Student } from './student.model';
import type { IStudentData } from './student.types';

const createStudentInDB = async (payload: IStudentData) => {
	const newStudent = await Student.create(payload);

	return newStudent.registrationID;
};

export const studentServices = { createStudentInDB };
