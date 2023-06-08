import './Payment.scss';
import { addOrder } from 'redux/ducks/orders_list';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { IPharmacy } from 'api/types/pharmacy';
import { clearCart } from 'redux/ducks/cart_list';
import { useNavigate } from 'react-router-dom';
import { resetOrderPharmacy } from 'redux/ducks/order_pharmacy';
import { IOrder } from 'api/types/order';

const Payment: React.FC = () => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const accountState = useSelector((state: RootState) => state.account);
  const token = accountState.account?.token || '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderPharmacyState = useSelector(
    (state: RootState) => state.orderPharmacy
  );

  const totalPrice = cartState.items.reduce(
    (result, cartItem) => result + cartItem.pricePerOne * cartItem.amount,
    0
  );

  const handleAddOrder = () => {
    const order: IOrder = {
      cart: { cartId: 1, cartItems: cartState.items },
      totalPrice: totalPrice,
      creationDate: new Date(),
      pharmacy: orderPharmacyState.pharmacy as IPharmacy,
      pharmacyId: orderPharmacyState.pharmacy?.aptekaId || 1,
      orderState: 0,
    };
    console.log(`OrderToken is ${token}`);
    dispatch(addOrder(order, token));
    dispatch(resetOrderPharmacy());
    dispatch(clearCart());
    navigate('/catalog');
  };

  return (
    <>
      <div className="payment__area">
        <div className="payment__title">Оплата</div>
        <form className="payment__form">
          <label>Номер карты:</label>
          <input type="text" className="payment__input" />
          <label>Срок действия:</label>
          <input type="text" className="payment__input" />
          <label>Имя владельца:</label>
          <input type="text" className="payment__input" />
          <button
            type="submit"
            className="payment__button"
            onClick={handleAddOrder}
          >
            Оплатить
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
