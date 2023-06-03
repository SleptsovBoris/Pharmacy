import { SET_USER, RESET_USER, UPDATE_USER } from './action_types';
import { IAccount } from './reducer';

export const setUser = (user: IAccount) =>
  ({ type: SET_USER, payload: user } as const);

export const updateUser = (user: IAccount) =>
  ({ type: UPDATE_USER, payload: user } as const);

export const resetUser = () => ({ type: RESET_USER } as const);
