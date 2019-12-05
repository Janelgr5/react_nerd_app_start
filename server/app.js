const express = require('express');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
express.urlencoded({
  extended: true
});
express.json();
express.static('public');

app.use('/api', require('./apiRoutes'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(port, function () {
  console.log(`Your server, listening on port ${port}`);
});
