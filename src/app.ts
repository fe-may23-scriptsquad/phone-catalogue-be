import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './sequelize';
import { getAll } from './utils/getAllProducts';

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
    const perPage = 5;
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
