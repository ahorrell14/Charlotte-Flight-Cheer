const model = require('../models/connection');

//GET /connections: send all connections to the user
exports.index = (req, res) => {
    //res.send('send all connections');
    let connections = model.find();
    res.render('./connection/connections', {connections});
};

//GET /connections/new: send html form for creating a new connection
exports.new = (req, res) => {
    res.send('send the new form');
};

//POST /connections: create a new connection
exports.create = (req, res) => {
    res.send('created a new connection');
};

//GET /connections/:id: send details of connection identified by id
exports.show = (req, res) => {
    res.send('send connection with id ' + req.params.id);
};

//GET /connections/:id/edit: send html form for editing an existing connection
exports.edit = (req, res) => {
    res.send('send the edit form');
};

//PUT /connections/:id: update the connection identified by id
exports.update = (req, res) => {
    res.send('update connection with id ' + req.params.id);
};

//DELETE /connections/:id: delete the connection identified by id
exports.delete = (req, res) => {
    res.send('delete connection with id ' + req.params.id);
};