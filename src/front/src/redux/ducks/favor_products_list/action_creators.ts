import { IDrug } from 'api/types/drug';
import {
  ADD_FAVOR_PRODUCTS,
  FETCH_FAVOR_PRODUCTS,
  SET_ERROR,
  SET_FAVOR_PRODUCTS,
  SET_FAVOR_PRODUCTS_FETCHING,
} from './action_types';

export const fetchFavorProducts = (isLoadingMore = false) =>
  ({ type: FETCH_FAVOR_PRODUCTS, payload: isLoadingMore } as const);

export const setFavorProductsFetching = (
  isFetching: boolean,
  isFetchingMore: boolean
) =>
  ({
    type: SET_FAVOR_PRODUCTS_FETCHING,
    payload: { isFetching, isFetchingMore },
  } as const);

export const setFavorProducts = (favorProducts: IDrug[]) =>
  ({ type: SET_FAVOR_PRODUCTS, payload: favorProducts } as const);

export const addFavorProducts = (favorProducts: IDrug[]) =>
  ({ type: ADD_FAVOR_PRODUCTS, payload: favorProducts } as const);

export const setError = (errorMessage: string) =>
  ({ type: SET_ERROR, payload: errorMessage } as const);
