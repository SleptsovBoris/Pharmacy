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
import favorProductsList, {
  ActionsType as FavorProductsListActionsType,
} from './ducks/favor_products_list';
import pharmaciesList, {
  ActionsType as PharmaciesListActionsType,
} from './ducks/pharmacies_list';
import favorPharmaciesList, {
  ActionsType as FavorPharmaciesListActionsType,
} from './ducks/favor_pharmacies_list';
import account, { ActionsType as AccountActionsType } from './ducks/account';
import orderPharmacy, {
  ActionsType as OrderPharmacyActionsType,
} from './ducks/order_pharmacy';

const rootReducer = combineReducers({
  cartList,
  ordersList,
  productsList,
  favorProductsList,
  account,
  orderPharmacy,
  pharmaciesList,
  favorPharmaciesList,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ActionsType =
  | CartListActionsType
  | OrdersListActionsType
  | ProductsListActionsType
  | FavorPharmaciesListActionsType
  | AccountActionsType
  | OrderPharmacyActionsType
  | PharmaciesListActionsType
  | FavorPharmaciesListActionsType;

export default rootReducer as Reducer<RootState, ActionsType>;
