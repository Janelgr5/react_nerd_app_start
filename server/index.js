const express = require('express');
const morgan = require('morgan');
// const router = express.Router();

const app = express();

app.use(morgan('combined'));
express.static('public');
express.urlencoded({
  extended: true
});

app.use('/api', require('./apiRoutes'));
