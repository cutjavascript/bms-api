var express = require('express');
var router = express.Router();
var bookingsCtrl = require("../api/controllers/bookingsController");


router.post('/setCarts', function(req, res) {
    bookingsCtrl.setCart(req, res);
});

router.post('/submitServices', function(req, res) {
  bookingsCtrl.setService(req, res);
});
  
router.post('/cartServices', function(req, res) {
  bookingsCtrl.cartServices(req, res);
});

router.post('/addSlots', function(req, res) {
  bookingsCtrl.addSlots(req, res);
});

router.post('/uncheckSlots', function(req, res) {
  bookingsCtrl.uncheckSlots(req, res);
});
  

router.post('/getCart', function(req, res) {
  bookingsCtrl.getCart(req, res);
});
  
  module.exports = router;
  