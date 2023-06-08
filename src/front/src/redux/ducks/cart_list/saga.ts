import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as actionCreators from './action_creators';
import { getCartList } from 'api/endpoints/cart';
import { CartItem } from 'api/types/cart';
import { AxiosResponse } from 'axios';
import locale from 'constants/locale';
import { FETCH_CART_ITEMS } from './action_types';
import { IResponse } from 'api/types/common';

type IFetchCartItemsAction = ReturnType<typeof actionCreators.fetchCartItems>;

function* fetchCartItems({ payload }: IFetchCartItemsAction) {
  console.log('я сюда зашел');
  yield put(actionCreators.setCartItemsFetching(true, payload.isLoadingMore));
  try {
    const response = (yield call(() =>
      getCartList(payload.token)
    )) as AxiosResponse<IResponse<CartItem[]>>;
    console.log(response);
    if (payload.isLoadingMore) {
      yield put(actionCreators.addCartItems(response.data.data ?? []));
    } else {
      yield put(actionCreators.setCartItems(response.data.data ?? []));
    }
  } catch {
    yield put(actionCreators.setError(locale.responseErrorMessage));
  }
}

export default function* watch() {
  yield all([takeLatest(FETCH_CART_ITEMS, fetchCartItems)]);
}
