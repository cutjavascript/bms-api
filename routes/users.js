var express = require('express');
var router = express.Router();
var user = require('../api/controllers/userController');

//Login
router.post('/login', function(req, res) {
  user.login(req, res);
});

//All Users List
router.get('/', function(req, res, next) {
  user.list(req, res, next);
});
router.post('/create', function(req, res) {
  user.save(req, res);
});
router.get('/show/:id', function(req, res) {
  user.showById(req, res);
});

module.exports = router;
