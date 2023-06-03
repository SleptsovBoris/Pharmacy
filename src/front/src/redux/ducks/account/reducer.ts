import * as actionTypes from './action_types';
import { ActionsType } from './types';

export interface IAccount {
  token: string;
  type: 'authorized' | 'anonymous';
  phone?: string;
}

export interface IAccountState {
  account?: IAccount;
}

const defaultState: IAccountState = {
  account: undefined,
};

const reducer = (
  state: IAccountState = defaultState,
  action: ActionsType
): IAccountState => {
  switch (action.type) {
    case actionTypes.SET_USER: {
      return {
        account: action.payload,
      } as IAccountState;
    }

    case actionTypes.UPDATE_USER: {
      return {
        account: action.payload,
      } as IAccountState;
    }

    case actionTypes.RESET_USER: {
      return {
        account: undefined,
      } as IAccountState;
    }

    default:
      return state;
  }
};

export default reducer;
