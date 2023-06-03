import { ADD_ORDER, CLEAR_ORDER } from './action_types';
import { IOrder } from './reducer';

export const addOrder = (order: IOrder) =>
  ({ type: ADD_ORDER, payload: order } as const);

export const clearOrders = () => ({ type: CLEAR_ORDER } as const);
