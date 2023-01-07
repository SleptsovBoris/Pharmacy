import Product, { IProduct } from './components/Product';
import './Products.css';
import Miramistin from '../../assets/miramistin.jpg';
import Nasivin from '../../assets/nasivin.jpg';
import Nospa from '../../assets/nospa.jpg';
import Paracetamol from '../../assets/paracetamol.jpg';
import Strepsils from '../../assets/strepsils.jpg';
import Vitaminc from '../../assets/vitaminc.jpg';

interface IProps {
  handleAddItemToCart: (product: IProduct) => void;
}

const Products: React.FC<IProps> = (props: IProps) => {
  const products: IProduct[] = [
    {
      id: 1,
      image: Miramistin,
      title: 'Мирамистин',
      price: 0,
      description: 'Описание',
    },
    {
      id: 2,
      image: Vitaminc,
      title: 'Витамин С',
      price: 0,
      description: 'Описание',
    },
    {
      id: 3,
      image: Strepsils,
      title: 'Стрепсилс',
      price: 0,
      description: 'Описание',
    },
    {
      id: 4,
      image: Nospa,
      title: 'Но-шпа',
      price: 0,
      description: 'Описание',
    },
    {
      id: 5,
      image: Paracetamol,
      title: 'Парацетамол',
      price: 0,
      description: 'Описание',
    },
    {
      id: 6,
      image: Nasivin,
      title: 'Називин',
      price: 0,
      description: 'Описание',
    },
  ];

  return (
    <div className="products">
      {products.map((item) => (
        <Product
          key={item.id}
          item={item}
          handleAddItemToCart={props.handleAddItemToCart}
        />
      ))}
    </div>
  );
};
export default Products;
