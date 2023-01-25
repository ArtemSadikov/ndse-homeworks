const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routers'))

module.exports = app;
