import { Placemark, Map, YMaps } from 'react-yandex-maps';
import './PharmacyChoice.scss';
import { List, Tabs, Empty, Form, Select } from 'antd';
import locale from 'constants/locale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import OrderPharmacy from './OrderPharmacy/OrderPharmacy';
import { fetchPharmacies } from 'redux/ducks/pharmacies_list';

const PharmacyChoice: React.FC = () => {
  const pharmaciesListState = useSelector(
    (state: RootState) => state.pharmaciesList
  );

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleFilterButtonClick = () => {
    dispatch(
      fetchPharmacies({
        worktime: form.getFieldValue('worktime'),
        district: form.getFieldValue('district'),
        metro: form.getFieldValue('metro'),
      })
    );
  };

  const handleSearchButtonClick = () => {
    dispatch(
      fetchPharmacies({
        address: form.getFieldValue('address'),
      })
    );
  };

  return (
    <>
      <div className="choice__area">
        <div className="choice__title">
          Выберите аптеку, в которой хотите забрать заказ
        </div>
        <div className="row-wrapper">
          <div className="filters">
            <Form form={form}>
              <Form.Item name={'worktime'}>
                <Select
                  className="filter"
                  placeholder="Время работы"
                  allowClear
                  style={{ width: 220 }}
                  options={[
                    { value: '8:00 - 20:00', label: '8:00 - 20:00' },
                    { value: '8:00 - 22:00', label: '8:00 - 22:00' },
                    { value: 'Круглосуточно', label: 'Круглосуточно' },
                  ]}
                />
              </Form.Item>
              <Form.Item name={'district'}>
                <Select
                  className="filter"
                  placeholder="Район"
                  allowClear
                  style={{ width: 220 }}
                  options={[
                    { value: 'Приволжский', label: 'Приволжский' },
                    { value: 'Вахитовский', label: 'Вахитовский' },
                    { value: 'Советский', label: 'Советский' },
                    { value: 'Московский', label: 'Московский' },
                    { value: 'Ново-Савиновский', label: 'Ново-Савиновский' },
                    { value: 'Авиастроительный', label: 'Авиастроительный' },
                    { value: 'Кировский', label: 'Кировский' },
                  ]}
                />
              </Form.Item>
              <Form.Item name={'metro'}>
                <Select
                  className="filter"
                  placeholder="Метро"
                  allowClear
                  style={{ width: 220 }}
                  options={[
                    { value: 'Авиастроительная', label: 'Авиастроительная' },
                    { value: 'Северный вокзал', label: 'Северный вокзал' },
                    { value: 'Яшьлек', label: 'Яшьлек' },
                    { value: 'Козья Слобода', label: 'Козья Слобода' },
                    { value: 'Кремлевская', label: 'Кремлевская' },
                    { value: 'Площадь Тукая', label: 'Площадь Тукая' },
                    { value: 'Суконная Слобода', label: 'Суконная Слобода' },
                    { value: 'Аметьево', label: 'Аметьево' },
                    { value: 'Горки', label: 'Горки' },
                    { value: 'Проспект Победы', label: 'Проспект Победы' },
                    { value: 'Дубравная', label: 'Дубравная' },
                  ]}
                />
              </Form.Item>
            </Form>
            <button
              className="filter__button"
              onClick={handleFilterButtonClick}
            >
              Применить
            </button>
          </div>
          <div className="column-wrapper">
            <div className="search__field">
              <Form className="search" form={form}>
                <Form.Item name="address">
                  <input className="search__input" placeholder="Адрес аптеки" />
                </Form.Item>
              </Form>
              <button
                className="search__button"
                onClick={handleSearchButtonClick}
              >
                Найти
              </button>
            </div>
            <div className="pharmacy__choice__tabs">
              <Tabs
                items={[
                  {
                    label: 'Показать списком',
                    key: '1',
                    children: (
                      <List
                        className="order__pharmacies__list"
                        locale={{
                          emptyText: (
                            <Empty description={locale.noDataMessage} />
                          ),
                        }}
                        itemLayout="horizontal"
                        dataSource={pharmaciesListState.items}
                        renderItem={item => <OrderPharmacy item={item} />}
                      />
                    ),
                  },
                  // {
                  //   label: 'Показать на карте',
                  //   key: '2',
                  //   children: (
                  //     <div className="yandex-maps__wrapper">
                  //       <YMaps>
                  //         <Map
                  //           className="yandex-map"
                  //           options={{
                  //             autoFitToViewport: 'always',
                  //             yandexMapDisablePoiInteractivity: true,
                  //           }}
                  //           defaultState={{
                  //             center: [55.779474, 49.128126],
                  //             zoom: 16,
                  //           }}
                  //         >
                  //           <Placemark
                  //             geometry={[55.779474, 49.128126]}
                  //             properties={{
                  //               iconCaption: 'Мы ждем вас здесь!',
                  //             }}
                  //           />
                  //         </Map>
                  //       </YMaps>
                  //     </div>
                  //   ),
                  // },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyChoice;
