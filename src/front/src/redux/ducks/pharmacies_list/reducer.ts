import { IPharmacy } from 'api/types/pharmacy';
import * as actionTypes from './action_types';
import { ActionsType } from './types';

export interface IPharmaciesListState {
  items: IPharmacy[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error?: string;
}

const defaultState: IPharmaciesListState = {
  items: [],
  isLoading: true,
  isLoadingMore: false,
  error: undefined,
};

const reducer = (
  state: IPharmaciesListState = defaultState,
  action: ActionsType
): IPharmaciesListState => {
  switch (action.type) {
    case actionTypes.SET_PHARMACIES_FETCHING: {
      if (action.payload.isFetchingMore) {
        return {
          items: state.items,
          isLoading: true,
          isLoadingMore: true,
        } as IPharmaciesListState;
      }

      return {
        items: [],
        isLoading: true,
        isLoadingMore: false,
      } as IPharmaciesListState;
    }

    case actionTypes.SET_PHARMACIES: {
      return {
        items: action.payload,
        isLoading: false,
        isLoadingMore: false,
      } as IPharmaciesListState;
    }

    case actionTypes.ADD_PHARMACIES: {
      return {
        items: [...state.items, ...action.payload],
        isLoading: false,
        isLoadingMore: false,
      } as IPharmaciesListState;
    }

    case actionTypes.SET_ERROR: {
      return {
        items: [],
        isLoading: false,
        isLoadingMore: false,
        error: action.payload,
      } as IPharmaciesListState;
    }

    default:
      return state;
  }
};

export default reducer;
