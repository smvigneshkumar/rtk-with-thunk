import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import {cartActions} from '../../store/cart-slice';

const ProductItem = (props) => {
  const { id,title, price, description } = props.item;
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(cartActions.addProductToCart({title,price,id}));
  };

  return (
    <li className={classes.item} key={id}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick = {handleAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
