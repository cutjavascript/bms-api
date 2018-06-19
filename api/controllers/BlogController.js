var mongoose = require("mongoose");
var Blog = require("../models/Blog");
//var Studio = require("../models/Studio");

var blogController = {};


// All Posts on Homepage this is rolls
blogController.roll = function(req, res) {
  Blog.find({}).exec(function (err, blogs) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      // res.render("../views/blogs/roll", {blogs: blogs});
      res.json({data: blogs});
    }
  });  
};


// All Blog Posts
blogController.list = function(req, res) {
  Blog.find({}).exec(function (err, blogs) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      // res.render("../views/blogs/index", {blogs: blogs});
      console.log("blogController.list, ", {blogs: blogs});
      res.json({data: blogs});
    }
  });
};

// Show blog by id
blogController.show = function(req, res) {
  Blog.findOne({_id: req.params.id}).exec(function (err, blog) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      // res.render("../views/blogs/show", {blog: blog});
      res.json({data: blog});
    }
  });
};

// New Blog Post
blogController.create = function(req, res) {
  // res.render("../views/blogs/create");
  res.send("create page");
};

// Save Blog Post
blogController.save = function(req, res) {
  var blog = new Blog(req.body);

  blog.save(function(err) {
    if(err) {
      console.log(err);
      // res.render("../views/blogs/create");
      res.send("creat page");
    } else {
      console.log("Successfully created an blog.");
      res.redirect("/blogs/show/"+blog._id);
    }
  });
};

// Edit an blog
blogController.edit = function(req, res) {
  Blog.findOne({_id: req.params.id}).exec(function (err, blog) {
    if (err) {
      console.log("Kuch to gadbad hai Daya | Error:", err);
    }
    else {
      // res.render("../views/blogs/edit", {blog: blog});
      res.json({data: blog});
    }
  });
};

// Update and saving fields of blog to database
blogController.update = function(req, res) {
  Blog.findByIdAndUpdate(req.params.id, { $set: {title: req.body.title, description: req.body.description, comments: req.body.comments}}, { new: true }, function (err, blog) {
    if (err) {
      console.log(err);
      // res.render("../views/blogs/edit", {blog: req.body});
      res.json({data: req.body});
    }
    res.redirect("/blogs/show/"+blog._id);
    console.log("Post updated");
  });
};

// Delete an blog
blogController.delete = function(req, res) {
  Blog.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Post deleted!");
      res.redirect("/");
    }
  });
};

module.exports = blogController;

