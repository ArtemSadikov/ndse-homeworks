const express = require('express');
const bodyParser = require('body-parser');
const { handleError, logError } = require( './utils/handle-error' );

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use('/api', require('./routers'))

app.use(logError);
app.use(handleError);

module.exports = app;
