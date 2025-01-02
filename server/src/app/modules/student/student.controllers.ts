import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { studentServices } from './student.services';
import type { IStudentData } from './student.types';

const registerStudent = catchAsync(async (req, res) => {
	const studentData = req.body as IStudentData;

	const registrationID = await studentServices.createStudentInDB(studentData);

	sendResponse(res, 'Student', 'POST', { registrationID });
});

export const studentControllers = { registerStudent };
