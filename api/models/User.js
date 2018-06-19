var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    address: String,
    zip: String,
    phone: {
        type: Number,
        required: true,
        get: obfuscate
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        set: toLower
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: {
        type: Boolean,
        enum: [true, false],
        default: true
    },
    usertype: {
        type: String,
        enum: ['user', 'vendor', 'admin'],
        default: 'vendor'
    }
});

module.exports = mongoose.model('User', UserSchema);

function obfuscate (cc) {
    console.log(cc);
    cc = cc.toString();
    return getstar(cc) + cc.slice(cc.length-4, cc.length);
}
function getstar(cc){
    var str = "";
    for(var i=0;i<(cc.length -4); i++){
        str += "*";
    }
    return str;
}
function toLower (v) {
    return v.toLowerCase();
  }
  