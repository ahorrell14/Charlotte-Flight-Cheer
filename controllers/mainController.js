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
};

//GET /login: show login form
exports.login = (req, res) => {
    res.render('./main/login');
};

//POST /login: authenticate login form
exports.loginAuth = (req, res) => {
    let email = req.body.email;
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
                    res.redirect('/profile');
                } else {
                    console.log('wrong password');
                    res.redirect('/login');
                }
            })
        } else {
            console.log('wrong email');
            res.redirect('/login');
        }
    })
    .catch(err=>next(err));
};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    User.findById(id)
    .then(user => {
        res.render('./main/profile', {user});
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
