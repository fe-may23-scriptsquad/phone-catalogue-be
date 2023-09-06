import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

class Phones extends Model {}

Phones.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  namespaceId: DataTypes.STRING,
  name: DataTypes.STRING,
  capacityAvailable: DataTypes.JSONB,
  capacity: DataTypes.STRING,
  priceRegular: DataTypes.INTEGER,
  priceDiscount: DataTypes.INTEGER,
  colorsAvailable: DataTypes.JSONB,
  color: DataTypes.STRING,
  images: DataTypes.JSONB,
  description: DataTypes.JSONB,
  screen: DataTypes.STRING,
  resolution: DataTypes.STRING,
  processor: DataTypes.STRING,
  ram: DataTypes.STRING,
  camera: DataTypes.STRING,
  zoom: DataTypes.STRING,
  cell: DataTypes.JSONB,
  year: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'phones',
});

export default Phones;
