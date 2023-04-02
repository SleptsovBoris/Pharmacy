import { Button, Divider } from 'antd';
import CartList from '../CartList';
import './CartItemsTab.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import {
  clearCart,
  removeProduct,
  setProductCount,
} from 'redux/ducks/cart_list';
import { IOrder, addOrder } from 'redux/ducks/orders_list';

const CartItemsTab: React.FC = () => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const dispatch = useDispatch();
  const totalPrice = cartState.items.reduce(
    (result, cartItem) => result + cartItem.price * cartItem.count,
    0
  );

  const handleAddOrder = () => {
    if (cartState.items.length === 0) return;

    const order: IOrder = {
      products: cartState.items,
      totalPrice: totalPrice,
      date: new Date(),
    };
    dispatch(addOrder(order));

    dispatch(clearCart());
  };

  return (
    <>
      <CartList
        cartItems={cartState.items}
        handleChangeCartItemCount={(cartItemId: number, newCount: number) => {
          dispatch(setProductCount(cartItemId, newCount));
        }}
        handleRemoveItemFromCart={(cartItemId: number) => {
          dispatch(removeProduct(cartItemId));
        }}
      />
      <Divider />
      <div className="add__order__wrapper">
        <div className="total__price">
          {cartState.items.length === 0 ? '' : `${totalPrice} ₽`}
        </div>
        <Button
          disabled={cartState.items.length === 0}
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
