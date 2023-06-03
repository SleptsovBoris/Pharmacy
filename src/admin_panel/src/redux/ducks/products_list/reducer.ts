import { IDrug } from 'api/types/product';
import * as actionTypes from './action_types';
import { ActionsType } from './types';

export interface IProductsListState {
  items: IDrug[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error?: string;
}

const defaultState: IProductsListState = {
  items: [],
  isLoading: true,
  isLoadingMore: false,
  error: undefined,
};

const reducer = (
  state: IProductsListState = defaultState,
  action: ActionsType
): IProductsListState => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS_FETCHING: {
      if (action.payload.isFetchingMore) {
        return {
          items: state.items,
          isLoading: true,
          isLoadingMore: true,
        } as IProductsListState;
      }

      return {
        items: [],
        isLoading: true,
        isLoadingMore: false,
      } as IProductsListState;
    }

    case actionTypes.SET_PRODUCTS: {
      return {
        items: action.payload,
        isLoading: false,
        isLoadingMore: false,
      } as IProductsListState;
    }

    case actionTypes.ADD_PRODUCTS: {
      return {
        items: [...state.items, ...action.payload],
        isLoading: false,
        isLoadingMore: false,
      } as IProductsListState;
    }

    case actionTypes.SET_ERROR: {
      return {
        items: [],
        isLoading: false,
        isLoadingMore: false,
        error: action.payload,
      } as IProductsListState;
    }

    default:
      return state;
  }
};

export default reducer;
