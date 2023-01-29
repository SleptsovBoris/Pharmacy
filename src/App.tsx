import React, { useEffect, useState } from 'react';
import logo from 'assets/pharmacy_logo.png';
import 'App.css';
import NavBar from 'components/NavBar';
import Products from 'components/Products/Products';
import { IProduct } from 'components/Products/components/Product';
import Cart from 'components/Cart/Cart';
import cookiesNames from 'constants/cookiesNames';
import cookies from 'utils/cookies';

const loremIpsum =
  'Добро пожаловать в аптеку Бориса. Здесь вы можете найти необходимые вам лекарства по самой высокой цене. Мы на рынке уже 1 год. Приобретаете лекарства и будьте здоровы! Наш адрес улица Маяковская. n reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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
          <div className="content">{loremIpsum}</div>
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
        <div className="contacts" id="contacts">
          Контакты:
          <div className="contact">+7 939 947 64-32</div>
          <div className="contact">+7 988 299 62-34</div>
          <div className="contact">+7 932 923 19-34</div>
        </div>
        <div className="rights">
          © Все права защищены. ООО &quot; Аптека Бориса &quot;
        </div>
      </div>
    </>
  );
};

export default App;
