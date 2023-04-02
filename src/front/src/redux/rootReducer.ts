import { combineReducers, Reducer } from 'redux';
import cartList, {
  ActionsType as CartListActionsType,
} from './ducks/cart_list';
import ordersList, {
  ActionsType as OrdersListActionsType,
} from './ducks/orders_list';

const rootReducer = combineReducers({ cartList, ordersList });

export type RootState = ReturnType<typeof rootReducer>;

export type ActionsType = CartListActionsType | OrdersListActionsType;

export default rootReducer as Reducer<RootState, ActionsType>;
