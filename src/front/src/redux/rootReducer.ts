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
import pharmaciesList, {
  ActionsType as PharmaciesListActionsType,
} from './ducks/pharmacies_list';
import account, { ActionsType as AccountActionsType } from './ducks/account';
import orderPharmacy, {
  ActionsType as OrderPharmacyActionsType,
} from './ducks/order_pharmacy';

const rootReducer = combineReducers({
  cartList,
  ordersList,
  productsList,
  account,
  orderPharmacy,
  pharmaciesList,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ActionsType =
  | CartListActionsType
  | OrdersListActionsType
  | ProductsListActionsType
  | AccountActionsType
  | OrderPharmacyActionsType
  | PharmaciesListActionsType;

export default rootReducer as Reducer<RootState, ActionsType>;
