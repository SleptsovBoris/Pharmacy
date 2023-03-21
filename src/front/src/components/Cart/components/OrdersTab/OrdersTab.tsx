import { Collapse } from 'antd';
import { IOrder } from '../../Cart';
import CartList from '../CartList';

const { Panel } = Collapse;

interface IProps {
  orders: IOrder[];
  handleRemoveItemFromOrder: (order: IOrder) => void;
}

const OrdersTab: React.FC<IProps> = (props: IProps) => {
  return (
    <Collapse>
      {props.orders.map(order => (
        <Panel key={order.id!} header={`${order.date} - ${order.totalPrice} ₽`}>
          <CartList cartItems={order.products} />
        </Panel>
      ))}
    </Collapse>
  );
};

export default OrdersTab;
