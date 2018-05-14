const messages = require("../models/messages");
const path = require("path");
const url = require("url");

module.exports = {

    messagesReadAll : function(req, res) {
        messages.find(function(err, data) {
            res.status(200).send(data);
        });
    },

    messagesCreate : function(req, res) {
        if(req.body.user_id && req.body.content){
            var new_message = new messages({user_id: req.body.user_id, content: req.body.content});
                new_message.save(function(err){
                    res.status(200).send(new_message);
                });
        } else {
            res.status(400).send({ error: 'All fields are required' });
        }
    },

    messagesUpdateOne : function(req, res) {

        var id = path.basename(req.url);
        
        messages.findById(id, function(err, message) {
            message.content = req.body.content;
            message.save(function(err){
                res.status(200).send(message);
            });
        });
    },

    messagesDeleteOne : function(req, res) {

        var id = path.basename(req.url);

        messages.remove({ _id: id }, function () {
            res.status(200).send({ message: "OK" });
        });
    },
    
}