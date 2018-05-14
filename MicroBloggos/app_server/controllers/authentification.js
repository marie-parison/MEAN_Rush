const users = require("../models/users");
const bcrypt = require("bcrypt");

module.exports = {

    register : function(req, res) {

        if(req.body.name && req.body.email && req.body.password){
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                var new_user = new users({name: req.body.name, email: req.body.email, password: hash});
                new_user.save(function(err){
                    res.status(200).send({new_user});
                });
            });
        } else {
            res.status(400).send({ error: 'All fields are required' });
        }
    },

    login : function(req, res) {

        if(req.body.email && req.body.password){
            users.findOne({ 'email':  req.body.email}, function(err, user){
                if(user){
                    bcrypt.compare(req.body.password, user.password, function(err, valid) {
                        if(valid){
                            res.status(200).send({ user: { _id: user.id, name : user.name, email: user.email, following : user.following, followers : users.followers} });
                        } else {
                            res.status(404).send({ error: 'wrong user or password' });
                        }
                    });
                } else {
                    res.status(400).send({ error: 'wrong user or password' });
                }
            });
        } else {
            res.status(404).send({ error: 'All fields are required' });
        }
    },
}