const model = require('../models/connection');
const rsvpModel = require('../models/rsvp');
const moment = require('moment');

//GET /connections: send all connections to the user
exports.index = (req, res, next) => {
    model.find()
    .then(connections => res.render('./connection/connections', {connections}))
    .catch(err=>next(err));
};

//GET /connections/new: send html form for creating a new connection
exports.new = (req, res) => {
    res.render('./connection/newConnection');
};

//POST /connections: create a new connection
exports.create = (req, res, next) => {
    let connection = new model(req.body); //create a new connection document
    connection.host = req.session.user;
    connection.save() //insert connection into the database
    .then((connection) => {
        res.redirect('/connections');
    })
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err)
    });
};

//GET /connections/:id: send details of connection identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    var totalRsvp = 0;
    rsvpModel.find({connection: id})
    .then(results => {
        results.forEach(connection => {
            totalRsvp++;
        });
        
    })

    model.findById(id).populate('host', 'firstName lastName')
    .then(connection => {
        if (connection) {
            return res.render('./connection/connection', {connection, totalRsvp});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//GET /connections/:id/edit: send html form for editing an existing connection
exports.edit = (req, res, next) => {
    let id = req.params.id;  
    model.findById(id)
    .then(connection => {
        res.render('./connection/edit', {connection});
    })
    .catch(err=>next(err));
};

//PUT /connections/:id: update the connection identified by id
exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;
    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection => {
        res.redirect('/connections/'+id);
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err)
    });
};

//DELETE /connections/:id: delete the connection identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection => {
        res.redirect('/connections');
    })
    .catch(err=>next(err));
};

//RSVP /connection/:id/rsvp: add rsvp
exports.addRsvp = (req, res, next) => {
    let user = req.session.user;
    let connection = req.params.id;
    let status = 'Yes';
    let query = {user: user, connection: connection},
        update = {status},
        options = {upsert: true, new: true, useFindAndModify: false, runValidators: true}
    rsvpModel.findOneAndUpdate(query, update, options)
    .then(result => {
        res.redirect('/connections');
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err)
    });
};

//RSVP /connection/:id/rsvp: remove rsvp
exports.removeRsvp = (req, res, next) => {
    let user = req.session.user;
    let connection = req.params.id;
    let status = 'No';
    let query = {user: user, connection: connection},
        update = {status},
        options = {upsert: true, new: true, useFindAndModify: false, runValidators: true}
    rsvpModel.findOneAndUpdate(query, update, options)
    .then(result => {
        res.redirect('/connections');
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err)
    });
};