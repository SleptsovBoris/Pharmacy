import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Space } from 'antd';
import { RootState } from 'redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCartItems } from 'redux/ducks/cart_list';

const Cart: React.FC = () => {
  const cartState = useSelector((state: RootState) => state.cartList);
  const accountState = useSelector((state: RootState) => state.account);
  const token = accountState.account?.token || '';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems(false, token));
  }, [dispatch, token]);

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
