const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//GET /about: show about page to the user
router.get('/about', controller.about);

module.exports = router;