const dotenv = require('dotenv');
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
}

module.exports = config;
