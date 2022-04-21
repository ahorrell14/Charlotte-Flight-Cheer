const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'First name cannot be empty']},
    lastName: {type: String, required: [true, 'Last name cannot be empty']},
    email: {type: String, required: [true, 'Email cannot be empty'], unique: true},
    password: {type: String, required: [true, 'Password cannot be empty']}
});

//replace plaintext password with hashed password
//pre middleware

userSchema.pre('save', function(next){
    let user = this;
    if (!user.isModified('password')){
        return next();
    } else {
        bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err=>next(err));
    }
});

module.exports = mongoose.model('User', userSchema);