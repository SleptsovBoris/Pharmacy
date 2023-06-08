import { Button, Collapse, Empty } from 'antd';
import locale from 'constants/locale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import CartList from './CartList';
import './OrdersList.scss';
import { useEffect } from 'react';
import { fetchOrders } from 'redux/ducks/orders_list';
import LoadingOrder from './LoadingOrder';
import Order from './Order/Order';

const { Panel } = Collapse;

const OrdersList: React.FC = () => {
  const dispatch = useDispatch();

  const ordersListState = useSelector((state: RootState) => state.ordersList);

  useEffect(() => {
    dispatch(fetchOrders(false));
  }, []);

  const handleResetButtonClick = () => {
    dispatch(fetchOrders(false));
  };

  if (ordersListState.error) {
    return (
      <>
        <div>{ordersListState.error}</div>
        <Button onClick={handleResetButtonClick}>Повторить запрос</Button>
      </>
    );
  }

  if (ordersListState.isLoading && !ordersListState.isLoadingMore) {
    return (
      <div className="loading__wrapper">
        <LoadingOrder />
        <LoadingOrder />
        <LoadingOrder />
      </div>
    );
  }

  if (ordersListState.items.length === 0) {
    return (
      <div style={{ padding: '16px', color: 'rgba(0, 0, 0, 0.25)' }}>
        <Empty description={locale.noDataMessage} />
      </div>
    );
  }

  return (
    <>
      {ordersListState.items.map(order => (
        //eslint-disable-next-line
        <div key={order.orderId!} className="order-collapse-wrapper">
          <Collapse>
            <Panel
              //eslint-disable-next-line
              key={order.orderId!}
              header={<Order item={order} />}
            >
              <CartList cartItems={order.cart.cartItems} />
            </Panel>
          </Collapse>
        </div>
      ))}
    </>
  );
};

export default OrdersList;
