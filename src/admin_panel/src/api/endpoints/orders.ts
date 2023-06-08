import baseApiClient from 'api/common/base_api_client';
import { IOrder, IPutOrder } from 'api/types/order';
import apiPaths from 'constants/api_paths';

export const getOrdersList = async () =>
  baseApiClient.get<IOrder[]>(apiPaths.orders + '/all');

export const updateOrderState = async (putOrder: IPutOrder) =>
  baseApiClient.put<boolean>(apiPaths.orders, putOrder);
