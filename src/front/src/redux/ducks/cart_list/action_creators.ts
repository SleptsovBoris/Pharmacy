import { IProduct } from 'api/baseApi/models/Product';
import {
  ADD_PRODUCT,
  INCREMENT_PRODUCT_COUNT,
  DECREMENT_PRODUCT_COUNT,
  SET_PRODUCT_COUNT,
  REMOVE_PRODUCT,
  CLEAR_CART,
} from './action_types';

export const addProduct = (product: IProduct) =>
  ({ type: ADD_PRODUCT, payload: product } as const);

export const incrementProductCount = (productId: number) =>
  ({ type: INCREMENT_PRODUCT_COUNT, payload: productId } as const);

export const decrementProductCount = (productId: number) =>
  ({ type: DECREMENT_PRODUCT_COUNT, payload: productId } as const);

export const setProductCount = (productId: number, newCount: number) =>
  ({
    type: SET_PRODUCT_COUNT,
    payload: { productId: productId, newCount: newCount },
  } as const);

export const removeProduct = (productId: number) =>
  ({ type: REMOVE_PRODUCT, payload: productId } as const);

export const clearCart = () => ({ type: CLEAR_CART } as const);
