import './Product.scss';
import { Button, Space, Divider, Modal, Tooltip } from 'antd';
import { useState } from 'react';
import { IProduct } from 'api/baseApi/models/Product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { addProduct } from 'redux/ducks/cart_list';

interface IProps {
  item: IProduct;
  handleOpenCart: () => void;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartState = useSelector((state: RootState) => state.cartList);
  const dispatch = useDispatch();

  const handleMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="product">
        <div className="product__image__wrapper">
          <img className="product__image" src={props.item.image} alt="" />
        </div>
        <div className="product__title">{props.item.title}</div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="product__price">{props.item.price} ₽</div>
        <div className="product__description">
          Описание: {props.item.description}
        </div>
        <div className="product__actions__button__wrapper">
          <Space.Compact block size="large">
            {cartState.items.find(cartItem => cartItem.id === props.item.id) ? (
              <Tooltip title="Товар уже в корзине">
                <Button block type="text" onClick={props.handleOpenCart}>
                  В корзине
                </Button>
              </Tooltip>
            ) : (
              <Button
                block
                type="text"
                onClick={() => dispatch(addProduct(props.item))}
              >
                В корзину
              </Button>
            )}
            <Button block type="text" onClick={handleMoreClick}>
              Подробнее
            </Button>
          </Space.Compact>
        </div>
      </div>
      <Modal
        width={298}
        title={props.item.title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        centered
      >
        <div className="modal-content-wrapper">
          <div className="product__image__wrapper">
            <img className="product__image" src={props.item.image} alt="" />
          </div>
          <div className="product__price">{props.item.price} ₽</div>
          <div className="product__description">
            Описание: {props.item.description}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Product;
