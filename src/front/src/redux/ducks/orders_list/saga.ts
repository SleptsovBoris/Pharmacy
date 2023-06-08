import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as actionCreators from './action_creators';
import { AxiosResponse } from 'axios';
import locale from 'constants/locale';
import { FETCH_ORDERS } from './action_types';
import { IOrder } from 'api/types/order';
import { getOrdersList } from 'api/endpoints/orders_list';
import { IResponse } from 'api/types/common';

type IFetchOrdersAction = ReturnType<typeof actionCreators.fetchOrders>;

function* fetchOrders({ payload }: IFetchOrdersAction) {
  console.log('Я Адель');
  yield put(actionCreators.setOrdersFetching(true, payload.isLoadingMore));
  try {
    const response = (yield call(() =>
      getOrdersList(payload.token)
    )) as AxiosResponse<IResponse<IOrder[]>>;
    if (payload.isLoadingMore) {
      yield put(actionCreators.addOrders(response.data.data ?? []));
    } else {
      yield put(actionCreators.setOrders(response.data.data ?? []));
    }
  } catch {
    yield put(actionCreators.setError(locale.responseErrorMessage));
  }
}

export default function* watch() {
  yield all([takeLatest(FETCH_ORDERS, fetchOrders)]);
}
