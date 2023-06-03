import baseApiClient from 'api/common/base_api_client';
import { IPharmacy } from 'api/types/pharmacy';
import apiPaths from 'constants/api_paths';
import QueryString from 'qs';

export const getPharmaciesList = async (filters: any) =>
  baseApiClient.get<IPharmacy[]>(
    apiPaths.pharmaciesList + '?' + QueryString.stringify(filters)
  );
