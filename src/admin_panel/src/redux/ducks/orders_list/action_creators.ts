import { IOrder } from 'api/types/order';
import {
  ADD_ORDERS,
  FETCH_ORDERS,
  SET_ERROR,
  SET_ORDERS,
  SET_ORDERS_FETCHING,
  SET_ORDER_STATE,
} from './action_types';

export const setOrderState = (orderState: number) =>
  ({ type: SET_ORDER_STATE, payload: orderState } as const);

export const fetchOrders = (isLoadingMore = false) =>
  ({ type: FETCH_ORDERS, payload: isLoadingMore } as const);

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

export const setError = (errorMessage: string) =>
  ({ type: SET_ERROR, payload: errorMessage } as const);
