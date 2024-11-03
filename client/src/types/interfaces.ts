import type { RouteMeta } from 'vue-router';
import type { TBloodGroup, TBoard } from './types';

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
  accessToken: string;
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
  exp: number;
  iat: number;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
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
  courseName: string;
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
  guardianMobile: string | '';
  studentEmail: string;
  minimumEducation: {
    roll: string | string | null;
    registration: string | string | null;
    GPA: number | null;
    board: TBoard;
    passingYear: string | null;
  };
}

export interface IStudent extends Required<IStudentData> {
  _id: string;
  trainingLocation: 'Guler Mor, Natuarpara, Kazipur, Sirajganj';
  courseDuration: '6 months';
  registrationID: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IStudentResponse extends IStatusResponse {
  studentData: IStudent;
}

export interface IStudentsResponse extends IStatusResponse {
  studentData: IStudent[];
}
