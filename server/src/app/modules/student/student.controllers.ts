import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { studentServices } from './student.services';
import type { IStudentData } from './student.types';

const registerStudent = catchAsync(async (req, res) => {
	const studentData = req.body as IStudentData;

	const registrationID = await studentServices.createStudentInDB(studentData);

	sendResponse(res, 'Student', 'POST', { registrationID });
});

const getStudentData = catchAsync(async (req, res) => {
	const studentData = req.params.id as string;

	const student = await studentServices.getStudentDataFromDB(studentData);

	sendResponse(res, 'Student', 'GET', student);
});

const getAllStudentData = catchAsync(async (_req, res) => {
	const students = await studentServices.getAllStudentDataFromDB();

	sendResponse(
		res,
		'Student',
		'GET',
		students,
		`Total ${students.length} students registered!`,
	);
});

export const studentControllers = {
	registerStudent,
	getStudentData,
	getAllStudentData,
};
