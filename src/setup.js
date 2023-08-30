import { sequelize, connect } from './config/dataBase.js';

function reset() {
  return sequelize.sync({ force: true });
}

connect().then(reset);
