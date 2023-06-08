import { all, spawn, call } from 'redux-saga/effects';
import { saga as productsList } from './ducks/products_list';
import { saga as pharmaciesList } from './ducks/pharmacies_list';
import { saga as cartList } from './ducks/cart_list';
import { saga as ordersList } from './ducks/orders_list';

// https://redux-saga.js.org/docs/advanced/RootSaga.html
function* rootSaga() {
  const sagas = [productsList, pharmaciesList, cartList, ordersList];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (exception) {
            window.console.error(exception);
          }
        }
      })
    )
  );
}

export default rootSaga;
