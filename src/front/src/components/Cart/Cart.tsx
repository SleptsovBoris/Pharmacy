import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Space } from 'antd';
import { RootState } from 'redux/rootReducer';
import { useSelector } from 'react-redux';

const Cart: React.FC = () => {
  const cartState = useSelector((state: RootState) => state.cartList);

  return (
    <>
      <Space>
        <Badge count={cartState.items.length}>
          <Button
            type="text"
            shape="circle"
            style={{ width: '46px', height: '46px' }}
            icon={
              <ShoppingCartOutlined
                style={{
                  fontSize: '40px',
                  color: '#5aa65d',
                }}
              />
            }
          />
        </Badge>
      </Space>
    </>
  );
};

export default Cart;
