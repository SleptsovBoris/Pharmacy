import './Product.css';
import { Button, Space, Divider, Modal, Tooltip } from 'antd';
import { useState } from 'react';

export interface IProduct {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

interface IProps {
  item: IProduct;
  handleAddItemToCart: (product: IProduct) => void;
  cartItems: IProduct[];
  handleOpenCart: () => void;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        {/* <div className="product__description">
                Описание: {props.item.description}
            </div> */}
        <div className="product__actions__button__wrapper">
          <Space.Compact block size="large">
            {props.cartItems.find(cartItem => cartItem.id === props.item.id) ? (
              <Tooltip title="Товар уже в корзине">
                <Button block type="text" onClick={props.handleOpenCart}>
                  В корзине
                </Button>
              </Tooltip>
            ) : (
              <Button
                block
                type="text"
                onClick={() => props.handleAddItemToCart(props.item)}
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
