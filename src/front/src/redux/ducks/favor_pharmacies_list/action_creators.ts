import { IPharmacy } from 'api/types/pharmacy';
import {
  ADD_FAVOR_PHARMACIES,
  SET_ERROR,
  SET_FAVOR_PHARMACIES,
  SET_FAVOR_PHARMACIES_FETCHING,
  FETCH_FAVOR_PHARMACIES,
} from './action_types';

export const fetchFavorPharmacies = (isLoadingMore = false) =>
  ({ type: FETCH_FAVOR_PHARMACIES, payload: isLoadingMore } as const);

export const setFavorPharmaciesFetching = (
  isFetching: boolean,
  isFetchingMore: boolean
) =>
  ({
    type: SET_FAVOR_PHARMACIES_FETCHING,
    payload: { isFetching, isFetchingMore },
  } as const);

export const setFavorPharmacies = (favorPharmacies: IPharmacy[]) =>
  ({ type: SET_FAVOR_PHARMACIES, payload: favorPharmacies } as const);

export const addFavorPharmacies = (favorPharmacies: IPharmacy[]) =>
  ({ type: ADD_FAVOR_PHARMACIES, payload: favorPharmacies } as const);

export const setError = (errorMessage: string) =>
  ({ type: SET_ERROR, payload: errorMessage } as const);
