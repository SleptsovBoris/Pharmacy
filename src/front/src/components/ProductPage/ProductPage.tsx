import { IDrug } from 'api/types/drug';
import './ProductPage.scss';
import { Divider, Tabs, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import baseApiClient from 'api/common/base_api_client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { addDrug } from 'redux/ducks/cart_list';

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<IDrug | null>(null);
  const [manufacturerName, setManufacturerName] = useState<string | null>(null);
  const [kindName, setKindName] = useState<string | null>(null);
  const [formName, setFormName] = useState<string | null>(null);

  const cartState = useSelector((state: RootState) => state.cartList);
  const accountState = useSelector((state: RootState) => state.account);
  const token = accountState.account?.token || '';

  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id;
  const formId = params.form;
  const kindId = params.kind;
  const manufacturerId = params.man;

  const getProduct = async () => {
    const response = await baseApiClient.get(`drugs/${id}`);
    setProduct(response.data);
  };

  const getManufacturer = async () => {
    const response = await baseApiClient.get(`manufacturer/${manufacturerId}`);
    setManufacturerName(response.data);
  };

  const getKind = async () => {
    const response = await baseApiClient.get(`drugkind/${kindId}`);
    setKindName(response.data);
  };

  const getForm = async () => {
    const response = await baseApiClient.get(`drugform/${formId}`);
    setFormName(response.data);
  };

  const handleAddToCart = () => {
    if (product !== null) {
      dispatch(addDrug(product, token));
    }
  };

  useEffect(() => {
    getProduct();
    getManufacturer();
    getKind();
    getForm();
  }, [id]);

  return (
    <>
      <div className="product-page__area">
        <div className="product__info__area">
          <div className="image__column">
            <div className="product__image__wrapper">
              <img className="product__image" src={product?.img} alt="" />
            </div>
            <div className="row__wrapper">
              <div className="product__price">от {product?.price} ₽</div>
              <div className="count__wrapper">{product?.count}</div>
            </div>
            {
              cartState.items &&
              cartState.items.find(
                cartItem => cartItem.drugId === product?.drugId
              ) ? (
                /* eslint-disable */
                <Tooltip title="Товар уже в корзине">
                  <button className="in_cart_button">В корзине</button>
                </Tooltip>
              ) : (
                /* eslint-enable */
                /* eslint-disable */
                <button
                  className="add__to__cart__button"
                  onClick={handleAddToCart}
                >
                  В корзину
                </button>
              ) /* eslint-enable */
            }
          </div>

          <div className="info__column">
            <div className="product__title">{product?.drugName}</div>
            <div className="recept__info">Отпуск: {product?.recept}</div>
            <Divider />
            <div className="product__info">
              <div className="info__title">Описание:</div>
              <div className="info__field">{product?.description}</div>
            </div>
            <Divider />
            <div className="product__info">
              <div className="info__title">Производитель:</div>
              <div className="info__field">{manufacturerName}</div>
            </div>
            <Divider />
            <div className="product__info">
              <div className="info__title">Вид лекарства:</div>
              <div className="info__field">{kindName}</div>
            </div>
            <Divider />
            <div className="product__info">
              <div className="info__title">Форма выпуска:</div>
              <div className="info__field">{formName}</div>
            </div>
            <Divider />
            <div className="product__info">
              <div className="info__title">Количество в упаковке:</div>
              <div className="info__field">{product?.amount}</div>
            </div>
            <Divider />
          </div>
        </div>

        <div className="product__info2__area">
          <Tabs
            size="large"
            defaultActiveKey="1"
            items={[
              {
                label: 'Инструкция',
                key: '1',
                children: <>{product?.instruction}</>,
              },
              {
                label: 'Формы выпуска',
                key: '2',
                children: <></>,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
