import { useNavigate } from 'react-router-dom';
import './Ordering.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { resetOrderPharmacy } from 'redux/ducks/order_pharmacy';

const Ordering: React.FC = () => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const dispatch = useDispatch();
  const accountState = useSelector((state: RootState) => state.account);
  const orderPharmacyState = useSelector(
    (state: RootState) => state.orderPharmacy
  );

  const totalPrice = cartState.items.reduce(
    (result, cartItem) => result + cartItem.price * cartItem.count,
    0
  );

  const navigate = useNavigate();
  const handleBackToPharmacy = () => {
    dispatch(resetOrderPharmacy());
    navigate('/pharmacy-choice');
  };

  const handleToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="ordering__area">
      <div className="ordering__title">Проверьте свой заказ</div>
      <div className="ordering__box">
        <div className="ordering__subtitle">Вы выбрали аптеку:</div>
        <div className="selected__pharmacy">
          {'Адрес: '}
          {orderPharmacyState.pharmacy?.address}
          {' Время работы: '}
          {orderPharmacyState.pharmacy?.workTime}
        </div>
        <div className="pharmacy__button__wrapper">
          <button className="pharmacy__button" onClick={handleBackToPharmacy}>
            Выбрать другую аптеку
          </button>
        </div>
        <div className="order__text__wrapper">
          Номер для отправки <br /> уведомлений о статусе заказа
          <div className="order__phone">+7 {accountState.account?.phone}</div>
        </div>
        <div className="order__text__wrapper">
          Сумма заказа:
          <div className="order__price">{totalPrice} ₽</div>
        </div>
        <div className="pharmacy__button__wrapper">
          <button className="order__button" onClick={handleToPayment}>
            Подтвердить заказ и <br /> перейти к оплате
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ordering;
