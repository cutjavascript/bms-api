var express = require('express');
var router = express.Router();
var bookingsCtrl = require("../api/controllers/bookingsController");


router.post('/setCarts', function(req, res) {
    bookingsCtrl.setCart(req, res);
  });
  
  module.exports = router;
  