import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'product_db_ll9c',
  'pasha',
  encodeURIComponent('wFQoGnoFQarCHOn5vGOYiUMuYdkqKyJE'),
  {
    host: 'dpg-cjmq3d4dfrcc73b2ot7g-a.frankfurt-postgres.render.com',
    dialect: 'postgres',
  }
);
