import baseApiClient from 'api/common/base_api_client';
import { IOrder } from 'api/types/order';
import apiPaths from 'constants/api_paths';

export const getOrdersList = async (token: string) =>
  baseApiClient.get<IOrder[]>(apiPaths.orders, {
    headers: { Authorization: 'Bearer ' + token },
  });

export const addOrder = async (pharmacyId: number, token: string) =>
  baseApiClient.post(
    apiPaths.orders + `/${pharmacyId}`,
    {},
    {
      headers: { Authorization: 'Bearer ' + token },
    }
  );
