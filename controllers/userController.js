const User = require('../models/user');
const Connection = require('../models/connection');
const Rsvp = require('../models/rsvp');


//GET /signup: show signup form
exports.signup = (req, res) => {
    return res.render('./user/signUp');
};

//POST /: create new user
exports.create = (req, res, next) => {
    let user = new User(req.body);
    if(user.email){
        user.email = user.email.toLowerCase();
    }
    user.save()
    .then(user => {
        req.flash('success', 'Registration success!');
        res.redirect('/users/login');
    })
    .catch(err => {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('back');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email address has been used');
            return res.redirect('back');
        }

        next(err);
    });
};

//GET /login: show login form
exports.login = (req, res) => {
    return res.render('./user/login');
};

//POST /login: authenticate login form
exports.loginAuth = (req, res) => {
    let email = req.body.email;
    if(email){
        email = email.toLowerCase();
    }
    let password = req.body.password;

    //get user that matches the email
    User.findOne({email: email})
    .then(user => {
    if (user) {
        //user found in database
        user.comparePassword(password)
        .then(result => {
            if (result){
                req.session.user = user._id;
                req.flash('success', 'You have successfully logged in!');
                res.redirect('/users/profile');
            } else {
                console.log('wrong password');
                req.flash('error', 'Wrong password!');
                res.redirect('/users/login');
            }
        })
    } else {
        console.log('wrong email');
        req.flash('error', 'Wrong email address!');
        res.redirect('/users/login');
    }
    })
    .catch(err=>next(err));
};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([User.findById(id), Connection.find({host: id}), Rsvp.find({user: id}).populate('connection', Connection.title)])
    .then(results => {
        const [user, connections, rsvp] = results;
        res.render('./user/profile', {user, connections, rsvp});
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next) => {
    req.session.destroy(err=>{
        if(err) {
           return next(err);
        } else {
           res.redirect('/');
        }
    });
};