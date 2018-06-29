var express = require('express');
var router = express.Router();
var studio = require("../api/controllers/StudioController.js");

// Get all studio posts
router.get('/', function(req, res) {
  studio.list(req, res);
});

router.get('/getStudio/:id', function(req, res) {
  console.log("getStudio:id");
  studio.findOne(req, res);
});

router.get('/getStudio', function(req, res) {
  console.log("getStudio");
  studio.getAll(req, res);
});


router.post('/createStudio', function(req, res) {
  console.log("getStudio");
  studio.createStudio(req, res);
});




/** Calender details */


router.get('/getStudioService/:id', function(req, res) {
  console.log("getStudioService");
  studio.getStudioService(req, res);
});


router.post('/getStudioService', function(req, res) {
  console.log("getStudioService");
  studio.studioServices(req, res);
});
router.post('/setServices', function(req, res) {
  console.log("getStudioService");
  studio.studioServices(req, res);
});

router.post('/checkSlot', function(req, res) {
  studio.checkSlot(req, res);
});

module.exports = router;
