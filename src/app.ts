import express from 'express';
import bodyParser from 'body-parser';
import Product from './model/Product';
import { sequelize } from './sequelize';
import { getAll } from './utils/getAllProducts';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

sequelize.authenticate()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });


app.get('/', (req: any, res: any) => {
    res.send('Hello World!');
});

app.get('/product', async(req, res) => {
    let page = 1;
  
    if (typeof req.query.page === 'string') {
      page = parseInt(req.query.page) || 1;
    }
    const perPage = 5;
    const offset = (page - 1) * perPage;
  
    try {
      const productsOnPage = await Product.findAll({
        offset,
        limit: perPage,
      });
  
      res.status(200).json(productsOnPage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


app.get('/products', async (req, res) => {
        const allProducts = await getAll();
        res.statusCode = 200;
        res.json(allProducts)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
