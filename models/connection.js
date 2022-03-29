const e = require('express');
const {v4: uuid} = require('uuid');
const {ObjectId} = require('mongodb');

//need a reference variable to the connections collection in mongodb
let connections;
exports.getCollection = db => {
    connections = db.collection('connections');
}

exports.find = function() {
    return connections.find().toArray();
};

exports.findById = function(id) {
    return connections.findOne({_id: ObjectId(id)});
};

exports.save = function (connection) {
    connections.insertOne(connection);
};

exports.updateById = function(id, newConnection) {
    let connection = connections.find(connection=>connection.id === id);
    if (connection) {
        connection.type = newConnection.type;
        connection.title = newConnection.title;
        connection.host = newConnection.host;
        connection.content = newConnection.content;
        connection.where = newConnection.where;
        connection.date = newConnection.date;
        connection.start = newConnection.start;
        connection.end = newConnection.end;
        connection.img = newConnection.img;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = connections.findIndex(connection => connection.id === id);
    if (index !== -1) {
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
}