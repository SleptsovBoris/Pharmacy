import { IPharmacy } from 'api/types/pharmacy';
import heart from 'assets/not_favorite.svg';
import './FavorPharmacy.scss';

// interface IProps {
//   item: IPharmacy;
// }

const FavorPharmacy: React.FC = () => {
  return (
    <>
      <div className="favor__pharmacy__wrapper">
        <div className="favor__pharmacy__address">ул Пушкина 5</div>
        <div className="favor__pharmacy__worktime">Круглосуточно</div>
        <div className="icon__wrapper">
          <img className="favorite__icon" src={heart} alt="" />
        </div>
      </div>
    </>
  );
};

export default FavorPharmacy;
