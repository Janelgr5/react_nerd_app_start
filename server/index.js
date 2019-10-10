const express = require('express');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;
// const router = express.Router();

const app = express();

app.use(morgan('combined'));
express.static('public');
express.urlencoded({
  extended: true
});

app.use('/api', require('./apiRoutes'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(port, function () {
  console.log(`Your server, listening on port ${port}`);
});
