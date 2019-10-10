const express = require('express');
const router = express.Router();

// matches GET requests to /api/apiRouteOne/
router.get('/', function (req, res, next) {
  /* etc */ });
// matches POST requests to /api/apiRouteOne/
router.post('/', function (req, res, next) {
  /* etc */ });
// matches PUT requests to /api/apiRouteOne/:apiRouteOneId
router.put('/:apiRouteOneId', function (req, res, next) {
  /* etc */ });
// matches DELETE requests to /api/apiRouteOne/:apiRouteOneId
router.delete('/:apiRouteOneId', function (req, res, next) {
  /* etc */ });

module.exports = router;
