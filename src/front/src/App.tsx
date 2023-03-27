import React, { useEffect, useState } from 'react';
import logo from 'assets/pharmacy_logo.png';
import 'App.scss';
import NavBar from 'components/NavBar';
import Products from 'components/Products/Products';
import Cart from 'components/Cart/Cart';
import cookiesNames from 'constants/cookiesNames';
import cookies from 'utils/cookies';
import { IProduct } from 'api/baseApi/models/Product';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import SocialNetworks from 'components/Social_networks/SocialNetworks';
import vkIcon from 'assets/vk.svg';
import whatsappIcon from 'assets/whatsapp.svg';
import telegramIcon from 'assets/telegram.svg';

const aboutText =
  'Цены на многие лекарства и товары для красоты и здоровья на сайте Аптека Бориса ниже, чем в среднем в аптеках. Мы сотрудничаем напрямую с производителями, поэтому заказанные на сайте Аптека Бориса товары поступают в аптеку напрямую с нашего склада без посредников или перекупщиков.';

export type CartItem = IProduct & {
  count: number;
};

const App: React.FC = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(cookies.get(cookiesNames.cart) ?? []);
  }, []);

  const handleAddItemToCart = (product: IProduct) => {
    if (cartItems.find(cartItem => cartItem.id == product.id)) return;

    const newCartItems = [...cartItems, { ...product, count: 1 }];

    setCartItems(newCartItems);

    handleCartItemsChange(newCartItems);
  };

  const handleChangeCartItemCount = (cartItemId: number, newCount: number) => {
    if (newCount < 1 || newCount > 100) return;

    const newCartItems = cartItems.slice();
    const cartItem = newCartItems.find(cartItem => cartItem.id == cartItemId);

    if (!cartItem) return;
    cartItem.count = newCount;
    setCartItems(newCartItems);
  };

  const handleRemoveItemFromCart = (product: IProduct) => {
    const newCartItems = [
      ...cartItems.filter(cartItem => cartItem.id !== product.id),
    ];

    setCartItems(newCartItems);

    handleCartItemsChange(newCartItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
    handleCartItemsChange([]);
  };

  const handleOpenCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  const handleCartItemsChange = (newCartItems: CartItem[]) => {
    cookies.set(cookiesNames.cart, newCartItems);
  };

  return (
    <>
      {/* header */}
      <div className="header">
        <div className="logo">
          <img className="logo__img" src={logo} alt="" />
        </div>
        <NavBar
          items={[
            {
              title: 'Выбрать лекарства',
              link: '/#products__area',
            },
            {
              title: 'О нас',
              link: '/#about__area',
            },
            {
              title: 'Контакты',
              link: '/#contacts',
            },
          ]}
        />
        <div className="cart__wrapper">
          <Cart
            cartItems={cartItems}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
            handleClearCart={handleClearCart}
            isCartModalOpen={isCartModalOpen}
            handleOpenCart={handleOpenCart}
            handleCloseCart={handleCloseCart}
            handleChangeCartItemCount={handleChangeCartItemCount}
          />
        </div>
      </div>

      {/* body */}
      <div className="body">
        <div className="about__area" id="about__area">
          <div className="title">О нас</div>
          <div className="content">{aboutText}</div>
        </div>
        <div className="products__area" id="products__area">
          <div className="title">Наши лекарства</div>
          <Products
            handleAddItemToCart={handleAddItemToCart}
            cartItems={cartItems}
            handleOpenCart={handleOpenCart}
          />
        </div>
      </div>

      {/* footer */}
      <div className="footer">
        <div className="footer__body">
          <div className="contacts" id="contacts">
            <div className="footer__title">Контакты:</div>
            <div className="contact">Центр поддержки +7 939 947 64-32</div>
            <div className="contact">Главный офис +7 988 299 62-34</div>
            <div className="contact">Консультация +7 932 923 19-34</div>
          </div>
          <div className="yandex-maps__wrapper">
            <div className="footer__title">Мы на карте</div>
            <YMaps>
              <Map
                className="yandex-map"
                options={{
                  autoFitToViewport: 'always',
                  yandexMapDisablePoiInteractivity: true,
                }}
                defaultState={{ center: [55.779474, 49.128126], zoom: 16 }}
              >
                <Placemark
                  geometry={[55.779474, 49.128126]}
                  properties={{
                    iconCaption: 'Мы ждем вас здесь!',
                  }}
                />
              </Map>
            </YMaps>
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
