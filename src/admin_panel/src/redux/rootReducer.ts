import { combineReducers, Reducer } from 'redux';
import ordersList, {
  ActionsType as OrdersListActionsType,
} from './ducks/orders_list';
import productsList, {
  ActionsType as ProductsListActionsType,
} from './ducks/products_list';

const rootReducer = combineReducers({ ordersList, productsList });

export type RootState = ReturnType<typeof rootReducer>;

export type ActionsType = OrdersListActionsType | ProductsListActionsType;

export default rootReducer as Reducer<RootState, ActionsType>;
