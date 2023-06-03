import { IResponse } from './common';

export interface ILoginData {
  phone: string;
  password: string;
}

export interface ISignUpData {
  phone: string;
  password: string;
}

export interface IUserData {
  phone: string;
  isAnonymous: boolean;
}

export interface ILoginResponse extends IResponse<IUserData> {
  accessToken: string;
}

export interface IPutAccountData {
  phone: string;
  password: string;
}
