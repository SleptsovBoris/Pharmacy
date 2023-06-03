import './Product.scss';
import { Divider, Tooltip } from 'antd';
import not_favorite from 'assets/not_favorite.svg';
import { IDrug } from 'api/types/drug';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { addProduct } from 'redux/ducks/cart_list';
import { useNavigate } from 'react-router-dom';

interface IProps {
  item: IDrug;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const cartState = useSelector((state: RootState) => state.cartList);
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
          <div className="fav__img__wrapper">
            <img className="fav__img" src={not_favorite} alt="" />
          </div>
        </div>

        <Divider style={{ margin: '10px 0' }} />
        <div className="product__title">{props.item.drugName}</div>
        <div className="product__description">{props.item.description}</div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="product__actions__button__wrapper">
          {cartState.items.find(
            cartItem => cartItem.drugId === props.item.drugId
          ) ? (
            <Tooltip title="Товар уже в корзине">
              <button className="in_cart_button">В корзине</button>
            </Tooltip>
          ) : (
            <button
              className="add_to_cart_button"
              onClick={() => dispatch(addProduct(props.item))}
            >
              В корзину
            </button>
          )}
          <button className="about__button" onClick={handleNavigate}>
            Подробнее
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
