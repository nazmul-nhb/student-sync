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

export interface IErrorResponse extends IStatusResponse {
  status: number;
}

export interface IUser extends Omit<IUserRegister, 'password'> {
  _id: string;
  __v: number;
  exp: number;
  iat: number;
  created: Date | string;
}

export interface ISignatureData {
  signature: string;
  timestamp: number;
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
    ward: string | null;
    union: string;
    postOffice: string;
    upazila: string;
    district: string;
  };
  bloodGroup: TBloodGroup | '';
  NID: string | null;
  studentMobile: string | null;
  guardianMobile: string | null;
  studentEmail: string;
  minimumEducation: {
    roll: string | string | null;
    registration: string | string | null;
    GPA: string | null;
    board: TBoard | '';
  };
}
