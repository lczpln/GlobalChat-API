const router = require('express').Router();

const crud = require('./controllers/crud');

const User = require("./models/User");

const login = require('./controllers/login');

crud("/users", router, User, true)

router.post('/login', login.Login)

module.exports = router;
