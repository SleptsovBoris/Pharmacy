import axios from 'axios';
import { CartItem } from 'api/types/cart';
import apiPaths from 'constants/api_paths';
import baseApiClient from 'api/common/base_api_client';

export const getCartList = async (token: string) =>
  baseApiClient.get<CartItem[]>(apiPaths.carts, {
    headers: { Authorization: 'Bearer ' + token },
  });

export const addToCartAPI = async (cartItem: CartItem, token: string) => {
  try {
    const response = await axios.post<CartItem[]>(
      `${apiPaths.baseApiUrl}/cart-item`,
      { drugId: cartItem.drug.drugId, amount: 1 },
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при добавлении лекарства');
  }
};

export const setProductCountAPI = async (
  drugId: number,
  count: number,
  token: string
) => {
  try {
    const response = await axios.patch<CartItem[]>(
      `${apiPaths.baseApiUrl}/cart-item`,
      { drugId, count },
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при изменении количества');
  }
};

export const removeProductAPI = async (drugId: number, token: string) => {
  try {
    const response = await axios.delete<CartItem[]>(
      `${apiPaths.baseApiUrl}/cart-item/${drugId}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при удалении');
  }
};
