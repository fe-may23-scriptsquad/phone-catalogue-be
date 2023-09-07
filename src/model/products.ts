import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

class Product extends Model {
  capacity: string | undefined;
  year: number | undefined;
  price: number | undefined;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: DataTypes.STRING,
  productId: {
    type: DataTypes.STRING,
    references: {
      model: 'phones',
      key: 'id',
    },
  },
  itemId: DataTypes.STRING,
  name: DataTypes.STRING,
  fullPrice: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
  screen: DataTypes.STRING,
  capacity: DataTypes.STRING,
  color: DataTypes.STRING,
  ram: DataTypes.STRING,
  year: DataTypes.INTEGER,
  image: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'product',
});

export default Product;
