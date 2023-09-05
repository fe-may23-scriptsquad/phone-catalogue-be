/* eslint-disable no-console */
import Product from '../model/Product';

export const syncDB = () => {
  Product.sync({ force: true })
    .then(() => {
      console.log('Product table created');
    })
    .catch((err) => {
      console.error('Unable to create product table:', err);
    });
};
