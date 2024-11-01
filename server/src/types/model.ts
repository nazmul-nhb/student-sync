import { Document } from 'mongoose';
import { IStudentData, IUserData } from './interfaces';

export interface IUser extends IUserData {
	created: Date;
}

export interface IUser extends Document {}

export interface IStudent extends IStudentData {
	trainingLocation: 'Guler Mor, Natuarpara, Kazipur, Sirajganj';
	courseDuration: '6 months';
}

export interface IStudent extends Document {}
