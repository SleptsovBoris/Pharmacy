import Products from 'components/Products';
import React from 'react';
import './Catalog.scss';
import { useDispatch } from 'react-redux';
import { fetchProducts } from 'redux/ducks/products_list';
import { Form, Select } from 'antd';

const Catalog: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSearchButtonClick = () => {
    dispatch(
      fetchProducts({
        manufacturer: form.getFieldValue('manufacturer'),
        kind: form.getFieldValue('kind'),
        name: null,
      })
    );
  };

  return (
    <>
      <div className="products__area">
        <div className="products__title">Каталог</div>
        <div className="row__wrapper">
          <div className="filters">
            <Form form={form}>
              <Form.Item name={'manufacturer'}>
                <Select
                  className="filter"
                  placeholder="Производитель"
                  allowClear
                  style={{ width: 220 }}
                  options={[
                    { value: 1, label: 'ОТИСИФАРМ' },
                    { value: 2, label: 'САНОФИ АВЕНТИС ГРУП' },
                    { value: 3, label: 'ЭББОТТ ЛЭБОРАТОРИС' },
                    { value: 4, label: 'ИПСЕН' },
                    { value: 5, label: 'ОБНОВЛЕНИЕ' },
                    { value: 6, label: 'БОРИСОВСКИЙ ЗАВОД' },
                    { value: 7, label: 'ГЕДЕОН РИХТЕР' },
                    { value: 8, label: 'БОЛЕАР' },
                    { value: 9, label: 'ТРИВИУМ' },
                    { value: 10, label: 'САНДОЗ' },
                    { value: 11, label: 'ВЕРТЕКС' },
                    { value: 12, label: 'ТЕВА' },
                  ]}
                />
              </Form.Item>
              <Form.Item name={'kind'}>
                <Select
                  className="filter"
                  placeholder="Вид лекарства"
                  allowClear
                  style={{ width: 220 }}
                  options={[
                    { value: 1, label: 'Антибиотики' },
                    { value: 2, label: 'Сульфаниламиды' },
                    { value: 3, label: 'Противовирусные' },
                    { value: 4, label: 'Антисептики' },
                    { value: 5, label: 'Диуретики' },
                    { value: 6, label: 'Антигистаминные' },
                    { value: 7, label: 'Анальгетики' },
                    { value: 8, label: 'Снотворные' },
                    { value: 9, label: 'Антидепрессанты' },
                    { value: 10, label: 'Отхаркивающие' },
                    { value: 11, label: 'Слабительные' },
                    { value: 12, label: 'Антидиарейные' },
                    { value: 13, label: 'Спазмолитические' },
                    { value: 14, label: 'Витамины' },
                    { value: 15, label: 'Седативные' },
                    { value: 16, label: 'Миорелаксанты' },
                    { value: 17, label: 'Раздражающие' },
                    { value: 18, label: 'Местноанестезирующие' },
                    { value: 19, label: 'Противовоспалительные' },
                    { value: 20, label: 'Жаропонижающие' },
                  ]}
                />
              </Form.Item>
            </Form>

            <button
              className="filter__button"
              onClick={handleSearchButtonClick}
            >
              Применить
            </button>
          </div>

          <Products />
        </div>
      </div>
    </>
  );
};

export default Catalog;
