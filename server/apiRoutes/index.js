const express = require('express');
const router = express.Router();

router.use('/apiRouteOne', require('./apiRouteOne'));
router.use('/apiRouteTwo', require('./apiRouteTwo'));
router.use('/apiRouteThree', require('./apiRouteThree'));

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
