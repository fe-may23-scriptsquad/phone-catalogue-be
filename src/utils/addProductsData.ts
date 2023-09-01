import Product from "../model/Product";
import { sequelize } from "../sequelize";
import productsData from '../api/phones.json';

export const addData = async () => {
  try {
    await sequelize.sync();
    await Product.bulkCreate(productsData);
    console.log('Data loaded successfully');
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    await sequelize.close();
  }
}
