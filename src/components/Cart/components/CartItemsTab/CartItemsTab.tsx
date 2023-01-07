import { Button, List } from 'antd';
import { IProduct } from '../../../Products/components/Product';
import { IOrder } from '../../Cart';
import './CartItemsTab.css';

interface IProps {
  cartItems: IProduct[];
  handleRemoveItemFromCart: (item: IProduct) => void;
  handleAddOrder: (order: IOrder) => void;
}

const CartItemsTab: React.FC<IProps> = (props: IProps) => {
  const totalPrice = props.cartItems.reduce(
    (result, cartItem) => result + cartItem.price,
    0
  );

  const handleAddOrder = () => {
    if (props.cartItems.length === 0) return;

    const order: IOrder = {
      products: props.cartItems,
      totalPrice: totalPrice,
      date: new Date().toDateString(),
    };
    props.handleAddOrder(order);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={props.cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key={'remove button from cart'}
                type="default"
                danger
                onClick={() => props.handleRemoveItemFromCart(item)}
              >
                Удалить
              </Button>,
            ]}
          >
            {item.title}
          </List.Item>
        )}
      />
      <div className="add__order__button__wrapper">
        <Button
          disabled={props.cartItems.length === 0}
          size={'large'}
          onClick={handleAddOrder}
        >
          Заказать
        </Button>
      </div>
    </>
  );
};
export default CartItemsTab;
