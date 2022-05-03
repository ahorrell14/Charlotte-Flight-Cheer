const User = require('../models/user');
const Connection = require('../models/connection');

//GET /: index page
exports.index = (req, res) => {
    res.render('index');
};

//GET /about: show about page to the user
exports.about = (req, res) => {
    res.render('./main/about');
};

//GET /contact: show contact page to the user
exports.contact = (req, res) => {
    res.render('./main/contact');
};


