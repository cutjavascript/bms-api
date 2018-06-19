var mongoose = require("mongoose");
var User = require("../models/User");

var usersController = {};
var resObj = {
  item: [],
  status: "",
  error: false
};

// All User Posts
usersController.list = function(req, res) {
  User.find({}).exec(function (err, data) {
    if (err) {
      // console.log("Error:", err);
      resObj.item = [];
      resObj.status = "failed";
      resObj.error = "Something went wrong ("+err+")";

      res.json(resObj);
    }
    else {
      // console.log("usersController.list, ", {item: data});

      resObj.item = data;
      resObj.status = "success";
      resObj.error = false;

      res.json(resObj);
    }
  });
};

// Show user by id
usersController.showById = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function (err, data) {
    if (err) {
      console.log("Error:", err);
      resObj.item = [];
      resObj.status = "failed";
      resObj.error = "Something went wrong ("+err+")";

      res.json(resObj);
    }
    else {
      resObj.item = data;
      resObj.status = "success";
      resObj.error = false;
      res.json(resObj);
    }
  });
};

// Save User
usersController.save = function(req, res) {
  console.log(req.body);
  var user = new User(req.body);

  user.save(function(err) {
    if(err) {
      console.log(err);
      res.json({
        status: "failed",
        error: "Something went wrong ("+err+")"
      })

    } else {
      console.log("Successfully created an blog.");
      res.json({
        status: "success",
        error: false
      })
    }
  });
};

// login User
usersController.login = function(req, res) {
  console.log(req.body);
  // var user = new User(req.body);
  User.findOne({email: req.body.email, password: req.body.password}).exec(function (err, data) {
    if (err) {
      console.log("Error:", err);
      resObj.item = [];
      resObj.status = "failed";
      resObj.error = "Something went wrong ("+err+")";

      res.json(resObj);
    }
    else {
      resObj.item = data;
      resObj.status = "success";
      resObj.error = false;
      res.json(resObj);
    }
  });
};

// Edit an blog
// usersController.edit = function(req, res) {
//   User.findOne({_id: req.params.id}).exec(function (err, blog) {
//     if (err) {
//       console.log("Kuch to gadbad hai Daya | Error:", err);
//     }
//     else {
//       // res.render("../views/blogs/edit", {blog: blog});
//       res.json({blog: blog});
//     }
//   });
// };

// Update and saving fields of blog to database
// usersController.update = function(req, res) {
//   User.findByIdAndUpdate(req.params.id, { $set: {title: req.body.title, description: req.body.description, comments: req.body.comments}}, { new: true }, function (err, blog) {
//     if (err) {
//       console.log(err);
//       // res.render("../views/blogs/edit", {blog: req.body});
//       res.json({blog: req.body});
//     }
//     res.redirect("/user/show/"+blog._id);
//     console.log("Post updated");
//   });
// };

// Delete an user
usersController.delete = function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Post deleted!");
      res.redirect("/");
    }
  });
};





module.exports = usersController;

