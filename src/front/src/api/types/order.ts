import { ICart } from './cart';
import { IPharmacy } from './pharmacy';

export interface IOrder {
  orderId?: number;
  pharmacy: IPharmacy;
  cart: ICart;
  totalPrice: number;
  creationDate: Date;
  pharmacyId: number;
  orderState: number;
}
