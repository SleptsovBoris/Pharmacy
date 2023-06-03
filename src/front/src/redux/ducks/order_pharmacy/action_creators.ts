import { IPharmacy } from 'api/types/pharmacy';
import { SET_PHARMACY, RESET_PHARMACY } from './action_types';

export const setOrderPharmacy = (pharmacy: IPharmacy) =>
  ({ type: SET_PHARMACY, payload: pharmacy } as const);

export const resetOrderPharmacy = () => ({ type: RESET_PHARMACY } as const);
