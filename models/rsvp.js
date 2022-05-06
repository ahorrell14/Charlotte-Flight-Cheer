const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({ 
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    connection: {type: Schema.Types.ObjectId, ref: 'Connection'},
    status: {type: String}
});

//collection name is connections in the database
module.exports = mongoose.model('Rsvp', rsvpSchema);