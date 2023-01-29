import Product, { IProduct } from './components/Product';
import './Products.css';
import Miramistin from 'assets/miramistin.jpg';
import Nasivin from 'assets/nasivin.jpg';
import Nospa from 'assets/nospa.jpg';
import Paracetamol from 'assets/paracetamol.jpg';
import Strepsils from 'assets/strepsils.jpg';
import Vitaminc from 'assets/vitaminc.jpg';

interface IProps {
  handleAddItemToCart: (product: IProduct) => void;
  cartItems: IProduct[];
  handleOpenCart: () => void;
}

const Products: React.FC<IProps> = (props: IProps) => {
  const products: IProduct[] = [
    {
      id: 1,
      image: Miramistin,
      title: 'Мирамистин',
      price: 200,
      description: 'Описание',
    },
    {
      id: 2,
      image: Vitaminc,
      title: 'Витамин С',
      price: 180,
      description: 'Описание',
    },
    {
      id: 3,
      image: Strepsils,
      title: 'Стрепсилс',
      price: 350,
      description: 'Описание',
    },
    {
      id: 4,
      image: Nospa,
      title: 'Но-шпа',
      price: 500,
      description: 'Описание',
    },
    {
      id: 5,
      image: Paracetamol,
      title: 'Парацетамол',
      price: 300,
      description: 'Описание',
    },
    {
      id: 6,
      image: Nasivin,
      title: 'Називин',
      price: 200,
      description: 'Описание',
    },
  ];

  return (
    <div className="products">
      {products.map(item => (
        <Product
          key={item.id}
          item={item}
          handleAddItemToCart={props.handleAddItemToCart}
          cartItems={props.cartItems}
          handleOpenCart={props.handleOpenCart}
        />
      ))}
    </div>
  );
};
export default Products;
