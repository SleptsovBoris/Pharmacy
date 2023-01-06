import './Product.css';

export interface IProduct {
    image: string;
    title: string;
    price: number;
    description: string;
}

interface IProps {
    item: IProduct;
}

const Product: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="product">
            <div className="product__image__wrapper">
                <img className="product__image" src={props.item.image} alt="" />
            </div>
            <div className="product__title">{props.item.title}</div>
            <div className="product__price">{props.item.price} ₽</div>
            <div className="product__description">
                Описание: {props.item.description}
            </div>
        </div>
    );
};
export default Product;
