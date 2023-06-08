import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Empty, InputNumber, List, Space } from 'antd';
import './CartList.scss';
import locale from 'constants/locale';
import { CartItem } from 'api/types/cart';

interface IProps {
  cartItems: CartItem[];
  handleChangeCartItemCount?: (cartItem: number, newCount: number) => void;
  handleRemoveItemFromCart?: (itemId: number) => void;
}

const CartList: React.FC<IProps> = (props: IProps) => {
  return (
    <List
      locale={{ emptyText: <Empty description={locale.noDataMessage} /> }}
      itemLayout="horizontal"
      dataSource={props.cartItems}
      renderItem={item => (
        <div className="cart__item">
          <div className="cart__item__content__wrapper">
            <div className="cart__item__image__wrapper">
              <img className="cart__item__image" src={item.drug.img} alt="" />
            </div>
            <div className="cart__item__title">{item.drug.drugName}</div>
            <div className="cart__item__price__wrapper">
              <div className="cart__item__price">от {item.drug.price} ₽</div>
            </div>
          </div>
          <div className="cart__item__actions__bar">
            <Space.Compact key={'change-count-actions-bar'}>
              {props.handleChangeCartItemCount && (
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => {
                    if (props.handleChangeCartItemCount)
                      props.handleChangeCartItemCount(
                        item.drug.drugId,
                        item.amount - 1
                      );
                  }}
                />
              )}
              <InputNumber
                min={1}
                max={100}
                style={{ width: 50 }}
                controls={false}
                value={item.amount}
                onChange={value => {
                  if (props.handleChangeCartItemCount)
                    props.handleChangeCartItemCount(
                      item.drug.drugId,
                      value ?? 1
                    );
                }}
              />
              {props.handleChangeCartItemCount && (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    if (props.handleChangeCartItemCount)
                      props.handleChangeCartItemCount(
                        item.drug.drugId,
                        item.amount + 1
                      );
                  }}
                />
              )}
            </Space.Compact>
            {props.handleRemoveItemFromCart && (
              <Button
                key={'delete-item-button'}
                onClick={() => {
                  if (props.handleRemoveItemFromCart)
                    props.handleRemoveItemFromCart(item.drug.drugId);
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
