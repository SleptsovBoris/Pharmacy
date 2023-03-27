import { Button, Divider } from 'antd';
import { IProduct } from 'api/baseApi/models/Product';
import { CartItem } from 'App';
import { IOrder } from '../../Cart';
import CartList from '../CartList';
import './CartItemsTab.scss';

interface IProps {
  cartItems: CartItem[];
  handleRemoveItemFromCart: (item: IProduct) => void;
  handleAddOrder: (order: IOrder) => void;
  handleChangeCartItemCount: (cartItem: number, newCount: number) => void;
}

const CartItemsTab: React.FC<IProps> = (props: IProps) => {
  const totalPrice = props.cartItems.reduce(
    (result, cartItem) => result + cartItem.price * cartItem.count,
    0
  );

  const handleAddOrder = () => {
    if (props.cartItems.length === 0) return;

    const order: IOrder = {
      products: props.cartItems,
      totalPrice: totalPrice,
      date: new Date().toDateString(),
    };
    props.handleAddOrder(order);
  };

  return (
    <>
      <CartList
        cartItems={props.cartItems}
        handleChangeCartItemCount={props.handleChangeCartItemCount}
        handleRemoveItemFromCart={props.handleRemoveItemFromCart}
      />
      <Divider />
      <div className="add__order__wrapper">
        <div className="total__price">
          {props.cartItems.length === 0 ? '' : `${totalPrice} ₽`}
        </div>
        <Button
          disabled={props.cartItems.length === 0}
          size={'large'}
          onClick={handleAddOrder}
        >
          Заказать
        </Button>
      </div>
    </>
  );
};

export default CartItemsTab;
