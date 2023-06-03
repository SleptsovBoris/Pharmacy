import baseApiClient from 'api/common/base_api_client';
import { IDrug } from 'api/types/drug';
import apiPaths from 'constants/api_paths';
import QueryString from 'qs';

export const getDrugsList = async (filters: any) =>
  baseApiClient.get<IDrug[]>(
    apiPaths.drugsList + '?' + QueryString.stringify(filters)
  );
