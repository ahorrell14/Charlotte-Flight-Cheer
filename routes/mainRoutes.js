const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//GET /: show index page
router.get('/', controller.index);

//GET /about: show about page to the user
router.get('/about', controller.about);

//GET /contact: show contact page to the user
router.get('/contact', controller.contact);

module.exports = router;