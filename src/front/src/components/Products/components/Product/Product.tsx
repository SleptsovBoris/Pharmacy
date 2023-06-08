import './Product.scss';
import { Divider, Tooltip } from 'antd';
import { IDrug } from 'api/types/drug';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { addDrug } from 'redux/ducks/cart_list';
import { useNavigate } from 'react-router-dom';

interface IProps {
  item: IDrug;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const accountState = useSelector((state: RootState) => state.account);
  const token = accountState.account?.token || '';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate(
      `/catalog/${props.item.drugId}/${props.item.formId}/${props.item.kindId}/${props.item.manufacturerId}`
    );
  };

  return (
    <>
      <div className="product">
        <div className="product__image__wrapper">
          <img className="product__image" src={props.item.img} alt="" />
        </div>
        <div className="product__row">
          <div className="product__price">{props.item.price} ₽</div>
          <div className="count__wrapper">{props.item.count}</div>
        </div>

        <Divider style={{ margin: '10px 0' }} />
        <div className="product__title">{props.item.drugName}</div>
        <div className="product__description">{props.item.description}</div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="product__actions__button__wrapper">
          {
            cartState.items &&
            props.item &&
            cartState.items.some(
              cartItem => cartItem.drugId === props.item.drugId
            ) ? (
              /* eslint-disable */
              <Tooltip title="Товар уже в корзине">
                <button className="in_cart_button">В корзине</button>
              </Tooltip>
            ) : (
              /* eslint-enable */
              /* eslint-disable */
              <button
                className="add_to_cart_button"
                onClick={() => dispatch(addDrug(props.item, token))}
              >
                В корзину
              </button>
            ) /* eslint-enable */
          }
          <button className="about__button" onClick={handleNavigate}>
            Подробнее
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
