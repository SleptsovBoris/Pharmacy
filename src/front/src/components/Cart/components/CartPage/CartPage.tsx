import { Divider } from 'antd';
import CartList from '../CartList';
import './CartPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import {
  fetchCartItems,
  removeDrug,
  setDrugCount,
} from 'redux/ducks/cart_list';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CartPage: React.FC = () => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const accountState = useSelector((state: RootState) => state.account);
  const token = accountState.account?.token ? accountState.account?.token : '';
  const dispatch = useDispatch();
  const totalPrice = cartState.items.reduce(
    (result, cartItem) => result + cartItem.pricePerOne * cartItem.amount,
    0
  );
  const navigate = useNavigate();

  const handleChoosePharmacy = () => {
    if (cartState.items.length === 0) return;
    navigate('/pharmacy-choice');
  };

  useEffect(() => {
    console.log('я юз эффект');
    dispatch(fetchCartItems(false, token));
  }, []);

  return (
    <>
      <div className="cart__area">
        <div className="cart__title">Корзина</div>
        <div className="cartlist__wrapper">
          <CartList
            cartItems={cartState.items}
            handleChangeCartItemCount={(
              cartItemId: number,
              newCount: number
            ) => {
              dispatch(setDrugCount(cartItemId, newCount, token));
            }}
            handleRemoveItemFromCart={(cartItemId: number) => {
              dispatch(removeDrug(cartItemId, token));
            }}
          />
          <Divider />
          <div className="add__order__wrapper">
            <div className="total__price">
              {cartState.items.length === 0 ? '' : `Итого: ${totalPrice} ₽`}
            </div>
            <button
              className="add__order__button"
              disabled={cartState.items.length === 0}
              onClick={handleChoosePharmacy}
            >
              Выбрать аптеку
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
