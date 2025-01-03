import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';
import { User } from '../user/user.model';
import type { IUser } from '../user/user.types';
import { Student } from './student.model';
import type { IStudentData, IStudentMinimal } from './student.types';

const createStudentInDB = async (payload: IStudentData, email?: string) => {
	const user = await User.validateUser(email);

	payload.user = user._id;

	const newStudent = await Student.create(payload);

	return newStudent.registrationID;
};

const getStudentDataFromDB = async (registrationID: string) => {
	const student = await Student.findOne({ registrationID }).populate(
		'user',
		'name email image',
	);

	if (!student) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`Student not found with registration id ${registrationID}!`,
			STATUS_CODES.NOT_FOUND,
			'student',
		);
	}

	return student;
};

const getAllStudentDataFromDB = async () => {
	const students = await Student.find()
		.select('_id courseName registrationID')
		.populate('user', 'name email image');

	const studentsMinimal: IStudentMinimal[] = students.map((student) => {
		return {
			_id: student._id,
			studentName: (student.user as IUser).name,
			studentEmail: (student.user as IUser).email,
			studentImage: (student.user as IUser).image,
			courseName: student.courseName,
			registrationID: student.registrationID,
		};
	});

	return studentsMinimal;
};

export const studentServices = {
	createStudentInDB,
	getStudentDataFromDB,
	getAllStudentDataFromDB,
};
