import { Student } from './student.model';
import type { IStudentData } from './student.types';

const createStudentInDB = async (payload: IStudentData) => {
	const newStudent = await Student.create(payload);

	return newStudent.registrationID;
};

const getStudentDataFromDB = async (registrationID: string) => {
    const studentData = await Student.findOne({ registrationID });

    return studentData;
}

export const studentServices = { createStudentInDB, getStudentDataFromDB };
