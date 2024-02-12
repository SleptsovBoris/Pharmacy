import baseApiClient from 'api/common/base_api_client';
import { IDrug } from 'api/types/product';
import apiPaths from 'constants/api_paths';
import QueryString from 'qs';

export const getProductsList = async (filters: any) =>
  baseApiClient.get<IDrug[]>(
    apiPaths.drugs + '?' + QueryString.stringify(filters)
  );

export const updateProduct = async (drug: IDrug) =>
  baseApiClient.patch<boolean>(apiPaths.drugs, drug);
