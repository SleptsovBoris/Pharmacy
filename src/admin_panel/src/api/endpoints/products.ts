import baseApiClient from 'api/common/base_api_client';
import { IDrug } from 'api/types/product';
import apiPaths from 'constants/api_paths';

export const getProductsList = async () =>
  baseApiClient.get<IDrug[]>(apiPaths.drugs);

export const updateProduct = async (drug: IDrug) =>
  baseApiClient.patch<boolean>(apiPaths.drugs, drug);
