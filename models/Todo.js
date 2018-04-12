const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Todo Schema Model
const todoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;
