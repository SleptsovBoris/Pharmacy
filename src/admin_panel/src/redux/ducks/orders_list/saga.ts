import { AxiosResponse } from 'axios';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as actionCreators from './action_creators';
import locale from 'constants/locale';
import { FETCH_ORDERS } from './action_types';
import { getOrdersList } from 'api/endpoints/orders';
import { IOrder } from 'api/types/order';
import { IResponse } from 'api/types/common';

type IFetchOrdersAction = ReturnType<typeof actionCreators.fetchOrders>;

function* fetchOrders({ payload }: IFetchOrdersAction) {
  yield put(actionCreators.setOrdersFetching(true, payload));
  try {
    const response = (yield call(getOrdersList)) as AxiosResponse<
      IResponse<IOrder[]>
    >;
    console.log(response);
    if (payload) {
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
