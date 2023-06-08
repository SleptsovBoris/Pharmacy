import { IDrug } from './drug';

export type CartItem = {
  amount: number;
  drug: IDrug;
  drugId: number;
  pricePerOne: number;
};

export interface ICart {
  cartId: number;
  cartItems: CartItem[];
}
