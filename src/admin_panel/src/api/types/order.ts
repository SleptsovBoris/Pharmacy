import { IPharmacy } from './pharmacy';
import { IDrug } from './product';

export interface IOrder {
  orderId?: number;
  cart: ICart;
  totalPrice: number;
  creationDate: Date;
  pharmacy: IPharmacy;
  pharmacyId: number;
  orderState: number;
}

export interface IPutOrder {
  orderId: number;
  orderState: number;
}

export interface ICart {
  cartId: number;
  cartItems: CartItem[];
}

export type CartItem = {
  amount: number;
  drug: IDrug;
  drugId: number;
  pricePerOne: number;
};
