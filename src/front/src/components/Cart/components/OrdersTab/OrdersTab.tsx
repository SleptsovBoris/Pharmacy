import { Collapse } from 'antd';
import { IOrder } from '../../Cart';
import CartList from '../CartList';
import './OrdersTab.scss';

const { Panel } = Collapse;

interface IProps {
  orders: IOrder[];
  handleRemoveItemFromOrder: (order: IOrder) => void;
}

const OrdersTab: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      {props.orders.map(order => (
        <div key={order.id!} className="order-collapse-wrapper">
          <Collapse key={order.id!}>
            <Panel
              key={order.id!}
              header={`${order.date} - ${order.totalPrice} ₽`}
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
