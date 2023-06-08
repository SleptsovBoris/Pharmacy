import { AxiosResponse } from 'axios';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as actionCreators from './action_creators';
import { getDrugsList } from 'api/endpoints/products_list';
import { IDrug } from 'api/types/drug';
import locale from 'constants/locale';
import { FETCH_PRODUCTS } from './action_types';

type IFetchProductsAction = ReturnType<typeof actionCreators.fetchProducts>;

function* fetchProducts({ payload }: IFetchProductsAction) {
  yield put(actionCreators.setProductsFetching(true, payload.isLoadingMore));
  try {
    console.log('я сюда зашел');
    const response = (yield call(() =>
      getDrugsList(payload.filters)
    )) as AxiosResponse<IDrug[]>;
    if (payload.isLoadingMore) {
      yield put(actionCreators.addProducts(response.data));
    } else {
      yield put(actionCreators.setProducts(response.data));
    }
  } catch {
    yield put(actionCreators.setError(locale.responseErrorMessage));
  }
}

export default function* watch() {
  yield all([takeLatest(FETCH_PRODUCTS, fetchProducts)]);
}
