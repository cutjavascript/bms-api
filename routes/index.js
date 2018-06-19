var express = require('express');
var router = express.Router();
var blog = require("../api/controllers/BlogController.js");
var studio = require("../api/controllers/StudioController.js");

router.get('/', function(req, res, next) {
  blog.roll(req, res);
});
module.exports = router;
