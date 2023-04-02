import { ADD_ORDER } from './action_types';
import { IOrder } from './reducer';

export const addOrder = (order: IOrder) =>
  ({ type: ADD_ORDER, payload: order } as const);
