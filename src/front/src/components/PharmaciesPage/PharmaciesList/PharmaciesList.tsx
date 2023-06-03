import { useDispatch, useSelector } from 'react-redux';
import Pharmacy from './components/Pharmacy/Pharmacy';
import { RootState } from 'redux/rootReducer';
import { Button, Empty } from 'antd';
import { useEffect } from 'react';
import { fetchPharmacies } from 'redux/ducks/pharmacies_list';
import locale from 'constants/locale';
import './PharmaciesList.scss';

const PharmaciesList: React.FC = () => {
  const pharmaciesListState = useSelector(
    (state: RootState) => state.pharmaciesList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPharmacies(false));
  }, []);

  const handleResetButtonClick = () => {
    dispatch(fetchPharmacies(false));
  };

  if (pharmaciesListState.error) {
    return (
      <>
        <div>{pharmaciesListState.error}</div>
        <Button onClick={handleResetButtonClick}>Повторить запрос</Button>
      </>
    );
  }

  if (pharmaciesListState.items.length === 0) {
    return (
      <div className="empty-products-wrapper">
        <Empty description={locale.noDataMessage} />
      </div>
    );
  }

  return (
    <>
      <div className="pharmacies">
        <div className="pharmacies__row__wrapper">
          <div className="pharmacies__address">Адрес:</div>
          <div className="pharmacies__worktime">Время работы:</div>
        </div>

        {pharmaciesListState.items.map(item => (
          <Pharmacy key={item.aptekaId} item={item} />
        ))}
      </div>
    </>
  );
};

export default PharmaciesList;
