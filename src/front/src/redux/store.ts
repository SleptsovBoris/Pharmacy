import { createStore } from 'redux';
import rootReducer, { RootState } from './rootReducer';
import localStorageNames from 'constants/local_storage_names';

const persistedState: RootState = localStorage.getItem(
  localStorageNames.reduxState
)
  ? (JSON.parse(
      localStorage.getItem(localStorageNames.reduxState) as string
      //eslint-disable-next-line
    ) as RootState)
  : ({} as RootState);

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem(
    localStorageNames.reduxState,
    JSON.stringify(store.getState())
  );
});

export default store;
