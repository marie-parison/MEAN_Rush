var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    following: Array,
    followers: Array,
});

var users = mongoose.model('users', usersSchema);

module.exports = users;