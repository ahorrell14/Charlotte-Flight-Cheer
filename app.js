//require models
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectionRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');
const mongoose = require('mongoose');
const moment = require('moment');


//create application
const app = express();


//configure application
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/NBAD';
app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect(url)
.then(() => {
    //start the server
    app.listen(port, host, () => {
        console.log('Server is running on port', port);
        });
})
.catch(err=>console.log(err.message));

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.locals.moment = moment;

//set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/connections', connectionRoutes);
app.use('/main', mainRoutes);

app.use((req, res, next) => {
    let err = new Error ('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error:err});
});

