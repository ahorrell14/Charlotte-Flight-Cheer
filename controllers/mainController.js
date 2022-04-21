const User = require('../models/user');

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

//GET /signup: show signup form
exports.signup = (req, res) => {
    res.render('./main/signUp');
};

//POST /: create new user
exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.save()
    .then(()=>res.redirect('/login'))
    .catch(err=>next(err));
}

//GET /login: show login form
exports.login = (req, res) => {
    res.render('./main/login');
};