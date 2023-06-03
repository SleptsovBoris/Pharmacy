import { createStore, applyMiddleware } from 'redux';
import rootReducer, { RootState } from './rootReducer';
import localStorageNames from 'constants/local_storage_names';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);

const persistedState: RootState = localStorage.getItem(
  localStorageNames.reduxState
)
  ? (JSON.parse(
      localStorage.getItem(localStorageNames.reduxState) as string
      //eslint-disable-next-line
    ) as RootState)
  : ({} as RootState);

const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(() => {
  localStorage.setItem(
    localStorageNames.reduxState,
    JSON.stringify(store.getState())
  );
});

sagaMiddleware.run(rootSaga);

export default store;
