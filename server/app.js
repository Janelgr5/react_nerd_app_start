const express = require('express');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('combined'));
express.static('public');
express.urlencoded({
  extended: true
});

app.use('/api', require('./apiRoutes'));

app.get('*', function (req, res) {
  // __dirname returns the absolute path ending in './server' but, we need to serve the index.html which is outside of the server directory.
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
