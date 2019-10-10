const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
express.static('public');
express.urlencoded({
  extended: true
});
