import * as actionTypes from './action_types';
import { ActionsType } from './types';
import { CartItem } from 'api/types/cart';
import {
  addToCartAPI,
  removeProductAPI,
  setProductCountAPI,
} from 'api/endpoints/cart';

export interface ICartListState {
  items: CartItem[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error?: string;
}

const defaultState: ICartListState = {
  items: [],
  isLoading: true,
  isLoadingMore: false,
  error: undefined,
};

const reducer = (
  state: ICartListState = defaultState,
  action: ActionsType
): ICartListState => {
  switch (action.type) {
    case actionTypes.SET_CART_ITEMS_FETCHING: {
      if (action.payload.isFetchingMore) {
        return {
          items: state.items,
          isLoading: true,
          isLoadingMore: true,
        } as ICartListState;
      }

      return {
        items: [],
        isLoading: true,
        isLoadingMore: false,
      } as ICartListState;
    }

    case actionTypes.SET_CART_ITEMS: {
      return {
        items: action.payload,
        isLoading: false,
        isLoadingMore: false,
      } as ICartListState;
    }

    case actionTypes.ADD_CART_ITEMS: {
      return {
        items: [...state.items, ...action.payload],
        isLoading: false,
        isLoadingMore: false,
      } as ICartListState;
    }

    case actionTypes.ADD_PRODUCT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload.drug.drugId
      );
      if (!productInCartList) {
        addToCartAPI(
          {
            drug: action.payload.drug,
            drugId: action.payload.drug.drugId,
            amount: 1,
            pricePerOne: action.payload.drug.price,
          },
          action.payload.token
        );
        return {
          ...state,
          items: [
            ...state.items,
            {
              drug: action.payload.drug,
              drugId: action.payload.drug.drugId,
              amount: 1,
              ricePerOne: action.payload.drug.price,
            },
          ],
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.INCREMENT_PRODUCT_COUNT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload.drugId
      );
      if (productInCartList && productInCartList.amount < 100) {
        productInCartList.amount++;
        console.log(productInCartList.amount);
        setProductCountAPI(
          action.payload.drugId,
          productInCartList.amount,
          action.payload.token
        );
        return {
          items: state.items,
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.DECREMENT_PRODUCT_COUNT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload.drugId
      );
      if (productInCartList && productInCartList.amount > 0) {
        productInCartList.amount--;
        console.log(productInCartList.amount);
        setProductCountAPI(
          action.payload.drugId,
          productInCartList.amount,
          action.payload.token
        );
        return {
          items: state.items,
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.SET_PRODUCT_COUNT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload.drugId
      );
      if (
        productInCartList &&
        Number.isInteger(action.payload.newCount) &&
        action.payload.newCount < 100 &&
        action.payload.newCount > 0
      ) {
        productInCartList.amount = action.payload.newCount;
        console.log(action.payload.newCount);
        setProductCountAPI(
          action.payload.drugId,
          action.payload.newCount,
          action.payload.token
        );
        return {
          items: state.items,
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.REMOVE_PRODUCT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload.drugId
      );
      if (productInCartList) {
        removeProductAPI(productInCartList.drug.drugId, action.payload.token);
        return {
          items: state.items.filter(
            cartItem => cartItem.drug.drugId != action.payload.drugId
          ),
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.CLEAR_CART: {
      return {
        items: [],
        isLoading: false,
        isLoadingMore: false,
      } as ICartListState;
    }

    case actionTypes.SET_ERROR: {
      return {
        items: [],
        isLoading: false,
        isLoadingMore: false,
        error: action.payload,
      } as ICartListState;
    }

    default:
      return state;
  }
};

export default reducer;
