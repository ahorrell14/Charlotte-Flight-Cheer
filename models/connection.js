const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema ({
    type: {type: String, require: [true, 'Type is required']},
    title: {type: String, require: [true, 'Title is required']},
    host: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, require: [true, 'Content is required'], minlength: [10, 'The content must be atleast 10 characters']},
    where: {type: String, require: [true, 'Where is required']},
    date: {type: Date, require: [true, 'Date is required']},
    startTimeHour: {type: Number, require: [true, 'Start time is required'], min: [1, 'The hour amount must be atleast greater than 0'], max: [23, 'The hour amount must be less than 23']},
    startTimeMinute: {type: Number, require: [true, 'Start time is required'], min: [-1, 'The minute amount must be atleast greater than -1'], max: [59, 'The minute amount must be less than 59']},
    startTimePeriod: {type: String, require: [true, 'Time period is required']},
    endTimeHour: {type: Number, require: [true, 'End time is required'], min: [1, 'The hour amount must be atleast greater than 0'], max: [23, 'The hour amount must be less than 23']},
    endTimeMinute: {type: Number, require: [true, 'End time is required'], min: [-1, 'The minute amount must be atleast greater than -1'], max: [59, 'The minute amount must be less than 59']},
    endTimePeriod: {type: String, require: [true, 'Start time period is required']},
    img: {type: String},
    imgAlt: {type: String}
});

//collection name is connections in the database
module.exports = mongoose.model('Connection', connectionSchema);
