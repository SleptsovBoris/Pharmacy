import './Product.scss';
import { Button, Space, Divider, Image, Modal, Input, Form } from 'antd';
import { useState } from 'react';
import { IDrug } from 'api/types/product';
import { updateProduct } from 'api/endpoints/products';

interface IProps {
  item: IDrug;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveButtonClick = () => {
    const updatedProduct = {
      drugId: props.item.drugId,
      drugName: form.getFieldValue('title') ?? props.item.drugName,
      price: form.getFieldValue('price') ?? props.item.price,
      description: form.getFieldValue('description') ?? props.item.description,
      count: form.getFieldValue('count') ?? props.item.count,
      amount: form.getFieldValue('amount') ?? props.item.amount,
      instruction: form.getFieldValue('instruction') ?? props.item.instruction,
    } as IDrug;

    updateProduct(updatedProduct).then(success => {
      if (success) {
        setIsModalOpen(false);
      } else {
        console.log('Ошибка при изменении');
      }
    });

    console.log('сохраняем');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="product">
        <div className="product__image__wrapper">
          <img className="product__image" src={props.item.img} alt="" />
        </div>
        <div className="product__title">{props.item.drugName}</div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="product__price">{props.item.price} ₽</div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="product__description">Оставшееся количество:</div>
        <div className="product__price">{props.item.count}</div>
        <div className="product__actions__button__wrapper">
          <Space.Compact block size="large">
            <Button block type="text" onClick={handleEditButtonClick}>
              Редактировать
            </Button>
          </Space.Compact>
        </div>
      </div>
      <Modal
        width={'400px'}
        title="Окно редактирования"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        centered
      >
        <Form
          labelCol={{ span: 9 }}
          layout={'horizontal'}
          form={form}
          style={{ width: '100%' }}
        >
          <Form.Item>
            <Image width={'100%'} src={props.item.img} />
          </Form.Item>
          <Form.Item name={'title'} label="Название">
            <Input defaultValue={props.item.drugName} />
          </Form.Item>
          <Form.Item name={'price'} label="Цена">
            <Input defaultValue={props.item.price} type={'number'} />
          </Form.Item>
          <Form.Item name={'description'} label="Описание">
            <Input defaultValue={props.item.description} />
          </Form.Item>
          <Form.Item name={'instruction'} label="Инструкция">
            <Input defaultValue={props.item.instruction} />
          </Form.Item>
          <Form.Item name={'amount'} label="Кол-во в упаковке">
            <Input defaultValue={props.item.amount} />
          </Form.Item>
          <Form.Item name={'count'} label="Кол-во лекарства">
            <Input defaultValue={props.item.count} />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" onClick={handleSaveButtonClick}>
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Product;
