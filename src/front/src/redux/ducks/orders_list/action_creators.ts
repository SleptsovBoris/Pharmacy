import { IOrder } from 'api/types/order';
import {
  ADD_ORDER,
  ADD_ORDERS,
  CLEAR_ORDER,
  FETCH_ORDERS,
  SET_ERROR,
  SET_ORDERS,
  SET_ORDERS_FETCHING,
} from './action_types';

export const addOrder = (order: IOrder, token: string) =>
  ({ type: ADD_ORDER, payload: { order, token } } as const);

export const fetchOrders = (isLoadingMore = false, token: string) =>
  ({ type: FETCH_ORDERS, payload: { isLoadingMore, token } } as const);

export const setOrdersFetching = (
  isFetching: boolean,
  isFetchingMore: boolean
) =>
  ({
    type: SET_ORDERS_FETCHING,
    payload: { isFetching, isFetchingMore },
  } as const);

export const setOrders = (orders: IOrder[]) =>
  ({ type: SET_ORDERS, payload: orders } as const);

export const addOrders = (orders: IOrder[]) =>
  ({ type: ADD_ORDERS, payload: orders } as const);

export const clearOrders = () => ({ type: CLEAR_ORDER } as const);

export const setError = (errorMessage: string) =>
  ({ type: SET_ERROR, payload: errorMessage } as const);
