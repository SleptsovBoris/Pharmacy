import { IDrug } from 'api/types/product';
import {
  ADD_PRODUCTS,
  FETCH_PRODUCTS,
  SET_ERROR,
  SET_PRODUCTS,
  SET_PRODUCTS_FETCHING,
} from './action_types';

export const fetchProducts = (isLoadingMore = false) =>
  ({ type: FETCH_PRODUCTS, payload: isLoadingMore } as const);

export const setProductsFetching = (
  isFetching: boolean,
  isFetchingMore: boolean
) =>
  ({
    type: SET_PRODUCTS_FETCHING,
    payload: { isFetching, isFetchingMore },
  } as const);

export const setProducts = (products: IDrug[]) =>
  ({ type: SET_PRODUCTS, payload: products } as const);

export const addProducts = (products: IDrug[]) =>
  ({ type: ADD_PRODUCTS, payload: products } as const);

export const setError = (errorMessage: string) =>
  ({ type: SET_ERROR, payload: errorMessage } as const);
