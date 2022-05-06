const express = require('express');
const controller = require('../controllers/connectionController');
const {isLoggedin, isHost, isNotHost} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

const router = express.Router();

//GET /connections: send all connections to the user
router.get('/', controller.index);

//GET /connections/new: send html form for creating a new connection
router.get('/new', isLoggedin, controller.new);

//POST /connections: create a new connection
router.post('/', isLoggedin, controller.create);

//GET /connections/:id: send details of connection identified by id
router.get('/:id', validateId, controller.show);

//GET /connections/:id/edit: send html form for editing an existing connection
router.get('/:id/edit', validateId, isLoggedin, isHost, controller.edit);

//PUT /connections/:id: update the connection identified by id
router.put('/:id', validateId, isLoggedin, isHost, controller.update);

//POST /connection/:id/rsvp: create rsvp request
router.post('/:id/rsvpYes', validateId, isLoggedin, isNotHost, controller.addRsvp);

//POST /connection/:id?rsvp: delete rsvp request
router.post('/:id/rsvpNo', validateId, isLoggedin, isNotHost, controller.removeRsvp);

//DELETE /connections/:id: delete the connection identified by id
router.delete('/:id', validateId, isLoggedin, isHost, controller.delete);

module.exports = router;