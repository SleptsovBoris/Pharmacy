import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber, List, Space } from 'antd';
import { IProduct } from 'api/baseApi/models/Product';
import { CartItem } from 'App';
import './CartList.css';

interface IProps {
  cartItems: CartItem[];
  handleRemoveItemFromCart?: (item: IProduct) => void;
  handleChangeCartItemCount?: (cartItem: number, newCount: number) => void;
}

const CartList: React.FC<IProps> = (props: IProps) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.cartItems}
      renderItem={item => (
        <div className="cart__item">
          <div className="cart__item__content__wrapper">
            <div className="cart__item__image__wrapper">
              <img className="cart__item__image" src={item.image} alt="" />
            </div>
            <div className="cart__item__title">{item.title}</div>
            <div className="cart__item__price__wrapper">
              <div className="cart__item__price">{item.price} ₽</div>
            </div>
          </div>
          <div className="cart__item__actions__bar">
            <Space.Compact key={'change-count-actions-bar'}>
              {props.handleChangeCartItemCount && (
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => {
                    if (props.handleChangeCartItemCount)
                      props.handleChangeCartItemCount(item.id, item.count - 1);
                  }}
                />
              )}
              <InputNumber
                min={1}
                max={100}
                style={{ width: 50 }}
                controls={false}
                value={item.count}
                onChange={value => {
                  if (props.handleChangeCartItemCount)
                    props.handleChangeCartItemCount(item.id, value ?? 1);
                }}
              />
              {props.handleChangeCartItemCount && (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    if (props.handleChangeCartItemCount)
                      props.handleChangeCartItemCount(item.id, item.count + 1);
                  }}
                />
              )}
            </Space.Compact>
            {props.handleRemoveItemFromCart && (
              <Button
                key={'delete-item-button'}
                onClick={() => {
                  if (props.handleRemoveItemFromCart)
                    props.handleRemoveItemFromCart(item);
                }}
                icon={<DeleteOutlined />}
                danger
              />
            )}
          </div>
        </div>
      )}
    />
  );
};

export default CartList;
