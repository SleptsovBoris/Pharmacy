import { IOrder, IPutOrder } from 'api/types/order';
import { Form, Button, Select } from 'antd';
import { updateOrderState } from 'api/endpoints/orders';
import './Order.scss';

interface IProps {
  item: IOrder;
}

const getOrderStateLabel = (orderState: number) => {
  switch (orderState) {
    case 1:
      return 'Заказано';
    case 2:
      return 'В процессе сборки';
    case 3:
      return 'Готово к выдаче';
    case 4:
      return 'Завершено';
    default:
      return 'Заказано';
  }
};

const Order: React.FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();

  const initialValues = {
    orderState: getOrderStateLabel(props.item.orderState),
  };

  const handleUpdateOrderState = () => {
    const putOrder = {
      orderId: props.item.orderId,
      orderState: form.getFieldValue('orderState') ?? props.item.orderState,
    } as IPutOrder;

    updateOrderState(putOrder);
  };
  return (
    <>
      <div className="order">
        <span className="order__date">
          {`Дата заказа: ${new Date(props.item.creationDate).toLocaleDateString(
            'ru-Ru'
          )} ${new Date(props.item.creationDate).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })} `}
        </span>
        <span className="order__price">
          Сумма заказа: {props.item.totalPrice} ₽
        </span>
        <span className="order__address">
          Адрес аптеки: {props.item.pharmacy.address}
        </span>
        <span className="order__state">
          Статус заказа:
          <Form form={form} initialValues={initialValues}>
            <Form.Item name={'orderState'}>
              <Select
                size="small"
                className="filter"
                style={{ width: 170 }}
                options={[
                  {
                    label: 'Выберите статус заказа:',
                    options: [
                      { value: 1, label: 'Заказано' },
                      { value: 2, label: 'В процессе сборки' },
                      { value: 3, label: 'Готово к выдаче' },
                      { value: 4, label: 'Завершено' },
                    ],
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </span>
        <div className="state__button">
          <Button size="small" onClick={handleUpdateOrderState}>
            Изменить
          </Button>
        </div>
      </div>
    </>
  );
};

export default Order;
