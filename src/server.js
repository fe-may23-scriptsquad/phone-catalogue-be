import express from 'express';
import cors from 'cors';
import { Product } from "./model/productModel";

require('dotenv').config();

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
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

app.listen(port, () => {
  console.log(`Phone catalogue app working on Port: ${port}`);
});
