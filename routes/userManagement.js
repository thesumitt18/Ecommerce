const express = require('express');
const { signup, login, logout } = require('../controllers/userManagement');

const userRoute = express.Router();


userRoute.post('/signup', signup);


userRoute.post('/login', login);

userRoute.post('/logout', logout);

module.exports = userRoute;