import baseApiClient from 'api/common/base_api_client';
import {
  ILoginData,
  ILoginResponse,
  IPutAccountData,
  ISignUpData,
  IUserData,
} from 'api/types/account';
import { IResponse } from 'api/types/common';
import apiPaths from 'constants/api_paths';

export const signUp = async (signUpData: ISignUpData) =>
  baseApiClient.post<ILoginResponse>(apiPaths.signUp, signUpData);

export const login = async (loginData: ILoginData) =>
  baseApiClient.post<ILoginResponse>(apiPaths.login, loginData);

export const update = async (putAccountData: IPutAccountData, token: string) =>
  baseApiClient.put<IResponse<IUserData>>(apiPaths.account, putAccountData, {
    headers: { Authorization: 'Bearer ' + token },
  });
