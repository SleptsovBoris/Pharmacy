import { IDrug } from 'api/types/product';
import * as actionTypes from './action_types';
import { ActionsType } from './types';

export type CartItem = IDrug & {
  count: number;
};

export interface ICartListState {
  items: CartItem[];
}

const defaultState: ICartListState = {
  items: [],
};

const reducer = (
  state: ICartListState = defaultState,
  action: ActionsType
): ICartListState => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload.drugId
      );
      if (!productInCartList) {
        return {
          ...state,
          items: [...state.items, { ...action.payload, count: 1 }],
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.INCREMENT_PRODUCT_COUNT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload
      );
      if (productInCartList && productInCartList.count < 100) {
        productInCartList!.count++;
        return {
          items: state.items,
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.DECREMENT_PRODUCT_COUNT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload
      );
      if (productInCartList && productInCartList.count > 0) {
        productInCartList!.count--;
        return {
          items: state.items,
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.SET_PRODUCT_COUNT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload.productId
      );
      if (
        productInCartList &&
        Number.isInteger(action.payload.newCount) &&
        action.payload.newCount < 100 &&
        action.payload.newCount > 0
      ) {
        productInCartList!.count = action.payload.newCount;
        return {
          items: state.items,
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.REMOVE_PRODUCT: {
      const productInCartList = state.items.find(
        cartItem => cartItem.drugId == action.payload
      );
      if (productInCartList) {
        return {
          items: state.items.filter(
            cartItem => cartItem.drugId != action.payload
          ),
        } as ICartListState;
      }
      return state;
    }

    case actionTypes.CLEAR_CART: {
      return {
        items: [],
      } as ICartListState;
    }

    default:
      return state;
  }
};

export default reducer;
