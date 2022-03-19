import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const items = [{
    "id":1,
    "title": "Brown eggs",
    "description": "Raw organic brown eggs in a basket",
    "price": 28.1
  }, {
    "id":3,
    "title": "Sweet fresh stawberry",
    "description": "Sweet fresh stawberry on the wooden table",
    "price": 29.45
  }, {
    "id":2,
    "title": "Asparagus",
    "description": "Asparagus with ham on the wooden table",
    "price": 18.95
  }];
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {items && items.map(item => <ProductItem key={item.id} item = {item}/>)}
      </ul>
    </section>
  );
};

export default Products;
