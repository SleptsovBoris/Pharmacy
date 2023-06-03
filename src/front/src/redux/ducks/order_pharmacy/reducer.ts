import { IPharmacy } from 'api/types/pharmacy';
import * as actionTypes from './action_types';
import { ActionsType } from './types';

export interface IOrderPharmacyState {
  pharmacy?: IPharmacy;
}

const defaultState: IOrderPharmacyState = {
  pharmacy: undefined,
};

const reducer = (
  state: IOrderPharmacyState = defaultState,
  action: ActionsType
): IOrderPharmacyState => {
  switch (action.type) {
    case actionTypes.SET_PHARMACY: {
      return {
        pharmacy: action.payload,
      } as IOrderPharmacyState;
    }

    case actionTypes.RESET_PHARMACY: {
      return {
        pharmacy: undefined,
      } as IOrderPharmacyState;
    }

    default:
      return state;
  }
};

export default reducer;
