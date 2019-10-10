const express = require('express');
const router = express.Router();

router.use('/apiRouteOne', require('./apiRouteOne'));
router.use('/apiRouteTwo', require('./apiRouteTwo'));
router.use('/apiRouteThree', require('./apiRouteThree'));

module.exports = router;
