import { IDrug } from 'api/types/drug';
import img from 'assets/strepsils.jpg';
import heart from 'assets/not_favorite.svg';
import './FavoriteProduct.scss';

// interface IProps {
//   item: IDrug;
// }
const FavoriteProduct: React.FC = () => {
  return (
    <>
      <div className="fav__product">
        <div className="fav__product__image__wrapper">
          <img className="fav__product__image" src={img} alt="" />
        </div>
        <div className="fav__product__title">Стрепсилс</div>
        <div className="fav__product__description">
          Таблетки для рассасывания
        </div>
        <div className="fav__product__price">300 ₽</div>
        <div className="icon__wrapper">
          <img className="favorite__icon" src={heart} alt="" />
        </div>
      </div>
    </>
  );
};

export default FavoriteProduct;
