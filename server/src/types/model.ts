import { Document } from 'mongoose';
import { IStudentData, IUserData } from './interfaces';

export interface IUser extends IUserData {
	role: 'user' | 'admin';
}

export interface IUser extends Document {}

export interface IStudent extends IStudentData {
	trainingLocation: 'Guler Mor, Natuarpara, Kazipur, Sirajganj';
	courseDuration: '6 months';
	registrationID: string;
}

export interface IStudent extends Document {}
