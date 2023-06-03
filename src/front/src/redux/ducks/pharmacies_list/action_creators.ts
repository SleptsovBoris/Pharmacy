import { IPharmacy } from 'api/types/pharmacy';
import {
  ADD_PHARMACIES,
  SET_ERROR,
  SET_PHARMACIES,
  SET_PHARMACIES_FETCHING,
  FETCH_PHARMACIES,
} from './action_types';

export const fetchPharmacies = (filters: any, isLoadingMore = false) =>
  ({ type: FETCH_PHARMACIES, payload: { filters, isLoadingMore } } as const);

export const setPharmaciesFetching = (
  isFetching: boolean,
  isFetchingMore: boolean
) =>
  ({
    type: SET_PHARMACIES_FETCHING,
    payload: { isFetching, isFetchingMore },
  } as const);

export const setPharmacies = (pharmacies: IPharmacy[]) =>
  ({ type: SET_PHARMACIES, payload: pharmacies } as const);

export const addPharmacies = (pharmacies: IPharmacy[]) =>
  ({ type: ADD_PHARMACIES, payload: pharmacies } as const);

export const setError = (errorMessage: string) =>
  ({ type: SET_ERROR, payload: errorMessage } as const);
