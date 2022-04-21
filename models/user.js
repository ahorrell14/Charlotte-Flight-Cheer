const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'First name cannot be empty']},
    lastName: {type: String, required: [true, 'Last name cannot be empty']},
    email: {type: String, required: [true, 'Email cannot be empty'], unique: true},
    password: {type: String, required: [true, 'Password cannot be empty']}
});

module.exports = mongoose.model('User', userSchema);