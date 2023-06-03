import baseApiClient from 'api/common/base_api_client';
import { IDrug } from 'api/types/product';
import apiPaths from 'constants/api_paths';

export const getProductsList = async () =>
  baseApiClient.get<IDrug[]>(apiPaths.products);

export const updateProduct = async (product: IDrug) =>
  baseApiClient.put<boolean>(apiPaths.products, product);
