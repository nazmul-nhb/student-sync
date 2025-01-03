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

export interface IUser extends Omit<IUserRegister, 'password'> {
  _id: string;
  __v: number;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudentData {
  courseName: TCourse;
  // studentName: string;
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
  // studentEmail: string;
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
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  trainingLocation: string;
  courseDuration: string;
  registrationID: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IStudentMinimal {
  _id: string;
  studentName: string;
  studentEmail: string;
  studentImage: string;
  courseName: TCourse;
  registrationID: string;
}

export interface IServerResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IStatusResponse {
  success: boolean;
  message: string;
}

export interface IAccessToken {
  accessToken: string;
}

export interface IRegistrationID {
  registrationID: string;
}

export interface IErrorResponse extends IStatusResponse {
  status: number;
  error: {
    name: string;
    details: { name: string; path: string | number; message: string }[];
  };
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
