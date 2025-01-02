import { Student } from './student.model';
import type { IStudentData, IStudentMinimal } from './student.types';

const createStudentInDB = async (payload: IStudentData) => {
	const newStudent = await Student.create(payload);

	return newStudent.registrationID;
};

const getStudentDataFromDB = async (registrationID: string) => {
	const studentData = await Student.findOne({ registrationID });

	return studentData;
};

const getAllStudentDataFromDB = async () => {
	const students: IStudentMinimal[] = await Student.aggregate([
		// Lookup to find corresponding user based on studentEmail
		{
			$lookup: {
				from: 'users',
				localField: 'studentEmail',
				foreignField: 'email',
				as: 'userInfo',
			},
		},
		// Unwind to turn the userInfo array into an object (if match exists)
		{
			$unwind: {
				path: '$userInfo',
				preserveNullAndEmptyArrays: true,
			},
		},

		// Add studentImage field from userInfo's image
		{
			$addFields: {
				studentImage: '$userInfo.image',
			},
		},

		// Select only required fields and exclude userInfo
		{
			$project: {
				_id: 1,
				studentName: 1,
				courseName: 1,
				registrationID: 1,
				studentImage: 1,
			},
		},
	]);

	return students;
};

export const studentServices = {
	createStudentInDB,
	getStudentDataFromDB,
	getAllStudentDataFromDB,
};
