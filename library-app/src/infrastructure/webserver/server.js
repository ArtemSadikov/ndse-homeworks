const express = require('express');
const { handleError, logError } = require( './utils/handle-error' );

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routers'))

app.use(logError);
app.use(handleError);

module.exports = app;
