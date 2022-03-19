import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import {uiActions} from '../../store/ui-slice';
import { useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const handleMyCart = () => {
    dispatch(uiActions.cartToggle());
  };
  return (
    <button className={classes.button} onClick={handleMyCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
