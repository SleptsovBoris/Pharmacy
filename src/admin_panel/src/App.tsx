import React from 'react';
import 'App.scss';
import NavBar from 'components/NavBar';
import Products from 'components/Products/Products';
import { Route, Routes } from 'react-router-dom';
import OrdersList from 'components/Orders';

const App: React.FC = () => {
  return (
    <>
      {/* header */}
      <div className="header">
        <NavBar
          items={[
            {
              title: 'Панель лекарств',
              link: '/',
            },
            {
              title: 'Панель заказов',
              link: '/orders',
            },
          ]}
        />
      </div>

      {/* body */}
      <div className="body">
        <Routes>
          <Route
            path="/"
            element={
              <div className="products__area" id="products__area">
                <div className="title">Лекарства</div>
                <Products />
              </div>
            }
          />
          <Route
            path="/orders"
            element={
              <div className="products__area" id="products__area">
                <div className="title">Заказы</div>
                <OrdersList />
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
