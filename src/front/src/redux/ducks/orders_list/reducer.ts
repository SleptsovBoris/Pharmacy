import { IProduct } from 'api/baseApi/models/Product';
import * as actionTypes from './action_types';
import { ActionsType } from './types';
import { CartItem } from '../cart_list';

export interface IOrder {
  id?: number;
  products: CartItem[];
  totalPrice: number;
  date: Date;
}

export type IOrders = IProduct & {
  count: number;
};

export interface IOrdersListState {
  items: IOrder[];
}

const defaultState: IOrdersListState = {
  items: [],
};

const reducer = (
  state: IOrdersListState = defaultState,
  action: ActionsType
): IOrdersListState => {
  switch (action.type) {
    case actionTypes.ADD_ORDER: {
      return {
        items: [{ ...action.payload, count: 1 } as IOrder, ...state.items],
      } as IOrdersListState;
    }

    default:
      return state;
  }
};

export default reducer;
