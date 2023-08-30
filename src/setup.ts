import { sequelize, connect } from '../src/config/dataBase';

function reset() {
  return sequelize.sync({ force: true });
}

connect().then(reset);
