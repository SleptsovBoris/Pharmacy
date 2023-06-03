import { useState } from 'react';
import './Payment.scss';
import { IOrder, addOrder } from 'redux/ducks/orders_list';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { IPharmacy } from 'api/types/pharmacy';
import { clearCart } from 'redux/ducks/cart_list';
import { useNavigate } from 'react-router-dom';
import { resetOrderPharmacy } from 'redux/ducks/order_pharmacy';

const Payment: React.FC = () => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderPharmacyState = useSelector(
    (state: RootState) => state.orderPharmacy
  );

  const totalPrice = cartState.items.reduce(
    (result, cartItem) => result + cartItem.price * cartItem.count,
    0
  );

  const handleAddOrder = () => {
    const order: IOrder = {
      products: cartState.items,
      totalPrice: totalPrice,
      date: new Date(),
      pharmacy: orderPharmacyState.pharmacy as IPharmacy,
    };
    dispatch(addOrder(order));
    dispatch(resetOrderPharmacy());
    dispatch(clearCart());
    navigate('/catalog');
  };

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardOwner, setCardOwner] = useState('');

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardNumber(event.target.value);
  };

  const handleCardExpirationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardExpiration(event.target.value);
  };

  const handleCardOwnerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardOwner(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ваша логика отправки данных здесь
    // Например, вызов API для выполнения платежа

    // Сброс полей после отправки
    setCardNumber('');
    setCardExpiration('');
    setCardOwner('');
  };

  return (
    <>
      <div className="payment__area">
        <div className="payment__title">Оплата</div>
        <form className="payment__form" onSubmit={handleSubmit}>
          <label>Номер карты:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="payment__input"
          />
          <label>Срок действия:</label>
          <input
            type="text"
            value={cardExpiration}
            onChange={handleCardExpirationChange}
            className="payment__input"
          />
          <label>Имя владельца:</label>
          <input
            type="text"
            value={cardOwner}
            onChange={handleCardOwnerChange}
            className="payment__input"
          />
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
