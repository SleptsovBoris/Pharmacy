import { useEffect } from 'react';
import LoadingProduct from './components/LoadingProduct';
import Product from './components/Product';
import './Products.scss';
import { Button, Empty, Form, Input, Select } from 'antd';
import locale from 'constants/locale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { fetchProducts } from 'redux/ducks/products_list';

const Products: React.FC = () => {
  const productsListState = useSelector(
    (state: RootState) => state.productsList
  );

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSearchButtonClick = () => {
    dispatch(
      fetchProducts({
        manufacturer: form.getFieldValue('manufacturer'),
        kind: form.getFieldValue('kind'),
        form: form.getFieldValue('form'),
        name: form.getFieldValue('name'),
      })
    );
  };

  useEffect(() => {
    dispatch(fetchProducts(false));
  }, []);

  const handleResetButtonClick = () => {
    dispatch(fetchProducts(false));
  };

  if (productsListState.error) {
    return (
      <>
        <div>{productsListState.error}</div>
        <Button onClick={handleResetButtonClick}>Повторить запрос</Button>
      </>
    );
  }

  if (productsListState.isLoading && !productsListState.isLoadingMore) {
    return (
      <div className="loading-wrapper">
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </div>
    );
  }

  if (productsListState.items.length === 0) {
    return (
      <div className="empty-products-wrapper">
        <Empty description={locale.noDataMessage} />
      </div>
    );
  }

  return (
    <>
      <div className="filters">
        <Form form={form} className="form__filters">
          <Form.Item name={'manufacturer'}>
            <Select
              className="filter"
              placeholder="Производитель"
              allowClear
              style={{ width: 180 }}
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
              style={{ width: 180 }}
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
          <Form.Item name={'form'}>
            <Select
              className="filter"
              placeholder="Форма выпуска"
              allowClear
              style={{ width: 180 }}
              options={[
                { value: 1, label: 'Таблетки' },
                { value: 2, label: 'Капсулы' },
                { value: 3, label: 'Порошки' },
                { value: 4, label: 'Гранулы' },
                { value: 5, label: 'Драже' },
                { value: 6, label: 'Растворы' },
                { value: 7, label: 'Капли' },
                { value: 8, label: 'Сиропы' },
                { value: 9, label: 'Суспензии' },
                { value: 10, label: 'Эмульсии' },
                { value: 11, label: 'Мази' },
                { value: 12, label: 'Крема' },
                { value: 13, label: 'Гели' },
                { value: 14, label: 'Спреи' },
                { value: 15, label: 'Аэрозоли' },
                { value: 16, label: 'Экстракты' },
                { value: 17, label: 'Травы' },
                { value: 18, label: 'Пластыри' },
              ]}
            />
          </Form.Item>
        </Form>
        <Button className="filter__button" onClick={handleSearchButtonClick}>
          Применить
        </Button>
      </div>
      <div className="search__drug">
        <Form form={form}>
          <Form.Item name={'name'}>
            <Input
              placeholder="Название лекарства"
              style={{ width: 500, marginRight: 20 }}
            />
          </Form.Item>
        </Form>
        <Button onClick={handleSearchButtonClick}>Найти</Button>
      </div>
      <div className="products">
        {productsListState.items.map(item => (
          <Product key={item.drugId} item={item} />
        ))}
      </div>
      {productsListState.isLoadingMore && (
        <div className="loading-wrapper">
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
        </div>
      )}
    </>
  );
};

export default Products;
