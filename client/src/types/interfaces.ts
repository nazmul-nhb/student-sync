import type { RouteMeta } from 'vue-router';
import type { TBloodGroup, TBoard, TCourse } from './types';
import type { JwtPayload } from 'jwt-decode';

export interface ICredentials {
  email: string;
  password: string;
}

export interface IUserRegister extends ICredentials {
  name: string;
  image: string;
}

export interface IStatusResponse {
  success: boolean;
  message: string;
}

export interface ILoginResponse extends IStatusResponse {
  data: { accessToken: string };
}

export interface IRegResponse extends IStatusResponse {
  registrationID: string;
}

export interface IErrorResponse extends IStatusResponse {
  status: number;
}

export interface IUser extends Omit<IUserRegister, 'password'> {
  _id: string;
  __v: number;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface IServerResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
}

export interface IDecodedToken extends JwtPayload {
  email: string;
  role: 'user' | 'admin';
}

export interface ISignatureData {
  signature: string;
  timestamp: number;
}

export interface IRouteMeta extends RouteMeta {
  requiresAuth?: boolean;
  roles?: ('user' | 'admin')[];
}

export interface IStudentData {
  courseName: TCourse;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: Date | null;
  maritalStatus: 'married' | 'unmarried' | '';
  gender: 'male' | 'female' | 'others' | '';
  highestEducation: string | null;
  occupation: string | null;
  instituteName: string | null;
  address: {
    village: string;
    ward: string;
    union: string;
    postOffice: string;
    upazila: string;
    district: string;
  };
  bloodGroup: TBloodGroup;
  NID: string | null;
  studentMobile: string;
  guardianMobile: string | null;
  studentEmail: string;
  minimumEducation: {
    roll: string | null;
    registration: string | null;
    examination: 'JSC' | 'SSC' | 'HSC' | '';
    GPA: number | null;
    board: TBoard;
    passingYear: string | null;
  };
}

export interface IStudent extends Required<IStudentData> {
  _id: string;
  trainingLocation: string;
  courseDuration: string;
  registrationID: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IStudentResponse extends IStatusResponse {
  studentData: IStudent;
}

export interface IStudentMinimal {
  _id: string;
  courseName: TCourse;
  studentName: string;
  registrationID: string;
  studentImage?: string;
}

export interface IStudentsResponse extends IStatusResponse {
  studentData: IStudentMinimal[];
}
