import { Collapse } from 'antd';
import CartList from '../CartList';
import './OrdersTab.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

const { Panel } = Collapse;

const OrdersTab: React.FC = () => {
  const ordersState = useSelector((state: RootState) => state.ordersList);
  return (
    <>
      {ordersState.items.map(order => (
        //eslint-disable-next-line
        <div key={order.id!} className="order-collapse-wrapper">
          <Collapse>
            <Panel
              //eslint-disable-next-line
              key={order.id!}
              header={`${new Date(order.date).toLocaleDateString(
                'ru-Ru'
              )} ${new Date(order.date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })} - ${order.totalPrice} ₽`}
            >
              <CartList cartItems={order.products} />
            </Panel>
          </Collapse>
        </div>
      ))}
    </>
  );
};

export default OrdersTab;
