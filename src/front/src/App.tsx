import React, { useEffect, useState } from 'react';
import logo from 'assets/pharmacy_logo.png';
import lupa from 'assets/lupa.png';
import menu from 'assets/menu.svg';
import user_logo from 'assets/user_logo.svg';
import 'App.scss';
import NavBar from 'components/NavBar';
import Cart from 'components/Cart/Cart';
import { IDrug } from 'api/types/drug';
import SocialNetworks from 'components/Social_networks/SocialNetworks';
import vkIcon from 'assets/vk.svg';
import whatsappIcon from 'assets/whatsapp.svg';
import telegramIcon from 'assets/telegram.svg';
import CartPage from 'components/Cart/components/CartPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Authorization from 'components/Authorization/Authorization';
import PersonalPage from 'components/PersonalPage/PersonalPage';
import Registration from 'components/Authorization/Registration/Registration';
import ProductPage from 'components/ProductPage/ProductPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';
import PharmacyChoice from 'components/Ordering/PharmacyChoice/PharmacyChoice';
import Ordering from 'components/Ordering/Ordering';
import PharmaciesPage from 'components/PharmaciesPage/PharmaciesPage';
import Payment from 'components/Payment/Payment';
import Catalog from 'components/Catalog/Catalog';
import { fetchProducts } from 'redux/ducks/products_list';
import { Form } from 'antd';

const aboutText =
  'Мы сотрудничаем напрямую с производителями, поэтому заказанные на сайте Аптека Бориса товары поступают в аптеку напрямую с нашего склада без посредников или перекупщиков.';

const App: React.FC = () => {
  const accountState = useSelector((state: RootState) => state.account);
  const [headerText, setHeaderText] = useState('Авторизация');
  const [headerLink, setHeaderLink] = useState('/authorization');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchButtonClick = () => {
    dispatch(
      fetchProducts({
        name: form.getFieldValue('name'),
      })
    );
    navigate('/catalog');
  };

  useEffect(() => {
    if (accountState.account) {
      setHeaderText('Личный кабинет');
      setHeaderLink('/profile');
    } else {
      setHeaderText('Авторизация');
      setHeaderLink('/authorization');
    }
  }, [accountState]);

  return (
    <>
      {/* header */}
      <div className="header">
        <div className="menu__icon">
          <img className="menu__img" src={menu} alt="" />
        </div>
        <NavBar
          items={[
            {
              title: 'Аптеки',
              link: '/pharmacies',
            },
            {
              title: 'Покупателям',
              link: '/about',
            },
          ]}
        />
        <Link className="user__icon__wrapper" to={headerLink}>
          <img className="user__img" src={user_logo} alt="" />
          {headerText}
        </Link>
      </div>

      <div className="subheader">
        <div className="logo">
          <img className="logo__img" src={logo} alt="" />
          Аптека Бориса
        </div>
        <Link to="/catalog">
          <div className="catalog__button">
            <img className="menu__img" src={menu} alt="" />
            Каталог
          </div>
        </Link>

        <div className="search__area">
          <Form form={form}>
            <Form.Item name={'name'}>
              <input
                className="search__box"
                placeholder="Введите название лекарства"
              />
            </Form.Item>
          </Form>

          <div className="search__example">
            Например: Эссенциале Терафлекс Антигриппин Магне В6
          </div>
        </div>

        <button className="search__button" onClick={handleSearchButtonClick}>
          <img className="lupa__img" src={lupa} alt="" />
          Искать
        </button>
        <Link to="/cart" className="cart__button__wrapper">
          <Cart />
        </Link>
      </div>

      {/* body */}
      <div className="body">
        <Routes>
          <Route path="/catalog" element={<Catalog />} />
          <Route
            path="/catalog/:id/:form/:kind/:man"
            element={<ProductPage />}
          />
          <Route path="/pharmacies" element={<PharmaciesPage />} />
          <Route
            path="/about"
            element={
              <div className="about__area">
                <div className="title">О нас</div>
                <div className="content">{aboutText}</div>
              </div>
            }
          />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<PersonalPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/pharmacy-choice" element={<PharmacyChoice />} />
          <Route path="/ordering" element={<Ordering />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>

      {/* footer */}
      <div className="footer">
        <div className="footer__body">
          <div className="contacts" id="contacts">
            <div className="footer__title">Контакты:</div>
            <div className="contact">Центр поддержки +7 939 947 64-32</div>
            <div className="contact">@adelAptekar.gmail.com</div>
            <div className="contact">Консультация +7 932 923 19-34</div>
          </div>
          <div className="footer__navbar">
            <div className="nav">Аптеки</div>
            <div className="nav">Покупателям</div>
          </div>
          <div className="social__networks__wrapper">
            <span className="footer__title">Мы в соц-сетях:</span>
            <SocialNetworks
              items={[
                { icon: vkIcon, src: 'https://vk.com' },
                { icon: telegramIcon, src: 'https://telegram.org' },
                { icon: whatsappIcon, src: 'https://whatsapp.com' },
              ]}
            />
          </div>
        </div>
        <div className="rights">
          © Все права защищены. ООО &quot;Аптека Бориса&quot;
        </div>
      </div>
    </>
  );
};

export default App;
