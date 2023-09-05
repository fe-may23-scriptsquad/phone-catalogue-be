/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');

dotenv.config();

const { DB_PASSWORD, DB_HOST, DB_NAME, DB_USER } = process.env;

const dbURL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const settings = {
  url: dbURL,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

module.exports = {
  development: {
    ...settings,
  },
  test: {
    ...settings,
  },
  production: {
    ...settings,
  },
};
