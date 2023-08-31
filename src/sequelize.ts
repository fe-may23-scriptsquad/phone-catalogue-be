import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
   'postgres://products_756b_user:iDPx3JSyOl1W5VjcpIRlbz6uuFHybkZi@dpg-cjmukhlhe99c73efo5mg-a.frankfurt-postgres.render.com/products_756b',
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
);
