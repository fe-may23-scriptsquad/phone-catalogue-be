import express from 'express';
import bodyParser from 'body-parser';
import Product from './model/Product';
import { sequelize } from './sequelize';
import productsData from './api/phones.json';

const app = express();
const PORT = process.env.PORT || 5432;

app.use(bodyParser.json());

sequelize.authenticate()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });

Product.sync({ force: true })
    .then(() => {
        console.log('Product table created');
    })
    .catch((err: any) => {
        console.error('Unable to create product table:', err);
    });

(async () => {
    try {
        await sequelize.sync();
        await Product.bulkCreate(productsData);
        console.log('Data loaded successfully');
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        await sequelize.close();
    }
})();

app.get('/', (req: any, res: any) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
