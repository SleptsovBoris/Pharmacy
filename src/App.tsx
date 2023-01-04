import React from 'react';
import logo from "./assets/pharmacy_logo.png";
import './App.css';
import NavBar from './components/NavBar';
import Products from './components/Products/Products';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const App: React.FC = () => {
  return (
    <> 
      {/* header */}
      <div className='header'>
        <div className="logo">
          <img className='logo__img' src={logo} alt=""/>
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
            }
          ]}
        />
      </div>
      
      {/* body */}
      <div className='body'>
        <div className="about__area" id='about__area'>
          <div className="title">О нас</div>
          <div className="content">{loremIpsum}</div>
        </div>
        <div className="products__area" id='products__area'>
          <div className="title">Наши лекарства</div>
          <Products/>
        </div>
      </div>

      {/* footer */}
      <div className='footer'>
        <div className="contacts" id='contacts'>
          Контакты:
          <div className="contact">+7 939 947 64-32</div>
          <div className="contact">+7 988 299 62-34</div>
          <div className="contact">+7 932 923 19-34</div>
        </div>
        <div className="rights">
          © Все права защищены. ООО "Аптека Бориса"
        </div>
      </div>
    </>
  );
}

export default App;