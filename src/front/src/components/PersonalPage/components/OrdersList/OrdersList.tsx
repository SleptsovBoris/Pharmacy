import { Button, Collapse, Empty } from 'antd';
import CartList from '../../../Cart/components/CartList';
import './OrdersList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import locale from 'constants/locale';
import { useEffect } from 'react';
import { fetchOrders } from 'redux/ducks/orders_list';
import LoadingOrder from '../LoadingOrder';

const { Panel } = Collapse;

const getOrderStateLabel = (orderState: number) => {
  switch (orderState) {
    case 1:
      return 'Заказано';
    case 2:
      return 'В процессе сборки';
    case 3:
      return 'В пункте выдачи';
    case 4:
      return 'Завершено';
    default:
      return 'Заказано';
  }
};

const OrdersList: React.FC = () => {
  const ordersState = useSelector((state: RootState) => state.ordersList);
  const accountState = useSelector((state: RootState) => state.account);
  const token = accountState.account?.token || '';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders(false, token));
  }, []);

  const handleResetButtonClick = () => {
    dispatch(fetchOrders(false, token));
  };

  if (ordersState.error) {
    return (
      <>
        <div>{ordersState.error}</div>
        <Button onClick={handleResetButtonClick}>Повторить запрос</Button>
      </>
    );
  }

  if (ordersState.isLoading && !ordersState.isLoadingMore) {
    return (
      <div className="loading-wrapper">
        <LoadingOrder />
        <LoadingOrder />
        <LoadingOrder />
      </div>
    );
  }

  if (ordersState.items.length === 0) {
    return (
      <div style={{ padding: '16px', color: 'rgba(0, 0, 0, 0.25)' }}>
        <Empty description={locale.noDataMessage} />
      </div>
    );
  }

  return (
    <>
      {ordersState.items.map(order => (
        //eslint-disable-next-line
        <div key={order.orderId} className="order-collapse-wrapper">
          <Collapse>
            <Panel
              //eslint-disable-next-line
              key={order.orderId!}
              header={
                <div className="order">
                  <span className="order__date">
                    {`Дата заказа: ${new Date(
                      order.creationDate
                    ).toLocaleDateString('ru-Ru')} ${new Date(
                      order.creationDate
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })} `}
                  </span>
                  <span className="order__price">
                    Сумма заказа: {order.totalPrice} ₽
                  </span>
                  <span className="order__address">
                    Адрес аптеки: {order.pharmacy.address}
                  </span>
                  <span className="order__state">
                    Статус заказа:{' '}
                    <span className="state">
                      {getOrderStateLabel(order.orderState)}
                    </span>
                  </span>
                </div>
              }
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
