const model = require('../models/connection');
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
    model.findById(id)
    .then(connection => {
        if (connection) {
            res.render('./connection/connection', {connection});
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
        if (connection) {
            res.render('./connection/edit', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

//PUT /connections/:id: update the connection identified by id
exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;

    model.updateById(id, connection)
    .then(result => {
        console.log(result);
        res.redirect('/connections/'+id);
    })
    .catch(err=>next(err));
};

//DELETE /connections/:id: delete the connection identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/connections');
    } else {
        let err = new Error('Cannot find a connection with id ' + id);
        err.status = 404;
        next(err);
    }
};