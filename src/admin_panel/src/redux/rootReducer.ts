import { combineReducers, Reducer } from 'redux';
import cartList, {
  ActionsType as CartListActionsType,
} from './ducks/cart_list';
import ordersList, {
  ActionsType as OrdersListActionsType,
} from './ducks/orders_list';
import productsList, {
  ActionsType as ProductsListActionsType,
} from './ducks/products_list';

const rootReducer = combineReducers({ cartList, ordersList, productsList });

export type RootState = ReturnType<typeof rootReducer>;

export type ActionsType =
  | CartListActionsType
  | OrdersListActionsType
  | ProductsListActionsType;

export default rootReducer as Reducer<RootState, ActionsType>;
