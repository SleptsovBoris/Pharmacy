import { IDrug } from 'api/types/drug';
import {
  ADD_PRODUCT,
  INCREMENT_PRODUCT_COUNT,
  DECREMENT_PRODUCT_COUNT,
  SET_PRODUCT_COUNT,
  FETCH_CART_ITEMS,
  REMOVE_PRODUCT,
  CLEAR_CART,
  SET_CART_ITEMS_FETCHING,
  SET_CART_ITEMS,
  ADD_CART_ITEMS,
  SET_ERROR,
} from './action_types';
import { CartItem } from 'api/types/cart';

export const addDrug = (drug: IDrug, token: string) =>
  ({ type: ADD_PRODUCT, payload: { drug, token } } as const);

export const fetchCartItems = (isLoadingMore = false, token: string) =>
  ({ type: FETCH_CART_ITEMS, payload: { isLoadingMore, token } } as const);

export const setCartItemsFetching = (
  isFetching: boolean,
  isFetchingMore: boolean
) =>
  ({
    type: SET_CART_ITEMS_FETCHING,
    payload: { isFetching, isFetchingMore },
  } as const);

export const setCartItems = (cartItems: CartItem[]) =>
  ({ type: SET_CART_ITEMS, payload: cartItems } as const);

export const addCartItems = (cartItems: CartItem[]) =>
  ({ type: ADD_CART_ITEMS, payload: cartItems } as const);

export const incrementDrugCount = (drugId: number, token: string) =>
  ({ type: INCREMENT_PRODUCT_COUNT, payload: { drugId, token } } as const);

export const decrementDrugCount = (drugId: number, token: string) =>
  ({ type: DECREMENT_PRODUCT_COUNT, payload: { drugId, token } } as const);

export const setDrugCount = (drugId: number, newCount: number, token: string) =>
  ({
    type: SET_PRODUCT_COUNT,
    payload: { drugId: drugId, newCount: newCount, token },
  } as const);

export const removeDrug = (drugId: number, token: string) =>
  ({ type: REMOVE_PRODUCT, payload: { drugId, token } } as const);

export const clearCart = () => ({ type: CLEAR_CART } as const);

export const setError = (errorMessage: string) =>
  ({ type: SET_ERROR, payload: errorMessage } as const);
