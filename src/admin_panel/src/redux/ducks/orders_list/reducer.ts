import * as actionTypes from './action_types';
import { ActionsType } from './types';
import { IOrder } from 'api/types/order';

export interface IOrdersListState {
  items: IOrder[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error?: string;
}

const defaultState: IOrdersListState = {
  items: [],
  isLoading: true,
  isLoadingMore: false,
  error: undefined,
};

const reducer = (
  state: IOrdersListState = defaultState,
  action: ActionsType
): IOrdersListState => {
  switch (action.type) {
    case actionTypes.SET_ORDERS_FETCHING: {
      if (action.payload.isFetchingMore) {
        return {
          items: state.items,
          isLoading: true,
          isLoadingMore: true,
        } as IOrdersListState;
      }

      return {
        items: [],
        isLoading: true,
        isLoadingMore: false,
      } as IOrdersListState;
    }

    case actionTypes.SET_ORDERS: {
      return {
        items: action.payload,
        isLoading: false,
        isLoadingMore: false,
      } as IOrdersListState;
    }

    case actionTypes.ADD_ORDERS: {
      return {
        items: [...state.items, ...action.payload],
        isLoading: false,
        isLoadingMore: false,
      } as IOrdersListState;
    }

    case actionTypes.SET_ERROR: {
      return {
        items: [],
        isLoading: false,
        isLoadingMore: false,
        error: action.payload,
      } as IOrdersListState;
    }

    case actionTypes.SET_ORDER_STATE: {
      return {
        items: [...state.items],
      } as IOrdersListState;
    }

    default:
      return state;
  }
};

export default reducer;
