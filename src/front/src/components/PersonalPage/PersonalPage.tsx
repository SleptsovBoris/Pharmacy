import OrdersList from 'components/PersonalPage/components/OrdersList/OrdersList';
import './PersonalPage.scss';
import { Divider, Empty, Form, List } from 'antd';
import pen from 'assets/pen.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import { useNavigate } from 'react-router-dom';
import { IAccount, resetUser, setUser, updateUser } from 'redux/ducks/account';
import locale from 'constants/locale';
import FavorPharmacy from 'components/PharmaciesPage/PharmaciesList/components/FavorPharmacy/FavorPharmacy';
import { useState } from 'react';
import { IPutAccountData } from 'api/types/account';
import { update } from 'api/endpoints/account';
import FavoriteProduct from 'components/Products/components/FavoriteProduct/FavoriteProduct';
import { clearCart } from 'redux/ducks/cart_list';
import { clearOrders } from 'redux/ducks/orders_list';

const PersonalPage: React.FC = () => {
  const accountState = useSelector((state: RootState) => state.account);
  const [form] = Form.useForm();

  const favorDrugsState = useSelector(
    (state: RootState) => state.favorProductsList
  );
  const favorPharmaciesState = useSelector(
    (state: RootState) => state.favorPharmaciesList
  );

  const [updateEnabled, setUpdateEnabled] = useState(false);

  const handleChange = () => {
    setUpdateEnabled(true);
  };

  const handleCancel = () => {
    setUpdateEnabled(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetUser());
    dispatch(clearCart());
    dispatch(clearOrders());
    navigate('/authorization');
  };

  const handleUpdate = () => {
    const putData = {
      phone: form.getFieldValue('phone'),
      password: form.getFieldValue('password'),
    } as IPutAccountData;

    console.log(putData.phone, putData.password);

    update(putData, accountState.account?.token ?? '').then(response => {
      if (!response.data.data) return;

      dispatch(
        updateUser({
          type: response.data.data.isAnonymous ? 'anonymous' : 'authorized',
          phone: response.data.data.phone,
          token: accountState.account?.token,
        } as IAccount)
      );
    });

    setUpdateEnabled(false);
  };

  return (
    <>
      <div className="personal__area">
        <div className="row__wrapper">
          <div className="personal__title">Личный кабинет</div>
          <button className="logout__button" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>

        <div className="row__wrapper">
          <div className="personal__form">
            <div className="change__info">
              <div className="profile__subtitle">Личные данные</div>
              <img
                className="pen__image"
                src={pen}
                alt=""
                onClick={handleChange}
              />
            </div>
            <Divider style={{ border: '1px solid #373c42' }} />
            <div className="personal__info__wrapper">
              <Form form={form}>
                <Form.Item name={'phone'} required>
                  <div className="personal__field">
                    <div className="personal__info">Телефон:</div>
                    <input
                      disabled={!updateEnabled}
                      className="input__box"
                      defaultValue={accountState.account?.phone}
                      placeholder="Введите телефон"
                    />
                  </div>
                </Form.Item>
                <Form.Item name={'password'} required>
                  <div className="personal__field">
                    <div className="personal__info">Пароль:</div>
                    <input
                      disabled={!updateEnabled}
                      type="password"
                      className="input__box"
                      placeholder="Введите новый пароль"
                    />
                  </div>
                </Form.Item>
              </Form>
            </div>
            {updateEnabled && (
              <div className="change__buttons">
                <button onClick={handleCancel} className="cancel__button">
                  Отменить
                </button>
                <button onClick={handleUpdate} className="confirm__button">
                  Сохранить
                </button>
              </div>
            )}
          </div>

          <div className="personal__form">
            <div className="personal__subtitle">Избранные аптеки</div>
            <Divider style={{ border: '1px solid #373c42' }} />
            <List
              className="pharmacies__list"
              locale={{
                emptyText: <Empty description={locale.noDataMessage} />,
              }}
              itemLayout="horizontal"
              dataSource={favorPharmaciesState.items}
              renderItem={item => <FavorPharmacy />}
            />
            {/* <div className="pharmacies__list">
              <FavorPharmacy />
            </div> */}
          </div>
        </div>

        <div className="personal__form2">
          <div className="personal__subtitle">Избранные лекарства</div>
          <Divider style={{ border: '1px solid #373c42' }} />
          <List
            className="products__list"
            locale={{
              emptyText: <Empty description={locale.noDataMessage} />,
            }}
            itemLayout="horizontal"
            dataSource={favorDrugsState.items}
            renderItem={item => <></>}
          />
          {/* <div className="products__list">
            <FavoriteProduct />
          </div> */}
        </div>

        <div className="personal__form2">
          <div className="personal__subtitle">История заказов</div>
          <Divider style={{ border: '1px solid #373c42' }} />
          <div className="products__list">
            <OrdersList />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalPage;
