import { IPharmacy } from 'api/types/pharmacy';
import heart from 'assets/not_favorite.svg';
import './OrderPharmacy.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOrderPharmacy } from 'redux/ducks/order_pharmacy';

interface IProps {
  item: IPharmacy;
}

const OrderPharmacy: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToOrder = () => {
    dispatch(setOrderPharmacy(props.item));
    navigate('/ordering');
  };

  return (
    <>
      <div className="order__pharmacy__wrapper">
        <div className="pharmacy__address">{props.item.address}</div>
        <div className="pharmacy__worktime">{props.item.workTime}</div>
        <div className="icon__wrapper">
          <img className="favorite__icon" src={heart} alt="" />
        </div>
        <button className="pharmacy__button" onClick={handleToOrder}>
          Выбрать
        </button>
      </div>
    </>
  );
};

export default OrderPharmacy;
