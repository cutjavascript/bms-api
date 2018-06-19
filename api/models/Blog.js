var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  comments: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
