import { IPharmacy } from 'api/types/pharmacy';
import heart from 'assets/not_favorite.svg';
import './Pharmacy.scss';

interface IProps {
  item: IPharmacy;
}

const Pharmacy: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <div className="pharmacy__wrapper">
        <div className="pharmacy__address">{props.item.address}</div>
        <div className="pharmacy__worktime">{props.item.workTime}</div>
      </div>
    </>
  );
};

export default Pharmacy;
