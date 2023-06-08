import { useEffect } from 'react';
import LoadingProduct from './components/LoadingProduct';
import Product from './components/Product';
import './Products.scss';
import { Button, Empty } from 'antd';
import locale from 'constants/locale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { fetchProducts } from 'redux/ducks/products_list';

const Products: React.FC = () => {
  const productsListState = useSelector(
    (state: RootState) => state.productsList
  );

  const dispatch = useDispatch();

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
        </div>
      )}
    </>
  );
};

export default Products;
