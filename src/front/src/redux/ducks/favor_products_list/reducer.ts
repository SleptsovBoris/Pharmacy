import { IDrug } from 'api/types/drug';
import * as actionTypes from './action_types';
import { ActionsType } from './types';

export interface IFavorProductsListState {
  items: IDrug[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error?: string;
}

const defaultState: IFavorProductsListState = {
  items: [],
  isLoading: true,
  isLoadingMore: false,
  error: undefined,
};

const reducer = (
  state: IFavorProductsListState = defaultState,
  action: ActionsType
): IFavorProductsListState => {
  switch (action.type) {
    case actionTypes.SET_FAVOR_PRODUCTS_FETCHING: {
      if (action.payload.isFetchingMore) {
        return {
          items: state.items,
          isLoading: true,
          isLoadingMore: true,
        } as IFavorProductsListState;
      }

      return {
        items: [],
        isLoading: true,
        isLoadingMore: false,
      } as IFavorProductsListState;
    }

    case actionTypes.SET_FAVOR_PRODUCTS: {
      return {
        items: action.payload,
        isLoading: false,
        isLoadingMore: false,
      } as IFavorProductsListState;
    }

    case actionTypes.ADD_FAVOR_PRODUCTS: {
      return {
        items: [...state.items, ...action.payload],
        isLoading: false,
        isLoadingMore: false,
      } as IFavorProductsListState;
    }

    case actionTypes.SET_ERROR: {
      return {
        items: [],
        isLoading: false,
        isLoadingMore: false,
        error: action.payload,
      } as IFavorProductsListState;
    }

    default:
      return state;
  }
};

export default reducer;
