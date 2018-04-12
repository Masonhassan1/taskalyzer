const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// UserAccount Schema Model
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'tasks'
        }
    ],
    created: {
        type: Date,
        required: true
    },
    modified: {
        type: Date,
        required: true
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
