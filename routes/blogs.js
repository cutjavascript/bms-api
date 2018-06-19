var express = require('express');
var router = express.Router();
var blog = require("../api/controllers/BlogController.js");

// Get all blog posts
router.get('/', function(req, res) {
  console.log("Blogs all");
  blog.list(req, res);
});

// Get single blog post by id
router.get('/show/:id', function(req, res) {
  blog.show(req, res);
});

// Create blog post
router.get('/create', function(req, res) {
  blog.create(req, res);
});

// Save blog post
router.post('/save', function(req, res) {
  blog.save(req, res);
});

// Edit blog post
router.get('/edit/:id', function(req, res) {
  blog.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  blog.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  blog.delete(req, res);
});

module.exports = router;
