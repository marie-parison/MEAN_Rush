var mongoose = require('mongoose');

var messagesSchema = mongoose.Schema({
    user_id: String,
    content: String,
    //hashtags: Array,
});

var messages = mongoose.model('messages', messagesSchema);

module.exports = messages;