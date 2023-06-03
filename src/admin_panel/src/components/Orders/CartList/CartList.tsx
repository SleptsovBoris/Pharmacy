import { Empty, InputNumber, List, Space } from 'antd';
import { IDrug } from 'api/types/product';
import locale from 'constants/locale';

export type CartItem = IDrug & {
  count: number;
};

interface IProps {
  cartItems: CartItem[];
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
              <img className="cart__item__image" src={item.img} alt="" />
            </div>
            <div className="cart__item__title">{item.drugName}</div>
            <div className="cart__item__price__wrapper">
              <div className="cart__item__price">от {item.price} ₽</div>
            </div>
          </div>
          <div className="cart__item__actions__bar">
            <Space.Compact key={'change-count-actions-bar'}>
              <InputNumber
                style={{ width: 50 }}
                controls={false}
                value={item.count}
              />
            </Space.Compact>
          </div>
        </div>
      )}
    />
  );
};

export default CartList;
