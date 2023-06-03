import axios, { AxiosResponse } from 'axios';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as actionCreators from './action_creators';
import locale from 'constants/locale';
import { FETCH_PHARMACIES } from './action_types';
import { getPharmaciesList } from 'api/endpoints/pharmacies_list';
import { IPharmacy } from 'api/types/pharmacy';

type IFetchPharmaciesAction = ReturnType<typeof actionCreators.fetchPharmacies>;

function* fetchPharmacies({ payload }: IFetchPharmaciesAction) {
  yield put(actionCreators.setPharmaciesFetching(true, payload.isLoadingMore));
  try {
    const response = (yield call(() =>
      getPharmaciesList(payload.filters)
    )) as AxiosResponse<IPharmacy[]>;
    if (payload.isLoadingMore) {
      yield put(actionCreators.addPharmacies(response.data));
    } else {
      yield put(actionCreators.setPharmacies(response.data));
    }
  } catch {
    yield put(actionCreators.setError(locale.responseErrorMessage));
  }
}

export default function* watch() {
  yield all([takeLatest(FETCH_PHARMACIES, fetchPharmacies)]);
}
