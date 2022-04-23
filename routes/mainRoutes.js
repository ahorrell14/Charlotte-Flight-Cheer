const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//GET /: show index page
router.get('/', controller.index);

//GET /about: show about page to the user
router.get('/about', controller.about);

//GET /contact: show contact page to the user
router.get('/contact', controller.contact);

//GET /signup: show signup form
router.get('/signup', controller.signup);

//POST /: create new user
router.post('/', controller.create);

//GET /login: show login form
router.get('/login', controller.login);

//POST /login: verify user through login form
router.post('/login', controller.loginAuth);

//GET /profile: show user profile page
router.get('/profile', controller.profile);

//GET /logout: logout the user
router.get('/logout', controller.logout);

module.exports = router;