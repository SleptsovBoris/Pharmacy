import { IDrug } from 'api/types/drug';
import * as actionTypes from './action_types';
import { ActionsType } from './types';
import { CartItem } from '../cart_list';
import { IPharmacy } from 'api/types/pharmacy';

export interface IOrder {
  id?: number;
  products: CartItem[];
  totalPrice: number;
  date: Date;
  pharmacy: IPharmacy;
}

export type IOrders = IDrug & {
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

    case actionTypes.CLEAR_ORDER: {
      return {
        items: [],
      } as IOrdersListState;
    }

    default:
      return state;
  }
};

export default reducer;
