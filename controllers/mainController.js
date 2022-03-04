
//GET /about: show about page to the user
exports.about = (req, res) => {
    res.render('./main/about');
};

//Get /contact: show contact page to the user
exports.contact = (req, res) => {
    res.render('./main/contact');
};