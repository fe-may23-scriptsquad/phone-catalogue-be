import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    'postgres://pasha:wFQoGnoFQarCHOn5vGOYiUMuYdkqKyJE@dpg-cjmq3d4dfrcc73b2ot7g-a.frankfurt-postgres.render.com/product_db_ll9c', // URL подключения
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
