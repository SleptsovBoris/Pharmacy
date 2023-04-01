import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Modal, Space, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { randomNumberInRange } from 'utils/RandomNumber';
import CartItemsTab from './components/CartItemsTab';
import OrdersTab from './components/OrdersTab';
import cookies from 'utils/cookies';
import cookiesNames from 'constants/cookiesNames';
import { CartItem } from 'App';
import { RootState } from 'redux/rootReducer';
import { useSelector } from 'react-redux';

interface IProps {
  isCartModalOpen: boolean;
  handleOpenCart: () => void;
  handleCloseCart: () => void;
}

export interface IOrder {
  id?: number;
  products: CartItem[];
  totalPrice: number;
  date: string;
}

const Cart: React.FC<IProps> = (props: IProps) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const cartState = useSelector((state: RootState) => state.cartList);

  useEffect(() => {
    const ordersFromCookies =
      (cookies.get(cookiesNames.orders) as IOrder[]) ?? [];
    setOrders(ordersFromCookies);
  }, []);

  const handleChangeOrders = (orders: IOrder[]) => {
    cookies.set(cookiesNames.orders, orders);
  };

  const handleAddOrder = (order: IOrder) => {
    order.id = randomNumberInRange(1, 1000000);
    const newOrders = [...orders, order];

    setOrders(newOrders);

    handleChangeOrders(newOrders);
  };

  const handleRemoveOrder = (orderToDelete: IOrder) => {
    const newOrders = orders.filter(order => order.id !== orderToDelete.id);

    setOrders(newOrders);

    handleChangeOrders(newOrders);
  };

  return (
    <>
      <Space>
        <Badge count={cartState.items.length}>
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={
              <ShoppingCartOutlined
                style={{
                  fontSize: '28px',
                  color: 'brown',
                }}
              />
            }
            onClick={props.handleOpenCart}
          />
        </Badge>
      </Space>
      <Modal
        open={props.isCartModalOpen}
        footer={null}
        onCancel={props.handleCloseCart}
        style={{ top: '11vh', right: '1px' }}
      >
        <Tabs
          size="large"
          defaultActiveKey="1"
          items={[
            {
              label: 'Корзина',
              key: '1',
              children: <CartItemsTab handleAddOrder={handleAddOrder} />,
            },
            {
              label: 'Заказы',
              key: '2',
              children: (
                <OrdersTab
                  orders={orders}
                  handleRemoveItemFromOrder={handleRemoveOrder}
                />
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default Cart;
