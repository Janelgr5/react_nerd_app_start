const express = require('express');
const router = express.Router();

// matches GET requests to /api/apiRouteThree/
router.get('/', function (req, res, next) {
  /* etc */ });
// matches POST requests to /api/apiRouteThree/
router.post('/', function (req, res, next) {
  /* etc */ });
// matches PUT requests to /api/apiRouteThree/:apiRouteThreeId
router.put('/:apiRouteThreeId', function (req, res, next) {
  /* etc */ });
// matches DELETE requests to /api/apiRouteThree/:apiRouteThreeId
router.delete('/:apiRouteThreeId', function (req, res, next) {
  /* etc */ });

module.exports = router;
