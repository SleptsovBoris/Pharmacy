import './Product.scss';
import {
  Button,
  Space,
  Divider,
  Image,
  Modal,
  Input,
  Switch,
  Form,
  Upload,
} from 'antd';
import { ChangeEvent, useRef, useState } from 'react';
import { IDrug } from 'api/types/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { addProduct } from 'redux/ducks/cart_list';
import { updateProduct } from 'api/endpoints/products';
import { UploadOutlined } from '@ant-design/icons';
// import { uploadFile } from 'api/endpoints/upload_files';

interface IProps {
  item: IDrug;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const cartState = useSelector((state: RootState) => state.cartList);
  const dispatch = useDispatch();
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onUploadFileButtonClick = () => {
    inputFile?.current?.click();
  };

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveButtonClick = () => {
    const updatedProduct = {
      drugId: props.item.drugId,
      img: props.item.img,
      drugName: form.getFieldValue('title') ?? props.item.drugName,
      price: form.getFieldValue('price') ?? props.item.price,
      description: form.getFieldValue('description') ?? props.item.description,
    } as IDrug;

    updateProduct(updatedProduct).then(success => {
      if (success) {
        setIsModalOpen(false);
      } else {
        console.log('Еще раз так сделаешь, я тебе руки переломаю');
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
        <div className="product__description">
          Описание: {props.item.description}
        </div>
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
          <Form.Item>
            <div>
              <input
                type="file"
                accept="image"
                id="file"
                // ref={inputFile}
                style={{ display: 'none' }}
                max={1}
                // onChange={(e: ChangeEvent<HTMLInputElement>) => {
                //   if (e.target.files === null) return;

                //   const file = e.target.files![0];

                //   const filePath = URL.createObjectURL(file);

                //   uploadFile(file.name, filePath);
                // }}
              />
              <Button
                icon={<UploadOutlined />}
                onClick={onUploadFileButtonClick}
              >
                Изменить фото
              </Button>
            </div>
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
          <Form.Item label="Доступно к заказу">
            <Switch defaultChecked />
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
