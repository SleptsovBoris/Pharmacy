import { Collapse, Empty } from 'antd';
import locale from 'constants/locale';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import CartList from './CartList/CartList';

const { Panel } = Collapse;

const OrdersList: React.FC = () => {
  const ordersState = useSelector((state: RootState) => state.ordersList);

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
        <div key={order.id!} className="order-collapse-wrapper">
          <Collapse>
            <Panel
              //eslint-disable-next-line
              key={order.id!}
              header={
                <div className="order">
                  <span className="order__date">
                    {`Дата заказа: ${new Date(order.date).toLocaleDateString(
                      'ru-Ru'
                    )} ${new Date(order.date).toLocaleTimeString([], {
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
                    Статус заказа: <span className="state">Заказано</span>
                  </span>
                </div>
              }
            >
              <CartList cartItems={order.products} />
            </Panel>
          </Collapse>
        </div>
      ))}
    </>
  );
};

export default OrdersList;
