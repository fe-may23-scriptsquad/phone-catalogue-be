/* eslint-disable max-len */
/* eslint-disable no-console */
import { Sequelize } from 'sequelize';

const URLdb
  = 'postgres://products_756b_user:iDPx3JSyOl1W5VjcpIRlbz6uuFHybkZi@dpg-cjmukhlhe99c73efo5mg-a.frankfurt-postgres.render.com/products_756b';

export const sequelize = new Sequelize(URLdb, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});

export async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
