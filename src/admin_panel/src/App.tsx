import React from 'react';
import 'App.scss';
import NavBar from 'components/NavBar';
import Products from 'components/Products/Products';
import { Route, Routes } from 'react-router-dom';
import OrdersList from 'components/Orders/OrdersList';

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
                <div className="title">Наши лекарства</div>
                <Products handleOpenCart={() => null} />
              </div>
            }
          />
          <Route path="/orders" element={<OrdersList />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
