/* eslint-disable no-console */
// eslint-disable-next-line no-shadow
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './sequelize';
import { getAll } from './utils/getAllProducts';
import Product from './model/products';
import { getAllPhones } from './utils/getAllPhones';
import Phones from './model/phones';
import { Op } from 'sequelize';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgresSQL database');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/products', async(req: Request, res: Response) => {
  let page = 1;

  if (typeof req.query.page === 'string') {
    page = parseInt(req.query.page) || 1;
  }

  let perPage = 16;

  if (typeof req.query.limit === 'string') {
    perPage = parseInt(req.query.limit) || 5;
  }

  const offset = (page - 1) * perPage;

  const category = req.query.category || 'phones';

  const sortBy = req.query.sortBy || 'year';
  const orderIn = req.query.orderIn || 'DESC';

  try {
    const productsOnPage = await getAll({
      offset,
      limit: perPage,
      where: {
        category,
      },
      order: [
        [sortBy, orderIn],
        ['id', 'ASC'],
      ],
    });

    res.status(200).json(productsOnPage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/products/hot-price', async(req, res) => {
  let page = 1;

  if (typeof req.query.page === 'string') {
    page = parseInt(req.query.page);
  }

  let perPage = 16;

  if (typeof req.query.limit === 'string') {
    perPage = parseInt(req.query.limit);
  }

  const offset = (page - 1) * perPage;

  try {
    const productsOnPage = await getAll({
      offset,
      limit: perPage,
      order: sequelize.literal('("fullPrice" - price) DESC'),
    });

    res.status(200).json(productsOnPage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/products/quantity', async(_req, res) => {
  try {
    const [phonesCount, tabletsCount, accessoriesCount] = await Promise.all([
      Product.count({ where: { category: 'phones' } }),
      Product.count({ where: { category: 'tablets' } }),
      Product.count({ where: { category: 'accessories' } }),
    ]);

    const categoriesLength = {
      phones: phonesCount,
      tablets: tabletsCount,
      accessories: accessoriesCount,
    };

    res.status(200).json(categoriesLength);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/products/:id', async(req, res) => {
  const { id } = req.params;

  try {
    const productById = await Product.findByPk(id);

    res.status(200).json(productById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/details', async(req: Request, res: Response) => {
  let page = 1;

  if (typeof req.query.page === 'string') {
    page = parseInt(req.query.page);
  }

  let perPage = 16;

  if (typeof req.query.limit === 'string') {
    perPage = parseInt(req.query.limit);
  }

  const offset = (page - 1) * perPage;

  try {
    const productsOnPage = await getAllPhones({
      offset,
      limit: perPage,
    });

    res.status(200).json(productsOnPage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/next', async(req, res) => {
  let productId = 1;

  if (req.query.productId !== undefined
    && typeof req.query.productId === 'string') {
    productId = parseInt(req.query.productId) + 1;
  }

  try {
    const nextProduct = await Product.findByPk(productId);

    res.status(200).json(nextProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/details/:itemId', async(req, res) => {
  const { itemId } = req.params;

  try {
    const phoneById = await Phones.findByPk(itemId);

    res.status(200).json(phoneById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/getProductsByIds', async(req, res) => {
  const { itemIds } = req.body;

  if (!itemIds || !Array.isArray(itemIds)) {
    return res.status(400).json({ error: 'empty ids' });
  }

  console.log(itemIds);

  try {
    const products = await Product.findAll({
      where: {
        productId: {
          [Op.in]: itemIds,
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'fatal error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
