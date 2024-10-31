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
  created: Date | string;
  __v: number;
}

export interface ISignatureData {
  signature: string;
  timestamp: number;
}
