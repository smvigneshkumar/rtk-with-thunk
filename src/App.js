import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sendCartData,fetchCartData } from "./store/cart-slice";
import Notification from "./components/UI/Notification";
let initial = true;
function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  },[dispatch]);
  useEffect(() => {
    
    if (initial) {
      initial = false;
      return;
    }

    // dispatch(sendCartData(cart));
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    
  }, [cart, dispatch]);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
