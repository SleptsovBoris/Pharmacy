import { IPharmacy } from 'api/types/pharmacy';
import * as actionTypes from './action_types';
import { ActionsType } from './types';

export interface IFavorPharmaciesListState {
  items: IPharmacy[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error?: string;
}

const defaultState: IFavorPharmaciesListState = {
  items: [],
  isLoading: true,
  isLoadingMore: false,
  error: undefined,
};

const reducer = (
  state: IFavorPharmaciesListState = defaultState,
  action: ActionsType
): IFavorPharmaciesListState => {
  switch (action.type) {
    case actionTypes.SET_FAVOR_PHARMACIES_FETCHING: {
      if (action.payload.isFetchingMore) {
        return {
          items: state.items,
          isLoading: true,
          isLoadingMore: true,
        } as IFavorPharmaciesListState;
      }

      return {
        items: [],
        isLoading: true,
        isLoadingMore: false,
      } as IFavorPharmaciesListState;
    }

    case actionTypes.SET_FAVOR_PHARMACIES: {
      return {
        items: action.payload,
        isLoading: false,
        isLoadingMore: false,
      } as IFavorPharmaciesListState;
    }

    case actionTypes.ADD_FAVOR_PHARMACIES: {
      return {
        items: [...state.items, ...action.payload],
        isLoading: false,
        isLoadingMore: false,
      } as IFavorPharmaciesListState;
    }

    case actionTypes.SET_ERROR: {
      return {
        items: [],
        isLoading: false,
        isLoadingMore: false,
        error: action.payload,
      } as IFavorPharmaciesListState;
    }

    default:
      return state;
  }
};

export default reducer;
