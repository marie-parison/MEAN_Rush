const users = require("../models/users");
const path = require("path");
const url = require("url");

module.exports = {

    usersReadAll: function (req, res) {
        users.find(function (err, data) {
            res.status(200).send(data);
        });
    },

    usersGetOne: function (req, res) {

        let id = path.basename(req.url);

        users.findById(id, function (err, user) {
            res.status(200).send({ _id: user.id, name: user.name, email: user.email, following: user.following, followers: users.followers });
        });
    },

    usersUpdateOne: function (req, res) {

        let id = path.basename(req.url);
        users.findById(id, function (err, user) {

            let prop = Object.keys(req.body)
            
            prop.forEach((element) => {
                if (element == "following" && !Array.isArray(req.body[element])) {
                    if (user[element].indexOf(req.body[element]) == -1) {
                        user[element].push(req.body[element]);
                    } else {
                        let user_id = req.body[element];
                        user[element] = user[element].filter(element => element != user_id);
                    }
                } else {
                    user[element] = req.body[element];
                }
            });
            user.save(function (err) {
                res.status(200).send({ _id: user.id, name: user.name, email: user.email, following: user.following, followers: users.followers });
            });
        });
    },

    usersDeleteOne: function (req, res) {

        let id = path.basename(req.url);

        users.remove({ _id: id }, function () {
            res.status(200).send({ message: "OK" });
        });
    }
}