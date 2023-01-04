import Product, { IProduct } from "./components/Product";
import "./Products.css";
import Miramistin from "../../assets/miramistin.jpg";
import Nasivin from "../../assets/nasivin.jpg";
import Nospa from "../../assets/nospa.jpg";
import Paracetamol from "../../assets/paracetamol.jpg";
import Strepsils from "../../assets/strepsils.jpg";
import Vitaminc from "../../assets/vitaminc.jpg";

const Products:React.FC = () => {
    const products:IProduct[] = [
        {
            image: Miramistin,
            title: 'Мирамистин',
            price: 0,
            description: 'Описание'
        },
        {
            image: Vitaminc,
            title: 'Витамин С',
            price: 0,
            description: 'Описание'
        },
        {
            image: Strepsils,
            title: 'Стрепсилс',
            price: 0,
            description: 'Описание'
        },
        {
            image: Nospa,
            title: 'Но-шпа',
            price: 0,
            description: 'Описание'
        },
        {
            image: Paracetamol,
            title: 'Парацетамол',
            price: 0,
            description: 'Описание'
        },
        {
            image: Nasivin,
            title: 'Називин',
            price: 0,
            description: 'Описание'
        },
    ];

    return(
        <div className="products">
            {
                products.map((item) => <Product item={item}/>)
            }
          </div>
    );
}
export default Products;