import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './sequelize';
import { getAll } from './utils/getAllProducts';
import Product from './model/products';
import { getAllPhones } from './utils/getAllPhones';
import Phones from './model/phones';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public'))

sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/products', async(req: Request, res: Response) => {
  let page = 1;

  if (typeof req.query.page === 'string') {
    page = parseInt(req.query.page) || 1;
  }
  let perPage = 5;

  if (typeof req.body.limit === "number") {
    perPage = +req.body.limit || 5;
  } 
  const offset = (page - 1) * perPage;

  try {
    const productsOnPage = await getAll({
      offset,
      limit: perPage,
    });

    res.status(200).json(productsOnPage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/phones', async(req: Request, res: Response) => {
  let page = 1;

  if (typeof req.query.page === 'string') {
    page = parseInt(req.query.page) || 1;
  }
  let perPage = 5;

  if (typeof req.body.limit === "number") {
    perPage = +req.body.limit || 5;
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


app.get('/next', async (req, res) => {
  let productId = 1;

  if (req.query.productId !== undefined && typeof req.query.productId === 'string') {
    productId = parseInt(req.query.productId) + 1;
  }

  try {
    const nextProduct = await Product.findByPk(productId);
    res.status(200).json(nextProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
})

app.get('/phones/:id', async (req, res) => {
  const { id } = req.params; 
  try {
    const nextProduct = await Phones.findByPk(id);
    res.status(200).json(nextProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
