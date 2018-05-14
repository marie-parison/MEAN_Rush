var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentification');
var ctrlMess = require('../controllers/messages');

/* Users */

router.get('/users', function (req, res) {
    ctrlUsers.usersReadAll(req, res);
})

router.get('/users/:userid', function (req, res) {
    ctrlUsers.usersGetOne(req, res);
})

router.put('/users/:userid', function (req, res) {
    ctrlUsers.usersUpdateOne(req, res);
})

router.delete('/users/:userid', function (req, res) {
    ctrlUsers.usersDeleteOne(req, res);
})

/* Auth */
router.post('/register', function (req, res) {
    ctrlAuth.register(req, res);
})

router.post('/login', function (req, res) {
    ctrlAuth.login(req, res);
})

/* Messages */

router.get('/messages', function (req, res) {
    ctrlMess.messagesReadAll(req, res);
})

router.post('/messages', function (req,res){
    ctrlMess.messagesCreate(req, res);
})

router.put('/messages/:messageid', function (req, res) {
    ctrlMess.messagesUpdateOne(req, res);
})

router.delete('/messages/:messageid', function (req, res) {
    ctrlMess.messagesDeleteOne(req, res);
})

module.exports = router;
