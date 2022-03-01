const express = require('express');

const router = express.Router();

//GET /connections: send all connections to the user
router.get('/', (req, res) => {
    res.send('send all connections');
});

//GET /connections/new: send html form for creating a new story
router.get('/new', (req, res) => {
    res.send('send the new form');
});

//POST /connections: create a new connection
router.post('/', (req, res) => {
    res.send('created a new connection');
});

//GET /connections/:id: send details of connection identified by id
router.get('/:id', (req, res) => {
    res.send('send connection with id ' + req.params.id);
});

//GET /connections/:id/edit: send html form for editing an existing story
router.get('/:id/edit', (req, res) => {
    res.send('send the edit form');
});

//PUT /connections/:id: update the connection identified by id
router.put('/:id', (req, res) => {
    res.send('update story with id ' + req.params.id);
});

//DELETE /connections/:id: delete the story identified by id
router.delete('/:id', (req, res) => {
    res.send('delete story with id ' + req.params.id);
});

module.exports = router;